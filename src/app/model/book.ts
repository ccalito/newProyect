import {Sheet} from "./sheet";
import {Parameter} from "./parameter";

export class Book{

    constructor(
        public id:string,
        public _class:string,
        public name:string, 
        public input_id:string,
        public username:string,
        public sizeX:number,
        public sizeY:number,
        public xls:string,
        public parametersList:Array<Parameter>,
        public sheetList:Array<Sheet>){
    }
}
