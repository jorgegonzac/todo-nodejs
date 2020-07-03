import { Router } from 'express';
const controller = require('../controllers/todos');

const router = Router();

router.get('/todo', controller.getAll);

router.post('/todo', controller.create);

router.put('/todo/:id', controller.update);

router.delete('/todo/:id', controller.delete);

export default router;