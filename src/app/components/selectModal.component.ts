import { Component,ViewChild,Input,OnChanges,SimpleChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormComponent} from './popup-form.component'
import {Cell} from '../model/cell';

@Component({
  selector: 'my-selectModal',
  templateUrl: '../views/selectModal.view.html'
})

export class SelectModalComponent implements OnChanges{
  @ViewChild('selectModal') public selectModal:ModalDirective;
  @ViewChild(FormComponent) public formFormula:FormComponent;

  @Input() public cell:Cell;

  public showSelectModal(cellTemp:Cell):void {
    if(cellTemp===undefined){
      this.selectModal.show();
    } else{
      switch(cellTemp.parameterList.length){
        case 0:
          // Crear formulario solo para texto;
          //this.showFormText.showForm();
          console.log("Formulario de Texto");
        break;
        default:
            this.formFormula.showFormFormula();
        break;
      }
    }
  }
  
  public hideSelectModal():void {
    this.selectModal.hide();
  }

  public showForm(){
    this.formFormula.showFormFormula();
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