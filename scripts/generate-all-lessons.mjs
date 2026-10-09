import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const contentJsonPath = path.join(rootDir, "app/src/data/content.json");
const dataStorePath = path.join(rootDir, "data-store.js");

// Đọc nội dung hiện có
let existingContent = {};
if (fs.existsSync(contentJsonPath)) {
  try {
    existingContent = JSON.parse(fs.readFileSync(contentJsonPath, "utf8"));
  } catch (e) {
    existingContent = {};
  }
}

// Bổ sung EN01 nếu chưa có
if (!existingContent["EN01"]) {
  existingContent["EN01"] = {
    intro: "Chẩn đoán 4 kỹ năng ngày 07/10: Ngữ pháp 3/8, Từ vựng 3/5, Đọc 4/5, Nghe 2/4. Tổng ôn bản chất các lỗi thường gặp trong kỳ thi phân loại Tiếng Anh đầu vào (50 câu / 60 phút tại tòa A6, ngày 17-18/10/2026).",
    sections: [
      {
        id: "symbols",
        title: "1. Ký hiệu phát âm Email & Nghe chi tiết",
        body: "Trong bài thi nghe và đọc thông tin, ký hiệu email thường gặp:\n- dot (.) = dấu chấm (Ví dụ: nam dot tran -> nam.tran)\n- at (@) = dấu a còng (Ví dụ: at study -> @study)\n- hyphen / dash (-) = dấu gạch ngang (Ví dụ: study-club)\n- underscore (_) = dấu gạch dưới (Ví dụ: thuan_ai)\n\nBẫy lỗi kinh điển: Thí sinh rất dễ nhầm giữa hyphen (-) và underscore (_), hoặc nghe 'dot' lại viết nguyên chữ 'dot' thay vì dấu chấm (.)."
      },
      {
        id: "grammar",
        title: "2. Bản chất ngữ pháp nền & Trợ động từ",
        body: "1. Thói quen ở hiện tại: He / She / It + V-s/es. Ví dụ: She studies English every evening (study -> studies).\n2. Trợ động từ câu hỏi: 'Do you...?' nhưng 'Does she...?'. Khi đã mượn trợ động từ Does thì động từ chính trở về nguyên mẫu (Does she study...?).\n3. Hành động đang diễn ra: S + be + V-ing (The students are playing football).\n4. Động từ khuyết thiếu: must / can / should + V-nguyên mẫu (You must bring your student card)."
      },
      {
        id: "vocab_reading",
        title: "3. Từ vựng cụm cố định & Bẫy đọc hiểu",
        body: "1. Cụm từ cố định (Collocations): 'pay attention to' (chú ý đến); 'borrow' (mượn từ ai); 'lend' (cho ai mượn); 'spend time/money on' (dành thời gian/tiền bạc).\n2. Bẫy đọc hiểu ngày thi: Phân biệt quy tắc thường lệ với ngoại lệ riêng biệt. Ví dụ: 'Thư viện thường mở lúc 8h sáng, riêng thứ Ba mở lúc 10h sáng'. Nếu đề hỏi thời gian mở cửa ngày thứ Ba mà chọn 8h là dính bẫy!"
      }
    ],
    questions: [
      {
        id: "EN01-Q1",
        prompt: "Địa chỉ email đọc là: 'mai dot le at phenikaa hyphen uni dot edu dot vn'. Viết đúng là:",
        options: [
          "mai.le@phenikaa_uni.edu.vn",
          "mai.le@phenikaa-uni.edu.vn",
          "mai_le@phenikaa-uni.edu.vn",
          "maile@phenikaa.uni.edu.vn"
        ],
        answer: 1,
        explanation: "dot là dấu chấm (.), hyphen là dấu gạch ngang (-)."
      },
      {
        id: "EN01-Q2",
        prompt: "Chọn câu đúng về thói quen học tập của Lan:",
        options: [
          "Lan study English every morning.",
          "Lan studies English every morning.",
          "Lan is study English every morning.",
          "Lan does studies English every morning."
        ],
        answer: 1,
        explanation: "Chủ ngữ Lan là ngôi 3 số ít, động từ study tận cùng là phụ âm + y nên đổi thành -ies (studies)."
      },
      {
        id: "EN01-Q3",
        prompt: "Chọn trợ động từ đúng: '___ your brother live in Hanoi?'",
        options: [
          "Do",
          "Does",
          "Is",
          "Are"
        ],
        answer: 1,
        explanation: "your brother là ngôi thứ 3 số ít (he), câu hỏi thì hiện tại đơn với động từ thường live dùng trợ động từ Does."
      },
      {
        id: "EN01-Q4",
        prompt: "“You must ___ quiet in the exam room.”",
        options: [
          "be",
          "are",
          "to be",
          "being"
        ],
        answer: 0,
        explanation: "Sau modal verb (must, can, should...) động từ luôn ở dạng nguyên mẫu không to (bare infinitive): must be."
      },
      {
        id: "EN01-Q5",
        prompt: "Điền từ thích hợp: 'Please pay ___ to the instructions on the screen.'",
        options: [
          "focus",
          "attention",
          "notice",
          "listening"
        ],
        answer: 1,
        explanation: "Cụm từ cố định: pay attention to something = chú ý, để tâm đến điều gì."
      }
    ]
  };
}

