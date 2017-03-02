import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';
import {Book} from "../model/book";
import {Pais} from "../model/pais";
import {Empresa} from "../model/empresa";
import {Departamento} from "../model/departamento";
import {Periodo} from "../model/periodo";

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

    getEmpresas(pais:string){
        return this._http.get(this.urlBase+"/companies/filter/pais="+pais).toPromise().then(res=> res.json() as Array<Empresa> ).catch(this.handleError);
    }

    getDepartamentos(pais:string,empresa:string){
        return this._http.get(this.urlBase+"/departments/filter/pais="+pais+"&empresa="+empresa).toPromise().then(res=> res.json() as Array<Departamento> ).catch(this.handleError);
    }

   getPeriodos(pais:string,empresa:string,departamento:string){
        return this._http.get(this.urlBase+"/periods/filter/pais="+pais+"&empresa="+empresa+"&departamento="+departamento).toPromise().then(res=> res.json() as Array<Periodo> ).catch(this.handleError);
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

  getDepartamentoExample(pais:string,empresa:string):Array<Departamento>{
    if(pais==="GUA"&&empresa==="001"){
        return JSON.parse(
          `  [{
                "departmentId": {
                    "paicod": "GUA",
                    "empcod": "001",
                    "depcod": "1"
                },
                "paicod": "GUA",
                "empcod": "001",
                "depcod": "1",
                "depnom": "CONTABILIDAD"
                }
            ]
        `);
    }else if(pais==="SAN"&&empresa==="002"){
        return JSON.parse(
                `  [{
                "departmentId": {
                    "paicod": "SAN",
                    "empcod": "002",
                    "depcod": "2"
                },
                "paicod": "SAN",
                "empcod": "002",
                "depcod": "2",
                "depnom": "CONTABILIDAD SALVADOR"
                }
            ]
                `);
    }
  }

    getPeriodosExample(pais:string,empresa:string,departamento:string):Array<Periodo>{
        if(pais==="GUA"&&empresa==="001"&&departamento==="1"){
            return JSON.parse(
            `  [{
                "departmentId": {
                    "paicod": "GUA",
                    "empcod": "001",
                    "depcod": "1",
                    "percod": "2017"
                },
                "paicod": "GUA",
                "empcod": "001",
                "depcod": "1",
                "percod": "2017",
                "perdes": "PERIODO 2017"
                    }
                ]
            `);
        }else if(pais==="SAN"&&empresa==="002"&&departamento==="2"){
            return JSON.parse(
                    `   [{
                    "departmentId": {
                        "paicod": "SAN",
                        "empcod": "002",
                        "depcod": "2",
                        "percod": "2018"
                    },
                    "paicod": "SAN",
                    "empcod": "002",
                    "depcod": "2",
                    "percod": "2018",
                    "perdes": "PERIODO 2018"
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
                        "value": "001"
                    },
                    {
                        "name": "paicod",
                        "value": "GUA"
                    },
                    {
                        "name": "depcod",
                        "value": "1"
                    },
                    {
                        "name": "percod",
                        "value": "2017"
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
                        "value": "002"
                    },
                    {
                        "name": "paicod",
                        "value": "SAN"
                    },
                    {
                        "name": "depcod",
                        "value": "2"
                    },
                    {
                        "name": "percod",
                        "value": "2018"
                    }
                    ]
                }
                ]
            }
            ]
      }`) as Book;
    }
}