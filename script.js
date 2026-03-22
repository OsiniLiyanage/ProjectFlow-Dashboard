//f1


const ham = document.querySelector('.hamburger');
const pop = document.querySelector('.mobile-popover');

ham.addEventListener('click', (e) => {
    e.stopPropagation();
    pop.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!pop.contains(e.target)) {
        pop.classList.add('hidden');
    }
});

document.querySelectorAll('.popover-link').forEach(link => {
    link.addEventListener('click', (e) => {
        pop.classList.add('hidden');
    })
})

//f1 over


//f2

let activeTab = 'all';
let searchQuery = '';
let sortMode = 'date';


let tasks = [
    { id: 1, name: "Write unit tests", desc: "Cover auth and payment modules with tests.", priority: "medium", status: "done", date: "2026-03-02" },
    { id: 2, name: "Update dependencies", desc: "Bump all packages to latest stable versions.", priority: "low", status: "done", date: "2026-03-03" },
    { id: 3, name: "Implement dark mode", desc: "Add theme toggle with CSS custom properties.", priority: "medium", status: "done", date: "2026-03-04" },
    { id: 4, name: "Set up CI/CD pipeline", desc: "Configure GitHub Actions for auto deploy.", priority: "medium", status: "done", date: "2026-03-05" },
    { id: 5, name: "Create user dashboard", desc: "Build the analytics dashboard for end users.", priority: "high", status: "in-progress", date: "2026-03-06" },
    { id: 6, name: "Performance audit", desc: "Run Lighthouse and fix critical issues.", priority: "medium", status: "in-progress", date: "2026-03-07" },
    { id: 7, name: "Fix login redirect bug", desc: "Users are redirected to 404 after OAuth login.", priority: "high", status: "in-progress", date: "2026-03-08" },
    { id: 8, name: "Database migration", desc: "Migrate user table to new schema.", priority: "high", status: "todo", date: "2026-03-09" },
    { id: 9, name: "Design homepage wireframe", desc: "Create low-fi wireframes for the new landing page.", priority: "high", status: "in-progress", date: "2026-03-10" },
    { id: 10, name: "Code review: auth module", desc: "Review PR #42 for security issues.", priority: "medium", status: "in-progress", date: "2026-03-11" },
];

function getPriorityClasses(priority) {
    if (priority === 'high') return 'bg-red-100 text-red-600';
    if (priority === 'medium') return 'bg-amber-100 text-amber-600';
    if (priority === 'low') return 'bg-green-100 text-green-600';
    return '';
}

function getStatusClasses(status) {
    if (status === 'done') return 'bg-violet-100 text-violet-600';
    if (status === 'in-progress') return 'bg-amber-100 text-amber-600';
    if (status === 'todo') return 'bg-slate-100 text-slate-500';
    return '';
}

function getStatusLabel(status) {
    if (status === 'done') return 'Completed';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'todo') return 'To Do';
    return '';
}

function getActionLabel(status) {
    if (status === 'todo') return 'Mark In Progress';
    if (status === 'in-progress') return 'Mark Completed';
    if (status === 'done') return 'Undo';
    return '';
}

function formatDate(dateStr) {
    if (!dateStr) return 'No date';
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}



function getFilteredTasks() {
    let filtered = [...tasks];

    if (activeTab !== 'all') {
        filtered = filtered.filter(t => t.status === activeTab);
    }


    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(q) ||
            t.desc.toLowerCase().includes(q)
        );
    }

    if (sortMode === 'date') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortMode === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        filtered.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return filtered;
}

