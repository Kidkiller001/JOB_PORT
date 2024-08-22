import { httpexception } from "./root";

export class Internal_exception extends httpexception{
    constructor(message:string,error:any,errorCode:number){
        super(message,errorCode,500,error)
    }
}