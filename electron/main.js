const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const TodoServiceType = require('./service/todoService')
const todoService = new TodoServiceType()

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html').then(async () => {
    win.webContents.openDevTools()
    todos = await todoService.loadTodos();
    console.log("loaded");
    win.webContents.send('todos-loaded', todos)
  })

  ipcMain.on('add-todo', async (_, title, description) => {
    console.log("Main!");
    const newTodo = await todoService.addTodo(title, description);
    if (newTodo) {
      win.webContents.send('todo-added', newTodo);
    }
  });
  
  ipcMain.on('update-todo', async (_, id, title, description, completed) => {
    console.log(id, title, description, completed);
    const updatedTodo = await todoService.updateTodo(id, title, description, completed);
    if (updatedTodo) {
      win.webContents.send('todo-updated', updatedTodo);
    }
  });
  
  ipcMain.on('delete-todo', async (_, id) => {
    console.log("delete maain");
    const deleted = await todoService.deleteTodo(id);
    if (deleted) {
      win.webContents.send('todo-deleted', id);
    }
  });
  
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})



//########################################################
