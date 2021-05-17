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
    let iteratorLimit = this.cardsPerPage;
    let iterator = this.cardCounter;

    for (iterator; iterator < iteratorLimit; iterator++) {
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

        iteratorLimit += this.cardsPerPage;
        this.renderCardsByCategory(category);
      })
    }


  }

  creteCard(projectsList, iterator, response) {
    const card = document.createElement('div')
    card.classList.add('card')

    let tmpImage = new Image();
    tmpImage.classList.add('card__image')
    tmpImage.src = projectsList[iterator].url;

    tmpImage.addEventListener('load', async () => {
      card.innerHTML = `
        <div class="card__information">
          <div class="card__information-container"
            <h2 class="card__title">${projectsList[iterator].title.toUpperCase()}</h2>
            <hr>
            <h3 class="card__category">${projectsList[iterator].category.charAt(0).toUpperCase() + projectsList[iterator].category.slice(1)}</h3>
          </div>
        </div>
        `

      card.appendChild(tmpImage);
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
      return 0;
    });

    response(this.gridContainers[gridContainersHeight[0].id]);

  }

  clear() {
    this.gridContainers.forEach(element => {
      element.innerHTML = '';
    })

    const showMore = document.getElementById('show-more')
    if (showMore) {
      const parent = showMore.parentNode;
      parent.removeChild(showMore);

    }
  }

}