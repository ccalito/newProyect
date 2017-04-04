import {QueryElement} from './queryelement';

export class ElementOperation{

    constructor(
        public idElement:number,
        public fromQueryList:QueryElement,
        public whereQueryList:QueryElement,
        public inputQuery:QueryElement,
        public operation:string 
    ){
    }

}