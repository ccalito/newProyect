import {Sheet} from "./sheet";
import {Parameter} from "./parameter";

export class Book{

    constructor(
        public hexId:string,
        public name:string, 
        public inputHexId:string,
        public username:string,
        public sizeX:number,
        public sizeY:number,
        public xls:boolean,
        public parametersList:Array<Parameter>,
        public sheetList:Array<Sheet>){
    }
}