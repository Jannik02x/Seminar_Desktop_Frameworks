use serde::Deserialize;
use serde::Serialize;
use uuid::Uuid;

#[derive(Deserialize, Debug, Serialize, Clone)]
pub struct Todo {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub completed: bool
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Todos {
    pub value: Vec<Todo>
}