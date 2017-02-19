import {Cell} from "./cell";

export class Sheet{

    constructor(
        public bookName:string, 
        public numberSheets:number,
        public fromValues:Array<string>,
        public whereValues:Array<Cell>){
    }
}
