import {Component,ViewChild,OnInit,Input} from '@angular/core';
import {ElementOperation} from '../model/elementOperation';

import {FormComponent} from './formulaForm.component';

@Component({
selector: 'element-operation-tag',
  templateUrl: '../views/element-operation.view.html',
  styleUrls: ['../../assets/popup-form.css'],

})

export class ElementOperationComponent{
    
    public elementOperation:ElementOperation = new ElementOperation(null,null,null,null,null);
    constructor(){
    }


}