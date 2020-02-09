import { Router } from 'express';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Bem vindo ao FastFeet' });
});

routes.post('/session', SessionController.store);

export default routes;
