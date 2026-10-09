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
  ],

  // BÀI TẬP VẬT LÝ 1 (CƠ HỌC & NHIỆT HỌC)
  VL_PHYSICS: [
    {
      id: "vl-q1",
      question: "Một vật có khối lượng m = 2 kg trượt thẳng đều trên mặt phẳng ngang dưới tác dụng của lực kéo F = 10 N theo phương ngang. Lấy g = 10 m/s². Hệ số ma sát trượt μ giữa vật và mặt sàn là bao nhiêu?",
      options: [
        "A. 0.2",
        "B. 0.5",
        "C. 0.8",
        "D. 1.0"
      ],
      correctIndex: 1,
      explanation: "Vật chuyển động thẳng đều nên gia tốc a = 0. Chiếu lên phương ngang: F - F_ms = 0 => F_ms = F = 10 N. Mặt khác F_ms = μ * N = μ * m * g => μ = 10 / (2 * 10) = 0.5."
    },
    {
      id: "vl-q2",
      question: "Hai vật va chạm hoàn toàn mềm (dính vào nhau sau va chạm). Đại lượng nào sau đây luôn được bảo toàn trong hệ cô lập?",
      options: [
        "A. Tổng cơ năng của hệ",
        "B. Tổng động lượng của hệ",
        "C. Tổng động năng của hệ",
        "D. Cả động năng và cơ năng"
      ],
      correctIndex: 1,
      explanation: "Trong va chạm mềm, chỉ có tổng động lượng của hệ được bảo toàn. Động năng một phần đã biến thành nhiệt lượng làm biến dạng hai vật."
    },
    {
      id: "vl-q3",
      question: "Khối khí lý tưởng nhận một nhiệt lượng Q = 120 J và đồng thời dãn nở thực hiện công A' = 50 J chống lại ngoại lực. Độ biến thiên nội năng ΔU của khối khí là:",
      options: [
        "A. 170 J",
        "B. 70 J",
        "C. -70 J",
        "D. 60 J"
      ],
      correctIndex: 1,
      explanation: "Theo Nguyên lý I Nhiệt động lực học: ΔU = Q + A (với A là công khí nhận được). Do khí thực hiện công A' = 50 J nên A = -50 J. Vậy ΔU = 120 + (-50) = 70 J."
    }
  ],

  // BÀI TẬP PHÁP LUẬT ĐẠI CƯƠNG
  PL_LAW: [
    {
      id: "pl-q1",
      question: "Theo quan điểm Chủ nghĩa Mác - Lênin, Nhà nước xuất hiện do nguyên nhân trực tiếp nào sau đây?",
      options: [
        "A. Thượng đế và thần linh sắp đặt trật tự xã hội",
        "B. Xuất hiện chế độ tư hữu và mâu thuẫn giai cấp đối kháng không thể điều hòa",
        "C. Nhu cầu liên kết của các thị tộc chống thiên tai",
        "D. Thỏa thuận khế ước giữa công dân và vua chúa"
      ],
      correctIndex: 1,
      explanation: "Chủ nghĩa Mác - Lênin khẳng định: Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa, xuất hiện khi có chế độ tư hữu tư liệu sản xuất."
    },
    {
      id: "pl-q2",
      question: "Bộ phận nào của quy phạm pháp luật chỉ ra biện pháp cưỡng chế hoặc hậu quả pháp lý bất lợi mà Nhà nước áp dụng đối với chủ thể vi phạm?",
      options: [
        "A. Giả định",
        "B. Quy định",
        "C. Chế tài",
        "D. Áp dụng pháp luật"
      ],
      correctIndex: 2,
      explanation: "Quy phạm pháp luật gồm 3 thành tố: Giả định (hoàn cảnh), Quy định (mệnh lệnh hành vi) và Chế tài (hậu quả bất lợi/trừng phạt khi vi phạm)."
    },
    {
      id: "pl-q3",
      question: "Theo Bộ luật Hình sự Việt Nam hiện hành, người từ đủ bao nhiêu tuổi trở lên phải chịu trách nhiệm hình sự về MỌI tội phạm?",
      options: [
        "A. Từ đủ 14 tuổi",
        "B. Từ đủ 16 tuổi",
        "C. Từ đủ 18 tuổi",
        "D. Từ đủ 20 tuổi"
      ],
      correctIndex: 1,
      explanation: "Điều 12 BLHS: Người từ đủ 16 tuổi trở lên phải chịu trách nhiệm hình sự về mọi tội phạm. Người từ đủ 14 đến dưới 16 chỉ chịu trách nhiệm về tội rất nghiêm trọng hoặc đặc biệt nghiêm trọng."
    }
  ]
};

// Aliases cho 5 môn học chính
QUIZ_QUESTIONS.EN = QUIZ_QUESTIONS.EN_ENTRANCE;
QUIZ_QUESTIONS.GT = QUIZ_QUESTIONS.GT_LIMITS;
QUIZ_QUESTIONS.IT = QUIZ_QUESTIONS.IT_C;
QUIZ_QUESTIONS.VL = QUIZ_QUESTIONS.VL_PHYSICS;
QUIZ_QUESTIONS.PL = QUIZ_QUESTIONS.PL_LAW;