// Hàm đọc và phân tích bảng markdown trong thư mục tung-tiet
function parseCurriculumMd(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const lessons = [];
  let inTable = false;

  for (const line of lines) {
    if (line.includes("| Tiết |") || line.includes("| Tiết | Chuyên đề")) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith("|---|")) continue;
    if (inTable && line.startsWith("|")) {
      const parts = line.split("|").map(p => p.trim()).filter(Boolean);
      if (parts.length >= 4) {
        lessons.push({
          code: parts[0],
          title: parts[1],
          objective: parts[2],
          practice: parts[3],
          criteria: parts[4] || ""
        });
      }
    } else if (inTable && line.trim() === "") {
      // Kết thúc bảng
      inTable = false;
    }
  }
  return lessons;
}

const tungTietDir = path.join(rootDir, "ke-hoach-hoc-tap/hk1-2026/tung-tiet");
const filesMap = {
  EN: path.join(tungTietDir, "tieng-anh-dau-vao.md"),
  GT: path.join(tungTietDir, "FFS703080-giai-tich-1.md"),
  IT: path.join(tungTietDir, "CSE702040-nhap-mon-cntt.md"),
  VL: path.join(tungTietDir, "FFS703013-vat-ly-1.md"),
  PL: path.join(tungTietDir, "FFS702001-phap-luat-dai-cuong.md")
};

const allCurriculumLessons = [];
for (const [sub, fPath] of Object.entries(filesMap)) {
  if (fs.existsSync(fPath)) {
    const list = parseCurriculumMd(fPath);
    list.forEach(item => {
      allCurriculumLessons.push({ ...item, subject: sub });
    });
  }
}

console.log(`Đã đọc ${allCurriculumLessons.length} tiết từ đề cương markdown.`);

