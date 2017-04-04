import { Component, Input, SimpleChanges, ViewChild } from "@angular/core";

import { ModalDirective } from "ng2-bootstrap";
import { CellObject } from "./cell-object";
import { Cell } from "../model/cell";
import { Parameter } from "../model/parameter";
import { ParameterDynamic } from "../model/parameterDynamic";
import { InputId } from "../model/inputId";
import { QueryElement } from "../model/queryelement";
import { BookService } from "../services/book.service";
import { InputQuery } from "../model/inputquery";
import { ListInputId } from "../model/listInputId";
import { ElementOperation } from "../model/elementOperation";
//import {HttpUtilService} from "../../../shared/util/http-util.service";

@Component({
    selector: 'formulaForm',
    templateUrl: '../views/formula-form.view.html',
    styleUrls: ['../../../../assets/popup-form.css'],
    providers: [BookService]
})

export class FormComponent {

    @ViewChild('formFormula') public formFormula: ModalDirective;

    private selectedObject = new CellObject(null, null, null, null, null, null, null, null);

    @Input() public cell: Cell;

    /*
     public countryItems:Array<Pais>;
     public companyItems:Array<Empresa>;
     public departmentsItems:Array<Departamento>;
     public periodsItems:Array<Periodo>;
     public monedaItems:Array<Moneda>;
     */
    public inputQueryList: QueryElement = new QueryElement(null, null, null, null);
    public listInputIds: ListInputId = new ListInputId(null);
    public fromQueryList: QueryElement = new QueryElement(null, null, null, null);
    public whereQueryList: QueryElement = new QueryElement(null, null, null, null);
    public inputRecibido: InputId = new InputId(null, null, null, null);
    public inputIdBook: string;
    public inputQuery: InputQuery = new InputQuery(null, null);
    public muestraCombo2: boolean = false;
    public parameterListGeneral: Array<Parameter>;
    public readonly PARAMETRO_PAIS: string = "pais";
    public readonly PARAMETRO_EMPRESA: string = "empresa";
    public readonly PARAMETRO_DEPARTAMENTO: string = "departamento";
    public readonly PARAMETRO_PERIODO: string = "periodo";
    public readonly PARAMETRO_MONEDA: string = "moneda";
    public readonly TIMEOUT: number = 2000;
    public muestraAlerta: boolean = false;
    public templateId: string;
    public muestraParametroGeneral: boolean = false;
    public action: string = "Muestra";
    public muestraTag: boolean = false;

    public listElementOperation: Array<ElementOperation> = new Array<ElementOperation>();
    public listaOperadores: Array<String> = new Array<String>("-", "+", "*", "/");

    constructor(
        private _bookService: BookService
        //private httpUtil: HttpUtilService
    ) {
    }


    public inicializaValoresDefault(templateId: string) {
        this.templateId = templateId;
        //this._bookService.getInputQuery(templateId, this.inputIdBook).then(response => this.inputQuery=response).catch(FormComponent.handleError);
        //this._bookService.getListInputId().then(response => this.listInputIds=response).catch(FormComponent.handleError);

        /* this._bookService.getInputQuery(this.templateId, this.inputIdBook)
             .catch(this.httpUtil.handleError)
             .subscribe((data: any) => this.inputQuery = data);*/

        /*this._bookService.getListInputId()
            .catch(this.httpUtil.handleError)
            .subscribe((data: any) => this.listInputIds = data);*/

        //this._bookService.getPaises().then(response => this.countryItems =response).catch(this.handleError);
        //this._bookService.getMonedas().then(response => this.monedaItems=response).catch(this.handleError);
        //this.countryItems= this._bookService.getPaisesExample();
        //this.monedaItems= this._bookService.getMonedaExample();
        this.listInputIds = this._bookService.getListInputIdExample();
        this.inputQuery = this._bookService.getInputQueryExample();

        if (this.cell.inputId01 != null && this.cell.inputId01 != undefined) {
            this.inputIdBook = this.cell.inputId01;
        }
        this.selectedObject.selectInput = this.inputIdBook;

        this.inputRecibido = this._bookService.getInputExample();
        /*this._bookService.getInput(this.inputIdBook)
            .catch(this.httpUtil.handleError)
            .map((data: any) => this.inputRecibido = data)
            .subscribe(() => this.valuaInputRecibido());*/

        //this._bookService.getInput(this.inputIdBook).then(response => {this.inputRecibido=response; this.valuaInputRecibido();}).catch(FormComponent.handleError);
        this.valuaInputRecibido();
    }

