import { Router } from 'express';
import { AboutUsController } from '../controllers/aboutus';

const aboutusRouter = Router();
aboutusRouter.get('/', AboutUsController.getAllaboutus);
aboutusRouter.post('/', AboutUsController.createaboutus);

export default aboutusRouter;