// Dữ liệu bẫy lỗi và lý thuyết chuyên sâu theo môn
const SUBJECT_KNOWLEDGE = {
  GT: {
    getCoreTheory: (l) => `Trong tiết ${l.code} [${l.title}], mục tiêu cốt lõi là: ${l.objective}.\n\n` +
      `Quy tắc giải tích cần nắm vững:\n` +
      `- Phân tích bài toán theo từng bước giải tích chuẩn: Xác định miền xác định D -> Nhận dạng bài toán -> Chọn công cụ phù hợp -> Biến đổi đại số chính xác -> Kiểm tra lại kết quả tại điểm biên.\n` +
      `- Với các phép tính đạo hàm, giới hạn hoặc tích phân: Luôn lưu ý tính liên tục và các giả thiết tiên quyết trước khi áp dụng công thức hoặc định lý.`,
    getPitfalls: (l) => `Các bẫy lỗi kinh điển trong ${l.code} mà sinh viên Phenikaa thường mắc:\n` +
      `1. Lỗi dấu âm: Quên đổi dấu toàn bộ biểu thức khi phá ngoặc hoặc nhân lượng liên hợp (ví dụ -(a - b) biến thành -a - b là sai, phải là -a + b).\n` +
      `2. Nhầm lẫn dạng vô định: Coi 0/0 là 0 hoặc coi vô cùng - vô cùng là 0 mà không thực hiện phép biến đổi khử dạng vô định.\n` +
      `3. Bỏ quên điều kiện xác định và điều kiện biên khi xét tính liên tục, cực trị hoặc khi đổi cận tích phân.`,
    getMethod: (l) => `Phương pháp tự luyện trong tiết: ${l.practice}.\nĐiều kiện đạt để chuyển bài: ${l.criteria}.\n` +
      `Mẹo học nhanh: Giải từng bước cẩn thận ra nháp, viết rõ từng phép biến đổi trung gian, kiểm tra lại chiều đạo hàm hoặc thế thử giá trị nhỏ để kiểm tra tính đúng đắn.`
  },
  EN: {
    getCoreTheory: (l) => `Tiết ${l.code} [${l.title}] tập trung vào mục tiêu: ${l.objective}.\n\n` +
      `Quy tắc ngôn ngữ cốt lõi:\n` +
      `- Ngữ pháp và từ vựng luôn gắn liền với ngữ cảnh giao tiếp học thuật và đề thi xếp lớp (50 câu / 60 phút, A6).\n` +
      `- Chú ý sự hòa hợp giữa Chủ ngữ và Động từ (Subject-Verb Agreement), dạng thức của động từ theo sau các liên từ, giới từ hoặc trợ động từ.`,
    getPitfalls: (l) => `Bẫy đề thi tiếng Anh thường gặp trong ${l.code}:\n` +
      `1. Bẫy thì và trợ động từ: Quên đưa động từ chính về nguyên mẫu sau khi đã mượn trợ động từ does/did (như Does she studies... là sai).\n` +
      `2. Bẫy đại từ sở hữu vs tính từ sở hữu: Nhầm lẫn giữa her/hers, their/theirs, your/yours.\n` +
      `3. Bẫy phát âm & từ đồng âm: Nghe nhầm các số đếm âm teen (13-19) với âm ty (30-90), nhầm ký hiệu email dot (.) và hyphen (-).`,
    getMethod: (l) => `Tự luyện trong tiết: ${l.practice}.\nĐiều kiện đạt: ${l.criteria}.\n` +
      `Mẹo làm bài 60 phút: Đọc kỹ câu hỏi, gạch chân từ khóa (keywords), loại trừ nhanh 2 phương án chắc chắn sai trước khi chọn đáp án cuối cùng.`
  },
  IT: {
    getCoreTheory: (l) => `Tiết ${l.code} [${l.title}] cung cấp nền tảng: ${l.objective}.\n\n` +
      `Bản chất khoa học máy tính:\n` +
      `- Mọi dữ liệu trên máy tính đều được số hóa về bit (0 và 1) và xử lý theo các tầng trừu tượng (Hardware -> OS -> Runtime -> Application).\n` +
      `- Trong lập trình C và thuật toán: Quản lý bộ nhớ RAM chặt chẽ, tối ưu thời gian thực thi O(n) và đảm bảo tính đúng đắn của logic điều khiển.`,
    getPitfalls: (l) => `Bẫy lỗi lập trình C & CNTT kinh điển trong ${l.code}:\n` +
      `1. Lỗi toán tử gán vs so sánh: Dùng nhầm 'if (a = b)' thay vì 'if (a == b)'.\n` +
      `2. Lỗi con trỏ hoang dã (Wild pointer): Giải tham chiếu con trỏ chưa được khởi tạo (*ptr = 10) dẫn đến lỗi Segmentation Fault (Crash).\n` +
      `3. Lỗi tràn mảng & Buffer Overflow: Truy cập chỉ số vượt quá kích thước mảng (a[n] khi mảng khai báo n phần tử).\n` +
      `4. Quên dấu '&' trong hàm scanf: scanf("%d", x) thay vì scanf("%d", &x).`,
    getMethod: (l) => `Thực hành trong tiết: ${l.practice}.\nTiêu chuẩn đạt: ${l.criteria}.\n` +
      `Quy tắc debug: Chạy thử tay với các ca biên (edge cases: mảng rỗng, giá trị 0, số âm, giá trị cực đại) để đảm bảo chương trình hoạt động ổn định.`
  },
  VL: {
    getCoreTheory: (l) => `Tiết ${l.code} [${l.title}] hướng tới mục tiêu: ${l.objective}.\n\n` +
      `Bản chất vật lý đại cương:\n` +
      `- Mọi hiện tượng cơ học và nhiệt học đều tuân theo các định luật bảo toàn (Bảo toàn động lượng, Bảo toàn cơ năng, Bảo toàn năng lượng).\n` +
      `- Phân tích bài toán vật lý luôn bắt đầu bằng: Chọn hệ quy chiếu -> Xác định các lực tác dụng (vẽ hình FBD) -> Viết phương trình vector -> Chiếu lên các trục tọa độ.`,
    getPitfalls: (l) => `Bẫy lỗi phòng thi Vật lý 1 trong ${l.code}:\n` +
      `1. Lỗi đơn vị SI: Quên đổi km/h sang m/s (chia 3.6), gram sang kg, cm sang m, độ C sang Kelvin (T = t + 273.15).\n` +
      `2. Lỗi chiếu vector: Nhầm góc sin và cos khi chiếu lực lên phương chuyển động và phương vuông góc trên mặt phẳng nghiêng.\n` +
      `3. Lỗi quy ước dấu công và nhiệt lượng trong Nguyên lý I Nhiệt động lực học: Nhận nhiệt Q > 0, sinh công A < 0 (hoặc A' > 0).`,
    getMethod: (l) => `Bài tập tự luyện: ${l.practice}.\nĐiều kiện chuyển bài: ${l.criteria}.\n` +
      `Mẹo: Luôn ghi rõ đơn vị sau mỗi bước tính toán và kiểm tra tính hợp lý của kết quả theo trực giác vật lý.`
  },
  PL: {
    getCoreTheory: (l) => `Tiết ${l.code} [${l.title}] giúp bạn nắm chắc: ${l.objective}.\n\n` +
      `Bản chất pháp lý đại cương:\n` +
      `- Pháp luật là hệ thống các quy tắc xử sự chung do Nhà nước ban hành và bảo đảm thực hiện bằng quyền lực nhà nước.\n` +
      `- Hiểu rõ cơ cấu quy phạm pháp luật (Giả định - Quy định - Chế tài) và 4 yếu tố cấu thành vi phạm pháp luật (Chủ thể, Khách thể, Mặt chủ quan, Mặt khách quan).`,
    getPitfalls: (l) => `Bẫy đề thi trắc nghiệm Pháp luật trong ${l.code}:\n` +
      `1. Nhầm lẫn giữa Năng lực pháp luật (khả năng có quyền/nghĩa vụ từ khi sinh ra) và Năng lực hành vi (khả năng tự mình thực hiện dựa trên độ tuổi và khả năng nhận thức).\n` +
      `2. Đánh đồng vi phạm hành chính với tội phạm hình sự; nhầm lẫn các hình thức trách nhiệm pháp lý.\n` +
      `3. Hiểu máy móc rằng mọi điều luật đều phải chứa đủ cả 3 bộ phận Giả định, Quy định và Chế tài (trên thực tế có thể ẩn hoặc dẫn chiếu).`,
    getMethod: (l) => `Tự luyện trong tiết: ${l.practice}.\nTiêu chuẩn đạt: ${l.criteria}.\n` +
      `Phương pháp học: Học theo tình huống thực tế, phân tích từng yếu tố pháp lý cấu thành thay vì học vẹt số hiệu điều luật.`
  }
};

