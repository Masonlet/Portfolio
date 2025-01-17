const TYPING_SPEED = 20;
const HOME_IMAGE_PATHS = {
    html: `img/Languages/html.png`,
    css: `img/Languages/css.png`,
    js: `img/Languages/js.png`,
    java: `img/Languages/java.png`,
    cpp: `img/Languages/cpp.png`,
    cs: `img/Languages/cs.png`
};
const SECTIONS = [
    `about`, 
    `skills`, 
    `contacts`
];

function getState() {
    let state = sessionStorage.getItem(`state`);
    if (state){
        return JSON.parse(state);
    }
    else {
        state = {
            typingLeft: false,
            typingRight: false,
            leftString: ``,
            rightString: ``,
            typingIndices: {
                about: 0
            }
        }
        sessionStorage.setItem(`state`, JSON.stringify(state));
        return state;
    }
}
const state = getState();

const leftContent = {
    about: `Welcome to my portfolio.<br><br>
            I am deeply invested in learning, problem-solving and exploring the fascinating world of programming.
            While I have not yet committed to a specific specialization, my current focus is broadening my knowledge and skills across as many areas as possible.
            I hope you enjoy learning about my projects and getting to know me.<br><br>
            Throughout my time at fanshawe I have completed multiple projects that have spanned across various programs and languages,
            giving me a good hands-on experience in different areas of computer science.
            These projects have allowed me to translate theoretical knowledge into practical solutions for real-world problems,
            ranging from creating CRUD applications to developing mathematical expression evaluators.<br><br>
            Throughout this process, I have gained valuable experience with tools such as Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS), 
            and have strengthened my understanding of fundamental concepts in debugging and problem solving.`,
    skills: createSkills()
}
const rightContent = {

}

function createSkills() {
    const createImage = (type) => `<img src="${HOME_IMAGE_PATHS[type]}" alt="${type} logo" class="language" loading="lazy">`;
    const frontEndImages = [`html`, `css`, `js`].map(createImage).join(``);
    const backEndImages = [`java`, `cpp`, `cs`].map(createImage).join(``);

    return `<div id="skillsDiv">Front-end languages<div class = "imageOut">${frontEndImages}</div>Back-end languages<div class ="imageOut">${backEndImages}</div></div>`
}

function preloadImages(images) {
    return Promise.all(
        Object.values(images).map(path => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = path;
            });
        })
    );
}

function highlightSection(selectedSection) {
    SECTIONS.forEach(section => {
        const element = document.getElementById(section);
        if(element) element.style.backgroundColor = section === selectedSection ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)"
    });
}

async function printContent(outputType, isRight = false) {
    const side = isRight ? `right` : `left`;
    const typingKey = `typing${side.charAt(0).toUpperCase() + side.slice(1)}`;
    const contentKey = `${side}String`;
    const outputDiv = document.getElementById(`${side}Output`);
    if (!outputDiv) return;

    state[typingKey] = false;
    highlightSection(outputType);

    if (outputType === `skills`) {
        outputDiv.innerHTML = createSkills();
        return;
    }

    const index = sessionStorage.getItem(`${outputType}Index`);
    const content = isRight ? rightContent[outputType] : leftContent[outputType];
    state[contentKey] = content;

    if (index) {
        state.typingIndices[outputType] = parseInt(index);
        outputDiv.innerHTML = content.substring(0, state.typingIndices[outputType]);
    }
    else {
        state.typingIndices[outputType] = 0;
        outputDiv.innerHTML = ``;
    }

    state[typingKey] = true;
    await typeContent(outputType, isRight);
}
let debounceTimer;
async function typeContent(outputType, isRight){
    const side = isRight ? `right` : `left`;
    const typingKey = `typing${side.charAt(0).toUpperCase() + side.slice(1)}`;
    const contentKey = `${side}String`;
    const outputDiv = document.getElementById(isRight ? `rightOutput` : `leftOutput`);

    if(!state[typingKey] || !outputDiv) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        while(state[typingKey] && state.typingIndices[outputType] < state[contentKey].length) {
            const index = state.typingIndices[outputType];
            const nextChar = state[contentKey].charAt(index);
    
            if (nextChar === `<`) {
                const tagEnd = state[contentKey].indexOf(`>`, index);
                if(tagEnd === -1) return;
                const tag = state[contentKey].substring(index, tagEnd + 1);
                outputDiv.innerHTML += tag;
                state.typingIndices[outputType] = tagEnd + 1;
            }
            else {
                outputDiv.innerHTML += nextChar;
                state.typingIndices[outputType]++;
            }
        
            sessionStorage.setItem(`${outputType}Index`, state.typingIndices[outputType]);
            await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
        }
       
        state[typingKey] = false;
    }, 100)
}

window.onload = async function () {
    sessionStorage.clear();
    const homePage = document.getElementById(`homePage`);

    if (homePage) {
        await preloadImages(HOME_IMAGE_PATHS);
        highlightSection("about");
        await printContent("about"); 
    }
};
