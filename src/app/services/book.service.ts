import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';
import {Book} from "../model/book";
import {Pais} from "../model/pais";
import {Empresa} from "../model/empresa";

@Injectable()
export class BookService{
    public urlBase:string="http://localhost:9000/resource/api/legacy";

	constructor(private _http: Http){}

    getBook(){
        return this._http.get(this.urlBase+"/book").toPromise().then(res =>res.json() as Book).catch(this.handleError);
    }

    getPaises(){
        return this._http.get(this.urlBase+"/countries/").toPromise().then(res=> res.json() as Array<Pais> ).catch(this.handleError);
    }

    getEmpresa(pais:string){
        return this._http.get(this.urlBase+"/companies/filter/pais="+pais).toPromise().then(res=> res.json() as Array<Empresa> ).catch(this.handleError);
    }

    
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  getPaisesExample():Array<Pais>{
      return JSON.parse(
        `[{
		"paicod": "GUA",
		"painom": "GUATEMALA",
		"pastat": " ",
		"mncod": " "
        },{
            "paicod": "SAN",
            "painom": "Salvador",
            "pastat": " ",
            "mncod": " "
        } ]`
      );
  }

  getCompaniaExample(pais:string):Array<Empresa>{
    if(pais==="GUA"){
        return JSON.parse(
          `  [{
                "empresaId": {
                    "paicod": "GUA",
                    "empcod": "001"
                },
                "paicod": "GUA",
                "empcod": "001",
                "empnom": "Cliente 01"
                    }
                ]
        `);
    }else if(pais==="SAN"){
        return JSON.parse(
                `  [{
                        "empresaId": {
                            "paicod": "SAN",
                            "empcod": "002"
                        },
                        "paicod": "SAN",
                        "empcod": "002",
                        "empnom": "Cliente 02 SA"
                            }
                        ]
                `);
    }
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
                },
                 {
                    "size": 10,
                    "posX": 2,
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