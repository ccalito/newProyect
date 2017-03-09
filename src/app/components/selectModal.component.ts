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

export class SelectModalComponent implements OnChanges{
  @ViewChild('selectModal') public selectModal:ModalDirective;
  @ViewChild(FormComponent) public formFormula:FormComponent;
  @ViewChild(textFormComponent) public formText:textFormComponent;

  @Input() public cell:Cell;

  public parameterGeneral:Array<Parameter>;

  public showSelectModal(cell:Cell, parameterGeneral:Array<Parameter>):void {
    this.parameterGeneral=parameterGeneral;
    if(cell===undefined){
      this.selectModal.show();
    } else{
          if(cell.valueList === undefined || cell.valueList.length == 0){
            this.formText.showTextForm(cell);
          }else{
            this.formFormula.showFormFormula(cell, this.parameterGeneral);
          }
    }
  }
  
  public hideSelectModal():void {
    this.selectModal.hide();
  }

  public showFormulaForm(){
    this.formFormula.showFormFormulaClear(this.parameterGeneral);
    this.hideSelectModal();
  }

    public showTextForm(){
      this.formText.showTextFormClear();
      this.hideSelectModal();
  }

    ngOnChanges(changes: SimpleChanges) {
    if(changes['cell']!==undefined){
      if (changes['cell'].currentValue !== undefined) {
          this.cell = changes['cell'].currentValue;
          //echo pija con el cell
      }
    }
  }
  
}