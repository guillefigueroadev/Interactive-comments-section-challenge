export class HttpError {
  static interceptError(error) {
    alert('error');
    throw error.message;
  }
}