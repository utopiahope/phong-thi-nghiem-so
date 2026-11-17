// ================= MODULE: THÍ NGHIỆM ẢO & LÝ THUYẾT (LAB) =================

let labChart = null;
let animFrameId = null;

function initLabChart() {
    const ctx = document.getElementById('graphCanvas');
    if (!ctx || labChart) return;

    labChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Li độ x (cm)',
                    data: [],
                    borderColor: '#22d3ee',
                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.35
                },
                {
                    label: 'Vận tốc v/ω (cm)',
                    data: [],
                    borderColor: '#f472b6',
                    backgroundColor: 'rgba(244, 114, 182, 0.08)',
                    borderWidth: 1.5,
                    borderDash: [4, 4],
                    pointRadius: 0,
                    tension: 0.35
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: {
                    ticks: { color: '#94a3b8', maxTicksLimit: 6 },
                    grid: { color: 'rgba(148, 163, 184, 0.1)' }
                },
                y: {
                    min: -100,
                    max: 100,
                    ticks: { color: '#94a3b8' },
                    grid: { color: 'rgba(148, 163, 184, 0.15)' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#e2e8f0', font: { size: 11 } }
                }
            }
        }
    });
}

function updateLabParams() {
    paramA = parseFloat(document.getElementById('rangeA').value);
    paramW = parseFloat(document.getElementById('rangeW').value);
    paramPhi = parseFloat(document.getElementById('rangePhi').value);
    paramSpeed = parseFloat(document.getElementById('rangeSpeed').value);

    document.getElementById('valA').innerText = paramA;
    document.getElementById('valW').innerText = paramW.toFixed(1);
    document.getElementById('valPhi').innerText = paramPhi.toFixed(1);
    document.getElementById('valSpeed').innerText = paramSpeed.toFixed(1) + 'x';
}

