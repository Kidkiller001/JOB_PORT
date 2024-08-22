import {NextFunction, Request, Response} from 'express'
import { prismaClient } from '..';
import {compareSync, hashSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets';
import { bad_request_exception } from '../exceptions/bad_request';
import { errorCodes } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validation';
import { signup_schema } from '../schema/user';
import { string } from 'zod';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
export const signup = async (req:Request,res:Response,next:NextFunction) =>{
   
        const {email,password,role}=req.body;
        signup_schema.parse(req.body)
        let user= await prismaClient.user.findFirst({where:{email}})
        if(user){
            next (new bad_request_exception("user already exists",errorCodes.USR_ALREADY_EXIST))
    
        }
        user = await prismaClient.user.create(
            {
                data:{
                    email,
                    password:hashSync(password, 10),
                    role
                

                }
            }
        )
        res.json(user)
        
}   

export const login = async (req:Request,res:Response,next:NextFunction) =>{
    const {email,password}=req.body;
    let user= await prismaClient.user.findFirst({where:{email}})
    if(!user){
        throw Error('User does not exixts')

    }
    if(!compareSync(password,user.password)){
        throw Error('wrong password')

    }
    const token= jwt.sign({
        userId:user.id

    },JWT_SECRET)
    
        
    res.json({user,token})
}
export 
    const me = async (req:Request,res:Response,next:NextFunction)=>{
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

export const create_job = async(req:Request,res:Response,next:NextFunction)=>{
    const {title,description,deadline,location}=req.body;
    let job = await prismaClient.job.create(
        {
            data:{
                title,
                description,
                deadline,
                location
            

            }
        }
    )
    res.json(job)
    
}
    