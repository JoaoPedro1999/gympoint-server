import { Router } from 'express';
import BullBoard from 'bull-board';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';

import Queue from './lib/Queue';

const routes = new Router();

BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Gympoint' });
});

routes.use('/admin/queues', BullBoard.UI);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.delete('/plans', PlanController.delete);

export default routes;
