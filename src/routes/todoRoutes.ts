import { Router } from 'express';
import { Todo } from '../models/Todo';

const router = Router();

let todoList: Todo[] = [];

router.get('/todo', (req, res, next) => {
    res.status(200).json({ todos: todoList});
});

export default router;