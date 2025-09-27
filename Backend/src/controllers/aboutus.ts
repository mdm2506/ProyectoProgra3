import { Request, Response } from 'express';
import { AboutUs, AboutUsModel } from '../models/aboutus';

export class AboutUsController {
      static async getAllaboutus(req: Request, res: Response): Promise<void> {
    try {
      const items = await AboutUsModel.getAll();
      res.json(items);
    } catch (error) {
      console.error('Error getting about us:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createaboutus(req: Request, res: Response): Promise<void> {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            res.status(400).json({ error: 'Title and description are required' });
            return;
        }
    const aboutus: AboutUs = { title, description };
    const id= await AboutUsModel.create(aboutus);

    res.status(201).json({ message: 'AboutUs created', id });
    } catch (error) {
        console.error('Error creating about us:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
}

export default AboutUsController;
