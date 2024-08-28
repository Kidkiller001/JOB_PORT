import {NextFunction, Request, Response} from 'express'
import { prismaClient } from '..';
export const create_postulation = async (req: Request, res: Response) => {
    try {
        const employerId = parseInt(req.body.employerId, 10);
        const employeeId = parseInt(req.body.employeeId, 10);
        const jobId = parseInt(req.body.jobId, 10);
  
      // Validate the input
      if (!employerId || !employeeId || !jobId) {
        return res.status(400).json({ error: 'Employer ID, Employee ID, and Job ID are required' });
      }
  
      // Create a new postulation
      const postulation = await prismaClient.postulation.create({
        data: {
          employerId,
          employeeId,
          jobId,
        },
      });
  
      // Return the newly created postulation
      return res.status(201).json(postulation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the postulation' });
    }
  }

  export const get_postulation_by_id = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
  
      // Fetch the postulation by ID
      const postulation = await prismaClient.postulation.findUnique({
        where: { id: Number(id) },
      });
  
      if (!postulation) {
        return res.status(404).json({ error: 'Postulation not found' });
      }
  
      // Return the postulation
      return res.status(200).json(postulation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving the postulation' });
    }
  }
export const get_all_postulations = async (req: Request, res: Response) => {
    try {
      const { employerId, employeeId, jobId } = req.query;
  
      // Fetch all postulations with optional filters
      const postulations = await prismaClient.postulation.findMany({
        where: {
          ...(employerId && { employerId: Number(employerId) }),
          ...(employeeId && { employeeId: Number(employeeId) }),
          ...(jobId && { jobId: Number(jobId) }),
        },
      });
  
      // Return the list of postulations
      return res.status(200).json(postulations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving the postulations' });
    }
  }

export const update_postulation_by_id = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { employerId, employeeId, jobId } = req.body;
  
      // Fetch the existing postulation
      const existingPostulation = await prismaClient.postulation.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existingPostulation) {
        return res.status(404).json({ error: 'Postulation not found' });
      }
  
      // Update the postulation
      const updatedPostulation = await prismaClient.postulation.update({
        where: { id: Number(id) },
        data: {
          ...(employerId && { employerId }),
          ...(employeeId && { employeeId }),
          ...(jobId && { jobId }),
        },
      });
  
      // Return the updated postulation
      return res.status(200).json(updatedPostulation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the postulation' });
    }
  }

 export const delete_postulation_by_id = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Delete the postulation
      const deletedPostulation = await prismaClient.postulation.delete({
        where: { id: Number(id) },
      });
  
      // Return the deleted postulation
      return res.status(200).json(deletedPostulation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while deleting the postulation' });
    }
  }
  
export const get_postulation_by_job_id = async (req: Request, res: Response) => {
    try {
      const { jobId } = req.params;
  
      // Fetch postulations by job ID
      const postulations = await prismaClient.postulation.findMany({
        where: { jobId: Number(jobId) },
      });
  
      // Return the postulations
      return res.status(200).json(postulations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving the postulations' });
    }
  }
  
  
  
  