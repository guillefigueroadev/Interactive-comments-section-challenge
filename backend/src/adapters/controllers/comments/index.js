import {GetAllComments} from '../../../application/modules/comments/useCases/getAllComments/index.js';
import {CreateComment} from '../../../application/modules/comments/useCases/createComment/index.js';

export class CommentsController{
  init(endPoint) {
    if (endPoint.includes('getAllComments')) {
      return this.#getAllComments();
    }

    if (endPoint.includes('createComment')) {
      return this.#createComment(endPoint);
    }

    return null;
  }

  #getAllComments() {
    return GetAllComments.Execute();
  }

  #createComment(endPoint) {
    const paramsPosition = 1;
    const simulateDomainForGetParams = endPoint.split('?');
    let commendIdToRelation = null;

    if (simulateDomainForGetParams[paramsPosition]) {
      const urlSearchParams = new URLSearchParams(`?${simulateDomainForGetParams[paramsPosition]}`);
      const {commentId} = Object.fromEntries(urlSearchParams.entries());
      commendIdToRelation = commentId || null;
    }

    console.log(commendIdToRelation);
    
    return CreateComment.Execute();
  }
}