import {FieldElement} from "./fieldelement";

export class QueryElement{
    constructor(
        public correlative:number,
        public query:string,
        public name:string,
        public fields:Array<FieldElement>
    ){

    }
}