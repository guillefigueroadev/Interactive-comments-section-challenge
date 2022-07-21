import {HttpError} from './http-errors.service.js';

export class HttpService {
  get(url, controller) {
    try {
      const response = new controller().init(url);
      return response;
    } catch (error) {
      HttpError.interceptError(error);
    }
  }
}