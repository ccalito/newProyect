import {Component,ViewChild,Input,OnChanges,SimpleChanges,AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {NgForm} from '@angular/forms';
import {CellObject} from './cell-object';
import {Cell} from '../model/cell';
import {Pais} from '../model/pais';
import {Empresa} from '../model/empresa';
import {Departamento} from "../model/departamento";
import {Periodo} from "../model/periodo";
import {Parameter} from "../model/parameter";
import {Moneda} from "../model/moneda";
import {InputId} from "../model/inputId";
import {QueryElement} from "../model/queryelement";
import {BookService} from "../services/book.service";
import {InputQuery} from "../model/inputquery";

@Component({
selector: 'formulaForm',
  templateUrl: '../views/formula-form.view.html',
  styleUrls: ['../../assets/popup-form.css'],
	providers: [BookService]
})

export class FormComponent implements OnChanges,AfterViewInit{

   @ViewChild('formFormula') public formFormula:ModalDirective;
  
   private selectedObject = new CellObject(null,null,null,null,null,null,null,null);

   @Input() public cell:Cell;
    
   public countryItems:Array<Pais>;
   public companyItems:Array<Empresa>;
   public departmentsItems:Array<Departamento>;
   public periodsItems:Array<Periodo>;
   public monedaItems:Array<Moneda>;
   public inputQueryList:QueryElement = new QueryElement(null,null,null,null);
   public fromQueryList:QueryElement = new QueryElement(null,null,null,null);
   public whereQueryList:QueryElement = new QueryElement(null,null,null,null);
   public inputRecibido:InputId= new InputId(null,null,null);
   public inputIdBook:string;
   public inputQuery:InputQuery= new InputQuery(null,null);
   public muestraCombo2:boolean=false;
   public parameterListGeneral:Array<Parameter>;
   public readonly PARAMETRO_PAIS:string="paicod";
   public readonly PARAMETRO_EMPRESA:string="empcod";
   public readonly PARAMETRO_DEPARTAMENTO:string="depcod";
   public readonly PARAMETRO_PERIODO:string="percod";
   public readonly PARAMETRO_MONEDA:string="moneda";

  constructor(
		private _bookService: BookService
	){}

	ngAfterViewInit(){
   // this._bookService.getInputQuery(this.inputIdBook).then(response => this.inputQuery=response).catch(this.handleError);
    //this._bookService.getPaises().then(response => this.countryItems =response).catch(this.handleError);
    //this._bookService.getMonedas().then(response => this.monedaItems=response).catch(this.handleError);
    //this._bookService.getInput(this.inputIdBook).then(response => this.inputRecibido=response).catch(this.handleError);
    this.countryItems= this._bookService.getPaisesExample();
    this.monedaItems= this._bookService.getMonedaExample();
    if(this.parameterListGeneral != this.cell.parameterList){
      //Aca se debe llamar al que hace override
    }else{
      this.inputRecibido= this._bookService.getInputExample();
    }

    for(let queryList of this.inputRecibido.queryList){
      switch(queryList.correlative){
      case 1:
        this.fromQueryList= queryList;
      break;
      case 2:
        this.whereQueryList= queryList;
      break;
      }

    }
	}
  
  public showFormFormulaClear(parameterGeneral:Array<Parameter>):void {
    this.parameterListGeneral = parameterGeneral;
    this.setParameterGeneral(parameterGeneral);
    this.formFormula.show();
  }

  public showFormFormula(cell:Cell, listParameterGeneral:Array<Parameter>, inputIdBook:string):void {
    this.cell=cell;
    this.inputIdBook=inputIdBook;
    this.parameterListGeneral = listParameterGeneral;
    if(this.cell.parameterList.length>0){
          this.setParameterGeneral(this.cell.parameterList);
    }else{
        this.setParameterGeneral(listParameterGeneral);
    }
    this.formFormula.show();
  }
 
  public setParameterGeneral(list:Array<Parameter>){
    for (let parameter of list) {
        if(parameter.name===this.PARAMETRO_PAIS){
          this.selectedObject.country=parameter.value;
        }else if(parameter.name===this.PARAMETRO_EMPRESA){
          this.selectedObject.company=parameter.value;
        }else if(parameter.name===this.PARAMETRO_DEPARTAMENTO){
          this.selectedObject.department=parameter.value;
        }if(parameter.name===this.PARAMETRO_PERIODO){
          this.selectedObject.period=parameter.value;
        }
        if(parameter.name===this.PARAMETRO_MONEDA){
          this.selectedObject.moneda=parameter.value;
        }
      }
      if(this.selectedObject.country!= undefined){
        this.onChangeCountry(false);
      }
      if(this.selectedObject.company != undefined){
        this.onChangeCompany(false);
      }
      if(this.selectedObject.department != undefined){
        this.onChangeDepartment(false);
      }
  }

  public setOverrideCellValues(list:Array<Parameter>){
    if(list != undefined && list.length){}
  }

  public hideFormFormula():void {
    this.formFormula.hide();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['cell']!==undefined){
      if (changes['cell'].currentValue !== undefined) {
          this.cell = changes['cell'].currentValue;
      }
    }
  }

  onChangeInputId(clear:boolean){
    //this._bookService.getInputQuery(this.inputIdBook).then(response => this.inputQuery =response).catch(this.handleError);
    this.inputQuery = this._bookService.getInputQueryExample();
    this.muestraCombo2=true;
  }

  onChangeCountry(clear:boolean){
      //this._bookService.getEmpresas(this.selectedObject.country).then(response => this.companyItems =response).catch(this.handleError);
      this.companyItems = this._bookService.getCompaniaExample(this.selectedObject.country);
      if(clear){
        this.selectedObject.company=null;
        this.selectedObject.department=null;
        this.selectedObject.period=null;
      }
  }

  onChangeCompany(clear:boolean){
    //this._bookService.getDepartamentos(this.selectedObject.country,this.selectedObject.company).then(response =>this.departmentsItems=response).catch(this.handleError);
    this.departmentsItems=this._bookService.getDepartamentoExample(this.selectedObject.country,this.selectedObject.company);
     if(clear){
      this.selectedObject.department=null;
      this.selectedObject.period=null;
     }
  }

  onChangeDepartment(clear:boolean){
    //this._bookService.getPeriodos(this.selectedObject.country,this.selectedObject.company,this.selectedObject.department).then(response =>this.periodsItems=response).catch(this.handleError);
    this.periodsItems = this._bookService.getPeriodosExample(this.selectedObject.country,this.selectedObject.company,this.selectedObject.department);
     if(clear){
      this.selectedObject.period=null;
     }
  }

  onSaveCell(){
    let cellSave:Cell;
    let parameterList:Array<Parameter> = new Array<Parameter>();
    let parameterValues:Array<Parameter> = new Array<Parameter>();
    let parameterValue:Parameter=new Parameter(null,null);

    cellSave = this.cell;

    for (let parameter of this.parameterListGeneral) {
        if(parameter.name===this.PARAMETRO_PAIS){
          if(this.selectedObject.country != parameter.value){
            parameterValue.name = parameter.name;
            parameterValue.value = this.selectedObject.country;
            console.log(parameterValue)
            parameterList.push(parameterValue);
            console.log(parameterList);
          }
        }
        if(parameter.name===this.PARAMETRO_EMPRESA){
          if(this.selectedObject.company != parameter.value){
            parameterValue.name = parameter.name;
            parameterValue.value = this.selectedObject.company;
            parameterList.push(parameterValue);
          }
        }
        if(parameter.name===this.PARAMETRO_DEPARTAMENTO){
          if(this.selectedObject.department != parameter.value){
            parameterValue.name = parameter.name;
            parameterValue.value = this.selectedObject.department;
            parameterList.push(parameterValue);
          }
        }
        if(parameter.name===this.PARAMETRO_PERIODO){
          if(this.selectedObject.period != parameter.value){
            parameterValue.name = parameter.name;
            parameterValue.value = this.selectedObject.period;
            parameterList.push(parameterValue);
          }
        }
        if(parameter.name===this.PARAMETRO_MONEDA){
          if(this.selectedObject.moneda != parameter.value){
            parameterValue.name = parameter.name;
            parameterValue.value = this.selectedObject.moneda;
            parameterList.push(parameterValue);
          }
        }
      }
    
    if(parameterList != this.parameterListGeneral){
      cellSave.parameterList=parameterList;
    }


    cellSave.inputId01 = this.selectedObject.selectInput;
    cellSave.fieldCode = this.selectedObject.from;

    parameterValue.name = this.inputQuery.parameters[0];
    parameterValue.value = this.selectedObject.where; 
    parameterValues.push(parameterValue);
    cellSave.valueList=parameterValues;
    console.log(this.cell);
    this._bookService.submitCell(cellSave);
    this.formFormula.hide();   
  }

  handleError(error: any) : void {
    if(error.status == 404){
      let body="";
      if(error._body != ""){
        try{
          body = JSON.parse(error._body).message;
        }catch(e){
          body = error._body;
        }
      }
      alert('No found 404!' + "The server response 404 : \n"+body);
    }else if(error.status == 400){
      let body="";
      if(error._body != ""){
        try{
          body = JSON.parse(error._body).message;
        }catch(e){
          body = error._body;
        }
      }
      alert('Internal Error' + "The server response 500 error : \n"+body);
    }
 }
}