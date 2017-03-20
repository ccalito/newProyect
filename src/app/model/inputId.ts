import {QueryElement} from "./queryelement";
import {FieldElement} from "./fieldelement";

export class InputId{

    constructor(
        public hexId:string,
	    public name:string,
        public queryList:Array<QueryElement>,
        public fields:Array<FieldElement>){
    }
}
