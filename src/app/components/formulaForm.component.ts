import {Component,ViewChild,Input,OnChanges,SimpleChanges,AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {NgForm} from '@angular/forms';
import {CellObject} from './cell-object';
import {Cell} from '../model/cell';
import {Pais} from '../model/pais';

import {BookService} from "../services/book.service";

@Component({
selector: 'formulaForm',
  templateUrl: '../views/formula-form.view.html',
  styleUrls: ['../../assets/popup-form.css'],
	providers: [BookService]
})

export class FormComponent implements OnChanges,AfterViewInit{

  constructor(
		private _bookService: BookService
	){}

	ngAfterViewInit(){
    //this._bookService.getPaises().then(response => this.countryItems =response).catch(this.handleError);
    this.countryItems= this._bookService.getPaisesExample();
	}
  @ViewChild('formFormula') public formFormula:ModalDirective;
  private selectedObject = new CellObject('SALDO1','0001.0303','GUA','001','001','2017');

  @Input() public cell:Cell;

    public fromItems:string[] = ['SALDO1','SALDO2'];
    public whereItems:string[] = ['0001.0101','0001.0202','0001.0303','0001.0404'];
    public countryItems:Array<Pais>;
    public companyItems:string[] = ['001','002'];
    public departmentsItems:string[] = ['001','002','005','004','005'];
    public periodsItems:string[] = ['2015','2016','2017'];

  public showFormFormula():void {
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