import {Sheet} from "./sheet";
import {Parameter} from "./parameter";

export class Book{

    constructor(
        public id:string,
        public name:string, 
        public input_id:string,
        public sizeX:number,
        public sizeY:number,
        public username:string,
        public parameterList:Array<Parameter>,
        public sheetList:Array<Sheet>){
    }
}
