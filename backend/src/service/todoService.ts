import { randomUUID } from "crypto";
import { Todo } from "../model/todo";

let todos:Todo[] = [
    {
        id: randomUUID(),
        title: "Todo 1",
        description: "Dies ist das erste Todo",
        completed: false
    },
    {
        id: randomUUID(),
        title: "Todo Nr.2",
        description: "Dies ist das zweite Todo und erledigt",
        completed: true
    }]

class TodoService {
    createTodo(title:string, description:string):Todo {
        const todo: Todo = {
            id: randomUUID(),
            title,
            description,
            completed: false,
        };
        todos.push(todo);
        return todo;
    }
    getTodos():Todo[] {        
        return structuredClone(todos);
    }
    getTodo(id:string) {
        const todo = todos.find((t) => t.id === id);
        return structuredClone(todo);
    }
    updateTodo(id:string, title?:string, description?:string, completed?:boolean) {
        console.log("Update:");
        
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            todo.title = title ?? todo.title;
            todo.description = description ?? todo.description;
            todo.completed = completed ?? todo.completed;            
        }
        return todo;
    }
    deleteTodo(id:string):boolean {
        const index = todos.findIndex((t) => t.id === id);

        if (index !== -1) {
            todos.splice(index, 1);
        }
        return index !== -1
    }
}

export default TodoService