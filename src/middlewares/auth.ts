import { NextFunction, Response,Request } from "express";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import { errorCodes } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { prismaClient } from "..";
const authMiddleWare = async (req:Request,res:Response,next:NextFunction)=>{
    //extract the token from header
    const token = req.headers.authorization
    //if token is not present 
    if(!token){
        next(new UnauthorizedException('Unauthorized',errorCodes.UNAUTHORIZED)
     )
    }
    try {
        // if token exists verify and generate payload
         const payload = jwt.verify(token!,JWT_SECRET) as any
         const user = await prismaClient.user.findFirst({where:{id:payload.userId}})
        if(!user){
            next (new UnauthorizedException('Unauthorized',errorCodes.UNAUTHORIZED))      
        }
        res.json(user)
        next()
        } catch (error) {
        next (new UnauthorizedException('Unauthorized',errorCodes.UNAUTHORIZED))            }
}
export default authMiddleWare