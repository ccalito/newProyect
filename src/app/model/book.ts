import {Id} from "./id";
import {Sheet} from "./sheet";
import {Parameter} from "./parameter";

export class Book{

    constructor(
        public id:Id,
        public name:string, 
        public input_id:Id,
        public sizeX:number,
        public sizeY:number,
        public username:string,
        public parameterList:Array<Parameter>,
        public sheetList:Array<Sheet>){
    }
}
