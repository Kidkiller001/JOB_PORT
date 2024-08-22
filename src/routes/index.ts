import express,{Router} from 'express'
import authRoutes from './auth'
import jobRoutes from './job'

const rootRouter:Router =Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/job',jobRoutes)
export default rootRouter