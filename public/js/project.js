const projectData = {
  'starlet-setup': {
    title: 'Starlet Setup',
    description: 'Starlet Setup is a lightweight Python utility to quickly clone, configure, and build CMake projects — from single repos to full mono-repos.',
    image: new URL('/img/projects/starlet-setup.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starlet-setup',
    tech: ['python', 'cmake', 'pytest', 'pip', 'pypi']
  },
  'tasktracker': {
    title: 'Task Tracker',
    description: 'TaskTracker is a lightweight tool for Windows 10 and 11 that adds task status options to the right-click context menu of folders.',
    image: new URL('/img/projects/tasktracker.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/tasktracker',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'opengl': {
    title: 'C++ OpenGL Engine',
    description: 'A C++ OpenGL engine ecosystem.',
    image: new URL('/img/projects/opengl.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletdevelopment',
    tech: ['cpp', 'opengl', 'cmake', 'glfw']
  },
  'portfolio': {
    title: 'Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: new URL('/img/projects/portfolio.webp', import.meta.url).href,

    github: 'https://github.com/masonlet/portfolio',
    tech: ['html', 'css', 'js']
  },
  'githubvisualizer': {
    title: 'GitHub Visualizer',
    description: 'A Python utility to explore and visualize GitHub repositories and their activity.',
    image: new URL('/img/projects/githubvisualizer.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/githubvisualizer',
    tech: ['python', 'pytest', 'pip']
  },
  'imagesandbox': {
    title: 'Image Sandbox',
    description: 'A C++ playground for experimenting with images loaded using StarletSerializer.',
    image: new URL('/img/projects/imagesandbox.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletimagesandbox',
    tech: ['cpp', 'cmake']
  },
  'samples': {
    title: 'Starlet Samples',
    description: 'A repository for demonstrating the Starlet Engine, including sample scenes, meshes, textures, and shaders.',
    image: new URL('/img/projects/samples.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletsamples',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'noisesandbox': {
    title: 'Noise Sandbox',
    description: 'A C++ playground for learning and experimenting with noise algorithms.',
    image: new URL('/img/projects/noise.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletnoisesandbox',
    tech: ['cpp', 'cmake']
  },
  'starter': {
    title: 'Starlet Starter',
    description: 'A Template for Starlet Game Projects.',
    image: new URL('/img/projects/starter.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletstarter',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'cardportfolio': {
    title: 'Card Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: new URL('/img/projects/card.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/cardportfolio',
    tech: ['html', 'css', 'js']
  },
  'graphics': {
    title: 'Starlet Graphics',
    description: 'Graphics loading & management library for Starlet projects.',
    image: new URL('/img/projects/graphics.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletgraphics',
    tech: ['cpp', 'cmake']
  },
  'serializer': {
    title: 'Starlet Serializer',
    description: 'Serialization library for Starlet projects to handle both data reading and writing.',
    image: new URL('/img/projects/serializer.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletserializer',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'engine': {
    title: 'Starlet Engine',
    description: 'Modular OpenGL engine written in C++.',
    image: new URL('/img/projects/engine.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletengine',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'scene': {
    title: 'Starlet Scene',
    description: 'ECS-based scene & scene management library for Starlet projects.',
    image: new URL('/img/projects/scene.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletscene',
    tech: ['cpp', 'cmake']
  },
  'logger': {
    title: 'Starlet Logger',
    description: 'Logging library for Starlet projects.',
    image: new URL('/img/projects/logger.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletlogger',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'controls': {
    title: 'Starlet Controls',
    description: 'Input management library for Starlet projects.',
    image: new URL('/img/projects/controls.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletcontrols',
    tech: ['cpp', 'cmake']
  },
  'math': {
    title: 'Starlet Math',
    description: 'A lightweight header-only math library for Starlet projects.',
    image: new URL('/img/projects/math.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starletmath',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'tests': {
    title: 'Starlet Tests',
    description: 'A repository containing unit tests for Starlet libaries using Goolge Test(gtest).',
    image: new URL('/img/projects/tests.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/starlettests',
    tech: ['cpp', 'cmake', `googletest`]
  },
};

const IMAGE_PATHS = {
  html: new URL(`/img/tech/html.png`, import.meta.url).href,
  css: new URL(`/img/tech/css.png`, import.meta.url).href,
  js: new URL(`/img/tech/js.png`, import.meta.url).href,
  python: new URL(`/img/tech/python.png`, import.meta.url).href,
  java: new URL(`/img/tech/java.png`, import.meta.url).href,
  cpp: new URL(`/img/tech/cpp.png`, import.meta.url).href,
  cs: new URL(`/img/tech/cs.png`, import.meta.url).href,
  opengl: new URL(`/img/tech/opengl.png`, import.meta.url).href,
  glfw: new URL(`/img/tech/glfw.png`, import.meta.url).href,
  cmake: new URL(`/img/tech/cmake.png`, import.meta.url).href,
  googletest: new URL(`/img/tech/googletest.png`, import.meta.url).href,
  pytest: new URL(`/img/tech/pytest.png`, import.meta.url).href,
  pip: new URL(`/img/tech/pip.png`, import.meta.url).href,
  pypi: new URL(`/img/tech/pypi.png`, import.meta.url).href
};  

const projectCards = document.querySelectorAll('.project-card');
const grid = document.querySelector('#projects-grid');
const details = document.querySelector('#project-details');
const ANIMATION_DURATION = 300;

function createTechIcons(icons){
  if (!icons || icons.length === 0) return '';

  const iconData = icons
    .map(lang => `<img src="${IMAGE_PATHS[lang]}" alt="${lang}" class="tech-icon" loading="lazy">`)
    .join('');

  return `<div class="project-tech">${iconData}</div>`;
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
      ${createTechIcons(data.tech)}
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
