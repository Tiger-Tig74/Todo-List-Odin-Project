export default function renderTodoDetail(todo, handlers) {
    const detail = document.getElementById('todo-detail');
    detail.classList.remove('hidden');
    detail.textContent = '';

    const close = document.createElement('button');
    close.className = 'close-btn';
    close.textContent = '✕ Close';
    close.addEventListener('click', handlers.onClose);

    const h3 = document.createElement('h3');
    h3.textContent = 'Edit Todo';

    const form = document.createElement('form');
    form.className = 'todo-form';

    form.innerHTML = `
    <label>Title<input name="title" required></label>
    <label>Description<input name="description"></label>
    <label>Due Date<input name="dueDate" type="date"></label>
    <label>Priority
        <select name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    </label>
    <label>Notes<textarea name="notes" rows="3"></textarea></label>
    <div class="form-actions">
        <button type="submit" class="btn primary">Save</button>
        <button type="button" class="btn danger" id="delete-todo">Delete</button>
    </div>
    `;

    form.elements.title.value = todo.title;
    form.elements.description.value = todo.description;
    form.elements.dueDate.value = todo.dueDate;
    form.elements.priority.value = todo.priority;
    form.elements.notes.value = todo.notes;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handlers.onSave(todo.id, {
            title: form.elements.title.value.trim(),
            description: form.elements.description.value.trim(),
            dueDate: form.elements.dueDate.value,
            priority: form.elements.priority.value,
            notes: form.elements.notes.value.trim(),
        });
    });

    form.querySelector('#delete-todo').addEventListener('click', () => {
        if (confirm('Delete this todo?')) handlers.onDelete(todo.id);
    });

    detail.append(close, h3, form);
}