import {WebcomponentUtil} from './src/core/shared/util/web-component.util.js';
import {HttpService} from './src/core/services/http.service.js';
import {EndPoints} from './src/core/shared/end-points/end-points.js';
import {CommentsController} from '../backend/index.js';

class App {
  httpService;
  init() {
    this.#initDependencies();
    this.#getAllComments();
  }

  #initDependencies() {
    this.httpService = new HttpService();
  }

  #getAllComments() {
    const target = document.querySelector('#comments');
    const {comments, currentUser} = this.httpService.get(EndPoints.getAllComments, CommentsController);

    if (comments) {
      WebcomponentUtil.inject(comments, 'comment-card-component', target, 'commentsSession');
    }
   
    //consumir backend con servicio http
    //aqui crear template segun el resultado del sessionStorage con el forEach
  }
} 
new App().init();