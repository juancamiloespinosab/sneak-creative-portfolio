const grid = new Grid(3, 200); //numero de columnas y su ancho para generar la cuadricula
const cards = new Cards();
const filter = new Filter('filter');
const mainMenu = new Filter('main-menu');
const menu = new Menu();

window.addEventListener('load', () => {
  cards.renderCardsByCategory('all');
})