import {QueryElement} from './queryelement';
import {InputQuery} from './inputquery';

export class ElementOperation{

    constructor(
        public idElement:number,
        public fromQueryList:QueryElement,
        public whereQueryList:QueryElement,
        public inputQuery:InputQuery,
        public operation:string,
        public from:string,
        public where:string
    ){
    }

}