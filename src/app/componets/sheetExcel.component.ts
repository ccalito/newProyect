import { Component, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var Handsontable: any;

import {Sheet} from '../model/sheet';
import {Cell} from "../model/cell";

@Component({
	selector: "sheet-excel",
	templateUrl: "../views/sheet-excel.html",
})

export class SheetExcelComponent implements AfterViewInit  {
	public sheet:Sheet;
	public container: any;
	public hot: any;

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
			renderer: function(hotInstance, TD, row, col, prop, value, cellProperties) {

				TD.style.color = 'blue';
				TD.style.background = 'yellow';
				value="hola";
				TD.innerHTML = value;
				console.log("value" +value);
				console.log(row);
				console.log(col);
				console.log(cellProperties);
			}
		}
		
		);
	}	  
}