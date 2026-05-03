// ===== DATA STORE =====
const defaultUsers = [
  { id: 'u1', username: 'student', password: 'student123', role: 'student', name: 'Alex Johnson' },
  { id: 'u2', username: 'admin', password: 'admin123', role: 'admin', name: 'Dr. Sarah Chen' },
  { id: 'u3', username: 'riya', password: 'riya123', role: 'student', name: 'Riya Patel' },
  { id: 'u4', username: 'arjun', password: 'arjun123', role: 'student', name: 'Arjun Kumar' },
  { id: 'u5', username: 'priya', password: 'priya123', role: 'student', name: 'Priya Sharma' },
];

if (!localStorage.getItem('srb_users')) localStorage.setItem('srb_users', JSON.stringify(defaultUsers));

const DB = {
  get users() { return JSON.parse(localStorage.getItem('srb_users')) || []; },
  set users(v) { localStorage.setItem('srb_users', JSON.stringify(v)); },
  get assignments() { return JSON.parse(localStorage.getItem('srb_assignments') || JSON.stringify(defaultAssignments)); },
  set assignments(v) { localStorage.setItem('srb_assignments', JSON.stringify(v)); },
  get submissions() { return JSON.parse(localStorage.getItem('srb_submissions') || JSON.stringify(defaultSubmissions)); },
  set submissions(v) { localStorage.setItem('srb_submissions', JSON.stringify(v)); },
  get attendance() { return JSON.parse(localStorage.getItem('srb_attendance') || JSON.stringify(defaultAttendance)); },
  set attendance(v) { localStorage.setItem('srb_attendance', JSON.stringify(v)); },
  get queries() { return JSON.parse(localStorage.getItem('srb_queries') || JSON.stringify(defaultQueries)); },
  set queries(v) { localStorage.setItem('srb_queries', JSON.stringify(v)); },
};

const defaultAssignments = [
  { id: 'a1', title: 'Data Structures – Linked Lists', subject: 'Computer Science', description: 'Implement singly and doubly linked lists.', dueDate: daysFromNow(5), priority: 'High', createdBy: 'u2', createdAt: daysFromNow(-3), questionFile: null, questionFileData: null, rubric: [{ id: 'r1', criterion: 'Code Implementation', maxMarks: 25 }, { id: 'r2', criterion: 'Documentation', maxMarks: 15 }, { id: 'r3', criterion: 'Test Cases', maxMarks: 20 }, { id: 'r4', criterion: 'Complexity Analysis', maxMarks: 10 }] },
  { id: 'a2', title: 'Database Design – ER Diagrams', subject: 'Database Systems', description: 'Design a complete ER diagram.', dueDate: daysFromNow(12), priority: 'Medium', createdBy: 'u2', createdAt: daysFromNow(-1), questionFile: null, questionFileData: null, rubric: [{ id: 'r1', criterion: 'Entity Identification', maxMarks: 20 }, { id: 'r2', criterion: 'Relationships', maxMarks: 20 }, { id: 'r3', criterion: 'Normalization', maxMarks: 15 }, { id: 'r4', criterion: 'Presentation', maxMarks: 15 }] },
  { id: 'a3', title: 'OS Concepts – Process Scheduling', subject: 'Operating Systems', description: 'Simulate FCFS, SJF, and Round Robin.', dueDate: daysFromNow(2), priority: 'High', createdBy: 'u2', createdAt: daysFromNow(-5), questionFile: null, questionFileData: null, rubric: [{ id: 'r1', criterion: 'Algorithm Accuracy', maxMarks: 30 }, { id: 'r2', criterion: 'UI/Visualization', maxMarks: 20 }, { id: 'r3', criterion: 'Code Quality', maxMarks: 20 }] },
  { id: 'a4', title: 'Web Dev – React Portfolio', subject: 'Web Technologies', description: 'Build a personal portfolio.', dueDate: daysFromNow(20), priority: 'Low', createdBy: 'u2', createdAt: daysFromNow(-2), questionFile: null, questionFileData: null, rubric: [{ id: 'r1', criterion: 'Design & UI', maxMarks: 25 }, { id: 'r2', criterion: 'React Components', maxMarks: 25 }, { id: 'r3', criterion: 'Content Quality', maxMarks: 20 }] },
];

