import Project from './Project.js';
import Todo from './Todo.js';

const AppState = (() => {
    let projects = [];
    let activeProjectId = null;

    function init(loadedProjects) {
        if (loadedProjects && loadedProjects.length > 0) {
            projects = loadedProjects;
        } else {
            const defaultProject = new Project({ name: 'Inbox' });
            projects = [defaultProject];
        }
        activeProjectId = projects[0].id;
    }

    function getProjects() { return [...projects]; }
    function getActiveProjectId() { return activeProjectId; }
    function getActiveProject() { return projects.find((p) => p.id === activeProjectId); }

    function setActiveProject(id) {
        if (projects.some((p) => p.id === id)) activeProjectId = id;
    }

    function createProject(name) {
        const project = new Project({ name });
        projects.push(project);
        activeProjectId = project.id;
        return project;
    }

    function deleteProject(id) {
        projects = projects.filter((p) => p.id !== id);
        if (projects.length === 0) projects.push(new Project({ name: 'Inbox' }));
        if (activeProjectId === id) activeProjectId = projects[0].id;
    }

    function createTodo(todoData) {
        const project = getActiveProject();
        const todo = new Todo({ ...todoData, projectId: project.id });
        project.addTodo(todo);
        return todo;
    }

    function updateTodo(todoId, updates) {
        for (const p of projects) {
            const todo = p.getTodo(todoId);
            if (todo) { Object.assign(todo, updates); return todo; }
        }
        return null;
    }

    function deleteTodo(todoId) {
        for (const p of projects) {
            if (p.getTodo(todoId)) { p.removeTodo(todoId); return; }
        }
    }

    function toggleTodo(todoId) {
        for (const p of projects) {
            const todo = p.getTodo(todoId);
            if (todo) { todo.toggleComplete(); return todo; }
        }
    }

    function getStats() {
        const all = projects.flatMap((p) => p.todos);
        return { total: all.length, completed: all.filter((t) => t.completed).length };
    }

    return {
        init, getProjects, getActiveProjectId, getActiveProject, setActiveProject,
        createProject, deleteProject, createTodo, updateTodo, deleteTodo, toggleTodo, getStats,
    };
})();

export default AppState;