// Duyệt qua toàn bộ 122 bài học và hoàn thiện content
let addedCount = 0;
for (const lesson of allCurriculumLessons) {
  const code = lesson.code;
  if (!existingContent[code]) {
    const subGen = SUBJECT_KNOWLEDGE[lesson.subject] || SUBJECT_KNOWLEDGE.EN;
    existingContent[code] = {
      intro: `Tiết ${code} — ${lesson.title}. Mục tiêu: ${lesson.objective}. Chuẩn bị kỹ lưỡng theo đề cương Đại học Phenikaa K20 (GPA mục tiêu ≥ 3.60).`,
      sections: [
        {
          id: "concept",
          title: "1. Khái niệm cốt lõi & Cơ chế hoạt động",
          body: subGen.getCoreTheory(lesson)
        },
        {
          id: "pitfalls",
          title: "2. Bẫy lỗi kinh điển & Điểm trừ phòng thi",
          body: subGen.getPitfalls(lesson)
        },
        {
          id: "practice_guide",
          title: "3. Hướng dẫn tư duy & Bài tập tự luyện",
          body: subGen.getMethod(lesson)
        }
      ],
      questions: [
        {
          id: `${code}-Q1`,
          prompt: `Trong bài học [${code}] "${lesson.title}", yếu tố cốt lõi nào cần chú ý nhất để tránh mất điểm?`,
          options: [
            `Nắm vững bản chất định nghĩa, điều kiện áp dụng và kiểm tra kỹ lưỡng các bẫy lỗi`,
            `Học vẹt đáp án và bỏ qua các giả thiết ban đầu`,
            `Chỉ làm theo cảm tính mà không ghi chép các bước biến đổi trung gian`,
            `Bỏ qua các phép kiểm tra điều kiện biên và đơn vị`
          ],
          answer: 0,
          explanation: `Theo chuẩn phương pháp học tập cá nhân AGENTS.md, việc nắm vững bản chất khái niệm và nhận diện sớm các bẫy đề kinh điển là chìa khóa để đạt điểm tối đa.`
        },
        {
          id: `${code}-Q2`,
          prompt: `Khi gặp bài tập thuộc chuyên đề "${lesson.title}", bước xử lý ban đầu chuẩn xác là gì?`,
          options: [
            `Đọc kỹ đề bài, xác định mục tiêu "${lesson.objective}", sau đó chọn phương pháp giải phù hợp`,
            `Vội vàng thay số ngay mà không xem xét miền xác định hoặc quy ước dấu`,
            `Bỏ qua bước tóm tắt dữ kiện và vẽ hình/sơ đồ`,
            `Chỉ dựa vào trực giác mà không dùng công thức khoa học`
          ],
          answer: 0,
          explanation: `Phân tích dữ kiện và bám sát mục tiêu "${lesson.objective}" giúp định hướng phương pháp chính xác ngay từ đầu.`
        },
        {
          id: `${code}-Q3`,
          prompt: `Tiêu chuẩn tự đánh giá đạt yêu cầu của tiết [${code}] theo lộ trình là gì?`,
          options: [
            `${lesson.criteria || 'Đạt trên 80% câu hỏi tự luyện và tự giải thích được bản chất'}`,
            `Chỉ cần đọc lướt qua lý thuyết một lần`,
            `Làm đúng 1 câu duy nhất rồi dừng lại`,
            `Không cần kiểm tra lại kết quả`
          ],
          answer: 0,
          explanation: `Để chuyển sang bài học tiếp theo hoặc đánh dấu hoàn thành Checkpoint, bạn cần đạt: ${lesson.criteria || '≥80% tự luyện'}.`
        }
      ]
    };
    addedCount++;
  }
}

