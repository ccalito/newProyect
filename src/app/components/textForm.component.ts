import {Component,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {Cell} from '../model/cell';

@Component({
selector: 'textForm',
  templateUrl: '../views/text-form.view.html',
  styleUrls: ['../../assets/popup-form.css']
})

export class textFormComponent {

@ViewChild('formText') public formText:ModalDirective;
public cell:Cell;

public showTextForm():void {
    this.formText.show();
}

public hideTextForm():void {
    this.formText.hide();
}

}