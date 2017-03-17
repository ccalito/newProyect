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
			"cellList": [{
					"size": null,
					"posX": 1,
					"posY": 0,
					"textValue": "SISTEMA BANCARIO",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": "003300",
						"foregroundColor": "000000",
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 1,
					"textValue": "BALANCE GENERAL CONDENSADO CONSOLIDADO",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": "003300",
						"foregroundColor": "000000",
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 2,
					"textValue": "AL 31 ENERO DEL 2017",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": "003300",
						"foregroundColor": "000000",
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 3,
					"textValue": "(Cifras en miles de quetzales)",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": "003300",
						"foregroundColor": "000000",
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 2,
					"posY": 5,
					"textValue": "MONEDA NACIONAL",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 74
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 3,
					"posY": 5,
					"textValue": "MONEDA EXTRANJERA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 94
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 4,
					"posY": 5,
					"textValue": "TOTAL",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 74
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 6,
					"posY": 5,
					"textValue": "MONEDA NACIONAL",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 74
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 7,
					"posY": 5,
					"textValue": "MONEDA EXTRANJERA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 98
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 8,
					"posY": 5,
					"textValue": "TOTAL",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 74
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 6,
					"textValue": "Activo",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 6,
					"textValue": "Pasivo",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 8,
					"textValue": "DISPONIBILIDADES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 8,
					"textValue": "OBLIGACIONES DEPOSITARIAS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 9,
					"textValue": "Caja",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 2,
					"posY": 9,
					"textValue": null,
					"inputId01": null,
					"style": null,
					"parameterList": [],
					"fieldCode": "smsali",
					"valueList": [{
							"name": "ctcod",
							"value": "101101.0101"
						}
					]
				}, {
					"size": null,
					"posX": 5,
					"posY": 9,
					"textValue": "Depositos Monetarios",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 10,
					"textValue": "Banco Central",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 2,
					"posY": 10,
					"textValue": null,
					"inputId01": null,
					"style": null,
					"parameterList": [],
					"fieldCode": "smsali",
					"valueList": [{
							"name": "ctcod",
							"value": "101101.0102"
						}
					]
				}, {
					"size": null,
					"posX": 5,
					"posY": 10,
					"textValue": "Depositos de Ahorros",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 11,
					"textValue": "Bancos del Exterior",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 11,
					"textValue": "Depositos a Plazo",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 12,
					"textValue": "Cheques a compensar",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 12,
					"textValue": "Depositos a la orden",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 13,
					"textValue": "Giros sobre el exterior",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 13,
					"textValue": "Depositos con restricciones",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 15,
					"textValue": "INVERSIONES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 15,
					"textValue": "CREDITOS OBTENIDOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 16,
					"textValue": "En titulos-Valores para negociacion",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 16,
					"textValue": "Del Banco Central",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 17,
					"textValue": "En titulos-Valores para la venta",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 17,
					"textValue": "De Instituciones Financieras Nacionales",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 18,
					"textValue": "En titulos-Valores para su vencimiento",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 18,
					"textValue": "De Instituciones Financieras Extranjeras",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 19,
					"textValue": "Operaciones de Reporto",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 19,
					"textValue": "De Organismos Internacionales",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 20,
					"textValue": "Certificados de Participacion",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 21,
					"textValue": "Intereses pagados en compra de valores",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 21,
					"textValue": "OBLIGACIONES FINANCIERAS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 22,
					"textValue": "GASTOS FINANCIEROS POR PAGAR",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 23,
					"textValue": "SUMA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 23,
					"textValue": "CUENTAS POR PAGAR",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 24,
					"textValue": "(-) Estimaciones por Valuacion ",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 24,
					"textValue": "PROVISIONES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 25,
					"textValue": "SUC. CASA MATRIZ Y DEPTOS. ADSCRITOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 26,
					"textValue": "CARTERA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 27,
					"textValue": "Vigente",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 27,
					"textValue": "OTRAS OBLIGACIONES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 28,
					"textValue": "Vencida",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 28,
					"textValue": "CREDITOS DIFERIDOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 29,
					"textValue": "SUMA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 30,
					"textValue": "SUMA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 30,
					"textValue": "OTRAS CUENTAS ACREEDORAS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 31,
					"textValue": "(-) Estimaciones por Valuacion ",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 32,
					"textValue": "CAPITAL CONTABLE",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 33,
					"textValue": "PRODUCTOS FINANCIEROS POR COBRAR",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 34,
					"textValue": "CUENTAS POR COBRAR",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 34,
					"textValue": "CAPITAL PAGADO",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 35,
					"textValue": "BIENES REALIZABLES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 35,
					"textValue": "Capital Autorizado",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 36,
					"textValue": "INVERSIONES PERMANENTES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 36,
					"textValue": "Capital No pagado (-)",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 37,
					"textValue": "OTRAS INVERSIONES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 37,
					"textValue": "Casa Matriz, Capital Asignado",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 38,
					"textValue": "SUC. CASA MATRIZ Y DEPTOS. ADSCRITOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 38,
					"textValue": "APORTACIONES PERMANENTES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 39,
					"textValue": "INMUEBLES Y MUEBLES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 39,
					"textValue": "RESERVAS DE CAPITAL",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 1,
					"posY": 40,
					"textValue": "CARGOS DIFERIDOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 253
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 40,
					"textValue": "RESERVAS PARA ACTIVOS EXTRAORDINARIOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 42,
					"textValue": "REVALUACION DE ACTIVOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 43,
					"textValue": "OBLIGACIONES SUBORDINADAS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 44,
					"textValue": "GANANCIAS Y PERDIDAS POR FUSION",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 45,
					"textValue": "VALUACION DE ACTIVOS DE RECUPERACION DUDOSA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 46,
					"textValue": "PROVISION DE BENEFICIOS A EMPLEADOS",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 47,
					"textValue": "AJUSTES AL IMPUESO SOBRE LA RENTA",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 48,
					"textValue": "GANANCIAS O PERDIDAS POR CAMBIO EN EL ",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 49,
					"textValue": "VALOR DE MERCADO DE INVERSIONES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 50,
					"textValue": "RESULTADO DE EJERCICIOS ANTERIORES",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 51,
					"textValue": "RESULTADOS DEL EJERCICIO",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
				}, {
					"size": null,
					"posX": 5,
					"posY": 52,
					"textValue": "TOTAL IGUAL A LA SUMA DEL ACTIVO",
					"inputId01": null,
					"style": {
						"fontFamily": "Calibri",
						"fontWeight": null,
						"backgroundColor": null,
						"foregroundColor": null,
						"width": 270
					},
					"parameterList": [],
					"fieldCode": null,
					"valueList": null
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

}