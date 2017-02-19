import {DepartamentoId} from "./departamentoId";

export class Departamento{
 
    constructor(
       public departmentId:DepartamentoId,
       public paicod:string,
       public empcod:string,
       public depcod:string,
       public depnom:string
    ){

    }
}

