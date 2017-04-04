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
import {ListInputId} from "../model/listInputId";


@Injectable()
export class BookService{
    public urlBase:string="http://192.168.0.16:8080/reporting/api/";
    public urlBaseLegacy:string="http://192.168.0.16:8080/reporting-legacy/api/";

	constructor(private _http: Http){}

    getBook(idTemplate:string){
        return this._http.get(this.urlBase+"template/"+idTemplate).toPromise().then(res =>res.json() as Book).catch(this.handleError);
    }

    getInputQuery(idTemplate:string){
        return this._http.get(this.urlBase+"dynamic/query/templateId="+idTemplate).toPromise().then(res =>res.json() as InputQuery).catch(this.handleError);
    }

    getPaises(){
        return this._http.get(this.urlBaseLegacy+"countries/").toPromise().then(res=> res.json() as Array<Pais> ).catch(this.handleError);
    }

    getEmpresas(pais:string){
        return this._http.get(this.urlBaseLegacy+"/companies/filter/pais="+pais).toPromise().then(res=> res.json() as Array<Empresa> ).catch(this.handleError);
    }

    getDepartamentos(pais:string,empresa:string){
        return this._http.get(this.urlBaseLegacy+"/departments/filter/pais="+pais+"&empresa="+empresa).toPromise().then(res=> res.json() as Array<Departamento> ).catch(this.handleError);
    }

   getPeriodos(pais:string,empresa:string,departamento:string){
        return this._http.get(this.urlBaseLegacy+"/periods/filter/pais="+pais+"&empresa="+empresa+"&departamento="+departamento).toPromise().then(res=> res.json() as Array<Periodo> ).catch(this.handleError);
   }

   getMonedas(){
        return this._http.get(this.urlBase+"/monedas/").toPromise().then(res=> res.json() as Array<Moneda> ).catch(this.handleError);
   }

