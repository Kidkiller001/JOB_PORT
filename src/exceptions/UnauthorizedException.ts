import { httpexception } from "./root";

export class UnauthorizedException extends httpexception{
    constructor(message:string, errorCode:number ,error?:any){
        super(message,errorCode,401,error)
    }
}