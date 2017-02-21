import {Component,ViewChild,Input,OnChanges,SimpleChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {NgForm} from '@angular/forms';
import {CellObject} from './cell-object';
import {Cell} from '../model/cell';

@Component({
selector: 'my-form',
  templateUrl: '../views/popup-form.view.html'
})

export class FormComponent implements OnChanges{
  @ViewChild('childModal') public childModal:ModalDirective;
  private selectedObject = new CellObject('SALDO1','0001.0303','GUA','001','001','2017');

  @Input() public cell:Cell;

    public fromItems:string[] = ['SALDO1','SALDO2'];
    public whereItems:string[] = ['0001.0101','0001.0202','0001.0303','0001.0404'];
    public countryItems:string[] = ['HON','SAL','GUA','CRC'];
    public companyItems:string[] = ['001','002'];
    public departmentsItems:string[] = ['001','002','005','004','005'];
    public periodsItems:string[] = ['2015','2016','2017'];

  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

 onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    this.childModal.hide();
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
}