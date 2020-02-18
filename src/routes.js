import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import StarDeliveryController from './app/controllers/StarDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';

import authMiddleware from './app/middlwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'Bem vindo ao FastFeet' });
});

routes.post('/session', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliverymanDeliveryController.index);

routes.put(
  '/deliveryman/:deliverymanId/star/delivery/:deliveryId',
  StarDeliveryController.update
);
routes.put(
  '/deliveryman/:deliverymanId/end/delivery/:deliveryId',
  upload.single('file'),
  EndDeliveryController.update
);

routes.use(authMiddleware);

/** recipient */
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

/** deliverymen */
routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

/** deliveries */
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
