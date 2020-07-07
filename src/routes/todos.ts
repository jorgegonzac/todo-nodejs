import { Router } from 'express';
import { createTodo, updateTodo } from '../validators/todo';
import { createAccount, loginAccount } from '../validators/account';

const todoController = require('../controllers/todos');
const authController = require('../controllers/auth');

const router = Router();

router.get('/todo', todoController.getAll);

router.post('/todo', createTodo, todoController.create);

router.put('/todo/:id', updateTodo, todoController.update);

router.delete('/todo/:id', todoController.delete);

router.post('/signup', createAccount, authController.create);

router.post('/login', loginAccount, authController.login);

export default router;