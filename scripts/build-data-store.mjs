import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const contentJsonPath = path.join(rootDir, "app/src/data/content.json");
const dataStorePath = path.join(rootDir, "data-store.js");

const rawContent = JSON.parse(fs.readFileSync(contentJsonPath, "utf8"));

// Bổ sung bài EN01 (Chẩn đoán 4 kỹ năng & Ký hiệu email & Ngữ pháp nền)
rawContent["EN01"] = {
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

// Đọc nội dung hiện tại của data-store.js
const currentDataStore = fs.readFileSync(dataStorePath, "utf8");

// Tách lấy phần code cơ bản (trước LESSON_CONTENT_MAP nếu đã có)
let baseDataStore = currentDataStore;
const mapMarker = "// ==================== LESSON_CONTENT_MAP ====================";
if (baseDataStore.includes(mapMarker)) {
  baseDataStore = baseDataStore.split(mapMarker)[0].trim();
}

// Xây dựng code xuất bản
const outputCode = `${baseDataStore}

${mapMarker}
export const LESSON_CONTENT_MAP = ${JSON.stringify(rawContent, null, 2)};

export function getLessonContent(code) {
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
        body: \`Trong tiết \${code} (\${session ? session.title : ''}), bạn cần nắm vững định nghĩa bản chất, hiểu cơ chế hoạt động và tránh các bẫy sai kinh điển.\\n\\nHãy đọc kỹ lý thuyết, bôi đen để highlight các từ khóa quan trọng và trao đổi với Trợ lý AI GLM 5.3 bên dưới nếu có bất kỳ điểm nào chưa rõ!\`
      },
      {
        id: "pitfalls",
        title: "2. Bẫy lỗi thường gặp & Lưu ý",
        body: \`Khi học chủ đề này, sinh viên thường mắc các lỗi:\\n- Nhầm lẫn giữa khái niệm lý thuyết và áp dụng thực tế.\\n- Quên kiểm tra điều kiện biên hoặc các ngoại lệ.\\n\\nHãy dùng thanh công cụ Highlight để tô màu [Hồng - Bẫy lỗi] và bấm 'Hỏi AI' để được phân tích chi tiết!\`
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
}
`;

fs.writeFileSync(dataStorePath, outputCode, "utf8");
console.log("data-store.js updated successfully with", Object.keys(rawContent).length, "lessons!");
