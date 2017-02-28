import {Id} from "./id";
import {Parameter} from "./parameter";

export class Cell{
 
    constructor(
        public size:number,
        public posX:number,
        public posY:number,
        public textValue:string,
        public inputId01:Id,
        public style:string,
        public parameterList:Array<Parameter>
    ){
    }
}

