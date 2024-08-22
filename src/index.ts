import express,{Express, Request , Response, query} from 'express'
import {PORT} from './secrets'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client'
import { error_middleware } from './middlewares/error'
import { signup_schema } from './schema/user'
const app = express()
app.use(express.json())

app.use('/api',rootRouter)
export const prismaClient = new PrismaClient(
    {
        log:['query']
    }
)
app.use(error_middleware)
app.listen(PORT, ()=>{console.log("App Running")})

