import { Component, AfterViewInit,ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let $ : any;
declare let Handsontable: any;

import {Sheet} from '../model/sheet';
import {Cell} from "../model/cell";
import {FormComponent} from "./popup-form.component";

@Component({
	selector: "sheet-excel",
	templateUrl: "../views/sheet-excel.html",
})

export class SheetExcelComponent implements AfterViewInit  {
	public sheet:Sheet;
	public container: any;
	public hot: any;
	public cellSelected:Cell;

 	@ViewChild(FormComponent) public childModal:FormComponent;

	ngAfterViewInit(){
		this.sheet = new Sheet("ejemplo.xls",2,['ID', 'Name', 'Address'],null);
		this.inicializa();
	}

	public inicializa(){
		this.container = document.getElementById('sheetInput');
		let lengthRows=(this.sheet.whereValues == null ? 1: this.sheet.whereValues.length) /this.sheet.fromValues.length;
		if(lengthRows.toString().indexOf(".")){
			let auxLengthRows = lengthRows.toString().substr(0,lengthRows.toString().indexOf("."));
			lengthRows = parseInt(auxLengthRows);
			lengthRows = lengthRows+1;
		}
		let cellArray:Array<Cell>;
		this.hot = new Handsontable(this.container,
			{
				// Definición de tabla
			data: Handsontable.helper.createEmptySpreadsheetData(lengthRows,this.sheet.fromValues.length),
			rowHeaders: true,
			colHeaders: this.sheet.fromValues,
			// performance tip: set constant size
			colWidths: 80,
			rowHeights: 23,
			// performance tip: turn off calculations
			autoRowSize: false,
			autoColSize: false,
			// fila y columna seleccionada
			currentRowClassName: 'currentRow',
			currentColClassName: 'currentCol',

			// se le asigna color y forma a las columnas
			renderer: (hotInstance, TD, row, col, prop, value, cellProperties) =>{

				
				console.log("entra " + TD);
				let cell = this.getCell(col,row);
				TD.style.color = 'blue';
				TD.style.background = 'yellow';
				value="hola";
				TD.innerHTML = value;
				TD.addEventListener("click",()=>{
					this.childModal.showChildModal();
					this.cellSelected = cell;
				});
				console.log("value" +value);
				console.log(row);
				console.log(col);
			}
		}
		);
	}	 
	public cont=1;
	public getCell(column:number,row:number):Cell{
			console.log("sheet" + this.sheet);
			try{
			let cellObj = this.sheet.whereValues.map((obj)=>{ 
					console.log("entra aqui" + obj);
					if(obj.posY === column && obj.posX===row){
						return obj;
					}
			});
			}catch(e){
				return new Cell(this.cont++,null,null,null,null,null,null,null,null,null,null);
			};
		} 
		
}