   getListInputId(){
         return this._http.get(this.urlBase+"input/").toPromise().then(res =>res.json() as ListInputId).catch(this.handleError);
   }
   getInput(inputHexId:string){
        return this._http.get(this.urlBase+"/input/"+inputHexId).toPromise().then(res=> res.json() as InputId ).catch(this.handleError);
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
                },
                {
                    "values": [
                        "101101.0101",
                        "DEPOSITOS DIARIOS"
                    ]
                },
                {
                    "values": [
                        "101101.0102",
                        "DEPOSITOS SEMANALES"
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
        },{
            "paicod": "HON",
            "painom": "Honduras",
            "pastat": " ",
            "mncod": " "
        }]`
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
	"_id": {
		"timestamp": 1489716443,
		"machineIdentifier": 2773029,
		"processIdentifier": 16672,
		"counter": 2696374,
		"time": 1489716443000,
		"date": 1489716443000,
		"timeSecond": 1489716443
	},
	"hexId": "58cb44db2a502541202924b6",
	"name": "test01",
	"input_id": {
		"timestamp": 1488055926,
		"machineIdentifier": 3809784,
		"processIdentifier": 16821,
		"counter": 13226296,
		"time": 1488055926000,
		"date": 1488055926000,
		"timeSecond": 1488055926
	},
	"inputHexId": "58b1ee763a21f841b5c9d138",
	"username": "root",
	"sizeX": 9,
	"sizeY": 100,
	"xls": false,
	"parametersList": [{
			"name": "pais",
			"value": "HON"
		}, {
			"name": "empresa",
			"value": "BND"
		}, {
			"name": "departamento",
			"value": "1"
		}, {
			"name": "periodo",
			"value": "2016"
		}, {
			"name": "moneda",
			"value": "DFT"
		}
	],
	"sheetList": [{
			"correlative": 0,
			 "cellRangeList" : [ 
                 {
                    "firstRow" : 0,
                    "lastRow" : 0,
                    "firstColumn" : 1,
                    "lastColumn" : 8
                }, 
                {
                    "firstRow" : 1,
                    "lastRow" : 1,
                    "firstColumn" : 1,
                    "lastColumn" : 8
                }, 
                {
                    "firstRow" : 2,
                    "lastRow" : 2,
                    "firstColumn" : 1,
                    "lastColumn" : 8
                }, 
                {
                    "firstRow" : 3,
                    "lastRow" : 3,
                    "firstColumn" : 1,
                    "lastColumn" : 8
                }
            ],
            "colWidths" : [ 
                74, 
                253, 
                74, 
                94, 
                74, 
                270, 
                74, 
                98, 
                74
            ],
			 "cellList" : [ 
                {
                    "posX" : 1,
                    "posY" : 0,
                    "textValue" : "SISTEMA BANCARIO",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "backgroundColor" : "003300",
                        "foregroundColor" : "000000",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 1,
                    "textValue" : "BALANCE GENERAL CONDENSADO CONSOLIDADO",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "backgroundColor" : "003300",
                        "foregroundColor" : "000000",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 2,
                    "textValue" : "AL 31 ENERO DEL 2017",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "backgroundColor" : "003300",
                        "foregroundColor" : "000000",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 3,
                    "textValue" : "(Cifras en miles de quetzales)",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "backgroundColor" : "003300",
                        "foregroundColor" : "000000",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 2,
                    "posY" : 5,
                    "textValue" : "MONEDA NACIONAL",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 3,
                    "posY" : 5,
                    "textValue" : "MONEDA EXTRANJERA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 4,
                    "posY" : 5,
                    "textValue" : "TOTAL",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 6,
                    "posY" : 5,
                    "textValue" : "MONEDA NACIONAL",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 7,
                    "posY" : 5,
                    "textValue" : "MONEDA EXTRANJERA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 8,
                    "posY" : 5,
                    "textValue" : "TOTAL",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : true
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 6,
                    "textValue" : "Activo",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 6,
                    "textValue" : "Pasivo",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 8,
                    "textValue" : "DISPONIBILIDADES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 8,
                    "textValue" : "OBLIGACIONES DEPOSITARIAS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 9,
                    "textValue" : "Caja",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 2,
                    "posY" : 9,
                    "fieldCode" : "smsali",
                    "valueList" : [ 
                        {
                            "name" : "ctcod",
                            "value" : "101101.0101"
                        }
                    ]
                }, 
                {
                    "posX" : 5,
                    "posY" : 9,
                    "textValue" : "Depositos Monetarios",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 10,
                    "textValue" : "Banco Central",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 10,
                    "textValue" : "Depositos de Ahorros",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 11,
                    "textValue" : "Bancos del Exterior",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 11,
                    "textValue" : "Depositos a Plazo",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 12,
                    "textValue" : "Cheques a compensar",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 12,
                    "textValue" : "Depositos a la orden",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 13,
                    "textValue" : "Giros sobre el exterior",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 13,
                    "textValue" : "Depositos con restricciones",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 15,
                    "textValue" : "INVERSIONES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 15,
                    "textValue" : "CREDITOS OBTENIDOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 16,
                    "textValue" : "En titulos-Valores para negociacion",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 16,
                    "textValue" : "Del Banco Central",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 17,
                    "textValue" : "En titulos-Valores para la venta",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 17,
                    "textValue" : "De Instituciones Financieras Nacionales",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 18,
                    "textValue" : "En titulos-Valores para su vencimiento",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 18,
                    "textValue" : "De Instituciones Financieras Extranjeras",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 19,
                    "textValue" : "Operaciones de Reporto",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 19,
                    "textValue" : "De Organismos Internacionales",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 20,
                    "textValue" : "Certificados de Participacion",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 21,
                    "textValue" : "Intereses pagados en compra de valores",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 21,
                    "textValue" : "OBLIGACIONES FINANCIERAS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 22,
                    "textValue" : "GASTOS FINANCIEROS POR PAGAR",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 23,
                    "textValue" : "SUMA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 23,
                    "textValue" : "CUENTAS POR PAGAR",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 24,
                    "textValue" : "(-) Estimaciones por Valuacion ",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 24,
                    "textValue" : "PROVISIONES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 25,
                    "textValue" : "SUC. CASA MATRIZ Y DEPTOS. ADSCRITOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 26,
                    "textValue" : "CARTERA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 27,
                    "textValue" : "Vigente",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 27,
                    "textValue" : "OTRAS OBLIGACIONES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 28,
                    "textValue" : "Vencida",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 28,
                    "textValue" : "CREDITOS DIFERIDOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 29,
                    "textValue" : "SUMA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 30,
                    "textValue" : "SUMA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 30,
                    "textValue" : "OTRAS CUENTAS ACREEDORAS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 31,
                    "textValue" : "(-) Estimaciones por Valuacion ",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 1,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 32,
                    "textValue" : "CAPITAL CONTABLE",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 2,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 33,
                    "textValue" : "PRODUCTOS FINANCIEROS POR COBRAR",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 34,
                    "textValue" : "CUENTAS POR COBRAR",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 34,
                    "textValue" : "CAPITAL PAGADO",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 35,
                    "textValue" : "BIENES REALIZABLES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 35,
                    "textValue" : "Capital Autorizado",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 36,
                    "textValue" : "INVERSIONES PERMANENTES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 36,
                    "textValue" : "Capital No pagado (-)",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 37,
                    "textValue" : "OTRAS INVERSIONES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 37,
                    "textValue" : "Casa Matriz, Capital Asignado",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 38,
                    "textValue" : "SUC. CASA MATRIZ Y DEPTOS. ADSCRITOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 38,
                    "textValue" : "APORTACIONES PERMANENTES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 39,
                    "textValue" : "INMUEBLES Y MUEBLES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 39,
                    "textValue" : "RESERVAS DE CAPITAL",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 1,
                    "posY" : 40,
                    "textValue" : "CARGOS DIFERIDOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 40,
                    "textValue" : "RESERVAS PARA ACTIVOS EXTRAORDINARIOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 42,
                    "textValue" : "REVALUACION DE ACTIVOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 43,
                    "textValue" : "OBLIGACIONES SUBORDINADAS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 44,
                    "textValue" : "GANANCIAS Y PERDIDAS POR FUSION",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 45,
                    "textValue" : "VALUACION DE ACTIVOS DE RECUPERACION DUDOSA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 46,
                    "textValue" : "PROVISION DE BENEFICIOS A EMPLEADOS",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 47,
                    "textValue" : "AJUSTES AL IMPUESO SOBRE LA RENTA",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 48,
                    "textValue" : "GANANCIAS O PERDIDAS POR CAMBIO EN EL ",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 49,
                    "textValue" : "VALOR DE MERCADO DE INVERSIONES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 50,
                    "textValue" : "RESULTADO DE EJERCICIOS ANTERIORES",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 51,
                    "textValue" : "RESULTADOS DEL EJERCICIO",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 5,
                    "posY" : 52,
                    "textValue" : "TOTAL IGUAL A LA SUMA DEL ACTIVO",
                    "style" : {
                        "fontFamily" : "Calibri",
                        "alignment" : 0,
                        "bold" : false
                    }
                }, 
                {
                    "posX" : 2,
                    "posY" : 10,
                    "fieldCode" : "smsali",
                    "valueList" : [ 
                        {
                            "name" : "ctcod",
                            "value" : "101101.0102"
                        }
				]
			}
		]
       }
    ]
}
`) as Book;
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

    getListInputIdExample():ListInputId{
        return JSON.parse(`
        {
        "content": [{
                "_id": {
                    "timestamp": 1488055926,
                    "machineIdentifier": 3809784,
                    "processIdentifier": 16821,
                    "counter": 13226296,
                    "time": 1488055926000,
                    "date": 1488055926000,
                    "timeSecond": 1488055926
                },
                "hexId": "58b1ee763a21f841b5c9d138",
                "name": "Saldo Mensual",
                "queryList": [{
                        "correlative": 1,
                        "query": "SELECT CTCOD,SMSALI,@SALDOM,SMDE01,SMDE02,SMDE03,SMDE04,SMDE05,SMDE06,SMDE07,SMDE08,SMDE09,SMDE10,SMDE11,SMDE12,SMDE13,SMDE14,SMHA01,SMHA02,SMHA03,SMHA04,SMHA05,SMHA06,SMHA07,SMHA08,SMHA09,SMHA10,SMHA11,SMHA12,SMHA13,SMHA14 FROM V5CFBDAT.CFSALM WHERE PAICOD = &pais AND EMPCOD = &empresa AND DEPCOD = &departamento AND TIPCON = '1' AND PERCOD = &periodo AND MOCOD=&moneda AND CTCOD IN (:ctcod)",
                        "name": "Saldo Mensual",
                        "fields": [{
                                "variable": "ctcod",
                                "label": "Cuenta",
                                "description": "Cuenta Contable",
                                "isFunction": false
                            }, {
                                "variable": "smsali",
                                "label": "Saldo Inicial",
                                "description": "Saldo Inicial de Período",
                                "isFunction": false
                            }, {
                                "variable": "saldom",
                                "label": "Saldo Mensual",
                                "description": "Saldo Mensual",
                                "isFunction": true
                            }
                        ]
                    }, {
                        "correlative": 2,
                        "query": "SELECT CTCOD, CTDES1 FROM V5CFBDAT.CFCTAS WHERE PAICOD = '&pais' AND EMPCOD = '&empresa' AND DEPCOX = '&departamento' AND TIPCON = '1'",
                        "name": "Cuentas",
                        "fields": [{
                                "variable": "ctcod",
                                "label": "Cuenta",
                                "description": "Cuenta Contable",
                                "isFunction": false
                            }, {
                                "variable": "ctdes1",
                                "label": "Nombre de Cuenta",
                                "description": "Nombre de la Cuenta",
                                "isFunction": false
                            }
                        ]
                    }
                ]
            }
        ],
        "last": true,
        "totalPages": 1,
        "totalElements": 1,
        "sort": null,
        "numberOfElements": 1,
        "first": true,
        "size": 20,
        "number": 0
    }
        `) as ListInputId;
    }
}