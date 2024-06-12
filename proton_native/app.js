import React, { Component } from "react"; // import from react

import { Window, App, View, Text, Button } from "proton-native"; // import the proton-native components
import TodoService  from "./service/todoService";

export default class Todo extends Component {
  state = { }
  todoService = new TodoService();

  render() {
    // all Components must have a render method
    return (
      <App>
        {/* you must always include App around everything */}
        <Window style={{ width: 1200, height: 1000, backgroundColor: "grey" }}>
          {/* all your other components go here*/}
          <View>
            <Text>ToDo-App</Text>
            {this.state.todos ?
            this.state.todos.map((todo) => (
              <View key={todo.id}>
                <Text>{todo.title}</Text>
                <Text>{todo.description}</Text>
              </View>
            )) : <Text>loading ToDos...</Text>}
          </View>
        </Window>
      </App>
    );
  }

  async componentDidMount() {  
    let todos = await this.todoService.loadTodos();
    this.setState({"todos": todos});
    
    this.render();
  }
}
