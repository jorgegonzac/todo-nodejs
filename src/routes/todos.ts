import { Router } from 'express';
import { createTodo, updateTodo } from '../validators/todo';

const todoController = require('../controllers/todos');

const router = Router();

router.get('/todo', todoController.getAll);

router.post('/todo', createTodo, todoController.create);

router.put('/todo/:id', updateTodo, todoController.update);

router.delete('/todo/:id', todoController.delete);

export default router;