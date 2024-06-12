// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod model;
use tauri::Manager;
use uuid::Uuid;
use std::collections::HashMap;

const URL:&str = "http://localhost:3000/todos";

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn get_todos() -> Result<Vec<model::todo::Todo>, ()> {
    println!("Get todos");
    let response = reqwest::get(URL).await.unwrap();
    let todos: Result<Vec<model::todo::Todo>, ()>;
    match response.status() {
        reqwest::StatusCode::OK => {
            // on success, parse JSON to an Todo
            todos = match response.json::<Vec<model::todo::Todo>>().await {
                Ok(parsed) => {
                    println!("Success! {:?}", parsed);
                    Ok(parsed)
                }, 
                    Err(_) => {
                        println!("The response didn't match the expected shape.");
                        Err(())
                    },
                };
        }
        other => {
            panic!("Something unexpected happened: {:?}", other);
        }
    };
    
    //TODO: println!("{:?}", state.lock().unwrap().value);
    //println!("todos: {:?}", todos);
    todos
    //Ok(format!("Hello, mate! You've been greeted from Rust!"))

}


#[tauri::command]
async fn add_todo(title: String, description: String) -> Result<model::todo::Todo, ()> {
    println!("add todo");
    let mut body = HashMap::new(); //TODO: body wie unten machen
    body.insert("title", title);
    body.insert("description", description);
    let response = reqwest::Client::new()
        .post(URL)
        .json(&body)
        .send()
        .await
        .unwrap();

    let added_todo: model::todo::Todo;
    match response.status() {
        reqwest::StatusCode::CREATED => {
            added_todo = match response.json::<model::todo::Todo>().await {
                Ok(parsed) => {
                    println!("Success! {:?}", parsed);
                    parsed
                }, 
                Err(_) => return Err(()),
            };
        }
        different_status => {
            panic!("Something unexpected happened: {:?}", different_status);
        }
    };
    Ok(added_todo)
}

#[tauri::command]
async fn update_todo(id: Uuid, title: String, description: String, completed: bool) -> Result<model::todo::Todo, ()> {
    println!("Update todo");
    println!("{}", completed);
    let body = model::todo::Todo { id: id, title: title, description: description, completed: completed };
    let response = reqwest::Client::new()
        .put(format!("{URL}/{id}")) 
        .json(&body)
        .send()
        .await
        .unwrap();

    let updated_todo: model::todo::Todo;
    match response.status() {
        reqwest::StatusCode::OK => {
            updated_todo = match response.json::<model::todo::Todo>().await {
                Ok(parsed) => {
                    println!("Success! {:?}", parsed);
                    parsed
                }, 
                Err(_) => return Err(()),
            };
        }
        different_status => {
            panic!("Something unexpected happened: {:?}", different_status);
        }
    };
    Ok(updated_todo)

}
#[tauri::command]
async fn delete_todo(id: Uuid) -> Result<bool, ()> {
    println!("Delete todo");
    let mut body = HashMap::new();
    body.insert("id", id);
    let response = reqwest::Client::new()
        .delete(format!("{URL}/{id}")) // url braucht id
        .json(&body)
        .send()
        .await
        .unwrap();

    let deleted = match response.status() {
        reqwest::StatusCode::NO_CONTENT => {
            true
        }
        _ => {
            false
        }
    };

    Ok(deleted)
}

fn main() {
    tauri::Builder::default()
        //.setup(|app| {
        //    #[cfg(debug_assertions)]
        //    app.get_window("main").unwrap().open_devtools(); // `main` is the first window from tauri.conf.json without an explicit label
        //    Ok(())
        //  })
        .invoke_handler(tauri::generate_handler![get_todos, add_todo, update_todo, delete_todo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
