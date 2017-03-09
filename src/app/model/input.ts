import {QueryElement} from "./queryelement";
import {FieldElement} from "./fieldelement";

export class Input{

    constructor(
        public id:string,
        public queryList:Array<QueryElement>,
        public fields:Array<FieldElement>){
    }
}
