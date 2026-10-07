// data-store.js - Dữ liệu cốt lõi cho Web Học Tập Phenikaa K20 AI
// Bao gồm: 122 tiết học (tien-do.csv), Lịch học từ cổng (64 buổi), Ngân hàng câu hỏi, Flashcards và Bug Hunter

export const APP_USER = {
  name: "Vàng Văn Thuận",
  university: "Đại học Phenikaa",
  cohort: "K20 (2026 - 2030)",
  major: "Trí tuệ nhân tạo (AI / ICT5)",
  classCode: "ICT5-2610210.01",
  targetGPA: "≥ 3.60 (Xuất sắc / Học bổng)",
  englishGoal: "8.5+ (Miễn TA1 + TA2)",
  englishTestDate: "2026-10-17T08:00:00"
};

export const SUBJECTS_MAP = {
  EN: {
    code: "FEL702075",
    name: "Tiếng Anh đầu vào & Cơ bản 1",
    shortName: "Tiếng Anh",
    credits: 2,
    color: "#ec4899",
    bgColor: "#fdf2f8",
    badgeColor: "#f472b6",
    targetScore: "8.5+ (Miễn TA1+TA2)",
    lecturer: "Chưa công bố ca thi (Dự kiến tòa A6, 17-18/10/2026)",
    room: "A6 - Phenikaa",
    icon: "fa-language",
    totalSessions: 24,
    description: "50 câu / 60 phút (Nghe 10, Ngữ pháp 15, Từ vựng 15, Đọc hiểu 10). Miễn TA1 (6.0-8.4), miễn TA1+TA2 (8.5-10.0)."
  },
  GT: {
    code: "FFS703080",
    name: "Giải tích 1",
    shortName: "Giải tích 1",
    credits: 3,
    color: "#0284c7",
    bgColor: "#f0f9ff",
    badgeColor: "#38bdf8",
    targetScore: "≥ 8.5 (Điểm A/A+)",
    lecturer: "Nguyễn Đức Ngà",
    room: "A4-102",
    icon: "fa-infinity",
    totalSessions: 32,
    description: "Giới hạn, vô cùng bé tương đương, đạo hàm, khảo sát hàm số, tích phân và ứng dụng."
  },
  IT: {
    code: "CSE702040",
    name: "Nhập môn CNTT & Lập trình C",
    shortName: "Nhập môn CNTT",
    credits: 2,
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
    badgeColor: "#a78bfa",
    targetScore: "≥ 9.0 (Điểm A+)",
    lecturer: "Nguyễn Thành Trung",
    room: "A1-701",
    icon: "fa-laptop-code",
    totalSessions: 20,
    description: "Kiến trúc máy tính, hệ đếm, Pointer & RAM, Array, Struct, Linux, Python cơ bản."
  },
  VL: {
    code: "FFS703013",
    name: "Vật lý 1",
    shortName: "Vật lý 1",
    credits: 3,
    color: "#f59e0b",
    bgColor: "#fffbeb",
    badgeColor: "#fbbf24",
    targetScore: "≥ 8.0 (Điểm B+/A)",
    lecturer: "Trần Minh Tiến",
    room: "A5-303",
    icon: "fa-atom",
    totalSessions: 28,
    description: "Cơ học Newton, chuyển động, ma sát, cơ năng, xung lượng, nhiệt học và nguyên lý I, II."
  },
  PL: {
    code: "FFS702001",
    name: "Pháp luật đại cương",
    shortName: "Pháp luật",
    credits: 2,
    color: "#10b981",
    bgColor: "#ecfdf5",
    badgeColor: "#34d399",
    targetScore: "≥ 9.0 (Điểm A+)",
    lecturer: "Bộ môn Pháp luật",
    room: "Theo lịch trường",
    icon: "fa-scale-balanced",
    totalSessions: 18,
    description: "Bản chất nhà nước, hệ thống pháp luật, vi phạm, trách nhiệm pháp lý, luật dân sự và hình sự."
  }
};

