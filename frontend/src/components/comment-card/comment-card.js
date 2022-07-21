import {CommentsHandler} from '../../core/handlers/comment-card/comments-handler.js';

class CommentCardComponent extends HTMLElement {
  async connectedCallback() {
    const currentDomain = `${window.location.origin}/src/components/comment-card`;
    const getHtmlTemplate = await fetch( `${currentDomain}/comment-card.html` );
    const getCssTemplate = await fetch( `${currentDomain}/comment-card.css` );
    const htmlTemplateAsString =  await getHtmlTemplate.text();
    const cssTemplateAsString =  await getCssTemplate.text();
    const createStylesHtmlAppend = `<style>${cssTemplateAsString}</style>${htmlTemplateAsString}`;
    this.attachShadow( { mode: 'open' } ).innerHTML = createStylesHtmlAppend;
    this.#initComponentIteractions();
  }

  #initComponentIteractions() {
    const commentHandler = new CommentsHandler();
  }

}
customElements.define( 'comment-card', CommentCardComponent )