const defaultSubmissions = [
  { id: 's1', assignmentId: 'a1', studentId: 'u1', fileName: 'linked_list_alex.pdf', fileData: null, submittedAt: daysFromNow(-1), method: 'online', status: 'Verified', grades: { r1: 22, r2: 12, r3: 18, r4: 8 }, feedback: 'Great implementation!' },
  { id: 's2', assignmentId: 'a3', studentId: 'u1', fileName: null, fileData: null, submittedAt: daysFromNow(-2), method: 'in-person', status: 'Verified', grades: { r1: 27, r2: 16, r3: 17 }, feedback: 'Excellent visualization.' },
  { id: 's3', assignmentId: 'a1', studentId: 'u3', fileName: 'riya_linkedlist.pdf', fileData: null, submittedAt: daysFromNow(-1), method: 'online', status: 'Pending', grades: {}, feedback: '' },
  { id: 's4', assignmentId: 'a1', studentId: 'u4', fileName: null, fileData: null, submittedAt: daysFromNow(-1), method: 'in-person', status: 'Verified', grades: { r1: 20, r2: 13, r3: 15, r4: 7 }, feedback: 'Good work.' },
];

const defaultAttendance = [
  { date: daysFromNow(-2), records: { u1: ['P','P','A','P','P','P','A'], u3: ['P','A','A','P','P','P','P'], u4: ['P','P','P','P','A','P','P'], u5: ['A','A','P','P','P','P','P'] } },
  { date: daysFromNow(-1), records: { u1: ['P','P','P','P','P','A','P'], u3: ['P','P','P','A','P','P','P'], u4: ['A','P','P','P','P','P','A'], u5: ['P','P','A','P','P','P','P'] } },
];

const defaultQueries = [
  { id: 'q1', text: 'Can the assignment include Python?', postedAt: daysFromNow(-3), status: 'answered', answer: 'Any language is accepted.' },
  { id: 'q2', text: 'Is there an extension for the OS assignment?', postedAt: daysFromNow(-1), status: 'pending', answer: '' },
];

function daysFromNow(days) { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().split('T')[0]; }

// ===== STATE =====
let currentUser = null;
let selectedRole = 'student';
let currentPage = 'dashboard';
let isRegisterMode = false;

// ===== AUTH =====
function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  if (!isRegisterMode) document.getElementById('login-hint').textContent = `Try: ${role}/${role}123`;
}

function toggleAuthMode(register) {
    isRegisterMode = register;
    const nameGroup = document.getElementById('name-group');
    const title = document.getElementById('auth-title');
    const desc = document.getElementById('auth-desc');
    const btn = document.getElementById('auth-btn');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleBack = document.getElementById('auth-toggle-back');
    const hint = document.getElementById('login-hint');
    const error = document.getElementById('login-error');
    
    error.classList.add('hidden');
    
    if (register) {
        nameGroup.classList.remove('hidden');
        title.textContent = "Create Account";
        desc.textContent = "Register for a new academic workspace";
        btn.textContent = "Sign Up";
        toggleText.classList.add('hidden');
        toggleBack.classList.remove('hidden');
        hint.textContent = "Pick a unique username";
    } else {
        nameGroup.classList.add('hidden');
        title.textContent = "Welcome back";
        desc.textContent = "Sign in to your academic workspace";
        btn.textContent = "Sign In";
        toggleText.classList.remove('hidden');
        toggleBack.classList.add('hidden');
        selectRole(selectedRole);
    }
}

function handleAuth() { isRegisterMode ? handleRegister() : handleLogin(); }

function handleLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const err = document.getElementById('login-error');
  const user = DB.users.find(u => u.username === username && u.password === password && u.role === selectedRole);
  if (!user) { err.textContent = 'Invalid credentials or role selection.'; err.classList.remove('hidden'); return; }
  err.classList.add('hidden');
  currentUser = user;
  localStorage.setItem('srb_session', JSON.stringify(user));
  initApp();
}

function handleRegister() {
    const name = document.getElementById('login-name').value.trim();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const err = document.getElementById('login-error');
    if (!name || !username || !password) { err.textContent = 'Please fill in all fields.'; err.classList.remove('hidden'); return; }
    if (password.length < 4) { err.textContent = 'Password must be at least 4 characters.'; err.classList.remove('hidden'); return; }
    if (DB.users.find(u => u.username === username)) { err.textContent = 'Username already taken.'; err.classList.remove('hidden'); return; }
    const newUser = { id: 'u' + Date.now(), name, username, password, role: selectedRole };
    DB.users = [...DB.users, newUser];
    currentUser = newUser;
    localStorage.setItem('srb_session', JSON.stringify(newUser));
    showToast('Account created!', 'success');
    initApp();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('srb_session');
  document.getElementById('login-screen').classList.add('active');
  document.getElementById('app-screen').classList.remove('active');
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-name').value = '';
  toggleAuthMode(false);
}

