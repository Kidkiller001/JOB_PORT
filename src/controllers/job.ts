import {NextFunction, Request, Response} from 'express'
import { prismaClient } from '..';
export const create_job = async (req: Request, res:Response,next:NextFunction) => {
    const { title, description, deadline, location, employer_id } = req.body;
    try{
      const job = await prismaClient.job.create({
        data: {
          title,
          description,
          deadline,
          location,
          employer_id
        },
      });
      res.json(job);
    }
    catch(error){
        console.log(error)

    }
  };
  
  export const get_all_jobs = async (req:Request, res:Response) => {
    
     try{ const jobs = await prismaClient.job.findMany();
      res.json(jobs);}
      catch(error){
        console.log(error)
      }
  };
  export const get_job_by_id = async (req:Request, res:Response) => {
    const { id } = req.body;
    try {
      const job = await prismaClient.job.findUnique({
        where: { id: Number(id) },
      });
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch job'});
    }
  };
  export const update_job = async (req:Request, res:Response) => {

    const { id,title, description, deadline, location,employer_id } = req.body;
    try {
      const job = await prismaClient.job.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          deadline,
          location,
          employer_id
        },
      });
      res.json(job);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to update job'});
    }
  };
  export const delete_job_by_id = async (req:Request, res:Response) => {
    const { id } = req.body;
    try {
      await prismaClient.job.delete({
        where: { id: Number(id) },
      });
      res.status(204).send(); // No content
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to delete job'});
    }
  };

 export const get_job_by_employer_id = async (req:Request, res:Response) => {
    const { employer_id } = req.body;
    try {
      const jobs = await prismaClient.job.findMany({
        where: { employer_id: Number(employer_id) },
      });
      res.json(jobs);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to fetch jobs for employer' });
    }
  };
  export const search_job = async (req:Request, res:Response) => {
    const { title, location } = req.query;
    try {
      const jobs = await prismaClient.job.findMany({
        where: {
          AND: [
            title ? { title: { contains: String(title), mode: 'insensitive' } } : {},
            location ? { location: { contains: String(location), mode: 'insensitive' } } : {},
          ],
        },
      });
      res.json(jobs);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to search jobs'});
    }
  };
 export const get_postulation_for_job =  async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const postulations = await prismaClient.postulation.findMany({
        where: { jobId: Number(id) },
        include: {
          employee: true,  // Include the employee details
          employer: true,  // Include the employer details
        },
      });
      res.json(postulations);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch postulations for the job' });
    }
  };
  
  
  
  
  