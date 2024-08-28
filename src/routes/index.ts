import express,{Router} from 'express'
import authRoutes from './auth'
import jobRoutes from './job'
import postulationRoutes from './postulation'

const rootRouter:Router =Router()
rootRouter.use('/postulation',postulationRoutes)
rootRouter.use('/auth',authRoutes)
rootRouter.use('/job',jobRoutes)
export default rootRouter