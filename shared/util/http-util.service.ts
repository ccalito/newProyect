import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class HttpUtilService {

  constructor() { }

  handleError(error: Response) {
    console.error(error);
    if (0 === error.status) {
      // TODO check if '0' is the correct status
      window.location.href = '/';
    } else {
      let ex = error.json();
      if (ex.message) {
        return Observable.throw(ex.message);
      } else {
        return Observable.throw(ex.error);
      }
    }
  }

}
