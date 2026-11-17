// ================= MODULE: DỮ LIỆU & NGÂN HÀNG CÂU HỎI (DATA) =================

// Danh mục các mảng kiến thức Chương Dao Động dùng để thống kê lỗi sai và gợi ý ôn tập
const KNOWLEDGE_TOPICS = {
    eq_phase: {
        id: 'eq_phase',
        name: 'Phương trình dao động & Pha dao động',
        formula: '$x = A\\cos(\\omega t + \\varphi)$, xác định biên độ $A$, tần số góc $\\omega$, pha ban đầu $\\varphi$ và pha dao động tại thời điểm $t$.',
        advice: 'Chú ý đổi hàm $\\sin$ sang $\\cos$ hoặc kiểm tra dấu của vận tốc tại $t = 0$ ($v > 0 \\implies \\varphi < 0$).',
        labExp: 'spring',
        labLabel: 'Ôn lại ở TN Con lắc lò xo'
    },
    spring_period: {
        id: 'spring_period',
        name: 'Tần số góc, Chu kỳ & Độ cứng Con lắc lò xo',
        formula: '$\\omega = \\sqrt{\\frac{k}{m}}$, $T = 2\\pi\\sqrt{\\frac{m}{k}}$, $f = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}$, $\\Delta l_0 = \\frac{mg}{k}$.',
        advice: 'Luôn nhớ đổi khối lượng $m$ từ gam ($\\text{g}$) sang kilôgam ($\\text{kg}$) trước khi thay vào công thức!',
        labExp: 'spring',
        labLabel: 'Ôn lại ở TN Con lắc lò xo'
    },
    vel_acc: {
        id: 'vel_acc',
        name: 'Vận tốc, Gia tốc & Hệ thức độc lập thời gian',
        formula: '$v_{\\max} = \\omega A$, $a_{\\max} = \\omega^2 A$, hệ thức độc lập: $A^2 = x^2 + \\frac{v^2}{\\omega^2}$, lực kéo về $F_{\\max} = kA$.',
        advice: 'Kiểm tra kỹ đơn vị giữa $\\text{cm/s}$ và $\\text{m/s}^2$, vận tốc cực đại ở VTCB còn gia tốc cực đại ở vị trí biên.',
        labExp: 'spring',
        labLabel: 'Ôn lại ở TN Con lắc lò xo'
    },
    pendulum_period: {
        id: 'pendulum_period',
        name: 'Chu kỳ, Tần số & Dao động Con lắc đơn',
        formula: '$T = 2\\pi\\sqrt{\\frac{l}{g}}$, $\\omega = \\sqrt{\\frac{g}{l}}$, $v_{\\max} = \\sqrt{gl}\\alpha_0$ ($\\alpha_0$ tính bằng $\\text{rad}$).',
        advice: 'Chu kỳ con lắc đơn tỉ lệ thuận với $\\sqrt{l}$, tỉ lệ nghịch với $\\sqrt{g}$ và KHÔNG phụ thuộc khối lượng vật nặng.',
        labExp: 'pendulum',
        labLabel: 'Ôn lại ở TN Con lắc đơn'
    },
    energy: {
        id: 'energy',
        name: 'Động năng, Thế năng & Cơ năng dao động',
        formula: '$W = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2 A^2$, $W_t = \\frac{1}{2}kx^2$, $W_d = W - W_t$.',
        advice: 'Sai lầm phổ biến nhất là quên đổi biên độ $A$ và li độ $x$ từ $\\text{cm}$ sang $\\text{m}$ khi tính năng lượng ra Joule ($\\text{J}$).',
        labExp: 'spring',
        labLabel: 'Ôn lại ở TN Con lắc lò xo'
    },
    damped_forced: {
        id: 'damped_forced',
        name: 'Dao động tắt dần, Cưỡng bức & Cộng hưởng',
        formula: 'Độ giảm biên độ sau 1 chu kỳ: $\\Delta A = \\frac{4\\mu mg}{k}$; Điều kiện cộng hưởng: $f = f_0$ ($\\Omega = \\omega_0$).',
        advice: 'Khi xảy ra cộng hưởng, tần số ngoại lực bằng tần số riêng của hệ và biên độ dao động cưỡng bức đạt cực đại.',
        labExp: 'forced',
        labLabel: 'Ôn lại ở TN Cưỡng bức & Cộng hưởng'
    },
    time_path: {
        id: 'time_path',
        name: 'Quãng đường & Thời gian trong dao động',
        formula: 'Quãng đường trong 1 chu kỳ $S_{1T} = 4A$, nửa chu kỳ $S_{T/2} = 2A$; Thời gian từ VTCB đến $A/2$ là $T/12$.',
        advice: 'Tách thời gian hoặc số chu kỳ thành bội số của $T/2$ (luôn đi được $2A$) trước khi tính phần lẻ.',
        labExp: 'spring',
        labLabel: 'Ôn lại ở TN Con lắc lò xo'
    }
};

// Danh sách đề giáo viên giao
let teacherAssignedExams = [
    {
        id: 't_ex_1',
        title: 'Đề kiểm tra 15 phút: Con lắc lò xo nâng cao',
        date: '12/11/2026',
        questions: [
            { q: "Câu 1: Một vật dao động điều hòa $x = 5\\cos(10t)\\text{ cm}$. Tốc độ cực đại là:", options: ["A. $25\\text{ cm/s}$", "B. $50\\text{ cm/s}$", "C. $100\\text{ cm/s}$", "D. $5\\text{ cm/s}$"], correct: 1, explain: "$v_{\\max} = \\omega A = 10 \\times 5 = 50\\text{ cm/s}$." },
            { q: "Câu 2: Cơ năng của con lắc lò xo tính bằng:", options: ["A. $0.5kA$", "B. $0.5kA^2$", "C. $kA^2$", "D. $0.5mv^2$"], correct: 1, explain: "Công thức chuẩn $W = \\frac{1}{2}kA^2$." }
        ]
    }
];

