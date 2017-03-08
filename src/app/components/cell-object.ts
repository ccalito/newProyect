export class CellObject{
    public from:string;
    public where:string;
    public country:string;
    public company:string;
    public department:string;
    public period:string;
    public moneda:string;

    constructor(from:string,where:string,country:string,company:string,department:string,period:string,moneda:string){
        this.from = from;
        this.where = where;
        this.country = country;
        this.company = company;
        this.department = department;
        this.period = period;
        this.moneda = moneda;
    }
    
    public setFrom(from:string){
        this.from = from;
    }
    public setWhere(where:string){
        this.where = where;
    }
    public setCountry(country:string){
        this.country = country;
    }
    public setCompany(company:string){
        this.company = company;
    }
    public setDepartment(department:string){
        this.department = department;
    }
    public setPeriod(period:string){
        this.period = period;
    }
    public setMoneda(moneda:string){
        this.moneda = moneda;
    }

    public getFrom():string{
        return this.from;
    }
    public getWhere():string{
       return this.where;
    }
    public getCountry():string{
        return this.country;
    }
    public getCompany():string{
        return this.company;
    }
    public getDepartment():string{
        return this.department;
    }
    public getPeriod():string{
        return this.period;
    }
    public getMoneda():string{
        return this.moneda;
    }
}