document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !navMenu.classList.contains('translate-x-full');
      
      if (isOpen) {
        navMenu.classList.add('translate-x-full');
        menuIcon.src = './assets/shared/icon-hamburger.svg';
      } else {
        navMenu.classList.remove('translate-x-full');
        menuIcon.src = './assets/shared/icon-close.svg';
      }
    });
  }
});