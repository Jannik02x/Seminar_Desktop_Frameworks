const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', {
    //fromMain: (channel, listener) => ipcRenderer.on(channel, (_event, ...args) => listener(...args)),
    todosLoaded: (listener) => ipcRenderer.on('todos-loaded', (_event, todos) => listener(todos)),
    todoAdded: (listener) => ipcRenderer.on('todo-added', (_event, todo) => listener(todo)),
    todoUpdated: (listener) => ipcRenderer.on('todo-updated', (_event, todo) => listener(todo)),
    todoDeleted: (listener) => ipcRenderer.on('todo-deleted', (_event, id) => listener(id)),
    //toMain: (channel, ...args) => ipcRenderer.send(channel, ...args),
    addTodo: (title, description) => ipcRenderer.send('add-todo', title, description),
    updateTodo: (id, title, description, completed) => ipcRenderer.send('update-todo', id, title, description, completed),
    deleteTodo: (id) => ipcRenderer.send('delete-todo', id),
})