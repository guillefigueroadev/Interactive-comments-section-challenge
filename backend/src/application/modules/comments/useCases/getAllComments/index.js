import CommentsMockJson from '../../../../../application/mocks/comments.mock.json' assert { type: "json" };

export class GetAllComments {
  static Execute() {
    const sessionData = JSON.parse(sessionStorage.getItem('commentsSession'));
    if(sessionData) {
      CommentsMockJson.comments = sessionData;
    }

    return CommentsMockJson;
  }
}