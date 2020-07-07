import Account from '../models/Account';
import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';

type RequestBody = {
    email: string,
    password: string,
};

exports.create = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const body = req.body as RequestBody;
    const { email, password } = body;
    const account = new Account({
        email: email,
        password: password,
    });
    account.save().then(() => {
        res.status(201).json({ account: account });
    });
};

exports.login = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const body = req.body as RequestBody;
    const { email, password } = body;
    const getAccount = Account.findOne({ email: email }, (err, account) => {
        if (err || account === null) {
            return res.status(401).json({ errors: 'Invalid credentials' });
        } else {
            account.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err || !isMatch) {
                    return res.status(401).json({ errors: 'Invalid credentials' });
                } else {
                    res.status(200).json({ account: account });
                }
            });
        }
    });
};