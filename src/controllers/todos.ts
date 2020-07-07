import Todo from '../models/Todo';
import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';

type RequestBody = {
    description: string,
    isDone: boolean
};

exports.getAll = (req: Request, res: Response, next: NextFunction) => {
    const filterBy = req.body.filterBy;

    Todo
    .find()
    .then(todos => {
        res.status(200).json({ todos: todos });
    });
};

exports.create = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const body = req.body as RequestBody;
    const { description } = body;
    const todo = new Todo({
        description: description,
        isDone: false
    });
    todo.save().then(() => {
        res.status(201).json({ todo: todo });
    });
};

exports.update = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const body = req.body as RequestBody;
    const { description, isDone } = body;
    const id = req.params.id;

    Todo.findById(id)
    .then(todo => {
        if (todo) {
            todo.description = description || todo.description;
            todo.isDone = isDone !== null ? isDone : todo.isDone;
            return todo.save();
        }
    })
    .then(todo => {
        if (todo) {
            return res.status(200).json({ todo: todo });
        } else {
            throw404(res);
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong, try again later" });
    });
};

exports.delete = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
    .then(todo => {
        if (todo) {
            return res.status(204).json({ message: "Todo deleted" });
        } else {
            throw404(res);
        }
    });
};

function throw404(res: Response) {
    return res.status(404).json({ message: "The given element does not exist" });
}