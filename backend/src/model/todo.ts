import { UUID } from "crypto";

export interface Todo {
    id: UUID;
    title: string;
    description: string;
    completed: boolean;
}