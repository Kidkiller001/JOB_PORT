import {Router} from 'express'
import { create_postulation, delete_postulation_by_id, get_all_postulations, get_postulation_by_id, get_postulation_by_job_id, update_postulation_by_id } from '../controllers/postulation'
const postulationRoutes:Router = Router()
postulationRoutes.post('/create_postulation',create_postulation)
postulationRoutes.get('/get_postulation_by_id',get_postulation_by_id)
postulationRoutes.get('/get_all_postulations',get_all_postulations)
postulationRoutes.put('/update_postulation_by_id',update_postulation_by_id)
postulationRoutes.delete('/delete_postulation_by_id',delete_postulation_by_id)
postulationRoutes.get('/get_postulation_by_job_id',get_postulation_by_job_id)
export default postulationRoutes