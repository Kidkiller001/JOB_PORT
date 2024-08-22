import {Router} from 'express'
import { signup ,login,me, create_job} from '../controllers/auth'
import { errorHandler } from '../error_handler'
import authMiddleWare from '../middlewares/auth'

const authRoutes:Router = Router()
authRoutes.post('/signup',errorHandler(signup))
authRoutes.post('/login',errorHandler(login))
authRoutes.post('/create_job',errorHandler(create_job))
authRoutes.get('/me',[authMiddleWare],errorHandler(me))

export default authRoutes