import {EmpresaId} from "./empresaId";

export class Empresa{
 
    constructor(
       public empresaId:EmpresaId,
       public paicod:string,
       public empcod:string,
       public empnom:string
    ){

    }
}

