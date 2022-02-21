import express from 'express';
import PageController from '../controllers/page-controller.js';
import EmailController from '../controllers/email-controller.js';

const webRouter = express.Router();

webRouter.get('/', PageController.home);
webRouter.post('/', EmailController.saveEmail);
webRouter.get('/confirm/:hash', EmailController.confirmHash);
webRouter.get('*', PageController.pageNotFound);

export default webRouter;
