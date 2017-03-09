import {Component,ViewChild,OnInit,Input} from '@angular/core';
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
@Input() public textValue:string;


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

public ngOnInit(){
    this.listFonts = FONTS_LIST;
    this.listColors = COLORS_LIST;
}

}