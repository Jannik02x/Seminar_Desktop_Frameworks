//let todos = []
const URL = 'http://localhost:3000/todos';
class TodoService {
    async loadTodos() {
        console.log("Loading!");
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        
        //console.log(await response.json());
        if (response.status === 200) {
            return await response.json();
        }
        return null;
    }
    async addTodo(title, description) {

        console.log("adding todo");
        let todoData = {
            title, description
        }
        let response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(todoData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.status === 201) {
            return await response.json();
        }
        return null;
    }
    async updateTodo(id, title, description, completed) {
        console.log("updating todo");
        let todo = {
            id, title, description, completed
        }
        console.log(todo);
        let response = await fetch(URL + '/' + id, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            return await response.json();
        }
        return null;
    }
    async deleteTodo(id) {
        console.log("deleting todo");
        let todoData = {
            id
        }
        let response = await fetch(URL + '/' + id, {
            method: "DELETE",
            body: JSON.stringify(todoData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.status === 204;
    }
}

module.exports = TodoService;