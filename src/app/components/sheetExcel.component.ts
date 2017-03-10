import { Component, AfterViewInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let $ : any;
declare let Handsontable: any;

import {Book} from "../model/book";
import {Sheet} from '../model/sheet';
import {Cell} from "../model/cell";
import {Parameter} from "../model/parameter";

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
		//this._bookService.getBook().then(response => this.book=response).catch(this.handleError);
		this.book = this._bookService.getBookExample();
		this.inicializa();
	}

	public inicializa(){
		this.container = document.getElementById('sheetInput');
		this.hot = new Handsontable(this.container,
			{
				// Definición de tabla
			data: Handsontable.helper.createEmptySpreadsheetData(this.book.sizeX,this.book.sizeY),
			rowHeaders: true,
			colHeaders: true,
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

				try{
					let cell = this.getCell(col,row);
					if(cell != undefined){
						TD.style.background = cell.style != undefined && cell.style.backgroundColor != undefined ? "#"+cell.style.backgroundColor:"";
						value=cell.textValue;
						TD.innerHTML = value;
					}
					TD.addEventListener("click",()=>{
						this.selectModal.showSelectModal(cell, this.book.parameterList,this.book.input_id);
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
			console.log("book" + this.book);
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