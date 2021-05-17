class Menu {
    constructor() {
      this.mobileMenu = document.getElementById('mobile-menu');
      this.mainMenu = document.getElementById('main-menu');
      this.state = 'closed';
      this.startMenu();
    }
  
    startMenu() {
      this.mobileMenu.addEventListener('click', e => {
  
        if (this.state == 'closed') {
          this.state = 'open';
          this.openMenu();
        } else {
          this.state = 'closed';
          this.closeMenu();
        }
      })
    }
  
    openMenu() {
      this.mainMenu.classList.add('main-menu--open');
      this.mobileMenu.src = 'assets/icons/cruz.png'
      this.mobileMenu.style.animation = 'rotate .5s';
      this.mobileMenu.classList.add('mobile-menu--open');
  
    }
  
    closeMenu() {
      this.mainMenu.classList.remove('main-menu--open');
      this.mobileMenu.src = 'assets/icons/menu.png'
      this.mobileMenu.style.animation = 'fade-in 1s';
      this.mobileMenu.classList.remove('mobile-menu--open');
  
    }
  }