function initApp() {
  document.getElementById('login-screen').classList.remove('active');
  document.getElementById('app-screen').classList.add('active');
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  document.getElementById('sidebar-avatar').textContent = initials;
  document.getElementById('sidebar-name').textContent = currentUser.name;
  document.getElementById('sidebar-role').textContent = currentUser.role === 'admin' ? 'Faculty' : 'Student';
  document.getElementById('topbar-avatar').textContent = initials;
  buildNav();
  navigateTo('dashboard');
  const pendingQueries = DB.queries.filter(q => q.status === 'pending').length;
  if (pendingQueries > 0 && currentUser.role === 'admin') document.getElementById('notif-dot').classList.add('show');
}

// ===== NAVIGATION =====
const navConfig = {
  student: [ { id: 'dashboard', label: 'Dashboard', icon: homeIcon() }, { id: 'deadlines', label: 'Deadlines', icon: calendarIcon() }, { id: 'submissions', label: 'My Submissions', icon: uploadIcon() }, { id: 'grades', label: 'My Grades', icon: starIcon() }, { id: 'attendance', label: 'Attendance', icon: checkCircleIcon() }, { id: 'queries', label: 'Queries', icon: chatIcon() } ],
  admin: [ { id: 'dashboard', label: 'Dashboard', icon: homeIcon() }, { id: 'manage-assignments', label: 'Assignments', icon: calendarIcon() }, { id: 'grade-submissions', label: 'Grade Submissions', icon: starIcon() }, { id: 'attendance-admin', label: 'Mark Attendance', icon: checkCircleIcon() }, { id: 'queries-admin', label: 'Student Queries', icon: chatIcon(), badge: true } ],
};

function buildNav() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = navConfig[currentUser.role].map(item => {
    const pending = item.badge ? DB.queries.filter(q => q.status === 'pending').length : 0;
    return `<button class="nav-item" data-page="${item.id}" onclick="navigateTo('${item.id}')">${item.icon}<span>${item.label}</span>${pending > 0 ? `<span class="nav-badge">${pending}</span>` : ''}</button>`;
  }).join('');
}

function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => { el.classList.toggle('active', el.dataset.page === page); });
  const titles = { dashboard: ['Dashboard', 'Home'], deadlines: ['Deadlines', 'Assignments'], submissions: ['My Submissions', 'Submissions'], grades: ['My Grades', 'Grades'], attendance: ['Attendance', 'Attendance'], queries: ['Queries', 'Queries'], 'manage-assignments': ['Manage Assignments', 'Assignments'], 'grade-submissions': ['Grade Submissions', 'Grading'], 'attendance-admin': ['Mark Attendance', 'Attendance'], 'queries-admin': ['Student Queries', 'Queries'] };
  const [title, crumb] = titles[page] || ['Dashboard', 'Home'];
  document.getElementById('page-title').textContent = title;
  document.getElementById('breadcrumb').textContent = crumb;
  const area = document.getElementById('content-area'); area.innerHTML = '';
  const pages = { dashboard: renderDashboard, deadlines: renderDeadlines, submissions: renderSubmissions, grades: renderGrades, attendance: renderAttendance, queries: renderQueries, 'manage-assignments': renderManageAssignments, 'grade-submissions': renderGradeSubmissions, 'attendance-admin': renderAttendanceAdmin, 'queries-admin': renderQueriesAdmin };
  if (pages[page]) pages[page]();
  closeSidebar();
}

