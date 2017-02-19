import {Component,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {NgForm} from '@angular/forms';
import {CellObject} from './cell-object';

@Component({
selector: 'my-form',
  templateUrl: '../views/popup-form.view.html'
})

export class FormComponent {
  @ViewChild('childModal') public childModal:ModalDirective;
  private selectedObject = new CellObject('SALDO1','0001.0303','GUA','001','001','2017');

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
}