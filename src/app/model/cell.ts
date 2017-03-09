import {Parameter} from "./parameter";
import {Style} from "./style";

export class Cell{
 
    constructor(
        public posX:number,
        public posY:number,
        public textValue:string,
        public inputId01:string,
        public style:Style,
        public parameterList:Array<Parameter>,
        public valueList:Array<Parameter>
    ){
    }
}

