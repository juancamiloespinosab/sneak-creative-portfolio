class Cards {
  constructor() {
    this.cardsPerPage;
    this.cardCounter;
    this.iteratorLimit;

    this.message;

    this.setCounters();

    this.gridContainers = [];
    this.initGrid();

  }

  initGrid() {
    Object.assign(this.gridContainers, grid.gridContainersList)

  }

  setCounters() {
    this.cardsPerPage = 10;
    this.cardCounter = 0;
    this.iteratorLimit = this.cardsPerPage;
  }

  async renderCardsByCategory(category) {
    const projects = new Projects();
    const projectsList = await projects.getProjectsByCategory(category);
    this.renderCards(projectsList, () => {
      this.createShowMoreButton(category, 'category', projectsList.length);

    })

  }

  async renderCardsByTitle(title) {
    const projects = new Projects();
    const projectsList = await projects.getProjectsByTitle(title)
    const projectsListLength = projectsList.length;


    if (projectsListLength == 0) {
      this.message = document.createElement('p');
      this.message.innerHTML = '<p class="grid__message">There were no results for your search</p>';
      document.getElementById('grid').insertBefore(this.message, this.gridContainers[0]);
    } else {
      this.renderCards(projectsList, () => {
        this.createShowMoreButton(title, 'title', projectsList.length)

      });
    }



  }

  renderCards(projectsList, finish) {

    const projectsListLength = projectsList.length;
    let iterator = this.cardCounter;

    for (iterator; iterator < this.iteratorLimit; iterator++) {
      if (iterator < projectsListLength) {

        this.creteCard(projectsList, iterator, card => {
          this.getGridContainer(gridContainer => {
            gridContainer.appendChild(card);
          });
        });

      }
    }
    this.cardCounter = iterator;
    finish(true);



  }

  createShowMoreButton(value, renderBy, projectsListLength) {
    if ((projectsListLength - this.cardCounter) > 0) {
      const showMore = document.createElement('div');
      showMore.setAttribute('id', 'show-more');
      showMore.style.gridColumn = '1 / ' + (grid.getPropValue('numberColumns') + 1);
      showMore.classList.add('show-more', 'flex-center');
      showMore.innerHTML = `<button id="show-more-button" class="show-more__button btn-primary-color font-size-medium">Show Me More</button>`;
      document.getElementById('grid').appendChild(showMore);

      showMore.addEventListener('click', () => {
        showMore.classList.add('show-more--disable')


        setTimeout(() => {
          const parent = showMore.parentNode;
          parent.removeChild(showMore);
        }, 200);

        this.iteratorLimit += this.cardsPerPage;
        renderBy == 'category' ? this.renderCardsByCategory(value) : this.renderCardsByTitle(value);

      })
    }
  }

  creteCard(projectsList, iterator, response) {
    const card = document.createElement('div')
    card.classList.add('card')

    let tmpImage = new Image();
    tmpImage.classList.add('card__image', 'flex-center')
    tmpImage.src = projectsList[iterator].url;

    tmpImage.addEventListener('load', async () => {
      card.innerHTML = `
        <div class="card__information flex-center">
          <div class="card__information-container"
            <h2 class="card__title font-size-medium font-questrial">${projectsList[iterator].title.toUpperCase()}</h2>
            <hr>
            <h3 class="card__category font-size-small">${projectsList[iterator].category.charAt(0).toUpperCase() + projectsList[iterator].category.slice(1)}</h3>
          </div>
        </div>
        `

      card.appendChild(tmpImage);
      response(card)

    })


  }

  getGridContainer(response) {

    let gridContainersHeight = [];

    this.gridContainers.forEach((element, index) => {
      gridContainersHeight.push({
        id: index, width: element.clientHeight
      })
    });

    // gridContainersHeight = [
    //   { id: 0, width: this.gridContainers[0].clientHeight },
    //   { id: 1, width: this.gridContainers[1].clientHeight },
    //   { id: 2, width: this.gridContainers[2].clientHeight }
    // ];

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
      const showMoreParent = showMore.parentNode;
      showMoreParent.removeChild(showMore);

    }

    if (this.message) {
      const messageMoreParent = this.message.parentNode;
      if (messageMoreParent) {
        messageMoreParent.removeChild(this.message);

      }
    }


  }

}