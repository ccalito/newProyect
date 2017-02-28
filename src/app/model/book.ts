import {Id} from "./id";
import {Sheet} from "./sheet";

export class Book{

    constructor(
        public id:Id,
        public name:string, 
        public input_id:Id,
        public sizeX:number,
        public sizeY:number,
        public sheetList:Array<Sheet>){
    }
}
