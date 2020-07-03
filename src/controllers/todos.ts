import { Todo } from '../models/Todo';
import {Request, Response, NextFunction} from 'express';

type RequestBody = {
    description: string,
    isDone: boolean
};

let todos: Todo[] = [];

exports.getAll = (req: Request, res: Response, next: NextFunction) => {
    const filterBy = req.body.filterBy;
    const filteredResults = todos.filter(todo => {
        return filterBy === "done" ? todo.isDone : true;
    });
    res.status(200).json({ todos: filteredResults });
};

exports.create = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBody;
    const id = new Date().getUTCMilliseconds().toString();
    const newTodo: Todo = {
        id: id,
        description: body.description,
        isDone: false
    };
    todos.push(newTodo);

    res.status(201).json({ todo: newTodo });
};

exports.update = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBody;
    const id = req.params.id;
    const indexOfElem = todos.findIndex((todo) => todo.id === id);

    if (indexOfElem >= 0) {
        todos[indexOfElem] = {
            id: todos[indexOfElem].id,
            description: body.description || todos[indexOfElem].description,
            isDone: body.isDone || todos[indexOfElem].isDone,
        };

        return res.status(200).json({ todo: todos[indexOfElem] });
    } else {
        return res.status(404).json({ message: "The given element does not exist" });
    }
};

exports.delete = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id !== id);
    return res.status(204).json({ message: "Todo deleted" });
};