// 122 Tiết học tự học trích xuất chính xác từ tien-do.csv
export const DEFAULT_SESSIONS = [
  // GIẢI TÍCH 1 (32 tiết)
  { subject: "GT", code: "GT01", title: "Chẩn đoán nền", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT02", title: "Ngoặc và phân thức", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT03", title: "Lượng giác cần dùng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT04", title: "Hàm, đồ thị, dãy", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT05", title: "Giới hạn trực tiếp", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT06", title: "0/0 bằng nhân tử", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT07", title: "0/0 bằng liên hợp", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT08", title: "Vô cực và một phía", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT09", title: "Giới hạn sin", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT10", title: "Giới hạn tan và cos", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT11", title: "Giới hạn mũ và log", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT12", title: "Vô cùng bé tương đương", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT13", title: "Test giới hạn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT14", title: "Liên tục và tham số", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT15", title: "Định nghĩa đạo hàm", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT16", title: "Quy tắc đạo hàm", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT17", title: "Đạo hàm hàm hợp", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT18", title: "Đạo hàm cấp cao và hàm ẩn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT19", title: "L’Hôpital có điều kiện", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT20", title: "Định lý giá trị trung bình", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT21", title: "Đơn điệu", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT22", title: "Cực trị và GTLN/GTNN", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT23", title: "Lồi lõm và khảo sát", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT24", title: "Bài toán tối ưu", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT25", title: "Nguyên hàm", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT26", title: "Tích phân xác định", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT27", title: "Đổi biến", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT28", title: "Từng phần", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT29", title: "Tích phân hữu tỉ và lượng giác", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT30", title: "Ứng dụng tích phân", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT31", title: "Đề tự luyện tổng hợp 1", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "GT", code: "GT32", title: "Đề tự luyện tổng hợp 2", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },

  // VẬT LÝ 1 (28 tiết)
  { subject: "VL", code: "VL01", title: "SI và kiểm tra đơn vị", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL02", title: "Vector và chiếu trục", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL03", title: "Đồ thị x–v–a", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL04", title: "Chuyển động thẳng và rơi", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL05", title: "Ném và chuyển động phẳng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL06", title: "Chuyển động tròn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL07", title: "Newton và sơ đồ lực", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL08", title: "Ma sát và mặt nghiêng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL09", title: "Hệ vật và liên kết", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL10", title: "Công và công suất", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL11", title: "Động năng và định lý công", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL12", title: "Thế năng và cơ năng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL13", title: "Động lượng và xung lượng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL14", title: "Va chạm", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL15", title: "Test cơ học nền", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL16", title: "Mômen và cân bằng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL17", title: "Quay vật rắn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL18", title: "Dao động", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL19", title: "Nhiệt độ và nhiệt lượng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL20", title: "Khí lý tưởng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL21", title: "Các quá trình khí", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL22", title: "Nguyên lý I nhiệt động lực học", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL23", title: "Động cơ nhiệt và nguyên lý II", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL24", title: "Sai số đo", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL25", title: "Bảng dữ liệu và đồ thị", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL26", title: "Viết báo cáo thực hành", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL27", title: "Đề tự luyện cơ–nhiệt", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "VL", code: "VL28", title: "Ôn tổng hợp và lỗi", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },

  // NHẬP MÔN CNTT & C (20 tiết)
  { subject: "IT", code: "IT01", title: "Chẩn đoán và tổng quan", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT02", title: "Bit, byte, hệ đếm", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT03", title: "Mã hóa dữ liệu", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT04", title: "CPU và bộ nhớ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT05", title: "Hệ điều hành và file", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT06", title: "Mạng và Internet", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT07", title: "Web và dịch vụ số", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT08", title: "An toàn số", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT09", title: "Nghề nghiệp, đạo đức và xã hội", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT10", title: "Thuật toán và lưu đồ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT11", title: "Linux: đường dẫn và file", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT12", title: "Linux: quyền và quy trình", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT13", title: "Python: biến và dữ liệu", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT14", title: "Python: điều kiện", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT15", title: "Python: vòng lặp", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT16", title: "Python: hàm và danh sách", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT17", title: "Dữ liệu file/CSV", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT18", title: "Lab theo đề lớp", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT19", title: "Chuyển đổi số và xu hướng công nghệ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "IT", code: "IT20", title: "Ôn nền + thực hành", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },

  // PHÁP LUẬT ĐẠI CƯƠNG (18 tiết)
  { subject: "PL", code: "PL01", title: "Nhà nước: nguồn gốc và bản chất", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL02", title: "Chức năng và hình thức nhà nước", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL03", title: "Bộ máy nhà nước", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL04", title: "Pháp luật: khái niệm và đặc trưng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL05", title: "Quy phạm pháp luật", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL06", title: "Văn bản và hiệu lực", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL07", title: "Quan hệ pháp luật", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL08", title: "Vi phạm pháp luật", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL09", title: "Trách nhiệm pháp lý", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL10", title: "Hiến pháp và quyền cơ bản", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL11", title: "Pháp luật hành chính", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL12", title: "Dân sự: tài sản và chủ thể", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL13", title: "Hợp đồng và nghĩa vụ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL14", title: "Lao động", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL15", title: "Hình sự", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL16", title: "Hôn nhân gia đình", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL17", title: "Phòng chống tham nhũng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "PL", code: "PL18", title: "Test tổng hợp và sửa bẫy", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },

  // TIẾNG ANH (24 tiết)
  { subject: "EN", code: "EN01", title: "Chẩn đoán nghe–ngữ pháp–từ vựng–đọc", status: "Đã hoàn thành", date: "2026-10-07", result: "Grammar 3/8; vocabulary 3/5; reading 4/5; listening 2/4 sau 2 lượt", mistakes: "Dạng động từ và do/does; cụm từ; nghe ký hiệu email; đọc điều kiện/ngoại lệ", note: "Chẩn đoán ban đầu. Cần ưu tiên luyện nghe số/email và chia động từ." },
  { subject: "EN", code: "EN02", title: "To be, đại từ, sở hữu", status: "Đang học", date: "2026-10-07", result: "Khẳng định 4/4; phủ định 2/2 câu mới; chưa kiểm tra nhớ lâu", mistakes: "Viết hoa đầu câu; ôn +1/+3/+7 ngày; câu hỏi/dạng rút gọn/đại từ/sở hữu chưa luyện", note: "Đang luyện thể phủ định và câu hỏi. Chú ý rút gọn aren't, isn't." },
  { subject: "EN", code: "EN03", title: "Hiện tại đơn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN04", title: "Hiện tại tiếp diễn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN05", title: "Quá khứ đơn", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN06", title: "Tương lai nền", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN07", title: "Mạo từ và lượng từ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN08", title: "So sánh và từ loại", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN09", title: "Giới từ và liên từ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN10", title: "Modal verbs", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN11", title: "V-ing/to-V", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN12", title: "Test ngữ pháp nền", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN13", title: "Hiện tại hoàn thành", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN14", title: "Bị động", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN15", title: "Mệnh đề quan hệ", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN16", title: "Điều kiện và cấu trúc mở rộng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN17", title: "Nghe số, giờ, ngày và thông tin", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN18", title: "Nghe hội thoại và ý chính", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN19", title: "Đọc tìm chi tiết", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN20", title: "Đọc điền từ và từ vựng", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN21", title: "Đề tự luyện A (50 câu / 60 phút)", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN22", title: "Sửa đề A", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN23", title: "Đề tự luyện B (50 câu / 60 phút)", status: "Chưa học", date: "", result: "", mistakes: "", note: "" },
  { subject: "EN", code: "EN24", title: "Sửa đề B và chuẩn bị thi", status: "Chưa học", date: "", result: "", mistakes: "", note: "" }
];

// Thời khóa biểu mẫu chính thức từ ngày 02/11/2026 (Phenikaa K20)
export const SCHEDULE_SAMPLE = [
  { date: "2026-11-02", subject: "Chạy 1", room: "Sân thể thao", teacher: "Nguyễn Hà My", start: "09:30", end: "12:10", period: "Tiết 4 - 6" },
  { date: "2026-11-03", subject: "Giải tích 1", room: "A4-102", teacher: "Nguyễn Đức Ngà", start: "09:30", end: "12:10", period: "Tiết 4 - 6" },
  { date: "2026-11-05", subject: "Nhập môn CNTT", room: "A1-701", teacher: "Nguyễn Thành Trung", start: "06:45", end: "09:25", period: "Tiết 1 - 3" },
  { date: "2026-11-09", subject: "Vật lý 1", room: "A5-303", teacher: "Trần Minh Tiến", start: "06:45", end: "09:25", period: "Tiết 1 - 3" },
  { date: "2026-11-10", subject: "Giải tích 1", room: "A4-102", teacher: "Nguyễn Đức Ngà", start: "09:30", end: "12:10", period: "Tiết 4 - 6" },
  { date: "2026-11-12", subject: "Nhập môn CNTT", room: "A1-701", teacher: "Nguyễn Thành Trung", start: "06:45", end: "09:25", period: "Tiết 1 - 3" },
  { date: "2026-11-16", subject: "Vật lý 1", room: "A5-303", teacher: "Trần Minh Tiến", start: "06:45", end: "09:25", period: "Tiết 1 - 3" },
  { date: "2026-11-17", subject: "Giải tích 1", room: "A4-102", teacher: "Nguyễn Đức Ngà", start: "09:30", end: "12:10", period: "Tiết 4 - 6" }
];

// Dữ liệu Spaced Repetition Flashcards (Học ngắt quãng 1 / 3 / 7 ngày)
export const DEFAULT_FLASHCARDS = [
  {
    id: "fc-en-1",
    subject: "EN",
    topic: "Ngữ pháp To Be",
    front: "Cấu trúc phủ định với 'to be' trong tiếng Anh là gì?",
    back: "S + am / is / are + not + O/Adj\nVí dụ: He is not (isn't) a student.\n* Lưu ý: 'am not' không viết tắt là amn't mà giữ nguyên 'am not' hoặc 'I'm not'.",
    interval: 1,
    nextReview: "2026-10-08",
    mastery: 2
  },
  {
    id: "fc-en-2",
    subject: "EN",
    topic: "Ký hiệu phát âm Email",
    front: "Trong đọc địa chỉ email, ký hiệu '@' và '.' phát âm là gì?",
    back: "'@' đọc là 'at'\n'.' đọc là 'dot'\nVí dụ: john.smith@gmail.com đọc là: 'john dot smith at gmail dot com'.",
    interval: 3,
    nextReview: "2026-10-09",
    mastery: 1
  },
  {
    id: "fc-gt-1",
    subject: "GT",
    topic: "Vô cùng bé tương đương",
    front: "Khi x → 0, sin(x) và 1 - cos(x) tương đương với đại lượng nào?",
    back: "Khi x → 0:\n1) sin(x) ~ x\n2) 1 - cos(x) ~ x² / 2\n3) tan(x) ~ x\n4) ln(1 + x) ~ x\n* Cực kỳ quan trọng khi khử dạng 0/0 mà không cần L'Hôpital!",
    interval: 1,
    nextReview: "2026-10-08",
    mastery: 2
  },
  {
    id: "fc-gt-2",
    subject: "GT",
    topic: "Giới hạn dạng 0/0 có căn",
    front: "Phương pháp chuẩn để khử dạng 0/0 khi tử hoặc mẫu có căn bậc 2 là gì?",
    back: "Nhân lượng liên hợp:\n(√A - B)(√A + B) = A - B²\n* Chú ý bẫy: Khi đổi dấu sau khi nhân liên hợp, phải đổi dấu TOÀN BỘ biểu thức trong ngoặc!",
    interval: 3,
    nextReview: "2026-10-10",
    mastery: 1
  },
  {
    id: "fc-c-1",
    subject: "IT",
    topic: "Con trỏ & Địa chỉ RAM",
    front: "Trong C, toán tử '&' và '*' khác nhau như thế nào?",
    back: "- '&x': Toán tử lấy địa chỉ của biến x trong RAM.\n- '*p': Toán tử giải tham chiếu (dereference) - lấy giá trị tại ô nhớ mà con trỏ p đang trỏ tới.\nVí dụ: int x = 10; int *p = &x; thì *p chính là 10.",
    interval: 1,
    nextReview: "2026-10-08",
    mastery: 2
  },
  {
    id: "fc-c-2",
    subject: "IT",
    topic: "Lỗi kinh điển scanf trong C",
    front: "Lỗi sai trong câu lệnh: scanf(\"%d\", a); với int a; là gì?",
    back: "Thiếu toán tử địa chỉ '&'!\nPhải viết đúng là: scanf(\"%d\", &a);\nGiải thích: scanf cần biết ĐỊA CHỈ ô nhớ của 'a' trong RAM để ghi giá trị người dùng nhập vào.",
    interval: 1,
    nextReview: "2026-10-08",
    mastery: 3
  },
  {
    id: "fc-vl-1",
    subject: "VL",
    topic: "Định lý biến thiên động năng",
    front: "Phát biểu và công thức Định lý động năng trong Vật lý 1?",
    back: "Độ biến thiên động năng của một vật bằng tổng công của các ngoại lực tác dụng lên vật:\nΔWđ = Wđ₂ - Wđ₁ = A_ngoại_lực\nHay: ½mv₂² - ½mv₁² = F · s · cos(α)",
    interval: 7,
    nextReview: "2026-10-14",
    mastery: 0
  },
  {
    id: "fc-pl-1",
    subject: "PL",
    topic: "Cơ cấu quy phạm pháp luật",
    front: "Một quy phạm pháp luật hoàn chỉnh thường gồm 3 bộ phận nào?",
    back: "1. Giả định (Ai? Trong hoàn cảnh, điều kiện nào?)\n2. Quy định (Được làm gì? Phải làm gì? Không được làm gì?)\n3. Chế tài (Hậu quả pháp lý bất lợi nếu vi phạm)",
    interval: 7,
    nextReview: "2026-10-14",
    mastery: 0
  }
];

// Game Mini: "Bắt bọ Code C" (C Bug Hunter) - Rèn tư duy logic bắt lỗi kinh điển
export const BUG_HUNTER_LEVELS = [
  {
    id: 1,
    title: "Level 1: Nhập dữ liệu cơ bản",
    instruction: "Đoạn code sau đây bị lỗi runtime khi người dùng nhập số. Hãy bấm vào dòng bị lỗi!",
    codeLines: [
      "#include <stdio.h>",
      "int main() {",
      "    int age;",
      "    printf(\"Nhap tuoi cua ban: \");",
      "    scanf(\"%d\", age);",
      "    printf(\"Tuoi: %d\\n\", age);",
      "    return 0;",
      "}"
    ],
    bugLineIndex: 4, // 0-based
    explanation: "Dòng 5: scanf(\"%d\", age); thiếu dấu '&'. Phải là &age để truyền địa chỉ ô nhớ vào hàm scanf."
  },
  {
    id: 2,
    title: "Level 2: So sánh điều kiện",
    instruction: "Đoạn code sau luôn in ra 'Pass' dù điểm là bao nhiêu! Tìm dòng lỗi.",
    codeLines: [
      "#include <stdio.h>",
      "int main() {",
      "    float gpa = 2.5;",
      "    if (gpa = 4.0) {",
      "        printf(\"Xuat sac!\\n\");",
      "    } else {",
      "        printf(\"Can co gang them\\n\");",
      "    }",
      "    return 0;",
      "}"
    ],
    bugLineIndex: 3,
    explanation: "Dòng 4: 'if (gpa = 4.0)' là phép GÁN chứ không phải SO SÁNH! Trong C, phép gán trả về 4.0 (khác 0 nên luôn true). Phải dùng '=='!"
  },
  {
    id: 3,
    title: "Level 3: Con trỏ hoang dã (Wild Pointer)",
    instruction: "Chương trình bị Segmentation Fault (Crash app) ngay lập tức. Dòng nào gây lỗi?",
    codeLines: [
      "#include <stdio.h>",
      "int main() {",
      "    int *ptr;",
      "    *ptr = 100;",
      "    printf(\"Gia tri: %d\\n\", *ptr);",
      "    return 0;",
      "}"
    ],
    bugLineIndex: 3,
    explanation: "Dòng 4: '*ptr = 100;' ghi dữ liệu vào một con trỏ chưa được khởi tạo (Wild Pointer). ptr trỏ tới vùng nhớ rác ngẫu nhiên gây Segmentation Fault!"
  },
  {
    id: 4,
    title: "Level 4: Vòng lặp vô tận (Infinite Loop)",
    instruction: "Vòng lặp sau chạy mãi không dừng. Dòng nào là thủ phạm?",
    codeLines: [
      "#include <stdio.h>",
      "int main() {",
      "    int i = 0;",
      "    while (i < 10); {",
      "        printf(\"i = %d\\n\", i);",
      "        i++;",
      "    }",
      "    return 0;",
      "}"
    ],
    bugLineIndex: 3,
    explanation: "Dòng 4: Dấu chấm phẩy ';' thừa ngay sau 'while (i < 10);' biến vòng lặp thành thân rỗng, khiến i không bao giờ tăng và lặp vô hạn!"
  }
];

// Ngân hàng câu hỏi trắc nghiệm & mô phỏng kỳ thi
export const QUIZ_QUESTIONS = {
  // ĐỀ THI TIẾNG ANH ĐẦU VÀO PHENIKAA (Chuẩn 50 câu mô phỏng 60 phút)
  EN_ENTRANCE: [
    {
      id: "en-q1",
      section: "Nghe (Listening)",
      question: "Audio clip mô tả: 'Please send your resume to alex dot turner at phenikaa-uni dot edu dot vn'. Địa chỉ email chính xác là gì?",
      options: [
        "A. alex_turner@phenikaa-uni.edu.vn",
        "B. alex.turner@phenikaa-uni.edu.vn",
        "C. alex-turner@phenikaa.edu.vn",
        "D. alexturner@phenikaa-uni.com"
      ],
      correctIndex: 1,
      explanation: "Trong tiếng Anh: 'dot' = '.', 'at' = '@'. Vậy 'alex dot turner at phenikaa-uni dot edu dot vn' chính là alex.turner@phenikaa-uni.edu.vn."
    },
    {
      id: "en-q2",
      section: "Ngữ pháp (Grammar)",
      question: "Chọn từ thích hợp: 'Neither John nor his friends _____ ready for the final exam.'",
      options: [
        "A. is",
        "B. are",
        "C. was",
        "D. be"
      ],
      correctIndex: 1,
      explanation: "Quy tắc hòa hợp chủ vị: Với cấu trúc 'Neither A nor B', động từ chia theo chủ ngữ gần nhất (B = his friends - số nhiều) → chọn 'are'."
    },
    {
      id: "en-q3",
      section: "Ngữ pháp (Grammar)",
      question: "Chọn dạng đúng của to be: 'Look! There _____ three students waiting outside the dean's office.'",
      options: [
        "A. is",
        "B. are",
        "C. was",
        "D. be"
      ],
      correctIndex: 1,
      explanation: "Chủ ngữ thật theo sau 'There are' là 'three students' (danh từ số nhiều) nên động từ to be ở hiện tại là 'are'."
    },
    {
      id: "en-q4",
      section: "Từ vựng (Vocabulary)",
      question: "Chọn từ đồng nghĩa với 'crucial' trong ngữ cảnh: 'Good time management is crucial for freshman students.'",
      options: [
        "A. optional",
        "B. essential",
        "C. minor",
        "D. complicated"
      ],
      correctIndex: 1,
      explanation: "'Crucial' có nghĩa là 'vô cùng quan trọng, thiết yếu' = 'essential'."
    },
    {
      id: "en-q5",
      section: "Từ vựng (Vocabulary)",
      question: "Hoàn thành câu: 'Artificial Intelligence will _____ a significant role in modern healthcare.'",
      options: [
        "A. make",
        "B. play",
        "C. take",
        "D. do"
      ],
      correctIndex: 1,
      explanation: "Collocation chuẩn: 'play a role in...' (đóng một vai trò trong...)."
    },
    {
      id: "en-q6",
      section: "Đọc hiểu (Reading)",
      question: "Đoạn văn ngắn: 'Phenikaa University requires all K20 students to take the placement test. Scoring 8.5 or higher exempts students from both English 1 and English 2.'\nCâu hỏi: Điều kiện để sinh viên được miễn cả hai học phần Tiếng Anh 1 và 2 là gì?",
      options: [
        "A. Đạt từ 6.0 đến 8.4 điểm",
        "B. Đạt từ 8.5 điểm trở lên",
        "C. Chỉ cần tham gia kỳ thi xếp lớp",
        "D. Có chứng chỉ tiếng Anh bất kỳ"
      ],
      correctIndex: 1,
      explanation: "Đoạn văn nêu rõ: 'Scoring 8.5 or higher exempts students from both English 1 and English 2'."
    }
  ],

  // BÀI TẬP GIẢI TÍCH 1
  GT_LIMITS: [
    {
      id: "gt-q1",
      question: "Tính giới hạn: \\( L = \\lim_{x \\to 0} \\frac{\\sin(3x)}{x} \\)",
      options: [
        "A. 0",
        "B. 1",
        "C. 3",
        "D. Vô cùng lớn"
      ],
      correctIndex: 2,
      explanation: "Khi x → 0, sin(3x) ~ 3x. Do đó: lim (sin 3x)/x = lim (3x)/x = 3."
    },
    {
      id: "gt-q2",
      question: "Tính giới hạn dạng 0/0: \\( L = \\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} \\)",
      options: [
        "A. 0",
        "B. 2",
        "C. 4",
        "D. Không xác định"
      ],
      correctIndex: 2,
      explanation: "Phân tích nhân tử: (x² - 4)/(x - 2) = (x - 2)(x + 2)/(x - 2) = x + 2. Khi x → 2 thì L = 2 + 2 = 4."
    },
    {
      id: "gt-q3",
      question: "Tính giới hạn liên hợp: \\( L = \\lim_{x \\to 0} \\frac{\\sqrt{1 + x} - 1}{x} \\)",
      options: [
        "A. 1/2",
        "B. 1",
        "C. 0",
        "D. 2"
      ],
      correctIndex: 0,
      explanation: "Nhân liên hợp với (√(1+x) + 1): Tử số thành (1+x - 1) = x. Rút gọn x ở mẫu, còn lại 1/(√(1+x) + 1). Khi x → 0 ta được 1/(1+1) = 1/2."
    }
  ],

  // BÀI TẬP LẬP TRÌNH C
  IT_C: [
    {
      id: "c-q1",
      question: "Cho đoạn code C:\nint a = 5;\nint *p = &a;\n*p = 20;\nGiá trị của biến 'a' sau lệnh trên là bao nhiêu?",
      options: [
        "A. 5",
        "B. 20",
        "C. Địa chỉ của a",
        "D. Lỗi biên dịch"
      ],
      correctIndex: 1,
      explanation: "Con trỏ 'p' giữ địa chỉ của biến 'a'. Phép gán '*p = 20' can thiệp trực tiếp vào ô nhớ mà p trỏ tới (chính là ô nhớ của a), do đó a nhận giá trị 20."
    },
    {
      id: "c-q2",
      question: "Kích thước (sizeof) của một con trỏ kiểu int (int*) trên hệ điều hành 64-bit thường là bao nhiêu bytes?",
      options: [
        "A. 2 bytes",
        "B. 4 bytes",
        "C. 8 bytes",
        "D. Tùy thuộc vào giá trị biến trỏ tới"
      ],
      correctIndex: 2,
      explanation: "Trên kiến trúc 64-bit, tất cả con trỏ (int*, char*, double*) đều có kích thước 8 bytes (64 bits) để trỏ đến toàn bộ không gian địa chỉ RAM."
    }
  ]
};
