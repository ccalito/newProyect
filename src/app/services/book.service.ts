import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';
import {Book} from "../model/book";

@Injectable()
export class BookService{
    public url:string="http://localhost:8080/services/book";
	constructor(private _http: Http){}

    getBook(){
        return this._http.get(this.url).toPromise().then(res =>res.json() as Book).catch(this.handleError);
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  getBookExample():Book{
        return JSON.parse(`  {
            "_id": {
            "timestamp": 1488055911,
            "machineIdentifier": 3809784,
            "processIdentifier": 16754,
            "counter": 10658919,
            "time": 1488055911000,
            "date": 1488055911000,
            "timeSecond": 1488055911
            },
            "name": "Template01",
            "input_id": {
            "timestamp": 1487712539,
            "machineIdentifier": 8486786,
            "processIdentifier": 30593,
            "counter": 16682102,
            "time": 1487712539000,
            "date": 1487712539000,
            "timeSecond": 1487712539
            },
            "sizeX": 5,
            "sizeY": 5,
            "sheetList": [
            {
                "correlative": 1,
                "cellList": [
                {
                    "size": 10,
                    "posX": 1,
                    "posY": 1,
                    "textValue": "Hola",
                    "inputId01": null,
                    "style": null,
                    "parameterList": [
                    {
                        "name": "empcod",
                        "value": "1"
                    },
                    {
                        "name": "paicod",
                        "value": "GUA"
                    }
                    ]
                }
                ]
            }
            ]
      }`) as Book;
    }
}