    public valuaInputRecibidoCambio() {
        this.inputIdBook = this.selectedObject.selectInput;

        /* this._bookService.getInputQuery(this.templateId, this.inputIdBook)
             .catch(this.httpUtil.handleError)
             .map((data: any) => this.inputQuery = data)
             .subscribe();
 
         this._bookService.getInput(this.inputIdBook)
             .catch(this.httpUtil.handleError)
             .map((data: any) => this.inputRecibido = data)
             .subscribe(() => this.valuaInputRecibido());*/

    }

    public valuaInputRecibido() {
        this.muestraCombo2 = true;

        let index = 0;
        for (let queryList of this.inputRecibido.queryList) {
            index++;
            switch (index) {
                case 1:
                    this.fromQueryList = queryList;
                    if (this.cell.valueList[0].fieldCode != undefined && this.cell.valueList[0].fieldCode != null) {
                        this.selectedObject.from = this.cell.valueList[0].fieldCode;
                    }
                    break;
                case 2:
                    this.whereQueryList = queryList;
                    if (this.cell.valueList != undefined && this.cell.valueList != null) {
                        this.selectedObject.where = this.cell.valueList[0].value;
                    }
                    break;
            }

        }
        this.muestraAlerta = false;
        this.muestraParametroGeneral = false;
        this.action = "Muestra";
        this.muestraTag = false;
        this.listElementOperation = new Array<ElementOperation>();
        if(this.cell.valueList.length>1){
            for(let valueList of this.cell.valueList){
                 this.addElement(true,valueList);
            }
            this.muestraTag=true;
        }
        this.formFormula.show();
    }

    public showFormFormulaClear(parameterGeneral: Array<Parameter>, inputIdBook: string, templateId: string): void {
        this.parameterListGeneral = parameterGeneral;
        this.inputIdBook = inputIdBook;
        this.setParameterGeneral(parameterGeneral);
        this.inicializaValoresDefault(templateId);
    }

    public showFormFormula(cell: Cell, listParameterGeneral: Array<Parameter>, inputIdBook: string, templateId: string): void {
        this.cell = cell;
        this.inputIdBook = inputIdBook;
        this.parameterListGeneral = listParameterGeneral;
        if (this.cell.parameterList != undefined && this.cell.parameterList.length > 0) {
            this.setParameterGeneral(this.cell.parameterList);
        } else {
            this.setParameterGeneral(listParameterGeneral);
        }
        this.inicializaValoresDefault(templateId);
    }

    public setParameterGeneral(list: Array<Parameter>) {
        for (let parameter of list) {
            if (parameter.name === this.PARAMETRO_PAIS) {
                this.selectedObject.country = parameter.value;
            } else if (parameter.name === this.PARAMETRO_EMPRESA) {
                this.selectedObject.company = parameter.value;
            } else if (parameter.name === this.PARAMETRO_DEPARTAMENTO) {
                this.selectedObject.department = parameter.value;
            }
            if (parameter.name === this.PARAMETRO_PERIODO) {
                this.selectedObject.period = parameter.value;
            }
            if (parameter.name === this.PARAMETRO_MONEDA) {
                this.selectedObject.moneda = parameter.value;
            }
        }

    }

    public static setOverrideCellValues(list: Array<Parameter>) {
        if (list != undefined && list.length) {
        }
    }

