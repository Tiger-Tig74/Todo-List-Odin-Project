export default function renderNewTodoForm(onSubmit, onCancel) {
    const root = document.getElementById('modal-root');
    root.textContent = '';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
    <h3>New Todo</h3>
    <form class="todo-form">
        <label>Title<input name="title" required autofocus></label>
        <label>Description<input name="description"></label>
        <label>Due Date<input name="dueDate" type="date"></label>
        <label>Priority
            <select name="priority">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
            </select>
        </label>
        <label>Notes<textarea name="notes" rows="3"></textarea></label>
        <div class="form-actions">
            <button type="submit" class="btn primary">Add</button>
            <button type="button" class="btn" id="cancel">Cancel</button>
        </div>
    </form>
    `;

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onSubmit({
            title: form.elements.title.value.trim(),
            description: form.elements.description.value.trim(),
            dueDate: form.elements.dueDate.value,
            priority: form.elements.priority.value,
            notes: form.elements.notes.value.trim(),
        });
        root.textContent = '';
    });

    modal.querySelector('#cancel').addEventListener('click', () => {
        root.textContent = '';
        onCancel?.();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) { root.textContent = ''; onCancel?.(); }
    });

    overlay.appendChild(modal);
    root.appendChild(overlay);
    form.elements.title.focus();
}