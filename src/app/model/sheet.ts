import {Cell} from "./cell";
import {CellRange} from "./cellrange";

export class Sheet{
    constructor(
        public correlative:number,
        public cellRangeList:Array<CellRange>,
        public colWidths:Array<number>,
        public cellList:Array<Cell>
    ){

    }

}