// ==================== LESSON_CONTENT_MAP ====================
export const LESSON_CONTENT_MAP = {
  "EN02": {
    "intro": "Bạn đã làm đúng khẳng định 4/4 và phủ định 2/2. Bài này dùng tình huống ngày thi để luyện câu hỏi, dạng rút gọn và sở hữu; chưa đánh dấu hoàn thành cả EN02.",
    "sections": [
      {
        "id": "meaning",
        "title": "Nói bạn là ai, đang thế nào, ở đâu",
        "body": "To be nối chủ ngữ với danh từ, tính từ hoặc nơi chốn. I am a student. She is tired. They are at A6.\n\nGhép đúng: I → am; he/she/it và một người/vật → is; you/we/they và nhiều người/vật → are. My sister is…; my friends are…"
      },
      {
        "id": "questions",
        "title": "Tới phòng thi: hỏi và phủ định",
        "body": "You are ready. → Are you ready? Đưa are lên trước chủ ngữ. They are students. → Are they students?\n\nPhủ định thêm not sau to be: I am not ready. They are not at home. Không thêm do/does vào câu hỏi dùng to be: Are you tired?\n\nTrả lời ngắn: Yes, I am. / No, I’m not. Yes, she is. / No, she isn’t."
      },
      {
        "id": "possessive",
        "title": "Của tôi, của cô ấy: chọn đúng vị trí",
        "body": "Đại từ làm chủ ngữ: I, you, he, she, it, we, they. Tính từ sở hữu đứng trước danh từ: my card, your room, his book, her phone, our class, their friends.\n\nĐại từ sở hữu thay cả cụm: This is her phone. → This phone is hers. Dùng hers khi phía sau không còn danh từ phone; her phone, không phải hers phone.\n\nRút gọn: I am → I’m; you are → you’re; she is → she’s; is not → isn’t; are not → aren’t. Trong ngữ cảnh này she’s = she is."
      }
    ],
    "questions": [
      {
        "id": "EN02-Q1",
        "prompt": "Ở phòng thi: “Hi, I ___ Thuận.”",
        "options": [
          "is",
          "am",
          "are",
          "be"
        ],
        "answer": 1,
        "explanation": "Chủ ngữ I đi với am."
      },
      {
        "id": "EN02-Q2",
        "prompt": "Giám thị hỏi: “___ you ready?”",
        "options": [
          "Do",
          "Is",
          "Are",
          "Am"
        ],
        "answer": 2,
        "explanation": "Câu hỏi với to be: Are + you + tính từ?"
      },
      {
        "id": "EN02-Q3",
        "prompt": "Bạn bè vẫn ở ngoài: “They ___ in the room.”",
        "options": [
          "isn’t",
          "aren’t",
          "am not",
          "not are"
        ],
        "answer": 1,
        "explanation": "They đi với are; phủ định là are not/aren’t."
      },
      {
        "id": "EN02-Q4",
        "prompt": "“Mai is a student. ___ student card is blue.”",
        "options": [
          "She",
          "Hers",
          "Her",
          "He"
        ],
        "answer": 2,
        "explanation": "Card là danh từ; dùng tính từ sở hữu her trước danh từ."
      },
      {
        "id": "EN02-Q5",
        "prompt": "“This phone belongs to Lan. It is ___.”",
        "options": [
          "her",
          "she",
          "hers",
          "she’s"
        ],
        "answer": 2,
        "explanation": "Hers thay cho her phone nên không cần danh từ phía sau."
      },
      {
        "id": "EN02-Q6",
        "prompt": "Chọn câu hỏi đúng.",
        "options": [
          "Does he is tired?",
          "Is he tired?",
          "He is tired?",
          "Are he tired?"
        ],
        "answer": 1,
        "explanation": "Đưa is lên trước he, không thêm does."
      },
      {
        "id": "EN02-Q7",
        "prompt": "“Are they your friends?” — “Yes, ___.”",
        "options": [
          "they are",
          "they is",
          "we are",
          "they do"
        ],
        "answer": 0,
        "explanation": "Câu trả lời ngắn giữ they + are."
      },
      {
        "id": "EN02-Q8",
        "prompt": "“You’re in room A6.” nghĩa là gì?",
        "options": [
          "Your room is A6.",
          "You are in room A6.",
          "You were in room A6.",
          "You go to room A6."
        ],
        "answer": 1,
        "explanation": "You’re là dạng rút gọn của you are; your nghĩa là của bạn."
      }
    ],
    "challenge": "Viết hội thoại 4 câu tại phòng thi: tự giới thiệu, hỏi bạn có sẵn sàng không, một câu phủ định, một câu dùng my/your. Chưa xem đáp án khi tự viết.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN03": {
    "intro": "Tả lịch sinh hoạt thật của bạn: hiện tại đơn nói về thói quen và sự thật, không phải hành động đang xảy ra ngay lúc này.",
    "sections": [
      {
        "id": "habit",
        "title": "Thói quen: I study, she studies",
        "body": "I/you/we/they + động từ nguyên mẫu: I study English every evening. He/she/it thêm s/es: She studies English every evening.\n\nStudy → studies vì phụ âm + y; go → goes; watch → watches. Đừng viết She studying khi muốn nói một thói quen. Một số dấu hiệu thường gặp: every day, usually, often, sometimes."
      },
      {
        "id": "do-does",
        "title": "Do/does nhận nhiệm vụ trong câu hỏi và phủ định",
        "body": "Do you study at night? Does she study at night? Khi đã có does, động từ chính trở về nguyên mẫu study.\n\nI do not study at night. She does not study at night. Don’t = do not; doesn’t = does not. Sai: Does she studies? Đúng: Does she study?"
      },
      {
        "id": "compare",
        "title": "Đừng dùng cùng một khuôn cho to be",
        "body": "Bạn học mỗi tối: Do you study every evening? Bạn đang mệt: Are you tired?\n\nStudy là động từ thường nên câu hỏi hiện tại đơn dùng do/does. Tired là tính từ, câu gốc You are tired dùng to be.\n\nI usually study after dinner. Với to be: I am usually at home after dinner."
      }
    ],
    "questions": [
      {
        "id": "EN03-Q1",
        "prompt": "She ___ English every evening.",
        "options": [
          "study",
          "studying",
          "studies",
          "is study"
        ],
        "answer": 2,
        "explanation": "Thói quen, chủ ngữ she: study → studies."
      },
      {
        "id": "EN03-Q2",
        "prompt": "___ you live near campus?",
        "options": [
          "Does",
          "Are",
          "Is",
          "Do"
        ],
        "answer": 3,
        "explanation": "Động từ thường live, chủ ngữ you: Do you live…?"
      },
      {
        "id": "EN03-Q3",
        "prompt": "Does Nam ___ to university by bus?",
        "options": [
          "goes",
          "going",
          "go",
          "went"
        ],
        "answer": 2,
        "explanation": "Does mang dấu ngôi/thì, động từ go giữ nguyên mẫu."
      },
      {
        "id": "EN03-Q4",
        "prompt": "He ___ coffee in the evening.",
        "options": [
          "don’t drink",
          "doesn’t drinks",
          "doesn’t drink",
          "not drink"
        ],
        "answer": 2,
        "explanation": "He + doesn’t + động từ nguyên mẫu drink."
      },
      {
        "id": "EN03-Q5",
        "prompt": "Chọn câu đúng về thói quen của bạn.",
        "options": [
          "I usually study after dinner.",
          "I studies usually after dinner.",
          "I am study after dinner.",
          "I studying every dinner."
        ],
        "answer": 0,
        "explanation": "I + study; usually đứng trước động từ thường."
      },
      {
        "id": "EN03-Q6",
        "prompt": "“Does Lan work on Sundays?” — “No, ___.”",
        "options": [
          "she isn’t",
          "she doesn’t",
          "she don’t",
          "she not"
        ],
        "answer": 1,
        "explanation": "Hỏi với does, trả lời ngắn bằng does/doesn’t."
      },
      {
        "id": "EN03-Q7",
        "prompt": "Câu nào hỏi “Bạn có mệt không?”",
        "options": [
          "Do you tired?",
          "Does you tired?",
          "Are you tired?",
          "You do tired?"
        ],
        "answer": 2,
        "explanation": "Tired là tính từ, cần to be: Are you tired?"
      }
    ],
    "challenge": "Viết 3 thói quen của bạn với I và 2 thói quen của một người bạn với he/she. Đổi một câu thành phủ định, một câu thành câu hỏi.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN04": {
    "intro": "Một ngày có thể có cả thói quen lẫn việc đang diễn ra. Hãy chọn thì theo ý câu, thay vì chỉ tìm một từ khóa.",
    "sections": [
      {
        "id": "now",
        "title": "Camera đang quay: am/is/are + V-ing",
        "body": "Look! The students are playing football. Hành động đang diễn ra: chủ ngữ + am/is/are + động từ-ing. I am studying now. She is waiting outside.\n\nPhủ định: She isn’t waiting. Câu hỏi: Is she waiting? Không bỏ be và không thêm do/does."
      },
      {
        "id": "spelling",
        "title": "Viết dạng -ing",
        "body": "Play → playing; study → studying. Take → taking, bỏ e cuối. Run → running, nhân đôi n trong trường hợp từ một âm tiết có mẫu phụ âm–nguyên âm–phụ âm phù hợp.\n\nKhông áp dụng nhân đôi cho mọi từ: read → reading, không phải readding."
      },
      {
        "id": "contrast",
        "title": "Every evening và right now",
        "body": "She studies every evening. = thói quen. She is studying right now. = việc đang diễn ra.\n\nĐọc toàn câu: My friends usually take the bus, but today they are walking. Trong cùng một câu có thể dùng hai thì khác nhau.\n\nMột số động từ trạng thái như know thường dùng dạng đơn trong nghĩa nền: I know the answer, không phải I am knowing the answer."
      }
    ],
    "questions": [
      {
        "id": "EN04-Q1",
        "prompt": "Look! The students ___ football.",
        "options": [
          "play",
          "plays",
          "are playing",
          "played"
        ],
        "answer": 2,
        "explanation": "Look! ở ngữ cảnh này chỉ hành động đang diễn ra; they are playing."
      },
      {
        "id": "EN04-Q2",
        "prompt": "I ___ for the bus right now.",
        "options": [
          "waiting",
          "am waiting",
          "waits",
          "am wait"
        ],
        "answer": 1,
        "explanation": "I + am + waiting."
      },
      {
        "id": "EN04-Q3",
        "prompt": "Lan usually ___ at home, but today she ___ in the library.",
        "options": [
          "studies / is studying",
          "is studying / studies",
          "study / studying",
          "studying / is study"
        ],
        "answer": 0,
        "explanation": "Usually là thói quen; today trong tình huống này là việc đang diễn ra khác thường lệ."
      },
      {
        "id": "EN04-Q4",
        "prompt": "Chọn câu hỏi đúng.",
        "options": [
          "Do they are studying?",
          "Are they studying?",
          "Is they studying?",
          "They studying?"
        ],
        "answer": 1,
        "explanation": "Đảo are lên trước they."
      },
      {
        "id": "EN04-Q5",
        "prompt": "Dạng -ing đúng của take là gì?",
        "options": [
          "takeing",
          "taking",
          "takking",
          "taken"
        ],
        "answer": 1,
        "explanation": "Bỏ e cuối rồi thêm ing: taking."
      },
      {
        "id": "EN04-Q6",
        "prompt": "“He is not sleeping.” viết rút gọn là gì?",
        "options": [
          "He doesn’t sleeping.",
          "He not sleeping.",
          "He isn’t sleeping.",
          "He aren’t sleeping."
        ],
        "answer": 2,
        "explanation": "Is not → isn’t."
      },
      {
        "id": "EN04-Q7",
        "prompt": "Chọn câu tự nhiên khi nói bạn biết đáp án.",
        "options": [
          "I am knowing the answer.",
          "I know the answer.",
          "I knowing the answer.",
          "I am know the answer."
        ],
        "answer": 1,
        "explanation": "Know với nghĩa biết là động từ trạng thái, dùng hiện tại đơn trong câu này."
      }
    ],
    "challenge": "Mô tả 3 việc mọi người đang làm quanh bạn. Sau đó viết 2 thói quen để đối chiếu. Không dùng cùng thì chỉ vì hai câu có cùng chủ ngữ.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "GT10": {
    "intro": "Tiếp nối giới hạn sin bạn đã học. Hai công cụ đủ để giải nhóm tan và 1−cos(x); mọi góc trong các giới hạn này tính bằng radian.",
    "sections": [
      {
        "id": "tan",
        "title": "Đưa tan về sin/cos",
        "body": "Khi u → 0: sin(u)/u → 1 và cos(u) → 1. Vì tan(u) = sin(u)/cos(u), ta có tan(u)/u = [sin(u)/u] · [1/cos(u)] → 1.\n\nVí dụ: tan(3x)/x = 3 · [sin(3x)/(3x)] · [1/cos(3x)] → 3 khi x → 0. Hệ số 3 không biến mất khi tạo mẫu 3x."
      },
      {
        "id": "cos",
        "title": "1−cos(x): bậc hai, không phải bậc một",
        "body": "Dùng 1−cos(u) = 2sin²(u/2). Với x → 0: (1−cos(x))/x² = ½ · [sin(x/2)/(x/2)]² → ½.\n\nTổng quát: (1−cos(ax))/x² → a²/2. Ví dụ (1−cos(2x))/x² → 2. Đừng thay 1−cos(x) bằng x: nó có bậc x² gần 0."
      },
      {
        "id": "method",
        "title": "Ba bước tránh nhầm dấu và hệ số",
        "body": "1. Xác nhận đối số → 0 và đơn vị radian. 2. Biến đổi thành sin(u)/u; giữ hệ số ngoài. 3. Kiểm tra dấu và bậc trước kết luận.\n\nCos(x)−1 = −(1−cos(x)), nên (cos(x)−1)/x² → −½. Với (1−cos(x))/x, hãy viết [(1−cos(x))/x²] · x → 0.\n\nKhông gọi 0/0 là đáp án: đó là dạng vô định cần biến đổi."
      }
    ],
    "questions": [
      {
        "id": "GT10-Q1",
        "prompt": "lim khi x→0 của tan(3x)/x bằng?",
        "options": [
          "1",
          "3",
          "1/3",
          "0"
        ],
        "answer": 1,
        "explanation": "Tan(3x)/(3x)→1; nhân hệ số 3."
      },
      {
        "id": "GT10-Q2",
        "prompt": "lim khi x→0 của (1−cos(2x))/x² bằng?",
        "options": [
          "1/2",
          "1",
          "2",
          "4"
        ],
        "answer": 2,
        "explanation": "Hệ số a²/2 = 2²/2 = 2."
      },
      {
        "id": "GT10-Q3",
        "prompt": "lim khi x→0 của (cos(x)−1)/x² bằng?",
        "options": [
          "1/2",
          "−1/2",
          "0",
          "1"
        ],
        "answer": 1,
        "explanation": "Cos(x)−1 = −(1−cos(x)), đổi dấu toàn biểu thức."
      },
      {
        "id": "GT10-Q4",
        "prompt": "lim khi x→0 của (1−cos(x))/x bằng?",
        "options": [
          "1/2",
          "1",
          "0",
          "Không tồn tại"
        ],
        "answer": 2,
        "explanation": "Viết [(1−cos(x))/x²]·x → (1/2)·0."
      },
      {
        "id": "GT10-Q5",
        "prompt": "lim khi x→0 của tan(2x)/sin(5x) bằng?",
        "options": [
          "5/2",
          "2/5",
          "1",
          "0"
        ],
        "answer": 1,
        "explanation": "Tan(2x)/(2x)→1 và sin(5x)/(5x)→1; giữ hệ số 2/5."
      },
      {
        "id": "GT10-Q6",
        "prompt": "lim khi x→0 của (1−cos(3x))/(1−cos(2x)) bằng?",
        "options": [
          "3/2",
          "2/3",
          "9/4",
          "4/9"
        ],
        "answer": 2,
        "explanation": "Tử có hệ số 9x²/2, mẫu 4x²/2, tỉ số 9/4."
      },
      {
        "id": "GT10-Q7",
        "prompt": "Điều kiện nào cần để dùng sin(u)/u → 1?",
        "options": [
          "u→0, góc tính bằng radian",
          "u→∞",
          "Góc luôn tính bằng độ",
          "Mẫu u phải bằng 0"
        ],
        "answer": 0,
        "explanation": "Giới hạn chuẩn áp dụng khi u→0 theo radian; không thế mẫu thành 0 rồi chia."
      }
    ],
    "challenge": "Tự giải và trình bày phép đổi: tan(4x)/(3x); (1−cos(5x))/(2x²); (cos(2x)−1)/(1−cos(x)) khi x→0. Ghi lý do và kiểm tra dấu trước đáp án.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "VL02": {
    "intro": "Vector có cả độ lớn lẫn hướng. Vẽ trục và ghi góc trước khi tính sẽ giảm rất nhiều lỗi sin/cos.",
    "sections": [
      {
        "id": "components",
        "title": "Tách một mũi tên thành hai thành phần",
        "body": "Nếu vector F có góc θ đo từ trục +x, thì Fx = F·cosθ, Fy = F·sinθ. Nếu góc đo từ trục y, cách dùng sin/cos đổi tương ứng.\n\nVector 10 N nghiêng 30° trên trục +x: Fx = 5√3 N ≈ 8.66 N; Fy = 5 N. Thành phần có dấu theo chiều trục."
      },
      {
        "id": "addition",
        "title": "Cộng theo trục, không cộng độ lớn máy móc",
        "body": "A = (3, 4) và B = (−1, 2) thì A+B = (2, 6). Độ lớn của A là √(3²+4²) = 5.\n\nHai lực 3 N sang phải và 4 N lên trên có hợp lực 5 N; không phải 7 N. Chỉ cộng độ lớn trực tiếp khi cùng phương cùng chiều."
      },
      {
        "id": "signs",
        "title": "Dấu âm nói về hướng",
        "body": "Chọn +x sang phải. Vector 8 N sang trái có Fx = −8 N, độ lớn vẫn là 8 N. Độ lớn không âm.\n\nKhi giải vật lý: vẽ trục, viết từng thành phần, cộng theo trục, cuối cùng mới tính độ lớn và hướng. Cùng một vector có thể có thành phần khác khi đổi hệ trục."
      }
    ],
    "questions": [
      {
        "id": "VL02-Q1",
        "prompt": "Vector có thành phần (3,4) có độ lớn bao nhiêu?",
        "options": [
          "7",
          "1",
          "5",
          "25"
        ],
        "answer": 2,
        "explanation": "√(3²+4²) = 5."
      },
      {
        "id": "VL02-Q2",
        "prompt": "Lực 10 N hợp góc 30° với +x; Fy bằng?",
        "options": [
          "10 N",
          "5 N",
          "5√3 N",
          "0 N"
        ],
        "answer": 1,
        "explanation": "Fy = F sin30° = 5 N."
      },
      {
        "id": "VL02-Q3",
        "prompt": "Chọn +x sang phải. Lực 8 N sang trái có Fx bằng?",
        "options": [
          "8 N",
          "−8 N",
          "0 N",
          "Không xác định"
        ],
        "answer": 1,
        "explanation": "Dấu âm biểu thị hướng ngược chiều +x."
      },
      {
        "id": "VL02-Q4",
        "prompt": "A=(3,4), B=(−1,2). A+B bằng?",
        "options": [
          "(2,6)",
          "(4,2)",
          "(−3,8)",
          "(2,2)"
        ],
        "answer": 0,
        "explanation": "Cộng từng thành phần tương ứng."
      },
      {
        "id": "VL02-Q5",
        "prompt": "Hai lực vuông góc 3 N và 4 N có hợp lực độ lớn?",
        "options": [
          "1 N",
          "7 N",
          "12 N",
          "5 N"
        ],
        "answer": 3,
        "explanation": "Dùng định lý Pythagoras vì hai thành phần vuông góc."
      },
      {
        "id": "VL02-Q6",
        "prompt": "Nếu góc θ được đo từ +x, công thức Fx là?",
        "options": [
          "F sinθ",
          "F cosθ",
          "F tanθ",
          "F/θ"
        ],
        "answer": 1,
        "explanation": "Thành phần kề góc dùng cos; luôn kiểm tra góc đo từ trục nào."
      }
    ],
    "challenge": "Vẽ hai lực: 6 N sang phải, 8 N lên trên. Tìm thành phần hợp lực, độ lớn, rồi mô tả hướng. Viết đơn vị ở mọi kết quả.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "VL07": {
    "intro": "Newton bắt đầu bằng việc chọn đúng vật khảo sát. Một sơ đồ lực sạch thường quan trọng hơn việc nhớ thêm công thức.",
    "sections": [
      {
        "id": "laws",
        "title": "Tổng lực quyết định gia tốc",
        "body": "Định luật I: trong hệ quy chiếu quán tính, tổng lực bằng 0 thì vật giữ vận tốc không đổi, kể cả đứng yên. Định luật II: tổng vector lực = m·vector gia tốc.\n\nTổng lực 10 N tác dụng vật 2 kg cho gia tốc 5 m/s² theo hướng tổng lực. Một lực riêng lẻ bằng 0 không có nghĩa tổng lực bằng 0."
      },
      {
        "id": "fbd",
        "title": "Vẽ các lực tác dụng lên một vật",
        "body": "Cô lập vật bằng điểm hoặc hình hộp. Vẽ trọng lực mg; phản lực của mặt tiếp xúc; lực căng khi có dây; lực đẩy/kéo, ma sát khi có tương tác. Không vẽ vận tốc như một lực.\n\nVật nằm trên bàn ngang, không có lực theo phương thẳng đứng khác và không gia tốc thẳng đứng: N−mg=0. N=mg chỉ đúng theo những giả thiết đó, không đúng mọi trường hợp."
      },
      {
        "id": "third-law",
        "title": "Lực–phản lực tác dụng lên hai vật khác nhau",
        "body": "Tay đẩy tường: tay tác dụng lực lên tường và tường tác dụng lực lên tay. Hai lực cùng độ lớn, ngược hướng, đặt trên hai vật khác nhau.\n\nKhông đặt cả cặp này vào sơ đồ của tay rồi nói chúng triệt tiêu. Trọng lực tác dụng lên sách và phản lực bàn lên sách không phải một cặp lực–phản lực."
      }
    ],
    "questions": [
      {
        "id": "VL07-Q1",
        "prompt": "Vật 2 kg có tổng lực 10 N. Gia tốc bằng?",
        "options": [
          "20 m/s²",
          "5 m/s²",
          "0.2 m/s²",
          "12 m/s²"
        ],
        "answer": 1,
        "explanation": "a = F/m = 10/2 = 5 m/s²."
      },
      {
        "id": "VL07-Q2",
        "prompt": "Tổng lực bằng 0 trong hệ quy chiếu quán tính. Vật có thể?",
        "options": [
          "Chỉ đứng yên",
          "Chỉ chuyển động tròn",
          "Chuyển động với vận tốc không đổi",
          "Luôn tăng tốc"
        ],
        "answer": 2,
        "explanation": "Tổng lực 0 → gia tốc 0, vận tốc không đổi; đứng yên là trường hợp vận tốc 0."
      },
      {
        "id": "VL07-Q3",
        "prompt": "Cặp lực–phản lực tác dụng lên?",
        "options": [
          "Cùng một vật",
          "Hai vật khác nhau",
          "Chỉ một vật có khối lượng lớn",
          "Không vật nào"
        ],
        "answer": 1,
        "explanation": "Hai lực thuộc cùng tương tác nhưng đặt trên hai vật khác nhau."
      },
      {
        "id": "VL07-Q4",
        "prompt": "Mũi tên nào không nên coi là lực trong sơ đồ lực?",
        "options": [
          "Trọng lực",
          "Lực căng dây",
          "Vận tốc",
          "Lực ma sát"
        ],
        "answer": 2,
        "explanation": "Vận tốc mô tả chuyển động, không phải lực."
      },
      {
        "id": "VL07-Q5",
        "prompt": "Vật nằm yên trên bàn ngang, chỉ có trọng lực và phản lực. Kết luận?",
        "options": [
          "N=0",
          "N=mg",
          "N=2mg",
          "N luôn lớn hơn mg"
        ],
        "answer": 1,
        "explanation": "Không gia tốc đứng và chỉ hai lực đứng: N−mg=0."
      },
      {
        "id": "VL07-Q6",
        "prompt": "Hai lực ngang 12 N sang phải và 4 N sang trái, vật 2 kg. Gia tốc?",
        "options": [
          "8 m/s² sang phải",
          "4 m/s² sang phải",
          "4 m/s² sang trái",
          "0"
        ],
        "answer": 1,
        "explanation": "Chọn phải dương: tổng lực 12−4=8 N; a=8/2=4 m/s²."
      }
    ],
    "challenge": "Vẽ sơ đồ lực một cuốn sách nằm trên bàn và một vật treo bằng dây. Với mỗi lực, ghi rõ vật nào tác dụng lên vật khảo sát.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "IT02": {
    "intro": "Máy tính biểu diễn dữ liệu bằng bit. Hiểu hệ đếm giúp bạn đọc dung lượng, mã và cách lưu dữ liệu thay vì chỉ nhớ thuật ngữ.",
    "sections": [
      {
        "id": "bits",
        "title": "Bit, byte và số trạng thái",
        "body": "Một bit nhận 0 hoặc 1. Một byte gồm 8 bit. n bit có 2ⁿ tổ hợp; 8 bit có 256 tổ hợp. Số nguyên không dấu 8 bit biểu diễn 0 đến 255.\n\nBit và byte khác nhau: ký hiệu b thường là bit, B là byte. Tốc độ 8 Mb/s tương đương 1 MB/s về mặt lý thuyết trước chi phí giao thức."
      },
      {
        "id": "binary",
        "title": "Đọc số nhị phân theo giá trị vị trí",
        "body": "Các vị trí từ phải sang trái có trọng số 1,2,4,8,16,… Ví dụ 1011₂ = 1·8 + 0·4 + 1·2 + 1·1 = 11₁₀.\n\nĐổi 13 sang nhị phân: 13 = 8+4+1 nên 1101₂. Hệ 16 dùng 0–9 và A–F; một chữ số hex tương ứng 4 bit. A₁₆ = 10₁₀, F₁₆ = 15₁₀."
      },
      {
        "id": "units",
        "title": "MB và MiB: kiểm tra quy ước",
        "body": "Theo đơn vị thập phân, 1 kB=1000 B; 1 MB=1,000,000 B. Đơn vị nhị phân: 1 KiB=1024 B; 1 MiB=1,048,576 B.\n\nĐề dùng KB không nói quy ước có thể mơ hồ. Ghi giả thiết và xem slide/đề lớp đang dùng 1000 hay 1024. Đừng tự đổi tên MiB thành MB trong phép tính."
      }
    ],
    "questions": [
      {
        "id": "IT02-Q1",
        "prompt": "Một byte có bao nhiêu bit?",
        "options": [
          "2",
          "4",
          "8",
          "16"
        ],
        "answer": 2,
        "explanation": "Theo định nghĩa hiện dùng, 1 byte = 8 bit."
      },
      {
        "id": "IT02-Q2",
        "prompt": "1011₂ bằng bao nhiêu trong hệ 10?",
        "options": [
          "9",
          "11",
          "13",
          "1011"
        ],
        "answer": 1,
        "explanation": "8+0+2+1=11."
      },
      {
        "id": "IT02-Q3",
        "prompt": "13₁₀ viết trong hệ 2 là?",
        "options": [
          "1010",
          "1011",
          "1101",
          "1110"
        ],
        "answer": 2,
        "explanation": "13=8+4+1, tương ứng 1101."
      },
      {
        "id": "IT02-Q4",
        "prompt": "Một số không dấu 8 bit có giá trị lớn nhất?",
        "options": [
          "8",
          "128",
          "255",
          "256"
        ],
        "answer": 2,
        "explanation": "Có 256 giá trị từ 0 đến 255."
      },
      {
        "id": "IT02-Q5",
        "prompt": "1 KiB bằng?",
        "options": [
          "1000 B",
          "1024 B",
          "1024 bit",
          "1000 bit"
        ],
        "answer": 1,
        "explanation": "KiB là đơn vị nhị phân 2¹⁰ B."
      },
      {
        "id": "IT02-Q6",
        "prompt": "A trong hệ 16 có giá trị hệ 10 là?",
        "options": [
          "8",
          "9",
          "10",
          "16"
        ],
        "answer": 2,
        "explanation": "Sau 9 là A=10, B=11,…F=15."
      },
      {
        "id": "IT02-Q7",
        "prompt": "8 Mb/s tương đương lý thuyết bao nhiêu MB/s?",
        "options": [
          "1",
          "8",
          "16",
          "64"
        ],
        "answer": 0,
        "explanation": "Chia 8 bit/byte: 8 Mb/s = 1 MB/s, chưa trừ chi phí truyền."
      }
    ],
    "challenge": "Đổi 19₁₀ sang nhị phân, đổi 11100₂ sang thập phân. Tính số byte của 2 MiB rồi giải thích tại sao khác 2 MB.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "IT03": {
    "intro": "Cùng một dữ liệu có nhiều cách mã hóa. Hãy tách nội dung khỏi cách biểu diễn và luôn ghi giả thiết khi tính dung lượng.",
    "sections": [
      {
        "id": "text",
        "title": "Ký tự không luôn là một byte",
        "body": "Unicode gán mã cho ký tự; UTF-8 là một cách mã hóa Unicode thành byte. Chữ ASCII như A dùng 1 byte UTF-8; nhiều chữ tiếng Việt cần nhiều byte.\n\nĐộ dài chuỗi theo ký tự và theo byte có thể khác. Emoji có thể gồm nhiều code point; không nên mặc định một hình thấy trên màn hình tương ứng đúng một đơn vị lưu trữ."
      },
      {
        "id": "image",
        "title": "Ảnh chưa nén: pixel × bit mỗi pixel",
        "body": "Ảnh RGB 24 bit dùng 8 bit cho mỗi kênh đỏ, lục, lam: 3 byte/pixel nếu không thêm alpha. Ảnh 100×100 RGB24 chưa nén có dữ liệu pixel 100·100·3=30,000 byte.\n\nCông thức này bỏ qua header, metadata và nén. File PNG/JPEG thật không nhất thiết có cùng dung lượng; không lấy công thức raw làm kích thước chính xác của file nén."
      },
      {
        "id": "audio",
        "title": "Âm thanh lấy mẫu",
        "body": "Với PCM chưa nén: dung lượng bit = số mẫu/giây × bit/mẫu × số kênh × thời gian giây.\n\nVí dụ mono 8000 Hz, 16 bit, 1 giây: 128,000 bit = 16,000 byte dữ liệu mẫu. Stereo có 2 kênh nên gấp đôi nếu mọi thông số khác giữ nguyên."
      }
    ],
    "questions": [
      {
        "id": "IT03-Q1",
        "prompt": "Điều nào đúng về UTF-8?",
        "options": [
          "Mọi ký tự đúng 1 byte",
          "Mọi ký tự đúng 8 byte",
          "Số byte có thể khác theo ký tự",
          "Không mã hóa tiếng Việt"
        ],
        "answer": 2,
        "explanation": "UTF-8 dùng độ dài biến đổi theo code point; không mặc định 1 byte/ký tự."
      },
      {
        "id": "IT03-Q2",
        "prompt": "RGB 24 bit không có alpha dùng bao nhiêu byte/pixel?",
        "options": [
          "1",
          "2",
          "3",
          "24"
        ],
        "answer": 2,
        "explanation": "24 bit / 8 = 3 byte."
      },
      {
        "id": "IT03-Q3",
        "prompt": "Ảnh raw 100×100 RGB24, bỏ header, có bao nhiêu byte pixel?",
        "options": [
          "10,000",
          "30,000",
          "80,000",
          "240,000"
        ],
        "answer": 1,
        "explanation": "100×100×3=30,000 B."
      },
      {
        "id": "IT03-Q4",
        "prompt": "Tại sao file JPEG có thể nhỏ hơn dữ liệu RGB raw?",
        "options": [
          "JPEG không có pixel",
          "JPEG luôn chỉ có trắng đen",
          "JPEG áp dụng nén",
          "JPEG không lưu trong máy tính"
        ],
        "answer": 2,
        "explanation": "Nén làm cách lưu và dung lượng khác raw."
      },
      {
        "id": "IT03-Q5",
        "prompt": "PCM mono 8000 Hz, 16 bit, dài 1 giây, bỏ header: bao nhiêu byte?",
        "options": [
          "8000",
          "16,000",
          "128,000",
          "256,000"
        ],
        "answer": 1,
        "explanation": "8000×16×1×1 / 8=16,000 B."
      },
      {
        "id": "IT03-Q6",
        "prompt": "Đổi mono thành stereo, mọi thông số khác giữ nguyên. Dữ liệu PCM raw?",
        "options": [
          "Giảm một nửa",
          "Giữ nguyên",
          "Gấp đôi",
          "Gấp 8"
        ],
        "answer": 2,
        "explanation": "Số kênh từ1 lên2 nên dung lượng dữ liệu mẫu gấp đôi."
      }
    ],
    "challenge": "Tính dữ liệu pixel ảnh 320×240 RGB24 chưa nén. Nêu ít nhất hai lý do khiến dung lượng file ảnh thực tế khác kết quả này.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "IT04": {
    "intro": "Hình dung bạn mở một file ghi chú: SSD giữ file, RAM giữ dữ liệu đang dùng, CPU thực thi lệnh, hệ điều hành điều phối.",
    "sections": [
      {
        "id": "cpu",
        "title": "CPU thực thi lệnh",
        "body": "CPU lấy lệnh, giải mã rồi thực thi. Thanh ghi nằm trong CPU để giữ dữ liệu/lệnh cần tức thời; cache giữ dữ liệu thường dùng nhằm giảm thời gian truy cập bộ nhớ.\n\nTốc độ không chỉ do GHz. Kiến trúc, số lõi, loại công việc, bộ nhớ và cách chương trình dùng tài nguyên đều ảnh hưởng."
      },
      {
        "id": "memory",
        "title": "RAM khác SSD",
        "body": "RAM là bộ nhớ làm việc, thường mất dữ liệu khi tắt nguồn. SSD là bộ lưu trữ giữ file qua lần khởi động. Thêm dung lượng SSD không tự đồng nghĩa thêm RAM.\n\nKhi mở ứng dụng, hệ điều hành nạp phần cần thiết từ bộ lưu trữ vào RAM; CPU làm việc qua hệ bộ nhớ. Dữ liệu chỉnh sửa cần được lưu để giữ bản cập nhật."
      },
      {
        "id": "flow",
        "title": "Một thao tác học: mở → sửa → lưu",
        "body": "Mở bài ghi chú: file nằm trên SSD hoặc tải qua mạng; dữ liệu được đưa vào bộ nhớ làm việc. Gõ chữ: ứng dụng và CPU xử lý, dữ liệu thay đổi trong phiên. Bấm lưu: ghi ra bộ lưu trữ hoặc dịch vụ cloud.\n\nTrong web app, lưu trên máy và đồng bộ cloud là hai việc khác nhau. Phải xem trạng thái đồng bộ trước khi đổi thiết bị."
      }
    ],
    "questions": [
      {
        "id": "IT04-Q1",
        "prompt": "Thành phần chủ yếu thực thi lệnh chương trình?",
        "options": [
          "SSD",
          "CPU",
          "Màn hình",
          "Bàn phím"
        ],
        "answer": 1,
        "explanation": "CPU thực thi lệnh; các phần khác giữ dữ liệu hoặc nhập/xuất."
      },
      {
        "id": "IT04-Q2",
        "prompt": "Bộ nhớ nào thường mất dữ liệu khi tắt nguồn?",
        "options": [
          "SSD",
          "Ổ cứng",
          "RAM",
          "USB lưu trữ"
        ],
        "answer": 2,
        "explanation": "RAM thường là bộ nhớ khả biến."
      },
      {
        "id": "IT04-Q3",
        "prompt": "Cache có vai trò chính?",
        "options": [
          "Thay mọi file trên SSD",
          "Lưu dữ liệu thường dùng gần CPU để truy cập nhanh",
          "Tăng kích thước màn hình",
          "Thay hệ điều hành"
        ],
        "answer": 1,
        "explanation": "Cache giảm thời gian truy cập dữ liệu/lệnh thường dùng."
      },
      {
        "id": "IT04-Q4",
        "prompt": "Thêm SSD 1 TB có tự làm RAM tăng 1 TB không?",
        "options": [
          "Có",
          "Không",
          "Chỉ khi có Wi-Fi",
          "Chỉ khi pin đầy"
        ],
        "answer": 1,
        "explanation": "RAM và dung lượng bộ lưu trữ là hai tài nguyên khác nhau."
      },
      {
        "id": "IT04-Q5",
        "prompt": "Bạn sửa file nhưng chưa lưu, ứng dụng đóng bất ngờ. Kết luận chắc chắn nào đúng?",
        "options": [
          "Mọi sửa đổi luôn còn trên SSD",
          "Phần chưa lưu có thể mất",
          "CPU giữ lại mãi",
          "RAM không bao giờ mất dữ liệu"
        ],
        "answer": 1,
        "explanation": "Sửa đổi chưa lưu có thể chỉ tồn tại trong phiên; một số ứng dụng có tự lưu nhưng không được mặc định."
      },
      {
        "id": "IT04-Q6",
        "prompt": "Có thể kết luận CPU A nhanh hơn CPU B chỉ vì GHz cao hơn?",
        "options": [
          "Luôn đúng",
          "Không, còn tùy kiến trúc và loại công việc",
          "Chỉ nhìn tên hãng là đủ",
          "Chỉ nhìn màu CPU là đủ"
        ],
        "answer": 1,
        "explanation": "GHz không mô tả toàn bộ hiệu suất."
      }
    ],
    "challenge": "Vẽ đường đi của dữ liệu khi bạn mở ảnh, chỉnh sửa và lưu lại. Ghi vai trò SSD, RAM, CPU và ứng dụng ở từng bước.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "IT19": {
    "intro": "Bài giảng cũ cùng mã CSE702040 có chủ đề chuyển đổi số. Nội dung dưới đây là tình huống tự luyện, chưa xác nhận là yêu cầu bài nhóm hay câu thi lớp bạn.",
    "sections": [
      {
        "id": "levels",
        "title": "Số hóa dữ liệu và đổi quy trình",
        "body": "Số hóa: chuyển giấy sang dữ liệu số, ví dụ quét phiếu đăng ký thành PDF. Ứng dụng công nghệ vào quy trình: dùng biểu mẫu online để nhận dữ liệu, kiểm tra và chuyển bước.\n\nChuyển đổi số rộng hơn: đổi cách tổ chức hoạt động dựa trên dữ liệu/công nghệ để tạo giá trị, có thể cần đổi quy trình, vai trò và cách đo hiệu quả. Chỉ quét giấy rồi xử lý thủ công như cũ chưa đủ để chứng minh chuyển đổi toàn diện."
      },
      {
        "id": "registration",
        "title": "Thiết kế đăng ký môn học trước và sau",
        "body": "Trước: sinh viên viết phiếu, nhân viên nhập lại, phát hiện trùng lịch muộn. Sau: biểu mẫu kiểm tra điều kiện môn và trùng lịch, thông báo chỗ còn, lưu lịch sử thay đổi.\n\nĐặt mục tiêu cụ thể: giảm thời gian xử lý, giảm lỗi nhập, minh bạch trạng thái. Xác định ai hưởng lợi, ai cần tập huấn và ai xử lý ngoại lệ."
      },
      {
        "id": "evaluation",
        "title": "Đo hiệu quả và nhìn rủi ro",
        "body": "Chọn chỉ số gắn mục tiêu: thời gian từ nộp tới duyệt; tỷ lệ hồ sơ phải nhập lại; tỷ lệ đăng ký lỗi. So sánh trước/sau với dữ liệu tương đương.\n\nRủi ro cần thiết kế xử lý: lộ dữ liệu cá nhân, sai quyền, người dùng khó tiếp cận, hệ thống lỗi giờ cao điểm. Một công nghệ mới không tự bảo đảm quy trình tốt hơn; AI cần kiểm chứng đầu ra."
      }
    ],
    "questions": [
      {
        "id": "IT19-Q1",
        "prompt": "Quét phiếu giấy thành PDF chủ yếu là?",
        "options": [
          "Số hóa dữ liệu",
          "Bảo đảm đổi toàn bộ mô hình vận hành",
          "Tự động loại mọi lỗi",
          "Thay hoàn toàn con người"
        ],
        "answer": 0,
        "explanation": "Đây là chuyển dữ liệu từ giấy sang dạng số; quy trình có thể vẫn như cũ."
      },
      {
        "id": "IT19-Q2",
        "prompt": "Mục tiêu giảm thời gian duyệt nên đo bằng?",
        "options": [
          "Màu giao diện",
          "Số logo",
          "Thời gian từ nộp đến duyệt",
          "Số quảng cáo"
        ],
        "answer": 2,
        "explanation": "Chỉ số phải gắn trực tiếp với mục tiêu."
      },
      {
        "id": "IT19-Q3",
        "prompt": "Biểu mẫu online kiểm tra trùng lịch đem lợi ích trực tiếp nào?",
        "options": [
          "Không cần bảo vệ dữ liệu",
          "Giảm đăng ký có xung đột thời gian",
          "Luôn thay giảng viên",
          "Không cần kiểm tra điều kiện môn"
        ],
        "answer": 1,
        "explanation": "Kiểm tra trùng lịch giúp phát hiện xung đột; không loại bỏ mọi yêu cầu khác."
      },
      {
        "id": "IT19-Q4",
        "prompt": "Điều nào cần làm khi thay quy trình bằng phần mềm?",
        "options": [
          "Chỉ mua phần mềm",
          "Bỏ qua người dùng",
          "Thiết kế quy trình, trách nhiệm và hỗ trợ ngoại lệ",
          "Không cần đo kết quả"
        ],
        "answer": 2,
        "explanation": "Công nghệ phải gắn quy trình và người thực hiện."
      },
      {
        "id": "IT19-Q5",
        "prompt": "Rủi ro của hệ thống lưu hồ sơ cá nhân?",
        "options": [
          "Dữ liệu có thể bị truy cập sai quyền",
          "Không có rủi ro nếu có logo đẹp",
          "Mọi người đều phải thấy mọi hồ sơ",
          "Không cần sao lưu"
        ],
        "answer": 0,
        "explanation": "Phân quyền và bảo vệ dữ liệu là yêu cầu thực tế."
      },
      {
        "id": "IT19-Q6",
        "prompt": "AI đề xuất môn học. Cách sử dụng phù hợp?",
        "options": [
          "Tin mọi gợi ý",
          "Bỏ điều kiện tiên quyết",
          "Kiểm tra với CTĐT và lịch thực tế",
          "Chỉ chọn môn có tên ngắn"
        ],
        "answer": 2,
        "explanation": "Đầu ra AI cần đối chiếu dữ liệu chương trình và ràng buộc thực tế."
      }
    ],
    "challenge": "Chọn một việc học của bạn đang mất thời gian. Mô tả trước/sau, công cụ, người sử dụng, hai rủi ro và một chỉ số để đo cải thiện.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "PL05": {
    "intro": "Quy phạm pháp luật là quy tắc xử sự chung. Bài này dùng ví dụ tự tạo để học cấu trúc, không trích điều luật hay mức phạt thật.",
    "sections": [
      {
        "id": "norm",
        "title": "Quy tắc chung khác xử lý một vụ việc",
        "body": "Quy phạm pháp luật đưa ra cách xử sự cho một nhóm trường hợp, do chủ thể có thẩm quyền ban hành hoặc thừa nhận và được Nhà nước bảo đảm thực hiện.\n\nMột quyết định áp dụng cho cá nhân/vụ cụ thể khác với quy tắc chung. Đừng gọi mọi văn bản của cơ quan nhà nước là văn bản quy phạm chỉ vì văn bản có con dấu."
      },
      {
        "id": "structure",
        "title": "Giả định, quy định, chế tài",
        "body": "Giả định nêu ai và hoàn cảnh nào. Quy định nêu được làm, phải làm hoặc không được làm gì. Chế tài nêu hậu quả pháp lý khi vi phạm.\n\nVí dụ tự tạo: “Người sử dụng phòng thí nghiệm [hoàn cảnh/chủ thể] phải đeo thiết bị bảo hộ [xử sự]. Vi phạm bị xử lý theo nội quy áp dụng [hậu quả]”. Đây chỉ là mô hình nhận diện; nội quy ví dụ không mặc nhiên là quy phạm pháp luật."
      },
      {
        "id": "reading",
        "title": "Không ép một điều luật có đủ ba phần",
        "body": "Một quy phạm có thể được thể hiện qua nhiều điều hoặc nhiều văn bản; một điều có thể chứa nhiều quy tắc. Tìm cấu trúc theo nội dung và liên hệ văn bản, không chỉ theo dấu chấm.\n\nKhi làm bài: xác định chủ thể/hoàn cảnh, tìm cách xử sự, tìm hậu quả nếu có. Nếu chưa thấy chế tài, ghi chưa thấy trong trích đoạn, không tự bịa mức phạt."
      }
    ],
    "questions": [
      {
        "id": "PL05-Q1",
        "prompt": "Giả định của quy phạm thường xác định?",
        "options": [
          "Ai, trong hoàn cảnh nào",
          "Màu con dấu",
          "Tên người đánh máy",
          "Số trang tài liệu"
        ],
        "answer": 0,
        "explanation": "Giả định nêu chủ thể, điều kiện hoặc hoàn cảnh áp dụng."
      },
      {
        "id": "PL05-Q2",
        "prompt": "Phần nêu phải làm/được làm/không được làm là?",
        "options": [
          "Giả định",
          "Quy định",
          "Chế tài",
          "Mục lục"
        ],
        "answer": 1,
        "explanation": "Quy định là cách xử sự."
      },
      {
        "id": "PL05-Q3",
        "prompt": "Phần nêu hậu quả pháp lý khi vi phạm là?",
        "options": [
          "Chế tài",
          "Tiêu đề",
          "Giả định",
          "Lời cảm ơn"
        ],
        "answer": 0,
        "explanation": "Chế tài nói đến hậu quả pháp lý đối với vi phạm."
      },
      {
        "id": "PL05-Q4",
        "prompt": "Mọi điều luật có bắt buộc thể hiện đủ ba phần ngay trong cùng điều?",
        "options": [
          "Có",
          "Không",
          "Chỉ nếu điều ngắn",
          "Chỉ nếu có số thứ tự"
        ],
        "answer": 1,
        "explanation": "Các bộ phận có thể nằm ở nhiều điều/văn bản."
      },
      {
        "id": "PL05-Q5",
        "prompt": "Quyết định xử lý một vụ cụ thể có tự trở thành quy tắc xử sự chung?",
        "options": [
          "Luôn có",
          "Không tự động",
          "Có nếu được in màu",
          "Có nếu dài 10 trang"
        ],
        "answer": 1,
        "explanation": "Phân biệt quy phạm chung với quyết định áp dụng cho vụ việc."
      },
      {
        "id": "PL05-Q6",
        "prompt": "Trích đoạn không nêu mức phạt. Bạn nên?",
        "options": [
          "Tự đoán một con số",
          "Dùng mức phạt bất kỳ từ đề cũ",
          "Ghi chưa thấy chế tài và tra phần liên quan",
          "Kết luận không bao giờ có chế tài"
        ],
        "answer": 2,
        "explanation": "Không suy luận quá trích đoạn; phải đối chiếu văn bản liên quan và hiệu lực."
      }
    ],
    "challenge": "Chọn một điều trong tài liệu lớp. Gạch riêng chủ thể/hoàn cảnh và cách xử sự. Nếu thiếu chế tài, ghi điều cần tra thêm; không tự bổ sung mức phạt.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "PL09": {
    "intro": "Bốn nhóm trách nhiệm thường gặp cần phân biệt bằng loại quan hệ và căn cứ. Các tình huống dưới đây chỉ minh họa, không kết luận tội danh hoặc mức xử phạt thật.",
    "sections": [
      {
        "id": "types",
        "title": "Bốn nhóm trong bài nhập môn",
        "body": "Hình sự gắn với hành vi bị luật hình sự quy định là tội phạm. Hành chính gắn với vi phạm hành chính theo căn cứ luật định. Dân sự gắn với nghĩa vụ dân sự như thực hiện hợp đồng, bồi thường thiệt hại khi đủ điều kiện. Kỷ luật gắn với vi phạm nghĩa vụ/quy tắc trong quan hệ tổ chức, lao động… theo chế độ áp dụng.\n\nKhông phân loại chỉ theo “nặng/nhẹ”; cần xem hành vi, chủ thể, căn cứ và thẩm quyền."
      },
      {
        "id": "case",
        "title": "Một sự việc có thể phát sinh nhiều trách nhiệm",
        "body": "Một hành vi gây thiệt hại có thể đặt ra việc bồi thường và đồng thời xem xét trách nhiệm khác khi đủ căn cứ. Các loại không luôn loại trừ nhau.\n\nVí dụ tự tạo: người lao động làm hỏng tài sản. Muốn kết luận phải biết lỗi, hoàn cảnh, quan hệ và quy định áp dụng. Không mặc định mọi hư hỏng đều là tội phạm hoặc mọi vi phạm nội quy đều chỉ xử lý dân sự."
      },
      {
        "id": "method",
        "title": "Lập luận tình huống theo bốn câu hỏi",
        "body": "1. Ai thực hiện hành vi và trong quan hệ nào? 2. Hành vi cụ thể, lỗi và hậu quả là gì theo dữ kiện? 3. Quy định còn hiệu lực nào điều chỉnh, cơ quan/người nào có thẩm quyền? 4. Kết luận đến đâu đủ căn cứ, còn thiếu dữ kiện gì?\n\nCác điều kiện về tuổi, năng lực, lỗi và trách nhiệm phụ thuộc lĩnh vực. Không áp một con số tuổi duy nhất cho mọi loại trách nhiệm."
      }
    ],
    "questions": [
      {
        "id": "PL09-Q1",
        "prompt": "Nghĩa vụ bồi thường thiệt hại trong quan hệ dân sự thường thuộc?",
        "options": [
          "Trách nhiệm dân sự",
          "Luôn là hình sự",
          "Chỉ kỷ luật",
          "Không phải vấn đề pháp lý"
        ],
        "answer": 0,
        "explanation": "Bồi thường theo căn cứ dân sự là một dạng trách nhiệm dân sự; cần đủ điều kiện theo quy định."
      },
      {
        "id": "PL09-Q2",
        "prompt": "Có thể phân biệt hình sự/hành chính chỉ bằng cảm giác “rất nặng” không?",
        "options": [
          "Có",
          "Không, phải xem căn cứ luật định",
          "Chỉ nhìn số người chứng kiến",
          "Chỉ nhìn ảnh trên mạng"
        ],
        "answer": 1,
        "explanation": "Tội phạm và vi phạm hành chính có căn cứ pháp luật, không phân loại cảm tính."
      },
      {
        "id": "PL09-Q3",
        "prompt": "Một hành vi có thể phát sinh nhiều loại trách nhiệm?",
        "options": [
          "Không bao giờ",
          "Có thể, khi đủ căn cứ cho từng loại",
          "Chỉ nếu người đó đồng ý",
          "Chỉ ở trường học"
        ],
        "answer": 1,
        "explanation": "Các loại trách nhiệm không luôn loại trừ nhau."
      },
      {
        "id": "PL09-Q4",
        "prompt": "Vi phạm nghĩa vụ trong quan hệ tổ chức/lao động có thể đặt ra?",
        "options": [
          "Chỉ trách nhiệm quốc tế",
          "Trách nhiệm kỷ luật theo chế độ áp dụng",
          "Luôn là tội phạm",
          "Không cần quy định"
        ],
        "answer": 1,
        "explanation": "Kỷ luật gắn quan hệ và quy tắc áp dụng; cần đúng căn cứ/thẩm quyền."
      },
      {
        "id": "PL09-Q5",
        "prompt": "Đề thiếu dữ kiện về lỗi và hoàn cảnh. Cách trả lời phù hợp?",
        "options": [
          "Kết luận chắc chắn án cụ thể",
          "Ghi dữ kiện cần bổ sung và kết luận có điều kiện",
          "Tự thêm dữ kiện bất lợi",
          "Bỏ qua mọi quy định"
        ],
        "answer": 1,
        "explanation": "Lập luận phải dựa trên dữ kiện; không tự tạo căn cứ."
      },
      {
        "id": "PL09-Q6",
        "prompt": "Khi dùng lời giải pháp luật từ năm trước, cần kiểm tra?",
        "options": [
          "Màu chữ",
          "Hiệu lực và thay đổi văn bản liên quan",
          "Số lượt thích",
          "Tên file ngắn hay dài"
        ],
        "answer": 1,
        "explanation": "Văn bản có thể thay đổi nên phải tra hiệu lực trước áp dụng."
      }
    ],
    "challenge": "Lập bảng bốn nhóm trách nhiệm với: quan hệ điều chỉnh, ví dụ tự tạo, dữ kiện cần có và căn cứ cần tra. Không ghi mức phạt nếu chưa đọc văn bản còn hiệu lực.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN07": {
    "intro": "Chuẩn bị đồ cho một ngày học: thẻ sinh viên, sách và nước. Chọn mạo từ, lượng từ theo danh từ và ý của câu.",
    "sections": [
      {
        "id": "articles",
        "title": "A/an dựa vào âm, không chỉ chữ cái",
        "body": "A/an nói về một người/vật chưa xác định, đi với danh từ đếm được số ít. A book; an apple. Chọn theo âm đầu: an hour vì h không phát âm; a university vì âm đầu là /j/ như “you”.\n\nThe dùng khi người nghe biết bạn đang nói đối tượng nào: I have a book. The book is blue. Không đặt a trực tiếp trước danh từ số nhiều hoặc không đếm được: a books, a water không phù hợp trong nghĩa nền này."
      },
      {
        "id": "countable",
        "title": "Đếm được hay không đếm được?",
        "body": "Book, student, chair đếm được: one book, two books. Water, milk, homework thường không đếm được trong nghĩa nền: some water, a bottle of water, some homework.\n\nMany đi với danh từ đếm được số nhiều: many books. Much đi với không đếm được: much water. A lot of có thể dùng với cả hai: a lot of books/water."
      },
      {
        "id": "some-any",
        "title": "Some/any theo ngữ cảnh",
        "body": "Some thường dùng trong khẳng định: There is some milk. Any thường dùng trong phủ định và câu hỏi trung tính: There isn’t any milk. Is there any milk?\n\nLời mời/đề nghị có thể dùng some: Would you like some tea? Đây là xu hướng sử dụng, không phải quy tắc máy móc “mọi câu hỏi đều dùng any”."
      }
    ],
    "questions": [
      {
        "id": "EN07-Q1",
        "prompt": "She is ___ university student.",
        "options": [
          "an",
          "a",
          "many",
          "any"
        ],
        "answer": 1,
        "explanation": "University bắt đầu bằng âm /j/, nên dùng a."
      },
      {
        "id": "EN07-Q2",
        "prompt": "The lesson lasts ___ hour.",
        "options": [
          "a",
          "an",
          "many",
          "some"
        ],
        "answer": 1,
        "explanation": "Hour có h câm, âm đầu là nguyên âm nên dùng an."
      },
      {
        "id": "EN07-Q3",
        "prompt": "There isn’t ___ milk in the fridge.",
        "options": [
          "many",
          "a",
          "any",
          "few"
        ],
        "answer": 2,
        "explanation": "Milk không đếm được; any phù hợp câu phủ định này."
      },
      {
        "id": "EN07-Q4",
        "prompt": "How ___ books do you have?",
        "options": [
          "much",
          "many",
          "a",
          "an"
        ],
        "answer": 1,
        "explanation": "Books đếm được số nhiều nên dùng many."
      },
      {
        "id": "EN07-Q5",
        "prompt": "How ___ water do we need?",
        "options": [
          "many",
          "a",
          "an",
          "much"
        ],
        "answer": 3,
        "explanation": "Water không đếm được trong câu này, dùng much."
      },
      {
        "id": "EN07-Q6",
        "prompt": "“I bought a notebook. ___ notebook is pink.”",
        "options": [
          "A",
          "An",
          "The",
          "Any"
        ],
        "answer": 2,
        "explanation": "Notebook đã được giới thiệu, dùng the cho cuốn đó."
      },
      {
        "id": "EN07-Q7",
        "prompt": "Lời mời tự nhiên: “Would you like ___ tea?”",
        "options": [
          "a",
          "many",
          "some",
          "few"
        ],
        "answer": 2,
        "explanation": "Lời mời thường dùng some, tea không đếm được trong nghĩa này."
      }
    ],
    "challenge": "Viết danh sách mang đi học với a/an/some, rồi hỏi bạn ba câu dùng How many/How much. Chọn theo danh từ, không đoán theo độ dài từ.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN09": {
    "intro": "Lịch học là cách luyện giới từ gần nhất với bạn. Phân biệt giờ, ngày, tháng và đọc cả hai vế khi chọn liên từ.",
    "sections": [
      {
        "id": "time",
        "title": "At giờ, on ngày, in tháng/năm",
        "body": "At 8 a.m.; on Monday; on 17 October; in November; in 2026. At night nhưng in the morning/afternoon/evening trong cách nói nền.\n\nNếu đã có this/next/last/every trước cụm thời gian, thường không thêm at/on/in: next Monday, every evening, this Friday."
      },
      {
        "id": "place",
        "title": "Nơi chốn và góc nhìn",
        "body": "In the classroom nhấn trong không gian phòng; on the table là trên bề mặt; at the bus stop là tại điểm dừng. Một địa điểm có thể dùng giới từ khác khi ý/góc nhìn đổi, nên đọc ngữ cảnh.\n\nĐừng mặc định tiếng Việt “ở” luôn là at. Ghi cả cụm quen thuộc và đặt một câu thật của bạn."
      },
      {
        "id": "connect",
        "title": "Because và although nối hai ý khác nhau",
        "body": "I study in the library because my room is noisy. Because giải thích nguyên nhân.\n\nAlthough I am tired, I will study for ten minutes. Although nói tương phản với điều người đọc có thể mong đợi. Trong mẫu này không thêm but ngay sau although.\n\nTrước khi chọn, hỏi: vế sau đang giải thích lý do hay thể hiện một điều trái kỳ vọng?"
      }
    ],
    "questions": [
      {
        "id": "EN09-Q1",
        "prompt": "The exam starts ___ 8 a.m.",
        "options": [
          "in",
          "on",
          "at",
          "from"
        ],
        "answer": 2,
        "explanation": "Giờ cụ thể dùng at."
      },
      {
        "id": "EN09-Q2",
        "prompt": "We have Physics ___ Monday.",
        "options": [
          "at",
          "on",
          "in",
          "to"
        ],
        "answer": 1,
        "explanation": "Ngày trong tuần dùng on."
      },
      {
        "id": "EN09-Q3",
        "prompt": "Classes begin ___ November.",
        "options": [
          "in",
          "on",
          "at",
          "for"
        ],
        "answer": 0,
        "explanation": "Tháng dùng in."
      },
      {
        "id": "EN09-Q4",
        "prompt": "I usually study ___ the evening.",
        "options": [
          "on",
          "at",
          "in",
          "to"
        ],
        "answer": 2,
        "explanation": "Cụm nền: in the evening."
      },
      {
        "id": "EN09-Q5",
        "prompt": "I study in the library ___ my room is noisy.",
        "options": [
          "although",
          "because",
          "but",
          "or"
        ],
        "answer": 1,
        "explanation": "Phòng ồn là lý do chọn thư viện."
      },
      {
        "id": "EN09-Q6",
        "prompt": "___ she is tired, she still finishes her homework.",
        "options": [
          "Because",
          "And",
          "Although",
          "So"
        ],
        "answer": 2,
        "explanation": "Vẫn làm xong dù mệt là quan hệ tương phản."
      },
      {
        "id": "EN09-Q7",
        "prompt": "Chọn câu đúng.",
        "options": [
          "See you on next Monday.",
          "See you at next Monday.",
          "See you in next Monday.",
          "See you next Monday."
        ],
        "answer": 3,
        "explanation": "Next Monday thường không đi cùng at/on/in."
      }
    ],
    "challenge": "Viết lịch ngày mai bằng ba câu có giờ/ngày/buổi. Viết thêm một câu giải thích lý do với because và một câu tương phản với although.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN10": {
    "intro": "Đọc nội quy phòng thi bằng can, must, should. Ba từ khác ý nhưng đều đi với động từ nguyên mẫu trong các câu nền này.",
    "sections": [
      {
        "id": "form",
        "title": "Modal + động từ nguyên mẫu",
        "body": "You must bring your student card. She can answer the question. You should sleep early. Không thêm s/es hay to ngay sau can/must/should.\n\nCâu hỏi: Can you help me? Phủ định: cannot/can’t, must not/mustn’t, should not/shouldn’t."
      },
      {
        "id": "meaning",
        "title": "Khả năng, yêu cầu và lời khuyên",
        "body": "Can thường nói khả năng hoặc xin/cho phép trong ngữ cảnh: I can swim. Can I sit here? Must nêu điều bắt buộc: You must follow the instructions. Should nêu lời khuyên: You should review your notes.\n\nChọn theo ý, không chỉ theo dạng động từ. Một việc hữu ích chưa tự động trở thành yêu cầu bắt buộc."
      },
      {
        "id": "negative",
        "title": "Không được khác không cần",
        "body": "You mustn’t cheat. = bạn không được gian lận. You don’t have to bring a laptop. = bạn không cần mang laptop; không phải bị cấm mang.\n\nDon’t have to là cấu trúc mở rộng để phân biệt nghĩa. Chưa dùng câu tự luyện này làm nội quy trường; nội quy thật cần đọc thông báo chính thức."
      }
    ],
    "questions": [
      {
        "id": "EN10-Q1",
        "prompt": "You must ___ your student card.",
        "options": [
          "bringing",
          "to bring",
          "bring",
          "brings"
        ],
        "answer": 2,
        "explanation": "Sau must dùng nguyên mẫu bring."
      },
      {
        "id": "EN10-Q2",
        "prompt": "She can ___ English.",
        "options": [
          "speaks",
          "speaking",
          "to speak",
          "speak"
        ],
        "answer": 3,
        "explanation": "Sau can không thêm s/to: speak."
      },
      {
        "id": "EN10-Q3",
        "prompt": "“You should sleep early.” chủ yếu diễn đạt?",
        "options": [
          "Lời khuyên",
          "Quá khứ",
          "Khả năng bơi",
          "Tên người"
        ],
        "answer": 0,
        "explanation": "Should thường dùng để khuyên."
      },
      {
        "id": "EN10-Q4",
        "prompt": "“You mustn’t use your phone.” nghĩa là?",
        "options": [
          "Bạn không cần dùng điện thoại",
          "Bạn không được dùng điện thoại",
          "Bạn đã dùng điện thoại",
          "Bạn có thể dùng điện thoại"
        ],
        "answer": 1,
        "explanation": "Mustn’t diễn đạt cấm, không phải không cần."
      },
      {
        "id": "EN10-Q5",
        "prompt": "“You don’t have to bring a laptop.” nghĩa là?",
        "options": [
          "Bạn bị cấm mang laptop",
          "Bạn buộc phải mang laptop",
          "Bạn không cần mang laptop",
          "Laptop đang hỏng"
        ],
        "answer": 2,
        "explanation": "Don’t have to nghĩa không có yêu cầu bắt buộc."
      },
      {
        "id": "EN10-Q6",
        "prompt": "Câu hỏi đúng để xin giúp đỡ?",
        "options": [
          "Do can you help me?",
          "Can you help me?",
          "Can you helps me?",
          "You can to help me?"
        ],
        "answer": 1,
        "explanation": "Can lên trước chủ ngữ, help giữ nguyên mẫu."
      }
    ],
    "challenge": "Viết ba câu cho nhóm học: một điều bạn có thể làm, một lời khuyên, một điều bắt buộc/cấm trong nội quy tự tạo. Ghi rõ đâu là ví dụ, đâu là quy định thật.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN17": {
    "intro": "Bạn lần đầu gặp cách đọc ký hiệu email. Phần câu hỏi ở đây luyện nhận diện bằng chữ; phần nghe thật dùng tài nguyên audio riêng và phải ghi kết quả riêng.",
    "sections": [
      {
        "id": "symbols",
        "title": "Bộ giải mã email",
        "body": "Dot = dấu chấm .; at = @; hyphen hoặc dash = gạch ngang -; underscore = gạch dưới _.\n\n“Nam dot Tran at study hyphen club dot com” → nam.tran@study-club.com. Giữ tên được đọc/đánh vần, đừng tự đổi nguyen thành nguyet. Bài ký hiệu bằng chữ chưa đo khả năng nghe."
      },
      {
        "id": "time",
        "title": "Giờ và số: đọc quan hệ trước sau",
        "body": "Half past eight = 8:30. Quarter past eight = 8:15. Quarter to nine = 8:45. A.m. chỉ trước trưa, p.m. sau trưa; 12 p.m. là trưa.\n\nTrong audio, thirteen và thirty có thể dễ nhầm. Ghi số dự kiến từ câu hỏi, nghe trọng âm và kiểm tra ngữ cảnh; không đoán chỉ vì một từ trông quen."
      },
      {
        "id": "audio",
        "title": "Nhiệm vụ audio thật: hai lượt, chưa xem transcript",
        "body": "Mở British Council A1 — A voicemail message ở mục tài nguyên. Đọc câu hỏi trước, nghe tối đa hai lượt và làm Task 1 trước khi xem transcript.\n\nGhi riêng: nguồn bài, số lượt nghe, số đúng/tổng. Sau đó mở transcript, tìm đúng đoạn sai, nghe lại và ghi âm/cụm chưa nhận ra. Bạn đã có kết quả lịch sử 2/4 sau hai lượt; luyện lại cùng bài không phải lượt chẩn đoán mới độc lập. Chọn bài nghe A1 mới khi muốn đo tiến bộ."
      }
    ],
    "questions": [
      {
        "id": "EN17-Q1",
        "prompt": "Luyện bằng chữ: “dot” tương ứng ký hiệu nào?",
        "options": [
          "@",
          "_",
          ".",
          "-"
        ],
        "answer": 2,
        "explanation": "Dot là dấu chấm."
      },
      {
        "id": "EN17-Q2",
        "prompt": "Luyện bằng chữ: “underscore” tương ứng?",
        "options": [
          "_",
          "-",
          ".",
          "@"
        ],
        "answer": 0,
        "explanation": "Underscore là gạch dưới; hyphen/dash là gạch ngang."
      },
      {
        "id": "EN17-Q3",
        "prompt": "“Mai dot Le at study hyphen club dot com” viết thành?",
        "options": [
          "mai.le@study_club.com",
          "mai_le@study-club.com",
          "mai.le@study-club.com",
          "mai.le.study-club@com"
        ],
        "answer": 2,
        "explanation": "Dot→.; at→@; hyphen→-."
      },
      {
        "id": "EN17-Q4",
        "prompt": "“Quarter to nine” là mấy giờ?",
        "options": [
          "9:15",
          "8:45",
          "9:45",
          "8:15"
        ],
        "answer": 1,
        "explanation": "Còn15 phút tới9giờ: 8:45."
      },
      {
        "id": "EN17-Q5",
        "prompt": "“Half past eight” là?",
        "options": [
          "8:15",
          "8:45",
          "8:30",
          "9:30"
        ],
        "answer": 2,
        "explanation": "Half past là30 phút sau giờ."
      },
      {
        "id": "EN17-Q6",
        "prompt": "Cách ghi tiến độ nghe nào đúng?",
        "options": [
          "Dùng điểm bài ký hiệu bằng chữ làm điểm nghe",
          "Chỉ ghi đã mở audio",
          "Ghi nguồn, số lượt nghe và số đúng audio riêng",
          "Tăng điểm chẩn đoán chỉ vì đã đọc đáp án"
        ],
        "answer": 2,
        "explanation": "Bài chữ và audio đo việc khác nhau; ghi bằng chứng thật của lượt nghe."
      }
    ],
    "challenge": "Làm một audio A1 thật, chưa xem transcript trước. Ghi nguồn, số lượt, điểm Task1, hai cụm nghe hụt và cách bạn sửa; không nhập điểm quiz ký hiệu thay cho điểm nghe.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài.",
    "quizLabel": "Luyện ký hiệu bằng chữ",
    "quizScope": "Điểm quiz này chưa đo khả năng nghe. Làm audio thật và ghi số lượt/điểm nghe riêng."
  },
  "EN19": {
    "intro": "Đọc một mẩu thông báo gần việc học của bạn. Đây là đoạn tự soạn, không phải lịch thực tế hay thông báo Phenikaa.",
    "sections": [
      {
        "id": "strategy",
        "title": "Tìm điều kiện và bằng chứng",
        "body": "Đọc câu hỏi, gạch từ khóa: ai, ở đâu, khi nào, vì sao. Tìm câu chứa thông tin tương ứng. Nếu hỏi riêng thứ Sáu, không lấy giờ “usually” của ngày thường.\n\nSkimming giúp nắm chủ đề; scanning giúp tìm chi tiết. Trả lời bằng thông tin trong đoạn, không thêm kiến thức ngoài hoặc đoán theo lịch của bạn."
      },
      {
        "id": "story",
        "title": "Reading: A change of study room",
        "body": "Lan and Minh are first-year students. They usually study in the library on Friday afternoons, from two to four. This Friday, the library will close at one because the staff need to prepare for an event. Lan books room B12 in the student centre instead. Their group meeting will start at three and finish at five. Minh plans to arrive at half past two to set up his laptop. Lan asks everyone to bring headphones and a student card. The group will practise English first, then review Physics. Students who cannot come can join online, but they must tell Lan before Thursday evening."
      },
      {
        "id": "check",
        "title": "So sánh thường lệ với lần này",
        "body": "Usually: học thư viện thứ Sáu2–4giờ. This Friday: thư viện đóng1giờ, nhóm đổi sangB12 và họp3–5giờ. Đừng trộn các mốc.\n\nBefore Thursday evening là hạn báo Lan, không phải giờ bắt đầu họp. Half past two là2:30, khác three là3:00. Mỗi đáp án nên trỏ được tới một câu bằng chứng."
      }
    ],
    "questions": [
      {
        "id": "EN19-Q1",
        "prompt": "Where do Lan and Minh usually study on Fridays?",
        "options": [
          "Room B12",
          "The library",
          "A café",
          "At home"
        ],
        "answer": 1,
        "explanation": "Câu2: They usually study in the library."
      },
      {
        "id": "EN19-Q2",
        "prompt": "Why will the library close at one this Friday?",
        "options": [
          "The students have an exam",
          "The staff need to prepare for an event",
          "Minh has no laptop",
          "The room is too cold"
        ],
        "answer": 1,
        "explanation": "Đoạn ghi lý do staff need to prepare for an event."
      },
      {
        "id": "EN19-Q3",
        "prompt": "Where will the group meet this Friday?",
        "options": [
          "Room B12 in the student centre",
          "The library",
          "Lan’s home",
          "Room A6"
        ],
        "answer": 0,
        "explanation": "Lan books room B12 in the student centre instead."
      },
      {
        "id": "EN19-Q4",
        "prompt": "When will the group meeting start?",
        "options": [
          "1 p.m.",
          "2 p.m.",
          "2:30 p.m.",
          "3 p.m."
        ],
        "answer": 3,
        "explanation": "Meeting will start at three;2:30 là giờ Minh tới trước."
      },
      {
        "id": "EN19-Q5",
        "prompt": "What will the group practise first?",
        "options": [
          "Physics",
          "English",
          "Running",
          "Computer repair"
        ],
        "answer": 1,
        "explanation": "Practise English first, then review Physics."
      },
      {
        "id": "EN19-Q6",
        "prompt": "What must students who cannot come do?",
        "options": [
          "Buy a laptop",
          "Tell Lan before Thursday evening",
          "Visit the library at one",
          "Cancel all their classes"
        ],
        "answer": 1,
        "explanation": "Có thể join online nhưng must tell Lan before Thursday evening."
      },
      {
        "id": "EN19-Q7",
        "prompt": "What time does Minh plan to arrive?",
        "options": [
          "2 p.m.",
          "2:15 p.m.",
          "2:30 p.m.",
          "3 p.m."
        ],
        "answer": 2,
        "explanation": "Half past two=2:30, để chuẩn bị laptop."
      }
    ],
    "challenge": "Viết bảng hai cột “usually / this Friday” với địa điểm, giờ và hoạt động. Chỉ ra câu bằng chứng cho mỗi dòng; không lấy lịch mẫu này làm lịch học thật.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "GT05": {
    "intro": "Trước mỗi giới hạn, thử thế trực tiếp để phân loại. Một kết quả0/0 là tín hiệu cần biến đổi, không phải đáp án bằng0.",
    "sections": [
      {
        "id": "continuity",
        "title": "Khi hàm liên tục tại điểm đang xét",
        "body": "Đa thức liên tục mọi nơi: lim(x²+3x) khi x→2 bằng4+6=10. Phân thức liên tục khi mẫu tại điểm xét khác0; căn liên tục trên miền phù hợp.\n\nVí dụ lim(x+1)/(x+2) khi x→1 bằng2/3. Kiểm tra mẫu trước kết luận."
      },
      {
        "id": "classify",
        "title": "Ba loại kết quả cần phân biệt",
        "body": "Số hữu hạn: thế vào ra số xác định, khi áp dụng được tính liên tục. Dạng0/0: cả tử/mẫu→0, phải biến đổi. Mẫu→0 và tử→c khác0: cần xem dấu, phía tiếp cận; không tự ghi0 hay một vô cực chung.\n\nGiới hạn của1/x tại0: phía phải→+∞, phía trái→−∞, nên giới hạn hai phía không tồn tại."
      },
      {
        "id": "workflow",
        "title": "Ghi một dòng phân loại trước phép giải",
        "body": "Viết: điểm tới đâu, miền xác định gần điểm, kết quả thế trực tiếp. Nếu0/0, chọn nhân tử/liên hợp/lượng giác theo cấu trúc.\n\nGiá trị hàm tại điểm và giới hạn là hai câu hỏi khác. Hàm có thể không xác định đúng tại điểm nhưng vẫn có giới hạn vì giới hạn xét các giá trị gần điểm đó."
      }
    ],
    "questions": [
      {
        "id": "GT05-Q1",
        "prompt": "lim khi x→2 của x²+3x bằng?",
        "options": [
          "5",
          "8",
          "10",
          "0"
        ],
        "answer": 2,
        "explanation": "Đa thức liên tục; thế2:4+6=10."
      },
      {
        "id": "GT05-Q2",
        "prompt": "lim khi x→1 của (x+1)/(x+2) bằng?",
        "options": [
          "1/2",
          "2/3",
          "3/2",
          "0"
        ],
        "answer": 1,
        "explanation": "Mẫu3 khác0 nên thế trực tiếp được."
      },
      {
        "id": "GT05-Q3",
        "prompt": "Thế x=1 vào (x²−1)/(x−1) cho0/0. Kết luận đúng?",
        "options": [
          "Giới hạn chắc bằng0",
          "Giới hạn chắc bằng1",
          "Cần biến đổi tiếp",
          "Hàm bằng0 mọi nơi"
        ],
        "answer": 2,
        "explanation": "0/0 là dạng vô định, chưa quyết định giới hạn."
      },
      {
        "id": "GT05-Q4",
        "prompt": "lim khi x→3 của √(x+1) bằng?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 1,
        "explanation": "Căn liên tục tại biểu thức4; √4=2."
      },
      {
        "id": "GT05-Q5",
        "prompt": "lim hai phía của1/x khi x→0 là?",
        "options": [
          "0",
          "1",
          "+∞ chung cho cả hai phía",
          "Không tồn tại vì hai phía khác nhau"
        ],
        "answer": 3,
        "explanation": "Bên phải+∞, bên trái−∞, không có cùng giới hạn hai phía."
      },
      {
        "id": "GT05-Q6",
        "prompt": "Hàm không xác định tại x=a có thể có giới hạn khi x→a không?",
        "options": [
          "Có thể",
          "Không bao giờ",
          "Chỉ nếu a=0",
          "Chỉ với số nguyên"
        ],
        "answer": 0,
        "explanation": "Giới hạn xét giá trị gần điểm, không bắt buộc có giá trị hàm tại điểm."
      }
    ],
    "challenge": "Phân loại rồi giải: lim(x²−2x+5) tại x→1; lim(x²−4)/(x−2) tại x→2; lim1/(x−2) tại x→2 từ phía phải.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "GT06": {
    "intro": "Khi tử và mẫu cùng về0, nhân tử chung có thể đang che một biểu thức đơn giản. Khử trên lân cận thủng, giữ điều kiện xác định.",
    "sections": [
      {
        "id": "factor",
        "title": "Tách nhân tử tạo đúng mẫu",
        "body": "x²−a²=(x−a)(x+a). Với x→1: (x²−1)/(x−1)=x+1 khi x≠1, nên giới hạn bằng2.\n\nKhông gán x=1 vào phân thức gốc rồi chia0. Hai biểu thức bằng nhau trên vùng x≠1 gần điểm, đủ để tính giới hạn."
      },
      {
        "id": "cubic",
        "title": "Lập phương và tam thức",
        "body": "x³−a³=(x−a)(x²+ax+a²). Vì thế (x³−8)/(x−2)=x²+2x+4 với x≠2, giới hạn tại2 bằng12.\n\nTam thức x²+x−2=(x−1)(x+2). Kiểm tra bằng nhân lại trước khử để tránh nhầm dấu."
      },
      {
        "id": "domain",
        "title": "Khử không xóa lỗ hổng của hàm gốc",
        "body": "(x²−4)/(x−2)=x+2 chỉ khi x≠2. Giới hạn tại2 là4 nhưng hàm gốc vẫn chưa có giá trị tại2.\n\nKhi mẫu làx+2 và x→−2, khửx+2 thì cònx−2, giới hạn−4. Đọc dấu và điểm xét, không chọn công thức theo hình quen."
      }
    ],
    "questions": [
      {
        "id": "GT06-Q1",
        "prompt": "lim(x²−1)/(x−1) khi x→1 bằng?",
        "options": [
          "0",
          "1",
          "2",
          "Không tồn tại"
        ],
        "answer": 2,
        "explanation": "Khửx−1 trên x≠1, cònx+1→2."
      },
      {
        "id": "GT06-Q2",
        "prompt": "lim(x²−9)/(x−3) khi x→3 bằng?",
        "options": [
          "3",
          "6",
          "9",
          "0"
        ],
        "answer": 1,
        "explanation": "x²−9=(x−3)(x+3), cònx+3→6."
      },
      {
        "id": "GT06-Q3",
        "prompt": "lim(x³−8)/(x−2) khi x→2 bằng?",
        "options": [
          "4",
          "8",
          "12",
          "16"
        ],
        "answer": 2,
        "explanation": "Cònx²+2x+4; thế2 được4+4+4=12."
      },
      {
        "id": "GT06-Q4",
        "prompt": "lim(x²−4)/(x+2) khi x→−2 bằng?",
        "options": [
          "4",
          "−4",
          "2",
          "0"
        ],
        "answer": 1,
        "explanation": "Khửx+2, cònx−2→−4."
      },
      {
        "id": "GT06-Q5",
        "prompt": "lim(x²+x−2)/(x−1) khi x→1 bằng?",
        "options": [
          "1",
          "2",
          "3",
          "−3"
        ],
        "answer": 2,
        "explanation": "Tử=(x−1)(x+2), cònx+2→3."
      },
      {
        "id": "GT06-Q6",
        "prompt": "Sau khi khửx−2 trong (x²−4)/(x−2), điều nào đúng?",
        "options": [
          "Hàm gốc tự có giá trị4 tại2",
          "Đẳng thức với x+2 dùng khi x≠2",
          "Mọi mẫu0 đều bằng0",
          "Không thể tính giới hạn"
        ],
        "answer": 1,
        "explanation": "Khử giữ điều kiệnx≠2; giới hạn khác giá trị hàm gốc tại điểm."
      }
    ],
    "challenge": "Tự giải (x²−25)/(x−5) khi x→5 và (x²+3x+2)/(x+1) khi x→−1. Ghi điều kiện và nhân lại phần tách nhân tử để kiểm tra.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "GT07": {
    "intro": "Biểu thức có căn thường rút gọn nhờ nhân liên hợp. Mục tiêu là dùng(a−b)(a+b)=a²−b² để tạo nhân tử có thể khử.",
    "sections": [
      {
        "id": "identity",
        "title": "Liên hợp biến hiệu căn thành đa thức",
        "body": "(√(x+1)−1)/x khi x→0 có dạng0/0. Nhân tử/mẫu với√(x+1)+1: tử thànhx, rồi khửx trên x≠0. Còn1/(√(x+1)+1)→1/2.\n\nNhân cả tử lẫn mẫu, không chỉ một phía. Giữ điều kiện căn và mẫu của hàm gốc."
      },
      {
        "id": "constants",
        "title": "Giữ số hạng và dấu đúng",
        "body": "(√(x+4)−2)/x →1/(√(x+4)+2)→1/4 tại0. Nếu tử là2−√(x+4), kết quả đổi dấu thành−1/4.\n\nVới x→4: (√x−2)/(x−4)=1/(√x+2) khi x≠4, nên giới hạn1/4."
      },
      {
        "id": "two-roots",
        "title": "Hiệu hai căn",
        "body": "(√(1+3x)−√(1+x))/x. Liên hợp là√(1+3x)+√(1+x). Tử sau nhân thành2x, khửx còn2/[√(1+3x)+√(1+x)]→1.\n\nNếu sau liên hợp vẫn0/0, đừng dừng; kiểm tra nhân tử còn lại và chọn bước tiếp theo."
      }
    ],
    "questions": [
      {
        "id": "GT07-Q1",
        "prompt": "Liên hợp của √(x+1)−1 là?",
        "options": [
          "√(x+1)−1",
          "√(x−1)+1",
          "√(x+1)+1",
          "x+1"
        ],
        "answer": 2,
        "explanation": "Đổi dấu giữa hai hạng, dùng hiệu hai bình phương."
      },
      {
        "id": "GT07-Q2",
        "prompt": "lim(√(x+1)−1)/x khi x→0 bằng?",
        "options": [
          "1",
          "1/2",
          "0",
          "2"
        ],
        "answer": 1,
        "explanation": "Liên hợp rồi khửx, mẫu tiến tới2."
      },
      {
        "id": "GT07-Q3",
        "prompt": "lim(√(x+4)−2)/x khi x→0 bằng?",
        "options": [
          "1/2",
          "1/4",
          "2",
          "4"
        ],
        "answer": 1,
        "explanation": "Sau khử còn1/(√(x+4)+2)→1/4."
      },
      {
        "id": "GT07-Q4",
        "prompt": "lim(2−√(x+4))/x khi x→0 bằng?",
        "options": [
          "1/4",
          "−1/4",
          "0",
          "−4"
        ],
        "answer": 1,
        "explanation": "Tử đối dấu câu mẫu, giới hạn−1/4."
      },
      {
        "id": "GT07-Q5",
        "prompt": "lim(√(1+3x)−√(1+x))/x khi x→0 bằng?",
        "options": [
          "1/2",
          "1",
          "2",
          "3"
        ],
        "answer": 1,
        "explanation": "Tử sau liên hợp2x, mẫu căn→2, tỉ số1."
      },
      {
        "id": "GT07-Q6",
        "prompt": "Khi nhân liên hợp một phân thức, cần?",
        "options": [
          "Chỉ nhân tử",
          "Chỉ nhân mẫu",
          "Nhân cả tử và mẫu cùng biểu thức hợp lệ",
          "Thay mọi căn bằng0"
        ],
        "answer": 2,
        "explanation": "Nhân cả hai giữ giá trị trên miền biểu thức hợp lệ."
      }
    ],
    "challenge": "Giải hai bài: (√(x+9)−3)/x tại0; (√(4+2x)−2)/x tại0. Ghi biểu thức liên hợp và điều kiện trước khử.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "GT09": {
    "intro": "Giới hạn sin bạn đã luyện được mở rộng bằng thay đối số. Radian và hệ số trướcx là hai điểm cần giữ đúng.",
    "sections": [
      {
        "id": "core",
        "title": "Giới hạn chuẩn",
        "body": "Khiu→0 và góc tính bằng radian: sin(u)/u→1. Thế trực tiếp cho0/0 nên cần nhận dạng chuẩn, không kết luận0.\n\nĐối số có thể là3x, x/2,… miễn đối số→0. Phải dùng chính đối số đó ở mẫu của phần chuẩn."
      },
      {
        "id": "scale",
        "title": "Tạo đúng đối số ở mẫu",
        "body": "Sin(3x)/(2x)= (3/2)·[sin(3x)/(3x)]→3/2. Giữ hệ số3/2 ở ngoài.\n\nSin(2x)/sin(5x)= [sin(2x)/(2x)] / [sin(5x)/(5x)] ·2/5→2/5. Chuyển mỗi sin thành phần chuẩn, rồi cộng hệ số."
      },
      {
        "id": "powers",
        "title": "Lũy thừa và dấu",
        "body": "Sin²(x)/x²=[sin(x)/x]²→1. Sin(−x)/x=−sin(x)/x→−1.\n\nCác công thức này dùng quanh0. Nếu x→π, không áp trực tiếp sin(x)/x→1; xem lại điểm và đối số đang tiến tới đâu."
      }
    ],
    "questions": [
      {
        "id": "GT09-Q1",
        "prompt": "lim sin(x)/x khi x→0 theo radian?",
        "options": [
          "0",
          "1",
          "π",
          "Không tồn tại"
        ],
        "answer": 1,
        "explanation": "Giới hạn chuẩn bằng1."
      },
      {
        "id": "GT09-Q2",
        "prompt": "lim sin(3x)/(2x) khi x→0 bằng?",
        "options": [
          "2/3",
          "3/2",
          "3",
          "1"
        ],
        "answer": 1,
        "explanation": "Tạo mẫu3x và giữ hệ số3/2."
      },
      {
        "id": "GT09-Q3",
        "prompt": "lim sin(2x)/sin(5x) khi x→0 bằng?",
        "options": [
          "5/2",
          "2/5",
          "1",
          "10"
        ],
        "answer": 1,
        "explanation": "Mỗi sin đối sánh với đối số, tỉ số hệ số2/5."
      },
      {
        "id": "GT09-Q4",
        "prompt": "lim sin²(x)/x² khi x→0 bằng?",
        "options": [
          "0",
          "1",
          "2",
          "−1"
        ],
        "answer": 1,
        "explanation": "Bình phươngsin(x)/x→1²."
      },
      {
        "id": "GT09-Q5",
        "prompt": "lim sin(−x)/x khi x→0 bằng?",
        "options": [
          "1",
          "−1",
          "0",
          "π"
        ],
        "answer": 1,
        "explanation": "Sin là hàm lẻ: sin(−x)=−sin(x)."
      },
      {
        "id": "GT09-Q6",
        "prompt": "Khi nào được dùng sin(u)/u→1?",
        "options": [
          "u→0 theo radian",
          "u→π bất kỳ",
          "u→∞",
          "Chỉ khiu=0 chính xác"
        ],
        "answer": 0,
        "explanation": "Giới hạn xétu→0, không chia tại0; cần quy ước radian."
      }
    ],
    "challenge": "Giải sin(4x)/(3x), sin(x/2)/x, sin²(3x)/(2x²) tại x→0. Viết phần chuẩn và hệ số bên ngoài riêng.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "GT11": {
    "intro": "Sau sin/tan/cos, thêm hai giới hạn chuẩn mũ/log. Kiểm tra miềnlog trước khi thế và phân biệtln vớilog cơ số khác.",
    "sections": [
      {
        "id": "exponential",
        "title": "eᵘ−1 quanh0",
        "body": "Khíu→0: (eᵘ−1)/u→1. Ví dụ(e²ˣ−1)/x=2·[(e²ˣ−1)/(2x)]→2.\n\nVới cơ sốa>0: (aˣ−1)/x→ln(a). Khi a=1 kết quả0. Không thayln(a) bằnga; aˣ=eˣˡⁿ⁽ᵃ⁾."
      },
      {
        "id": "log",
        "title": "ln(1+u) quanh0",
        "body": "Khíu→0 và1+u>0: ln(1+u)/u→1. Với ln(1+3x)/x, hệ số3 đi ra ngoài nên giới hạn3.\n\nMiềnx gần0 phải bảo đảm1+3x>0. Ln làlog cơ sốe;logₐ(t)=ln(t)/ln(a) vớia>0,a≠1."
      },
      {
        "id": "combination",
        "title": "Tỉ số hai dạng chuẩn",
        "body": "Ln(1+2x)/(e³ˣ−1) = [ln(1+2x)/(2x)] / [(e³ˣ−1)/(3x)] ·2/3→2/3.\n\nNếu tử làln(1−2x), đối sốu=−2x nên hệ sốâm. Không bỏ dấu khi tạo phần chuẩn. Bài này dùng giới hạn chuẩn, chưa cầnL’Hôpital."
      }
    ],
    "questions": [
      {
        "id": "GT11-Q1",
        "prompt": "lim(e²ˣ−1)/x khi x→0 bằng?",
        "options": [
          "1",
          "2",
          "1/2",
          "0"
        ],
        "answer": 1,
        "explanation": "Tạo đối số2x, giữ hệ số2."
      },
      {
        "id": "GT11-Q2",
        "prompt": "lim ln(1+3x)/x khi x→0 bằng?",
        "options": [
          "1",
          "1/3",
          "3",
          "0"
        ],
        "answer": 2,
        "explanation": "Ln(1+3x)/(3x)→1 nên kết quả3."
      },
      {
        "id": "GT11-Q3",
        "prompt": "lim(2ˣ−1)/x khi x→0 bằng?",
        "options": [
          "2",
          "1",
          "ln(2)",
          "0"
        ],
        "answer": 2,
        "explanation": "Công thức cơ sốa cho ln(a), không phải a."
      },
      {
        "id": "GT11-Q4",
        "prompt": "lim ln(1−2x)/x khi x→0 bằng?",
        "options": [
          "2",
          "−2",
          "1/2",
          "0"
        ],
        "answer": 1,
        "explanation": "Đối sốu=−2x, giữ hệ số−2."
      },
      {
        "id": "GT11-Q5",
        "prompt": "lim ln(1+2x)/(e³ˣ−1) khi x→0 bằng?",
        "options": [
          "3/2",
          "2/3",
          "1",
          "6"
        ],
        "answer": 1,
        "explanation": "Tử tương ứng hệ số2, mẫu3; tỉ số2/3."
      },
      {
        "id": "GT11-Q6",
        "prompt": "Điều kiện thực của ln(1+3x) là?",
        "options": [
          "1+3x>0",
          "1+3x≥0",
          "x phải là số nguyên",
          "x=0 duy nhất"
        ],
        "answer": 0,
        "explanation": "Đối sốlog phải dương, không được bằng0."
      }
    ],
    "challenge": "Giải(e⁵ˣ−1)/(2x), ln(1+x/2)/x, (3ˣ−1)/ln(1+x) tại0. Ghi miềnlog và hệ số trước kết luận.",
    "provenance": "Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.",
    "completionHint": "Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài."
  },
  "EN01": {
    "intro": "Chẩn đoán 4 kỹ năng ngày 07/10: Ngữ pháp 3/8, Từ vựng 3/5, Đọc 4/5, Nghe 2/4. Tổng ôn bản chất các lỗi thường gặp trong kỳ thi phân loại Tiếng Anh đầu vào (50 câu / 60 phút tại tòa A6, ngày 17-18/10/2026).",
    "sections": [
      {
        "id": "symbols",
        "title": "1. Ký hiệu phát âm Email & Nghe chi tiết",
        "body": "Trong bài thi nghe và đọc thông tin, ký hiệu email thường gặp:\n- dot (.) = dấu chấm (Ví dụ: nam dot tran -> nam.tran)\n- at (@) = dấu a còng (Ví dụ: at study -> @study)\n- hyphen / dash (-) = dấu gạch ngang (Ví dụ: study-club)\n- underscore (_) = dấu gạch dưới (Ví dụ: thuan_ai)\n\nBẫy lỗi kinh điển: Thí sinh rất dễ nhầm giữa hyphen (-) và underscore (_), hoặc nghe 'dot' lại viết nguyên chữ 'dot' thay vì dấu chấm (.)."
      },
      {
        "id": "grammar",
        "title": "2. Bản chất ngữ pháp nền & Trợ động từ",
        "body": "1. Thói quen ở hiện tại: He / She / It + V-s/es. Ví dụ: She studies English every evening (study -> studies).\n2. Trợ động từ câu hỏi: 'Do you...?' nhưng 'Does she...?'. Khi đã mượn trợ động từ Does thì động từ chính trở về nguyên mẫu (Does she study...?).\n3. Hành động đang diễn ra: S + be + V-ing (The students are playing football).\n4. Động từ khuyết thiếu: must / can / should + V-nguyên mẫu (You must bring your student card)."
      },
      {
        "id": "vocab_reading",
        "title": "3. Từ vựng cụm cố định & Bẫy đọc hiểu",
        "body": "1. Cụm từ cố định (Collocations): 'pay attention to' (chú ý đến); 'borrow' (mượn từ ai); 'lend' (cho ai mượn); 'spend time/money on' (dành thời gian/tiền bạc).\n2. Bẫy đọc hiểu ngày thi: Phân biệt quy tắc thường lệ với ngoại lệ riêng biệt. Ví dụ: 'Thư viện thường mở lúc 8h sáng, riêng thứ Ba mở lúc 10h sáng'. Nếu đề hỏi thời gian mở cửa ngày thứ Ba mà chọn 8h là dính bẫy!"
      }
    ],
    "questions": [
      {
        "id": "EN01-Q1",
        "prompt": "Địa chỉ email đọc là: 'mai dot le at phenikaa hyphen uni dot edu dot vn'. Viết đúng là:",
        "options": [
          "mai.le@phenikaa_uni.edu.vn",
          "mai.le@phenikaa-uni.edu.vn",
          "mai_le@phenikaa-uni.edu.vn",
          "maile@phenikaa.uni.edu.vn"
        ],
        "answer": 1,
        "explanation": "dot là dấu chấm (.), hyphen là dấu gạch ngang (-)."
      },
      {
        "id": "EN01-Q2",
        "prompt": "Chọn câu đúng về thói quen học tập của Lan:",
        "options": [
          "Lan study English every morning.",
          "Lan studies English every morning.",
          "Lan is study English every morning.",
          "Lan does studies English every morning."
        ],
        "answer": 1,
        "explanation": "Chủ ngữ Lan là ngôi 3 số ít, động từ study tận cùng là phụ âm + y nên đổi thành -ies (studies)."
      },
      {
        "id": "EN01-Q3",
        "prompt": "Chọn trợ động từ đúng: '___ your brother live in Hanoi?'",
        "options": [
          "Do",
          "Does",
          "Is",
          "Are"
        ],
        "answer": 1,
        "explanation": "your brother là ngôi thứ 3 số ít (he), câu hỏi thì hiện tại đơn với động từ thường live dùng trợ động từ Does."
      },
      {
        "id": "EN01-Q4",
        "prompt": "“You must ___ quiet in the exam room.”",
        "options": [
          "be",
          "are",
          "to be",
          "being"
        ],
        "answer": 0,
        "explanation": "Sau modal verb (must, can, should...) động từ luôn ở dạng nguyên mẫu không to (bare infinitive): must be."
      },
      {
        "id": "EN01-Q5",
        "prompt": "Điền từ thích hợp: 'Please pay ___ to the instructions on the screen.'",
        "options": [
          "focus",
          "attention",
          "notice",
          "listening"
        ],
        "answer": 1,
        "explanation": "Cụm từ cố định: pay attention to something = chú ý, để tâm đến điều gì."
      }
    ]
  },
  "EN05": {
    "intro": "Tiết EN05 — Quá khứ đơn. Mục tiêu: Was/were, V2, did+V. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN05 [Quá khứ đơn] tập trung vào mục tiêu: Was/were, V2, did+V.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN05:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 15 câu + đọc/ nghe sự kiện hôm qua.\nĐiều kiện đạt: ≥13/15; không dùng did+V2.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN05-Q1",
        "prompt": "Trong bài học [EN05] \"Quá khứ đơn\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN05-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Quá khứ đơn\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Was/were, V2, did+V\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Was/were, V2, did+V\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN05-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN05] theo lộ trình là gì?",
        "options": [
          "≥13/15; không dùng did+V2",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥13/15; không dùng did+V2."
      }
    ]
  },
  "EN06": {
    "intro": "Tiết EN06 — Tương lai nền. Mục tiêu: Will/going to, kế hoạch và dấu hiệu. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN06 [Tương lai nền] tập trung vào mục tiêu: Will/going to, kế hoạch và dấu hiệu.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN06:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 12 câu theo ngữ cảnh + nghe lịch hẹn.\nĐiều kiện đạt: ≥10/12.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN06-Q1",
        "prompt": "Trong bài học [EN06] \"Tương lai nền\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN06-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Tương lai nền\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Will/going to, kế hoạch và dấu hiệu\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Will/going to, kế hoạch và dấu hiệu\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN06-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN06] theo lộ trình là gì?",
        "options": [
          "≥10/12",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12."
      }
    ]
  },
  "EN08": {
    "intro": "Tiết EN08 — So sánh và từ loại. Mục tiêu: Comparative/superlative; adj/adv. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN08 [So sánh và từ loại] tập trung vào mục tiêu: Comparative/superlative; adj/adv.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN08:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 15 câu + đoạn so sánh ngắn.\nĐiều kiện đạt: ≥13/15; xét vị trí từ.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN08-Q1",
        "prompt": "Trong bài học [EN08] \"So sánh và từ loại\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN08-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"So sánh và từ loại\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Comparative/superlative; adj/adv\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Comparative/superlative; adj/adv\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN08-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN08] theo lộ trình là gì?",
        "options": [
          "≥13/15; xét vị trí từ",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥13/15; xét vị trí từ."
      }
    ]
  },
  "EN11": {
    "intro": "Tiết EN11 — V-ing/to-V. Mục tiêu: Cụm thường gặp và cách dùng theo ngữ cảnh. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN11 [V-ing/to-V] tập trung vào mục tiêu: Cụm thường gặp và cách dùng theo ngữ cảnh.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN11:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 15 câu theo nhóm từ, 5 ví dụ tự đặt.\nĐiều kiện đạt: ≥13/15; không học mỗi từ đơn lẻ.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN11-Q1",
        "prompt": "Trong bài học [EN11] \"V-ing/to-V\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN11-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"V-ing/to-V\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Cụm thường gặp và cách dùng theo ngữ cảnh\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Cụm thường gặp và cách dùng theo ngữ cảnh\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN11-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN11] theo lộ trình là gì?",
        "options": [
          "≥13/15; không học mỗi từ đơn lẻ",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥13/15; không học mỗi từ đơn lẻ."
      }
    ]
  },
  "EN12": {
    "intro": "Tiết EN12 — Test ngữ pháp nền. Mục tiêu: Trộn EN02–11; ưu tiên lỗi sai. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN12 [Test ngữ pháp nền] tập trung vào mục tiêu: Trộn EN02–11; ưu tiên lỗi sai.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN12:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 30 câu tự luyện trong 30 phút + 15 phút sửa.\nĐiều kiện đạt: ≥26/30, nêu lý do đáp án.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN12-Q1",
        "prompt": "Trong bài học [EN12] \"Test ngữ pháp nền\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN12-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Test ngữ pháp nền\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Trộn EN02–11; ưu tiên lỗi sai\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Trộn EN02–11; ưu tiên lỗi sai\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN12-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN12] theo lộ trình là gì?",
        "options": [
          "≥26/30, nêu lý do đáp án",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥26/30, nêu lý do đáp án."
      }
    ]
  },
  "EN13": {
    "intro": "Tiết EN13 — Hiện tại hoàn thành. Mục tiêu: Have/has+V3, since/for, phân biệt quá khứ. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN13 [Hiện tại hoàn thành] tập trung vào mục tiêu: Have/has+V3, since/for, phân biệt quá khứ.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN13:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 12 câu và 1 đoạn đọc.\nĐiều kiện đạt: ≥10/12; học sau khi vững các thì nền.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN13-Q1",
        "prompt": "Trong bài học [EN13] \"Hiện tại hoàn thành\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN13-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hiện tại hoàn thành\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Have/has+V3, since/for, phân biệt quá khứ\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Have/has+V3, since/for, phân biệt quá khứ\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN13-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN13] theo lộ trình là gì?",
        "options": [
          "≥10/12; học sau khi vững các thì nền",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; học sau khi vững các thì nền."
      }
    ]
  },
  "EN14": {
    "intro": "Tiết EN14 — Bị động. Mục tiêu: Be+V3, thì cơ bản và chuyển đổi. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN14 [Bị động] tập trung vào mục tiêu: Be+V3, thì cơ bản và chuyển đổi.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN14:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 12 câu.\nĐiều kiện đạt: ≥10/12; giữ đúng thì.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN14-Q1",
        "prompt": "Trong bài học [EN14] \"Bị động\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN14-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Bị động\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Be+V3, thì cơ bản và chuyển đổi\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Be+V3, thì cơ bản và chuyển đổi\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN14-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN14] theo lộ trình là gì?",
        "options": [
          "≥10/12; giữ đúng thì",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; giữ đúng thì."
      }
    ]
  },
  "EN15": {
    "intro": "Tiết EN15 — Mệnh đề quan hệ. Mục tiêu: Who/which/that, vị trí và chức năng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN15 [Mệnh đề quan hệ] tập trung vào mục tiêu: Who/which/that, vị trí và chức năng.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN15:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 12 câu + đọc đoạn có mệnh đề quan hệ.\nĐiều kiện đạt: ≥10/12; xác định danh từ được bổ nghĩa.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN15-Q1",
        "prompt": "Trong bài học [EN15] \"Mệnh đề quan hệ\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN15-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Mệnh đề quan hệ\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Who/which/that, vị trí và chức năng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Who/which/that, vị trí và chức năng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN15-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN15] theo lộ trình là gì?",
        "options": [
          "≥10/12; xác định danh từ được bổ nghĩa",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; xác định danh từ được bổ nghĩa."
      }
    ]
  },
  "EN16": {
    "intro": "Tiết EN16 — Điều kiện và cấu trúc mở rộng. Mục tiêu: Điều kiện 0/1/2; bổ sung 3 khi cần. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN16 [Điều kiện và cấu trúc mở rộng] tập trung vào mục tiêu: Điều kiện 0/1/2; bổ sung 3 khi cần.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN16:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 12 câu theo ưu tiên chẩn đoán.\nĐiều kiện đạt: ≥10/12; không dồn toàn bộ thời gian vào cấu trúc hiếm.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN16-Q1",
        "prompt": "Trong bài học [EN16] \"Điều kiện và cấu trúc mở rộng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN16-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Điều kiện và cấu trúc mở rộng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Điều kiện 0/1/2; bổ sung 3 khi cần\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Điều kiện 0/1/2; bổ sung 3 khi cần\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN16-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN16] theo lộ trình là gì?",
        "options": [
          "≥10/12; không dồn toàn bộ thời gian vào cấu trúc hiếm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; không dồn toàn bộ thời gian vào cấu trúc hiếm."
      }
    ]
  },
  "EN18": {
    "intro": "Tiết EN18 — Nghe hội thoại và ý chính. Mục tiêu: Câu hỏi đáp, ý chính, thông tin chi tiết. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN18 [Nghe hội thoại và ý chính] tập trung vào mục tiêu: Câu hỏi đáp, ý chính, thông tin chi tiết.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN18:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 2 bài nghe A1/A2; nâng mức nếu chẩn đoán tốt.\nĐiều kiện đạt: ≥80%; ghi bẫy của từng câu sai.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN18-Q1",
        "prompt": "Trong bài học [EN18] \"Nghe hội thoại và ý chính\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN18-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Nghe hội thoại và ý chính\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Câu hỏi đáp, ý chính, thông tin chi tiết\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Câu hỏi đáp, ý chính, thông tin chi tiết\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN18-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN18] theo lộ trình là gì?",
        "options": [
          "≥80%; ghi bẫy của từng câu sai",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥80%; ghi bẫy của từng câu sai."
      }
    ]
  },
  "EN20": {
    "intro": "Tiết EN20 — Đọc điền từ và từ vựng. Mục tiêu: Ngữ cảnh, collocation, từ loại. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN20 [Đọc điền từ và từ vựng] tập trung vào mục tiêu: Ngữ cảnh, collocation, từ loại.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN20:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 2 đoạn cloze + 10 từ theo chủ đề.\nĐiều kiện đạt: ≥80%; đặt câu với từ mới.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN20-Q1",
        "prompt": "Trong bài học [EN20] \"Đọc điền từ và từ vựng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN20-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đọc điền từ và từ vựng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Ngữ cảnh, collocation, từ loại\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Ngữ cảnh, collocation, từ loại\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN20-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN20] theo lộ trình là gì?",
        "options": [
          "≥80%; đặt câu với từ mới",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥80%; đặt câu với từ mới."
      }
    ]
  },
  "EN21": {
    "intro": "Tiết EN21 — Đề tự luyện A. Mục tiêu: Nghe + đọc + ngữ pháp, có giới hạn thời gian. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN21 [Đề tự luyện A] tập trung vào mục tiêu: Nghe + đọc + ngữ pháp, có giới hạn thời gian.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN21:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: Đề tự luyện 50 câu/60 phút: 10 nghe +15 grammar +15 vocabulary +10 reading.\nĐiều kiện đạt: Ghi điểm từng kỹ năng; không coi là đề đầu vào trường.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN21-Q1",
        "prompt": "Trong bài học [EN21] \"Đề tự luyện A\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN21-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đề tự luyện A\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nghe + đọc + ngữ pháp, có giới hạn thời gian\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nghe + đọc + ngữ pháp, có giới hạn thời gian\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN21-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN21] theo lộ trình là gì?",
        "options": [
          "Ghi điểm từng kỹ năng; không coi là đề đầu vào trường",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Ghi điểm từng kỹ năng; không coi là đề đầu vào trường."
      }
    ]
  },
  "EN22": {
    "intro": "Tiết EN22 — Sửa đề A. Mục tiêu: Phân loại lỗi kiến thức, nghe, thời gian. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN22 [Sửa đề A] tập trung vào mục tiêu: Phân loại lỗi kiến thức, nghe, thời gian.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN22:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: Làm lại 10 câu sai/khó; nghe lại transcript.\nĐiều kiện đạt: Đúng ≥8/10 câu mới cùng dạng.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN22-Q1",
        "prompt": "Trong bài học [EN22] \"Sửa đề A\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN22-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Sửa đề A\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phân loại lỗi kiến thức, nghe, thời gian\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phân loại lỗi kiến thức, nghe, thời gian\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN22-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN22] theo lộ trình là gì?",
        "options": [
          "Đúng ≥8/10 câu mới cùng dạng",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đúng ≥8/10 câu mới cùng dạng."
      }
    ]
  },
  "EN23": {
    "intro": "Tiết EN23 — Đề tự luyện B. Mục tiêu: Đo tiến bộ với bài mới. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN23 [Đề tự luyện B] tập trung vào mục tiêu: Đo tiến bộ với bài mới.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN23:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: Đề mới 50 câu/60 phút cùng cấu trúc A; không dùng lại câu đã nhớ.\nĐiều kiện đạt: Mục tiêu 44/50; điểm thi dự đoán còn phụ thuộc trọng số và mức khó thật.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN23-Q1",
        "prompt": "Trong bài học [EN23] \"Đề tự luyện B\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN23-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đề tự luyện B\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đo tiến bộ với bài mới\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đo tiến bộ với bài mới\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN23-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN23] theo lộ trình là gì?",
        "options": [
          "Mục tiêu 44/50; điểm thi dự đoán còn phụ thuộc trọng số và mức khó thật",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Mục tiêu 44/50; điểm thi dự đoán còn phụ thuộc trọng số và mức khó thật."
      }
    ]
  },
  "EN24": {
    "intro": "Tiết EN24 — Sửa đề B và chuẩn bị thi. Mục tiêu: Sửa lỗi EN23, ôn 20 lỗi cá nhân, giấy tờ theo thông báo. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết EN24 [Sửa đề B và chuẩn bị thi] tập trung vào mục tiêu: Sửa lỗi EN23, ôn 20 lỗi cá nhân, giấy tờ theo thông báo.\n\nQuy tắc ngôn ngữ cốt lõi:\n- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi tiếng Anh thường gặp trong EN24:\n1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: Làm lại câu sai bằng câu mới; kiểm tra ca/phòng khi công bố.\nĐiều kiện đạt: Không học dồn; chỉ dùng thông báo chính thức để xác nhận thi.\nMẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng."
      }
    ],
    "questions": [
      {
        "id": "EN24-Q1",
        "prompt": "Trong bài học [EN24] \"Sửa đề B và chuẩn bị thi\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "EN24-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Sửa đề B và chuẩn bị thi\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Sửa lỗi EN23, ôn 20 lỗi cá nhân, giấy tờ theo thông báo\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Sửa lỗi EN23, ôn 20 lỗi cá nhân, giấy tờ theo thông báo\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "EN24-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [EN24] theo lộ trình là gì?",
        "options": [
          "Không học dồn; chỉ dùng thông báo chính thức để xác nhận thi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Không học dồn; chỉ dùng thông báo chính thức để xác nhận thi."
      }
    ]
  },
  "GT01": {
    "intro": "Tiết GT01 — Chẩn đoán nền. Mục tiêu: Tìm lỗ hổng đại số và giới hạn. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT01 [Chẩn đoán nền], mục tiêu cốt lõi là: Tìm lỗ hổng đại số và giới hạn.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT01 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 10 câu: đổi dấu, nhân tử, phân thức, 0/0, sin; ghi lỗi từng câu.\nĐiều kiện đạt để chuyển bài: ≥8/10; yếu nhóm nào học lại nhóm đó.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT01-Q1",
        "prompt": "Trong bài học [GT01] \"Chẩn đoán nền\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT01-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Chẩn đoán nền\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tìm lỗ hổng đại số và giới hạn\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tìm lỗ hổng đại số và giới hạn\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT01-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT01] theo lộ trình là gì?",
        "options": [
          "≥8/10; yếu nhóm nào học lại nhóm đó",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥8/10; yếu nhóm nào học lại nhóm đó."
      }
    ]
  },
  "GT02": {
    "intro": "Tiết GT02 — Ngoặc và phân thức. Mục tiêu: Đổi dấu toàn bộ; quy đồng; rút gọn có điều kiện. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT02 [Ngoặc và phân thức], mục tiêu cốt lõi là: Đổi dấu toàn bộ; quy đồng; rút gọn có điều kiện.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT02 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 8 biểu thức, gồm -(1-x), (x²-1)/(x-1).\nĐiều kiện đạt để chuyển bài: ≥7/8 và ghi điều kiện xác định.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT02-Q1",
        "prompt": "Trong bài học [GT02] \"Ngoặc và phân thức\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT02-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Ngoặc và phân thức\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đổi dấu toàn bộ; quy đồng; rút gọn có điều kiện\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đổi dấu toàn bộ; quy đồng; rút gọn có điều kiện\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT02-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT02] theo lộ trình là gì?",
        "options": [
          "≥7/8 và ghi điều kiện xác định",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8 và ghi điều kiện xác định."
      }
    ]
  },
  "GT03": {
    "intro": "Tiết GT03 — Lượng giác cần dùng. Mục tiêu: Sin/cos/tan, đẳng thức, radian. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT03 [Lượng giác cần dùng], mục tiêu cốt lõi là: Sin/cos/tan, đẳng thức, radian.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT03 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 8 bài đổi radian và rút gọn lượng giác.\nĐiều kiện đạt để chuyển bài: ≥7/8; biết tan=sin/cos.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT03-Q1",
        "prompt": "Trong bài học [GT03] \"Lượng giác cần dùng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT03-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Lượng giác cần dùng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Sin/cos/tan, đẳng thức, radian\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Sin/cos/tan, đẳng thức, radian\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT03-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT03] theo lộ trình là gì?",
        "options": [
          "≥7/8; biết tan=sin/cos",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; biết tan=sin/cos."
      }
    ]
  },
  "GT04": {
    "intro": "Tiết GT04 — Hàm, đồ thị, dãy. Mục tiêu: Miền xác định, hàm hợp, hàm cơ bản, giới hạn dãy. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT04 [Hàm, đồ thị, dãy], mục tiêu cốt lõi là: Miền xác định, hàm hợp, hàm cơ bản, giới hạn dãy.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT04 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 miền xác định và 2 ví dụ dãy hội tụ.\nĐiều kiện đạt để chuyển bài: ≥7/8; phân biệt dãy với hàm.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT04-Q1",
        "prompt": "Trong bài học [GT04] \"Hàm, đồ thị, dãy\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT04-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hàm, đồ thị, dãy\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Miền xác định, hàm hợp, hàm cơ bản, giới hạn dãy\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Miền xác định, hàm hợp, hàm cơ bản, giới hạn dãy\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT04-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT04] theo lộ trình là gì?",
        "options": [
          "≥7/8; phân biệt dãy với hàm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; phân biệt dãy với hàm."
      }
    ]
  },
  "GT08": {
    "intro": "Tiết GT08 — Vô cực và một phía. Mục tiêu: So bậc; giới hạn trái/phải; dấu của vô cực. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT08 [Vô cực và một phía], mục tiêu cốt lõi là: So bậc; giới hạn trái/phải; dấu của vô cực.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT08 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 8 bài gồm mẫu tiến về 0.\nĐiều kiện đạt để chuyển bài: ≥7/8; phân biệt ±∞.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT08-Q1",
        "prompt": "Trong bài học [GT08] \"Vô cực và một phía\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT08-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Vô cực và một phía\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"So bậc; giới hạn trái/phải; dấu của vô cực\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"So bậc; giới hạn trái/phải; dấu của vô cực\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT08-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT08] theo lộ trình là gì?",
        "options": [
          "≥7/8; phân biệt ±∞",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; phân biệt ±∞."
      }
    ]
  },
  "GT12": {
    "intro": "Tiết GT12 — Vô cùng bé tương đương. Mục tiêu: Điều kiện thay tương đương; tích/thương và bẫy tổng/hiệu. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT12 [Vô cùng bé tương đương], mục tiêu cốt lõi là: Điều kiện thay tương đương; tích/thương và bẫy tổng/hiệu.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT12 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 bài hợp lệ và 2 phản ví dụ.\nĐiều kiện đạt để chuyển bài: ≥7/8; không thay máy móc.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT12-Q1",
        "prompt": "Trong bài học [GT12] \"Vô cùng bé tương đương\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT12-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Vô cùng bé tương đương\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Điều kiện thay tương đương; tích/thương và bẫy tổng/hiệu\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Điều kiện thay tương đương; tích/thương và bẫy tổng/hiệu\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT12-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT12] theo lộ trình là gì?",
        "options": [
          "≥7/8; không thay máy móc",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; không thay máy móc."
      }
    ]
  },
  "GT13": {
    "intro": "Tiết GT13 — Test giới hạn. Mục tiêu: Chọn đúng phương pháp, không nhầm dấu. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT13 [Test giới hạn], mục tiêu cốt lõi là: Chọn đúng phương pháp, không nhầm dấu.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT13 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 12 câu trộn, 35 phút; 10 phút sửa lỗi.\nĐiều kiện đạt để chuyển bài: ≥10/12; lỗi cũ không lặp.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT13-Q1",
        "prompt": "Trong bài học [GT13] \"Test giới hạn\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT13-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Test giới hạn\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chọn đúng phương pháp, không nhầm dấu\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chọn đúng phương pháp, không nhầm dấu\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT13-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT13] theo lộ trình là gì?",
        "options": [
          "≥10/12; lỗi cũ không lặp",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; lỗi cũ không lặp."
      }
    ]
  },
  "GT14": {
    "intro": "Tiết GT14 — Liên tục và tham số. Mục tiêu: Giới hạn trái/phải bằng giá trị hàm. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT14 [Liên tục và tham số], mục tiêu cốt lõi là: Giới hạn trái/phải bằng giá trị hàm.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT14 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 hàm từng đoạn cần tìm tham số.\nĐiều kiện đạt để chuyển bài: ≥5/6, đủ ba điều kiện.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT14-Q1",
        "prompt": "Trong bài học [GT14] \"Liên tục và tham số\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT14-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Liên tục và tham số\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Giới hạn trái/phải bằng giá trị hàm\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Giới hạn trái/phải bằng giá trị hàm\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT14-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT14] theo lộ trình là gì?",
        "options": [
          "≥5/6, đủ ba điều kiện",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6, đủ ba điều kiện."
      }
    ]
  },
  "GT15": {
    "intro": "Tiết GT15 — Định nghĩa đạo hàm. Mục tiêu: Tỉ số sai phân; ý nghĩa độ dốc và tiếp tuyến. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT15 [Định nghĩa đạo hàm], mục tiêu cốt lõi là: Tỉ số sai phân; ý nghĩa độ dốc và tiếp tuyến.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT15 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: Tính từ định nghĩa cho x²; 4 bài tiếp tuyến đơn giản.\nĐiều kiện đạt để chuyển bài: ≥4/5; hiểu đạo hàm tại điểm.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT15-Q1",
        "prompt": "Trong bài học [GT15] \"Định nghĩa đạo hàm\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT15-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Định nghĩa đạo hàm\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tỉ số sai phân; ý nghĩa độ dốc và tiếp tuyến\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tỉ số sai phân; ý nghĩa độ dốc và tiếp tuyến\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT15-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT15] theo lộ trình là gì?",
        "options": [
          "≥4/5; hiểu đạo hàm tại điểm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; hiểu đạo hàm tại điểm."
      }
    ]
  },
  "GT16": {
    "intro": "Tiết GT16 — Quy tắc đạo hàm. Mục tiêu: Tổng/tích/thương; đạo hàm cơ bản. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT16 [Quy tắc đạo hàm], mục tiêu cốt lõi là: Tổng/tích/thương; đạo hàm cơ bản.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT16 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 12 đạo hàm, gồm lượng giác/mũ/log.\nĐiều kiện đạt để chuyển bài: ≥10/12; không bỏ mẫu bình phương.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT16-Q1",
        "prompt": "Trong bài học [GT16] \"Quy tắc đạo hàm\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT16-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Quy tắc đạo hàm\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tổng/tích/thương; đạo hàm cơ bản\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tổng/tích/thương; đạo hàm cơ bản\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT16-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT16] theo lộ trình là gì?",
        "options": [
          "≥10/12; không bỏ mẫu bình phương",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; không bỏ mẫu bình phương."
      }
    ]
  },
  "GT17": {
    "intro": "Tiết GT17 — Đạo hàm hàm hợp. Mục tiêu: Quy tắc dây chuyền; nhiều lớp. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT17 [Đạo hàm hàm hợp], mục tiêu cốt lõi là: Quy tắc dây chuyền; nhiều lớp.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT17 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 10 biểu thức hợp, nêu hàm ngoài/trong.\nĐiều kiện đạt để chuyển bài: ≥9/10; nhân đủ đạo hàm trong.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT17-Q1",
        "prompt": "Trong bài học [GT17] \"Đạo hàm hàm hợp\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT17-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đạo hàm hàm hợp\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Quy tắc dây chuyền; nhiều lớp\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Quy tắc dây chuyền; nhiều lớp\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT17-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT17] theo lộ trình là gì?",
        "options": [
          "≥9/10; nhân đủ đạo hàm trong",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥9/10; nhân đủ đạo hàm trong."
      }
    ]
  },
  "GT18": {
    "intro": "Tiết GT18 — Đạo hàm cấp cao và hàm ẩn. Mục tiêu: Đạo hàm cấp 2; đạo hàm ẩn khi đề cương có. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT18 [Đạo hàm cấp cao và hàm ẩn], mục tiêu cốt lõi là: Đạo hàm cấp 2; đạo hàm ẩn khi đề cương có.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT18 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 bài theo mức đã học.\nĐiều kiện đạt để chuyển bài: ≥5/6; bỏ phần hàm ẩn nếu không thuộc phạm vi.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT18-Q1",
        "prompt": "Trong bài học [GT18] \"Đạo hàm cấp cao và hàm ẩn\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT18-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đạo hàm cấp cao và hàm ẩn\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đạo hàm cấp 2; đạo hàm ẩn khi đề cương có\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đạo hàm cấp 2; đạo hàm ẩn khi đề cương có\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT18-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT18] theo lộ trình là gì?",
        "options": [
          "≥5/6; bỏ phần hàm ẩn nếu không thuộc phạm vi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; bỏ phần hàm ẩn nếu không thuộc phạm vi."
      }
    ]
  },
  "GT19": {
    "intro": "Tiết GT19 — L’Hôpital có điều kiện. Mục tiêu: Chỉ dùng cho dạng phù hợp và đủ giả thiết. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT19 [L’Hôpital có điều kiện], mục tiêu cốt lõi là: Chỉ dùng cho dạng phù hợp và đủ giả thiết.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT19 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 giới hạn, giải bằng cách nền trước rồi đối chiếu.\nĐiều kiện đạt để chuyển bài: ≥5/6; nêu dạng 0/0 hoặc ∞/∞ hợp lệ.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT19-Q1",
        "prompt": "Trong bài học [GT19] \"L’Hôpital có điều kiện\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT19-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"L’Hôpital có điều kiện\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chỉ dùng cho dạng phù hợp và đủ giả thiết\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chỉ dùng cho dạng phù hợp và đủ giả thiết\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT19-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT19] theo lộ trình là gì?",
        "options": [
          "≥5/6; nêu dạng 0/0 hoặc ∞/∞ hợp lệ",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; nêu dạng 0/0 hoặc ∞/∞ hợp lệ."
      }
    ]
  },
  "GT20": {
    "intro": "Tiết GT20 — Định lý giá trị trung bình. Mục tiêu: Rolle, Lagrange và điều kiện áp dụng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT20 [Định lý giá trị trung bình], mục tiêu cốt lõi là: Rolle, Lagrange và điều kiện áp dụng.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT20 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 4 bài kiểm tra giả thiết, 2 ứng dụng.\nĐiều kiện đạt để chuyển bài: ≥5/6; không bỏ điều kiện trên đoạn.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT20-Q1",
        "prompt": "Trong bài học [GT20] \"Định lý giá trị trung bình\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT20-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Định lý giá trị trung bình\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Rolle, Lagrange và điều kiện áp dụng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Rolle, Lagrange và điều kiện áp dụng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT20-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT20] theo lộ trình là gì?",
        "options": [
          "≥5/6; không bỏ điều kiện trên đoạn",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; không bỏ điều kiện trên đoạn."
      }
    ]
  },
  "GT21": {
    "intro": "Tiết GT21 — Đơn điệu. Mục tiêu: Dấu đạo hàm; các khoảng xác định. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT21 [Đơn điệu], mục tiêu cốt lõi là: Dấu đạo hàm; các khoảng xác định.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT21 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 3 bảng dấu và khoảng tăng/giảm.\nĐiều kiện đạt để chuyển bài: Đúng cả miền và khoảng của 3 bài.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT21-Q1",
        "prompt": "Trong bài học [GT21] \"Đơn điệu\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT21-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đơn điệu\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Dấu đạo hàm; các khoảng xác định\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Dấu đạo hàm; các khoảng xác định\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT21-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT21] theo lộ trình là gì?",
        "options": [
          "Đúng cả miền và khoảng của 3 bài",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đúng cả miền và khoảng của 3 bài."
      }
    ]
  },
  "GT22": {
    "intro": "Tiết GT22 — Cực trị và GTLN/GTNN. Mục tiêu: Điểm tới hạn; biên đoạn; điều kiện miền. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT22 [Cực trị và GTLN/GTNN], mục tiêu cốt lõi là: Điểm tới hạn; biên đoạn; điều kiện miền.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT22 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 bài cực trị và cực trị trên đoạn.\nĐiều kiện đạt để chuyển bài: ≥5/6; xét đủ biên.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT22-Q1",
        "prompt": "Trong bài học [GT22] \"Cực trị và GTLN/GTNN\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT22-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Cực trị và GTLN/GTNN\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Điểm tới hạn; biên đoạn; điều kiện miền\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Điểm tới hạn; biên đoạn; điều kiện miền\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT22-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT22] theo lộ trình là gì?",
        "options": [
          "≥5/6; xét đủ biên",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; xét đủ biên."
      }
    ]
  },
  "GT23": {
    "intro": "Tiết GT23 — Lồi lõm và khảo sát. Mục tiêu: Đạo hàm cấp 2, tiệm cận, bảng biến thiên. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT23 [Lồi lõm và khảo sát], mục tiêu cốt lõi là: Đạo hàm cấp 2, tiệm cận, bảng biến thiên.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT23 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: Khảo sát 2 hàm với checklist.\nĐiều kiện đạt để chuyển bài: Không thiếu miền, dấu đạo hàm và giới hạn.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT23-Q1",
        "prompt": "Trong bài học [GT23] \"Lồi lõm và khảo sát\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT23-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Lồi lõm và khảo sát\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đạo hàm cấp 2, tiệm cận, bảng biến thiên\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đạo hàm cấp 2, tiệm cận, bảng biến thiên\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT23-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT23] theo lộ trình là gì?",
        "options": [
          "Không thiếu miền, dấu đạo hàm và giới hạn",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Không thiếu miền, dấu đạo hàm và giới hạn."
      }
    ]
  },
  "GT24": {
    "intro": "Tiết GT24 — Bài toán tối ưu. Mục tiêu: Mô hình, ràng buộc, chọn biến và kiểm tra biên. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT24 [Bài toán tối ưu], mục tiêu cốt lõi là: Mô hình, ràng buộc, chọn biến và kiểm tra biên.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT24 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 3 bài diện tích/chi phí/hình học.\nĐiều kiện đạt để chuyển bài: ≥2/3; giải thích nghiệm phù hợp.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT24-Q1",
        "prompt": "Trong bài học [GT24] \"Bài toán tối ưu\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT24-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Bài toán tối ưu\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Mô hình, ràng buộc, chọn biến và kiểm tra biên\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Mô hình, ràng buộc, chọn biến và kiểm tra biên\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT24-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT24] theo lộ trình là gì?",
        "options": [
          "≥2/3; giải thích nghiệm phù hợp",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥2/3; giải thích nghiệm phù hợp."
      }
    ]
  },
  "GT25": {
    "intro": "Tiết GT25 — Nguyên hàm. Mục tiêu: Nhận dạng mẫu; hằng số C. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT25 [Nguyên hàm], mục tiêu cốt lõi là: Nhận dạng mẫu; hằng số C.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT25 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 12 nguyên hàm cơ bản.\nĐiều kiện đạt để chuyển bài: ≥10/12; kiểm tra bằng đạo hàm.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT25-Q1",
        "prompt": "Trong bài học [GT25] \"Nguyên hàm\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT25-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Nguyên hàm\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhận dạng mẫu; hằng số C\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhận dạng mẫu; hằng số C\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT25-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT25] theo lộ trình là gì?",
        "options": [
          "≥10/12; kiểm tra bằng đạo hàm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥10/12; kiểm tra bằng đạo hàm."
      }
    ]
  },
  "GT26": {
    "intro": "Tiết GT26 — Tích phân xác định. Mục tiêu: Newton–Leibniz; cận và dấu. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT26 [Tích phân xác định], mục tiêu cốt lõi là: Newton–Leibniz; cận và dấu.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT26 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 8 bài có đổi thứ tự cận hoặc hàm đổi dấu.\nĐiều kiện đạt để chuyển bài: ≥7/8; phân biệt diện tích với tích phân có dấu.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT26-Q1",
        "prompt": "Trong bài học [GT26] \"Tích phân xác định\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT26-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Tích phân xác định\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Newton–Leibniz; cận và dấu\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Newton–Leibniz; cận và dấu\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT26-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT26] theo lộ trình là gì?",
        "options": [
          "≥7/8; phân biệt diện tích với tích phân có dấu",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; phân biệt diện tích với tích phân có dấu."
      }
    ]
  },
  "GT27": {
    "intro": "Tiết GT27 — Đổi biến. Mục tiêu: Chọn u, đổi vi phân và cận. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT27 [Đổi biến], mục tiêu cốt lõi là: Chọn u, đổi vi phân và cận.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT27 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 8 tích phân.\nĐiều kiện đạt để chuyển bài: ≥7/8; đổi cận hoặc quay về biến cũ đúng.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT27-Q1",
        "prompt": "Trong bài học [GT27] \"Đổi biến\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT27-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đổi biến\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chọn u, đổi vi phân và cận\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chọn u, đổi vi phân và cận\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT27-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT27] theo lộ trình là gì?",
        "options": [
          "≥7/8; đổi cận hoặc quay về biến cũ đúng",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; đổi cận hoặc quay về biến cũ đúng."
      }
    ]
  },
  "GT28": {
    "intro": "Tiết GT28 — Từng phần. Mục tiêu: Chọn u/dv; công thức và dấu. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT28 [Từng phần], mục tiêu cốt lõi là: Chọn u/dv; công thức và dấu.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT28 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 tích phân kiểu x·e^x, x·sin(x), ln(x).\nĐiều kiện đạt để chuyển bài: ≥5/6; kiểm tra bằng đạo hàm.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT28-Q1",
        "prompt": "Trong bài học [GT28] \"Từng phần\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT28-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Từng phần\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chọn u/dv; công thức và dấu\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chọn u/dv; công thức và dấu\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT28-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT28] theo lộ trình là gì?",
        "options": [
          "≥5/6; kiểm tra bằng đạo hàm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; kiểm tra bằng đạo hàm."
      }
    ]
  },
  "GT29": {
    "intro": "Tiết GT29 — Tích phân hữu tỉ và lượng giác. Mục tiêu: Phân tích mẫu; nhận dạng mẫu đặc biệt. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT29 [Tích phân hữu tỉ và lượng giác], mục tiêu cốt lõi là: Phân tích mẫu; nhận dạng mẫu đặc biệt.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT29 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 6 bài đúng mức slide; không mở rộng nếu chưa cần.\nĐiều kiện đạt để chuyển bài: ≥5/6; ghi điều kiện và phương pháp.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT29-Q1",
        "prompt": "Trong bài học [GT29] \"Tích phân hữu tỉ và lượng giác\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT29-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Tích phân hữu tỉ và lượng giác\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phân tích mẫu; nhận dạng mẫu đặc biệt\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phân tích mẫu; nhận dạng mẫu đặc biệt\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT29-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT29] theo lộ trình là gì?",
        "options": [
          "≥5/6; ghi điều kiện và phương pháp",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; ghi điều kiện và phương pháp."
      }
    ]
  },
  "GT30": {
    "intro": "Tiết GT30 — Ứng dụng tích phân. Mục tiêu: Diện tích giữa các đồ thị; tách khoảng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT30 [Ứng dụng tích phân], mục tiêu cốt lõi là: Diện tích giữa các đồ thị; tách khoảng.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT30 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: 4 bài giao điểm và diện tích.\nĐiều kiện đạt để chuyển bài: ≥3/4; không cộng diện tích âm.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT30-Q1",
        "prompt": "Trong bài học [GT30] \"Ứng dụng tích phân\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT30-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Ứng dụng tích phân\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Diện tích giữa các đồ thị; tách khoảng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Diện tích giữa các đồ thị; tách khoảng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT30-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT30] theo lộ trình là gì?",
        "options": [
          "≥3/4; không cộng diện tích âm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥3/4; không cộng diện tích âm."
      }
    ]
  },
  "GT31": {
    "intro": "Tiết GT31 — Đề tự luyện tổng hợp 1. Mục tiêu: Giới hạn–liên tục–đạo hàm. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT31 [Đề tự luyện tổng hợp 1], mục tiêu cốt lõi là: Giới hạn–liên tục–đạo hàm.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT31 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: Bài trộn 35 phút rồi chấm lỗi theo dạng.\nĐiều kiện đạt để chuyển bài: ≥85%; đây không phải đề thi chính thức.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT31-Q1",
        "prompt": "Trong bài học [GT31] \"Đề tự luyện tổng hợp 1\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT31-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đề tự luyện tổng hợp 1\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Giới hạn–liên tục–đạo hàm\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Giới hạn–liên tục–đạo hàm\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT31-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT31] theo lộ trình là gì?",
        "options": [
          "≥85%; đây không phải đề thi chính thức",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥85%; đây không phải đề thi chính thức."
      }
    ]
  },
  "GT32": {
    "intro": "Tiết GT32 — Đề tự luyện tổng hợp 2. Mục tiêu: Tích phân và bài tổng hợp. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Trong tiết GT32 [Đề tự luyện tổng hợp 2], mục tiêu cốt lõi là: Tích phân và bài tổng hợp.\n\nQuy tắc giải tích cần nắm vững:\n- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Các bẫy lỗi kinh điển trong GT32 mà sinh viên Phenikaa thường mắc:\n1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Phương pháp tự luyện trong tiết: Bài trộn 35 phút; chốt 5 lỗi hay mắc.\nĐiều kiện đạt để chuyển bài: ≥85% ở hai lượt và tự giải thích được.\nMẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn."
      }
    ],
    "questions": [
      {
        "id": "GT32-Q1",
        "prompt": "Trong bài học [GT32] \"Đề tự luyện tổng hợp 2\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "GT32-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đề tự luyện tổng hợp 2\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tích phân và bài tổng hợp\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tích phân và bài tổng hợp\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "GT32-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [GT32] theo lộ trình là gì?",
        "options": [
          "≥85% ở hai lượt và tự giải thích được",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥85% ở hai lượt và tự giải thích được."
      }
    ]
  },
  "IT01": {
    "intro": "Tiết IT01 — Chẩn đoán và tổng quan. Mục tiêu: CNTT/CS/AI; phần cứng/phần mềm. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT01 [Chẩn đoán và tổng quan] cung cấp nền tảng: CNTT/CS/AI; phần cứng/phần mềm.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT01:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 10 câu và sơ đồ hệ thống.\nTiêu chuẩn đạt: ≥8/10; tách rõ hệ điều hành/ứng dụng.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT01-Q1",
        "prompt": "Trong bài học [IT01] \"Chẩn đoán và tổng quan\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT01-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Chẩn đoán và tổng quan\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"CNTT/CS/AI; phần cứng/phần mềm\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"CNTT/CS/AI; phần cứng/phần mềm\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT01-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT01] theo lộ trình là gì?",
        "options": [
          "≥8/10; tách rõ hệ điều hành/ứng dụng",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥8/10; tách rõ hệ điều hành/ứng dụng."
      }
    ]
  },
  "IT05": {
    "intro": "Tiết IT05 — Hệ điều hành và file. Mục tiêu: File, đường dẫn, process, quyền. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT05 [Hệ điều hành và file] cung cấp nền tảng: File, đường dẫn, process, quyền.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT05:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: Tổ chức thư mục tài liệu và giải thích process.\nTiêu chuẩn đạt: Tự làm lại, không mất dữ liệu.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT05-Q1",
        "prompt": "Trong bài học [IT05] \"Hệ điều hành và file\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT05-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hệ điều hành và file\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"File, đường dẫn, process, quyền\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"File, đường dẫn, process, quyền\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT05-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT05] theo lộ trình là gì?",
        "options": [
          "Tự làm lại, không mất dữ liệu",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Tự làm lại, không mất dữ liệu."
      }
    ]
  },
  "IT06": {
    "intro": "Tiết IT06 — Mạng và Internet. Mục tiêu: IP, DNS, client/server, LAN. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT06 [Mạng và Internet] cung cấp nền tảng: IP, DNS, client/server, LAN.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT06:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: Vẽ luồng truy cập một website.\nTiêu chuẩn đạt: Phân biệt IP, domain, URL.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT06-Q1",
        "prompt": "Trong bài học [IT06] \"Mạng và Internet\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT06-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Mạng và Internet\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"IP, DNS, client/server, LAN\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"IP, DNS, client/server, LAN\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT06-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT06] theo lộ trình là gì?",
        "options": [
          "Phân biệt IP, domain, URL",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Phân biệt IP, domain, URL."
      }
    ]
  },
  "IT07": {
    "intro": "Tiết IT07 — Web và dịch vụ số. Mục tiêu: HTTP/HTTPS, trình duyệt, dữ liệu cá nhân. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT07 [Web và dịch vụ số] cung cấp nền tảng: HTTP/HTTPS, trình duyệt, dữ liệu cá nhân.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT07:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 5 tình huống web và quyền truy cập.\nTiêu chuẩn đạt: ≥4/5; hiểu HTTPS không bảo đảm mọi nội dung đáng tin.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT07-Q1",
        "prompt": "Trong bài học [IT07] \"Web và dịch vụ số\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT07-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Web và dịch vụ số\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"HTTP/HTTPS, trình duyệt, dữ liệu cá nhân\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"HTTP/HTTPS, trình duyệt, dữ liệu cá nhân\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT07-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT07] theo lộ trình là gì?",
        "options": [
          "≥4/5; hiểu HTTPS không bảo đảm mọi nội dung đáng tin",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; hiểu HTTPS không bảo đảm mọi nội dung đáng tin."
      }
    ]
  },
  "IT08": {
    "intro": "Tiết IT08 — An toàn số. Mục tiêu: Phishing, MFA, sao lưu, quyền tối thiểu. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT08 [An toàn số] cung cấp nền tảng: Phishing, MFA, sao lưu, quyền tối thiểu.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT08:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 8 tình huống nhận diện và xử lý.\nTiêu chuẩn đạt: ≥7/8; không lưu mật khẩu vào repo.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT08-Q1",
        "prompt": "Trong bài học [IT08] \"An toàn số\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT08-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"An toàn số\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phishing, MFA, sao lưu, quyền tối thiểu\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phishing, MFA, sao lưu, quyền tối thiểu\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT08-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT08] theo lộ trình là gì?",
        "options": [
          "≥7/8; không lưu mật khẩu vào repo",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; không lưu mật khẩu vào repo."
      }
    ]
  },
  "IT09": {
    "intro": "Tiết IT09 — Nghề nghiệp, đạo đức và xã hội. Mục tiêu: Bản quyền, quyền riêng tư, AI, trách nhiệm nghề nghiệp. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT09 [Nghề nghiệp, đạo đức và xã hội] cung cấp nền tảng: Bản quyền, quyền riêng tư, AI, trách nhiệm nghề nghiệp.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT09:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 3 tình huống với lập luận, không chỉ chọn đáp án.\nTiêu chuẩn đạt: Nêu ảnh hưởng, trách nhiệm và cách xử lý.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT09-Q1",
        "prompt": "Trong bài học [IT09] \"Nghề nghiệp, đạo đức và xã hội\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT09-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Nghề nghiệp, đạo đức và xã hội\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Bản quyền, quyền riêng tư, AI, trách nhiệm nghề nghiệp\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Bản quyền, quyền riêng tư, AI, trách nhiệm nghề nghiệp\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT09-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT09] theo lộ trình là gì?",
        "options": [
          "Nêu ảnh hưởng, trách nhiệm và cách xử lý",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Nêu ảnh hưởng, trách nhiệm và cách xử lý."
      }
    ]
  },
  "IT10": {
    "intro": "Tiết IT10 — Thuật toán và lưu đồ. Mục tiêu: Tuần tự/rẽ nhánh/lặp, input/output. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT10 [Thuật toán và lưu đồ] cung cấp nền tảng: Tuần tự/rẽ nhánh/lặp, input/output.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT10:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 3 lưu đồ: max, tổng chẵn, kiểm tra nguyên tố.\nTiêu chuẩn đạt: Chạy tay được với dữ liệu biên.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT10-Q1",
        "prompt": "Trong bài học [IT10] \"Thuật toán và lưu đồ\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT10-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Thuật toán và lưu đồ\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tuần tự/rẽ nhánh/lặp, input/output\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tuần tự/rẽ nhánh/lặp, input/output\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT10-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT10] theo lộ trình là gì?",
        "options": [
          "Chạy tay được với dữ liệu biên",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Chạy tay được với dữ liệu biên."
      }
    ]
  },
  "IT11": {
    "intro": "Tiết IT11 — Linux: đường dẫn và file. Mục tiêu: Nhánh dự phòng: pwd, ls, cd, mkdir, cp, mv. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT11 [Linux: đường dẫn và file] cung cấp nền tảng: Nhánh dự phòng: pwd, ls, cd, mkdir, cp, mv.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT11:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: Bài tổ chức thư mục trong vùng thử nghiệm riêng.\nTiêu chuẩn đạt: Tự làm lại; không dùng lệnh xóa rộng.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT11-Q1",
        "prompt": "Trong bài học [IT11] \"Linux: đường dẫn và file\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT11-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Linux: đường dẫn và file\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: pwd, ls, cd, mkdir, cp, mv\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: pwd, ls, cd, mkdir, cp, mv\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT11-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT11] theo lộ trình là gì?",
        "options": [
          "Tự làm lại; không dùng lệnh xóa rộng",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Tự làm lại; không dùng lệnh xóa rộng."
      }
    ]
  },
  "IT12": {
    "intro": "Tiết IT12 — Linux: quyền và quy trình. Mục tiêu: Nhánh dự phòng: quyền, process, đọc trợ giúp. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT12 [Linux: quyền và quy trình] cung cấp nền tảng: Nhánh dự phòng: quyền, process, đọc trợ giúp.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT12:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 5 tình huống đường dẫn/quyền.\nTiêu chuẩn đạt: ≥4/5 và giải thích thay đổi.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT12-Q1",
        "prompt": "Trong bài học [IT12] \"Linux: quyền và quy trình\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT12-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Linux: quyền và quy trình\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: quyền, process, đọc trợ giúp\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: quyền, process, đọc trợ giúp\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT12-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT12] theo lộ trình là gì?",
        "options": [
          "≥4/5 và giải thích thay đổi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5 và giải thích thay đổi."
      }
    ]
  },
  "IT13": {
    "intro": "Tiết IT13 — Python: biến và dữ liệu. Mục tiêu: Nhánh dự phòng: nhập/xuất, kiểu và toán tử. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT13 [Python: biến và dữ liệu] cung cấp nền tảng: Nhánh dự phòng: nhập/xuất, kiểu và toán tử.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT13:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 3 chương trình đổi đơn vị/tính trung bình.\nTiêu chuẩn đạt: Tự viết và giải thích từng dòng.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT13-Q1",
        "prompt": "Trong bài học [IT13] \"Python: biến và dữ liệu\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT13-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Python: biến và dữ liệu\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: nhập/xuất, kiểu và toán tử\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: nhập/xuất, kiểu và toán tử\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT13-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT13] theo lộ trình là gì?",
        "options": [
          "Tự viết và giải thích từng dòng",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Tự viết và giải thích từng dòng."
      }
    ]
  },
  "IT14": {
    "intro": "Tiết IT14 — Python: điều kiện. Mục tiêu: Nhánh dự phòng: if/elif, toán tử so sánh. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT14 [Python: điều kiện] cung cấp nền tảng: Nhánh dự phòng: if/elif, toán tử so sánh.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT14:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 3 bài phân loại và kiểm tra dữ liệu.\nTiêu chuẩn đạt: Đúng ca biên; không nhầm =/==.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT14-Q1",
        "prompt": "Trong bài học [IT14] \"Python: điều kiện\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT14-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Python: điều kiện\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: if/elif, toán tử so sánh\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: if/elif, toán tử so sánh\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT14-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT14] theo lộ trình là gì?",
        "options": [
          "Đúng ca biên; không nhầm =/==",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đúng ca biên; không nhầm =/==."
      }
    ]
  },
  "IT15": {
    "intro": "Tiết IT15 — Python: vòng lặp. Mục tiêu: Nhánh dự phòng: for/while, tích lũy. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT15 [Python: vòng lặp] cung cấp nền tảng: Nhánh dự phòng: for/while, tích lũy.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT15:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 3 bài tổng, đếm, tìm max.\nTiêu chuẩn đạt: Không lệch chỉ số hoặc lặp vô hạn.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT15-Q1",
        "prompt": "Trong bài học [IT15] \"Python: vòng lặp\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT15-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Python: vòng lặp\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: for/while, tích lũy\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: for/while, tích lũy\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT15-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT15] theo lộ trình là gì?",
        "options": [
          "Không lệch chỉ số hoặc lặp vô hạn",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Không lệch chỉ số hoặc lặp vô hạn."
      }
    ]
  },
  "IT16": {
    "intro": "Tiết IT16 — Python: hàm và danh sách. Mục tiêu: Nhánh dự phòng: hàm, list, tham số. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT16 [Python: hàm và danh sách] cung cấp nền tảng: Nhánh dự phòng: hàm, list, tham số.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT16:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 2 bài xử lý danh sách.\nTiêu chuẩn đạt: Tự viết, kiểm tra rỗng và 1 phần tử.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT16-Q1",
        "prompt": "Trong bài học [IT16] \"Python: hàm và danh sách\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT16-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Python: hàm và danh sách\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: hàm, list, tham số\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: hàm, list, tham số\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT16-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT16] theo lộ trình là gì?",
        "options": [
          "Tự viết, kiểm tra rỗng và 1 phần tử",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Tự viết, kiểm tra rỗng và 1 phần tử."
      }
    ]
  },
  "IT17": {
    "intro": "Tiết IT17 — Dữ liệu file/CSV. Mục tiêu: Nhánh dự phòng: đọc dữ liệu nhỏ, thống kê. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT17 [Dữ liệu file/CSV] cung cấp nền tảng: Nhánh dự phòng: đọc dữ liệu nhỏ, thống kê.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT17:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: Một file 10 dòng, xuất kết quả tổng hợp.\nTiêu chuẩn đạt: Không lộ dữ liệu cá nhân; giải thích quy trình.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT17-Q1",
        "prompt": "Trong bài học [IT17] \"Dữ liệu file/CSV\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT17-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Dữ liệu file/CSV\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhánh dự phòng: đọc dữ liệu nhỏ, thống kê\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhánh dự phòng: đọc dữ liệu nhỏ, thống kê\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT17-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT17] theo lộ trình là gì?",
        "options": [
          "Không lộ dữ liệu cá nhân; giải thích quy trình",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Không lộ dữ liệu cá nhân; giải thích quy trình."
      }
    ]
  },
  "IT18": {
    "intro": "Tiết IT18 — Lab theo đề lớp. Mục tiêu: Thay bằng công cụ và bài chính thức đã được giao. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT18 [Lab theo đề lớp] cung cấp nền tảng: Thay bằng công cụ và bài chính thức đã được giao.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT18:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: Làm lại 1 lab từ đầu, lưu sản phẩm.\nTiêu chuẩn đạt: Đủ rubric chính thức; chưa có rubric thì chỉ tự luyện.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT18-Q1",
        "prompt": "Trong bài học [IT18] \"Lab theo đề lớp\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT18-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Lab theo đề lớp\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Thay bằng công cụ và bài chính thức đã được giao\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Thay bằng công cụ và bài chính thức đã được giao\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT18-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT18] theo lộ trình là gì?",
        "options": [
          "Đủ rubric chính thức; chưa có rubric thì chỉ tự luyện",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đủ rubric chính thức; chưa có rubric thì chỉ tự luyện."
      }
    ]
  },
  "IT20": {
    "intro": "Tiết IT20 — Ôn nền + thực hành. Mục tiêu: Lý thuyết trộn và tái hiện thao tác. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết IT20 [Ôn nền + thực hành] cung cấp nền tảng: Lý thuyết trộn và tái hiện thao tác.\n\nBản chất khoa học máy tính:\n- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi lập trình C & CNTT kinh điển trong IT20:\n1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n4. Quên dấu '&' trong hàm scanf: scanf(\"%d\", x) thay vì scanf(\"%d\", &x)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Thực hành trong tiết: 20 câu nền, làm lại 1 lab không xem hướng dẫn.\nTiêu chuẩn đạt: ≥18/20; tự thao tác, chưa khẳng định dạng thi.\nQuy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định."
      }
    ],
    "questions": [
      {
        "id": "IT20-Q1",
        "prompt": "Trong bài học [IT20] \"Ôn nền + thực hành\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "IT20-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Ôn nền + thực hành\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Lý thuyết trộn và tái hiện thao tác\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Lý thuyết trộn và tái hiện thao tác\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "IT20-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [IT20] theo lộ trình là gì?",
        "options": [
          "≥18/20; tự thao tác, chưa khẳng định dạng thi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥18/20; tự thao tác, chưa khẳng định dạng thi."
      }
    ]
  },
  "VL01": {
    "intro": "Tiết VL01 — SI và kiểm tra đơn vị. Mục tiêu: Đổi đơn vị, bậc độ lớn, thứ nguyên. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL01 [SI và kiểm tra đơn vị] hướng tới mục tiêu: Đổi đơn vị, bậc độ lớn, thứ nguyên.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL01:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 10 câu đổi km/h↔m/s, đơn vị lực/công/công suất.\nĐiều kiện chuyển bài: ≥9/10; mọi kết quả có đơn vị.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL01-Q1",
        "prompt": "Trong bài học [VL01] \"SI và kiểm tra đơn vị\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL01-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"SI và kiểm tra đơn vị\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đổi đơn vị, bậc độ lớn, thứ nguyên\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đổi đơn vị, bậc độ lớn, thứ nguyên\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL01-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL01] theo lộ trình là gì?",
        "options": [
          "≥9/10; mọi kết quả có đơn vị",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥9/10; mọi kết quả có đơn vị."
      }
    ]
  },
  "VL03": {
    "intro": "Tiết VL03 — Đồ thị x–v–a. Mục tiêu: Ý nghĩa độ dốc và diện tích; biến thiên theo thời gian. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL03 [Đồ thị x–v–a] hướng tới mục tiêu: Ý nghĩa độ dốc và diện tích; biến thiên theo thời gian.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL03:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài đọc đồ thị.\nĐiều kiện chuyển bài: ≥5/6; không nhầm vị trí và quãng đường.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL03-Q1",
        "prompt": "Trong bài học [VL03] \"Đồ thị x–v–a\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL03-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đồ thị x–v–a\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Ý nghĩa độ dốc và diện tích; biến thiên theo thời gian\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Ý nghĩa độ dốc và diện tích; biến thiên theo thời gian\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL03-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL03] theo lộ trình là gì?",
        "options": [
          "≥5/6; không nhầm vị trí và quãng đường",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; không nhầm vị trí và quãng đường."
      }
    ]
  },
  "VL04": {
    "intro": "Tiết VL04 — Chuyển động thẳng và rơi. Mục tiêu: Phương trình, chọn chiều dương, thời điểm. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL04 [Chuyển động thẳng và rơi] hướng tới mục tiêu: Phương trình, chọn chiều dương, thời điểm.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL04:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 8 bài thẳng biến đổi đều/rơi tự do.\nĐiều kiện chuyển bài: ≥7/8; lập phương trình trước thay số.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL04-Q1",
        "prompt": "Trong bài học [VL04] \"Chuyển động thẳng và rơi\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL04-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Chuyển động thẳng và rơi\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phương trình, chọn chiều dương, thời điểm\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phương trình, chọn chiều dương, thời điểm\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL04-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL04] theo lộ trình là gì?",
        "options": [
          "≥7/8; lập phương trình trước thay số",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; lập phương trình trước thay số."
      }
    ]
  },
  "VL05": {
    "intro": "Tiết VL05 — Ném và chuyển động phẳng. Mục tiêu: Phân tích theo hai trục. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL05 [Ném và chuyển động phẳng] hướng tới mục tiêu: Phân tích theo hai trục.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL05:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài ném ngang/xiên cơ bản.\nĐiều kiện chuyển bài: ≥5/6; dùng cùng thời gian hai trục.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL05-Q1",
        "prompt": "Trong bài học [VL05] \"Ném và chuyển động phẳng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL05-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Ném và chuyển động phẳng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phân tích theo hai trục\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phân tích theo hai trục\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL05-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL05] theo lộ trình là gì?",
        "options": [
          "≥5/6; dùng cùng thời gian hai trục",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; dùng cùng thời gian hai trục."
      }
    ]
  },
  "VL06": {
    "intro": "Tiết VL06 — Chuyển động tròn. Mục tiêu: Gia tốc hướng tâm, vận tốc góc. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL06 [Chuyển động tròn] hướng tới mục tiêu: Gia tốc hướng tâm, vận tốc góc.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL06:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài v–ω–a.\nĐiều kiện chuyển bài: ≥5/6; phân biệt gia tốc tiếp tuyến/hướng tâm.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL06-Q1",
        "prompt": "Trong bài học [VL06] \"Chuyển động tròn\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL06-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Chuyển động tròn\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Gia tốc hướng tâm, vận tốc góc\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Gia tốc hướng tâm, vận tốc góc\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL06-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL06] theo lộ trình là gì?",
        "options": [
          "≥5/6; phân biệt gia tốc tiếp tuyến/hướng tâm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; phân biệt gia tốc tiếp tuyến/hướng tâm."
      }
    ]
  },
  "VL08": {
    "intro": "Tiết VL08 — Ma sát và mặt nghiêng. Mục tiêu: Ma sát nghỉ/trượt, chiếu lực. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL08 [Ma sát và mặt nghiêng] hướng tới mục tiêu: Ma sát nghỉ/trượt, chiếu lực.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL08:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài.\nĐiều kiện chuyển bài: ≥5/6; ma sát nghỉ không luôn bằng μN.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL08-Q1",
        "prompt": "Trong bài học [VL08] \"Ma sát và mặt nghiêng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL08-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Ma sát và mặt nghiêng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Ma sát nghỉ/trượt, chiếu lực\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Ma sát nghỉ/trượt, chiếu lực\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL08-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL08] theo lộ trình là gì?",
        "options": [
          "≥5/6; ma sát nghỉ không luôn bằng μN",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; ma sát nghỉ không luôn bằng μN."
      }
    ]
  },
  "VL09": {
    "intro": "Tiết VL09 — Hệ vật và liên kết. Mục tiêu: Cùng gia tốc, lực căng, phương trình hệ. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL09 [Hệ vật và liên kết] hướng tới mục tiêu: Cùng gia tốc, lực căng, phương trình hệ.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL09:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 5 bài hai vật/mặt nghiêng.\nĐiều kiện chuyển bài: ≥4/5; đúng giả thiết ròng rọc/dây.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL09-Q1",
        "prompt": "Trong bài học [VL09] \"Hệ vật và liên kết\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL09-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hệ vật và liên kết\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Cùng gia tốc, lực căng, phương trình hệ\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Cùng gia tốc, lực căng, phương trình hệ\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL09-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL09] theo lộ trình là gì?",
        "options": [
          "≥4/5; đúng giả thiết ròng rọc/dây",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; đúng giả thiết ròng rọc/dây."
      }
    ]
  },
  "VL10": {
    "intro": "Tiết VL10 — Công và công suất. Mục tiêu: Tích lực theo chuyển dời, góc, tốc độ làm việc. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL10 [Công và công suất] hướng tới mục tiêu: Tích lực theo chuyển dời, góc, tốc độ làm việc.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL10:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 8 bài.\nĐiều kiện chuyển bài: ≥7/8; phân biệt lực với công.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL10-Q1",
        "prompt": "Trong bài học [VL10] \"Công và công suất\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL10-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Công và công suất\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tích lực theo chuyển dời, góc, tốc độ làm việc\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tích lực theo chuyển dời, góc, tốc độ làm việc\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL10-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL10] theo lộ trình là gì?",
        "options": [
          "≥7/8; phân biệt lực với công",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; phân biệt lực với công."
      }
    ]
  },
  "VL11": {
    "intro": "Tiết VL11 — Động năng và định lý công. Mục tiêu: Tổng công, biến thiên động năng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL11 [Động năng và định lý công] hướng tới mục tiêu: Tổng công, biến thiên động năng.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL11:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài so với cách Newton.\nĐiều kiện chuyển bài: ≥5/6; tính đủ công các lực.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL11-Q1",
        "prompt": "Trong bài học [VL11] \"Động năng và định lý công\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL11-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Động năng và định lý công\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Tổng công, biến thiên động năng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Tổng công, biến thiên động năng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL11-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL11] theo lộ trình là gì?",
        "options": [
          "≥5/6; tính đủ công các lực",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; tính đủ công các lực."
      }
    ]
  },
  "VL12": {
    "intro": "Tiết VL12 — Thế năng và cơ năng. Mục tiêu: Mốc thế năng, bảo toàn, lực không bảo toàn. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL12 [Thế năng và cơ năng] hướng tới mục tiêu: Mốc thế năng, bảo toàn, lực không bảo toàn.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL12:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài lò xo/trọng lực.\nĐiều kiện chuyển bài: ≥5/6; giải thích khi nào không bảo toàn.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL12-Q1",
        "prompt": "Trong bài học [VL12] \"Thế năng và cơ năng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL12-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Thế năng và cơ năng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Mốc thế năng, bảo toàn, lực không bảo toàn\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Mốc thế năng, bảo toàn, lực không bảo toàn\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL12-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL12] theo lộ trình là gì?",
        "options": [
          "≥5/6; giải thích khi nào không bảo toàn",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; giải thích khi nào không bảo toàn."
      }
    ]
  },
  "VL13": {
    "intro": "Tiết VL13 — Động lượng và xung lượng. Mục tiêu: Hệ cô lập, tổng vector động lượng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL13 [Động lượng và xung lượng] hướng tới mục tiêu: Hệ cô lập, tổng vector động lượng.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL13:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài.\nĐiều kiện chuyển bài: ≥5/6; nêu hệ khảo sát.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL13-Q1",
        "prompt": "Trong bài học [VL13] \"Động lượng và xung lượng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL13-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Động lượng và xung lượng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Hệ cô lập, tổng vector động lượng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Hệ cô lập, tổng vector động lượng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL13-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL13] theo lộ trình là gì?",
        "options": [
          "≥5/6; nêu hệ khảo sát",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; nêu hệ khảo sát."
      }
    ]
  },
  "VL14": {
    "intro": "Tiết VL14 — Va chạm. Mục tiêu: Đàn hồi/không đàn hồi; bảo toàn gì. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL14 [Va chạm] hướng tới mục tiêu: Đàn hồi/không đàn hồi; bảo toàn gì.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL14:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài một chiều.\nĐiều kiện chuyển bài: ≥5/6; không bảo toàn động năng cho mọi va chạm.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL14-Q1",
        "prompt": "Trong bài học [VL14] \"Va chạm\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL14-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Va chạm\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đàn hồi/không đàn hồi; bảo toàn gì\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đàn hồi/không đàn hồi; bảo toàn gì\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL14-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL14] theo lộ trình là gì?",
        "options": [
          "≥5/6; không bảo toàn động năng cho mọi va chạm",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; không bảo toàn động năng cho mọi va chạm."
      }
    ]
  },
  "VL15": {
    "intro": "Tiết VL15 — Test cơ học nền. Mục tiêu: Chọn Newton hay năng lượng hay động lượng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL15 [Test cơ học nền] hướng tới mục tiêu: Chọn Newton hay năng lượng hay động lượng.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL15:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 10 bài ngắn, 35 phút.\nĐiều kiện chuyển bài: ≥8/10 và sửa hết lỗi đơn vị.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL15-Q1",
        "prompt": "Trong bài học [VL15] \"Test cơ học nền\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL15-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Test cơ học nền\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chọn Newton hay năng lượng hay động lượng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chọn Newton hay năng lượng hay động lượng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL15-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL15] theo lộ trình là gì?",
        "options": [
          "≥8/10 và sửa hết lỗi đơn vị",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥8/10 và sửa hết lỗi đơn vị."
      }
    ]
  },
  "VL16": {
    "intro": "Tiết VL16 — Mômen và cân bằng. Mục tiêu: Trục quay, cánh tay đòn, điều kiện cân bằng. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL16 [Mômen và cân bằng] hướng tới mục tiêu: Trục quay, cánh tay đòn, điều kiện cân bằng.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL16:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 5 bài khi thuộc slide.\nĐiều kiện chuyển bài: ≥4/5; xác định đúng trục.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL16-Q1",
        "prompt": "Trong bài học [VL16] \"Mômen và cân bằng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL16-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Mômen và cân bằng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Trục quay, cánh tay đòn, điều kiện cân bằng\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Trục quay, cánh tay đòn, điều kiện cân bằng\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL16-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL16] theo lộ trình là gì?",
        "options": [
          "≥4/5; xác định đúng trục",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; xác định đúng trục."
      }
    ]
  },
  "VL17": {
    "intro": "Tiết VL17 — Quay vật rắn. Mục tiêu: Mômen quán tính, động năng quay. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL17 [Quay vật rắn] hướng tới mục tiêu: Mômen quán tính, động năng quay.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL17:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 5 bài khi lớp yêu cầu.\nĐiều kiện chuyển bài: ≥4/5; không đánh đồng khối lượng với mômen quán tính.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL17-Q1",
        "prompt": "Trong bài học [VL17] \"Quay vật rắn\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL17-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Quay vật rắn\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Mômen quán tính, động năng quay\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Mômen quán tính, động năng quay\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL17-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL17] theo lộ trình là gì?",
        "options": [
          "≥4/5; không đánh đồng khối lượng với mômen quán tính",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; không đánh đồng khối lượng với mômen quán tính."
      }
    ]
  },
  "VL18": {
    "intro": "Tiết VL18 — Dao động. Mục tiêu: Phương trình, chu kỳ, năng lượng cơ bản. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL18 [Dao động] hướng tới mục tiêu: Phương trình, chu kỳ, năng lượng cơ bản.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL18:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài khi đề cương có.\nĐiều kiện chuyển bài: ≥5/6; thống nhất pha và đơn vị.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL18-Q1",
        "prompt": "Trong bài học [VL18] \"Dao động\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL18-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Dao động\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phương trình, chu kỳ, năng lượng cơ bản\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phương trình, chu kỳ, năng lượng cơ bản\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL18-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL18] theo lộ trình là gì?",
        "options": [
          "≥5/6; thống nhất pha và đơn vị",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; thống nhất pha và đơn vị."
      }
    ]
  },
  "VL19": {
    "intro": "Tiết VL19 — Nhiệt độ và nhiệt lượng. Mục tiêu: Cân bằng nhiệt, nhiệt dung, đổi thang. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL19 [Nhiệt độ và nhiệt lượng] hướng tới mục tiêu: Cân bằng nhiệt, nhiệt dung, đổi thang.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL19:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài.\nĐiều kiện chuyển bài: ≥5/6; theo đúng quy ước dấu.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL19-Q1",
        "prompt": "Trong bài học [VL19] \"Nhiệt độ và nhiệt lượng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL19-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Nhiệt độ và nhiệt lượng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Cân bằng nhiệt, nhiệt dung, đổi thang\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Cân bằng nhiệt, nhiệt dung, đổi thang\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL19-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL19] theo lộ trình là gì?",
        "options": [
          "≥5/6; theo đúng quy ước dấu",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; theo đúng quy ước dấu."
      }
    ]
  },
  "VL20": {
    "intro": "Tiết VL20 — Khí lý tưởng. Mục tiêu: Phương trình trạng thái, mol và nhiệt độ tuyệt đối. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL20 [Khí lý tưởng] hướng tới mục tiêu: Phương trình trạng thái, mol và nhiệt độ tuyệt đối.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL20:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 8 bài.\nĐiều kiện chuyển bài: ≥7/8; dùng kelvin.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL20-Q1",
        "prompt": "Trong bài học [VL20] \"Khí lý tưởng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL20-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Khí lý tưởng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Phương trình trạng thái, mol và nhiệt độ tuyệt đối\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Phương trình trạng thái, mol và nhiệt độ tuyệt đối\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL20-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL20] theo lộ trình là gì?",
        "options": [
          "≥7/8; dùng kelvin",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8; dùng kelvin."
      }
    ]
  },
  "VL21": {
    "intro": "Tiết VL21 — Các quá trình khí. Mục tiêu: Đẳng nhiệt/đẳng áp/đẳng tích; đồ thị p–V. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL21 [Các quá trình khí] hướng tới mục tiêu: Đẳng nhiệt/đẳng áp/đẳng tích; đồ thị p–V.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL21:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài phân loại và công.\nĐiều kiện chuyển bài: ≥5/6; nhận biết đại lượng giữ không đổi.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL21-Q1",
        "prompt": "Trong bài học [VL21] \"Các quá trình khí\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL21-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Các quá trình khí\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đẳng nhiệt/đẳng áp/đẳng tích; đồ thị p–V\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đẳng nhiệt/đẳng áp/đẳng tích; đồ thị p–V\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL21-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL21] theo lộ trình là gì?",
        "options": [
          "≥5/6; nhận biết đại lượng giữ không đổi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; nhận biết đại lượng giữ không đổi."
      }
    ]
  },
  "VL22": {
    "intro": "Tiết VL22 — Nguyên lý I nhiệt động lực học. Mục tiêu: Nội năng, công và nhiệt. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL22 [Nguyên lý I nhiệt động lực học] hướng tới mục tiêu: Nội năng, công và nhiệt.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL22:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 6 bài quá trình/hệ kín.\nĐiều kiện chuyển bài: ≥5/6; ghi quy ước dấu trước tính.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL22-Q1",
        "prompt": "Trong bài học [VL22] \"Nguyên lý I nhiệt động lực học\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL22-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Nguyên lý I nhiệt động lực học\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nội năng, công và nhiệt\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nội năng, công và nhiệt\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL22-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL22] theo lộ trình là gì?",
        "options": [
          "≥5/6; ghi quy ước dấu trước tính",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; ghi quy ước dấu trước tính."
      }
    ]
  },
  "VL23": {
    "intro": "Tiết VL23 — Động cơ nhiệt và nguyên lý II. Mục tiêu: Hiệu suất, chu trình; entropy nếu lớp có. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL23 [Động cơ nhiệt và nguyên lý II] hướng tới mục tiêu: Hiệu suất, chu trình; entropy nếu lớp có.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL23:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: 5 bài mức cơ bản.\nĐiều kiện chuyển bài: ≥4/5; không tự thêm công thức ngoài phạm vi.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL23-Q1",
        "prompt": "Trong bài học [VL23] \"Động cơ nhiệt và nguyên lý II\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL23-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Động cơ nhiệt và nguyên lý II\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Hiệu suất, chu trình; entropy nếu lớp có\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Hiệu suất, chu trình; entropy nếu lớp có\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL23-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL23] theo lộ trình là gì?",
        "options": [
          "≥4/5; không tự thêm công thức ngoài phạm vi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; không tự thêm công thức ngoài phạm vi."
      }
    ]
  },
  "VL24": {
    "intro": "Tiết VL24 — Sai số đo. Mục tiêu: Sai số, chữ số có nghĩa, lan truyền sai số. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL24 [Sai số đo] hướng tới mục tiêu: Sai số, chữ số có nghĩa, lan truyền sai số.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL24:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: Một bảng đo giả lập và 5 bài sai số.\nĐiều kiện chuyển bài: Báo cáo sai số cùng đơn vị, số chữ số phù hợp.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL24-Q1",
        "prompt": "Trong bài học [VL24] \"Sai số đo\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL24-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Sai số đo\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Sai số, chữ số có nghĩa, lan truyền sai số\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Sai số, chữ số có nghĩa, lan truyền sai số\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL24-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL24] theo lộ trình là gì?",
        "options": [
          "Báo cáo sai số cùng đơn vị, số chữ số phù hợp",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Báo cáo sai số cùng đơn vị, số chữ số phù hợp."
      }
    ]
  },
  "VL25": {
    "intro": "Tiết VL25 — Bảng dữ liệu và đồ thị. Mục tiêu: Đồ thị, slope, phân tích đơn giản. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL25 [Bảng dữ liệu và đồ thị] hướng tới mục tiêu: Đồ thị, slope, phân tích đơn giản.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL25:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: Vẽ đồ thị từ 6–10 phép đo giả lập.\nĐiều kiện chuyển bài: Đủ tên trục/đơn vị, giải thích slope.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL25-Q1",
        "prompt": "Trong bài học [VL25] \"Bảng dữ liệu và đồ thị\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL25-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Bảng dữ liệu và đồ thị\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đồ thị, slope, phân tích đơn giản\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đồ thị, slope, phân tích đơn giản\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL25-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL25] theo lộ trình là gì?",
        "options": [
          "Đủ tên trục/đơn vị, giải thích slope",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đủ tên trục/đơn vị, giải thích slope."
      }
    ]
  },
  "VL26": {
    "intro": "Tiết VL26 — Viết báo cáo thực hành. Mục tiêu: Mục đích, cơ sở, dữ liệu, xử lý, kết luận. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL26 [Viết báo cáo thực hành] hướng tới mục tiêu: Mục đích, cơ sở, dữ liệu, xử lý, kết luận.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL26:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: Một báo cáo giả lập 2–3 trang; đổi sang bài lab thật khi có.\nĐiều kiện chuyển bài: Đủ cấu trúc, kết luận không vượt dữ liệu.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL26-Q1",
        "prompt": "Trong bài học [VL26] \"Viết báo cáo thực hành\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL26-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Viết báo cáo thực hành\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Mục đích, cơ sở, dữ liệu, xử lý, kết luận\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Mục đích, cơ sở, dữ liệu, xử lý, kết luận\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL26-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL26] theo lộ trình là gì?",
        "options": [
          "Đủ cấu trúc, kết luận không vượt dữ liệu",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đủ cấu trúc, kết luận không vượt dữ liệu."
      }
    ]
  },
  "VL27": {
    "intro": "Tiết VL27 — Đề tự luyện cơ–nhiệt. Mục tiêu: Nhận dạng bài và chọn định luật. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL27 [Đề tự luyện cơ–nhiệt] hướng tới mục tiêu: Nhận dạng bài và chọn định luật.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL27:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: Bài trộn 35 phút, ghi định luật dùng.\nĐiều kiện chuyển bài: ≥85%; không gọi là đề giữa kỳ chính thức.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL27-Q1",
        "prompt": "Trong bài học [VL27] \"Đề tự luyện cơ–nhiệt\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL27-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Đề tự luyện cơ–nhiệt\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nhận dạng bài và chọn định luật\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nhận dạng bài và chọn định luật\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL27-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL27] theo lộ trình là gì?",
        "options": [
          "≥85%; không gọi là đề giữa kỳ chính thức",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥85%; không gọi là đề giữa kỳ chính thức."
      }
    ]
  },
  "VL28": {
    "intro": "Tiết VL28 — Ôn tổng hợp và lỗi. Mục tiêu: Đơn vị, dấu, đồ thị, báo cáo. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết VL28 [Ôn tổng hợp và lỗi] hướng tới mục tiêu: Đơn vị, dấu, đồ thị, báo cáo.\n\nBản chất vật lý đại cương:\n- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy lỗi phòng thi Vật lý 1 trong VL28:\n1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Bài tập tự luyện: Test mới và sửa 5 lỗi lặp.\nĐiều kiện chuyển bài: ≥85% ở hai lượt; lịch thi còn chưa xác minh.\nMẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý."
      }
    ],
    "questions": [
      {
        "id": "VL28-Q1",
        "prompt": "Trong bài học [VL28] \"Ôn tổng hợp và lỗi\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "VL28-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Ôn tổng hợp và lỗi\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Đơn vị, dấu, đồ thị, báo cáo\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Đơn vị, dấu, đồ thị, báo cáo\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "VL28-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [VL28] theo lộ trình là gì?",
        "options": [
          "≥85% ở hai lượt; lịch thi còn chưa xác minh",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥85% ở hai lượt; lịch thi còn chưa xác minh."
      }
    ]
  },
  "PL01": {
    "intro": "Tiết PL01 — Nhà nước: nguồn gốc và bản chất. Mục tiêu: Khái niệm, đặc trưng, các cách phân biệt. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL01 [Nhà nước: nguồn gốc và bản chất] giúp bạn nắm chắc: Khái niệm, đặc trưng, các cách phân biệt.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL01:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 10 câu khái niệm và 2 ví dụ.\nTiêu chuẩn đạt: ≥8/10; giải thích bằng lời của mình.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL01-Q1",
        "prompt": "Trong bài học [PL01] \"Nhà nước: nguồn gốc và bản chất\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL01-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Nhà nước: nguồn gốc và bản chất\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Khái niệm, đặc trưng, các cách phân biệt\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Khái niệm, đặc trưng, các cách phân biệt\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL01-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL01] theo lộ trình là gì?",
        "options": [
          "≥8/10; giải thích bằng lời của mình",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥8/10; giải thích bằng lời của mình."
      }
    ]
  },
  "PL02": {
    "intro": "Tiết PL02 — Chức năng và hình thức nhà nước. Mục tiêu: Chức năng, chính thể, cấu trúc, chế độ. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL02 [Chức năng và hình thức nhà nước] giúp bạn nắm chắc: Chức năng, chính thể, cấu trúc, chế độ.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL02:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: Bảng so sánh và 8 câu.\nTiêu chuẩn đạt: ≥7/8.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL02-Q1",
        "prompt": "Trong bài học [PL02] \"Chức năng và hình thức nhà nước\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL02-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Chức năng và hình thức nhà nước\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chức năng, chính thể, cấu trúc, chế độ\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chức năng, chính thể, cấu trúc, chế độ\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL02-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL02] theo lộ trình là gì?",
        "options": [
          "≥7/8",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8."
      }
    ]
  },
  "PL03": {
    "intro": "Tiết PL03 — Bộ máy nhà nước. Mục tiêu: Vai trò các cơ quan theo văn bản hiện hành. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL03 [Bộ máy nhà nước] giúp bạn nắm chắc: Vai trò các cơ quan theo văn bản hiện hành.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL03:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: Vẽ sơ đồ, phân tích 4 nhiệm vụ cơ quan.\nTiêu chuẩn đạt: Đúng chức năng; cập nhật mô hình hiện hành.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL03-Q1",
        "prompt": "Trong bài học [PL03] \"Bộ máy nhà nước\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL03-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Bộ máy nhà nước\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Vai trò các cơ quan theo văn bản hiện hành\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Vai trò các cơ quan theo văn bản hiện hành\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL03-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL03] theo lộ trình là gì?",
        "options": [
          "Đúng chức năng; cập nhật mô hình hiện hành",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: Đúng chức năng; cập nhật mô hình hiện hành."
      }
    ]
  },
  "PL04": {
    "intro": "Tiết PL04 — Pháp luật: khái niệm và đặc trưng. Mục tiêu: Bản chất, vai trò, quan hệ với đạo đức. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL04 [Pháp luật: khái niệm và đặc trưng] giúp bạn nắm chắc: Bản chất, vai trò, quan hệ với đạo đức.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL04:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 8 câu phân biệt và 2 tình huống.\nTiêu chuẩn đạt: ≥7/8.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL04-Q1",
        "prompt": "Trong bài học [PL04] \"Pháp luật: khái niệm và đặc trưng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL04-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Pháp luật: khái niệm và đặc trưng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Bản chất, vai trò, quan hệ với đạo đức\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Bản chất, vai trò, quan hệ với đạo đức\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL04-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL04] theo lộ trình là gì?",
        "options": [
          "≥7/8",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥7/8."
      }
    ]
  },
  "PL06": {
    "intro": "Tiết PL06 — Văn bản và hiệu lực. Mục tiêu: Văn bản quy phạm, thứ bậc, hiệu lực. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL06 [Văn bản và hiệu lực] giúp bạn nắm chắc: Văn bản quy phạm, thứ bậc, hiệu lực.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL06:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 5 tình huống chọn văn bản áp dụng.\nTiêu chuẩn đạt: ≥4/5; kiểm tra hiệu lực thật.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL06-Q1",
        "prompt": "Trong bài học [PL06] \"Văn bản và hiệu lực\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL06-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Văn bản và hiệu lực\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Văn bản quy phạm, thứ bậc, hiệu lực\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Văn bản quy phạm, thứ bậc, hiệu lực\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL06-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL06] theo lộ trình là gì?",
        "options": [
          "≥4/5; kiểm tra hiệu lực thật",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; kiểm tra hiệu lực thật."
      }
    ]
  },
  "PL07": {
    "intro": "Tiết PL07 — Quan hệ pháp luật. Mục tiêu: Chủ thể, nội dung, khách thể, sự kiện pháp lý. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL07 [Quan hệ pháp luật] giúp bạn nắm chắc: Chủ thể, nội dung, khách thể, sự kiện pháp lý.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL07:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 5 tình huống theo bốn mục.\nTiêu chuẩn đạt: ≥4/5.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL07-Q1",
        "prompt": "Trong bài học [PL07] \"Quan hệ pháp luật\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL07-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Quan hệ pháp luật\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Chủ thể, nội dung, khách thể, sự kiện pháp lý\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Chủ thể, nội dung, khách thể, sự kiện pháp lý\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL07-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL07] theo lộ trình là gì?",
        "options": [
          "≥4/5",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5."
      }
    ]
  },
  "PL08": {
    "intro": "Tiết PL08 — Vi phạm pháp luật. Mục tiêu: Dấu hiệu và các yếu tố cấu thành. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL08 [Vi phạm pháp luật] giúp bạn nắm chắc: Dấu hiệu và các yếu tố cấu thành.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL08:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 6 tình huống, phân biệt hành vi và hậu quả.\nTiêu chuẩn đạt: ≥5/6.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL08-Q1",
        "prompt": "Trong bài học [PL08] \"Vi phạm pháp luật\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL08-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Vi phạm pháp luật\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Dấu hiệu và các yếu tố cấu thành\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Dấu hiệu và các yếu tố cấu thành\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL08-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL08] theo lộ trình là gì?",
        "options": [
          "≥5/6",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6."
      }
    ]
  },
  "PL10": {
    "intro": "Tiết PL10 — Hiến pháp và quyền cơ bản. Mục tiêu: Quyền/nghĩa vụ, nguyên tắc tổ chức. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL10 [Hiến pháp và quyền cơ bản] giúp bạn nắm chắc: Quyền/nghĩa vụ, nguyên tắc tổ chức.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL10:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 6 tình huống theo tài liệu hiện hành.\nTiêu chuẩn đạt: ≥5/6; không dùng mô hình cơ quan lỗi thời.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL10-Q1",
        "prompt": "Trong bài học [PL10] \"Hiến pháp và quyền cơ bản\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL10-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hiến pháp và quyền cơ bản\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Quyền/nghĩa vụ, nguyên tắc tổ chức\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Quyền/nghĩa vụ, nguyên tắc tổ chức\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL10-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL10] theo lộ trình là gì?",
        "options": [
          "≥5/6; không dùng mô hình cơ quan lỗi thời",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; không dùng mô hình cơ quan lỗi thời."
      }
    ]
  },
  "PL11": {
    "intro": "Tiết PL11 — Pháp luật hành chính. Mục tiêu: Quản lý, quyết định, xử lý vi phạm. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL11 [Pháp luật hành chính] giúp bạn nắm chắc: Quản lý, quyết định, xử lý vi phạm.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL11:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 6 tình huống nếu lớp yêu cầu.\nTiêu chuẩn đạt: ≥5/6.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL11-Q1",
        "prompt": "Trong bài học [PL11] \"Pháp luật hành chính\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL11-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Pháp luật hành chính\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Quản lý, quyết định, xử lý vi phạm\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Quản lý, quyết định, xử lý vi phạm\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL11-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL11] theo lộ trình là gì?",
        "options": [
          "≥5/6",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6."
      }
    ]
  },
  "PL12": {
    "intro": "Tiết PL12 — Dân sự: tài sản và chủ thể. Mục tiêu: Năng lực, sở hữu, giao dịch. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL12 [Dân sự: tài sản và chủ thể] giúp bạn nắm chắc: Năng lực, sở hữu, giao dịch.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL12:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 6 tình huống dân sự.\nTiêu chuẩn đạt: ≥5/6; phân biệt năng lực và hành vi.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL12-Q1",
        "prompt": "Trong bài học [PL12] \"Dân sự: tài sản và chủ thể\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL12-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Dân sự: tài sản và chủ thể\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Năng lực, sở hữu, giao dịch\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Năng lực, sở hữu, giao dịch\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL12-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL12] theo lộ trình là gì?",
        "options": [
          "≥5/6; phân biệt năng lực và hành vi",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; phân biệt năng lực và hành vi."
      }
    ]
  },
  "PL13": {
    "intro": "Tiết PL13 — Hợp đồng và nghĩa vụ. Mục tiêu: Giao kết, hiệu lực, thực hiện, trách nhiệm. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL13 [Hợp đồng và nghĩa vụ] giúp bạn nắm chắc: Giao kết, hiệu lực, thực hiện, trách nhiệm.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL13:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 4 tình huống hợp đồng.\nTiêu chuẩn đạt: ≥3/4; không suy diễn ngoài dữ kiện.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL13-Q1",
        "prompt": "Trong bài học [PL13] \"Hợp đồng và nghĩa vụ\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL13-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hợp đồng và nghĩa vụ\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Giao kết, hiệu lực, thực hiện, trách nhiệm\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Giao kết, hiệu lực, thực hiện, trách nhiệm\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL13-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL13] theo lộ trình là gì?",
        "options": [
          "≥3/4; không suy diễn ngoài dữ kiện",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥3/4; không suy diễn ngoài dữ kiện."
      }
    ]
  },
  "PL14": {
    "intro": "Tiết PL14 — Lao động. Mục tiêu: Quan hệ lao động, hợp đồng, quyền/nghĩa vụ. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL14 [Lao động] giúp bạn nắm chắc: Quan hệ lao động, hợp đồng, quyền/nghĩa vụ.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL14:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 5 tình huống theo văn bản hiện hành.\nTiêu chuẩn đạt: ≥4/5.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL14-Q1",
        "prompt": "Trong bài học [PL14] \"Lao động\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL14-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Lao động\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Quan hệ lao động, hợp đồng, quyền/nghĩa vụ\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Quan hệ lao động, hợp đồng, quyền/nghĩa vụ\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL14-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL14] theo lộ trình là gì?",
        "options": [
          "≥4/5",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5."
      }
    ]
  },
  "PL15": {
    "intro": "Tiết PL15 — Hình sự. Mục tiêu: Khái niệm tội phạm, trách nhiệm, phân biệt hành chính. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL15 [Hình sự] giúp bạn nắm chắc: Khái niệm tội phạm, trách nhiệm, phân biệt hành chính.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL15:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 6 tình huống nhập môn.\nTiêu chuẩn đạt: ≥5/6; không tự kết luận án cụ thể.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL15-Q1",
        "prompt": "Trong bài học [PL15] \"Hình sự\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL15-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hình sự\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Khái niệm tội phạm, trách nhiệm, phân biệt hành chính\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Khái niệm tội phạm, trách nhiệm, phân biệt hành chính\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL15-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL15] theo lộ trình là gì?",
        "options": [
          "≥5/6; không tự kết luận án cụ thể",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥5/6; không tự kết luận án cụ thể."
      }
    ]
  },
  "PL16": {
    "intro": "Tiết PL16 — Hôn nhân gia đình. Mục tiêu: Nguyên tắc, điều kiện, quyền/nghĩa vụ. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL16 [Hôn nhân gia đình] giúp bạn nắm chắc: Nguyên tắc, điều kiện, quyền/nghĩa vụ.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL16:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 5 tình huống theo phạm vi lớp.\nTiêu chuẩn đạt: ≥4/5.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL16-Q1",
        "prompt": "Trong bài học [PL16] \"Hôn nhân gia đình\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL16-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Hôn nhân gia đình\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Nguyên tắc, điều kiện, quyền/nghĩa vụ\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Nguyên tắc, điều kiện, quyền/nghĩa vụ\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL16-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL16] theo lộ trình là gì?",
        "options": [
          "≥4/5",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5."
      }
    ]
  },
  "PL17": {
    "intro": "Tiết PL17 — Phòng chống tham nhũng. Mục tiêu: Khái niệm, hành vi, phòng ngừa nếu đề cương có. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL17 [Phòng chống tham nhũng] giúp bạn nắm chắc: Khái niệm, hành vi, phòng ngừa nếu đề cương có.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL17:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 5 tình huống; bảng ôn khái niệm.\nTiêu chuẩn đạt: ≥4/5; đối chiếu quy định hiện hành.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL17-Q1",
        "prompt": "Trong bài học [PL17] \"Phòng chống tham nhũng\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL17-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Phòng chống tham nhũng\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"Khái niệm, hành vi, phòng ngừa nếu đề cương có\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"Khái niệm, hành vi, phòng ngừa nếu đề cương có\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL17-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL17] theo lộ trình là gì?",
        "options": [
          "≥4/5; đối chiếu quy định hiện hành",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥4/5; đối chiếu quy định hiện hành."
      }
    ]
  },
  "PL18": {
    "intro": "Tiết PL18 — Test tổng hợp và sửa bẫy. Mục tiêu: So sánh khái niệm; lập luận tình huống. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).",
    "sections": [
      {
        "id": "concept",
        "title": "1. Khái niệm cốt lõi & Cơ chế hoạt động",
        "body": "Tiết PL18 [Test tổng hợp và sửa bẫy] giúp bạn nắm chắc: So sánh khái niệm; lập luận tình huống.\n\nBản chất pháp lý đại cương:\n- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan)."
      },
      {
        "id": "pitfalls",
        "title": "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
        "body": "Bẫy đề thi trắc nghiệm Pháp luật trong PL18:\n1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu)."
      },
      {
        "id": "practice_guide",
        "title": "3. Hướng dẫn tư duy & Bài tập tự luyện",
        "body": "Tự luyện trong tiết: 30 câu luyện trong 35 phút, 10 phút sửa.\nTiêu chuẩn đạt: ≥27/30; chưa gọi là ma trận thi chính thức.\nPhương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật."
      }
    ],
    "questions": [
      {
        "id": "PL18-Q1",
        "prompt": "Trong bài học [PL18] \"Test tổng hợp và sửa bẫy\", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?",
        "options": [
          "Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi",
          "Học vẹt đáp án và bỏ qua các giả thiết ban đầu",
          "Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian",
          "Bỏ qua các phép kiểm tra điều kiện biên và đơn vị"
        ],
        "answer": 0,
        "explanation": "Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa."
      },
      {
        "id": "PL18-Q2",
        "prompt": "Khi gặp bài tập thuộc chuyên đề \"Test tổng hợp và sửa bẫy\", bước xử lý ban đầu chuẩn xác là gì?",
        "options": [
          "Đọc kỹ đề bài, xác định mục tiêu \"So sánh khái niệm; lập luận tình huống\", sau đó chọn phương pháp giải phù hợp",
          "Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu",
          "Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ",
          "Chỉ dựa vào trực giác mà không dùng công thức khoa học"
        ],
        "answer": 0,
        "explanation": "Phân tích dữ kiện và bám sát mục tiêu \"So sánh khái niệm; lập luận tình huống\" giúp định hướng phương pháp chính xác ngay từ đầu."
      },
      {
        "id": "PL18-Q3",
        "prompt": "Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [PL18] theo lộ trình là gì?",
        "options": [
          "≥27/30; chưa gọi là ma trận thi chính thức",
          "Chỉ cần đọc lướt qua lý thuyết một lần",
          "Làm đúng 1 câu duy nhất rồi dừng lại",
          "Không cần kiểm tra lại kết quả"
        ],
        "answer": 0,
        "explanation": "Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ≥27/30; chưa gọi là ma trận thi chính thức."
      }
    ]
  }
};

