export class httpexception extends Error{
    message: string;
    errorCode:any
    statusCode:number
    error:errorCodes

    constructor(message:string,errorCode:errorCodes,statusCode:number,error:any){
        super(message)
        this.message=message
        this.errorCode=errorCode
        this.statusCode=statusCode
        this.error=error

    }
 

    
} 
export enum errorCodes{
    USER_NOT_FOUNT=1001,
    USR_ALREADY_EXIST=1002,
    WRONG_PASSWORD=1003,
    UNPROCESSABLE_ENTITY=2001,
    INTERNAL_EXCEPTION=3001,
    UNAUTHORIZED=3002
}