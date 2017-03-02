import {Component,ViewChild,OnInit} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {Cell} from '../model/cell';
import {FONTS_LIST,COLORS_LIST} from './values.component';

@Component({
selector: 'textForm',
  templateUrl: '../views/text-form.view.html',
  styleUrls: ['../../assets/popup-form.css']
})

export class textFormComponent implements OnInit{

@ViewChild('formText') public formText:ModalDirective;
private listFonts:string[];
private listColors:string[];
public cell:Cell;

public showTextForm(cellTemp:Cell):void {
    this.cell=cellTemp;
    this.formText.show();
}

public hideTextForm():void {
    this.formText.hide();
}


public ngOnInit(){
    this.listFonts = FONTS_LIST;
    this.listColors = COLORS_LIST;
}

}