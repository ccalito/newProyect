import {PeriodoId} from "./periodoId";

export class Periodo{
 
    constructor(
       public departmentId:PeriodoId,
       public paicod:string,
       public empcod:string,
       public depcod:string,
       public percod:number,
       public perdes:string
    ){

    }
}