// Hàm trộn phương án và đặt nhãn A, B, C, D tự động, trả về { options, correct }
function buildOptionsWithCorrect(correctValStr, wrongValsArr, seedIndex) {
    const pos = seedIndex % 4;
    const raw = [];
    let wIdx = 0;
    for (let k = 0; k < 4; k++) {
        if (k === pos) {
            raw.push(correctValStr);
        } else {
            raw.push(wrongValsArr[wIdx++]);
        }
    }
    const labels = ['A', 'B', 'C', 'D'];
    return {
        options: raw.map((val, idx) => `${labels[idx]}. ${val}`),
        correct: pos
    };
}

// Sinh 30 câu hỏi tính toán độc nhất theo Mức độ, Số đề (1..20) và Đợt đề (batchNum = 1, 2, 3...)
function generateUnique30Questions(levelName, examNum, batchNum = 1) {
    let list = [];
    const levelSeed = levelName === 'easy' ? 1 : (levelName === 'medium' ? 2 : 3);
    const batchOffset = (batchNum - 1) * 37 + levelSeed * 13;

    for (let i = 1; i <= 30; i++) {
        // Các biến số vật lý thay đổi hoàn toàn theo batchNum, examNum và câu i
        let A_v = ((examNum * 3 + i * 2 + batchOffset) % 14) + 3; // 3 -> 16 cm
        let w_v = ((examNum * 2 + i + batchOffset) % 16) + 4;     // 4 -> 19 rad/s
        let m_v = (((examNum * 19 + i * 13 + batchOffset * 7) % 40) + 10) * 10; // 100 -> 490 g
        let k_v = 40 + ((examNum * 5 + i * 3 + batchOffset * 2) % 120); // 40 -> 159 N/m
        let l_v = (0.35 + ((examNum * 7 + i * 3 + batchOffset) % 18) * 0.05).toFixed(2); // m

        let qObj = {};
        // 10 dạng bài toán tính toán xoay vòng và dịch chuyển theo batchNum
        let typeIdx = (examNum + i + batchNum * 3) % 10;
        let batchTag = batchNum > 1 ? ` [Bộ đề mới #${batchNum}]` : '';
        let lvlTitle = levelName === 'easy' ? 'Dễ' : (levelName === 'medium' ? 'Trung bình' : 'Nâng cao');

        if (typeIdx === 0) {
            // Dạng 1: Xác định pha ban đầu / biên độ từ phương trình
            let denom = ((i + batchNum) % 5) + 2; // 2, 3, 4, 5, 6
            let sign = (examNum + batchNum) % 2 === 0 ? '+' : '-';
            let correctStr = `$${sign === '-' ? '-' : ''}\\frac{\\pi}{${denom}}\\text{ rad}$`;
            let built = buildOptionsWithCorrect(
                correctStr,
                [`$0\\text{ rad}$`, `$${sign === '-' ? '+' : '-'}\\frac{\\pi}{${denom}}\\text{ rad}$`, `$\\frac{\\pi}{${denom + 1}}\\text{ rad}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'eq_phase';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Một vật dao động điều hòa có phương trình $x = ${A_v}\\cos(${w_v}t ${sign} \\frac{\\pi}{${denom}})\\text{ (cm)}$. Pha ban đầu $\\varphi$ của dao động là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `So sánh với phương trình chuẩn $x = A\\cos(\\omega t + \\varphi)$, ta có pha ban đầu $\\varphi = ${sign === '-' ? '-' : ''}\\frac{\\pi}{${denom}}\\text{ rad}$.`;
        } else if (typeIdx === 1) {
            // Dạng 2: Tần số góc con lắc lò xo
            let w_calc = Math.sqrt(k_v / (m_v / 1000)).toFixed(1);
            let w_w1 = (parseFloat(w_calc) + 2.5).toFixed(1);
            let w_w2 = Math.max(1.2, (parseFloat(w_calc) - 1.8)).toFixed(1);
            let w_w3 = (parseFloat(w_calc) * 2).toFixed(1);
            let built = buildOptionsWithCorrect(
                `$${w_calc}\\text{ rad/s}$`,
                [`$${w_w1}\\text{ rad/s}$`, `$${w_w2}\\text{ rad/s}$`, `$${w_w3}\\text{ rad/s}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'spring_period';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Con lắc lò xo có vật nặng khối lượng $m = ${m_v}\\text{ g}$ và lò xo có độ cứng $k = ${k_v}\\text{ N/m}$. Tần số góc $\\omega$ của con lắc là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Đổi $m = ${m_v}\\text{ g} = ${m_v / 1000}\\text{ kg}$. Áp dụng $\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{${k_v}}{${m_v / 1000}}} \\approx ${w_calc}\\text{ rad/s}$.`;
        } else if (typeIdx === 2) {
            // Dạng 3: Tốc độ cực đại
            let vmax = A_v * w_v;
            let built = buildOptionsWithCorrect(
                `$${vmax}\\text{ cm/s}$`,
                [`$${(vmax / 2).toFixed(1)}\\text{ cm/s}$`, `$${vmax * w_v}\\text{ cm/s}$`, `$${vmax + 15}\\text{ cm/s}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'vel_acc';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Một chất điểm dao động điều hòa với biên độ $A = ${A_v}\\text{ cm}$ và tần số góc $\\omega = ${w_v}\\text{ rad/s}$. Tốc độ cực đại $v_{\\max}$ của chất điểm là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Tốc độ cực đại khi qua VTCB: $v_{\\max} = \\omega A = ${w_v} \\times ${A_v} = ${vmax}\\text{ cm/s}$.`;
        } else if (typeIdx === 3) {
            // Dạng 4: Chu kỳ con lắc đơn
            let g_val = 9.87;
            let T_calc = (2 * Math.PI * Math.sqrt(parseFloat(l_v) / g_val)).toFixed(2);
            let T_w1 = (parseFloat(T_calc) + 0.45).toFixed(2);
            let T_w2 = Math.max(0.35, parseFloat(T_calc) - 0.35).toFixed(2);
            let T_w3 = (parseFloat(T_calc) * 1.5).toFixed(2);
            let built = buildOptionsWithCorrect(
                `$${T_calc}\\text{ s}$`,
                [`$${T_w1}\\text{ s}$`, `$${T_w2}\\text{ s}$`, `$${T_w3}\\text{ s}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'pendulum_period';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Con lắc đơn có chiều dài dây treo $l = ${l_v}\\text{ m}$ tại nơi có gia tốc trọng trường $g = 9.87\\text{ m/s}^2$. Chu kỳ dao động nhỏ $T$ của con lắc là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Chu kỳ con lắc đơn: $T = 2\\pi\\sqrt{\\frac{l}{g}} = 2\\pi\\sqrt{\\frac{${l_v}}{9.87}} \\approx ${T_calc}\\text{ s}$.`;
        } else if (typeIdx === 4) {
            // Dạng 5: Cơ năng con lắc lò xo
            let Am = A_v / 100;
            let W_calc = (0.5 * k_v * Am * Am).toFixed(3);
            let W_w1 = (k_v * Am * Am).toFixed(3);
            let W_w2 = (0.5 * k_v * A_v).toFixed(1);
            let W_w3 = (0.25 * k_v * Am * Am).toFixed(3);
            let built = buildOptionsWithCorrect(
                `$${W_calc}\\text{ J}$`,
                [`$${W_w1}\\text{ J}$`, `$${W_w2}\\text{ J}$`, `$${W_w3}\\text{ J}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'energy';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Con lắc lò xo có độ cứng $k = ${k_v}\\text{ N/m}$ dao động điều hòa với biên độ $A = ${A_v}\\text{ cm}$. Cơ năng $W$ của con lắc bằng:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Đổi $A = ${A_v}\\text{ cm} = ${Am}\\text{ m}$. Cơ năng: $W = \\frac{1}{2}kA^2 = 0.5 \\times ${k_v} \\times (${Am})^2 \\approx ${W_calc}\\text{ J}$.`;
        } else if (typeIdx === 5) {
            // Dạng 6: Gia tốc cực đại
            let amax_cms2 = w_v * w_v * A_v;
            let amax_ms2 = (amax_cms2 / 100).toFixed(2);
            let built = buildOptionsWithCorrect(
                `$${amax_ms2}\\text{ m/s}^2$`,
                [`$${( (w_v * A_v) / 100 ).toFixed(2)}\\text{ m/s}^2$`, `$${(amax_cms2 / 50).toFixed(2)}\\text{ m/s}^2$`, `$${(amax_cms2 / 200).toFixed(2)}\\text{ m/s}^2$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'vel_acc';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Vật dao động điều hòa với biên độ $A = ${A_v}\\text{ cm}$ và tần số góc $\\omega = ${w_v}\\text{ rad/s}$. Độ lớn gia tốc cực đại $a_{\\max}$ (tính theo $\\text{m/s}^2$) là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Ta có $a_{\\max} = \\omega^2 A = ${w_v}^2 \\times ${A_v} = ${amax_cms2}\\text{ cm/s}^2 = ${amax_ms2}\\text{ m/s}^2$.`;
        } else if (typeIdx === 6) {
            // Dạng 7: Hệ thức độc lập thời gian tìm biên độ A
            let x_now = ((i + batchNum) % 4) + 3; // 3..6 cm
            let v_over_w = ((examNum + batchNum) % 4) + 4; // 4..7 cm
            let v_now = v_over_w * w_v;
            let A_calc = Math.sqrt(x_now * x_now + v_over_w * v_over_w).toFixed(2);
            let built = buildOptionsWithCorrect(
                `$${A_calc}\\text{ cm}$`,
                [`$${(x_now + v_over_w).toFixed(2)}\\text{ cm}$`, `$${Math.abs(x_now - v_over_w).toFixed(2)}\\text{ cm}$`, `$${(parseFloat(A_calc) * 1.5).toFixed(2)}\\text{ cm}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'vel_acc';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Vật dao động điều hòa với $\\omega = ${w_v}\\text{ rad/s}$. Khi vật có li độ $x = ${x_now}\\text{ cm}$ thì tốc độ là $v = ${v_now}\\text{ cm/s}$. Biên độ dao động $A$ là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Áp dụng hệ thức độc lập: $A = \\sqrt{x^2 + \\frac{v^2}{\\omega^2}} = \\sqrt{${x_now}^2 + \\left(\\frac{${v_now}}{${w_v}}\\right)^2} = \\sqrt{${x_now * x_now} + ${v_over_w * v_over_w}} \\approx ${A_calc}\\text{ cm}$.`;
        } else if (typeIdx === 7) {
            // Dạng 8: Quãng đường đi được trong n chu kỳ
            let numT = ((i + batchNum) % 3) + 1.5; // 1.5, 2.5, 3.5 chu kỳ
            let S_calc = numT * 4 * A_v;
            let built = buildOptionsWithCorrect(
                `$${S_calc}\\text{ cm}$`,
                [`$${numT * 2 * A_v}\\text{ cm}$`, `$${(S_calc + 2 * A_v)}\\text{ cm}$`, `$${4 * A_v}\\text{ cm}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'time_path';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Một vật dao động điều hòa với biên độ $A = ${A_v}\\text{ cm}$. Quãng đường vật đi được trong khoảng thời gian $\\Delta t = ${numT}T$ (với $T$ là chu kỳ) bằng:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Trong mỗi nửa chu kỳ ($0.5T$) vật luôn đi được $2A$, trong $1T$ đi được $4A$. Vậy trong $${numT}T$ quãng đường là $S = ${numT} \\times 4A = ${numT} \\times 4 \\times ${A_v} = ${S_calc}\\text{ cm}$.`;
        } else if (typeIdx === 8) {
            // Dạng 9: Dao động tắt dần - độ giảm biên độ sau 1 chu kỳ
            let mu = (((i + batchNum) % 4) + 1) * 0.02; // 0.02, 0.04, 0.06, 0.08
            let m_kg = (m_v / 1000);
            let deltaA_m = (4 * mu * m_kg * 10) / k_v;
            let deltaA_cm = (deltaA_m * 100).toFixed(2);
            let built = buildOptionsWithCorrect(
                `$${deltaA_cm}\\text{ cm}$`,
                [`$${(deltaA_m * 50).toFixed(2)}\\text{ cm}$`, `$${(deltaA_m * 25).toFixed(2)}\\text{ cm}$`, `$${(deltaA_m * 200).toFixed(2)}\\text{ cm}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'damped_forced';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Con lắc lò xo ngang có $k = ${k_v}\\text{ N/m}$, $m = ${m_v}\\text{ g}$, hệ số ma sát trượt $\\mu = ${mu.toFixed(2)}$, lấy $g = 10\\text{ m/s}^2$. Độ giảm biên độ sau mỗi chu kỳ là:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Độ giảm biên độ sau 1 chu kỳ: $\\Delta A = \\frac{4\\mu mg}{k} = \\frac{4 \\times ${mu.toFixed(2)} \\times ${m_kg} \\times 10}{${k_v}}\\text{ m} \\approx ${deltaA_cm}\\text{ cm}$.`;
        } else {
            // Dạng 10: Điều kiện cộng hưởng cơ học
            let f0 = ((examNum + i + batchNum) % 12) + 2; // 2 -> 13 Hz
            let T_ext = (1 / f0).toFixed(3);
            let built = buildOptionsWithCorrect(
                `$f = ${f0}\\text{ Hz}$`,
                [`$f = ${f0 * 2}\\text{ Hz}$`, `$f = ${(f0 / 2).toFixed(1)}\\text{ Hz}$`, `$f = ${f0 + 3}\\text{ Hz}$`],
                i + examNum + batchNum
            );
            qObj.topicId = 'damped_forced';
            qObj.q = `Câu ${i} (Đề ${examNum} - ${lvlTitle}${batchTag}): Một hệ cơ học có tần số dao động riêng $f_0 = ${f0}\\text{ Hz}$ chịu tác dụng của ngoại lực tuần hoàn. Để xảy ra hiện tượng cộng hưởng cơ lớn nhất thì tần số ngoại lực $f$ phải bằng:`;
            qObj.options = built.options;
            qObj.correct = built.correct;
            qObj.explain = `Điều kiện cộng hưởng cơ học là tần số ngoại lực cưỡng bức bằng tần số riêng của hệ: $f = f_0 = ${f0}\\text{ Hz}$ (chu kỳ $T = ${T_ext}\\text{ s}$).`;
        }

        const topicMeta = KNOWLEDGE_TOPICS[qObj.topicId];
        list.push({
            id: i,
            topicId: qObj.topicId,
            topicName: topicMeta ? topicMeta.name : 'Kiến thức chung',
            level: levelName === 'easy' ? "🟢 Mức độ Dễ" : (levelName === 'medium' ? "🟡 Mức độ Trung bình" : "🔴 Mức độ Nâng cao"),
            q: qObj.q,
            options: qObj.options,
            correct: qObj.correct,
            explain: qObj.explain
        });
    }
    return list;
}

// Hàm khởi tạo danh sách 20 đề cho một mức độ và đợt đề (batchNum)
function buildSelfExamSetForLevel(lvl, batchNum = 1) {
    const arr = [];
    const lvlLabel = lvl === 'easy' ? 'Dễ' : (lvl === 'medium' ? 'Trung bình' : 'Nâng cao');
    const batchSuffix = batchNum > 1 ? ` (Bộ đề mới đợt #${batchNum})` : '';
    for (let d = 1; d <= 20; d++) {
        arr.push({
            id: `${lvl}_b${batchNum}_${d}`,
            examNum: d,
            batchNum: batchNum,
            level: lvl,
            title: `Đề số ${d} - 30 Câu Mức độ ${lvlLabel}${batchSuffix}`,
            questions: generateUnique30Questions(lvl, d, batchNum)
        });
    }
    return arr;
}

let selfPracticeExams = {
    easy: buildSelfExamSetForLevel('easy', 1),
    medium: buildSelfExamSetForLevel('medium', 1),
    hard: buildSelfExamSetForLevel('hard', 1)
};

// 15 Câu hỏi đặc thù dưới mỗi thí nghiệm
const labExercisesData = {
    spring: [
        { id: 1, level: "⭐ Cơ bản", q: "1. Biểu thức tần số góc của con lắc lò xo là:", options: ["A. $\\omega = \\sqrt{km}$", "B. $\\omega = \\sqrt{k/m}$", "C. $\\omega = \\sqrt{m/k}$", "D. $\\omega = 2\\pi\\sqrt{m/k}$"], correct: 1, explain: "$\\omega = \\sqrt{k/m}$." },
        { id: 2, level: "⭐ Cơ bản", q: "2. Chu kỳ dao động của con lắc lò xo tính bằng:", options: ["A. $T = 2\\pi\\sqrt{m/k}$", "B. $T = 2\\pi\\sqrt{k/m}$", "C. $T = \\sqrt{m/k}$", "D. $T = \\pi\\sqrt{m/k}$"], correct: 0, explain: "$T = 2\\pi\\sqrt{m/k}$." },
        { id: 3, level: "⭐ Cơ bản", q: "3. Vận tốc cực đại của con lắc lò xo là:", options: ["A. $v_{\\max} = \\omega A$", "B. $v_{\\max} = \\omega^2 A$", "C. $v_{\\max} = \\omega / A$", "D. $v_{\\max} = A / \\omega$"], correct: 0, explain: "$v_{\\max} = \\omega A$." },
        { id: 4, level: "⭐ Cơ bản", q: "4. Gia tốc cực đại của con lắc lò xo là:", options: ["A. $a_{\\max} = \\omega A$", "B. $a_{\\max} = \\omega^2 A$", "C. $a_{\\max} = \\omega A^2$", "D. $a_{\\max} = \\omega^2 A^2$"], correct: 1, explain: "$a_{\\max} = \\omega^2 A$." },
        { id: 5, level: "⭐ Cơ bản", q: "5. Cơ năng của con lắc lò xo là:", options: ["A. $W = 0.5kA$", "B. $W = 0.5kA^2$", "C. $W = kA^2$", "D. $0.5mv^2$"], correct: 1, explain: "$W = 0.5kA^2$." },
        { id: 6, level: "⭐⭐ Thông hiểu", q: "6. Lực kéo về tác dụng lên con lắc lò xo luôn hướng về:", options: ["A. biên dương", "B. biên âm", "C. vị trí cân bằng", "D. vô cực"], correct: 2, explain: "$F = -kx$ luôn hướng về VTCB." },
        { id: 7, level: "⭐⭐ Thông hiểu", q: "7. Quãng đường vật đi được trong một chu kỳ là:", options: ["A. $A$", "B. $2A$", "C. $3A$", "D. $4A$"], correct: 3, explain: "$S = 4A$." },
        { id: 8, level: "⭐⭐ Thông hiểu", q: "8. Khi khối lượng vật tăng gấp 4 lần thì chu kỳ con lắc lò xo sẽ:", options: ["A. tăng 2 lần", "B. tăng 4 lần", "C. giảm 2 lần", "D. không đổi"], correct: 0, explain: "$T \\propto \\sqrt{m}$ nên $m$ tăng 4 lần thì $T$ tăng 2 lần." },
        { id: 9, level: "⭐⭐ Thông hiểu", q: "9. Tại vị trí cân bằng của con lắc lò xo, độ lớn vận tốc đạt:", options: ["A. cực tiểu", "B. cực đại", "C. bằng 0", "D. không đổi"], correct: 1, explain: "Tại VTCB tốc độ đạt cực đại." },
        { id: 10, level: "⭐⭐ Thông hiểu", q: "10. Vị trí động năng bằng thế năng có li độ:", options: ["A. $x = \\pm A$", "B. $x = \\pm A/2$", "C. $x = \\pm A/\\sqrt{2}$", "D. $x = 0$"], correct: 2, explain: "$W_d = W_t \\implies x = \\pm A/\\sqrt{2}$." },
        { id: 11, level: "⭐⭐⭐ Vận dụng cao", q: "11. Lò xo có độ cứng $k$ cắt thành 2 nửa bằng nhau, độ cứng mỗi nửa là:", options: ["A. $0.5k$", "B. $k$", "C. $2k$", "D. $4k$"], correct: 2, explain: "Độ cứng tỉ lệ nghịch với chiều dài, cắt đôi thì độ cứng tăng gấp đôi." },
        { id: 12, level: "⭐⭐⭐ Vận dụng cao", q: "12. Hai lò xo ghép song song có độ cứng tương đương:", options: ["A. $k_1 + k_2$", "B. $k_1 k_2 / (k_1 + k_2)$", "C. $|k_1 - k_2|$", "D. $\\sqrt{k_1 k_2}$"], correct: 0, explain: "Ghép song song: $k = k_1 + k_2$." },
        { id: 13, level: "⭐⭐⭐ Vận dụng cao", q: "13. Thời gian ngắn nhất đi từ VTCB đến li độ $A/2$ là:", options: ["A. $T/4$", "B. $T/6$", "C. $T/8$", "D. $T/12$"], correct: 3, explain: "Thời gian từ VTCB đến $A/2$ là $T/12$." },
        { id: 14, level: "⭐⭐⭐ Vận dụng cao", q: "14. Hệ thức độc lập thời gian giữa $x$ và $v$ là:", options: ["A. $A^2 = x^2 + v^2/\\omega^2$", "B. $A = x + v$", "C. $x^2 + v^2 = 1$", "D. $v = \\omega x$"], correct: 0, explain: "$A^2 = x^2 + v^2/\\omega^2$." },
        { id: 15, level: "⭐⭐⭐ Vận dụng cao", q: "15. Đồ thị biểu diễn li độ theo thời gian của con lắc lò xo là:", options: ["A. đường thẳng", "B. parabol", "C. hình sin", "D. elip"], correct: 2, explain: "Đồ thị li độ theo thời gian là đường hình sin." }
    ],
    pendulum: [
        { id: 1, level: "⭐ Cơ bản", q: "1. Công thức tính chu kỳ con lắc đơn là:", options: ["A. $T = 2\\pi\\sqrt{g/l}$", "B. $T = 2\\pi\\sqrt{l/g}$", "C. $T = \\sqrt{l/g}$", "D. $T = 2\\pi l/g$"], correct: 1, explain: "$T = 2\\pi\\sqrt{l/g}$." },
        { id: 2, level: "⭐ Cơ bản", q: "2. Tần số góc của con lắc đơn là:", options: ["A. $\\omega = \\sqrt{l/g}$", "B. $\\omega = \\sqrt{g/l}$", "C. $\\omega = g/l$", "D. $\\omega = l/g$"], correct: 1, explain: "$\\omega = \\sqrt{g/l}$." },
        { id: 3, level: "⭐ Cơ bản", q: "3. Chu kỳ con lắc đơn KHÔNG phụ thuộc vào yếu tố nào?", options: ["A. Chiều dài dây treo", "B. Gia tốc trọng trường", "C. Khối lượng vật nặng", "D. Vị trí địa lý"], correct: 2, explain: "Chu kỳ con lắc đơn độc lập với khối lượng $m$." },
        { id: 4, level: "⭐ Cơ bản", q: "4. Cơ năng của con lắc đơn với biên độ góc nhỏ $\\alpha_0$ là:", options: ["A. $W = 0.5mgl\\alpha_0^2$", "B. $W = mgl\\alpha_0$", "C. $W = 0.5mv^2$", "D. $W = mgl$"], correct: 0, explain: "$W = 0.5mgl\\alpha_0^2$." },
        { id: 5, level: "⭐ Cơ bản", q: "5. Vận tốc cực đại của con lắc đơn là:", options: ["A. $v_{\\max} = \\omega l$", "B. $v_{\\max} = \\sqrt{gl}\\alpha_0$", "C. $v_{\\max} = g\\alpha_0$", "D. $v_{\\max} = \\omega \\alpha_0$"], correct: 1, explain: "$v_{\\max} = \\sqrt{gl}\\alpha_0$." },
        { id: 6, level: "⭐⭐ Thông hiểu", q: "6. Lực kéo về của con lắc đơn phụ thuộc vào li độ cong $s$ là:", options: ["A. $F = -mg s / l$", "B. $F = -ks$", "C. $F = -m\\omega^2 x$", "D. $F = -mg\\alpha$"], correct: 0, explain: "$F = -mg \\frac{s}{l}$." },
        { id: 7, level: "⭐⭐ Thông hiểu", q: "7. Lực căng dây treo con lắc đơn đạt cực đại tại vị trí:", options: ["A. Biên dương", "B. Biên âm", "C. Vị trí cân bằng", "D. Li độ bất kỳ"], correct: 2, explain: "Ở VTCB vận tốc lớn nhất nên lực căng lớn nhất." },
        { id: 8, level: "⭐⭐ Thông hiểu", q: "8. Lực căng dây treo con lắc đơn đạt cực tiểu tại vị trí:", options: ["A. Vị trí cân bằng", "B. Vị trí biên", "C. Li độ $A/2$", "D. Li độ $A/\\sqrt{2}$"], correct: 1, explain: "Ở biên vận tốc bằng 0 nên lực căng nhỏ nhất." },
        { id: 9, level: "⭐⭐ Thông hiểu", q: "9. Khi đưa con lắc đơn lên độ cao lớn (giả sử $g$ giảm), chu kỳ $T$ sẽ:", options: ["A. tăng lên", "B. giảm xuống", "C. không đổi", "D. bằng 0"], correct: 0, explain: "$g$ giảm thì $T$ tăng." },
        { id: 10, level: "⭐⭐ Thông hiểu", q: "10. Điều kiện để con lắc đơn dao động điều hòa là góc lệch $\\alpha_0$ phải nhỏ và:", options: ["A. bỏ qua ma sát", "B. khối lượng lớn", "C. dây treo rất dài", "D. không kể trọng lực"], correct: 0, explain: "Góc nhỏ và bỏ qua mọi ma sát." },
        { id: 11, level: "⭐⭐⭐ Vận dụng cao", q: "11. Nếu chiều dài con lắc đơn tăng 4 lần thì chu kỳ $T$ sẽ:", options: ["A. tăng 2 lần", "B. tăng 4 lần", "C. giảm 2 lần", "D. không đổi"], correct: 0, explain: "$T \\propto \\sqrt{l}$ nên tăng 4 lần thì $T$ tăng 2 lần." },
        { id: 12, level: "⭐⭐⭐ Vận dụng cao", q: "12. Con lắc đơn có chu kỳ đúng bằng $2\\text{ s}$ gọi là:", options: ["A. con lắc giây", "B. con lắc nhanh", "C. con lắc chậm", "D. con lắc cộng hưởng"], correct: 0, explain: "Con lắc có $T = 2\\text{ s}$ là con lắc giây." },
        { id: 13, level: "⭐⭐⭐ Vận dụng cao", q: "13. Con lắc đơn vướng đinh ở chính giữa dây khi qua VTCB, tỉ số chu kỳ trước và sau vướng đinh là:", options: ["A. $1$", "B. $\\sqrt{2}$", "C. $2$", "D. $0.5$"], correct: 1, explain: "Tỉ số $\\sqrt{l / (l/2)} = \\sqrt{2}$." },
        { id: 14, level: "⭐⭐⭐ Vận dụng cao", q: "14. Con lắc đơn trong thang máy đi lên nhanh dần đều, chu kỳ $T$ sẽ:", options: ["A. tăng", "B. giảm", "C. không đổi", "D. bằng 0"], correct: 1, explain: "Gia tốc hiệu dụng $g' = g + a > g$ nên $T$ giảm." },
        { id: 15, level: "⭐⭐⭐ Vận dụng cao", q: "15. Tổng chiều dài hai con lắc $l = l_1 + l_2$, hệ thức chu kỳ là:", options: ["A. $T = T_1 + T_2$", "B. $T^2 = T_1^2 + T_2^2$", "C. $T = \\sqrt{T_1 T_2}$", "D. $1/T = 1/T_1 + 1/T_2$"], correct: 1, explain: "Do $T^2 \\propto l$ nên $T^2 = T_1^2 + T_2^2$." }
    ],
    damped: [
        { id: 1, level: "⭐ Cơ bản", q: "1. Dao động tắt dần là dao động có đại lượng nào giảm theo thời gian?", options: ["A. Tần số", "B. Chu kỳ", "C. Biên độ và cơ năng", "D. Vận tốc cực đại"], correct: 2, explain: "Biên độ và cơ năng giảm dần do ma sát." },
        { id: 2, level: "⭐ Cơ bản", q: "2. Nguyên nhân chính gây ra dao động tắt dần thực tế là:", options: ["A. lực cản môi trường và ma sát", "B. biên độ ban đầu", "C. tần số ngoại lực", "D. khối lượng vật"], correct: 0, explain: "Do lực cản môi trường tiêu hao năng lượng." },
        { id: 3, level: "⭐ Cơ bản", q: "3. Cơ năng trong dao động tắt dần chuyển hóa thành:", options: ["A. nhiệt năng", "B. điện năng", "C. quang năng", "D. hóa năng"], correct: 0, explain: "Năng lượng tiêu hao biến thành nhiệt năng." },
        { id: 4, level: "⭐ Cơ bản", q: "4. Ứng dụng thực tế của dao động tắt dần là:", options: ["A. hộp đàn", "B. bộ giảm xóc xe ô tô", "C. đồng hồ quả lắc", "D. máy phát điện"], correct: 1, explain: "Bộ giảm xóc dùng lực cản để dập tắt dao động." },
        { id: 5, level: "⭐ Cơ bản", q: "5. Biên độ dao động tắt dần giảm theo thời gian theo hàm:", options: ["A. bậc nhất", "B. mũ", "C. sin", "D. logarit"], correct: 1, explain: "Biên độ giảm theo hàm số mũ." },
        { id: 6, level: "⭐⭐ Thông hiểu", q: "6. Để duy trì dao động tắt dần, người ta thường:", options: ["A. tăng khối lượng", "B. cung cấp năng lượng bù đúng phần tiêu hao sau mỗi chu kỳ", "C. tăng ma sát", "D. cắt ngắn lò xo"], correct: 1, explain: "Cung cấp đúng phần năng lượng hao hụt." },
        { id: 7, level: "⭐⭐ Thông hiểu", q: "7. Độ giảm biên độ sau mỗi chu kỳ trên mặt phẳng ngang hệ số $\\mu$ là:", options: ["A. $\\mu mg/k$", "B. $2\\mu mg/k$", "C. $4\\mu mg/k$", "D. $\\mu mg/2k$"], correct: 2, explain: "$\\Delta A = 4\\mu mg / k$." },
        { id: 8, level: "⭐⭐ Thông hiểu", q: "8. Số dao động $N$ thực hiện được trước khi dừng hẳn là:", options: ["A. $A_0 / \\Delta A$", "B. $\\Delta A / A_0$", "C. $A_0 \\Delta A$", "D. $2A_0 / \\Delta A$"], correct: 0, explain: "$N = A_0 / \\Delta A$." },
        { id: 9, level: "⭐⭐ Thông hiểu", q: "9. Môi trường nào gây tắt dần nhanh nhất?", options: ["A. Không khí thường", "B. Chân không", "C. Dầu nhớt đặc", "D. Khí loãng"], correct: 2, explain: "Dầu nhớt đặc có lực cản nhớt cực lớn." },
        { id: 10, level: "⭐⭐ Thông hiểu", q: "10. Biên độ giảm $10\\%$ sau một chu kỳ thì phần trăm cơ năng còn lại là:", options: ["A. $90\\%$", "B. $81\\%$", "C. $19\\%$", "D. $10\\%$"], correct: 1, explain: "$W \\propto A^2 \\implies (0.9)^2 = 0.81$ ($81\\%$)." },
        { id: 11, level: "⭐⭐⭐ Vận dụng cao", q: "11. Độ giảm biên độ sau mỗi nửa chu kỳ trên mặt phẳng ngang là:", options: ["A. $\\mu mg/k$", "B. $2\\mu mg/k$", "C. $4\\mu mg/k$", "D. $\\mu mg/2k$"], correct: 1, explain: "Mỗi nửa chu kỳ giảm $2\\mu mg / k$." },
        { id: 12, level: "⭐⭐⭐ Vận dụng cao", q: "12. Đồ thị biên độ theo thời gian của dao động tắt dần là:", options: ["A. đường thẳng", "B. đường cong ôm sát trục thời gian", "C. hình sin", "D. parabol"], correct: 1, explain: "Đường biên độ ôm sát trục thời gian." },
        { id: 13, level: "⭐⭐⭐ Vận dụng cao", q: "13. Con lắc đơn dao động trong không khí chịu lực cản nhỏ, chu kỳ so với chân không:", options: ["A. nhỏ hơn", "B. lớn hơn một chút không đáng kể", "C. không đổi", "D. gấp đôi"], correct: 1, explain: "Lực cản nhỏ làm chu kỳ tăng không đáng kể." },
        { id: 14, level: "⭐⭐⭐ Vận dụng cao", q: "14. Công suất cung cấp để duy trì dao động trong chu kỳ $T$ là:", options: ["A. $P = \\Delta W / T$", "B. $P = W \\times T$", "C. $P = W / T^2$", "D. $P = \\Delta W \\times T$"], correct: 0, explain: "$P = \\Delta W / T$." },
        { id: 15, level: "⭐⭐⭐ Vận dụng cao", q: "15. Mục đích khảo sát dao động tắt dần trong phòng thí nghiệm là:", options: ["A. tăng ma sát", "B. hiểu rõ sự suy giảm cơ năng dưới lực cản", "C. làm hỏng hệ", "D. tăng biên độ"], correct: 1, explain: "Hiểu rõ sự suy giảm cơ năng." }
    ],
    forced: [
        { id: 1, level: "⭐ Cơ bản", q: "1. Tần số của dao động cưỡng bức luôn bằng:", options: ["A. tần số riêng", "B. tần số ngoại lực cưỡng bức", "C. tổng tần số", "D. bằng 0"], correct: 1, explain: "Dao động cưỡng bức luôn có tần số bằng tần số ngoại lực." },
        { id: 2, level: "⭐ Cơ bản", q: "2. Hiện tượng cộng hưởng cơ xảy ra khi:", options: ["A. $\\Omega = \\omega_0$", "B. $\\Omega > \\omega_0$", "C. $\\Omega < \\omega_0$", "D. Biên độ ngoại lực bằng 0"], correct: 0, explain: "Cộng hưởng khi tần số ngoại lực bằng tần số riêng." },
        { id: 3, level: "⭐ Cơ bản", q: "3. Khi xảy ra cộng hưởng, biên độ dao động cưỡng bức đạt:", options: ["A. cực tiểu", "B. cực đại", "C. bằng 0", "D. không đổi"], correct: 1, explain: "Biên độ đạt giá trị lớn nhất." },
        { id: 4, level: "⭐ Cơ bản", q: "4. Ứng dụng có ích của hiện tượng cộng hưởng thấy ở:", options: ["A. hộp đàn guitar", "B. cầu sập do lính đi đều", "C. ô tô rung", "D. nhà cao tầng"], correct: 0, explain: "Hộp đàn cộng hưởng âm thanh." },
        { id: 5, level: "⭐ Cơ bản", q: "5. Tác hại nguy hiểm của cộng hưởng thấy ở:", options: ["A. máy thu thanh", "B. lính đi đều qua cầu", "C. giảm xóc", "D. con lắc"], correct: 1, explain: "Lính đi đều qua cầu có nguy cơ gây cộng hưởng sập cầu." },
        { id: 6, level: "⭐⭐ Thông hiểu", q: "6. Pha của dao động cưỡng bức khi có cộng hưởng là:", options: ["A. vuông pha ngoại lực", "B. ngược pha ngoại lực", "C. cùng pha ngoại lực", "D. lệch pha $\\pi/4$"], correct: 2, explain: "Khi cộng hưởng, dao động cưỡng bức cùng pha ngoại lực." },
        { id: 7, level: "⭐⭐ Thông hiểu", q: "7. Biên độ dao động cưỡng bức KHÔNG phụ thuộc vào:", options: ["A. biên độ ngoại lực", "B. lực cản môi trường", "C. pha ban đầu ngoại lực", "D. độ chênh lệch tần số"], correct: 2, explain: "Không phụ thuộc pha ban đầu ngoại lực." },
        { id: 8, level: "⭐⭐ Thông hiểu", q: "8. Nếu lực cản môi trường rất lớn thì hiện tượng cộng hưởng sẽ:", options: ["A. cực kỳ lớn", "B. không rõ nét, đỉnh thấp và bè rộng", "C. xảy ra ngay lập tức", "D. thay đổi tần số riêng"], correct: 1, explain: "Ma sát lớn làm đỉnh cộng hưởng thấp và bè rộng." },
        { id: 9, level: "⭐⭐ Thông hiểu", q: "9. Tần số riêng $f_0 = 5\\text{ Hz}$, ngoại lực biến thiên $5\\text{ Hz}$ tác dụng thì hệ:", options: ["A. tắt dần", "B. cộng hưởng", "C. triệt tiêu dao động", "D. giảm biên độ"], correct: 1, explain: "$f = f_0$ nên xảy ra cộng hưởng." },
        { id: 10, level: "⭐⭐ Thông hiểu", q: "10. Khi tần số ngoại lực rất lớn so với tần số riêng ($\\Omega \\gg \\omega_0$), biên độ cưỡng bức:", options: ["A. rất lớn", "B. bằng 0", "C. rất nhỏ gần bằng 0", "D. bằng biên độ ngoại lực"], correct: 2, explain: "Tần số rất lớn làm biên độ giảm rất nhỏ gần bằng 0." },
        { id: 11, level: "⭐⭐⭐ Vận dụng cao", q: "11. Mạch chọn sóng trong máy thu thanh dựa trên hiện tượng:", options: ["A. cảm ứng điện từ", "B. cộng hưởng điện từ", "C. tự cảm", "D. khúc xạ"], correct: 1, explain: "Dựa trên hiện tượng cộng hưởng điện từ." },
        { id: 12, level: "⭐⭐⭐ Vận dụng cao", q: "12. Đồ thị biểu diễn biên độ cưỡng bức theo tần số ngoại lực gọi là:", options: ["A. đặc trưng Volt - Ampe", "B. đường cong cộng hưởng", "C. sơ đồ khối", "D. hình sin"], correct: 1, explain: "Đó là đường cong cộng hưởng." },
        { id: 13, level: "⭐⭐⭐ Vận dụng cao", q: "13. Sau giai đoạn quá độ, hệ chịu ngoại lực tuần hoàn sẽ dao động ổn định với tần số bằng:", options: ["A. tần số riêng", "B. tần số ngoại lực", "C. tổng tần số", "D. hiệu tần số"], correct: 1, explain: "Dao động ổn định với tần số của ngoại lực." },
        { id: 14, level: "⭐⭐⭐ Vận dụng cao", q: "14. Khi cộng hưởng, năng lượng hệ hấp thụ từ ngoại lực đạt:", options: ["A. cực đại", "B. cực tiểu", "C. bằng 0", "D. trung bình"], correct: 0, explain: "Hệ hấp thụ năng lượng lớn nhất khi cộng hưởng." },
        { id: 15, level: "⭐⭐⭐ Vận dụng cao", q: "15. Khi thiết kế chi tiết máy trên ô tô, kỹ sư cần chú ý điều gì về cộng hưởng?", options: ["A. trùng khít tần số máy", "B. tránh để tần số riêng trùng tần số động cơ khi chạy thường", "C. không cần quan tâm", "D. làm chi tiết nặng gấp đôi"], correct: 1, explain: "Phải tránh trùng tần số để các chi tiết không bị rung gãy." }
    ]
};

// Nội dung lý thuyết cho từng thí nghiệm
const labTheoryData = {
    spring: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📌 Định nghĩa & Cấu tạo</h4>
                <p class="text-xs">Con lắc lò xo gồm vật nặng khối lượng $m$ gắn vào lò xo độ cứng $k$. Khi kéo vật khỏi vị trí cân bằng và thả nhẹ, hệ dao động điều hòa quanh vị trí cân bằng.</p>
            </div>
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📐 Công thức trọng tâm</h4>
                <ul class="list-disc list-inside text-xs space-y-1">
                    <li>Tần số góc: $\\omega = \\sqrt{\\frac{k}{m}}$</li>
                    <li>Chu kỳ: $T = 2\\pi\\sqrt{\\frac{m}{k}}$</li>
                    <li>Cơ năng: $W = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2 A^2$</li>
                </ul>
            </div>
        </div>
    `,
    pendulum: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📌 Định nghĩa & Cấu tạo</h4>
                <p class="text-xs">Con lắc đơn gồm vật nặng khối lượng $m$ treo vào đầu sợi dây mảnh dài $l$, dao động trong mặt phẳng thẳng đứng dưới tác dụng của trọng lực.</p>
            </div>
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📐 Công thức trọng tâm</h4>
                <ul class="list-disc list-inside text-xs space-y-1">
                    <li>Tần số góc: $\\omega = \\sqrt{\\frac{g}{l}}$</li>
                    <li>Chu kỳ: $T = 2\\pi\\sqrt{\\frac{l}{g}}$</li>
                    <li>Cơ năng: $W = \\frac{1}{2}mgl\\alpha_0^2$</li>
                </ul>
            </div>
        </div>
    `,
    damped: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📌 Bản chất dao động tắt dần</h4>
                <p class="text-xs">Biên độ giảm dần theo thời gian do lực cản và ma sát. Cơ năng chuyển hóa thành nhiệt năng.</p>
            </div>
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📐 Công thức trọng tâm</h4>
                <ul class="list-disc list-inside text-xs space-y-1">
                    <li>Biên độ theo thời gian: $A(t) = A_0 e^{-\\gamma t}$</li>
                    <li>Độ giảm biên độ sau mỗi chu kỳ: $\\Delta A = \\frac{4\\mu mg}{k}$</li>
                </ul>
            </div>
        </div>
    `,
    forced: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📌 Hiện tượng cộng hưởng</h4>
                <p class="text-xs">Xảy ra khi tần số ngoại lực bằng tần số riêng ($\\Omega = \\omega_0$). Lúc này biên độ dao động cưỡng bức đạt cực đại.</p>
            </div>
            <div class="p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2">
                <h4 class="font-bold text-cyan-400">📐 Công thức trọng tâm</h4>
                <ul class="list-disc list-inside text-xs space-y-1">
                    <li>Tần số cưỡng bức: $f = f_{\\text{ngoại lực}}$</li>
                    <li>Điều kiện cộng hưởng: $\\Omega = \\omega_0$</li>
                </ul>
            </div>
        </div>
    `
};
