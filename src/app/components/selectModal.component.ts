import { Component,ViewChild,Input,OnChanges,SimpleChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormComponent} from './formulaForm.component'
import { textFormComponent} from './textForm.component'
import {Cell} from '../model/cell';
import {Parameter} from "../model/parameter";

@Component({
  selector: 'my-selectModal',
  templateUrl: '../views/select-modal.view.html'
})

export class SelectModalComponent{
  @ViewChild('selectModal') public selectModal:ModalDirective;
  @ViewChild(FormComponent) public formFormula:FormComponent;
  @ViewChild(textFormComponent) public formText:textFormComponent;

  @Input() public cell:Cell=new Cell(null,null,null,null,null,null,null,null);

  public parameterGeneral:Array<Parameter>;
  public inputIdBook:string;
  public templateId: string;

  public showSelectModal(cell:Cell, parameterGeneral:Array<Parameter>, inputIdBook:string, templateId:string):void {
    this.templateId = templateId;
    this.parameterGeneral=parameterGeneral;
    this.inputIdBook=inputIdBook;
    if(cell===undefined){
      this.selectModal.show();
    } else{
          if(cell.valueList === null || cell.valueList === undefined || cell.valueList.length == 0){
            this.formText.showTextForm(cell);
          }else{
            this.formFormula.showFormFormula(cell, this.parameterGeneral,inputIdBook,templateId);
          }
    }
  }
  
  public hideSelectModal():void {
    this.selectModal.hide();
  }

  public showFormulaForm(){
    this.formFormula.showFormFormulaClear(this.parameterGeneral,this.inputIdBook, this.templateId);
    this.hideSelectModal();
  }

  public showTextForm(){
      this.formText.showTextFormClear();
      this.hideSelectModal();
  }
  
}