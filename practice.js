// ================= MODULE: BÀI TẬP & TỰ LUYỆN (PRACTICE) =================

function switchPracticeSub(mode) {
    practiceSubMode = mode;
    selectedSelfLevel = null;
    activeSelfExamId = null;
    activeTeacherExamId = null;
    document.getElementById('subBtnTeacher').className = mode === 'teacher'
        ? "px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white shadow transition"
        : "px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
    document.getElementById('subBtnSelf').className = mode === 'self'
        ? "px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-600 text-white shadow transition"
        : "px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
    renderPracticeView();
}

// Tính toán thống kê tiến độ và lỗi sai cho một mức độ (hoặc toàn bộ nếu level = null)
function getSelfPracticeStats(level = null) {
    const levelsToCheck = level ? [level] : ['easy', 'medium', 'hard'];
    let currentSetTotal = 0;
    let currentSetCompleted = 0;

    levelsToCheck.forEach(lvl => {
        const exams = selfPracticeExams[lvl] || [];
        currentSetTotal += exams.length;
        exams.forEach(ex => {
            if (studentExamSubmitted[ex.id]) {
                currentSetCompleted++;
            }
        });
    });

    // Lấy danh sách kết quả đã nộp thuộc phạm vi lọc
    const allResults = Object.values(studentExamResults).filter(r => !level || r.level === level);
    allResults.sort((a, b) => b.timestamp - a.timestamp);

    let totalScoreSum = 0;
    allResults.forEach(r => { totalScoreSum += parseFloat(r.score); });
    const avgScore = allResults.length > 0 ? (totalScoreSum / allResults.length).toFixed(2) : null;

    // Thống kê kiến thức hay sai
    const topicStats = {};
    Object.keys(KNOWLEDGE_TOPICS).forEach(tKey => {
        topicStats[tKey] = {
            ...KNOWLEDGE_TOPICS[tKey],
            wrongCount: 0,
            totalEncountered: 0,
            failedExams: new Set()
        };
    });

    allResults.forEach(res => {
        if (res.topicBreakdown) {
            Object.keys(res.topicBreakdown).forEach(tKey => {
                if (topicStats[tKey]) {
                    topicStats[tKey].wrongCount += res.topicBreakdown[tKey].wrong;
                    topicStats[tKey].totalEncountered += res.topicBreakdown[tKey].total;
                    if (res.topicBreakdown[tKey].wrong > 0) {
                        topicStats[tKey].failedExams.add(`Đề ${res.examNum} (Đợt #${res.batchNum})`);
                    }
                }
            });
        }
    });

    const weakTopics = Object.values(topicStats)
        .filter(t => t.wrongCount > 0)
        .map(t => ({
            ...t,
            wrongRate: t.totalEncountered > 0 ? Math.round((t.wrongCount / t.totalEncountered) * 100) : 0,
            failedExamsList: Array.from(t.failedExams)
        }))
        .sort((a, b) => b.wrongCount - a.wrongCount || b.wrongRate - a.wrongRate);

    const progressPercent = currentSetTotal > 0 ? Math.round((currentSetCompleted / currentSetTotal) * 100) : 0;

    return {
        currentSetTotal,
        currentSetCompleted,
        progressPercent,
        allResults,
        avgScore,
        weakTopics
    };
}