// ===== DASHBOARD =====
function renderDashboard() { const area = document.getElementById('content-area'); currentUser.role === 'student' ? renderStudentDashboard(area) : renderAdminDashboard(area); }
function renderStudentDashboard(area) {
  const mySubmissions = DB.submissions.filter(s => s.studentId === currentUser.id);
  const now = new Date();
  const upcoming = DB.assignments.filter(a => new Date(a.dueDate) >= now).sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
  area.innerHTML = `<div class="welcome-banner mb-24"><h2>Good ${getGreeting()}, ${currentUser.name.split(' ')[0]}!</h2><p>${upcoming.length} upcoming deadline${upcoming.length !== 1 ? 's' : ''}</p></div><div class="grid-4 mb-24"><div class="stat-card"><div class="stat-info"><div class="stat-value">${DB.assignments.length}</div><div class="stat-label">Total Assignments</div></div></div><div class="stat-card"><div class="stat-info"><div class="stat-value">${mySubmissions.length}</div><div class="stat-label">Submitted</div></div></div></div><div class="grid-2"><div><div class="section-header"><h3 class="section-title">Upcoming Deadlines</h3></div>${upcoming.slice(0,3).map(a => `<div class="deadline-card" onclick="viewAssignment('${a.id}')"><div class="deadline-title">${a.title}</div><div class="text-xs text-dim">${a.subject}</div></div>`).join('')}</div></div>`;
}
function renderAdminDashboard(area) {
  const allStudents = DB.users.filter(u => u.role === 'student');
  const pendingQ = DB.queries.filter(q => q.status === 'pending').length;
  area.innerHTML = `<div class="welcome-banner mb-24"><h2>Welcome, ${currentUser.name.split(' ')[0]}!</h2><p>${allStudents.length} students · ${DB.assignments.length} active assignments</p></div><div class="grid-4 mb-24"><div class="stat-card"><div class="stat-info"><div class="stat-value">${allStudents.length}</div><div class="stat-label">Students</div></div></div><div class="stat-card"><div class="stat-info"><div class="stat-value">${DB.assignments.length}</div><div class="stat-label">Assignments</div></div></div><div class="stat-card"><div class="stat-info"><div class="stat-value">${pendingQ}</div><div class="stat-label">Pending Queries</div></div></div></div>`;
}

