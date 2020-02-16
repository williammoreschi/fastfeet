import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymenController from './app/controllers/DeliverymenController';

import authMiddleware from './app/middlwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'Bem vindo ao FastFeet' });
});

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

/** recipient */
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

/** recipient */
routes.get('/deliverymen', DeliverymenController.index);
routes.post('/deliverymen', DeliverymenController.store);
routes.put('/deliverymen/:id', DeliverymenController.update);
routes.delete('/deliverymen/:id', DeliverymenController.delete);

export default routes;
