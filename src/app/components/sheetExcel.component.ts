import { Component, AfterViewInit,ViewChild,OnInit } from '@angular/core';
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
import {isUndefined} from "util";
//import {HttpUtilService} from "../../../shared/util/http-util.service";

@Component({
	selector: "sheet-excel",
	templateUrl: "../views/sheet-excel.html",
	providers: [BookService]
})

export class SheetExcelComponent implements AfterViewInit, OnInit  {
	public book:Book;
	public container: any;
	public hot: any;
	public cellSelected:Cell;
	public idTemplate:string;


	constructor(
		private _bookService: BookService,
		private _route: ActivatedRoute,
		private _router: Router,
	//	private httpUtil: HttpUtilService
		){}

@ViewChild(SelectModalComponent) public selectModal:SelectModalComponent;

	ngAfterViewInit(){
		/*this._bookService.getBook(this.idTemplate)
			.catch(this.httpUtil.handleError)
			.subscribe((data: any) => this.inicializa(data));*/
		//this._bookService.getBook(this.idTemplate).then(response => {this.book=response; this.inicializa();}).catch(this.handleError);
		this.book = this._bookService.getBookExample();
	}

	ngOnInit(){
		this._route.params.forEach((params: Params) => {
		 this.idTemplate = params["idTemplate"];
		});
	}
	public inicializa(data:Book) {
		this.book = data;
		this.container = document.getElementById('sheetInput');
		let rangeCells: Array<MergeCell> = [];
		for (let range of this.book.sheetList[0].cellRangeList) {
			let mergeCell: MergeCell = new MergeCell(range.firstRow,
				range.firstColumn,
				range.lastRow - range.firstRow +1,
				range.lastColumn - range.firstColumn +1);
			rangeCells.push(mergeCell);
		}
		this.hot = new Handsontable(this.container,
			{
				// Definición de tabla
				data: Handsontable.helper.createEmptySpreadsheetData(this.book.sizeY, this.book.sizeX),
				rowHeaders: true,
				colHeaders: true,

				// performance tip: set constant size
				colWidths: this.book.sheetList[0].colWidths,
				mergeCells: rangeCells,

				rowHeights: 23,
				// performance tip: turn off calculations
				autoRowSize: false,
				autoColSize: false,
				// fila y columna seleccionada
				currentRowClassName: 'currentRow',
				currentColClassName: 'currentCol',
				// se le asigna color y forma a las columnas
				renderer: (hotInstance, TD, row, col, prop, value, cellProperties) => {
					try {
						let cell = this.getCell(row, col);
						value = "";
						TD.innerHTML = value;
						if (cell != undefined) {
							TD.style.background = cell.style != undefined && cell.style.backgroundColor != undefined ? "#" + cell.style.backgroundColor : "";
							TD.style.color = cell.style != undefined && cell.style.foregroundColor != undefined ? "#" + cell.style.foregroundColor : "";
							TD.style.fontWeight = cell.style != undefined && cell.style.bold ? "bold" : "";
							TD.className = cell.style != undefined && cell.style.alignment != undefined ? this.getAlignment(cell.style.alignment) : this.getAlignment(-1);
							SheetExcelComponent.setBorder(TD, cell);
							value = cell.textValue != undefined ? cell.textValue : cell.fieldCode != undefined ? cell.fieldCode : "Valor no definido";
							TD.innerHTML = value;
						}

						TD.removeEventListener("click");
						TD.addEventListener("click", () => {
							this.selectModal.showSelectModal(cell, this.book.parametersList, this.book.inputHexId, this.book.hexId);
							this.cellSelected = cell;
						});
					} catch (e) {
						console.log(e);
					}
				}
			}
		);
	}

	public static setBorder(TD, cell:Cell) {
		if (!isUndefined(cell.style)) {
			if (cell.style.borderTop > 0)
				TD.style.borderTop = cell.style.borderTop+"px solid";
			if (cell.style.borderBottom > 0)
				TD.style.borderBottom = cell.style.borderBottom+"px solid";
			if (cell.style.borderLeft > 0)
				TD.style.borderLeft = cell.style.borderLeft+"px solid";
			if (cell.style.borderRight > 0)
				TD.style.borderRight = cell.style.borderRight+"px solid";
		}
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

 public getAlignment(alignment:number):string {
	 let stringAlignment="";
	 switch(alignment){
		 /* case 0: GENERAL */
		 case 1:
				stringAlignment="htLeft";
				break;
		 case 2:
				stringAlignment="htCenter";
				break;
		 case 3:
		 		stringAlignment="htRight";
			 	break;
		 /* case 4: FILL */
		 case 5:
		 		stringAlignment="htJustify";
			 	break;
		 /* case 6: CENTER_SELECTION */
		 /* case 7: DISTRIBUTED */
		 default:
			 	stringAlignment="htLeft";
	 }
	return stringAlignment;
 }
}