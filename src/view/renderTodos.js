export default function renderTodos(project, handlers) {
    const list = document.getElementById('todo-list');
    list.textContent = '';

    if (!project || project.todos.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-msg';
        empty.textContent = 'No todos yet. Click "+ New Todo" to add one.';
        list.appendChild(empty);
        return;
    }

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sorted = [...project.todos].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        if (priorityOrder[a.priority] !== priorityOrder[b.priority])
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        return (a.dueDate || '9999').localeCompare(b.dueDate || '9999');
    });

    sorted.forEach((todo) => {
        const row = document.createElement('div');
        row.className = `todo-row priority-${todo.priority}` + (todo.completed ? ' completed' : '');
        if (todo.isOverdue) row.classList.add('overdue');

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = todo.completed;
        check.addEventListener('change', () => handlers.onToggle(todo.id));

        const body = document.createElement('div');
        body.className = 'todo-body';

        const title = document.createElement('span');
        title.className = 'todo-title';
        title.textContent = todo.title;

        const meta = document.createElement('span');
        meta.className = 'todo-meta';
        meta.textContent = todo.getDueLabel();

        body.append(title, meta);

        const expand = document.createElement('button');
        expand.className = 'expand-btn';
        expand.textContent = '>';
        expand.addEventListener('click', () => handlers.onExpand(todo.id));

        row.append(check, body, expand);
        list.appendChild(row);
    });
}