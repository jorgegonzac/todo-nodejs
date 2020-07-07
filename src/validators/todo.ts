import { body } from 'express-validator';

export const createTodo = [
    body('description').isString()
];

export const updateTodo = [
    body('description').isString(),
    body('isDone').isBoolean(),
]