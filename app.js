let spaceData = null;
let currentPage = 'home';
let activeSubIndex = 0;

// Fetch Data
async function loadData() {
  try {
    const response = await fetch('./data.json');
    spaceData = await response.json();
    renderPage('home');
  } catch (error) {
    console.error('Error loading space data:', error);
  }
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuBtn?.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('translate-x-0');
  if (isOpen) {
    navMenu.classList.add('translate-x-full');
    navMenu.classList.remove('translate-x-0');
    menuIcon.src = './assets/shared/icon-hamburger.svg';
  } else {
    navMenu.classList.remove('translate-x-full');
    navMenu.classList.add('translate-x-0');
    menuIcon.src = './assets/shared/icon-close.svg';
  }
});

// Main Page Navigation
function navigateTo(page) {
  currentPage = page;
  activeSubIndex = 0;
  
  // Update Background Class
  const body = document.getElementById('body-bg');
  body.className = `bg-space-dark text-white font-body min-h-screen flex flex-col bg-cover bg-no-repeat transition-all duration-500 bg-${page}`;

  // Update Nav Active States
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.page === page) {
      item.classList.add('border-white');
      item.classList.remove('border-transparent');
    } else {
      item.classList.remove('border-white');
      item.classList.add('border-transparent');
    }
  });

  // Close Mobile Menu if open
  navMenu.classList.add('translate-x-full');
  menuIcon.src = './assets/shared/icon-hamburger.svg';

  renderPage(page);
}

