import {GetAllComments} from '../../../application/modules/comments/useCases/getAllComments/index.js';

export class CommentsController{
  init(endPoint) {
    if (endPoint === 'getAllComments') {
      return this.#getAllComments();
    }

    return null;
  }

  #getAllComments() {
    return GetAllComments.Execute();
  }
}