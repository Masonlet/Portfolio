//Variables
const TYPING_SPEED = 20;
const IMAGE_PATHS = {
html: new URL(`/img/tech/html.png`, import.meta.url).href, 
  css: new URL(`/img/tech/css.png`, import.meta.url).href, 
  js: new URL(`/img/tech/js.png`, import.meta.url).href,
  python: new URL(`/img/tech/python.png`, import.meta.url).href, 
  java: new URL(`/img/tech/java.png`, import.meta.url).href, 
  cpp: new URL(`/img/tech/cpp.png`, import.meta.url).href, 
  cs: new URL(`/img/tech/cs.png`, import.meta.url).href
};  
const SECTIONS = [`about`, `skills`, `contacts`];
const output = { firstOutput: null, secondOutput: null }
const content = {
  first: {
    about: `Welcome to my portfolio.<br><br>
            I am deeply invested in learning, problem-solving and exploring the fascinating world of programming.
            While I have not yet committed to a specific specialization, my current focus is broadening my knowledge and skills across as many areas as possible.
            I hope you enjoy learning about my projects and getting to know me.<br><br>
            Throughout my time at Fanshawe I have completed multiple projects that have spanned across various programs and languages,
            giving me a good hands-on experience in different areas of computer science.
            These projects have allowed me to translate theoretical knowledge into practical solutions for real-world problems,
            ranging from creating CRUD applications to developing mathematical expression evaluators.<br><br>
            Throughout this process, I have gained valuable experience with tools such as Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS), 
            and have strengthened my understanding of fundamental concepts in debugging and problem solving.`
  },
  second: {}
}

//State Functions
const createState = () => ({
  typingfirst: false,
  typingsecond: false,
  firstString: ``,
  secondString: ``,
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
  if(content.first.skills) return content.first.skills;

  const createImage = type => `<img src="${IMAGE_PATHS[type]}" alt="Logo of ${type}" class="tech" loading="lazy">`;
  const frontEndImages = [`html`, `css`, `js`].map(createImage).join(``);
  const backEndImages = [`java`, `cpp`, `cs`, 'python'].map(createImage).join(``);

  content.first.skills = `<div id="skills-div">Front-end languages<div class = "image-out">${frontEndImages}</div>Back-end languages<div class ="image-out">${backEndImages}</div></div>`;
  return content.first.skills;
}

function preloadImages(images) {
  return Promise.all(
    Object.values(images).map(path => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
        img.src = path;
      });
    })
  ).catch(error => {
    console.error(error);
  });
}

//Typewriter Functions
async function printContent(outputType, isSecond = false) {
  const side = isSecond ? `second` : `first`;

  const outputDiv = document.getElementById(`${side}-output`);
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
if(document.getElementById(`home-page`)) {
  document.getElementById(`about`).addEventListener(`click`, () => printContent(`about`));
  document.getElementById(`skills`).addEventListener(`click`, () => printContent(`skills`));
}
window.addEventListener(`load`, async () => { 
  const homePage = document.getElementById(`home-page`);
  if(!homePage) return;

  await preloadImages(IMAGE_PATHS);
  let state = createState();
  updateState(`currentSection`, ``);
  updateState(`state`, state);
  await printContent("about"); 
});
