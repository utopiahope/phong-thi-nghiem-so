// ================= MODULE: ĐIỀU HƯỚNG TAB CHÍNH (NAVIGATION) =================

function switchMainTab(tab) {
    if (!loggedInUser && tab !== 'home') {
        alert("Vui lòng đăng nhập để sử dụng tính năng này!");
        openAuthModal('login');
        return;
    }

    ['home', 'roadmap', 'lab', 'practice', 'teacher'].forEach(t => {
        const el = document.getElementById('tab-' + t);
        if (el) el.classList.add('hidden');
    });

    const targetTab = document.getElementById('tab-' + tab);
    if (targetTab) targetTab.classList.remove('hidden');

    let navIds = authRole === 'teacher'
        ? ['nav-home-t', 'nav-roadmap-t', 'nav-lab-t', 'nav-practice-t', 'nav-teacher']
        : ['nav-home', 'nav-roadmap', 'nav-lab', 'nav-practice'];

    navIds.forEach(id => {
        let btn = document.getElementById(id);
        if (btn) {
            if (id === 'nav-teacher') {
                btn.className = "px-4 py-2 rounded-xl font-bold text-xs bg-amber-600 text-white hover:bg-amber-500 transition";
            } else {
                btn.className = "px-4 py-2 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
            }
        }
    });

    let currentActiveBtn = document.getElementById(authRole === 'teacher' ? (tab === 'teacher' ? 'nav-teacher' : 'nav-' + tab + '-t') : 'nav-' + tab);
    if (currentActiveBtn) {
        currentActiveBtn.className = "px-4 py-2 rounded-xl font-bold text-xs nav-active transition";
    }

    if (tab === 'lab') {
        switchLabExp(currentLab);
        startLabAnimation();
    }
    if (tab === 'practice') renderPracticeView();
    if (tab === 'teacher') renderTeacherManagementUI();
}