function resetSimulation() {
    simTime = 0;
    if (labChart) {
        labChart.data.labels = [];
        labChart.data.datasets[0].data = [];
        labChart.data.datasets[1].data = [];
        labChart.update();
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').innerText = isPaused ? "▶ Tiếp tục" : "⏸ Tạm dừng";
}

function switchLabExp(exp) {
    currentLab = exp;
    ['spring', 'pendulum', 'damped', 'forced'].forEach(k => {
        const b = document.getElementById('lab-btn-' + k);
        if (b) {
            b.className = k === exp
                ? "px-4 py-2 rounded-xl font-bold text-xs bg-cyan-600 text-white shadow transition"
                : "px-4 py-2 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
        }
    });
    document.getElementById('labSimTitle').innerHTML = `🧪 Thí nghiệm: ${
        exp === 'spring' ? 'Con lắc lò xo' : (exp === 'pendulum' ? 'Con lắc đơn' : (exp === 'damped' ? 'Dao động tắt dần' : 'Dao động cưỡng bức & Cộng hưởng'))
    }`;
    document.getElementById('labTheoryBody').innerHTML = labTheoryData[exp];
    resetSimulation();
    renderLabExercises(exp);
    if (window.MathJax) MathJax.typesetPromise();
}

function computeLabState(t) {
    let x = 0;
    let vScaled = 0;
    let ampCurrent = paramA;

    if (currentLab === 'spring' || currentLab === 'pendulum') {
        x = paramA * Math.cos(paramW * t + paramPhi);
        vScaled = -paramA * Math.sin(paramW * t + paramPhi);
    } else if (currentLab === 'damped') {
        const gamma = 0.25;
        ampCurrent = paramA * Math.exp(-gamma * t);
        x = ampCurrent * Math.cos(paramW * t + paramPhi);
        vScaled = -ampCurrent * Math.sin(paramW * t + paramPhi);
    } else if (currentLab === 'forced') {
        // Tần số riêng cố định w0 = 6.0 rad/s để dễ quan sát cộng hưởng khi chỉnh w gần 6.0
        const w0 = 6.0;
        const gamma = 0.6;
        const resonanceFactor = 1 / Math.sqrt(Math.pow(w0 * w0 - paramW * paramW, 2) + 4 * gamma * gamma * paramW * paramW);
        ampCurrent = Math.min(95, paramA * resonanceFactor * 12);
        x = ampCurrent * Math.cos(paramW * t + paramPhi);
        vScaled = -ampCurrent * Math.sin(paramW * t + paramPhi);
    }

    return { x, vScaled, ampCurrent };
}

function drawSimulationCanvas(state) {
    const canvas = document.getElementById('simCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Lưới nền mờ
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 35) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 35) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    const centerX = W / 2;
    const centerY = H / 2 + 10;
    const scalePx = 1.8; // 1 cm -> 1.8 px

    if (currentLab === 'pendulum') {
        // Vẽ con lắc đơn
        const pivotX = centerX;
        const pivotY = 28;
        const ropeLen = 175;
        const maxAngle = (paramA / 90) * 0.65;
        const angle = (state.x / paramA) * maxAngle;

        const bobX = pivotX + ropeLen * Math.sin(angle);
        const bobY = pivotY + ropeLen * Math.cos(angle);

        // Giá đỡ
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(pivotX - 60, pivotY);
        ctx.lineTo(pivotX + 60, pivotY);
        ctx.stroke();

        // Đường thẳng đứng cân bằng
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(pivotX, pivotY + ropeLen + 25);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dây treo
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();

        // Quả nặng
        const grad = ctx.createRadialGradient(bobX - 5, bobY - 5, 3, bobX, bobY, 20);
        grad.addColorStop(0, '#67e8f9');
        grad.addColorStop(1, '#0284c7');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bobX, bobY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 2;
        ctx.stroke();
    } else {
        // Vẽ hệ lò xo nằm ngang (cho spring, damped, forced)
        const wallX = 70;
        const groundY = centerY + 26;
        const eqX = centerX + 20;
        const massX = eqX + state.x * scalePx;

        // Mặt sàn và tường
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(wallX, centerY - 55);
        ctx.lineTo(wallX, groundY);
        ctx.lineTo(W - 40, groundY);
        ctx.stroke();

        // Vạch vị trí cân bằng O và biên -A, +A
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(eqX, centerY - 55);
        ctx.lineTo(eqX, groundY + 15);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.fillText('VTCB (O)', eqX - 24, groundY + 28);

        // Vẽ lò xo
        const coils = 16;
        const springStartX = wallX;
        const springEndX = massX - 26;
        const springLen = springEndX - springStartX;

        ctx.strokeStyle = currentLab === 'damped' ? '#fbbf24' : (currentLab === 'forced' ? '#f472b6' : '#38bdf8');
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(springStartX, centerY);
        for (let i = 1; i <= coils; i++) {
            const xPos = springStartX + (springLen / (coils + 1)) * i;
            const yOffset = (i % 2 === 0) ? -14 : 14;
            ctx.lineTo(xPos, centerY + yOffset);
        }
        ctx.lineTo(springEndX, centerY);
        ctx.stroke();

        // Vẽ vật nặng
        ctx.fillStyle = currentLab === 'damped' ? '#d97706' : (currentLab === 'forced' ? '#db2777' : '#0284c7');
        ctx.beginPath();
        ctx.roundRect(massX - 26, centerY - 24, 52, 48, 10);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.fillText('m', massX - 6, centerY + 4);
    }

    // Thông số hiển thị góc trên canvas
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 12px Plus Jakarta Sans';
    ctx.fillText(`t = ${simTime.toFixed(2)} s   |   x = ${state.x.toFixed(1)} cm`, 18, 24);
    if (currentLab === 'forced') {
        ctx.fillStyle = Math.abs(paramW - 6.0) <= 0.5 ? '#4ade80' : '#f472b6';
        ctx.fillText(`Tần số riêng ω₀ = 6.0 rad/s ${Math.abs(paramW - 6.0) <= 0.5 ? '⚡ ĐANG CỘNG HƯỞNG CỰC ĐẠI!' : ''}`, 18, 44);
    } else if (currentLab === 'damped') {
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`Biên độ hiện tại A(t) = ${state.ampCurrent.toFixed(1)} cm`, 18, 44);
    }
}

