import {Component,ViewChild,Input,OnChanges,SimpleChanges,AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {NgForm} from '@angular/forms';
import {CellObject} from './cell-object';
import {Cell} from '../model/cell';
import {Pais} from '../model/pais';
import {Empresa} from '../model/empresa';
import {Departamento} from "../model/departamento";
import {Periodo} from "../model/periodo";

import {BookService} from "../services/book.service";

@Component({
selector: 'formulaForm',
  templateUrl: '../views/formula-form.view.html',
  styleUrls: ['../../assets/popup-form.css'],
	providers: [BookService]
})

export class FormComponent implements OnChanges,AfterViewInit{

   @ViewChild('formFormula') public formFormula:ModalDirective;
  
   private selectedObject = new CellObject('SALDO1','0001.0303','GUA','001','001','2017');

   @Input() public cell:Cell;
    
   public countryItems:Array<Pais>;
   public companyItems:Array<Empresa>;
   public departmentsItems:Array<Departamento>;
   public periodsItems:Array<Periodo>;


   public fromItems:string[] = ['SALDO1','SALDO2'];
   public whereItems:string[] = ['0001.0101','0001.0202','0001.0303','0001.0404'];

  constructor(
		private _bookService: BookService
	){}

	ngAfterViewInit(){
    //this._bookService.getPaises().then(response => this.countryItems =response).catch(this.handleError);
    this.countryItems= this._bookService.getPaisesExample();
	}
  
  public showFormFormulaClear():void {
    this.formFormula.show();
  }

  public showFormFormula(cell:Cell):void {
    this.cell=cell;
    if(this.cell.parameterList.length>0){
      for (let parameter of this.cell.parameterList) {
        if(parameter.name==="paicod"){
          this.selectedObject.country=parameter.value;
        }else if(parameter.name==="empcod"){
          this.selectedObject.company=parameter.value;
        }else if(parameter.name==="depcod"){
          this.selectedObject.department=parameter.value;
        }if(parameter.name==="percod"){
          this.selectedObject.period=parameter.value;
        }
      }
      if(this.selectedObject.country!= undefined){
        this.onChangeCountry();
      }
      if(this.selectedObject.company != undefined){
        this.onChangeCompany();
      }
      if(this.selectedObject.department != undefined){
        this.onChangeDepartment();
      }
    }
    this.formFormula.show();
  }
 
  public hideFormFormula():void {
    this.formFormula.hide();
  }

 onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    this.formFormula.hide();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['cell']!==undefined){
      if (changes['cell'].currentValue !== undefined) {
          this.cell = changes['cell'].currentValue;
          console.log(this.cell);
          //echo pija con el cell
      }
    }
  }

  onChangeCountry(){
      //this._bookService.getEmpresas(this.selectedObject.country).then(response => this.companyItems =response).catch(this.handleError);
      this.companyItems = this._bookService.getCompaniaExample(this.selectedObject.country);
      this.selectedObject.company=null;
      this.selectedObject.department=null;
      this.selectedObject.period=null;
  }

  onChangeCompany(){
    //this._bookService.getDepartamentos(this.selectedObject.country,this.selectedObject.company).then(response =>this.departmentsItems=response).catch(this.handleError);
    this.departmentsItems=this._bookService.getDepartamentoExample(this.selectedObject.country,this.selectedObject.company);
      this.selectedObject.department=null;
      this.selectedObject.period=null;
  }

  onChangeDepartment(){
    //this._bookService.getPeriodos(this.selectedObject.country,this.selectedObject.company,this.selectedObject.department).then(response =>this.periodsItems=response).catch(this.handleError);
    this.periodsItems = this._bookService.getPeriodosExample(this.selectedObject.country,this.selectedObject.company,this.selectedObject.department);
      this.selectedObject.period=null;
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