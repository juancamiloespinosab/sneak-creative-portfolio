class Filter {
  constructor(filterId) {
    this.searchState = 'closed';
    this.searchBox = document.getElementById('main-menu__search-box');
    this.mainMenu = document.getElementById('main-menu');
    this.projects = document.getElementById('projects');
    this.search;

    this.filters = document.getElementById(filterId);
    this.filters.addEventListener('click', e => {
      if (e.target.classList.contains('main-menu__item')) {

        const menu = new Menu();
        menu.closeMenu();

        this.removeItemActive();
        this.addItemActive(e.target.innerText);

        cards.clear();
        cards.setCounters();
        cards.renderCardsByCategory(e.target.innerText)
      }

      if (e.target.classList.contains('main-menu__search')) {
        this.search = e.target;

        if (this.searchState == 'closed') {
          this.openSearch();
        } else {
          this.closeSearch();
        }

        this.searchBox.addEventListener('keyup', e => {
          if (e.code == 'Enter' || e.key == 'Enter') {
            this.closeSearch()
          }
        })

      }

    })
  }

  openSearch() {
    this.search.classList.add('main-menu__search--active');
    this.searchBox.classList.add('main-menu__search-box--active');
    this.mainMenu.classList.add('main-menu--search-active');
    this.searchState = 'open';
    this.search.setAttribute('href', '#');
  }

  closeSearch() {
    this.searchBox.classList.remove('main-menu__search-box--active');
    this.search.classList.remove('main-menu__search--active');
    this.mainMenu.classList.remove('main-menu--search-active');
    this.searchState = 'closed';
    menu.closeMenu();

    this.scrollToGrid();

    this.removeItemActive();
    this.addItemActive('All');

    cards.clear();
    cards.setCounters();
    cards.renderCardsByTitle(this.searchBox.value);
  }

  scrollToGrid() {
    window.scroll({
      top: this.projects.offsetTop,
      behavior: "smooth"
    })
  }

  removeItemActive() {
    document.querySelectorAll('.main-menu__item--active').forEach(element => {
      element.classList.remove('main-menu__item--active')
    })
  }

  addItemActive(categoryName) {
    document.querySelectorAll('.main-menu__item').forEach(element => {
      if (element.innerText == categoryName) {
        element.classList.add('main-menu__item--active')

      }
    })
  }
}