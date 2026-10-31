import Project from '../model/Project.js';

const KEY = 'todo-list-app-state';

export function saveState(projects, activeProjectId) {
    try {
        const payload = {
            projects: projects.map((p) => p.toJSON()),
            activeProjectId,
        };
        localStorage.setItem(KEY, JSON.stringify(payload));
    } catch (err) {
        console.error('Failed to save state:', err);
    }
}

export function loadState() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.projects)) return null;

        const projects = parsed.projects.map((p) => Project.fromJSON(p));
        return { projects, activeProjectId: parsed.activeProjectId ?? null };
    } catch (err) {
        console.error('Failed to load state (corrupt data?):', err);
        return null;
    }
}