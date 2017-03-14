import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';
import {Book} from "../model/book";
import {Pais} from "../model/pais";
import {Empresa} from "../model/empresa";
import {Departamento} from "../model/departamento";
import {Periodo} from "../model/periodo";
import {Cell} from "../model/cell";
import {Parameter} from "../model/parameter";
import {Moneda} from "../model/Moneda";
import {InputId} from "../model/inputId";
import {InputQuery} from "../model/inputquery";


@Injectable()
export class BookService{
    public urlBase:string="http://localhost:9000/resource/api/legacy";

	constructor(private _http: Http){}

    getBook(){
        return this._http.get(this.urlBase+"/book").toPromise().then(res =>res.json() as Book).catch(this.handleError);
    }

    getInputQuery(inputId:string){
        return this._http.get(this.urlBase+"/api/dynamic/query").toPromise().then(res =>res.json() as InputQuery).catch(this.handleError);
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

   getMonedas(){
        return this._http.get(this.urlBase+"/monedas/").toPromise().then(res=> res.json() as Array<Moneda> ).catch(this.handleError);
   }

   getInput(inputId:string){
        return this._http.get(this.urlBase+"/inputId/").toPromise().then(res=> res.json() as InputId ).catch(this.handleError);
   }
   
   submitCell(cell:Cell){

   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  getInputQueryExample():InputQuery{
       return JSON.parse(
        `{
           "content": [{
                    "values": [
                        "1",
                        "A C T I V O"
                    ]
                }, {
                    "values": [
                        "101",
                        "DISPONIBLES"
                    ]
                }, {
                    "values": [
                        "1011",
                        "MONEDA NACIONAL"
                    ]
                }, {
                    "values": [
                        "101101",
                        "CAJA"
                    ]
                }, {
                    "values": [
                        "101101.01",
                        "CAJA MOVIMIENTO DIARIO"
                    ]
                }, {
                    "values": [
                        "101101.01.01",
                        "CAJEROS DE VENTANILLA"
                    ]
                }, {
                    "values": [
                        "101102.02",
                        "DEPOSITOS ESPECIALES"
                    ]
                }
            ],
            "parameters": [
                "ctcod",
                "ctdes1"
            ]
        }`
      );
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

  getMonedaExample():Array<Moneda>{
      return JSON.parse(
        `[{
            "moneda": "DFT",
            "descripcion": "Moneda local"
        },{
            "moneda": "US$",
            "descripcion": "Dólares"
        } ]`
      );
  }

  getBookExample():Book{
        return JSON.parse(` {
        "_id": "58c030d332f60e5ba8b32790",
        "_class": "com.is4tech.reporting.templates.Template",
        "name": "test01",
        "input_id": "58b1ee763a21f841b5c9d138",
        "username": "anonymous",
        "sizeX": 7,
        "sizeY": 51,
        "xls": false,
        "parametersList": [
            {
            "name": "paicod",
            "value": "HON"
            },
            {
            "name": "empcod",
            "value": "BAN"
            },
            {
            "name": "depcod",
            "value": "1"
            },
            {
            "name": "percod",
            "value": "2016"
            },
            {
            "name": "moncod",
            "value": "DFT"
            }
        ],
        "sheetList": [
            {
            "correlative": 0,
            "cellList": [
                {
                "posX": 0,
                "posY": 2,
                "textValue": "KM 21.5 Carretera a El Salvador",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                }
                },
                {
                "posX": 0,
                "posY": 3,
                "textValue": "Mz 15 Casa 7 Condominio Cumbres de la Arboleda",
                "inputId01": "58acb11b817f827781fe8c76",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                },
                "parameterList": [
                    {
                    "name": "paicod",
                    "value": "GUA"
                    }
                ],
                "valueList": [
                    {
                    "name": "ctcod",
                    "value": "01.0011.0101"
                    },
                    {
                    "name": "ctdes1",
                    "value": "Cuenta de ejemplo."
                    }
                ]
                },
                {
                "posX": 0,
                "posY": 4,
                "textValue": "NIT  9439555-1",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                }
                },
                {
                "posX": 0,
                "posY": 7,
                "textValue": "Nombre: ",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 0,
                "posY": 9,
                "textValue": "Dirección:",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 0,
                "posY": 11,
                "textValue": "Cantidad",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                }
                },
                {
                "posX": 0,
                "posY": 25,
                "textValue": "TOTAL EN LETRAS:",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 0,
                "posY": 26,
                "textValue": "   LITOGRAFIA E&B NIT.: 1971767-9 Autorizado",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 0,
                "posY": 27,
                "textValue": "   Según Resolución No. 2017-5-494-1551 del 001 al 100 de fecha 13-02-2017 S.A.T. VENCE: 13-02-2018",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 1,
                "posY": 0,
                "textValue": "ISOFTEC",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                }
                },
                {
                "posX": 1,
                "posY": 11,
                "textValue": "Descripción",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                }
                },
                {
                "posX": 3,
                "posY": 25,
                "textValue": "TOTAL:",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 4,
                "posY": 1,
                "textValue": "Número:",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF176983"
                }
                },
                {
                "posX": 4,
                "posY": 2,
                "textValue": "Fecha:",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF176983"
                }
                },
                {
                "posX": 4,
                "posY": 11,
                "textValue": "Total",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF229EC4"
                }
                },
                {
                "posX": 5,
                "posY": 0,
                "textValue": "FACTURA   Serie A",
                "style": {
                    "fontFamily": "Arial",
                    "backgroundColor": "FF008080",
                    "foregroundColor": "FF176983"
                }
                },
                {
                "posX": 5,
                "posY": 26,
                "textValue": "ORIGINAL: CLIENTE – DUPLICADO: CONTABILIDAD",
                "style": {
                    "fontFamily": "Arial"
                }
                },
                {
                "posX": 5,
                "posY": 27,
                "textValue": "FECHA DE VENCIMIENTO: 27/12/2017",
                "style": {
                    "fontFamily": "Arial"
                }
                }
            ]
            }
        ]
    }`) as Book;
}

 getInputExample():InputId{
        return JSON.parse(`
    {
    "_id": "58b1ee763a21f841b5c9d138",
    "queryList": [
        {
        "correlative": 1,
        "query": "SELECT CTCOD, SMSALI, &SALDOM FROM V5CFBDAT.CFSALM WHERE PAICOD = '&pais' AND EMPCOD = '&empresa' AND DEPCOD = '&departamento' AND TIPCON = '1' AND PERCOD = '&periodo' AND MOCOD=&moneda AND CTCOD = ?",
        "name": "Saldo Mensual",
        "fields": [
            {
            "variable": "ctcod",
            "label": "Cuenta",
            "description": "Cuenta Contable"
            },
            {
            "variable": "smsali",
            "label": "Saldo Inicial",
            "description": "Saldo Inicial de Período"
            }
        ]
        },
        {
        "correlative": 2,
        "query": "SELECT CTCOD, CTDES1 FROM V5CFBDAT.CFCTAS WHERE PAICOD = '&pais' AND EMPCOD = '&empresa' AND DEPCOX = '&departamento' AND TIPCON = '1'",
        "name": "Cuentas",
        "fields": [
            {
            "variable": "ctcod",
            "label": "Cuenta",
            "description": "Cuenta Contable"
            },
            {
            "variable": "ctdes1",
            "label": "Nombre de Cuenta",
            "description": "Nombre de la Cuenta"
            }
        ]
        }
    ],
    "fields": [
        {
        "variable": "ctcod",
        "label": "Cuenta",
        "description": "Cuenta Contable"
        },
        {
        "variable": "smsali",
        "label": "Saldo del Período",
        "description": "Saldo de inicio de Período"
        },
        {
        "variable": "$saldom",
        "label": "Saldo Mensual",
        "description": "Función de Saldo Mensual",
        "isFunction": true
        }

    ]
    }`) as InputId;
    }

}