// Dynamic Page Renderer
function renderPage(page) {
  const container = document.getElementById('main-content');
  
  if (page === 'home') {
    container.innerHTML = `
      <section class="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-12 lg:gap-0 mt-8 lg:mt-0">
        <div class="max-w-md">
          <h1 class="font-sans text-space-blue text-base md:text-xl lg:text-2xl tracking-[4.75px] uppercase">
            So, you want to travel to
            <span class="block font-serif text-white text-7xl md:text-[150px] my-6 leading-none">Space</span>
          </h1>
          <p class="text-space-blue text-sm md:text-base leading-relaxed">
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!
          </p>
        </div>
        <div class="mt-8 lg:mt-0">
          <button onclick="navigateTo('destination')" class="relative group bg-white text-space-dark font-serif text-xl md:text-3xl uppercase w-40 h-40 md:w-68 md:h-68 rounded-full flex items-center justify-center transition-all duration-300">
            <span class="z-10">Explore</span>
            <span class="absolute inset-0 bg-white/10 rounded-full scale-100 group-hover:scale-150 transition-transform duration-500 ease-out"></span>
          </button>
        </div>
      </section>
    `;
  } else if (page === 'destination') {
    const dests = spaceData.destinations;
    const active = dests[activeSubIndex];
    
    container.innerHTML = `
      <section class="flex flex-col gap-8">
        <h2 class="font-sans text-base md:text-xl lg:text-2xl tracking-[4.75px] uppercase text-center md:text-left">
          <span class="opacity-25 font-bold mr-4">01</span> Pick your destination
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
          <div class="flex justify-center">
            <img src="${active.images.png}" alt="${active.name}" class="w-48 h-48 md:w-80 md:h-80 lg:w-[445px] lg:h-[445px] animate-pulse" />
          </div>
          <div>
            <div class="flex justify-center lg:justify-start gap-8 border-b border-white/20 pb-4 mb-6 font-sans text-sm tracking-[2.7px] uppercase">
              ${dests.map((item, idx) => `
                <button onclick="changeSubIndex(${idx})" class="pb-2 border-b-2 ${idx === activeSubIndex ? 'border-white text-white' : 'border-transparent text-space-blue hover:border-white/50'} transition-all">
                  ${item.name}
                </button>
              `).join('')}
            </div>
            <h3 class="font-serif text-6xl md:text-8xl uppercase mb-4">${active.name}</h3>
            <p class="text-space-blue text-sm md:text-base leading-relaxed mb-8 border-b border-white/10 pb-8">${active.description}</p>
            <div class="flex flex-col md:flex-row justify-center lg:justify-start gap-8 md:gap-16">
              <div>
                <span class="font-sans text-xs tracking-[2.35px] text-space-blue uppercase block mb-2">Avg. distance</span>
                <span class="font-serif text-2xl uppercase">${active.distance}</span>
              </div>
              <div>
                <span class="font-sans text-xs tracking-[2.35px] text-space-blue uppercase block mb-2">Est. travel time</span>
                <span class="font-serif text-2xl uppercase">${active.travel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  } else if (page === 'crew') {
    const members = spaceData.crew;
    const active = members[activeSubIndex];

    container.innerHTML = `
      <section class="flex flex-col gap-8">
        <h2 class="font-sans text-base md:text-xl lg:text-2xl tracking-[4.75px] uppercase text-center md:text-left">
          <span class="opacity-25 font-bold mr-4">02</span> Meet your crew
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left">
          <div class="flex flex-col-reverse lg:flex-col gap-8">
            <div>
              <span class="font-serif text-lg md:text-2xl uppercase opacity-50 block mb-2">${active.role}</span>
              <h3 class="font-serif text-3xl md:text-5xl uppercase mb-4">${active.name}</h3>
              <p class="text-space-blue text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">${active.bio}</p>
            </div>
            <div class="flex justify-center lg:justify-start gap-4">
              ${members.map((_, idx) => `
                <button onclick="changeSubIndex(${idx})" class="w-3 h-3 md:w-4 md:h-4 rounded-full ${idx === activeSubIndex ? 'bg-white' : 'bg-white/20 hover:bg-white/50'} transition-all" aria-label="Slide ${idx + 1}"></button>
              `).join('')}
            </div>
          </div>
          <div class="flex justify-center border-b border-white/20 lg:border-none">
            <img src="${active.images.png}" alt="${active.name}" class="h-72 md:h-96 lg:h-[500px] object-contain" />
          </div>
        </div>
      </section>
    `;
  } else if (page === 'technology') {
    const techList = spaceData.technology;
    const active = techList[activeSubIndex];

    container.innerHTML = `
      <section class="flex flex-col gap-8">
        <h2 class="font-sans text-base md:text-xl lg:text-2xl tracking-[4.75px] uppercase text-center md:text-left">
          <span class="opacity-25 font-bold mr-4">03</span> Space launch 101
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center lg:text-left">
          <div class="lg:col-span-7 flex flex-col lg:flex-row gap-8 items-center">
            <div class="flex lg:flex-col gap-4 font-serif text-lg md:text-2xl">
              ${techList.map((_, idx) => `
                <button onclick="changeSubIndex(${idx})" class="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 ${idx === activeSubIndex ? 'bg-white text-space-dark' : 'text-white hover:border-white'} transition-all">
                  ${idx + 1}
                </button>
              `).join('')}
            </div>
            <div>
              <span class="font-sans text-sm tracking-[2.35px] text-space-blue uppercase block mb-2">The terminology...</span>
              <h3 class="font-serif text-3xl md:text-5xl uppercase mb-4">${active.name}</h3>
              <p class="text-space-blue text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">${active.description}</p>
            </div>
          </div>
          <div class="lg:col-span-5 order-first lg:order-last">
            <picture>
              <source media="(min-width: 1024px)" srcset="${active.images.portrait}">
              <img src="${active.images.landscape}" alt="${active.name}" class="w-full h-auto max-h-80 lg:max-h-none object-cover" />
            </picture>
          </div>
        </div>
      </section>
    `;
  }
}

// Change Inner Sub-tab Index (e.g. Moon -> Mars)
function changeSubIndex(index) {
  activeSubIndex = index;
  renderPage(currentPage);
}

// Initial Load
document.addEventListener('DOMContentLoaded', loadData);