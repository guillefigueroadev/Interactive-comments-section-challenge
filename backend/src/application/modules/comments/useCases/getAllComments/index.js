import CommentsMockJson from '../../../../../application/mocks/comments.mock.json' assert { type: "json" };

export class GetAllComments {
  static Execute() {
    const checkData = sessionStorage.getItem('commentsData') || CommentsMockJson;
    return checkData;
  }
}