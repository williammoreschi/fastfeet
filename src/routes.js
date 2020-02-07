import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Bem vindo ao FastFeet' });
});

export default routes;
