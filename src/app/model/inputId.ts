import {QueryElement} from "./queryelement";
import {FieldElement} from "./fieldelement";

export class InputId{

    constructor(
        public _id:string,
        public queryList:Array<QueryElement>,
        public fields:Array<FieldElement>){
    }
}
