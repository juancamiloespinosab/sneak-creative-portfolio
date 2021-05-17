class Filter {
  constructor(filterId) {
    this.filters = document.getElementById(filterId);
    this.filters.addEventListener('click', e => {
      if (e.target.classList.contains('main-menu__item')) {

        const menu = new Menu();
        menu.closeMenu();

        document.querySelectorAll('.main-menu__item--active').forEach(element => {
          element.classList.remove('main-menu__item--active')
        })

        document.querySelectorAll('.main-menu__item').forEach(element => {
          if (element.innerText == e.target.innerText) {
            element.classList.add('main-menu__item--active')

          }
        })
        cards.clear();
        cards.setCounters();
        cards.renderCardsByCategory(e.target.innerText)
      }
    })
  }
}