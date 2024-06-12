import { Router, Request, Response } from 'express';
import { Todo } from '../model/todo';
import TodoService from '../service/todoService';

const todoRouter = Router();
const todoService:TodoService = new TodoService()

todoRouter.post('/', (req: Request, res: Response) => {
    const todo:Todo = todoService.createTodo(req.body.title, req.body.description)
    res.status(201).json(todo);
});

todoRouter.get('/', (req: Request, res: Response) => {
    const todos = todoService.getTodos();
    res.status(200).json(todos);
});

todoRouter.get('/:id', (req: Request, res: Response) => {
    const todo = todoService.getTodo(req.params.id)

    if (!todo) {
      res.status(404).send('Task not found');
    } else {
      res.json(todo);
    }
});

todoRouter.put('/:id', (req: Request, res: Response) => {
    const todo = todoService.updateTodo(req.params.id, req.body.title, req.body.description, req.body.completed)
    if (!todo) {
      res.status(404).send('Task not found');
    } else {
      res.status(200).json(todo);
    }
});

todoRouter.delete('/:id', (req: Request, res: Response) => {
    const deleted = todoService.deleteTodo(req.params.id);

    if (!deleted) {
      res.status(404).send('Task not found');
    } else {
      res.status(204).send();
    }
});

export default todoRouter;