console.log(`Đã hoàn thiện ${addedCount} bài học mới. Tổng cộng có: ${Object.keys(existingContent).length} bài học chi tiết.`);

// Lưu vào app/src/data/content.json
fs.writeFileSync(contentJsonPath, JSON.stringify(existingContent, null, 2), "utf8");
console.log(`Đã lưu content vào: ${contentJsonPath}`);

// Cập nhật vào data-store.js
let dataStoreContent = fs.readFileSync(dataStorePath, "utf8");

// Tìm vị trí LESSON_CONTENT_MAP trong data-store.js
const mapMarker = "// ==================== LESSON_CONTENT_MAP ====================";
const fnMarker = "export function getLessonContent(code)";

if (dataStoreContent.includes(mapMarker)) {
  const beforeMap = dataStoreContent.split(mapMarker)[0];
  const newMapStr = `${mapMarker}\nexport const LESSON_CONTENT_MAP = ${JSON.stringify(existingContent, null, 2)};\n\n`;
  const fnStr = `export function getLessonContent(code) {
  if (LESSON_CONTENT_MAP[code]) {
    return LESSON_CONTENT_MAP[code];
  }
  const session = DEFAULT_SESSIONS.find(s => s.code === code);
  const subInfo = session ? SUBJECTS_MAP[session.subject] : null;
  return {
    intro: \`Tiết học [\${code}] - \${session ? session.title : 'Chủ đề tự học'}. Thuộc học phần \${subInfo ? subInfo.name : 'Đại học Phenikaa'}.\`,
    sections: [
      {
        id: "concept",
        title: "1. Khái niệm cốt lõi & Mục tiêu cần đạt",
        body: \`Trong tiết \${code} (\${session ? session.title : ''}), bạn cần nắm vững định nghĩa bản chất, hiểu cơ chế hoạt động và tránh các bẫy sai kinh điển.\`
      },
      {
        id: "pitfalls",
        title: "2. Bẫy lỗi thường gặp & Lưu ý",
        body: \`Các bẫy lỗi kinh điển trong chủ đề này đã được tổng hợp để bạn bôi màu highlight và hỏi Trợ lý AI GLM 5.3.\`
      }
    ],
    questions: [
      {
        id: \`\${code}-Q1\`,
        prompt: \`Mục tiêu cốt lõi của bài học [\${code}] \${session ? session.title : ''} là gì?\`,
        options: [
          \`Hiểu bản chất và vận dụng giải quyết bài toán/tình huống\`,
          \`Học vẹt công thức mà không hiểu ý nghĩa\`,
          \`Làm nhanh bỏ qua các bước kiểm tra điều kiện\`,
          \`Chỉ học để đối phó thi cử\`
        ],
        answer: 0,
        explanation: \`Phương pháp học tập K20 AI Phenikaa luôn chú trọng hiểu sâu bản chất, nắm chắc bẫy lỗi để đạt GPA ≥ 3.60.\`
      }
    ]
  };
}\n`;

  fs.writeFileSync(dataStorePath, beforeMap + newMapStr + fnStr, "utf8");
  console.log(`Đã cập nhật data-store.js thành công với ${Object.keys(existingContent).length} bài học!`);
}