// ===== DEADLINES & SUBMISSIONS =====
function renderDeadlines() { const area = document.getElementById('content-area'); const now = new Date(); const active = DB.assignments.filter(a => new Date(a.dueDate) >= now).sort((a,b) => new Date(a.dueDate)-new Date(b.dueDate)); const mySubmissions = DB.submissions.filter(s => s.studentId === currentUser.id); area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">Active Deadlines</h3></div><div class="grid-2 mb-24">${active.length ? active.map(a => `<div class="deadline-card" onclick="viewAssignment('${a.id}')"><div class="deadline-title">${a.title}</div><div class="text-xs text-dim">${a.subject}</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn-secondary btn-sm" onclick="event.stopPropagation();viewAssignment('${a.id}')">View</button>${!mySubmissions.find(s=>s.assignmentId===a.id) ? `<button class="btn-primary btn-sm" onclick="event.stopPropagation();openSubmitModal('${a.id}')">Submit</button>` : ''}</div></div>`).join('') : emptyStateHTML('No active deadlines')}</div>`; }
function viewAssignment(id) { const a = DB.assignments.find(x => x.id === id); if (!a) return; openModal(`${a.title}`, `<p style="margin-bottom:20px;color:var(--text-2)">${a.description}</p><div class="divider"></div><h4 style="font-family:var(--font-display);margin-bottom:12px">Grading Rubric</h4>${a.rubric.map(r => `<div class="rubric-row"><div><div class="fw-bold text-sm">${r.criterion}</div></div><div class="text-sm text-accent fw-bold">${r.maxMarks} pts</div></div>`).join('')}${currentUser.role === 'student' ? `<div class="modal-actions"><button class="btn-primary" onclick="closeModal();openSubmitModal('${id}')">Submit Assignment</button></div>` : ''}`); }
function openSubmitModal(assignmentId) { const a = DB.assignments.find(x => x.id === assignmentId); if (!a) return; openModal('Submit Assignment', `<h4 class="fw-display mb-12">${a.title}</h4><div class="form-group"><label>Submission Method</label><select class="form-input" id="sub-method" onchange="toggleUpload()"><option value="online">Online Upload</option><option value="in-person">In-Person</option></select></div><div id="upload-section"><div class="form-group"><label>Upload File</label><div class="upload-zone" onclick="document.getElementById('file-input').click()"><svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 8px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg><div>Click to upload</div><div id="file-name" style="margin-top:8px;font-size:0.8rem;color:var(--accent)"></div></div><input type="file" id="file-input" class="hidden" onchange="showFileName()"/></div></div><div id="inperson-section" class="hidden"><div class="card" style="background:var(--amber-light);border-color:var(--amber)"><p class="text-sm" style="color:var(--amber)">⚠️ In-Person submission will be marked manually.</p></div></div><div class="modal-actions"><button class="btn-secondary" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="submitAssignment('${assignmentId}')">Submit</button></div>`); }
function toggleUpload() { const method = document.getElementById('sub-method').value; document.getElementById('upload-section').classList.toggle('hidden', method === 'in-person'); document.getElementById('inperson-section').classList.toggle('hidden', method === 'online'); }
function showFileName() { const f = document.getElementById('file-input').files[0]; document.getElementById('file-name').textContent = f ? `Selected: ${f.name}` : ''; }
function submitAssignment(assignmentId) { const method = document.getElementById('sub-method').value; const existing = DB.submissions.find(s => s.assignmentId === assignmentId && s.studentId === currentUser.id); if (existing) { showToast('Already submitted!', 'info'); closeModal(); return; } if (method === 'online') { const f = document.getElementById('file-input').files[0]; if (!f) { showToast('Please select a file.', 'error'); return; } const reader = new FileReader(); reader.onload = function(e) { try { DB.submissions = [...DB.submissions, { id: 's' + Date.now(), assignmentId, studentId: currentUser.id, fileName: f.name, fileData: e.target.result, submittedAt: new Date().toISOString().split('T')[0], method, status: 'Pending', grades: {}, feedback: '' }]; closeModal(); showToast('Submitted!', 'success'); navigateTo(currentPage); } catch (err) { showToast('Storage full!', 'error'); } }; reader.readAsDataURL(f); } else { DB.submissions = [...DB.submissions, { id: 's' + Date.now(), assignmentId, studentId: currentUser.id, fileName: null, fileData: null, submittedAt: new Date().toISOString().split('T')[0], method, status: 'Pending', grades: {}, feedback: '' }]; closeModal(); showToast('Submission recorded!', 'success'); navigateTo(currentPage); } }
function renderSubmissions() { const area = document.getElementById('content-area'); const mySubmissions = DB.submissions.filter(s => s.studentId === currentUser.id); area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">My Submissions</h3></div>${mySubmissions.length === 0 ? emptyStateHTML('No submissions yet') : `<div style="display:flex;flex-direction:column;gap:12px">${mySubmissions.map(sub => { const a = DB.assignments.find(x => x.id === sub.assignmentId); const link = sub.fileData ? `<a href="${sub.fileData}" download="${sub.fileName}" class="file-attachment">📥 ${sub.fileName}</a>` : ''; return `<div class="card"><div style="display:flex;justify-content:space-between"><div><div class="fw-bold">${a?.title}</div><div class="text-xs text-dim">${formatDate(sub.submittedAt)}</div></div><span class="badge ${sub.status === 'Verified' ? 'badge-green' : 'badge-amber'}">${sub.status}</span></div>${sub.fileName ? `<div class="mt-12">${link}</div>` : ''}</div>`; }).join('')}</div>`}`; }
function renderGrades() { const area = document.getElementById('content-area'); const mySubs = DB.submissions.filter(s => s.studentId === currentUser.id && Object.keys(s.grades).length > 0); area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">My Grades</h3></div>${mySubs.length === 0 ? emptyStateHTML('No grades yet') : `<div style="display:flex;flex-direction:column;gap:16px">${mySubs.map(sub => { const a = DB.assignments.find(x => x.id === sub.assignmentId); const total = Object.values(sub.grades).reduce((s,v) => s+v, 0); const max = a.rubric.reduce((s,r) => s+r.maxMarks, 0); return `<div class="card"><div class="card-header"><div><div class="card-title">${a?.title}</div></div><div class="fw-display text-accent" style="font-size:1.5rem">${total}/${max}</div></div>${sub.feedback ? `<div class="query-answer mt-12">💬 ${sub.feedback}</div>` : ''}</div>`; }).join('')}</div>`}`; }
function renderAttendance() { const area = document.getElementById('content-area'); const records = DB.attendance; let totalP = 0; records.forEach(day => { const rec = day.records[currentUser.id] || []; rec.forEach(p => { if (p === 'P') totalP++; }); }); const total = records.length * 7; const pct = total > 0 ? Math.round((totalP/total)*100) : 100; area.innerHTML = `<div class="grid-3 mb-24"><div class="stat-card"><div class="stat-info"><div class="stat-value">${totalP}</div><div class="stat-label">Present</div></div></div><div class="stat-card"><div class="stat-info"><div class="stat-value">${total-totalP}</div><div class="stat-label">Absent</div></div></div></div>`; }
function renderQueries() { const area = document.getElementById('content-area'); area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">Academic Queries</h3><button class="btn-primary" onclick="openQueryModal()">+ New Query</button></div>${DB.queries.slice().reverse().map(q => `<div class="query-card ${q.status}"><p class="query-text">${q.text}</p><span class="badge ${q.status === 'answered' ? 'badge-green' : 'badge-amber'}">${q.status}</span></div>`).join('')}`; }
function openQueryModal() { openModal('Post a Query', `<div class="form-group"><textarea class="form-input" id="query-text" rows="4"></textarea></div><div class="modal-actions"><button class="btn-secondary" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="submitQuery()">Post</button></div>`); }
function submitQuery() { const text = document.getElementById('query-text').value.trim(); if (!text) return; DB.queries = [...DB.queries, { id: 'q' + Date.now(), text, postedAt: new Date().toISOString().split('T')[0], status: 'pending', answer: '' }]; closeModal(); showToast('Query posted!', 'success'); navigateTo('queries'); }
function renderManageAssignments() { const area = document.getElementById('content-area'); area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">Manage Assignments</h3><button class="btn-primary" onclick="openCreateAssignment()">+ Create</button></div><div style="display:flex;flex-direction:column;gap:12px">${DB.assignments.map(a => `<div class="card"><div style="display:flex;justify-content:space-between"><div><div class="fw-bold">${a.title}</div><div class="text-xs text-dim">${a.subject}</div></div><div><button class="btn-secondary btn-sm" onclick="viewAssignment('${a.id}')">View</button> <button class="btn-danger btn-sm" onclick="deleteAssignment('${a.id}')">Delete</button></div></div></div>`).join('')}</div>`; }
function openCreateAssignment() { openModal('Create Assignment', `<div class="form-group"><label>Title</label><input class="form-input" id="ca-title"/></div><div class="form-group"><label>Subject</label><input class="form-input" id="ca-subject"/></div><div class="form-group"><label>Description</label><textarea class="form-input" id="ca-desc" rows="2"></textarea></div><div class="grid-2"><div class="form-group"><label>Due Date</label><input type="date" class="form-input" id="ca-due"/></div><div class="form-group"><label>Priority</label><select class="form-input" id="ca-priority"><option>High</option><option>Medium</option></select></div></div><div class="modal-actions"><button class="btn-secondary" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="createAssignment()">Create</button></div>`, true); document.getElementById('ca-due').min = new Date().toISOString().split('T')[0]; }
function createAssignment() { const title = document.getElementById('ca-title').value.trim(); const subject = document.getElementById('ca-subject').value.trim(); const desc = document.getElementById('ca-desc').value.trim(); const due = document.getElementById('ca-due').value; const priority = document.getElementById('ca-priority').value; if (!title || !subject || !due) { showToast('Fill required fields', 'error'); return; } DB.assignments = [...DB.assignments, { id: 'a' + Date.now(), title, subject, description:desc, dueDate:due, priority, createdBy:currentUser.id, createdAt:new Date().toISOString().split('T')[0], rubric:[{id:'r1', criterion:'General', maxMarks:100}] }]; closeModal(); showToast('Created!', 'success'); navigateTo('manage-assignments'); }
function deleteAssignment(id) { if(confirm('Delete?')) { DB.assignments = DB.assignments.filter(a => a.id !== id); showToast('Deleted', 'info'); navigateTo('manage-assignments'); } }

// ===== GRADE SUBMISSIONS (ADMIN) =====
function renderGradeSubmissions() { 
  const area = document.getElementById('content-area'); 
  const subs = DB.submissions; 
  area.innerHTML = `
    <div class="section-header mb-20">
        <h3 class="section-title">Grade Submissions</h3>
        <button class="btn-success btn-sm" onclick="openManualSubmissionModal()">Record In-Person Submission</button>
    </div>
    ${subs.length === 0 ? emptyStateHTML('No submissions') : subs.map(s => { 
        const u = DB.users.find(u => u.id === s.studentId); 
        const a = DB.assignments.find(x => x.id === s.assignmentId); 
        const graded = Object.keys(s.grades).length > 0; 
        const link = s.fileData ? `<a href="${s.fileData}" download="${s.fileName}" class="file-attachment">📥 View</a>` : ''; 
        return `<div class="card mb-12">
            <div style="display:flex;justify-content:space-between;align-items:center">
                <div>
                    <div class="fw-bold">${u?.name || 'Unknown'}</div>
                    <div class="text-xs text-dim">${a?.title} <span class="badge badge-${s.method === 'online' ? 'blue' : 'purple'}">${s.method}</span></div>
                </div>
                <div>${graded ? '<span class="badge badge-green">Graded</span> ' : ''}<button class="btn-primary btn-sm" onclick="openGradeModal('${s.id}')">${graded ? 'Edit' : 'Grade'}</button></div>
            </div>
            ${s.fileName ? `<div class="mt-12">${link}</div>` : ''}
        </div>`; 
    }).join('')}`; 
}

function openManualSubmissionModal() {
    const students = DB.users.filter(u => u.role === 'student');
    const assignments = DB.assignments;
    
    openModal('Record In-Person Submission', `
        <p class="text-sm text-dim mb-16">Use this to manually record a submission for a student who handed in work physically.</p>
        <div class="form-group">
            <label>Student</label>
            <select class="form-input" id="manual-student">
                ${students.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Assignment</label>
            <select class="form-input" id="manual-assignment">
                ${assignments.map(a => `<option value="${a.id}">${a.title}</option>`).join('')}
            </select>
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn-primary" onclick="createManualSubmission()">Create & Grade</button>
        </div>
    `);
}

function createManualSubmission() {
    const studentId = document.getElementById('manual-student').value;
    const assignmentId = document.getElementById('manual-assignment').value;
    
    // Check if already exists
    const exists = DB.submissions.find(s => s.studentId === studentId && s.assignmentId === assignmentId);
    if (exists) {
        showToast('Submission already exists for this student.', 'error');
        closeModal();
        openGradeModal(exists.id);
        return;
    }

    const newSub = {
        id: 's' + Date.now(),
        assignmentId,
        studentId,
        fileName: null,
        fileData: null,
        submittedAt: new Date().toISOString().split('T')[0],
        method: 'in-person',
        status: 'Pending',
        grades: {},
        feedback: ''
    };
    
    DB.submissions = [...DB.submissions, newSub];
    closeModal();
    showToast('In-Person submission recorded!', 'success');
    openGradeModal(newSub.id);
    navigateTo('grade-submissions');
}

function openGradeModal(id) { 
    const sub = DB.submissions.find(s => s.id === id); 
    const a = DB.assignments.find(x => x.id === sub.assignmentId); 
    const student = DB.users.find(u => u.id === sub.studentId); 
    
    openModal(`Grade – ${student.name}`, `
        <div class="chip mb-16">${a.title}</div>
        ${sub.method === 'in-person' ? '<div class="badge badge-purple mb-16">In-Person Submission</div>' : ''}
        ${sub.fileData ? `<a href="${sub.fileData}" download="${sub.fileName}" class="file-attachment mb-16">📥 Download File</a>` : ''}
        
        <div class="form-group"><label>Score (Max ${a.rubric[0].maxMarks})</label><input type="number" class="form-input" id="grade-score" min="0" max="${a.rubric[0].maxMarks}" value="${sub.grades['r1'] || ''}"/></div>
        <div class="form-group"><label>Feedback</label><textarea class="form-input" id="grade-feedback" rows="2">${sub.feedback || ''}</textarea></div>
        <div class="modal-actions"><button class="btn-secondary" onclick="closeModal()">Cancel</button><button class="btn-success" onclick="saveGrade('${id}')">Save</button></div>
    `); 
}

function saveGrade(id) { 
    const score = parseInt(document.getElementById('grade-score').value); 
    const fb = document.getElementById('grade-feedback').value; 
    const sub = DB.submissions.find(s => s.id === id); 
    const a = DB.assignments.find(x => x.id === sub.assignmentId); 
    sub.grades = { r1: Math.min(score, a.rubric[0].maxMarks) }; 
    sub.feedback = fb; 
    sub.status = 'Verified'; 
    DB.submissions = DB.submissions; 
    closeModal(); showToast('Saved!', 'success'); navigateTo('grade-submissions'); 
}

function renderAttendanceAdmin() { const area = document.getElementById('content-area'); const today = new Date().toISOString().split('T')[0]; area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">Mark Attendance</h3></div><div class="card mb-20"><div class="form-group" style="max-width:220px"><label>Date</label><input type="date" class="form-input" id="att-date" value="${today}" max="${today}" onchange="loadAtt()"/></div></div><div class="card"><table id="att-table" style="width:100%"><thead><tr><th style="text-align:left;padding:10px">Student</th>${['P1','P2','P3','P4','P5','P6','P7'].map(p=>`<th style="text-align:center">${p}</th>`).join('')}</tr></thead><tbody id="att-tbody"></tbody></table><button class="btn-primary btn-sm mt-16" onclick="saveAtt()">Save</button></div>`; loadAtt(); }
function loadAtt() { const date = document.getElementById('att-date').value; const students = DB.users.filter(u => u.role === 'student'); const existing = DB.attendance.find(d => d.date === date); const tbody = document.getElementById('att-tbody'); tbody.innerHTML = students.map(s => { const rec = existing?.records[s.id] || Array(7).fill(''); return `<tr><td style="padding:10px"><div class="fw-bold text-sm">${s.name}</div></td>${Array.from({length:7}, (_,i) => `<td style="text-align:center"><button class="att-btn ${rec[i]==='P'?'present':''}" onclick="markP(this)">P</button> <button class="att-btn ${rec[i]==='A'?'absent':''}" onclick="markA(this)">A</button></td>`).join('')}</tr>`; }).join(''); }
function markP(b) { const c = b.closest('td'); c.querySelectorAll('.att-btn').forEach(x => x.classList.remove('present','absent')); b.classList.add('present'); }
function markA(b) { const c = b.closest('td'); c.querySelectorAll('.att-btn').forEach(x => x.classList.remove('present','absent')); b.classList.add('absent'); }
function saveAtt() { const date = document.getElementById('att-date').value; const students = DB.users.filter(u => u.role === 'student'); const records = {}; const rows = document.getElementById('att-tbody').rows; Array.from(rows).forEach((row, i) => { const periods = []; for(let p=1; p<=7; p++) { const btns = row.cells[p].querySelectorAll('.att-btn'); let s = 'A'; if(btns[0].classList.contains('present')) s='P'; periods.push(s); } records[students[i].id] = periods; }); const att = DB.attendance; const idx = att.findIndex(d => d.date === date); if(idx >= 0) att[idx].records = records; else att.push({date, records}); DB.attendance = att; showToast('Saved!', 'success'); }
function renderQueriesAdmin() { const area = document.getElementById('content-area'); area.innerHTML = `<div class="section-header mb-20"><h3 class="section-title">Student Queries</h3></div>${DB.queries.slice().reverse().map(q => `<div class="query-card ${q.status}"><p class="query-text">${q.text}</p>${q.status === 'pending' ? `<textarea class="form-input" id="ans-${q.id}" rows="2" placeholder="Type answer..."></textarea><button class="btn-success btn-sm mt-8" onclick="ansQ('${q.id}')">Answer</button>` : `<div class="query-answer">Answered: ${q.answer}</div>`}</div>`).join('')}`; }
function ansQ(id) { const ans = document.getElementById(`ans-${id}`).value.trim(); if(!ans) return; const q = DB.queries.find(x => x.id === id); q.answer = ans; q.status = 'answered'; DB.queries = DB.queries; showToast('Answered!', 'success'); navigateTo('queries-admin'); }

// ===== UTILS =====
function openModal(t, b, w) { document.getElementById('modal-title').textContent = t; document.getElementById('modal-body').innerHTML = b; document.getElementById('modal-overlay').classList.remove('hidden'); document.getElementById('modal-content').classList.toggle('wide', w); }
function closeModal(e) { if(e && e.target !== document.getElementById('modal-overlay')) return; document.getElementById('modal-overlay').classList.add('hidden'); }
function showToast(m, t) { const c = document.getElementById('toast-container'); const el = document.createElement('div'); el.className = `toast ${t}`; el.innerHTML = `<span>${m}</span>`; c.appendChild(el); setTimeout(() => el.remove(), 3000); }
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); document.getElementById('sidebar-overlay').classList.toggle('visible'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebar-overlay').classList.remove('visible'); }
function toggleTheme() { const isDark = document.documentElement.getAttribute('data-theme') === 'dark'; document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark'); document.getElementById('theme-icon').textContent = isDark ? '🌙' : '☀️'; }
function toggleNotif() { showToast('No new notifications.', 'info'); }
function formatDate(d) { if(!d) return '–'; return new Date(d+'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
function daysLeft(d) { const n = new Date(); n.setHours(0,0,0,0); const x = new Date(d+'T00:00:00'); return Math.ceil((x-n)/86400000); }
function getDaysClass(d) { const l = daysLeft(d); if(l<=3) return 'days-urgent'; if(l<=7) return 'days-soon'; return 'days-ok'; }
function getGreeting() { const h = new Date().getHours(); if(h<12) return 'morning'; if(h<17) return 'afternoon'; return 'evening'; }
function emptyStateHTML(t, d) { return `<div class="empty-state"><h3>${t}</h3>${d?`<p>${d}</p>`:''}</div>`; }
function homeIcon() { return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`; }
function calendarIcon() { return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/></svg>`; }
function uploadIcon() { return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>`; }
function starIcon() { return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`; }
function checkCircleIcon() { return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`; }
function chatIcon() { return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`; }
window.addEventListener('DOMContentLoaded', () => { selectRole('student'); const s = localStorage.getItem('srb_session'); if (s) { try { currentUser = JSON.parse(s); initApp(); } catch(e) { localStorage.removeItem('srb_session'); } } });
