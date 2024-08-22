import {Router} from 'express'
import { create_job, delete_job_by_id, get_all_jobs, get_job_by_employer_id, get_job_by_id, get_postulation_for_job, search_job, update_job } from '../controllers/job'
const jobRoutes:Router = Router()
jobRoutes.post('/create_job',create_job)
jobRoutes.get('/get_all_jobs',get_all_jobs)
jobRoutes.get('/get_job_by_id',get_job_by_id)
jobRoutes.put('/update_job',update_job)
jobRoutes.delete('/delete_job_by_id',delete_job_by_id)
jobRoutes.get('/get_job_by_employer_id',get_job_by_employer_id)
jobRoutes.get('/search_job',search_job)
jobRoutes.get('/get_postulation_for_job',get_postulation_for_job)
export default jobRoutes