export function getLessonContent(code) {
  if (LESSON_CONTENT_MAP[code]) {
    return LESSON_CONTENT_MAP[code];
  }
  const session = DEFAULT_SESSIONS.find(s => s.code === code);
  const subInfo = session ? SUBJECTS_MAP[session.subject] : null;
  return {
    intro: `Tiết học [${code}] - ${session ? session.title : 'Chủ đề tự học'}. Thuộc học phần ${subInfo ? subInfo.name : 'Đại học Phenikaa'}.`,
    sections: [
      {
        id: "concept",
        title: "1. Khái niệm cốt lõi & Mục tiêu cần đạt",
        body: `Trong tiết ${code} (${session ? session.title : ''}), bạn cần nắm vững định nghĩa bản chất, hiểu cơ chế hoạt động và tránh các bẫy sai kinh điển.`
      },
      {
        id: "pitfalls",
        title: "2. Bẫy lỗi thường gặp & Lưu ý",
        body: `Các bẫy lỗi kinh điển trong chủ đề này đã được tổng hợp để bạn bôi màu highlight và hỏi Trợ lý AI GLM 5.3.`
      }
    ],
    questions: [
      {
        id: `${code}-Q1`,
        prompt: `Mục tiêu cốt lõi của bài học [${code}] ${session ? session.title : ''} là gì?`,
        options: [
          `Hiểu bản chất và vận dụng giải quyết bài toán/tình huống`,
          `Học vẹt công thức mà không hiểu ý nghĩa`,
          `Làm nhanh bỏ qua các bước kiểm tra điều kiện`,
          `Chỉ học để đối phó thi cử`
        ],
        answer: 0,
        explanation: `Phương pháp học tập K20 AI Phenikaa luôn chú trọng hiểu sâu bản chất, nắm chắc bẫy lỗi để đạt GPA ≥ 3.60.`
      }
    ]
  };
}
