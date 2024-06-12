//use reqwest::Error;
//use std::sync::Mutex;
//use tauri::State;
//use crate::model;
//
//extern crate uuid;
//
//const URL:&str = "http://localhost:3000/todos";
//
//
//pub async fn greet2(mutex_state: &mut State<'_, Mutex<model::todo::Todos>>) -> Result<(), Error> {
//    println!("TEST PRINT");
//    let response = reqwest::get(URL).await.unwrap(); //.json::<Vec<model::todo::Todo>>().await;
//    //println!("{:?}", response_todos);
//    match response.status() {
//        reqwest::StatusCode::OK => {
//            // on success, parse our JSON to an APIResponse
//            match response.json::<Vec<model::todo::Todo>>().await {
//                Ok(parsed) => {
//                    println!("Success! {:?}", parsed);
//                    let mut todos = mutex_state.lock().unwrap();
//                    *todos = model::todo::Todos { value: parsed };
//                }, //TODO: in state einfügen
//                Err(_) => println!("The response didn't match the expected shape."),
//            };
//        }
//        other => {
//            panic!("Something unexpected happened: {:?}", other);
//        }
//    };
//    Ok(())
//}
//
//pub async fn add_todo() {
//
//}
//
//pub async fn update_todo() {
//
//}
//
//pub async fn remove_todo() {
//
//}
//
//pub async fn get_todo() {
//
//}