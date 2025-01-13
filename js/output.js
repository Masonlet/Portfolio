const TYPING_SPEED = 20;
const IMAGE_PATHS = {
    html: `img/languages/html.png`,
    css: `img/languages/css.png`,
    js: `img/languages/js.png`,
    java: `img/languages/java.png`,
    cpp: `img/languages/cpp.png`,
    cs: `img/languages/cs.png`
};
const SECTIONS = [`about`, `skills`, `contacts`];

const state = {
    activeLeft: false,
    activeRight: false,
}
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
function createSkills() {
    const frontEndImages = [`html`, `css`, `js`].map(createImage).join(``);
    const backEndImages = [`java`, `cpp`, `cs`].map(createImage).join(``);

    return `<div id="skillsDiv">
                Front-end languages
                <div class = "imageOut">${frontEndImages}</div>
                Back-end languages
                <div class ="imageOut">${backEndImages}</div>
            </div>`
}

const rightContent = {

}

function preloadImages() {
    return Promise.all(
        Object.values(IMAGE_PATHS).map(path => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = path;
            });
        })
    );
}
function createImage(type) {
    return `<img src="${IMAGE_PATHS[type]}" alt="${type}" class="language">`
}

window.onload = function () {
    const homePage = document.getElementById(`homePage`);

    if (homePage) {
        preloadImages();
        const outputElement = document.getElementById(`leftOutput`);
        const aboutKey = sessionStorage.getItem(`aboutSeen`) === `true`;
        highlightSection("about");

        if (aboutKey) {
            outputElement.innerHTML = leftContent[`about`];
        } else {
            printContent("about"); 
            sessionStorage.setItem("aboutSeen", `true`);
        }
    }
};

function highlightSection(selectedSection) {
    SECTIONS.forEach(section => {
        document.getElementById(section).style.backgroundColor = section === selectedSection ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)"
    });
}

async function printContent(outputType, isRight = false) {
    if (state[isRight ? `activeRight` : `activeLeft`]) return;

    const content = isRight ? `rightString` : `leftString`;
    const outputId = isRight ? `rightOutput` : `leftOutput`;
    const activeKey = isRight ? `activeRight` : `activeLeft`;
    const seenKey = `${outputType}Seen`;

    const outputDiv = document.getElementById(outputId);
    if (!outputDiv) return;

    state[content] = isRight ? rightContent[outputType] : leftContent[outputType];
    highlightSection(outputType);

    if (outputType === `skills`) {
        outputDiv.innerHTML = createSkills();
        return;
    }

    if (sessionStorage.getItem(seenKey) === `true`) {
        outputDiv.innerHTML = state[content];
        return;
    }

    outputDiv.innerHTML = ``;
    state[activeKey] = true;
    await typeContent(isRight, 0);
    sessionStorage.setItem(seenKey, `true`);
}

async function typeContent(isRight, index){
    const outputDiv = document.getElementById(isRight ? `rightOutput` : `leftOutput`);
    const currentString = isRight ? state.rightString : state.leftString;
    const activeKey = isRight ? `activeRight` : `activeLeft`;

    if (index >= currentString.length) {
        state[activeKey] = false;
        return;
    }

    const nextChar = currentString.charAt(index);

    if (nextChar === `<`) {
        const tagEnd = currentString.indexOf(`>`, index);
        outputDiv.innerHTML += currentString.substring(index, tagEnd + 1);
        await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
        return typeContent(isRight, tagEnd + 1);
    }

    outputDiv.innerHTML += nextChar;
    await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
    return typeContent(isRight, index + 1);
}