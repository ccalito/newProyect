import {Parameter} from "./parameter";
import {Style} from "./style";
import {ParameterDynamic} from "./parameterDynamic";

export class Cell{
 
    constructor(
        public size:number,
        public posX:number,
        public posY:number,
        public textValue:string,
        public inputId01:string,
        public style:Style,
        public parameterList:Array<Parameter>,
        public valueList:Array<ParameterDynamic>
    ){
    }
}

