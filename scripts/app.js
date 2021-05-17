const filter = new Filter('filter');
const mainMenu = new Filter('main-menu');
const menu = new Menu();

window.addEventListener('load', () => {
  const cards = new Cards();
  cards.renderCardsByCategory('all');
})