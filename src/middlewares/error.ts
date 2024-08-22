import { Response,Request,NextFunction } from "express";
import { httpexception } from "../exceptions/root";

export const error_middleware =(error:httpexception,req:Request,res:Response,next:NextFunction)=>{
 res.status(error.statusCode).json({
    message:error.message,
    errorCode:error.errorCode,
    error:error.error
 })
}