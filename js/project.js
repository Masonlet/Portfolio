const projectData = {
  'starlet-setup': {
    title: 'Starlet Setup',
    description: 'Starlet Setup is a lightweight Python utility to quickly clone, configure, and build CMake projects — from single repos to full mono-repos.',
    image: 'img/projects/starlet-setup.png',
    github: 'https://github.com/masonlet/starlet-setup',
    languages: ['python']
  },
  'tasktracker': {
    title: 'Task Tracker',
    description: 'TaskTracker is a lightweight tool for Windows 10 and 11 that adds task status options to the right-click context menu of folders.',
    image: 'img/projects/tasktracker.png',
    github: 'https://github.com/masonlet/tasktracker',
    languages: ['cpp']
  },
  'opengl': {
    title: 'C++ OpenGL Engine',
    description: 'A C++ OpenGL engine ecosystem.',
    image: 'img/projects/opengl.png',
    github: 'https://github.com/masonlet/starletdevelopment',
    languages: ['cpp']
  },
  'portfolio': {
    title: 'Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: 'img/projects/portfolio.png',
    github: 'https://github.com/masonlet/portfolio',
    languages: ['html', 'css', 'js']
  },
  'githubvisualizer': {
    title: 'GitHub Visualizer',
    description: 'A Python utility to explore and visualize GitHub repositories and their activity.',
    image: 'img/projects/githubvisualizer.png',
    github: 'https://github.com/masonlet/githubvisualizer',
    languages: ['python']
  },
  'imagesandbox': {
    title: 'Image Sandbox',
    description: 'A C++ playground for experimenting with images loaded using StarletSerializer.',
    image: 'img/projects/imagesandbox.png',
    github: 'https://github.com/masonlet/starletimagesandbox',
    languages: ['cpp']
  },
  'samples': {
    title: 'Starlet Samples',
    description: 'A repository for demonstrating the Starlet Engine, including sample scenes, meshes, textures, and shaders.',
    image: 'img/projects/samples.png',
    github: 'https://github.com/masonlet/starletsamples',
    languages: ['cpp']
  },
  'noisesandbox': {
    title: 'Noise Sandbox',
    description: 'A C++ playground for learning and experimenting with noise algorithms.',
    image: 'img/projects/noise.png',
    github: 'https://github.com/masonlet/starletnoisesandbox',
    languages: ['cpp']
  },
  'starter': {
    title: 'Starlet Starter',
    description: 'A Template for Starlet Game Projects.',
    image: 'img/projects/starter.png',
    github: 'https://github.com/masonlet/starletstarter',
    languages: ['cpp']
  },
  'cardportfolio': {
    title: 'Card Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: 'img/projects/card.png',
    github: 'https://github.com/masonlet/cardportfolio',
    languages: ['html', 'css', 'js']
  },
  'graphics': {
    title: 'Starlet Graphics',
    description: 'Graphics loading & management library for Starlet projects.',
    image: 'img/projects/graphics.png',
    github: 'https://github.com/masonlet/starletgraphics',
    languages: ['cpp']
  },
  'serializer': {
    title: 'Starlet Serializer',
    description: 'Serialization library for Starlet projects to handle both data reading and writing.',
    image: 'img/projects/serializer.png',
    github: 'https://github.com/masonlet/starletserializer',
    languages: ['cpp']
  },
  'engine': {
    title: 'Starlet Engine',
    description: 'Modular OpenGL engine written in C++.',
    image: 'img/projects/engine.png',
    github: 'https://github.com/masonlet/starletengine',
    languages: ['cpp']
  },
  'scene': {
    title: 'Starlet Scene',
    description: 'ECS-based scene & scene management library for Starlet projects.',
    image: 'img/projects/scene.png',
    github: 'https://github.com/masonlet/starletscene',
    languages: ['cpp']
  },
  'logger': {
    title: 'Starlet Logger',
    description: 'Logging library for Starlet projects.',
    image: 'img/projects/logger.png',
    github: 'https://github.com/masonlet/starletlogger',
    languages: ['cpp']
  },
  'controls': {
    title: 'Starlet Controls',
    description: 'Input management library for Starlet projects.',
    image: 'img/projects/controls.png',
    github: 'https://github.com/masonlet/starletcontrols',
    languages: ['cpp']
  },
  'math': {
    title: 'Starlet Math',
    description: 'A lightweight header-only math library for Starlet projects.',
    image: 'img/projects/math.png',
    github: 'https://github.com/masonlet/starletmath',
    languages: ['cpp']
  },
  'tests': {
    title: 'Starlet Tests',
    description: 'A repository containing unit tests for Starlet libaries using Goolge Test(gtest).',
    image: 'img/projects/tests.png',
    github: 'https://github.com/masonlet/starlettests',
    languages: ['cpp']
  },
};

const IMAGE_PATHS = {
  html: `img/languages/html.png`, css: `img/languages/css.png`, js: `img/languages/js.png`, 
  python: `img/languages/python.png`, java: `img/languages/java.png`, cpp: `img/languages/cpp.png`, cs: `img/languages/cs.png`
};  

const projectCards = document.querySelectorAll('.project-card');
const grid = document.querySelector('#projects-grid');
const details = document.querySelector('#project-details');
const ANIMATION_DURATION = 300;

function createLanguageIcons(languages){
  if (!languages || languages.length === 0) return '';

  const icons = languages
    .map(lang => `<img src="${IMAGE_PATHS[lang]}" alt="${lang}" class="language-icon" loading="lazy">`)
    .join('');

  return `<div class="project-languages">${icons}</div>`;
}

function fadeTransition(hideElement, showElement, callback){
  hideElement.classList.add('fade-out');

  setTimeout(() => {
    hideElement.style.display = 'none';
    hideElement.classList.add('hidden');
    hideElement.classList.remove('fade-out');

    if(callback) callback();

    showElement.classList.remove('hidden');
    showElement.style.display = showElement === grid ? 'grid' : 'block';
    showElement.style.opacity = '0';    

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        showElement.style.opacity = '1';
      });
    });
  }, ANIMATION_DURATION);
}

function showProjectDetails(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;
  
  fadeTransition(grid, details, () => {
    details.innerHTML = `
      <h3>${data.title}</h3>
      ${createLanguageIcons(data.languages)}
      <div id="project-buttons">
        <button id="back-to-grid">← Back to Projects</button>
        <a href="${data.github}" target="_blank" id="github-link">
          <button id="github-button">View on GitHub →</button>
        </a>
      </div>
      <p>${data.description}</p>
      <img src="${data.image}" alt="${data.title}" id="project-preview"/>
    `;
  });
}
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectKey = card.getAttribute('data-project');
    showProjectDetails(projectKey);
  });
});

function showProjectsGrid() {
  fadeTransition(details, grid, () => {
    details.innerHTML = '';
  });
}
document.addEventListener('click', e => {
  if (e.target.id === 'back-to-grid' || e.target.closest('#back-to-grid')){
    showProjectsGrid();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  grid.classList.remove('hidden');
  grid.style.display = 'grid';
  grid.style.opacity = '1';
  
  details.classList.add('hidden');
  details.style.display = 'none';
});