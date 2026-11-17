// ================= MODULE: TRẠNG THÁI ỨNG DỤNG (STATE) =================

let currentLab = 'spring';
let selectedSelfLevel = null;
let activeSelfExamId = null;
let activeTeacherExamId = null;
let practiceSubMode = 'teacher';

// Trạng thái xác thực
let authMode = 'login';
let authRole = 'student';
let loggedInUser = null;

// Quản lý lớp học và tiến độ cho giáo viên
let teacherClasses = ['11C1', '11C2', '11C3'];
let activeSelectedClass = null;

let studentProgressData = [
    { name: "Nguyễn Văn An", classCode: "11C1", examTitle: "Đề kiểm tra 15 phút: Con lắc lò xo nâng cao", score: "8.5", time: "14 phút 20 giây" },
    { name: "Trần Thị Bình", classCode: "11C1", examTitle: "Đề kiểm tra 15 phút: Con lắc lò xo nâng cao", score: "9.2", time: "11 phút 05 giây" },
    { name: "Lê Hoàng Cường", classCode: "11C2", examTitle: "Đề kiểm tra 15 phút: Con lắc lò xo nâng cao", score: "6.8", time: "15 phút 00 giây" },
    { name: "Phạm Minh Thư", classCode: "11C3", examTitle: "Đề kiểm tra 15 phút: Con lắc lò xo nâng cao", score: "9.5", time: "10 phút 45 giây" }
];

// Thông số mô phỏng thí nghiệm
let simTime = 0;
let isPaused = false;
let paramA = 50;
let paramW = 5.0;
let paramPhi = 0.0;
let paramSpeed = 1.0;

// Lưu trữ lựa chọn và trạng thái nộp bài
let teacherExamChoices = {};
let teacherExamSubmitted = {};
let labUserChoices = {};
let labSubmitted = {};
let studentExamChoices = {};
let studentExamSubmitted = {};

// Theo dõi đợt đề hiện tại (Batch) của từng mức độ (mỗi đợt 20 đề)
let selfExamBatch = {
    easy: 1,
    medium: 1,
    hard: 1
};

// Lưu kết quả điểm số và phân tích câu sai của học sinh ở từng đề
// Cấu trúc: { [examId]: { examId, examNum, batchNum, level, title, score, correctCount, totalQ, submittedAt, wrongTopics: { [topicId]: count } } }
let studentExamResults = {};
