class Grid {
    constructor(numberColumns, widthColumns) {
        this.props =
            [
                { name: 'numberColumns', value: numberColumns, measure: '', default: 3 },
                { name: 'widthColumns', value: widthColumns, measure: 'px', default: 200 },
                { name: 'maxWidthContainer', value: 0, measure: 'px', default: 600 }
            ];
        this.grid = document.getElementById('grid');
        this.gridContainersList = [];

        this.calculateMaxWidthContainer();
        this.initStyles();
        this.createGridContainers();
    }

    initStyles() {
        this.props.forEach(element => {
            this.setStyleVariable(element.name, element.value, element.measure);
        });

    }

    setStyleVariable(varirable, value, measure) {
        document.documentElement.style.setProperty(`--${varirable}`, value + measure);

    }

    calculateMaxWidthContainer() {

        const numberColumns = this.getPropValue('numberColumns');
        const widthColumns = this.getPropValue('widthColumns');

        this.setPropValue('maxWidthContainer', numberColumns * widthColumns);

    }

    createGridContainers() {
        const numberColumns = this.getPropValue('numberColumns');

        for (let i = 0; i < numberColumns; i++) {
            const gridContainer = document.createElement('div');
            gridContainer.setAttribute('id', 'grid-container-' + i);
            gridContainer.classList.add('grid-container');
            this.gridContainersList.push(gridContainer)
            this.grid.appendChild(gridContainer);
        }


    }

    getPropValue(propName) {
        return this.props.find(element => element.name == propName).value;
    }

    setPropValue(propName, newValue) {
        this.props.find(element => element.name == propName).value = newValue;
    }
}