function renderTasks() {
    const grid = document.getElementById('taskGrid');
    const filtered = getFilteredTasks();

    // Empty state
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <svg class="h-12 w-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <p class="text-slate-500 font-semibold">No tasks found</p>
                <p class="text-slate-400 text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(task => `
        <div class="task-card bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 relative">
            
            <button class="delete-btn absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                data-id="${task.id}">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <p class="text-sm font-bold text-slate-800 pr-6 ${task.status === 'done' ? 'line-through text-slate-400' : ''}">
                ${task.name}
            </p>

            <p class="text-xs text-slate-500 leading-relaxed">${task.desc}</p>

            <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getPriorityClasses(task.priority)}">
                    ${task.priority}
                </span>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusClasses(task.status)}">
                    ${getStatusLabel(task.status)}
                </span>
            </div>

            <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                <span class="text-xs text-slate-400">${formatDate(task.date)}</span>
                <button class="action-btn text-xs font-semibold text-indigo-600 hover:text-violet-700"
                    data-id="${task.id}">
                    ${getActionLabel(task.status)}
                </button>
            </div>

            </div>
    `).join('');

    updateStats();
}


renderTasks();


//f2 end



//f3 -stae cards
function updateStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const total = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const overdue = tasks.filter(t => {
        if (!t.date || t.status === 'done') return false;
        const due = new Date(t.date);
        due.setHours(0, 0, 0, 0);
        return due < today;
    }).length;

    document.getElementById('statTotalVal').textContent = total;
    document.getElementById('statProgressVal').textContent = inProgress;
    document.getElementById('statDoneVal').textContent = done;
    document.getElementById('statOverdueVal').textContent = overdue;
}

updateStats();

//f3end

//f4 -filer by status tabs
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        activeTab = tab.dataset.tab;

        tabs.forEach(t => {
            t.classList.remove('text-violet-600', 'border-violet-600');
            t.classList.add('text-slate-400', 'border-transparent');
        });

        tab.classList.remove('text-slate-400', 'border-transparent');
        tab.classList.add('text-violet-600', 'border-violet-600');

        renderTasks();
    });
});


//f4 end

//f5 -task dialog model

const modalOverlay = document.querySelector('.modal-overlay');
const addTaskBtn = document.getElementById('addTaskBtn');
const modalCloses = document.querySelectorAll('.modal-close');
const modalSubmit = document.getElementById('modalSubmit');

addTaskBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal();
    });
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.add('hidden');

    document.getElementById('taskName').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskStatus').value = 'in-progress';
    document.getElementById('taskDate').value = '';

    document.getElementById('taskNameError').classList.add('hidden');
}

modalSubmit.addEventListener('click', () => {
    const name = document.getElementById('taskName').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const status = document.getElementById('taskStatus').value;
    const date = document.getElementById('taskDate').value;

    if (name === '') {
        document.getElementById('taskNameError').classList.remove('hidden');
        return;
    }

    document.getElementById('taskNameError').classList.add('hidden');

    const newTask = {
        id: Date.now(),
        name,
        desc,
        priority,
        status,
        date
    };

    tasks.push(newTask);

    closeModal();
    renderTasks();
});



//f5 end

//f6-sorting dropdown

const sortBtn = document.querySelector('.sort-btn');
const sortDropdown = document.querySelector('.sort-dropdown');
const sortOptions = document.querySelectorAll('.sort-option');

sortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sortDropdown.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    sortDropdown.classList.add('hidden');
});

sortOptions.forEach(option => {
    option.addEventListener('click', () => {
        sortMode = option.dataset.sort;
        sortDropdown.classList.add('hidden');
        renderTasks();
    });
});




//f6end


//f7 -search bar

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    renderTasks();
});


//f7 end


//f8

const taskGrid = document.getElementById('taskGrid');

taskGrid.addEventListener('click', (e) => {


    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
        return;
    }

    const actionBtn = e.target.closest('.action-btn');
    if (actionBtn) {
        const id = Number(actionBtn.dataset.id);
        const task = tasks.find(t => t.id === id);

        if (task.status === 'todo') task.status = 'in-progress';
        else if (task.status === 'in-progress') task.status = 'done';
        else if (task.status === 'done') task.status = 'todo';

        renderTasks();
    }

});


//f8 end

//faq

document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const body = btn.nextElementSibling;
        body.classList.toggle('hidden');
    });
});

//faq end