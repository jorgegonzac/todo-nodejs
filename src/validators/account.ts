import { body } from 'express-validator';

export const createAccount = [
    body('email').isEmail(),
    body('password').isString().isAlphanumeric(),
];

export const loginAccount = [
    body('email').isEmail(),
    body('password').isString(),
];