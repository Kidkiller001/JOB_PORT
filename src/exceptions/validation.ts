import { errorCodes, httpexception } from "./root";

export class UnprocessableEntity extends httpexception{
    constructor(error:any,message:string,errorCode:errorCodes){
        super(message,errorCode,422,null)
    }
}