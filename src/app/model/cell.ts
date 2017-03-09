import {Parameter} from "./parameter";
import {QueryList} from "./queryList";

export class Cell{
 
    constructor(
        public size:number,
        public posX:number,
        public posY:number,
        public textValue:string,
        public inputId01:string,
        public style:string,
        public parameterList:Array<Parameter>,
        public queryList:Array<QueryList>
    ){
    }
}

