import { Router } from 'express';
import { createTodo, updateTodo } from '../validators/todo';

const controller = require('../controllers/todos');

const router = Router();

router.get('/todo', controller.getAll);

router.post('/todo', createTodo, controller.create);

router.put('/todo/:id', updateTodo, controller.update);

router.delete('/todo/:id', controller.delete);

export default router;