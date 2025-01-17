//Variables
const TYPING_SPEED = 20;
const HOME_IMAGE_PATHS = {
    html: `img/Languages/html.png`, css: `img/Languages/css.png`, js: `img/Languages/js.png`,
    java: `img/Languages/java.png`, cpp: `img/Languages/cpp.png`, cs: `img/Languages/cs.png`
};  
const SECTIONS = [`about`, `skills`, `contacts`];
const output = { leftOutput: null, rightOutput: null }
const content = {
    left: {
        about: `Welcome to my portfolio.<br><br>
                I am deeply invested in learning, problem-solving and exploring the fascinating world of programming.
                While I have not yet committed to a specific specialization, my current focus is broadening my knowledge and skills across as many areas as possible.
                I hope you enjoy learning about my projects and getting to know me.<br><br>
                Throughout my time at fanshawe I have completed multiple projects that have spanned across various programs and languages,
                giving me a good hands-on experience in different areas of computer science.
                These projects have allowed me to translate theoretical knowledge into practical solutions for real-world problems,
                ranging from creating CRUD applications to developing mathematical expression evaluators.<br><br>
                Throughout this process, I have gained valuable experience with tools such as Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS), 
                and have strengthened my understanding of fundamental concepts in debugging and problem solving.`
    },
    right: {}
}

//State Functions
const createState = () => ({
    typingLeft: false,
    typingRight: false,
    leftString: ``,
    rightString: ``,
    typingIndices: {
        about: 0
    },
    currentSection: ``
});

function getState() {
    const savedState = sessionStorage.getItem(`state`);
    return savedState ? JSON.parse(savedState) : createState();
}

function updateState(key, value) {
    const currentState = getState();
    const newState = {...currentState, [key]: value};
    sessionStorage.setItem(`state`, JSON.stringify(newState));
    return newState;
}

//Helper Functions
function createSkills() {
    if(content.left.skills) return content.left.skills;

    const createImage = type => `<img src="${HOME_IMAGE_PATHS[type]}" alt="Logo of ${type}" class="language" loading="lazy">`;
    const frontEndImages = [`html`, `css`, `js`].map(createImage).join(``);
    const backEndImages = [`java`, `cpp`, `cs`].map(createImage).join(``);

    content.left.skills = `<div id="skillsDiv">Front-end languages<div class = "imageOut">${frontEndImages}</div>Back-end languages<div class ="imageOut">${backEndImages}</div></div>`;
    return content.left.skills;
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
    ).catch(error => {
        console.error(`Failed to load images: ${error}`);
    })
}

//Typewriter Functions
async function printContent(outputType, isRight = false) {
    const side = isRight ? `right` : `left`;

    const outputDiv = document.getElementById(`${side}Output`);
    if (!outputDiv) {
        console.error(`Output div not found for ${side}`);
        return;
    }

    //Check if the section is already being typed
    const state = getState();
    if (state.currentSection === outputType) return;

    //Disable typing
    const typingKey = `typing${side.charAt(0).toUpperCase() + side.slice(1)}`;
    updateState(typingKey, false);

    //Highlight section
    updateState(`currentSection`, outputType);
    SECTIONS.forEach(section => {
        const element = document.getElementById(section);
        if(element) element.style.backgroundColor = section === outputType ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)"
    }); 

    if (outputType === `skills`) {
        outputDiv.innerHTML = createSkills();
        return;
    }

    const sideContent = content[side][outputType];
    if (!sideContent) {
        console.error(`Content not found for ${outputType}`);
        return;
    }

    const contentKey = `${side}String`;
    updateState(contentKey, sideContent);
    updateState(typingKey, true);
    
    outputDiv.innerHTML = '';
    await typeContent(outputType, outputDiv, typingKey, contentKey);
}

async function typeContent(outputType, outputDiv, typingKey, contentKey){
    let state = getState();
    if(!state[typingKey]) { return; }

    let index = state.typingIndices[outputType] || 0;
    const content = state[contentKey];

    if (index > 0){
        outputDiv.innerHTML = content.substring(0, index);
    }

    while(index < content.length && state[typingKey]) {
        if (content[index] === `<`) {
            const tagEnd = content.indexOf(`>`, index);
            if(tagEnd === -1) break;

            outputDiv.innerHTML += content.substring(index, tagEnd + 1);
            index = tagEnd + 1;
        }
        else {
            outputDiv.innerHTML += content[index];
            index++;
        }
    
        state = updateState(`typingIndices`, {...state.typingIndices, [outputType]: index});
        if (!state) return;

        await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
        state = getState();
    }
    
    updateState(typingKey, false);
}

//Listeners
if(document.getElementById(`homePage`)) {
    document.getElementById(`about`).addEventListener(`click`, () => printContent(`about`));
    document.getElementById(`skills`).addEventListener(`click`, () => printContent(`skills`));
}
window.addEventListener(`load`, async () => { 
    const homePage = document.getElementById(`homePage`);
    if(!homePage) return;

    await preloadImages(HOME_IMAGE_PATHS);
    let state = createState();
    updateState(`currentSection`, ``);
    updateState(`state`, state);
    await printContent("about"); 
});