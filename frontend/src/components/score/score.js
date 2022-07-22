import {Handlers} from '../../core/shared/handlers/comments-handler.js';

class ScoreComponent extends HTMLElement {
  connectedCallback() {
    this.#initShadowRoot();
  }

  async #initShadowRoot() {
    const currentDomain = `${window.location.origin}/frontend/src/components/score`;
    const getHtmlTemplate = await fetch( `${currentDomain}/score.html` );
    const getCssTemplate = await fetch( `${currentDomain}/score.css` );
    const htmlTemplateAsString =  await getHtmlTemplate.text();
    const cssTemplateAsString =  await getCssTemplate.text();
    const createStylesHtmlAppend = `<style>${cssTemplateAsString}</style>`;
    this.attachShadow( { mode: 'open' } ).innerHTML = createStylesHtmlAppend;
    this.#initDataInformation(htmlTemplateAsString);
  }

  #initDataInformation(htmlTemplateAsString) {
    this.currentValue = this.currentValue || 1;
    const parent = Handlers.replaceHandlebarsOnTemplate(htmlTemplateAsString, {score: this.currentValue});
    const container = document.createElement('div');
    container.innerHTML = parent;
    this.shadowRoot.append(container);
    this.#initComponentIteractions();
  }

  #initComponentIteractions() {
    const scoreNumber = this.shadowRoot.querySelector('.score__number');
    this.shadowRoot.querySelector('.iconPlus').addEventListener('click', (event) => {
      this.currentValue = this.currentValue + 1;
      event.selectedType = 'plus';
      event.selectedValue = this.currentValue;
      scoreNumber.innerHTML = this.currentValue;
    });

    this.shadowRoot.querySelector('.iconMinus').addEventListener('click', (event) => {
      this.currentValue = ((this.currentValue - 1) < 0) ? 0 : this.currentValue - 1;
      event.selectedType = 'minus';
      event.selectedValue = this.currentValue;
      scoreNumber.innerHTML = this.currentValue;
    });
  }

}
customElements.define('score-component', ScoreComponent )