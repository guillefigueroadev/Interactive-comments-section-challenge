import {HttpService} from './src/core/services/http.service.js';
import {EndPoints} from './src/shared/end-points/end-points.js';
import {CommentsController} from '../backend/index.js';
//aqui hacer llamaod al api para obtener

class App {
  httpService;
  init() {
    this.#initDependencies();
    this.#getAllComments();
  }

  #initDependencies() {
    this.httpService = new HttpService();
  }

  async #getAllComments() {
    const target = document.querySelector('#comments');
    const response = await this.httpService.get(EndPoints.getAllComments, CommentsController);

    if (response) {

      console.log(response);

     
    }
   
    //consumir backend con servicio http
    //aqui crear template segun el resultado del localStorage con el forEach
  }
} 
new App().init();