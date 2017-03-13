import {InputQueryValue} from "./inputqueryvalue";

export class InputQuery{
 
    constructor(
        public content:Array<InputQueryValue>,
        public parameters:Array<string>
    ){
    }
}

