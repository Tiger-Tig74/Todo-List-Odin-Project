import { format, isPast, isToday, isTomorrow } from 'date-fns';

export default class Todo {
    constructor({
        id = crypto.randomUUID(),
        title = '',
        description = '',
        dueDate = '',
        priority = 'medium',
        notes = '',
        completed = false,
        projectId = null,
    } = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
        this.projectId = projectId;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getDueLabel() {
        if (!this.dueDate) return 'No due date';
        const d = new Date(this.dueDate);
        if (isToday(d)) return 'Today';
        if (isTomorrow(d)) return 'Tomorrow';
        if (isPast(d)) return `Overdue (${format(d, 'MMM d')})`;
        return format(d, 'MMM d, yyyy');
    }

    get isOverdue() {
        return this.dueDate && !this.completed && isPast(new Date(this.dueDate)) && !isToday(new Date(this.dueDate));
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            completed: this.completed,
            projectId: this.projectId,
        };
    }

    static fromJSON(obj) {
        return new Todo(obj);
    }
}