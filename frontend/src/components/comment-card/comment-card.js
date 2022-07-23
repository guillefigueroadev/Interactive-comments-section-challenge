import {Handlers} from '../../core/shared/handlers/comments-handler.js';

class CommentCardComponent extends HTMLElement {
  htmlTemplateAsString;

  connectedCallback() {
    this.#initShadowRoot();
  }

  async #initShadowRoot() {
    const currentDomain = `${window.location.origin}/frontend/src/components/comment-card`;
    const getHtmlTemplate = await fetch( `${currentDomain}/comment-card.html` );
    const getCssTemplate = await fetch( `${currentDomain}/comment-card.css` );
    this.htmlTemplateAsString =  await getHtmlTemplate.text();
    const cssTemplateAsString =  await getCssTemplate.text();
    const createStylesHtmlAppend = `<style>${cssTemplateAsString}</style>`;
    this.attachShadow( { mode: 'open' } ).innerHTML = createStylesHtmlAppend;
    this.#initDataInformation();
  }

  #initDataInformation() {
    if(!this.data) {
      return;
    }

    const parent = Handlers.replaceHandlebarsOnTemplate(
      this.htmlTemplateAsString, 
      {
        userImage: this.data.user.image.webp, 
        username: this.data.user.username, 
        createdAt: this.data.createdAt, 
        content: this.data.content,
        replyingTo: ''
      });

    const container = document.createElement('div');
    const nestedChild = this.#childReplies(this.data?.replies);
    container.innerHTML = parent;
    container.appendChild(nestedChild);
    this.shadowRoot.append(container);
    this.#scoreIteractions(container, this.data.score);
  }

  #initComponentIteractions() {
    
  }

  #childReplies(replies) {
    const nestedChild = document.createElement('div');
    nestedChild.className = replies?.length && 'comment-card__child';

    replies?.forEach(reply => {
      const replaceOnchildTemplate = Handlers.replaceHandlebarsOnTemplate(
        this.htmlTemplateAsString, 
        {
          userImage: reply.user.image.webp, 
          username: reply.user.username, 
          createdAt: reply.createdAt, 
          content: reply.content,
          replyingTo: reply?.replyingTo ? `@${reply.replyingTo}` : ''
        });

      const childContainer = document.createElement('div');
      childContainer.className = 'comment-card__childContainer';
      childContainer.innerHTML = replaceOnchildTemplate;

      if (!!reply?.replies?.length) {
        const nestedReply = this.#childReplies(reply.replies);
        childContainer.appendChild(nestedReply);
      }

      this.#scoreIteractions(childContainer, reply.score);
      nestedChild.appendChild(childContainer);
    });

    return nestedChild;
  }

  #scoreIteractions(container, score) {
    const scoreComponentSelector = container.querySelector('score-component');
    scoreComponentSelector.currentValue = score;
    //ver como crear un callback en js similar al onclick
    scoreComponentSelector.onclick = (event) => {
      console.log(event);
    }
  }

}
customElements.define( 'comment-card-component', CommentCardComponent )