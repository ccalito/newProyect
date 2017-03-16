import {Component,ViewChild,OnInit,Input} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {Cell} from '../model/cell';
import {BookService} from '../services/book.service';

@Component({
selector: 'textForm',
  templateUrl: '../views/text-form.view.html',
  styleUrls: ['../../assets/popup-form.css'],
  providers: [BookService]
})

export class textFormComponent{

@ViewChild('formText') public formText:ModalDirective;
private listFonts:string[];
private listColors:string[];
public cell:Cell;
@Input() public textValue:string;

  constructor(
		private _bookService: BookService
    ){}

public showTextForm(cell:Cell):void {
    this.cell=cell;
    this.textValue = cell.textValue;
    this.formText.show();
}

public showTextFormClear():void {
    this.formText.show();
}

public hideTextForm():void {
    this.formText.hide();
}

 onSaveCell(){
    let cellSave:Cell;

    cellSave = this.cell;

    cellSave.textValue = this.textValue;
    cellSave.parameterList=null;
    cellSave.inputId01 = null;
    cellSave.fieldCode = null;
    cellSave.valueList=null;

    this._bookService.submitCell(cellSave);
    this.formText.hide();   
  }

}