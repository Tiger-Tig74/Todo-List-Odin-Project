import './styles.css';
import AppState from './model/AppState.js';
import { saveState, loadState } from './storage/storage.js';
import renderProjects from './view/renderProjects.js';
import renderTodos from './view/renderTodos.js';
import renderTodoDetail from './view/renderTodoDetail.js';
import renderNewTodoForm from './view/renderForm.js';

const loaded = loadState();
AppState.init(loaded?.projects);
if (loaded?.activeProjectId) AppState.setActiveProject(loaded.activeProjectId);

function persist() {
    saveState(AppState.getProjects(), AppState.getActiveProjectId());
}

function render() {
    const projects = AppState.getProjects();
    const activeId = AppState.getActiveProjectId();
    const active = AppState.getActiveProject();

    renderProjects(projects, activeId, onSelectProject, onDeleteProject);
    renderTodos(active, todoHandlers);
    document.getElementById('current-project-name').textContent = active?.name ?? '';
}

function onSelectProject(id) {
    AppState.setActiveProject(id);
    hideDetail();
    persist();
    render();
}

function onDeleteProject(id) {
    AppState.deleteProject(id);
    hideDetail();
    persist();
    render();
}

const todoHandlers = {
    onToggle: (id) => { AppState.toggleTodo(id); persist(); render(); },
    onExpand: (id) => {
        const project = AppState.getActiveProject();
        const todo = project?.getTodo(id);
        if (todo) renderTodoDetail(todo, detailHandlers);
    },
};

const detailHandlers = {
    onClose: hideDetail,
    onSave: (id, updates) => {
        AppState.updateTodo(id, updates);
        persist();
        hideDetail();
        render();
    },
    onDelete: (id) => {
        AppState.deleteTodo(id);
        persist();
        hideDetail();
        render();
    },
};

function hideDetail() {
    const d = document.getElementById('todo-detail');
    d.classList.add('hidden');
    d.textContent = '';
}

document.getElementById('new-project-btn').addEventListener('click', () => {
    const name = prompt('Project name:');
    if (name && name.trim()) {
        AppState.createProject(name.trim());
        persist();
        render();
    }
});

document.getElementById('new-todo-btn').addEventListener('click', () => {
    renderNewTodoForm((data) => {
        if (!data.title) return;
        AppState.createTodo(data);
        persist();
        render();
    });
});

render();