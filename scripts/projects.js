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