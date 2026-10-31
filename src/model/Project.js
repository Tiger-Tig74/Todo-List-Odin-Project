export default class Project {
    constructor({ id = crypto.randomUUID(), name = '', todos = [] } = {}) {
        this.id = id;
        this.name = name;
        this.todos = todos;
    }

    addTodo(todo) {
        todo.projectId = this.id;
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter((t) => t.id !== todoId);
    }

    getTodo(todoId) {
        return this.todos.find((t) => t.id === todoId);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            todos: this.todos.map((t) => t.toJSON()),
        };
    }

    static fromJSON(obj) {
        return new Project({
            id: obj.id,
            name: obj.name,
            todos: obj.todos.map((t) => (t instanceof Object && typeof t.toJSON !== 'function' ? Todo.fromJSON(t) : t)),
        });
    }
}

import Todo from './Todo.js';