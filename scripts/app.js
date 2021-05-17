class Projects {

  async getProjectsByCategory(category) {
    const projectsList = [];
    category = category.toLowerCase();

    const portfolio = await this.getJSON()


    if (category == 'all') {
      Object.assign(projectsList, portfolio.portfolio.projects);
    }
    else {
      portfolio.portfolio.projects.forEach(element => {
        if (element.category == category) {
          const project = {
            id: element.id,
            title: element.title,
            category: element.category,
            url: element.url
          }
          projectsList.push(project)
        }
      });
    }

    return projectsList

  }

  async getJSON() {
    const response = {};

    await fetch('assets/images/portfolio.json')
      .then(response => response.json())
      .then(data => {
        Object.assign(response, data);
      });

    return response;
  }
}


class Cards {
  constructor() {
    this.cardsPerPage = 10;
    this.cardCounter = 0;

    this.gridContainers = [
      document.getElementById('grid-container-left'),
      document.getElementById('grid-container-center'),
      document.getElementById('grid-container-right')
    ];
  }

  async renderCardsByCategory(category) {
    const projects = new Projects();
    const projectsList = await projects.getProjectsByCategory(category)
    const projectsListLength = projectsList.length;
    let iterator = this.cardCounter;


    for (iterator; iterator < this.cardsPerPage; iterator++) {
      if (iterator < projectsListLength) {


        this.creteCard(projectsList, iterator, card => {
          this.getGridContainer(gridContainer => {
            gridContainer.appendChild(card)

          });
        });



      }
    }
    this.cardCounter = iterator;

    if ((projectsListLength - this.cardCounter) > 0) {
      const showMore = document.createElement('div');
      showMore.setAttribute('id', 'show-more');
      showMore.classList.add('show-more');
      showMore.innerHTML = `<button id="show-more-button" class="show-more__button">Show Me More</button>`;
      document.getElementById('grid').appendChild(showMore);

      showMore.addEventListener('click', () => {

        showMore.classList.add('show-more--disable')

        setTimeout(() => {
          const parent = showMore.parentNode;
          parent.removeChild(showMore);
        }, 200);

        this.cardsPerPage += 10;
        this.renderCardsByCategory(category);
      })
    }


  }

  creteCard(projectsList, iterator, response) {
    const card = document.createElement('div')
    card.classList.add('card')

    let myImage = new Image();
    myImage.classList.add('card__image')
    myImage.src = projectsList[iterator].url;

    myImage.addEventListener('load', async () => {
      card.innerHTML = `
      <div class="card__information">
        <div class="card__information-container"
          <h2 class="card__title">${projectsList[iterator].title.toUpperCase()}</h2>
          <hr>
          <h3 class="card__category">${projectsList[iterator].category.charAt(0).toUpperCase() + projectsList[iterator].category.slice(1)}</h3>
        </div>
      </div>
      `

      card.appendChild(myImage);
      response(card)

    })


  }

  getGridContainer(response) {

    let gridContainersHeight = [];

    gridContainersHeight = [
      { id: 0, width: this.gridContainers[0].clientHeight },
      { id: 1, width: this.gridContainers[1].clientHeight },
      { id: 2, width: this.gridContainers[2].clientHeight }
    ];

    gridContainersHeight.sort((a, b) => {
      if (a.width > b.width) {
        return 1;
      }
      if (a.width < b.width) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    response(this.gridContainers[gridContainersHeight[0].id]);

  }

  clear() {
    this.gridContainers.forEach(element => {
      element.innerHTML = '';
    })

    let showMore = document.getElementById('show-more')
    if (showMore) {
      const parent = showMore.parentNode;
      parent.removeChild(showMore);

    }
  }

}

class Menu {
  constructor() {
    this.mobileMenu = document.getElementById('mobile-menu');
    this.state = 'closed';
    this.mainMenu = document.getElementById('main-menu');
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
    this.mobileMenu.style.animation = 'rotate 1s';
    this.mobileMenu.classList.add('mobile-menu--open');

  }

  closeMenu() {
    this.mainMenu.classList.remove('main-menu--open');
    this.mobileMenu.src = 'assets/icons/menu.png'
    this.mobileMenu.style.animation = 'close 1s';
    this.mobileMenu.classList.remove('mobile-menu--open');

  }
}

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
        const cards = new Cards();
        cards.clear();
        cards.renderCardsByCategory(e.target.innerText)
      }
    })
  }
}

const filter = new Filter('filter');
const mainMenu = new Filter('main-menu');
const menu = new Menu();

window.addEventListener('load', () => {
  const cards = new Cards();
  cards.renderCardsByCategory('all');
})