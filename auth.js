// ================= MODULE: ĐĂNG NHẬP / ĐĂNG KÝ & PHÂN QUYỀN (AUTH) =================

function openAuthModal(mode) {
    authMode = mode;
    document.getElementById('authModal').classList.remove('hidden');
    document.getElementById('authModalTitle').innerText = mode === 'login' ? "Đăng nhập tài khoản" : "Đăng ký tài khoản mới";
    document.getElementById('authSubmitBtn').innerText = mode === 'login' ? "Đăng nhập ngay 🚀" : "Đăng ký tài khoản ✨";
    document.getElementById('registerNameBox').style.display = mode === 'register' ? 'block' : 'none';
    updateAuthFieldsVisibility();
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function setAuthRole(role) {
    authRole = role;
    document.getElementById('authRoleStudent').className = role === 'student'
        ? "p-3 rounded-xl font-bold bg-cyan-600 text-white text-xs border border-cyan-400 shadow"
        : "p-3 rounded-xl font-bold bg-slate-800 text-slate-300 text-xs border border-transparent hover:bg-slate-700";
    document.getElementById('authRoleTeacher').className = role === 'teacher'
        ? "p-3 rounded-xl font-bold bg-amber-600 text-white text-xs border border-amber-400 shadow"
        : "p-3 rounded-xl font-bold bg-slate-800 text-slate-300 text-xs border border-transparent hover:bg-slate-700";
    document.getElementById('authUserInput').value = role === 'student' ? "hocsinh01" : "giaovien01";
    updateAuthFieldsVisibility();
}

function updateAuthFieldsVisibility() {
    const classField = document.getElementById('classCodeFieldContainer');
    if (authRole === 'teacher') {
        classField.style.display = 'none';
    } else {
        classField.style.display = 'block';
    }
}

function processAuth() {
    const user = document.getElementById('authUserInput').value.trim();
    if (!user) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    if (authMode === 'register') {
        const fullName = document.getElementById('authFullNameInput').value.trim();
        if (!fullName) {
            alert("Vui lòng điền Họ và tên!");
            return;
        }
        if (authRole === 'student') {
            const classCode = document.getElementById('authClassCodeInput').value.trim();
            if (!classCode) {
                alert("Vui lòng điền Mã lớp cho học sinh!");
                return;
            }
        }
    }

    loggedInUser = { name: user, role: authRole };
    closeAuthModal();

    const badge = document.getElementById('userStatusBadge');
    document.getElementById('authButtonsGroup').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');

    if (authRole === 'teacher') {
        document.getElementById('protectedNavStudent').classList.add('hidden');
        document.getElementById('protectedNavTeacher').classList.remove('hidden');
        badge.innerText = `👨‍🏫 GV: ${user}`;
        renderTeacherManagementUI();
        switchMainTab('teacher');
    } else {
        document.getElementById('protectedNavTeacher').classList.add('hidden');
        document.getElementById('protectedNavStudent').classList.remove('hidden');
        badge.innerText = `🎓 HS: ${user}`;
        switchMainTab('home');
    }
    alert(authMode === 'login' ? "🎉 Đăng nhập thành công!" : "🎉 Đăng ký tài khoản thành công!");
}

function handleLogout() {
    loggedInUser = null;
    document.getElementById('protectedNavStudent').classList.add('hidden');
    document.getElementById('protectedNavTeacher').classList.add('hidden');
    document.getElementById('authButtonsGroup').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('userStatusBadge').innerText = "Chưa đăng nhập";
    switchMainTab('home');
}