// Điều hướng sang đúng bài thí nghiệm & lý thuyết để học sinh ôn lại kiến thức bị hổng
function reviewWeakTopicInLab(labExp) {
    switchMainTab('lab');
    switchLabExp(labExp);
    const theoryEl = document.getElementById('labTheoryTitle');
    if (theoryEl) {
        theoryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Render khối Bảng Tiến Độ, Thống Kê Điểm Từng Đề & Kiến Thức Hay Sai
function renderSelfAnalyticsDashboard(level = null) {
    const stats = getSelfPracticeStats(level);
    const levelLabel = !level
        ? 'Tất cả mức độ (60 đề hiện hành)'
        : (level === 'easy' ? 'Mức độ Dễ' : (level === 'medium' ? 'Mức độ Trung bình' : 'Mức độ Nâng cao'));
    const currentBatch = level ? selfExamBatch[level] : null;

    let html = `
        <div class="p-5 bg-slate-950/90 rounded-2xl border border-cyan-500/40 space-y-5 shadow-xl">
            <!-- Header & Thanh tiến độ -->
            <div class="space-y-3">
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <div>
                        <span class="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700">
                            📊 Theo dõi tiến độ ${currentBatch ? `• Bộ đề Đợt #${currentBatch}` : ''}
                        </span>
                        <h4 class="text-base font-extrabold text-white mt-1.5">
                            Tiến độ hoàn thành (${levelLabel}): <span class="text-cyan-400">${stats.currentSetCompleted} / ${stats.currentSetTotal} đề</span> (${stats.progressPercent}%)
                        </h4>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        ${stats.avgScore !== null ? `
                            <div class="px-3.5 py-1.5 bg-emerald-950/90 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-300">
                                ⭐ Điểm TB: <span class="text-white text-sm">${stats.avgScore}</span> / 10
                            </div>
                        ` : ''}
                        ${level && stats.currentSetCompleted < 20 ? `
                            <button onclick="simulateCompleteAll20Exams('${level}')" class="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 rounded-xl text-[11px] font-bold transition" title="Tự động giải và nộp cả 20 đề để kiểm tra nhanh thống kê & tính năng tạo bộ đề mới">
                                ⚡ Làm nhanh 20/20 đề (Demo)
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- Thanh Progress Bar -->
                <div class="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                    <div class="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-black text-slate-950"
                         style="width: ${Math.max(stats.progressPercent, stats.currentSetCompleted > 0 ? 6 : 0)}%">
                        ${stats.progressPercent >= 10 ? `${stats.progressPercent}%` : ''}
                    </div>
                </div>
            </div>
    `;

    // Hộp mở khóa tạo bộ 20 đề mới hoàn toàn khi đã hoàn thành đủ 20/20 đề của mức độ
    if (level && stats.currentSetCompleted >= 20) {
        html += `
            <div class="p-4 bg-gradient-to-r from-amber-950/90 via-emerald-950/90 to-cyan-950/90 rounded-2xl border-2 border-amber-400/70 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <span class="text-xl">🏆</span>
                        <h5 class="font-extrabold text-amber-300 text-sm md:text-base">
                            Chúc mừng! Bạn đã hoàn thành trọn vẹn 20/20 đề của Đợt #${currentBatch}!
                        </h5>
                    </div>
                    <p class="text-xs text-slate-200">
                        Bạn có thể tạo ngay <b>1 bộ 20 đề mới hoàn toàn (Đợt #${currentBatch + 1})</b> với các câu hỏi mới và bộ thông số tính toán khác biệt hoàn toàn với các mã đề trước để tiếp tục rèn luyện.
                    </p>
                </div>
                <button onclick="generateNewExamBatch('${level}')" class="px-5 py-3 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-950 font-black rounded-xl text-xs shadow-xl transition shrink-0">
                    ✨ Tạo Bộ 20 Đề Mới Hoàn Toàn (Đợt #${currentBatch + 1})
                </button>
            </div>
        `;
    }

    // Khu vực 2 cột: (1) Bảng điểm từng đề đã làm & (2) Thống kê những kiến thức hay sai cần ôn lại
    html += `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
            <!-- Cột 1: Thống kê điểm số ở mỗi đề -->
            <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                <div class="flex justify-between items-center">
                    <h5 class="font-extrabold text-cyan-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        📋 Thống kê điểm số từng đề đã làm (${stats.allResults.length} đề)
                    </h5>
                </div>
                ${stats.allResults.length === 0 ? `
                    <p class="text-xs text-slate-400 italic py-4 text-center">
                        Chưa có đề nào được nộp. Hãy chọn một đề bên dưới và hoàn thành để xem thống kê điểm số chi tiết!
                    </p>
                ` : `
                    <div class="max-h-56 overflow-y-auto pr-1 custom-scroll space-y-2">
                        ${stats.allResults.map(r => {
                            const scoreNum = parseFloat(r.score);
                            const badgeColor = scoreNum >= 8.0
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                : (scoreNum >= 5.0 ? 'bg-amber-950 text-amber-300 border-amber-500/40' : 'bg-rose-950 text-rose-300 border-rose-500/40');
                            return `
                                <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center gap-2">
                                    <div>
                                        <div class="font-bold text-white text-xs">
                                            Đề số ${r.examNum} <span class="text-slate-400 font-normal">(Đợt #${r.batchNum} • ${r.level === 'easy' ? 'Dễ' : (r.level === 'medium' ? 'TB' : 'Nâng cao')})</span>
                                        </div>
                                        <div class="text-[11px] text-slate-400 mt-0.5">
                                            Đúng ${r.correctCount}/${r.totalQ} câu • Nộp lúc ${r.submittedAt}
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="px-2.5 py-1 rounded-lg border text-xs font-extrabold ${badgeColor}">
                                            ${r.score} điểm
                                        </span>
                                        ${r.batchNum === selfExamBatch[r.level] ? `
                                            <button onclick="selectSelfLevel('${r.level}'); startSelfExam('${r.examId}');" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] font-bold">
                                                Xem lại
                                            </button>
                                        ` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>

            <!-- Cột 2: Thống kê những kiến thức hay sai để học sinh ôn lại -->
            <div class="p-4 bg-slate-900/90 rounded-xl border border-rose-500/30 space-y-3">
                <div class="flex justify-between items-center">
                    <h5 class="font-extrabold text-rose-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        ⚠️ Kiến thức hay sai cần ôn lại (${stats.weakTopics.length} chủ đề)
                    </h5>
                </div>
                ${stats.weakTopics.length === 0 ? `
                    <p class="text-xs text-slate-400 italic py-4 text-center">
                        ${stats.allResults.length === 0
                            ? 'Hệ thống sẽ tự động phân tích những dạng bài và công thức bạn hay nhầm lẫn sau khi bạn nộp đề.'
                            : '🎉 Tuyệt vời! Bạn chưa có câu trả lời sai nào trong các đề đã làm.'}
                    </p>
                ` : `
                    <div class="max-h-56 overflow-y-auto pr-1 custom-scroll space-y-2.5">
                        ${stats.weakTopics.map(t => `
                            <div class="p-3 bg-slate-950 rounded-xl border border-rose-500/30 space-y-1.5">
                                <div class="flex justify-between items-start gap-2">
                                    <span class="font-bold text-rose-300 text-xs">❗ ${t.name}</span>
                                    <span class="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-700 rounded text-[10px] font-extrabold shrink-0">
                                        Sai ${t.wrongCount}/${t.totalEncountered} câu (${t.wrongRate}%)
                                    </span>
                                </div>
                                <p class="text-[11px] text-slate-300">
                                    📐 <b>Công thức cần nhớ:</b> ${t.formula}
                                </p>
                                <p class="text-[11px] text-amber-300/90">
                                    💡 <b>Lưu ý:</b> ${t.advice}
                                </p>
                                <div class="flex justify-between items-center pt-1">
                                    <span class="text-[10px] text-slate-400">Hay sai ở: ${t.failedExamsList.slice(0, 3).join(', ')}${t.failedExamsList.length > 3 ? '...' : ''}</span>
                                    <button onclick="reviewWeakTopicInLab('${t.labExp}')" class="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 rounded-lg text-[10px] font-bold transition">
                                        🧪 ${t.labLabel}
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        </div>
        </div>
    `;

    return html;
}

// Sinh bộ 20 đề mới hoàn toàn cho mức độ đã hoàn thành đủ 20 đề
function generateNewExamBatch(level) {
    const stats = getSelfPracticeStats(level);
    if (stats.currentSetCompleted < 20) {
        alert(`⚠️ Bạn mới hoàn thành ${stats.currentSetCompleted}/20 đề! Vui lòng hoàn thành đủ 20 đề trước khi tạo bộ đề mới.`);
        return;
    }

    selfExamBatch[level] = (selfExamBatch[level] || 1) + 1;
    const newBatchNum = selfExamBatch[level];
    selfPracticeExams[level] = buildSelfExamSetForLevel(level, newBatchNum);
    activeSelfExamId = null;

    const lvlLabel = level === 'easy' ? 'Dễ' : (level === 'medium' ? 'Trung bình' : 'Nâng cao');
    alert(`🎉 Đã khởi tạo thành công Bộ 20 Đề Mới Hoàn Toàn (Đợt #${newBatchNum} - Mức độ ${lvlLabel})!\n\nToàn bộ 20 đề (600 câu hỏi) đã được làm mới với các dạng bài và số liệu tính toán khác hẳn các mã đề trước.`);
    renderPracticeView();
}

// Hàm hỗ trợ giả lập hoàn thành cả 20 đề để kiểm thử nhanh thanh tiến độ 20/20, thống kê lỗi sai và nút tạo bộ đề mới
function simulateCompleteAll20Exams(level) {
    const exams = selfPracticeExams[level] || [];
    exams.forEach((exam, exIdx) => {
        if (!studentExamSubmitted[exam.id]) {
            studentExamChoices[exam.id] = {};
            exam.questions.forEach((q, qIdx) => {
                // Giả lập học sinh làm đúng khoảng 75% - 90%, có một số câu sai để hiển thị thống kê kiến thức hay sai
                const makeMistake = ((exIdx + qIdx) % 6 === 0);
                studentExamChoices[exam.id][qIdx] = makeMistake ? ((q.correct + 1) % 4) : q.correct;
            });
            recordExamSubmission(exam);
        }
    });
    renderPracticeView();
}

// Ghi nhận kết quả chấm điểm và thống kê kiến thức sai của 1 đề
function recordExamSubmission(exam) {
    const choices = studentExamChoices[exam.id] || {};
    const totalQ = exam.questions.length;
    let correct = 0;
    const topicBreakdown = {};

    exam.questions.forEach((q, i) => {
        const tId = q.topicId || 'eq_phase';
        if (!topicBreakdown[tId]) {
            topicBreakdown[tId] = { total: 0, wrong: 0 };
        }
        topicBreakdown[tId].total++;

        if (choices[i] === q.correct) {
            correct++;
        } else {
            topicBreakdown[tId].wrong++;
        }
    });

    studentExamSubmitted[exam.id] = true;
    const score = (Math.round((correct / totalQ) * 10.0 * 10) / 10).toFixed(1);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    studentExamResults[exam.id] = {
        examId: exam.id,
        examNum: exam.examNum || 1,
        batchNum: exam.batchNum || selfExamBatch[exam.level] || 1,
        level: exam.level || selectedSelfLevel,
        title: exam.title,
        score: score,
        correctCount: correct,
        totalQ: totalQ,
        submittedAt: timeStr,
        timestamp: Date.now() + (exam.examNum || 0),
        topicBreakdown: topicBreakdown
    };

    return studentExamResults[exam.id];
}

function renderPracticeView() {
    const content = document.getElementById('practiceContent');
    const resultBox = document.getElementById('practiceResultBox');
    const submitBtn = document.getElementById('submitPracticeBtn');
    if (!content) return;
    resultBox.classList.add('hidden');

    if (practiceSubMode === 'teacher') {
        document.getElementById('practiceHeading').innerText = "📋 Bài tập giáo viên giao";
        if (!activeTeacherExamId) {
            submitBtn.classList.add('hidden');
            let html = `<div class="space-y-3"><h4 class="font-bold text-cyan-300 text-sm">📋 Danh sách bài tập do giáo viên phân công:</h4>`;
            teacherAssignedExams.forEach(ex => {
                html += `
                    <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-center shadow">
                        <div>
                            <h5 class="font-bold text-white text-sm">${ex.title}</h5>
                            <p class="text-xs text-slate-400 mt-1">Ngày giao: ${ex.date} | ${ex.questions.length} câu</p>
                        </div>
                        <button onclick="startTeacherAssignedExam('${ex.id}')" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow">✍️ Làm bài ngay</button>
                    </div>
                `;
            });
            html += `</div>`;
            content.innerHTML = html;
        } else {
            submitBtn.classList.remove('hidden');
            renderTeacherAssignedQuiz();
        }
    } else {
        document.getElementById('practiceHeading').innerText = "🤖 Kho 20 Đề Tự Luyện Tập (30 Câu) & Thống Kê Tiến Độ";
        if (!selectedSelfLevel) {
            submitBtn.classList.add('hidden');
            const easyStats = getSelfPracticeStats('easy');
            const medStats = getSelfPracticeStats('medium');
            const hardStats = getSelfPracticeStats('hard');

            content.innerHTML = `
                <div class="space-y-6">
                    ${renderSelfAnalyticsDashboard(null)}

                    <div class="space-y-3">
                        <h4 class="font-bold text-cyan-300 text-base">🎯 Vui lòng chọn mức độ kho 20 đề tự luyện:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Mức độ Dễ -->
                            <div onclick="selectSelfLevel('easy')" class="p-6 bg-slate-900 rounded-2xl border border-emerald-500/40 cursor-pointer hover:border-emerald-400 transition space-y-3 text-center shadow-lg">
                                <div class="text-3xl">🟢</div>
                                <div>
                                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">Đợt đề #${selfExamBatch.easy}</span>
                                    <h5 class="font-extrabold text-white text-lg mt-1">Mức độ Dễ</h5>
                                    <p class="text-xs text-slate-400">Kho 20 đề nhận biết & công thức cơ bản</p>
                                </div>
                                <div class="space-y-1 pt-1">
                                    <div class="flex justify-between text-[11px] font-bold text-emerald-300">
                                        <span>Tiến độ: ${easyStats.currentSetCompleted}/20 đề</span>
                                        <span>${easyStats.progressPercent}%</span>
                                    </div>
                                    <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-emerald-400" style="width: ${easyStats.progressPercent}%"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Mức độ Trung bình -->
                            <div onclick="selectSelfLevel('medium')" class="p-6 bg-slate-900 rounded-2xl border border-amber-500/40 cursor-pointer hover:border-amber-400 transition space-y-3 text-center shadow-lg">
                                <div class="text-3xl">🟡</div>
                                <div>
                                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">Đợt đề #${selfExamBatch.medium}</span>
                                    <h5 class="font-extrabold text-white text-lg mt-1">Mức độ Trung bình</h5>
                                    <p class="text-xs text-slate-400">Kho 20 đề thông hiểu & tính toán</p>
                                </div>
                                <div class="space-y-1 pt-1">
                                    <div class="flex justify-between text-[11px] font-bold text-amber-300">
                                        <span>Tiến độ: ${medStats.currentSetCompleted}/20 đề</span>
                                        <span>${medStats.progressPercent}%</span>
                                    </div>
                                    <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-amber-400" style="width: ${medStats.progressPercent}%"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Mức độ Nâng cao -->
                            <div onclick="selectSelfLevel('hard')" class="p-6 bg-slate-900 rounded-2xl border border-rose-500/40 cursor-pointer hover:border-rose-400 transition space-y-3 text-center shadow-lg">
                                <div class="text-3xl">🔴</div>
                                <div>
                                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">Đợt đề #${selfExamBatch.hard}</span>
                                    <h5 class="font-extrabold text-white text-lg mt-1">Mức độ Nâng cao</h5>
                                    <p class="text-xs text-slate-400">Kho 20 đề vận dụng cao & cực trị</p>
                                </div>
                                <div class="space-y-1 pt-1">
                                    <div class="flex justify-between text-[11px] font-bold text-rose-300">
                                        <span>Tiến độ: ${hardStats.currentSetCompleted}/20 đề</span>
                                        <span>${hardStats.progressPercent}%</span>
                                    </div>
                                    <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-rose-400" style="width: ${hardStats.progressPercent}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (!activeSelfExamId) {
            submitBtn.classList.add('hidden');
            let levelName = selectedSelfLevel === 'easy' ? 'Dễ' : (selectedSelfLevel === 'medium' ? 'Trung bình' : 'Nâng cao');
            let exams = selfPracticeExams[selectedSelfLevel];
            let batchNum = selfExamBatch[selectedSelfLevel];

            let html = `
                <div class="flex flex-wrap justify-between items-center gap-2 mb-3">
                    <button onclick="selectedSelfLevel=null; renderPracticeView();" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow">
                        ⬅ Quay lại chọn mức độ
                    </button>
                    <span class="text-xs font-bold text-cyan-300 bg-cyan-950 px-3 py-1.5 rounded-xl border border-cyan-700">
                        📦 Đang hiển thị: Bộ 20 đề Đợt #${batchNum} (Mức độ ${levelName})
                    </span>
                </div>
            `;

            html += renderSelfAnalyticsDashboard(selectedSelfLevel);

            html += `
                <div class="space-y-3 mt-5">
                    <h4 class="font-bold text-cyan-300 text-sm">📋 Danh sách 20 bộ đề - Mức độ ${levelName} (Đợt #${batchNum}):</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[550px] overflow-y-auto pr-2 custom-scroll">
            `;
            exams.forEach(ex => {
                const isDone = studentExamSubmitted[ex.id];
                const res = studentExamResults[ex.id];
                const cardBorder = isDone ? 'border-emerald-500/50 bg-slate-900/95' : 'border-slate-700 bg-slate-900';
                html += `
                    <div class="p-3.5 rounded-xl border ${cardBorder} flex justify-between items-center shadow gap-2">
                        <div>
                            <div class="flex items-center gap-2">
                                <h5 class="font-bold text-white text-xs">${ex.title}</h5>
                            </div>
                            <p class="text-[11px] text-slate-400 mt-1">
                                ${isDone && res
                                    ? `<span class="text-emerald-400 font-bold">✅ Đã hoàn thành: ${res.score} điểm (${res.correctCount}/${res.totalQ} câu)</span>`
                                    : '⏳ Chưa làm • 30 câu trắc nghiệm tính toán & lý thuyết'}
                            </p>
                        </div>
                        <button onclick="startSelfExam('${ex.id}')" class="px-3.5 py-2 ${isDone ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-cyan-600 hover:bg-cyan-500'} text-white font-bold rounded-lg text-xs transition shadow shrink-0">
                            ${isDone ? '🔍 Xem lại đề' : '✍️ Làm đề'}
                        </button>
                    </div>
                `;
            });
            html += `</div></div>`;
            content.innerHTML = html;
        } else {
            submitBtn.classList.remove('hidden');
            renderActiveSelfQuiz();
        }
    }
    if (window.MathJax) MathJax.typesetPromise();
}

function startTeacherAssignedExam(id) {
    activeTeacherExamId = id;
    renderPracticeView();
}

function renderTeacherAssignedQuiz() {
    let exam = teacherAssignedExams.find(e => e.id === activeTeacherExamId);
    let choices = teacherExamChoices[activeTeacherExamId] || {};
    let submitted = teacherExamSubmitted[activeTeacherExamId] || false;
    let html = `<button onclick="activeTeacherExamId=null; renderPracticeView();" class="mb-3 px-3.5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold shadow">⬅ Quay lại danh sách</button><div class="space-y-4">`;

    exam.questions.forEach((q, idx) => {
        let sel = choices[idx];
        html += `
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                <p class="font-bold text-white text-sm">${q.q}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        `;
        q.options.forEach((opt, optIdx) => {
            let st = "bg-slate-800 text-slate-300 border-slate-700";
            if (sel === optIdx) st = "bg-cyan-700 text-white border-cyan-400 font-bold";
            if (submitted) {
                if (optIdx === q.correct) st = "bg-emerald-700 text-white border-emerald-500 font-bold";
                else if (sel === optIdx) st = "bg-rose-700 text-white border-rose-500 font-bold";
            }
            html += `<button onclick="selectTeacherChoice(${idx}, ${optIdx})" class="p-2.5 text-left text-xs rounded-xl border ${st} transition">${opt}</button>`;
        });
        html += `</div>`;
        if (submitted) {
            html += `<div class="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400">💡 <b>Hướng dẫn giải chi tiết:</b> ${q.explain}</div>`;
        }
        html += `</div>`;
    });
    html += `</div>`;
    document.getElementById('practiceContent').innerHTML = html;
    if (window.MathJax) MathJax.typesetPromise();
}

function selectTeacherChoice(qIdx, optIdx) {
    if (teacherExamSubmitted[activeTeacherExamId]) return;
    if (!teacherExamChoices[activeTeacherExamId]) teacherExamChoices[activeTeacherExamId] = {};
    teacherExamChoices[activeTeacherExamId][qIdx] = optIdx;
    renderTeacherAssignedQuiz();
}

function selectSelfLevel(level) {
    selectedSelfLevel = level;
    renderPracticeView();
}

function startSelfExam(examId) {
    activeSelfExamId = examId;
    renderPracticeView();
}

// Tự động điền nhanh 30 câu trong đề đang mở để test nộp bài
function quickFillCurrentSelfExam() {
    let exam = selfPracticeExams[selectedSelfLevel].find(e => e.id === activeSelfExamId);
    if (!exam || studentExamSubmitted[activeSelfExamId]) return;
    if (!studentExamChoices[activeSelfExamId]) studentExamChoices[activeSelfExamId] = {};
    exam.questions.forEach((q, idx) => {
        // Chọn đúng ~80%, sai ~20% để học sinh thấy phân tích câu sai
        studentExamChoices[activeSelfExamId][idx] = (idx % 5 === 0) ? ((q.correct + 1) % 4) : q.correct;
    });
    renderActiveSelfQuiz();
}

function renderActiveSelfQuiz() {
    let exam = selfPracticeExams[selectedSelfLevel].find(e => e.id === activeSelfExamId);
    let choices = studentExamChoices[activeSelfExamId] || {};
    let submitted = studentExamSubmitted[activeSelfExamId] || false;
    let answeredCount = Object.keys(choices).length;

    let html = `
        <div class="flex flex-wrap justify-between items-center gap-2 mb-3">
            <button onclick="activeSelfExamId=null; renderPracticeView();" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow">
                ⬅ Quay lại danh sách 20 đề
            </button>
            <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                    Đã chọn: ${answeredCount} / ${exam.questions.length} câu
                </span>
                ${!submitted ? `
                    <button onclick="quickFillCurrentSelfExam()" class="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold transition">
                        ⚡ Điền nhanh 30 câu (Test)
                    </button>
                ` : ''}
            </div>
        </div>
        <div class="space-y-4">
    `;

    exam.questions.forEach((q, idx) => {
        let sel = choices[idx];
        let isAnswered = sel !== undefined;

        html += `
            <div class="p-4 bg-slate-900 rounded-xl border ${isAnswered ? 'border-slate-700' : 'border-amber-500/40'} space-y-2">
                <div class="flex flex-wrap justify-between items-center gap-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-amber-400 bg-slate-800 px-2.5 py-1 rounded">${q.level}</span>
                        <span class="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">📌 ${q.topicName || 'Dao động điều hòa'}</span>
                    </div>
                    ${!isAnswered && !submitted ? '<span class="text-[10px] text-amber-400 font-bold">Chưa trả lời</span>' : ''}
                </div>
                <p class="font-bold text-white text-sm">${q.q}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        `;
        q.options.forEach((opt, optIdx) => {
            let st = "bg-slate-800 text-slate-300 border-slate-700";
            if (sel === optIdx) st = "bg-cyan-700 text-white border-cyan-400 font-bold";
            if (submitted) {
                if (optIdx === q.correct) st = "bg-emerald-700 text-white border-emerald-500 font-bold";
                else if (sel === optIdx && sel !== q.correct) st = "bg-rose-700 text-white border-rose-500 font-bold";
            }
            html += `<button onclick="selectSelfChoice(${idx}, ${optIdx})" class="p-2.5 text-left text-xs rounded-xl border ${st} transition">${opt}</button>`;
        });
        html += `</div>`;
        if (submitted) {
            const isWrong = sel !== q.correct;
            const topicMeta = KNOWLEDGE_TOPICS[q.topicId];
            html += `
                <div class="mt-2 p-3 bg-slate-950 rounded-xl border ${isWrong ? 'border-rose-500/40' : 'border-slate-800'} text-xs space-y-1">
                    <div class="${isWrong ? 'text-rose-400' : 'text-emerald-400'}">
                        ${isWrong ? '❌ <b>Bạn chọn sai.</b>' : '✅ <b>Chính xác!</b>'} 💡 <b>Hướng dẫn giải:</b> ${q.explain}
                    </div>
                    ${isWrong && topicMeta ? `
                        <div class="text-[11px] text-amber-300 pt-1 flex flex-wrap justify-between items-center gap-2 border-t border-slate-800 mt-1">
                            <span>📌 <b>Kiến thức cần ôn:</b> ${topicMeta.name} — ${topicMeta.advice}</span>
                            <button onclick="reviewWeakTopicInLab('${topicMeta.labExp}')" class="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 rounded text-[10px] font-bold">
                                🧪 ${topicMeta.labLabel}
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        html += `</div>`;
    });
    html += `</div>`;
    document.getElementById('practiceContent').innerHTML = html;
    if (window.MathJax) MathJax.typesetPromise();
}

function selectSelfChoice(qIdx, optIdx) {
    if (studentExamSubmitted[activeSelfExamId]) return;
    if (!studentExamChoices[activeSelfExamId]) studentExamChoices[activeSelfExamId] = {};
    studentExamChoices[activeSelfExamId][qIdx] = optIdx;
    renderActiveSelfQuiz();
}

function submitPractice() {
    if (practiceSubMode === 'teacher') {
        let exam = teacherAssignedExams.find(e => e.id === activeTeacherExamId);
        let choices = teacherExamChoices[activeTeacherExamId] || {};
        let totalQ = exam.questions.length;
        let unans = 0;
        for (let i = 0; i < totalQ; i++) if (choices[i] === undefined) unans++;
        if (unans > 0) {
            alert(`⚠️ Bạn còn ${unans} câu chưa trả lời! Vui lòng hoàn thành tất cả các câu trước khi nộp.`);
            return;
        }

        teacherExamSubmitted[activeTeacherExamId] = true;
        let correct = 0;
        exam.questions.forEach((q, i) => { if (choices[i] === q.correct) correct++; });
        document.getElementById('practiceResultBox').classList.remove('hidden');
        document.getElementById('practiceScoreText').innerText = `Chính xác: ${correct} / ${totalQ} câu (${Math.round((correct / totalQ) * 100)} điểm)`;
        renderTeacherAssignedQuiz();
    } else {
        let exam = selfPracticeExams[selectedSelfLevel].find(e => e.id === activeSelfExamId);
        let choices = studentExamChoices[activeSelfExamId] || {};
        let totalQ = exam.questions.length;
        let unans = 0;
        let firstUnans = -1;

        for (let i = 0; i < totalQ; i++) {
            if (choices[i] === undefined) {
                unans++;
                if (firstUnans === -1) firstUnans = i;
            }
        }

        if (unans > 0) {
            alert(`⚠️ Bạn còn ${unans} câu chưa trả lời! Vui lòng hoàn thành đủ 30 câu trong đề trước khi bấm nộp bài.`);
            const qEls = document.querySelectorAll('#practiceContent > div:last-child > div');
            if (qEls[firstUnans]) {
                qEls[firstUnans].scrollIntoView({ behavior: 'smooth', block: 'center' });
                qEls[firstUnans].classList.add('border-rose-500');
                setTimeout(() => qEls[firstUnans].classList.remove('border-rose-500'), 2000);
            }
            return;
        }

        const res = recordExamSubmission(exam);
        const wrongTopicNames = Object.keys(res.topicBreakdown)
            .filter(tId => res.topicBreakdown[tId].wrong > 0)
            .map(tId => `${KNOWLEDGE_TOPICS[tId].name} (sai ${res.topicBreakdown[tId].wrong} câu)`);

        const resultBox = document.getElementById('practiceResultBox');
        resultBox.classList.remove('hidden');
        document.getElementById('practiceScoreText').innerHTML = `
            <div>Chính xác: ${res.correctCount} / ${res.totalQ} câu (<span class="text-white">${res.score} điểm</span> hệ 10)</div>
            ${wrongTopicNames.length > 0 ? `
                <div class="text-xs text-rose-300 font-semibold mt-2">
                    ⚠️ Các kiến thức cần ôn lại ở đề này: ${wrongTopicNames.join(' • ')}
                </div>
            ` : `
                <div class="text-xs text-emerald-300 font-semibold mt-2">
                    🌟 Xuất sắc! Bạn nắm vững toàn bộ các mảng kiến thức trong đề này.
                </div>
            `}
        `;
        renderActiveSelfQuiz();
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
