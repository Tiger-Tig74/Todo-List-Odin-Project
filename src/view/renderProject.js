export default function renderProjects(projects, activeId, onSelect, onDelete) {
    const list = document.getElementById('project-list');
    list.textContent = '';

    projects.forEach((project) => {
        const li = document.createElement('li');
        li.className = 'project-item' + (project.id === activeId ? ' active' : '');

        const name = document.createElement('span');
        name.textContent = project.name;
        name.addEventListener('click', () => onSelect(project.id));

        const count = document.createElement('span');
        count.className = 'count';
        count.textContent = project.todos.length;

        const del = document.createElement('button');
        del.className = 'del-btn';
        del.textContent = 'x';
        del.title = 'Delete project';
        del.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Delete project "${project.name}"?`)) onDelete(project.id);
        });

        li.append(name, count, del);
        list.appendChild(li);
    });
}