import { Component, AfterViewInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let $ : any;
declare let Handsontable: any;

import {Book} from "../model/book";
import {Sheet} from '../model/sheet';
import {Cell} from "../model/cell";
import {Parameter} from "../model/parameter";
import {MergeCell} from "../model/mergecell";

import {SelectModalComponent} from "./selectModal.component";

import {BookService} from "../services/book.service";

@Component({
	selector: "sheet-excel",
	templateUrl: "../views/sheet-excel.html",
	providers: [BookService]
})

export class SheetExcelComponent implements AfterViewInit  {
	public book:Book;
	public container: any;
	public hot: any;
	public cellSelected:Cell;

	constructor(
		private _bookService: BookService
		){}

@ViewChild(SelectModalComponent) public selectModal:SelectModalComponent;

	ngAfterViewInit(){
		//this._bookService.getBook("58cb3ed62a50253381d56071").then(response => this.book=response).catch(this.handleError);
		console.log("console: " + this.book);
		this.book = this._bookService.getBookExample();
		this.inicializa();
	}

	public inicializa(){
		this.container = document.getElementById('sheetInput');
		let rangeCells:Array<MergeCell>= new Array<MergeCell>();
		for(let range of this.book.sheetList[0].cellRangeList){
				let mergeCell : MergeCell = new MergeCell(range.firstRow,range.firstColumn,range.lastRow-range.firstRow<=0?1:range.lastRow-range.firstRow,range.lastColumn-range.firstColumn<=0?1:range.lastColumn-range.firstColumn);
				rangeCells.push(mergeCell);
		}
		console.log(rangeCells);	
		this.hot = new Handsontable(this.container,
			{
				// Definición de tabla
			data: Handsontable.helper.createEmptySpreadsheetData(this.book.sizeY,this.book.sizeX),
			rowHeaders: true,
			colHeaders: true,
			// performance tip: set constant size
			colWidths: this.book.sheetList[0].colWidths,
			mergeCells:rangeCells,

			rowHeights: 23,
			// performance tip: turn off calculations
			autoRowSize: false,
			autoColSize: false,
			// fila y columna seleccionada
			currentRowClassName: 'currentRow',
			currentColClassName: 'currentCol',

			// se le asigna color y forma a las columnas
			renderer: (hotInstance, TD, row, col, prop, value, cellProperties) =>{
				try{
					let cell = this.getCell(row,col);
					value="";
					TD.innerHTML = value;
					if(cell != undefined){
						TD.style.background = cell.style != undefined && cell.style.backgroundColor != undefined ? "#"+cell.style.backgroundColor:"";
						TD.style.color =  cell.style != undefined && cell.style.foregroundColor != undefined ? "#"+cell.style.foregroundColor:"";
						value=cell.textValue;
						TD.innerHTML = value;
					}
					TD.removeEventListener("click");
					TD.addEventListener("click",()=>{
						this.selectModal.showSelectModal(cell, this.book.parametersList,this.book.inputHexId);
						this.cellSelected = cell;
					});
				}catch(e){
					console.log(e);
				}
			}
		}
		);
	}	 
	public cont=1;
	public getCell(column:number,row:number):Cell{
			try{
				let cellObj;
				this.book.sheetList.filter((sheetObj)=>{
					cellObj = sheetObj.cellList.filter((cellObj)=>{
									if(cellObj.posY === column && cellObj.posX===row){
										return cellObj;
									}
								 });
					if(cellObj.length>0){
						return;
					}
				});
				return cellObj[0];
			}catch(e){
				return;
			};
		} 

 handleError(error: any) : void {
    if(error.status == 404){
      let body="";
      if(error._body != ""){
        try{
          body = JSON.parse(error._body).message;
        }catch(e){
          body = error._body;
        }
      }
      alert('No found 404!' + "The server response 404 : \n"+body);
    }else if(error.status == 400){
      let body="";
      if(error._body != ""){
        try{
          body = JSON.parse(error._body).message;
        }catch(e){
          body = error._body;
        }
      }
      alert('Internal Error' + "The server response 500 error : \n"+body);
    }
 }
}