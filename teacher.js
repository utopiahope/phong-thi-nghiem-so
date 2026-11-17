// ================= MODULE: QUẢN LÝ GIÁO VIÊN (TEACHER) =================

function createNewClass() {
    const className = document.getElementById('newClassNameInput').value.trim();
    if (!className) {
        alert("Vui lòng nhập tên/mã lớp mới!");
        return;
    }
    if (teacherClasses.includes(className)) {
        alert("Lớp này đã tồn tại!");
        return;
    }
    teacherClasses.push(className);
    document.getElementById('newClassNameInput').value = "";
    renderTeacherManagementUI();
    alert(`🎉 Đã tạo thành công lớp ${className}!`);
}

function renderTeacherManagementUI() {
    let classListContainer = document.getElementById('classListContainer');
    if (!classListContainer) return;
    let html = "";
    teacherClasses.forEach(cls => {
        let activeStyle = activeSelectedClass === cls
            ? "bg-amber-600 text-white font-bold border-amber-400"
            : "bg-slate-800 text-cyan-300 border-slate-700 hover:bg-slate-700";
        html += `<button onclick="filterProgressByClass('${cls}')" class="px-3 py-1.5 rounded-lg text-xs border ${activeStyle} transition shadow">📌 ${cls}</button>`;
    });
    classListContainer.innerHTML = html;
    renderTeacherProgressTable();
}

function filterProgressByClass(cls) {
    activeSelectedClass = cls;
    document.getElementById('activeClassLabel').innerText = `Lớp ${cls}`;

    let selectorBox = document.getElementById('classExamSelectorBox');
    let examsHtml = `<p class="text-xs font-semibold text-slate-300">Danh sách đề của lớp ${cls}:</p>`;
    teacherAssignedExams.forEach(ex => {
        examsHtml += `<div class="p-2 bg-slate-900 rounded border border-slate-700 text-xs text-amber-300 flex justify-between items-center">
            <span>📄 ${ex.title}</span>
            <span class="text-[10px] text-cyan-400">Đã giao</span>
        </div>`;
    });
    selectorBox.innerHTML = examsHtml;
    renderTeacherManagementUI();
}

function resetClassFilter() {
    activeSelectedClass = null;
    document.getElementById('activeClassLabel').innerText = "Tất cả lớp";
    document.getElementById('classExamSelectorBox').innerHTML = `<p class="text-xs text-slate-400 italic">💡 Vui lòng bấm vào mã lớp bên cột trái để xem danh sách đề và bảng tiến độ.</p>`;
    renderTeacherManagementUI();
}

function renderTeacherProgressTable() {
    let tbody = document.getElementById('teacherProgressTableBody');
    if (!tbody) return;
    let filtered = studentProgressData;
    if (activeSelectedClass) {
        filtered = studentProgressData.filter(d => d.classCode === activeSelectedClass);
    }
    let html = "";
    if (filtered.length === 0) {
        html = `<tr><td colspan="5" class="p-4 text-center text-slate-400 italic">Chưa có dữ liệu học sinh làm bài trong lớp này.</td></tr>`;
    } else {
        filtered.forEach(row => {
            html += `
                <tr class="hover:bg-slate-800/80 transition">
                    <td class="p-3 border-b border-slate-800 font-semibold text-cyan-200">${row.name}</td>
                    <td class="p-3 border-b border-slate-800 font-bold text-amber-400">${row.classCode}</td>
                    <td class="p-3 border-b border-slate-800 text-slate-300">${row.examTitle}</td>
                    <td class="p-3 border-b border-slate-800 text-emerald-400 font-bold">${row.score} điểm</td>
                    <td class="p-3 border-b border-slate-800 text-slate-400">${row.time}</td>
                </tr>
            `;
        });
    }
    tbody.innerHTML = html;
}

function teacherUploadExam() {
    const title = document.getElementById('teacherExamTitle').value.trim();
    const msg = document.getElementById('teacherUploadMsg');
    if (!title) {
        alert("Vui lòng nhập tên đề kiểm tra!");
        return;
    }
    teacherAssignedExams.push({
        id: 't_ex_' + Date.now(),
        title: title,
        date: '12/11/2026',
        questions: [
            { q: "Câu 1: Dao động điều hòa có li độ cực đại gọi là gì?", options: ["A. Tần số", "B. Biên độ", "C. Chu kỳ", "D. Pha ban đầu"], correct: 1, explain: "Li độ cực đại chính là Biên độ $A$." }
        ]
    });
    msg.classList.remove('hidden');
    msg.innerText = `🎉 Đã tải lên và xuất bản đề "${title}" thành công cho học sinh!`;
    document.getElementById('teacherExamTitle').value = "";
    setTimeout(() => msg.classList.add('hidden'), 5000);
    renderTeacherManagementUI();
}
