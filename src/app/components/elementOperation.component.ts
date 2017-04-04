import {Component,ViewChild,OnInit,Input} from '@angular/core';
import {ElementOperation} from '../model/elementOperation';

@Component({
selector: 'element-operation-tag',
  templateUrl: '../views/element-operation.view.html',
  styleUrls: ['../../assets/popup-form.css']
})

export class ElementOperationComponent{
    constructor(
        public elementOperation:ElementOperation
    ){}


}