    public hideFormFormula(): void {
        this.formFormula.hide();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['cell'] !== undefined) {
            if (changes['cell'].currentValue !== undefined) {
                this.cell = changes['cell'].currentValue;
            }
        }
    }

    onChangeInputId() {
        this.valuaInputRecibidoCambio();
        //this._bookService.getInput(this.inputIdBook).then(response => {this.inputRecibido=response; this.valuaInputRecibidoCambio();}).catch(FormComponent.handleError);
        //this._bookService.getInputQuery(this.templateId, this.inputIdBook).then(response => this.inputQuery =response).catch(FormComponent.handleError);
        this.inputQuery = this._bookService.getInputQueryExample();
        //this.muestraCombo2=true;
    }

    onSaveCell() {
        let cellSave: Cell;
        let parameterList: Array<Parameter> = [];
        let parameterValues: Array<Parameter> = [];

        cellSave = this.cell;

        for (let parameter of this.parameterListGeneral) {
            if (parameter.name === this.PARAMETRO_PAIS) {
                if (this.selectedObject.country != parameter.value) {
                    let parameterValue: Parameter = new Parameter(parameter.name, this.selectedObject.country);
                    parameterList.push(parameterValue);
                }
            } else if (parameter.name === this.PARAMETRO_EMPRESA) {
                if (this.selectedObject.company != parameter.value) {
                    let parameterValue: Parameter = new Parameter(parameter.name, this.selectedObject.company);
                    parameterList.push(parameterValue);
                }
            } else if (parameter.name === this.PARAMETRO_DEPARTAMENTO) {
                if (this.selectedObject.department != parameter.value) {
                    let parameterValue: Parameter = new Parameter(parameter.name, this.selectedObject.department);
                    parameterList.push(parameterValue);
                }
            } else if (parameter.name === this.PARAMETRO_PERIODO) {
                if (this.selectedObject.period != parameter.value) {
                    let parameterValue: Parameter = new Parameter(parameter.name, this.selectedObject.period);
                    parameterList.push(parameterValue);
                }
            } else if (parameter.name === this.PARAMETRO_MONEDA) {
                if (this.selectedObject.moneda != parameter.value) {
                    let parameterValue: Parameter = new Parameter(parameter.name, this.selectedObject.moneda);
                    parameterList.push(parameterValue);
                }
            }
        }

        if (parameterList.length > 0) {
            cellSave.parameterList = parameterList;
        }

        cellSave.inputId01 = this.selectedObject.selectInput;
        //cellSave.valueList[0].fieldCode = this.selectedObject.from;

        let parameterValueList: Array<ParameterDynamic> = new Array<ParameterDynamic>();

        let parameterValue: ParameterDynamic = new ParameterDynamic(null, null, null, null);
        parameterValue.fieldCode = this.selectedObject.from;
        parameterValue.name = this.inputQuery.parameters[0];
        parameterValue.value = this.selectedObject.where;
        parameterValueList.push(parameterValue);

        for (let ele of this.listElementOperation) {
            let parameterValue: ParameterDynamic = new ParameterDynamic(null, null, null, null);
            parameterValue.fieldCode = ele.from;
            parameterValue.name = ele.inputQuery.parameters[0];
            parameterValue.value = ele.where;
            parameterValue.operation = ele.operation;
            parameterValueList.push(parameterValue);
        }

        cellSave.valueList = parameterValueList;

        console.log(this.cell);
        this._bookService.submitCell(cellSave);
        this.muestraCombo2 = false;
        this.selectedObject = new CellObject(null, null, null, null, null, null, null, null);
        this.muestraAlerta = true;
    }

    public hideForm() {
        this.formFormula.hide();
    }

    static handleError(error: any): void {
        if (error.status == 404) {
            let body = "";
            if (error._body != "") {
                try {
                    body = JSON.parse(error._body).message;
                } catch (e) {
                    body = error._body;
                }
            }
            alert('No found 404!' + "The server response 404 : \n" + body);
        } else if (error.status == 400) {
            let body = "";
            if (error._body != "") {
                try {
                    body = JSON.parse(error._body).message;
                } catch (e) {
                    body = error._body;
                }
            }
            alert('Internal Error' + "The server response 500 error : \n" + body);
        }
    }

    onParametrosGenerales() {
        if (this.muestraParametroGeneral) {
            this.muestraParametroGeneral = false;
            this.action = "Muestra";
        } else {
            this.muestraParametroGeneral = true;
            this.action = "Oculta";
        }
    }

    onOperaciones() {
        this.muestraTag = true;
        this.onAgregar();
    }

    public idElementOperacion:number=1;
    onAgregar() {
        this.addElement(false,null);
    }

    addElement(recuperaParametro:boolean,parameterDynamic:ParameterDynamic){
        let newElement: ElementOperation = new ElementOperation(null, null, null, null, null, null, null);
        if(recuperaParametro){
            newElement.from=parameterDynamic.fieldCode;
            newElement.where=parameterDynamic.value;
            newElement.operation=parameterDynamic.operation;
        }
        newElement.fromQueryList = new QueryElement(this.fromQueryList.correlative, this.fromQueryList.query, this.fromQueryList.name, this.fromQueryList.fields);
        newElement.whereQueryList = this.whereQueryList;
        newElement.inputQuery = this.inputQuery;
        newElement.idElement = this.idElementOperacion;
        this.listElementOperation.push(newElement);
        this.idElementOperacion++;
    }

    onEliminar(idElement: number) {
        let val = 0;
        for (let ele of this.listElementOperation) {
            if (ele.idElement === idElement) {
                break;
            } else {
                val++;
            }
        }
        this.listElementOperation.splice(val, 1);
    }
}