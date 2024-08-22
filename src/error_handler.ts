import { NextFunction,Request,Response } from "express"
import { errorCodes, httpexception } from "./exceptions/root"
import { Internal_exception } from "./exceptions/internal_exception"

export const errorHandler = (method: Function)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
    try{
       await method(req,res,next)
    }catch(error:any){
        let exception:httpexception
        if(error instanceof httpexception){
            exception=error;
        }
        else{
            exception= new Internal_exception('something went Wrong',error,errorCodes.INTERNAL_EXCEPTION)
        }
        next(exception)

    }

    }
}
