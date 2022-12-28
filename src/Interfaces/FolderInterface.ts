import { Todo } from './TodoInterface';

export interface Folder {
    id: number,
    title: string,
    todos: Todo[]
}