function startLabAnimation() {
    initLabChart();
    if (animFrameId) cancelAnimationFrame(animFrameId);

    let lastTimestamp = performance.now();
    let chartStepCounter = 0;

    function step(now) {
        const dt = (now - lastTimestamp) / 1000;
        lastTimestamp = now;

        const labTab = document.getElementById('tab-lab');
        const isLabVisible = labTab && !labTab.classList.contains('hidden');

        if (isLabVisible && !isPaused) {
            simTime += dt * paramSpeed;
            const state = computeLabState(simTime);
            drawSimulationCanvas(state);

            chartStepCounter++;
            if (labChart && chartStepCounter % 2 === 0) {
                labChart.data.labels.push(simTime.toFixed(1) + 's');
                labChart.data.datasets[0].data.push(state.x);
                labChart.data.datasets[1].data.push(state.vScaled);

                if (labChart.data.labels.length > 80) {
                    labChart.data.labels.shift();
                    labChart.data.datasets[0].data.shift();
                    labChart.data.datasets[1].data.shift();
                }
                labChart.update('none');
            }
        } else if (isLabVisible && isPaused) {
            const state = computeLabState(simTime);
            drawSimulationCanvas(state);
        }

        animFrameId = requestAnimationFrame(step);
    }

    animFrameId = requestAnimationFrame(step);
}

// Bài tập 15 câu tại chỗ dưới mỗi thí nghiệm
function renderLabExercises(exp) {
    let container = document.getElementById('labExerciseContainer');
    if (!container) return;
    let questions = labExercisesData[exp];
    let choices = labUserChoices[exp] || {};
    let submitted = labSubmitted[exp] || false;
    let html = "";

    questions.forEach((q, idx) => {
        let sel = choices[idx];
        html += `
            <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-semibold text-amber-400 bg-slate-800 px-2.5 py-1 rounded">${q.level}</span>
                </div>
                <p class="font-bold text-white text-xs">${q.q}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        `;
        q.options.forEach((opt, optIdx) => {
            let st = "bg-slate-800 text-slate-300 border-slate-700";
            if (sel === optIdx) st = "bg-cyan-700 text-white border-cyan-400 font-bold";
            if (submitted) {
                if (optIdx === q.correct) st = "bg-emerald-700 text-white border-emerald-500 font-bold";
                else if (sel === optIdx) st = "bg-rose-700 text-white border-rose-500 font-bold";
            }
            html += `<button onclick="selectLabChoice('${exp}', ${idx}, ${optIdx})" class="p-2.5 text-left text-xs rounded-xl border ${st} transition">${opt}</button>`;
        });
        html += `</div>`;
        if (submitted) {
            html += `<div class="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400">💡 <b>Lời giải:</b> ${q.explain}</div>`;
        }
        html += `</div>`;
    });

    html += `<button onclick="submitLabQuiz('${exp}')" class="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow transition">🚀 Chấm điểm bộ 15 câu tại chỗ</button>`;
    container.innerHTML = html;
    if (window.MathJax) MathJax.typesetPromise();
}

function selectLabChoice(exp, qIdx, optIdx) {
    if (labSubmitted[exp]) return;
    if (!labUserChoices[exp]) labUserChoices[exp] = {};
    labUserChoices[exp][qIdx] = optIdx;
    renderLabExercises(exp);
}

function submitLabQuiz(exp) {
    labSubmitted[exp] = true;
    renderLabExercises(exp);
}
