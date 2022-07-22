import {Handlers} from '../../core/shared/handlers/comments-handler.js';

class CommentCardComponent extends HTMLElement {
  connectedCallback() {
    this.#initShadowRoot();
  }

  async #initShadowRoot() {
    const currentDomain = `${window.location.origin}/frontend/src/components/comment-card`;
    const getHtmlTemplate = await fetch( `${currentDomain}/comment-card.html` );
    const getCssTemplate = await fetch( `${currentDomain}/comment-card.css` );
    const htmlTemplateAsString =  await getHtmlTemplate.text();
    const cssTemplateAsString =  await getCssTemplate.text();
    const createStylesHtmlAppend = `<style>${cssTemplateAsString}</style>`;
    this.attachShadow( { mode: 'open' } ).innerHTML = createStylesHtmlAppend;
    this.#initDataInformation(htmlTemplateAsString);
  }

  #initDataInformation(htmlTemplateAsString) {
    if(!this.data) {
      return;
    }

    const parent = Handlers.replaceHandlebarsOnTemplate(htmlTemplateAsString, {});
    const container = document.createElement('div');
    const nestedChild = document.createElement('div');
    nestedChild.className = this.data?.replies?.length && 'comment-card__child';
    container.innerHTML = parent;
    this.data?.replies?.forEach(reply => {
      const child = Handlers.replaceHandlebarsOnTemplate(htmlTemplateAsString, {});
      const childContainer = document.createElement('div');
      childContainer.className = 'comment-card__childContainer';
      childContainer.innerHTML = child;
      this.#scoreIteractions(childContainer, reply.score);
      nestedChild.appendChild(childContainer);
    });

    container.appendChild(nestedChild);
    this.shadowRoot.append(container);
    this.#scoreIteractions(container, this.data.score);
  }

  #initComponentIteractions() {
    
  }

  #scoreIteractions(container, score) {
    const scoreComponentSelector = container.querySelector('score-component');
    scoreComponentSelector.currentValue = score;
    scoreComponentSelector.onclick = (event) => {
      console.log(event);
    }
  }

}
customElements.define( 'comment-card-component', CommentCardComponent )