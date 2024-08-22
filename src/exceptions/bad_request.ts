import { errorCodes, httpexception } from "./root";

export  class bad_request_exception extends httpexception{
    constructor(message:string, errorCode:errorCodes){
        super(message,errorCode,400,null)
    }
}