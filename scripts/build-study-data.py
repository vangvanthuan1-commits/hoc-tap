#!/usr/bin/env python3
"""Build the app's public study data from the repository, without private credentials.

Run from any directory: python scripts/build-study-data.py
The curriculum, timetable, outline, and recorded progress retain separate provenance.
Mini-lessons are authored practice, never presented as official Phenikaa exam material.
"""
from __future__ import annotations

import csv
import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'app/src/data'
PLAN = ROOT / 'ke-hoach-hoc-tap/hk1-2026/tung-tiet'

SUBJECTS = [
    dict(id='EN', name='Tiếng Anh đầu vào', shortName='Tiếng Anh', code='Đầu vào K20', credits=0,
         color='pink', icon='Languages', priority=1, target='8.5+', lessonCount=24,
         description='Nghe, từ vựng, ngữ pháp và đọc. Ưu tiên trước kỳ thi đầu vào.',
         sourceFile='tieng-anh-dau-vao.md', resourceIds=['bc-grammar', 'bc-listening', 'bc-reading']),
    dict(id='GT', name='Giải tích 1', shortName='Giải tích', code='FFS703080', credits=3,
         color='blue', icon='Sigma', priority=2, target='8.5+', lessonCount=32,
         description='Giới hạn → đạo hàm → tích phân. Tiếp tục tan và 1−cos(x).',
         sourceFile='FFS703080-giai-tich-1.md', resourceIds=['openstax-calculus']),
    dict(id='VL', name='Vật lý 1', shortName='Vật lý', code='FFS703013', credits=3,
         color='violet', icon='Atom', priority=3, target='8.0+', lessonCount=28,
         description='Vector, cơ học, nhiệt học và thực hành. Xây nền cùng Giải tích.',
         sourceFile='FFS703013-vat-ly-1.md', resourceIds=['openstax-physics']),
    dict(id='IT', name='Nhập môn Công nghệ thông tin', shortName='CNTT', code='CSE702040', credits=2,
         color='cyan', icon='Monitor', priority=4, target='9.0+', lessonCount=20,
         description='Máy tính, dữ liệu, mạng, an toàn số và tư duy thuật toán.',
         sourceFile='CSE702040-nhap-mon-cntt.md', resourceIds=['cs50', 'comp-course-sampler']),
    dict(id='PL', name='Pháp luật đại cương', shortName='Pháp luật', code='FFS702001', credits=2,
         color='rose', icon='Scale', priority=5, target='9.0+', lessonCount=18,
         description='Học khái niệm qua tình huống; đối chiếu văn bản còn hiệu lực.',
         sourceFile='FFS702001-phap-luat-dai-cuong.md', resourceIds=['legal-documents']),
]

SOURCES = [
    dict(id='repo-profile', title='Hồ sơ và checkpoint cá nhân', url='ho-so/PROFILE.md', kind='repo',
         scope='Thông tin người dùng và kết quả đã ghi; không tự suy ra đã học từ kế hoạch.'),
    dict(id='repo-outlines', title='122 tiết tự học đề xuất', url='ke-hoach-hoc-tap/hk1-2026/tung-tiet/README.md', kind='repo',
         scope='Khung tự học, chưa phải phân phối tiết hay ma trận thi chính thức.'),
    dict(id='portal-schedule', title='Cổng sinh viên — lịch cá nhân', url='https://qldtbeta.phenikaa-uni.edu.vn/congsinhvien/index.aspx#lichhoc', kind='official',
         scope='64 buổi 12/10/2026–31/01/2027, kiểm tra 07/10/2026; lịch có thể thay đổi.'),
    dict(id='portal-curriculum', title='Chương trình AI K20', url='chuong-trinh-hoc/ai-k20-2026-10-07.md', kind='repo',
         scope='78 học phần gồm nhóm lựa chọn; tổng hiển thị không phải số tín chỉ bắt buộc tốt nghiệp.'),
    dict(id='placement-notice', title='Thông báo đầu vào từ ảnh người dùng', url='ke-hoach-hoc-tap/hk1-2026/tieng-anh-dau-vao-thong-bao-tu-anh-2026-10-07.md', kind='user',
         scope='50 câu/60 phút; lịch nhóm dự kiến 17–18/10 tại A6, chưa có ca thi cá nhân.'),
    dict(id='bc-grammar', title='British Council — ngữ pháp A1/A2', url='https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2', kind='resource',
         scope='Tài nguyên nền miễn phí; không phải đề thi trường.'),
    dict(id='bc-listening', title='British Council — nghe A1', url='https://learnenglish.britishcouncil.org/free-resources/listening/a1', kind='resource',
         scope='Nghe trước khi xem transcript. Ghi riêng số lượt nghe và câu đúng.'),
    dict(id='bc-reading', title='British Council — đọc A1', url='https://learnenglish.britishcouncil.org/free-resources/reading/a1', kind='resource',
         scope='Đọc tìm bằng chứng, chú ý ngày/giờ và điều kiện trong câu hỏi.'),
    dict(id='openstax-calculus', title='OpenStax — Calculus Volume 1', url='https://openstax.org/details/books/calculus-volume-1', kind='resource',
         scope='Giáo trình nền một biến; chỉ học phần trùng đề cương lớp khi có.'),
    dict(id='openstax-physics', title='OpenStax — University Physics Volume 1', url='https://openstax.org/details/books/university-physics-volume-1', kind='resource',
         scope='Nguồn cơ học mở; không dùng để suy ra phạm vi thi FFS703013.'),
    dict(id='cs50', title='Harvard — CS50', url='https://cs50.harvard.edu/x/', kind='resource',
         scope='Kiến thức CS nền và bài tập; không phải nội dung lab chính thức CSE702040.'),
    dict(id='comp-course-sampler', title='Phenikaa — Computer Science course sampler', url='https://comp-beta.phenikaa-uni.edu.vn/undergraduate-program/computer-science/', kind='official',
         scope='Mô tả tổng quát CSE702040, chưa phải đề cương từng tiết hay rubric K20.'),
    dict(id='legal-documents', title='Cổng văn bản Chính phủ', url='https://vanban.chinhphu.vn/', kind='official',
         scope='Tra văn bản và hiệu lực trước khi áp dụng tình huống pháp luật cụ thể.'),
]


def section(key: str, title: str, body: str) -> dict:
    return dict(id=key, title=title, body=body)


def question(key: str, prompt: str, options: list[str], answer: int, explanation: str) -> dict:
    assert 0 <= answer < len(options)
    return dict(id=key, prompt=prompt, options=options, answer=answer, explanation=explanation)


def module(intro: str, sections: list[dict], questions: list[dict], challenge: str) -> dict:
    return dict(intro=intro, sections=sections, questions=questions, challenge=challenge,
                provenance='Bài học và câu hỏi tự soạn để luyện nền; không phải đề thi chính thức.',
                completionHint='Làm bài trước khi xem lời giải. Kết quả mới được ghi khi bạn nộp bài.')


CONTENT = {
    'EN02': module(
        'Bạn đã làm đúng khẳng định 4/4 và phủ định 2/2. Bài này dùng tình huống ngày thi để luyện câu hỏi, dạng rút gọn và sở hữu; chưa đánh dấu hoàn thành cả EN02.',
        [section('meaning', 'Nói bạn là ai, đang thế nào, ở đâu',
                 'To be nối chủ ngữ với danh từ, tính từ hoặc nơi chốn. I am a student. She is tired. They are at A6.\n\nGhép đúng: I → am; he/she/it và một người/vật → is; you/we/they và nhiều người/vật → are. My sister is…; my friends are…'),
         section('questions', 'Tới phòng thi: hỏi và phủ định',
                 'You are ready. → Are you ready? Đưa are lên trước chủ ngữ. They are students. → Are they students?\n\nPhủ định thêm not sau to be: I am not ready. They are not at home. Không thêm do/does vào câu hỏi dùng to be: Are you tired?\n\nTrả lời ngắn: Yes, I am. / No, I’m not. Yes, she is. / No, she isn’t.'),
         section('possessive', 'Của tôi, của cô ấy: chọn đúng vị trí',
                 'Đại từ làm chủ ngữ: I, you, he, she, it, we, they. Tính từ sở hữu đứng trước danh từ: my card, your room, his book, her phone, our class, their friends.\n\nĐại từ sở hữu thay cả cụm: This is her phone. → This phone is hers. Dùng hers khi phía sau không còn danh từ phone; her phone, không phải hers phone.\n\nRút gọn: I am → I’m; you are → you’re; she is → she’s; is not → isn’t; are not → aren’t. Trong ngữ cảnh này she’s = she is.')],
        [question('EN02-Q1', 'Ở phòng thi: “Hi, I ___ Thuận.”', ['is', 'am', 'are', 'be'], 1, 'Chủ ngữ I đi với am.'),
         question('EN02-Q2', 'Giám thị hỏi: “___ you ready?”', ['Do', 'Is', 'Are', 'Am'], 2, 'Câu hỏi với to be: Are + you + tính từ?'),
         question('EN02-Q3', 'Bạn bè vẫn ở ngoài: “They ___ in the room.”', ['isn’t', 'aren’t', 'am not', 'not are'], 1, 'They đi với are; phủ định là are not/aren’t.'),
         question('EN02-Q4', '“Mai is a student. ___ student card is blue.”', ['She', 'Hers', 'Her', 'He'], 2, 'Card là danh từ; dùng tính từ sở hữu her trước danh từ.'),
         question('EN02-Q5', '“This phone belongs to Lan. It is ___.”', ['her', 'she', 'hers', 'she’s'], 2, 'Hers thay cho her phone nên không cần danh từ phía sau.'),
         question('EN02-Q6', 'Chọn câu hỏi đúng.', ['Does he is tired?', 'Is he tired?', 'He is tired?', 'Are he tired?'], 1, 'Đưa is lên trước he, không thêm does.'),
         question('EN02-Q7', '“Are they your friends?” — “Yes, ___.”', ['they are', 'they is', 'we are', 'they do'], 0, 'Câu trả lời ngắn giữ they + are.'),
         question('EN02-Q8', '“You’re in room A6.” nghĩa là gì?', ['Your room is A6.', 'You are in room A6.', 'You were in room A6.', 'You go to room A6.'], 1, 'You’re là dạng rút gọn của you are; your nghĩa là của bạn.')],
        'Viết hội thoại 4 câu tại phòng thi: tự giới thiệu, hỏi bạn có sẵn sàng không, một câu phủ định, một câu dùng my/your. Chưa xem đáp án khi tự viết.'),
    'EN03': module(
        'Tả lịch sinh hoạt thật của bạn: hiện tại đơn nói về thói quen và sự thật, không phải hành động đang xảy ra ngay lúc này.',
        [section('habit', 'Thói quen: I study, she studies',
                 'I/you/we/they + động từ nguyên mẫu: I study English every evening. He/she/it thêm s/es: She studies English every evening.\n\nStudy → studies vì phụ âm + y; go → goes; watch → watches. Đừng viết She studying khi muốn nói một thói quen. Một số dấu hiệu thường gặp: every day, usually, often, sometimes.'),
         section('do-does', 'Do/does nhận nhiệm vụ trong câu hỏi và phủ định',
                 'Do you study at night? Does she study at night? Khi đã có does, động từ chính trở về nguyên mẫu study.\n\nI do not study at night. She does not study at night. Don’t = do not; doesn’t = does not. Sai: Does she studies? Đúng: Does she study?'),
         section('compare', 'Đừng dùng cùng một khuôn cho to be',
                 'Bạn học mỗi tối: Do you study every evening? Bạn đang mệt: Are you tired?\n\nStudy là động từ thường nên câu hỏi hiện tại đơn dùng do/does. Tired là tính từ, câu gốc You are tired dùng to be.\n\nI usually study after dinner. Với to be: I am usually at home after dinner.')],
        [question('EN03-Q1', 'She ___ English every evening.', ['study', 'studying', 'studies', 'is study'], 2, 'Thói quen, chủ ngữ she: study → studies.'),
         question('EN03-Q2', '___ you live near campus?', ['Does', 'Are', 'Is', 'Do'], 3, 'Động từ thường live, chủ ngữ you: Do you live…?'),
         question('EN03-Q3', 'Does Nam ___ to university by bus?', ['goes', 'going', 'go', 'went'], 2, 'Does mang dấu ngôi/thì, động từ go giữ nguyên mẫu.'),
         question('EN03-Q4', 'He ___ coffee in the evening.', ['don’t drink', 'doesn’t drinks', 'doesn’t drink', 'not drink'], 2, 'He + doesn’t + động từ nguyên mẫu drink.'),
         question('EN03-Q5', 'Chọn câu đúng về thói quen của bạn.', ['I usually study after dinner.', 'I studies usually after dinner.', 'I am study after dinner.', 'I studying every dinner.'], 0, 'I + study; usually đứng trước động từ thường.'),
         question('EN03-Q6', '“Does Lan work on Sundays?” — “No, ___.”', ['she isn’t', 'she doesn’t', 'she don’t', 'she not'], 1, 'Hỏi với does, trả lời ngắn bằng does/doesn’t.'),
         question('EN03-Q7', 'Câu nào hỏi “Bạn có mệt không?”', ['Do you tired?', 'Does you tired?', 'Are you tired?', 'You do tired?'], 2, 'Tired là tính từ, cần to be: Are you tired?')],
        'Viết 3 thói quen của bạn với I và 2 thói quen của một người bạn với he/she. Đổi một câu thành phủ định, một câu thành câu hỏi.'),
    'EN04': module(
        'Một ngày có thể có cả thói quen lẫn việc đang diễn ra. Hãy chọn thì theo ý câu, thay vì chỉ tìm một từ khóa.',
        [section('now', 'Camera đang quay: am/is/are + V-ing',
                 'Look! The students are playing football. Hành động đang diễn ra: chủ ngữ + am/is/are + động từ-ing. I am studying now. She is waiting outside.\n\nPhủ định: She isn’t waiting. Câu hỏi: Is she waiting? Không bỏ be và không thêm do/does.'),
         section('spelling', 'Viết dạng -ing',
                 'Play → playing; study → studying. Take → taking, bỏ e cuối. Run → running, nhân đôi n trong trường hợp từ một âm tiết có mẫu phụ âm–nguyên âm–phụ âm phù hợp.\n\nKhông áp dụng nhân đôi cho mọi từ: read → reading, không phải readding.'),
         section('contrast', 'Every evening và right now',
                 'She studies every evening. = thói quen. She is studying right now. = việc đang diễn ra.\n\nĐọc toàn câu: My friends usually take the bus, but today they are walking. Trong cùng một câu có thể dùng hai thì khác nhau.\n\nMột số động từ trạng thái như know thường dùng dạng đơn trong nghĩa nền: I know the answer, không phải I am knowing the answer.')],
        [question('EN04-Q1', 'Look! The students ___ football.', ['play', 'plays', 'are playing', 'played'], 2, 'Look! ở ngữ cảnh này chỉ hành động đang diễn ra; they are playing.'),
         question('EN04-Q2', 'I ___ for the bus right now.', ['waiting', 'am waiting', 'waits', 'am wait'], 1, 'I + am + waiting.'),
         question('EN04-Q3', 'Lan usually ___ at home, but today she ___ in the library.', ['studies / is studying', 'is studying / studies', 'study / studying', 'studying / is study'], 0, 'Usually là thói quen; today trong tình huống này là việc đang diễn ra khác thường lệ.'),
         question('EN04-Q4', 'Chọn câu hỏi đúng.', ['Do they are studying?', 'Are they studying?', 'Is they studying?', 'They studying?'], 1, 'Đảo are lên trước they.'),
         question('EN04-Q5', 'Dạng -ing đúng của take là gì?', ['takeing', 'taking', 'takking', 'taken'], 1, 'Bỏ e cuối rồi thêm ing: taking.'),
         question('EN04-Q6', '“He is not sleeping.” viết rút gọn là gì?', ['He doesn’t sleeping.', 'He not sleeping.', 'He isn’t sleeping.', 'He aren’t sleeping.'], 2, 'Is not → isn’t.'),
         question('EN04-Q7', 'Chọn câu tự nhiên khi nói bạn biết đáp án.', ['I am knowing the answer.', 'I know the answer.', 'I knowing the answer.', 'I am know the answer.'], 1, 'Know với nghĩa biết là động từ trạng thái, dùng hiện tại đơn trong câu này.')],
        'Mô tả 3 việc mọi người đang làm quanh bạn. Sau đó viết 2 thói quen để đối chiếu. Không dùng cùng thì chỉ vì hai câu có cùng chủ ngữ.'),
    'GT10': module(
        'Tiếp nối giới hạn sin bạn đã học. Hai công cụ đủ để giải nhóm tan và 1−cos(x); mọi góc trong các giới hạn này tính bằng radian.',
        [section('tan', 'Đưa tan về sin/cos',
                 'Khi u → 0: sin(u)/u → 1 và cos(u) → 1. Vì tan(u) = sin(u)/cos(u), ta có tan(u)/u = [sin(u)/u] · [1/cos(u)] → 1.\n\nVí dụ: tan(3x)/x = 3 · [sin(3x)/(3x)] · [1/cos(3x)] → 3 khi x → 0. Hệ số 3 không biến mất khi tạo mẫu 3x.'),
         section('cos', '1−cos(x): bậc hai, không phải bậc một',
                 'Dùng 1−cos(u) = 2sin²(u/2). Với x → 0: (1−cos(x))/x² = ½ · [sin(x/2)/(x/2)]² → ½.\n\nTổng quát: (1−cos(ax))/x² → a²/2. Ví dụ (1−cos(2x))/x² → 2. Đừng thay 1−cos(x) bằng x: nó có bậc x² gần 0.'),
         section('method', 'Ba bước tránh nhầm dấu và hệ số',
                 '1. Xác nhận đối số → 0 và đơn vị radian. 2. Biến đổi thành sin(u)/u; giữ hệ số ngoài. 3. Kiểm tra dấu và bậc trước kết luận.\n\nCos(x)−1 = −(1−cos(x)), nên (cos(x)−1)/x² → −½. Với (1−cos(x))/x, hãy viết [(1−cos(x))/x²] · x → 0.\n\nKhông gọi 0/0 là đáp án: đó là dạng vô định cần biến đổi.')],
        [question('GT10-Q1', 'lim khi x→0 của tan(3x)/x bằng?', ['1', '3', '1/3', '0'], 1, 'Tan(3x)/(3x)→1; nhân hệ số 3.'),
         question('GT10-Q2', 'lim khi x→0 của (1−cos(2x))/x² bằng?', ['1/2', '1', '2', '4'], 2, 'Hệ số a²/2 = 2²/2 = 2.'),
         question('GT10-Q3', 'lim khi x→0 của (cos(x)−1)/x² bằng?', ['1/2', '−1/2', '0', '1'], 1, 'Cos(x)−1 = −(1−cos(x)), đổi dấu toàn biểu thức.'),
         question('GT10-Q4', 'lim khi x→0 của (1−cos(x))/x bằng?', ['1/2', '1', '0', 'Không tồn tại'], 2, 'Viết [(1−cos(x))/x²]·x → (1/2)·0.'),
         question('GT10-Q5', 'lim khi x→0 của tan(2x)/sin(5x) bằng?', ['5/2', '2/5', '1', '0'], 1, 'Tan(2x)/(2x)→1 và sin(5x)/(5x)→1; giữ hệ số 2/5.'),
         question('GT10-Q6', 'lim khi x→0 của (1−cos(3x))/(1−cos(2x)) bằng?', ['3/2', '2/3', '9/4', '4/9'], 2, 'Tử có hệ số 9x²/2, mẫu 4x²/2, tỉ số 9/4.'),
         question('GT10-Q7', 'Điều kiện nào cần để dùng sin(u)/u → 1?', ['u→0, góc tính bằng radian', 'u→∞', 'Góc luôn tính bằng độ', 'Mẫu u phải bằng 0'], 0, 'Giới hạn chuẩn áp dụng khi u→0 theo radian; không thế mẫu thành 0 rồi chia.')],
        'Tự giải và trình bày phép đổi: tan(4x)/(3x); (1−cos(5x))/(2x²); (cos(2x)−1)/(1−cos(x)) khi x→0. Ghi lý do và kiểm tra dấu trước đáp án.'),
    'VL02': module(
        'Vector có cả độ lớn lẫn hướng. Vẽ trục và ghi góc trước khi tính sẽ giảm rất nhiều lỗi sin/cos.',
        [section('components', 'Tách một mũi tên thành hai thành phần',
                 'Nếu vector F có góc θ đo từ trục +x, thì Fx = F·cosθ, Fy = F·sinθ. Nếu góc đo từ trục y, cách dùng sin/cos đổi tương ứng.\n\nVector 10 N nghiêng 30° trên trục +x: Fx = 5√3 N ≈ 8.66 N; Fy = 5 N. Thành phần có dấu theo chiều trục.'),
         section('addition', 'Cộng theo trục, không cộng độ lớn máy móc',
                 'A = (3, 4) và B = (−1, 2) thì A+B = (2, 6). Độ lớn của A là √(3²+4²) = 5.\n\nHai lực 3 N sang phải và 4 N lên trên có hợp lực 5 N; không phải 7 N. Chỉ cộng độ lớn trực tiếp khi cùng phương cùng chiều.'),
         section('signs', 'Dấu âm nói về hướng',
                 'Chọn +x sang phải. Vector 8 N sang trái có Fx = −8 N, độ lớn vẫn là 8 N. Độ lớn không âm.\n\nKhi giải vật lý: vẽ trục, viết từng thành phần, cộng theo trục, cuối cùng mới tính độ lớn và hướng. Cùng một vector có thể có thành phần khác khi đổi hệ trục.')],
        [question('VL02-Q1', 'Vector có thành phần (3,4) có độ lớn bao nhiêu?', ['7', '1', '5', '25'], 2, '√(3²+4²) = 5.'),
         question('VL02-Q2', 'Lực 10 N hợp góc 30° với +x; Fy bằng?', ['10 N', '5 N', '5√3 N', '0 N'], 1, 'Fy = F sin30° = 5 N.'),
         question('VL02-Q3', 'Chọn +x sang phải. Lực 8 N sang trái có Fx bằng?', ['8 N', '−8 N', '0 N', 'Không xác định'], 1, 'Dấu âm biểu thị hướng ngược chiều +x.'),
         question('VL02-Q4', 'A=(3,4), B=(−1,2). A+B bằng?', ['(2,6)', '(4,2)', '(−3,8)', '(2,2)'], 0, 'Cộng từng thành phần tương ứng.'),
         question('VL02-Q5', 'Hai lực vuông góc 3 N và 4 N có hợp lực độ lớn?', ['1 N', '7 N', '12 N', '5 N'], 3, 'Dùng định lý Pythagoras vì hai thành phần vuông góc.'),
         question('VL02-Q6', 'Nếu góc θ được đo từ +x, công thức Fx là?', ['F sinθ', 'F cosθ', 'F tanθ', 'F/θ'], 1, 'Thành phần kề góc dùng cos; luôn kiểm tra góc đo từ trục nào.')],
        'Vẽ hai lực: 6 N sang phải, 8 N lên trên. Tìm thành phần hợp lực, độ lớn, rồi mô tả hướng. Viết đơn vị ở mọi kết quả.'),
    'VL07': module(
        'Newton bắt đầu bằng việc chọn đúng vật khảo sát. Một sơ đồ lực sạch thường quan trọng hơn việc nhớ thêm công thức.',
        [section('laws', 'Tổng lực quyết định gia tốc',
                 'Định luật I: trong hệ quy chiếu quán tính, tổng lực bằng 0 thì vật giữ vận tốc không đổi, kể cả đứng yên. Định luật II: tổng vector lực = m·vector gia tốc.\n\nTổng lực 10 N tác dụng vật 2 kg cho gia tốc 5 m/s² theo hướng tổng lực. Một lực riêng lẻ bằng 0 không có nghĩa tổng lực bằng 0.'),
         section('fbd', 'Vẽ các lực tác dụng lên một vật',
                 'Cô lập vật bằng điểm hoặc hình hộp. Vẽ trọng lực mg; phản lực của mặt tiếp xúc; lực căng khi có dây; lực đẩy/kéo, ma sát khi có tương tác. Không vẽ vận tốc như một lực.\n\nVật nằm trên bàn ngang, không có lực theo phương thẳng đứng khác và không gia tốc thẳng đứng: N−mg=0. N=mg chỉ đúng theo những giả thiết đó, không đúng mọi trường hợp.'),
         section('third-law', 'Lực–phản lực tác dụng lên hai vật khác nhau',
                 'Tay đẩy tường: tay tác dụng lực lên tường và tường tác dụng lực lên tay. Hai lực cùng độ lớn, ngược hướng, đặt trên hai vật khác nhau.\n\nKhông đặt cả cặp này vào sơ đồ của tay rồi nói chúng triệt tiêu. Trọng lực tác dụng lên sách và phản lực bàn lên sách không phải một cặp lực–phản lực.')],
        [question('VL07-Q1', 'Vật 2 kg có tổng lực 10 N. Gia tốc bằng?', ['20 m/s²', '5 m/s²', '0.2 m/s²', '12 m/s²'], 1, 'a = F/m = 10/2 = 5 m/s².'),
         question('VL07-Q2', 'Tổng lực bằng 0 trong hệ quy chiếu quán tính. Vật có thể?', ['Chỉ đứng yên', 'Chỉ chuyển động tròn', 'Chuyển động với vận tốc không đổi', 'Luôn tăng tốc'], 2, 'Tổng lực 0 → gia tốc 0, vận tốc không đổi; đứng yên là trường hợp vận tốc 0.'),
         question('VL07-Q3', 'Cặp lực–phản lực tác dụng lên?', ['Cùng một vật', 'Hai vật khác nhau', 'Chỉ một vật có khối lượng lớn', 'Không vật nào'], 1, 'Hai lực thuộc cùng tương tác nhưng đặt trên hai vật khác nhau.'),
         question('VL07-Q4', 'Mũi tên nào không nên coi là lực trong sơ đồ lực?', ['Trọng lực', 'Lực căng dây', 'Vận tốc', 'Lực ma sát'], 2, 'Vận tốc mô tả chuyển động, không phải lực.'),
         question('VL07-Q5', 'Vật nằm yên trên bàn ngang, chỉ có trọng lực và phản lực. Kết luận?', ['N=0', 'N=mg', 'N=2mg', 'N luôn lớn hơn mg'], 1, 'Không gia tốc đứng và chỉ hai lực đứng: N−mg=0.'),
         question('VL07-Q6', 'Hai lực ngang 12 N sang phải và 4 N sang trái, vật 2 kg. Gia tốc?', ['8 m/s² sang phải', '4 m/s² sang phải', '4 m/s² sang trái', '0'], 1, 'Chọn phải dương: tổng lực 12−4=8 N; a=8/2=4 m/s².')],
        'Vẽ sơ đồ lực một cuốn sách nằm trên bàn và một vật treo bằng dây. Với mỗi lực, ghi rõ vật nào tác dụng lên vật khảo sát.'),
    'IT02': module(
        'Máy tính biểu diễn dữ liệu bằng bit. Hiểu hệ đếm giúp bạn đọc dung lượng, mã và cách lưu dữ liệu thay vì chỉ nhớ thuật ngữ.',
        [section('bits', 'Bit, byte và số trạng thái',
                 'Một bit nhận 0 hoặc 1. Một byte gồm 8 bit. n bit có 2ⁿ tổ hợp; 8 bit có 256 tổ hợp. Số nguyên không dấu 8 bit biểu diễn 0 đến 255.\n\nBit và byte khác nhau: ký hiệu b thường là bit, B là byte. Tốc độ 8 Mb/s tương đương 1 MB/s về mặt lý thuyết trước chi phí giao thức.'),
         section('binary', 'Đọc số nhị phân theo giá trị vị trí',
                 'Các vị trí từ phải sang trái có trọng số 1,2,4,8,16,… Ví dụ 1011₂ = 1·8 + 0·4 + 1·2 + 1·1 = 11₁₀.\n\nĐổi 13 sang nhị phân: 13 = 8+4+1 nên 1101₂. Hệ 16 dùng 0–9 và A–F; một chữ số hex tương ứng 4 bit. A₁₆ = 10₁₀, F₁₆ = 15₁₀.'),
         section('units', 'MB và MiB: kiểm tra quy ước',
                 'Theo đơn vị thập phân, 1 kB=1000 B; 1 MB=1,000,000 B. Đơn vị nhị phân: 1 KiB=1024 B; 1 MiB=1,048,576 B.\n\nĐề dùng KB không nói quy ước có thể mơ hồ. Ghi giả thiết và xem slide/đề lớp đang dùng 1000 hay 1024. Đừng tự đổi tên MiB thành MB trong phép tính.')],
        [question('IT02-Q1', 'Một byte có bao nhiêu bit?', ['2', '4', '8', '16'], 2, 'Theo định nghĩa hiện dùng, 1 byte = 8 bit.'),
         question('IT02-Q2', '1011₂ bằng bao nhiêu trong hệ 10?', ['9', '11', '13', '1011'], 1, '8+0+2+1=11.'),
         question('IT02-Q3', '13₁₀ viết trong hệ 2 là?', ['1010', '1011', '1101', '1110'], 2, '13=8+4+1, tương ứng 1101.'),
         question('IT02-Q4', 'Một số không dấu 8 bit có giá trị lớn nhất?', ['8', '128', '255', '256'], 2, 'Có 256 giá trị từ 0 đến 255.'),
         question('IT02-Q5', '1 KiB bằng?', ['1000 B', '1024 B', '1024 bit', '1000 bit'], 1, 'KiB là đơn vị nhị phân 2¹⁰ B.'),
         question('IT02-Q6', 'A trong hệ 16 có giá trị hệ 10 là?', ['8', '9', '10', '16'], 2, 'Sau 9 là A=10, B=11,…F=15.'),
         question('IT02-Q7', '8 Mb/s tương đương lý thuyết bao nhiêu MB/s?', ['1', '8', '16', '64'], 0, 'Chia 8 bit/byte: 8 Mb/s = 1 MB/s, chưa trừ chi phí truyền.')],
        'Đổi 19₁₀ sang nhị phân, đổi 11100₂ sang thập phân. Tính số byte của 2 MiB rồi giải thích tại sao khác 2 MB.'),
    'IT03': module(
        'Cùng một dữ liệu có nhiều cách mã hóa. Hãy tách nội dung khỏi cách biểu diễn và luôn ghi giả thiết khi tính dung lượng.',
        [section('text', 'Ký tự không luôn là một byte',
                 'Unicode gán mã cho ký tự; UTF-8 là một cách mã hóa Unicode thành byte. Chữ ASCII như A dùng 1 byte UTF-8; nhiều chữ tiếng Việt cần nhiều byte.\n\nĐộ dài chuỗi theo ký tự và theo byte có thể khác. Emoji có thể gồm nhiều code point; không nên mặc định một hình thấy trên màn hình tương ứng đúng một đơn vị lưu trữ.'),
         section('image', 'Ảnh chưa nén: pixel × bit mỗi pixel',
                 'Ảnh RGB 24 bit dùng 8 bit cho mỗi kênh đỏ, lục, lam: 3 byte/pixel nếu không thêm alpha. Ảnh 100×100 RGB24 chưa nén có dữ liệu pixel 100·100·3=30,000 byte.\n\nCông thức này bỏ qua header, metadata và nén. File PNG/JPEG thật không nhất thiết có cùng dung lượng; không lấy công thức raw làm kích thước chính xác của file nén.'),
         section('audio', 'Âm thanh lấy mẫu',
                 'Với PCM chưa nén: dung lượng bit = số mẫu/giây × bit/mẫu × số kênh × thời gian giây.\n\nVí dụ mono 8000 Hz, 16 bit, 1 giây: 128,000 bit = 16,000 byte dữ liệu mẫu. Stereo có 2 kênh nên gấp đôi nếu mọi thông số khác giữ nguyên.')],
        [question('IT03-Q1', 'Điều nào đúng về UTF-8?', ['Mọi ký tự đúng 1 byte', 'Mọi ký tự đúng 8 byte', 'Số byte có thể khác theo ký tự', 'Không mã hóa tiếng Việt'], 2, 'UTF-8 dùng độ dài biến đổi theo code point; không mặc định 1 byte/ký tự.'),
         question('IT03-Q2', 'RGB 24 bit không có alpha dùng bao nhiêu byte/pixel?', ['1', '2', '3', '24'], 2, '24 bit / 8 = 3 byte.'),
         question('IT03-Q3', 'Ảnh raw 100×100 RGB24, bỏ header, có bao nhiêu byte pixel?', ['10,000', '30,000', '80,000', '240,000'], 1, '100×100×3=30,000 B.'),
         question('IT03-Q4', 'Tại sao file JPEG có thể nhỏ hơn dữ liệu RGB raw?', ['JPEG không có pixel', 'JPEG luôn chỉ có trắng đen', 'JPEG áp dụng nén', 'JPEG không lưu trong máy tính'], 2, 'Nén làm cách lưu và dung lượng khác raw.'),
         question('IT03-Q5', 'PCM mono 8000 Hz, 16 bit, dài 1 giây, bỏ header: bao nhiêu byte?', ['8000', '16,000', '128,000', '256,000'], 1, '8000×16×1×1 / 8=16,000 B.'),
         question('IT03-Q6', 'Đổi mono thành stereo, mọi thông số khác giữ nguyên. Dữ liệu PCM raw?', ['Giảm một nửa', 'Giữ nguyên', 'Gấp đôi', 'Gấp 8'], 2, 'Số kênh từ1 lên2 nên dung lượng dữ liệu mẫu gấp đôi.')],
        'Tính dữ liệu pixel ảnh 320×240 RGB24 chưa nén. Nêu ít nhất hai lý do khiến dung lượng file ảnh thực tế khác kết quả này.'),
    'IT04': module(
        'Hình dung bạn mở một file ghi chú: SSD giữ file, RAM giữ dữ liệu đang dùng, CPU thực thi lệnh, hệ điều hành điều phối.',
        [section('cpu', 'CPU thực thi lệnh',
                 'CPU lấy lệnh, giải mã rồi thực thi. Thanh ghi nằm trong CPU để giữ dữ liệu/lệnh cần tức thời; cache giữ dữ liệu thường dùng nhằm giảm thời gian truy cập bộ nhớ.\n\nTốc độ không chỉ do GHz. Kiến trúc, số lõi, loại công việc, bộ nhớ và cách chương trình dùng tài nguyên đều ảnh hưởng.'),
         section('memory', 'RAM khác SSD',
                 'RAM là bộ nhớ làm việc, thường mất dữ liệu khi tắt nguồn. SSD là bộ lưu trữ giữ file qua lần khởi động. Thêm dung lượng SSD không tự đồng nghĩa thêm RAM.\n\nKhi mở ứng dụng, hệ điều hành nạp phần cần thiết từ bộ lưu trữ vào RAM; CPU làm việc qua hệ bộ nhớ. Dữ liệu chỉnh sửa cần được lưu để giữ bản cập nhật.'),
         section('flow', 'Một thao tác học: mở → sửa → lưu',
                 'Mở bài ghi chú: file nằm trên SSD hoặc tải qua mạng; dữ liệu được đưa vào bộ nhớ làm việc. Gõ chữ: ứng dụng và CPU xử lý, dữ liệu thay đổi trong phiên. Bấm lưu: ghi ra bộ lưu trữ hoặc dịch vụ cloud.\n\nTrong web app, lưu trên máy và đồng bộ cloud là hai việc khác nhau. Phải xem trạng thái đồng bộ trước khi đổi thiết bị.')],
        [question('IT04-Q1', 'Thành phần chủ yếu thực thi lệnh chương trình?', ['SSD', 'CPU', 'Màn hình', 'Bàn phím'], 1, 'CPU thực thi lệnh; các phần khác giữ dữ liệu hoặc nhập/xuất.'),
         question('IT04-Q2', 'Bộ nhớ nào thường mất dữ liệu khi tắt nguồn?', ['SSD', 'Ổ cứng', 'RAM', 'USB lưu trữ'], 2, 'RAM thường là bộ nhớ khả biến.'),
         question('IT04-Q3', 'Cache có vai trò chính?', ['Thay mọi file trên SSD', 'Lưu dữ liệu thường dùng gần CPU để truy cập nhanh', 'Tăng kích thước màn hình', 'Thay hệ điều hành'], 1, 'Cache giảm thời gian truy cập dữ liệu/lệnh thường dùng.'),
         question('IT04-Q4', 'Thêm SSD 1 TB có tự làm RAM tăng 1 TB không?', ['Có', 'Không', 'Chỉ khi có Wi-Fi', 'Chỉ khi pin đầy'], 1, 'RAM và dung lượng bộ lưu trữ là hai tài nguyên khác nhau.'),
         question('IT04-Q5', 'Bạn sửa file nhưng chưa lưu, ứng dụng đóng bất ngờ. Kết luận chắc chắn nào đúng?', ['Mọi sửa đổi luôn còn trên SSD', 'Phần chưa lưu có thể mất', 'CPU giữ lại mãi', 'RAM không bao giờ mất dữ liệu'], 1, 'Sửa đổi chưa lưu có thể chỉ tồn tại trong phiên; một số ứng dụng có tự lưu nhưng không được mặc định.'),
         question('IT04-Q6', 'Có thể kết luận CPU A nhanh hơn CPU B chỉ vì GHz cao hơn?', ['Luôn đúng', 'Không, còn tùy kiến trúc và loại công việc', 'Chỉ nhìn tên hãng là đủ', 'Chỉ nhìn màu CPU là đủ'], 1, 'GHz không mô tả toàn bộ hiệu suất.')],
        'Vẽ đường đi của dữ liệu khi bạn mở ảnh, chỉnh sửa và lưu lại. Ghi vai trò SSD, RAM, CPU và ứng dụng ở từng bước.'),
    'IT19': module(
        'Bài giảng cũ cùng mã CSE702040 có chủ đề chuyển đổi số. Nội dung dưới đây là tình huống tự luyện, chưa xác nhận là yêu cầu bài nhóm hay câu thi lớp bạn.',
        [section('levels', 'Số hóa dữ liệu và đổi quy trình',
                 'Số hóa: chuyển giấy sang dữ liệu số, ví dụ quét phiếu đăng ký thành PDF. Ứng dụng công nghệ vào quy trình: dùng biểu mẫu online để nhận dữ liệu, kiểm tra và chuyển bước.\n\nChuyển đổi số rộng hơn: đổi cách tổ chức hoạt động dựa trên dữ liệu/công nghệ để tạo giá trị, có thể cần đổi quy trình, vai trò và cách đo hiệu quả. Chỉ quét giấy rồi xử lý thủ công như cũ chưa đủ để chứng minh chuyển đổi toàn diện.'),
         section('registration', 'Thiết kế đăng ký môn học trước và sau',
                 'Trước: sinh viên viết phiếu, nhân viên nhập lại, phát hiện trùng lịch muộn. Sau: biểu mẫu kiểm tra điều kiện môn và trùng lịch, thông báo chỗ còn, lưu lịch sử thay đổi.\n\nĐặt mục tiêu cụ thể: giảm thời gian xử lý, giảm lỗi nhập, minh bạch trạng thái. Xác định ai hưởng lợi, ai cần tập huấn và ai xử lý ngoại lệ.'),
         section('evaluation', 'Đo hiệu quả và nhìn rủi ro',
                 'Chọn chỉ số gắn mục tiêu: thời gian từ nộp tới duyệt; tỷ lệ hồ sơ phải nhập lại; tỷ lệ đăng ký lỗi. So sánh trước/sau với dữ liệu tương đương.\n\nRủi ro cần thiết kế xử lý: lộ dữ liệu cá nhân, sai quyền, người dùng khó tiếp cận, hệ thống lỗi giờ cao điểm. Một công nghệ mới không tự bảo đảm quy trình tốt hơn; AI cần kiểm chứng đầu ra.')],
        [question('IT19-Q1', 'Quét phiếu giấy thành PDF chủ yếu là?', ['Số hóa dữ liệu', 'Bảo đảm đổi toàn bộ mô hình vận hành', 'Tự động loại mọi lỗi', 'Thay hoàn toàn con người'], 0, 'Đây là chuyển dữ liệu từ giấy sang dạng số; quy trình có thể vẫn như cũ.'),
         question('IT19-Q2', 'Mục tiêu giảm thời gian duyệt nên đo bằng?', ['Màu giao diện', 'Số logo', 'Thời gian từ nộp đến duyệt', 'Số quảng cáo'], 2, 'Chỉ số phải gắn trực tiếp với mục tiêu.'),
         question('IT19-Q3', 'Biểu mẫu online kiểm tra trùng lịch đem lợi ích trực tiếp nào?', ['Không cần bảo vệ dữ liệu', 'Giảm đăng ký có xung đột thời gian', 'Luôn thay giảng viên', 'Không cần kiểm tra điều kiện môn'], 1, 'Kiểm tra trùng lịch giúp phát hiện xung đột; không loại bỏ mọi yêu cầu khác.'),
         question('IT19-Q4', 'Điều nào cần làm khi thay quy trình bằng phần mềm?', ['Chỉ mua phần mềm', 'Bỏ qua người dùng', 'Thiết kế quy trình, trách nhiệm và hỗ trợ ngoại lệ', 'Không cần đo kết quả'], 2, 'Công nghệ phải gắn quy trình và người thực hiện.'),
         question('IT19-Q5', 'Rủi ro của hệ thống lưu hồ sơ cá nhân?', ['Dữ liệu có thể bị truy cập sai quyền', 'Không có rủi ro nếu có logo đẹp', 'Mọi người đều phải thấy mọi hồ sơ', 'Không cần sao lưu'], 0, 'Phân quyền và bảo vệ dữ liệu là yêu cầu thực tế.'),
         question('IT19-Q6', 'AI đề xuất môn học. Cách sử dụng phù hợp?', ['Tin mọi gợi ý', 'Bỏ điều kiện tiên quyết', 'Kiểm tra với CTĐT và lịch thực tế', 'Chỉ chọn môn có tên ngắn'], 2, 'Đầu ra AI cần đối chiếu dữ liệu chương trình và ràng buộc thực tế.')],
        'Chọn một việc học của bạn đang mất thời gian. Mô tả trước/sau, công cụ, người sử dụng, hai rủi ro và một chỉ số để đo cải thiện.'),
    'PL05': module(
        'Quy phạm pháp luật là quy tắc xử sự chung. Bài này dùng ví dụ tự tạo để học cấu trúc, không trích điều luật hay mức phạt thật.',
        [section('norm', 'Quy tắc chung khác xử lý một vụ việc',
                 'Quy phạm pháp luật đưa ra cách xử sự cho một nhóm trường hợp, do chủ thể có thẩm quyền ban hành hoặc thừa nhận và được Nhà nước bảo đảm thực hiện.\n\nMột quyết định áp dụng cho cá nhân/vụ cụ thể khác với quy tắc chung. Đừng gọi mọi văn bản của cơ quan nhà nước là văn bản quy phạm chỉ vì văn bản có con dấu.'),
         section('structure', 'Giả định, quy định, chế tài',
                 'Giả định nêu ai và hoàn cảnh nào. Quy định nêu được làm, phải làm hoặc không được làm gì. Chế tài nêu hậu quả pháp lý khi vi phạm.\n\nVí dụ tự tạo: “Người sử dụng phòng thí nghiệm [hoàn cảnh/chủ thể] phải đeo thiết bị bảo hộ [xử sự]. Vi phạm bị xử lý theo nội quy áp dụng [hậu quả]”. Đây chỉ là mô hình nhận diện; nội quy ví dụ không mặc nhiên là quy phạm pháp luật.'),
         section('reading', 'Không ép một điều luật có đủ ba phần',
                 'Một quy phạm có thể được thể hiện qua nhiều điều hoặc nhiều văn bản; một điều có thể chứa nhiều quy tắc. Tìm cấu trúc theo nội dung và liên hệ văn bản, không chỉ theo dấu chấm.\n\nKhi làm bài: xác định chủ thể/hoàn cảnh, tìm cách xử sự, tìm hậu quả nếu có. Nếu chưa thấy chế tài, ghi chưa thấy trong trích đoạn, không tự bịa mức phạt.')],
        [question('PL05-Q1', 'Giả định của quy phạm thường xác định?', ['Ai, trong hoàn cảnh nào', 'Màu con dấu', 'Tên người đánh máy', 'Số trang tài liệu'], 0, 'Giả định nêu chủ thể, điều kiện hoặc hoàn cảnh áp dụng.'),
         question('PL05-Q2', 'Phần nêu phải làm/được làm/không được làm là?', ['Giả định', 'Quy định', 'Chế tài', 'Mục lục'], 1, 'Quy định là cách xử sự.'),
         question('PL05-Q3', 'Phần nêu hậu quả pháp lý khi vi phạm là?', ['Chế tài', 'Tiêu đề', 'Giả định', 'Lời cảm ơn'], 0, 'Chế tài nói đến hậu quả pháp lý đối với vi phạm.'),
         question('PL05-Q4', 'Mọi điều luật có bắt buộc thể hiện đủ ba phần ngay trong cùng điều?', ['Có', 'Không', 'Chỉ nếu điều ngắn', 'Chỉ nếu có số thứ tự'], 1, 'Các bộ phận có thể nằm ở nhiều điều/văn bản.'),
         question('PL05-Q5', 'Quyết định xử lý một vụ cụ thể có tự trở thành quy tắc xử sự chung?', ['Luôn có', 'Không tự động', 'Có nếu được in màu', 'Có nếu dài 10 trang'], 1, 'Phân biệt quy phạm chung với quyết định áp dụng cho vụ việc.'),
         question('PL05-Q6', 'Trích đoạn không nêu mức phạt. Bạn nên?', ['Tự đoán một con số', 'Dùng mức phạt bất kỳ từ đề cũ', 'Ghi chưa thấy chế tài và tra phần liên quan', 'Kết luận không bao giờ có chế tài'], 2, 'Không suy luận quá trích đoạn; phải đối chiếu văn bản liên quan và hiệu lực.')],
        'Chọn một điều trong tài liệu lớp. Gạch riêng chủ thể/hoàn cảnh và cách xử sự. Nếu thiếu chế tài, ghi điều cần tra thêm; không tự bổ sung mức phạt.'),
    'PL09': module(
        'Bốn nhóm trách nhiệm thường gặp cần phân biệt bằng loại quan hệ và căn cứ. Các tình huống dưới đây chỉ minh họa, không kết luận tội danh hoặc mức xử phạt thật.',
        [section('types', 'Bốn nhóm trong bài nhập môn',
                 'Hình sự gắn với hành vi bị luật hình sự quy định là tội phạm. Hành chính gắn với vi phạm hành chính theo căn cứ luật định. Dân sự gắn với nghĩa vụ dân sự như thực hiện hợp đồng, bồi thường thiệt hại khi đủ điều kiện. Kỷ luật gắn với vi phạm nghĩa vụ/quy tắc trong quan hệ tổ chức, lao động… theo chế độ áp dụng.\n\nKhông phân loại chỉ theo “nặng/nhẹ”; cần xem hành vi, chủ thể, căn cứ và thẩm quyền.'),
         section('case', 'Một sự việc có thể phát sinh nhiều trách nhiệm',
                 'Một hành vi gây thiệt hại có thể đặt ra việc bồi thường và đồng thời xem xét trách nhiệm khác khi đủ căn cứ. Các loại không luôn loại trừ nhau.\n\nVí dụ tự tạo: người lao động làm hỏng tài sản. Muốn kết luận phải biết lỗi, hoàn cảnh, quan hệ và quy định áp dụng. Không mặc định mọi hư hỏng đều là tội phạm hoặc mọi vi phạm nội quy đều chỉ xử lý dân sự.'),
         section('method', 'Lập luận tình huống theo bốn câu hỏi',
                 '1. Ai thực hiện hành vi và trong quan hệ nào? 2. Hành vi cụ thể, lỗi và hậu quả là gì theo dữ kiện? 3. Quy định còn hiệu lực nào điều chỉnh, cơ quan/người nào có thẩm quyền? 4. Kết luận đến đâu đủ căn cứ, còn thiếu dữ kiện gì?\n\nCác điều kiện về tuổi, năng lực, lỗi và trách nhiệm phụ thuộc lĩnh vực. Không áp một con số tuổi duy nhất cho mọi loại trách nhiệm.')],
        [question('PL09-Q1', 'Nghĩa vụ bồi thường thiệt hại trong quan hệ dân sự thường thuộc?', ['Trách nhiệm dân sự', 'Luôn là hình sự', 'Chỉ kỷ luật', 'Không phải vấn đề pháp lý'], 0, 'Bồi thường theo căn cứ dân sự là một dạng trách nhiệm dân sự; cần đủ điều kiện theo quy định.'),
         question('PL09-Q2', 'Có thể phân biệt hình sự/hành chính chỉ bằng cảm giác “rất nặng” không?', ['Có', 'Không, phải xem căn cứ luật định', 'Chỉ nhìn số người chứng kiến', 'Chỉ nhìn ảnh trên mạng'], 1, 'Tội phạm và vi phạm hành chính có căn cứ pháp luật, không phân loại cảm tính.'),
         question('PL09-Q3', 'Một hành vi có thể phát sinh nhiều loại trách nhiệm?', ['Không bao giờ', 'Có thể, khi đủ căn cứ cho từng loại', 'Chỉ nếu người đó đồng ý', 'Chỉ ở trường học'], 1, 'Các loại trách nhiệm không luôn loại trừ nhau.'),
         question('PL09-Q4', 'Vi phạm nghĩa vụ trong quan hệ tổ chức/lao động có thể đặt ra?', ['Chỉ trách nhiệm quốc tế', 'Trách nhiệm kỷ luật theo chế độ áp dụng', 'Luôn là tội phạm', 'Không cần quy định'], 1, 'Kỷ luật gắn quan hệ và quy tắc áp dụng; cần đúng căn cứ/thẩm quyền.'),
         question('PL09-Q5', 'Đề thiếu dữ kiện về lỗi và hoàn cảnh. Cách trả lời phù hợp?', ['Kết luận chắc chắn án cụ thể', 'Ghi dữ kiện cần bổ sung và kết luận có điều kiện', 'Tự thêm dữ kiện bất lợi', 'Bỏ qua mọi quy định'], 1, 'Lập luận phải dựa trên dữ kiện; không tự tạo căn cứ.'),
         question('PL09-Q6', 'Khi dùng lời giải pháp luật từ năm trước, cần kiểm tra?', ['Màu chữ', 'Hiệu lực và thay đổi văn bản liên quan', 'Số lượt thích', 'Tên file ngắn hay dài'], 1, 'Văn bản có thể thay đổi nên phải tra hiệu lực trước áp dụng.')],
        'Lập bảng bốn nhóm trách nhiệm với: quan hệ điều chỉnh, ví dụ tự tạo, dữ kiện cần có và căn cứ cần tra. Không ghi mức phạt nếu chưa đọc văn bản còn hiệu lực.'),
}


CONTENT.update({
    'EN07': module(
        'Chuẩn bị đồ cho một ngày học: thẻ sinh viên, sách và nước. Chọn mạo từ, lượng từ theo danh từ và ý của câu.',
        [section('articles', 'A/an dựa vào âm, không chỉ chữ cái',
                 'A/an nói về một người/vật chưa xác định, đi với danh từ đếm được số ít. A book; an apple. Chọn theo âm đầu: an hour vì h không phát âm; a university vì âm đầu là /j/ như “you”.\n\nThe dùng khi người nghe biết bạn đang nói đối tượng nào: I have a book. The book is blue. Không đặt a trực tiếp trước danh từ số nhiều hoặc không đếm được: a books, a water không phù hợp trong nghĩa nền này.'),
         section('countable', 'Đếm được hay không đếm được?',
                 'Book, student, chair đếm được: one book, two books. Water, milk, homework thường không đếm được trong nghĩa nền: some water, a bottle of water, some homework.\n\nMany đi với danh từ đếm được số nhiều: many books. Much đi với không đếm được: much water. A lot of có thể dùng với cả hai: a lot of books/water.'),
         section('some-any', 'Some/any theo ngữ cảnh',
                 'Some thường dùng trong khẳng định: There is some milk. Any thường dùng trong phủ định và câu hỏi trung tính: There isn’t any milk. Is there any milk?\n\nLời mời/đề nghị có thể dùng some: Would you like some tea? Đây là xu hướng sử dụng, không phải quy tắc máy móc “mọi câu hỏi đều dùng any”.')],
        [question('EN07-Q1', 'She is ___ university student.', ['an', 'a', 'many', 'any'], 1, 'University bắt đầu bằng âm /j/, nên dùng a.'),
         question('EN07-Q2', 'The lesson lasts ___ hour.', ['a', 'an', 'many', 'some'], 1, 'Hour có h câm, âm đầu là nguyên âm nên dùng an.'),
         question('EN07-Q3', 'There isn’t ___ milk in the fridge.', ['many', 'a', 'any', 'few'], 2, 'Milk không đếm được; any phù hợp câu phủ định này.'),
         question('EN07-Q4', 'How ___ books do you have?', ['much', 'many', 'a', 'an'], 1, 'Books đếm được số nhiều nên dùng many.'),
         question('EN07-Q5', 'How ___ water do we need?', ['many', 'a', 'an', 'much'], 3, 'Water không đếm được trong câu này, dùng much.'),
         question('EN07-Q6', '“I bought a notebook. ___ notebook is pink.”', ['A', 'An', 'The', 'Any'], 2, 'Notebook đã được giới thiệu, dùng the cho cuốn đó.'),
         question('EN07-Q7', 'Lời mời tự nhiên: “Would you like ___ tea?”', ['a', 'many', 'some', 'few'], 2, 'Lời mời thường dùng some, tea không đếm được trong nghĩa này.')],
        'Viết danh sách mang đi học với a/an/some, rồi hỏi bạn ba câu dùng How many/How much. Chọn theo danh từ, không đoán theo độ dài từ.'),
    'EN09': module(
        'Lịch học là cách luyện giới từ gần nhất với bạn. Phân biệt giờ, ngày, tháng và đọc cả hai vế khi chọn liên từ.',
        [section('time', 'At giờ, on ngày, in tháng/năm',
                 'At 8 a.m.; on Monday; on 17 October; in November; in 2026. At night nhưng in the morning/afternoon/evening trong cách nói nền.\n\nNếu đã có this/next/last/every trước cụm thời gian, thường không thêm at/on/in: next Monday, every evening, this Friday.'),
         section('place', 'Nơi chốn và góc nhìn',
                 'In the classroom nhấn trong không gian phòng; on the table là trên bề mặt; at the bus stop là tại điểm dừng. Một địa điểm có thể dùng giới từ khác khi ý/góc nhìn đổi, nên đọc ngữ cảnh.\n\nĐừng mặc định tiếng Việt “ở” luôn là at. Ghi cả cụm quen thuộc và đặt một câu thật của bạn.'),
         section('connect', 'Because và although nối hai ý khác nhau',
                 'I study in the library because my room is noisy. Because giải thích nguyên nhân.\n\nAlthough I am tired, I will study for ten minutes. Although nói tương phản với điều người đọc có thể mong đợi. Trong mẫu này không thêm but ngay sau although.\n\nTrước khi chọn, hỏi: vế sau đang giải thích lý do hay thể hiện một điều trái kỳ vọng?')],
        [question('EN09-Q1', 'The exam starts ___ 8 a.m.', ['in', 'on', 'at', 'from'], 2, 'Giờ cụ thể dùng at.'),
         question('EN09-Q2', 'We have Physics ___ Monday.', ['at', 'on', 'in', 'to'], 1, 'Ngày trong tuần dùng on.'),
         question('EN09-Q3', 'Classes begin ___ November.', ['in', 'on', 'at', 'for'], 0, 'Tháng dùng in.'),
         question('EN09-Q4', 'I usually study ___ the evening.', ['on', 'at', 'in', 'to'], 2, 'Cụm nền: in the evening.'),
         question('EN09-Q5', 'I study in the library ___ my room is noisy.', ['although', 'because', 'but', 'or'], 1, 'Phòng ồn là lý do chọn thư viện.'),
         question('EN09-Q6', '___ she is tired, she still finishes her homework.', ['Because', 'And', 'Although', 'So'], 2, 'Vẫn làm xong dù mệt là quan hệ tương phản.'),
         question('EN09-Q7', 'Chọn câu đúng.', ['See you on next Monday.', 'See you at next Monday.', 'See you in next Monday.', 'See you next Monday.'], 3, 'Next Monday thường không đi cùng at/on/in.')],
        'Viết lịch ngày mai bằng ba câu có giờ/ngày/buổi. Viết thêm một câu giải thích lý do với because và một câu tương phản với although.'),
    'EN10': module(
        'Đọc nội quy phòng thi bằng can, must, should. Ba từ khác ý nhưng đều đi với động từ nguyên mẫu trong các câu nền này.',
        [section('form', 'Modal + động từ nguyên mẫu',
                 'You must bring your student card. She can answer the question. You should sleep early. Không thêm s/es hay to ngay sau can/must/should.\n\nCâu hỏi: Can you help me? Phủ định: cannot/can’t, must not/mustn’t, should not/shouldn’t.'),
         section('meaning', 'Khả năng, yêu cầu và lời khuyên',
                 'Can thường nói khả năng hoặc xin/cho phép trong ngữ cảnh: I can swim. Can I sit here? Must nêu điều bắt buộc: You must follow the instructions. Should nêu lời khuyên: You should review your notes.\n\nChọn theo ý, không chỉ theo dạng động từ. Một việc hữu ích chưa tự động trở thành yêu cầu bắt buộc.'),
         section('negative', 'Không được khác không cần',
                 'You mustn’t cheat. = bạn không được gian lận. You don’t have to bring a laptop. = bạn không cần mang laptop; không phải bị cấm mang.\n\nDon’t have to là cấu trúc mở rộng để phân biệt nghĩa. Chưa dùng câu tự luyện này làm nội quy trường; nội quy thật cần đọc thông báo chính thức.')],
        [question('EN10-Q1', 'You must ___ your student card.', ['bringing', 'to bring', 'bring', 'brings'], 2, 'Sau must dùng nguyên mẫu bring.'),
         question('EN10-Q2', 'She can ___ English.', ['speaks', 'speaking', 'to speak', 'speak'], 3, 'Sau can không thêm s/to: speak.'),
         question('EN10-Q3', '“You should sleep early.” chủ yếu diễn đạt?', ['Lời khuyên', 'Quá khứ', 'Khả năng bơi', 'Tên người'], 0, 'Should thường dùng để khuyên.'),
         question('EN10-Q4', '“You mustn’t use your phone.” nghĩa là?', ['Bạn không cần dùng điện thoại', 'Bạn không được dùng điện thoại', 'Bạn đã dùng điện thoại', 'Bạn có thể dùng điện thoại'], 1, 'Mustn’t diễn đạt cấm, không phải không cần.'),
         question('EN10-Q5', '“You don’t have to bring a laptop.” nghĩa là?', ['Bạn bị cấm mang laptop', 'Bạn buộc phải mang laptop', 'Bạn không cần mang laptop', 'Laptop đang hỏng'], 2, 'Don’t have to nghĩa không có yêu cầu bắt buộc.'),
         question('EN10-Q6', 'Câu hỏi đúng để xin giúp đỡ?', ['Do can you help me?', 'Can you help me?', 'Can you helps me?', 'You can to help me?'], 1, 'Can lên trước chủ ngữ, help giữ nguyên mẫu.')],
        'Viết ba câu cho nhóm học: một điều bạn có thể làm, một lời khuyên, một điều bắt buộc/cấm trong nội quy tự tạo. Ghi rõ đâu là ví dụ, đâu là quy định thật.'),
    'EN17': module(
        'Bạn lần đầu gặp cách đọc ký hiệu email. Phần câu hỏi ở đây luyện nhận diện bằng chữ; phần nghe thật dùng tài nguyên audio riêng và phải ghi kết quả riêng.',
        [section('symbols', 'Bộ giải mã email',
                 'Dot = dấu chấm .; at = @; hyphen hoặc dash = gạch ngang -; underscore = gạch dưới _.\n\n“Nam dot Tran at study hyphen club dot com” → nam.tran@study-club.com. Giữ tên được đọc/đánh vần, đừng tự đổi nguyen thành nguyet. Bài ký hiệu bằng chữ chưa đo khả năng nghe.'),
         section('time', 'Giờ và số: đọc quan hệ trước sau',
                 'Half past eight = 8:30. Quarter past eight = 8:15. Quarter to nine = 8:45. A.m. chỉ trước trưa, p.m. sau trưa; 12 p.m. là trưa.\n\nTrong audio, thirteen và thirty có thể dễ nhầm. Ghi số dự kiến từ câu hỏi, nghe trọng âm và kiểm tra ngữ cảnh; không đoán chỉ vì một từ trông quen.'),
         section('audio', 'Nhiệm vụ audio thật: hai lượt, chưa xem transcript',
                 'Mở British Council A1 — A voicemail message ở mục tài nguyên. Đọc câu hỏi trước, nghe tối đa hai lượt và làm Task 1 trước khi xem transcript.\n\nGhi riêng: nguồn bài, số lượt nghe, số đúng/tổng. Sau đó mở transcript, tìm đúng đoạn sai, nghe lại và ghi âm/cụm chưa nhận ra. Bạn đã có kết quả lịch sử 2/4 sau hai lượt; luyện lại cùng bài không phải lượt chẩn đoán mới độc lập. Chọn bài nghe A1 mới khi muốn đo tiến bộ.')],
        [question('EN17-Q1', 'Luyện bằng chữ: “dot” tương ứng ký hiệu nào?', ['@', '_', '.', '-'], 2, 'Dot là dấu chấm.'),
         question('EN17-Q2', 'Luyện bằng chữ: “underscore” tương ứng?', ['_', '-', '.', '@'], 0, 'Underscore là gạch dưới; hyphen/dash là gạch ngang.'),
         question('EN17-Q3', '“Mai dot Le at study hyphen club dot com” viết thành?', ['mai.le@study_club.com', 'mai_le@study-club.com', 'mai.le@study-club.com', 'mai.le.study-club@com'], 2, 'Dot→.; at→@; hyphen→-.'),
         question('EN17-Q4', '“Quarter to nine” là mấy giờ?', ['9:15', '8:45', '9:45', '8:15'], 1, 'Còn15 phút tới9giờ: 8:45.'),
         question('EN17-Q5', '“Half past eight” là?', ['8:15', '8:45', '8:30', '9:30'], 2, 'Half past là30 phút sau giờ.'),
         question('EN17-Q6', 'Cách ghi tiến độ nghe nào đúng?', ['Dùng điểm bài ký hiệu bằng chữ làm điểm nghe', 'Chỉ ghi đã mở audio', 'Ghi nguồn, số lượt nghe và số đúng audio riêng', 'Tăng điểm chẩn đoán chỉ vì đã đọc đáp án'], 2, 'Bài chữ và audio đo việc khác nhau; ghi bằng chứng thật của lượt nghe.')],
        'Làm một audio A1 thật, chưa xem transcript trước. Ghi nguồn, số lượt, điểm Task1, hai cụm nghe hụt và cách bạn sửa; không nhập điểm quiz ký hiệu thay cho điểm nghe.'),
    'EN19': module(
        'Đọc một mẩu thông báo gần việc học của bạn. Đây là đoạn tự soạn, không phải lịch thực tế hay thông báo Phenikaa.',
        [section('strategy', 'Tìm điều kiện và bằng chứng',
                 'Đọc câu hỏi, gạch từ khóa: ai, ở đâu, khi nào, vì sao. Tìm câu chứa thông tin tương ứng. Nếu hỏi riêng thứ Sáu, không lấy giờ “usually” của ngày thường.\n\nSkimming giúp nắm chủ đề; scanning giúp tìm chi tiết. Trả lời bằng thông tin trong đoạn, không thêm kiến thức ngoài hoặc đoán theo lịch của bạn.'),
         section('story', 'Reading: A change of study room',
                 'Lan and Minh are first-year students. They usually study in the library on Friday afternoons, from two to four. This Friday, the library will close at one because the staff need to prepare for an event. Lan books room B12 in the student centre instead. Their group meeting will start at three and finish at five. Minh plans to arrive at half past two to set up his laptop. Lan asks everyone to bring headphones and a student card. The group will practise English first, then review Physics. Students who cannot come can join online, but they must tell Lan before Thursday evening.'),
         section('check', 'So sánh thường lệ với lần này',
                 'Usually: học thư viện thứ Sáu2–4giờ. This Friday: thư viện đóng1giờ, nhóm đổi sangB12 và họp3–5giờ. Đừng trộn các mốc.\n\nBefore Thursday evening là hạn báo Lan, không phải giờ bắt đầu họp. Half past two là2:30, khác three là3:00. Mỗi đáp án nên trỏ được tới một câu bằng chứng.')],
        [question('EN19-Q1', 'Where do Lan and Minh usually study on Fridays?', ['Room B12', 'The library', 'A café', 'At home'], 1, 'Câu2: They usually study in the library.'),
         question('EN19-Q2', 'Why will the library close at one this Friday?', ['The students have an exam', 'The staff need to prepare for an event', 'Minh has no laptop', 'The room is too cold'], 1, 'Đoạn ghi lý do staff need to prepare for an event.'),
         question('EN19-Q3', 'Where will the group meet this Friday?', ['Room B12 in the student centre', 'The library', 'Lan’s home', 'Room A6'], 0, 'Lan books room B12 in the student centre instead.'),
         question('EN19-Q4', 'When will the group meeting start?', ['1 p.m.', '2 p.m.', '2:30 p.m.', '3 p.m.'], 3, 'Meeting will start at three;2:30 là giờ Minh tới trước.'),
         question('EN19-Q5', 'What will the group practise first?', ['Physics', 'English', 'Running', 'Computer repair'], 1, 'Practise English first, then review Physics.'),
         question('EN19-Q6', 'What must students who cannot come do?', ['Buy a laptop', 'Tell Lan before Thursday evening', 'Visit the library at one', 'Cancel all their classes'], 1, 'Có thể join online nhưng must tell Lan before Thursday evening.'),
         question('EN19-Q7', 'What time does Minh plan to arrive?', ['2 p.m.', '2:15 p.m.', '2:30 p.m.', '3 p.m.'], 2, 'Half past two=2:30, để chuẩn bị laptop.')],
        'Viết bảng hai cột “usually / this Friday” với địa điểm, giờ và hoạt động. Chỉ ra câu bằng chứng cho mỗi dòng; không lấy lịch mẫu này làm lịch học thật.'),
    'GT05': module(
        'Trước mỗi giới hạn, thử thế trực tiếp để phân loại. Một kết quả0/0 là tín hiệu cần biến đổi, không phải đáp án bằng0.',
        [section('continuity', 'Khi hàm liên tục tại điểm đang xét',
                 'Đa thức liên tục mọi nơi: lim(x²+3x) khi x→2 bằng4+6=10. Phân thức liên tục khi mẫu tại điểm xét khác0; căn liên tục trên miền phù hợp.\n\nVí dụ lim(x+1)/(x+2) khi x→1 bằng2/3. Kiểm tra mẫu trước kết luận.'),
         section('classify', 'Ba loại kết quả cần phân biệt',
                 'Số hữu hạn: thế vào ra số xác định, khi áp dụng được tính liên tục. Dạng0/0: cả tử/mẫu→0, phải biến đổi. Mẫu→0 và tử→c khác0: cần xem dấu, phía tiếp cận; không tự ghi0 hay một vô cực chung.\n\nGiới hạn của1/x tại0: phía phải→+∞, phía trái→−∞, nên giới hạn hai phía không tồn tại.'),
         section('workflow', 'Ghi một dòng phân loại trước phép giải',
                 'Viết: điểm tới đâu, miền xác định gần điểm, kết quả thế trực tiếp. Nếu0/0, chọn nhân tử/liên hợp/lượng giác theo cấu trúc.\n\nGiá trị hàm tại điểm và giới hạn là hai câu hỏi khác. Hàm có thể không xác định đúng tại điểm nhưng vẫn có giới hạn vì giới hạn xét các giá trị gần điểm đó.')],
        [question('GT05-Q1', 'lim khi x→2 của x²+3x bằng?', ['5', '8', '10', '0'], 2, 'Đa thức liên tục; thế2:4+6=10.'),
         question('GT05-Q2', 'lim khi x→1 của (x+1)/(x+2) bằng?', ['1/2', '2/3', '3/2', '0'], 1, 'Mẫu3 khác0 nên thế trực tiếp được.'),
         question('GT05-Q3', 'Thế x=1 vào (x²−1)/(x−1) cho0/0. Kết luận đúng?', ['Giới hạn chắc bằng0', 'Giới hạn chắc bằng1', 'Cần biến đổi tiếp', 'Hàm bằng0 mọi nơi'], 2, '0/0 là dạng vô định, chưa quyết định giới hạn.'),
         question('GT05-Q4', 'lim khi x→3 của √(x+1) bằng?', ['1', '2', '3', '4'], 1, 'Căn liên tục tại biểu thức4; √4=2.'),
         question('GT05-Q5', 'lim hai phía của1/x khi x→0 là?', ['0', '1', '+∞ chung cho cả hai phía', 'Không tồn tại vì hai phía khác nhau'], 3, 'Bên phải+∞, bên trái−∞, không có cùng giới hạn hai phía.'),
         question('GT05-Q6', 'Hàm không xác định tại x=a có thể có giới hạn khi x→a không?', ['Có thể', 'Không bao giờ', 'Chỉ nếu a=0', 'Chỉ với số nguyên'], 0, 'Giới hạn xét giá trị gần điểm, không bắt buộc có giá trị hàm tại điểm.')],
        'Phân loại rồi giải: lim(x²−2x+5) tại x→1; lim(x²−4)/(x−2) tại x→2; lim1/(x−2) tại x→2 từ phía phải.'),
    'GT06': module(
        'Khi tử và mẫu cùng về0, nhân tử chung có thể đang che một biểu thức đơn giản. Khử trên lân cận thủng, giữ điều kiện xác định.',
        [section('factor', 'Tách nhân tử tạo đúng mẫu',
                 'x²−a²=(x−a)(x+a). Với x→1: (x²−1)/(x−1)=x+1 khi x≠1, nên giới hạn bằng2.\n\nKhông gán x=1 vào phân thức gốc rồi chia0. Hai biểu thức bằng nhau trên vùng x≠1 gần điểm, đủ để tính giới hạn.'),
         section('cubic', 'Lập phương và tam thức',
                 'x³−a³=(x−a)(x²+ax+a²). Vì thế (x³−8)/(x−2)=x²+2x+4 với x≠2, giới hạn tại2 bằng12.\n\nTam thức x²+x−2=(x−1)(x+2). Kiểm tra bằng nhân lại trước khử để tránh nhầm dấu.'),
         section('domain', 'Khử không xóa lỗ hổng của hàm gốc',
                 '(x²−4)/(x−2)=x+2 chỉ khi x≠2. Giới hạn tại2 là4 nhưng hàm gốc vẫn chưa có giá trị tại2.\n\nKhi mẫu làx+2 và x→−2, khửx+2 thì cònx−2, giới hạn−4. Đọc dấu và điểm xét, không chọn công thức theo hình quen.')],
        [question('GT06-Q1', 'lim(x²−1)/(x−1) khi x→1 bằng?', ['0', '1', '2', 'Không tồn tại'], 2, 'Khửx−1 trên x≠1, cònx+1→2.'),
         question('GT06-Q2', 'lim(x²−9)/(x−3) khi x→3 bằng?', ['3', '6', '9', '0'], 1, 'x²−9=(x−3)(x+3), cònx+3→6.'),
         question('GT06-Q3', 'lim(x³−8)/(x−2) khi x→2 bằng?', ['4', '8', '12', '16'], 2, 'Cònx²+2x+4; thế2 được4+4+4=12.'),
         question('GT06-Q4', 'lim(x²−4)/(x+2) khi x→−2 bằng?', ['4', '−4', '2', '0'], 1, 'Khửx+2, cònx−2→−4.'),
         question('GT06-Q5', 'lim(x²+x−2)/(x−1) khi x→1 bằng?', ['1', '2', '3', '−3'], 2, 'Tử=(x−1)(x+2), cònx+2→3.'),
         question('GT06-Q6', 'Sau khi khửx−2 trong (x²−4)/(x−2), điều nào đúng?', ['Hàm gốc tự có giá trị4 tại2', 'Đẳng thức với x+2 dùng khi x≠2', 'Mọi mẫu0 đều bằng0', 'Không thể tính giới hạn'], 1, 'Khử giữ điều kiệnx≠2; giới hạn khác giá trị hàm gốc tại điểm.')],
        'Tự giải (x²−25)/(x−5) khi x→5 và (x²+3x+2)/(x+1) khi x→−1. Ghi điều kiện và nhân lại phần tách nhân tử để kiểm tra.'),
    'GT07': module(
        'Biểu thức có căn thường rút gọn nhờ nhân liên hợp. Mục tiêu là dùng(a−b)(a+b)=a²−b² để tạo nhân tử có thể khử.',
        [section('identity', 'Liên hợp biến hiệu căn thành đa thức',
                 '(√(x+1)−1)/x khi x→0 có dạng0/0. Nhân tử/mẫu với√(x+1)+1: tử thànhx, rồi khửx trên x≠0. Còn1/(√(x+1)+1)→1/2.\n\nNhân cả tử lẫn mẫu, không chỉ một phía. Giữ điều kiện căn và mẫu của hàm gốc.'),
         section('constants', 'Giữ số hạng và dấu đúng',
                 '(√(x+4)−2)/x →1/(√(x+4)+2)→1/4 tại0. Nếu tử là2−√(x+4), kết quả đổi dấu thành−1/4.\n\nVới x→4: (√x−2)/(x−4)=1/(√x+2) khi x≠4, nên giới hạn1/4.'),
         section('two-roots', 'Hiệu hai căn',
                 '(√(1+3x)−√(1+x))/x. Liên hợp là√(1+3x)+√(1+x). Tử sau nhân thành2x, khửx còn2/[√(1+3x)+√(1+x)]→1.\n\nNếu sau liên hợp vẫn0/0, đừng dừng; kiểm tra nhân tử còn lại và chọn bước tiếp theo.')],
        [question('GT07-Q1', 'Liên hợp của √(x+1)−1 là?', ['√(x+1)−1', '√(x−1)+1', '√(x+1)+1', 'x+1'], 2, 'Đổi dấu giữa hai hạng, dùng hiệu hai bình phương.'),
         question('GT07-Q2', 'lim(√(x+1)−1)/x khi x→0 bằng?', ['1', '1/2', '0', '2'], 1, 'Liên hợp rồi khửx, mẫu tiến tới2.'),
         question('GT07-Q3', 'lim(√(x+4)−2)/x khi x→0 bằng?', ['1/2', '1/4', '2', '4'], 1, 'Sau khử còn1/(√(x+4)+2)→1/4.'),
         question('GT07-Q4', 'lim(2−√(x+4))/x khi x→0 bằng?', ['1/4', '−1/4', '0', '−4'], 1, 'Tử đối dấu câu mẫu, giới hạn−1/4.'),
         question('GT07-Q5', 'lim(√(1+3x)−√(1+x))/x khi x→0 bằng?', ['1/2', '1', '2', '3'], 1, 'Tử sau liên hợp2x, mẫu căn→2, tỉ số1.'),
         question('GT07-Q6', 'Khi nhân liên hợp một phân thức, cần?', ['Chỉ nhân tử', 'Chỉ nhân mẫu', 'Nhân cả tử và mẫu cùng biểu thức hợp lệ', 'Thay mọi căn bằng0'], 2, 'Nhân cả hai giữ giá trị trên miền biểu thức hợp lệ.')],
        'Giải hai bài: (√(x+9)−3)/x tại0; (√(4+2x)−2)/x tại0. Ghi biểu thức liên hợp và điều kiện trước khử.'),
    'GT09': module(
        'Giới hạn sin bạn đã luyện được mở rộng bằng thay đối số. Radian và hệ số trướcx là hai điểm cần giữ đúng.',
        [section('core', 'Giới hạn chuẩn',
                 'Khiu→0 và góc tính bằng radian: sin(u)/u→1. Thế trực tiếp cho0/0 nên cần nhận dạng chuẩn, không kết luận0.\n\nĐối số có thể là3x, x/2,… miễn đối số→0. Phải dùng chính đối số đó ở mẫu của phần chuẩn.'),
         section('scale', 'Tạo đúng đối số ở mẫu',
                 'Sin(3x)/(2x)= (3/2)·[sin(3x)/(3x)]→3/2. Giữ hệ số3/2 ở ngoài.\n\nSin(2x)/sin(5x)= [sin(2x)/(2x)] / [sin(5x)/(5x)] ·2/5→2/5. Chuyển mỗi sin thành phần chuẩn, rồi cộng hệ số.'),
         section('powers', 'Lũy thừa và dấu',
                 'Sin²(x)/x²=[sin(x)/x]²→1. Sin(−x)/x=−sin(x)/x→−1.\n\nCác công thức này dùng quanh0. Nếu x→π, không áp trực tiếp sin(x)/x→1; xem lại điểm và đối số đang tiến tới đâu.')],
        [question('GT09-Q1', 'lim sin(x)/x khi x→0 theo radian?', ['0', '1', 'π', 'Không tồn tại'], 1, 'Giới hạn chuẩn bằng1.'),
         question('GT09-Q2', 'lim sin(3x)/(2x) khi x→0 bằng?', ['2/3', '3/2', '3', '1'], 1, 'Tạo mẫu3x và giữ hệ số3/2.'),
         question('GT09-Q3', 'lim sin(2x)/sin(5x) khi x→0 bằng?', ['5/2', '2/5', '1', '10'], 1, 'Mỗi sin đối sánh với đối số, tỉ số hệ số2/5.'),
         question('GT09-Q4', 'lim sin²(x)/x² khi x→0 bằng?', ['0', '1', '2', '−1'], 1, 'Bình phươngsin(x)/x→1².'),
         question('GT09-Q5', 'lim sin(−x)/x khi x→0 bằng?', ['1', '−1', '0', 'π'], 1, 'Sin là hàm lẻ: sin(−x)=−sin(x).'),
         question('GT09-Q6', 'Khi nào được dùng sin(u)/u→1?', ['u→0 theo radian', 'u→π bất kỳ', 'u→∞', 'Chỉ khiu=0 chính xác'], 0, 'Giới hạn xétu→0, không chia tại0; cần quy ước radian.')],
        'Giải sin(4x)/(3x), sin(x/2)/x, sin²(3x)/(2x²) tại x→0. Viết phần chuẩn và hệ số bên ngoài riêng.'),
    'GT11': module(
        'Sau sin/tan/cos, thêm hai giới hạn chuẩn mũ/log. Kiểm tra miềnlog trước khi thế và phân biệtln vớilog cơ số khác.',
        [section('exponential', 'eᵘ−1 quanh0',
                 'Khíu→0: (eᵘ−1)/u→1. Ví dụ(e²ˣ−1)/x=2·[(e²ˣ−1)/(2x)]→2.\n\nVới cơ sốa>0: (aˣ−1)/x→ln(a). Khi a=1 kết quả0. Không thayln(a) bằnga; aˣ=eˣˡⁿ⁽ᵃ⁾.'),
         section('log', 'ln(1+u) quanh0',
                 'Khíu→0 và1+u>0: ln(1+u)/u→1. Với ln(1+3x)/x, hệ số3 đi ra ngoài nên giới hạn3.\n\nMiềnx gần0 phải bảo đảm1+3x>0. Ln làlog cơ sốe;logₐ(t)=ln(t)/ln(a) vớia>0,a≠1.'),
         section('combination', 'Tỉ số hai dạng chuẩn',
                 'Ln(1+2x)/(e³ˣ−1) = [ln(1+2x)/(2x)] / [(e³ˣ−1)/(3x)] ·2/3→2/3.\n\nNếu tử làln(1−2x), đối sốu=−2x nên hệ sốâm. Không bỏ dấu khi tạo phần chuẩn. Bài này dùng giới hạn chuẩn, chưa cầnL’Hôpital.')],
        [question('GT11-Q1', 'lim(e²ˣ−1)/x khi x→0 bằng?', ['1', '2', '1/2', '0'], 1, 'Tạo đối số2x, giữ hệ số2.'),
         question('GT11-Q2', 'lim ln(1+3x)/x khi x→0 bằng?', ['1', '1/3', '3', '0'], 2, 'Ln(1+3x)/(3x)→1 nên kết quả3.'),
         question('GT11-Q3', 'lim(2ˣ−1)/x khi x→0 bằng?', ['2', '1', 'ln(2)', '0'], 2, 'Công thức cơ sốa cho ln(a), không phải a.'),
         question('GT11-Q4', 'lim ln(1−2x)/x khi x→0 bằng?', ['2', '−2', '1/2', '0'], 1, 'Đối sốu=−2x, giữ hệ số−2.'),
         question('GT11-Q5', 'lim ln(1+2x)/(e³ˣ−1) khi x→0 bằng?', ['3/2', '2/3', '1', '6'], 1, 'Tử tương ứng hệ số2, mẫu3; tỉ số2/3.'),
         question('GT11-Q6', 'Điều kiện thực của ln(1+3x) là?', ['1+3x>0', '1+3x≥0', 'x phải là số nguyên', 'x=0 duy nhất'], 0, 'Đối sốlog phải dương, không được bằng0.')],
        'Giải(e⁵ˣ−1)/(2x), ln(1+x/2)/x, (3ˣ−1)/ln(1+x) tại0. Ghi miềnlog và hệ số trước kết luận.'),
})

CONTENT['EN17']['quizLabel'] = 'Luyện ký hiệu bằng chữ'
CONTENT['EN17']['quizScope'] = 'Điểm quiz này chưa đo khả năng nghe. Làm audio thật và ghi số lượt/điểm nghe riêng.'


def read_csv(path: Path) -> list[dict]:
    with path.open(encoding='utf-8-sig', newline='') as handle:
        return list(csv.DictReader(handle))


def build() -> dict:
    lessons = []
    source_lookup = {source['id']: source for source in SOURCES}
    for subject in SUBJECTS:
        text = (PLAN / subject['sourceFile']).read_text(encoding='utf-8')
        for line in text.splitlines():
            if not re.match(r'\| (?:EN|GT|VL|IT|PL)\d{2} \|', line):
                continue
            cols = [value.strip() for value in line.strip('|').split('|')]
            lesson_id, title, objective, exercises, criteria = cols[:5]
            lessons.append(dict(
                id=lesson_id, subjectId=subject['id'], order=int(lesson_id[2:]), title=title,
                objective=objective, exercises=exercises, criteria=criteria,
                durationMinutes=60 if lesson_id in {'EN21', 'EN23'} else 45,
                outlineOnly=lesson_id not in CONTENT,
                sourcePath=str((PLAN / subject['sourceFile']).relative_to(ROOT)),
                resources=[source_lookup[key] for key in subject['resourceIds']],
                proposed=True,
            ))
    assert len(lessons) == 122, f'Expected 122 lessons; found {len(lessons)}'
    assert len({lesson['id'] for lesson in lessons}) == 122

    progress = {}
    for row in read_csv(PLAN / 'tien-do.csv'):
        state = row['Trạng thái']
        status = ('completed' if state.startswith(('Hoàn thành', 'Đã học')) else
                  'in_progress' if state.startswith('Đang học') else 'not_started')
        progress[row['Tiết']] = dict(status=status,
                                     studiedAt=row['Ngày học'] or None,
                                     result=row['Kết quả tự kiểm tra'],
                                     errors=[error.strip() for error in row['Lỗi cần ôn'].split(';') if error.strip()])
    assert set(progress) == {lesson['id'] for lesson in lessons}, 'Progress must cover the same lesson IDs'

    schedule_source = json.loads((ROOT / 'lich-hoc/2026-10-07-cac-tuan-sau.json').read_text())
    subject_by_name = {'Giải tích 1': 'GT', 'Vật lý 1': 'VL', 'Nhập môn Công nghệ thông tin': 'IT', 'Pháp luật đại cương': 'PL', 'Chạy 1': 'PE'}
    schedule = []
    for index, event in enumerate(schedule_source['events']):
        date = datetime.strptime(event['NGAYHOC'], '%d/%m/%Y').date().isoformat()
        schedule.append(dict(id=f'class-{date}-{index:03}', subjectId=subject_by_name.get(event['TENHOCPHAN'], 'OTHER'),
                             title=event['TENHOCPHAN'], date=date,
                             startTime=f"{event['GIOBATDAU']:02}:{event['PHUTBATDAU']:02}",
                             endTime=f"{event['GIOKETTHUC']:02}:{event['PHUTKETTHUC']:02}",
                             room=event['TENPHONGHOC'] or 'Chưa có phòng', teacher=event['GIANGVIEN'] or '',
                             className=event['TENLOPHOCPHAN'], kind='class', source='portal-schedule',
                             periods=f"{event['TIETBATDAU']}–{event['TIETKETTHUC']}"))
    schedule.sort(key=lambda item: (item['date'], item['startTime'], item['id']))
    assert len(schedule) == 64

    known_flags = {course['code']: bool(course['grade_flag']) for course in json.loads(
        (ROOT / 'ke-hoach-hoc-tap/hk1-2026/doi-chieu-ma-mon-2026-10-07.json').read_text())['courses']}
    curriculum = []
    for row in read_csv(ROOT / 'chuong-trinh-hoc/ai-k20-2026-10-07.csv'):
        credits = float(row['Số tín học phần'] or 0)
        curriculum.append(dict(order=int(row['STT']), code=row['Mã học phần'], name=row['Tên học phần'],
                               knowledgeBlock=row['Khối KT'], credits=int(credits) if credits.is_integer() else credits,
                               prerequisite=row['Điều kiện ràng buộc'], plannedSemester=row['Học kỳ dự kiến'],
                               actualSemester=row['Học kỳ thực tế'], lecturePeriods=float(row['LT'] or 0),
                               practicePeriods=float(row['TH'] or 0), countsForGpa=known_flags.get(row['Mã học phần'])))
    assert len(curriculum) == 78

    return dict(
        meta=dict(version=1, checkedAt='2026-10-07', timezone='Asia/Ho_Chi_Minh', lessonCount=122,
                  scheduleCheckedAt=schedule_source['checked_at'], scheduleRangeStart=schedule_source['range_start'],
                  scheduleRangeEnd=schedule_source['range_end'],
                  contentNotice=f'{len(CONTENT)} bài có nội dung và câu hỏi tự luyện. Các bài còn lại có đề cương/mục tiêu và tài nguyên; chưa có nội dung đầy đủ.',
                  outlineNotice='Đề cương tự học đề xuất; chưa phải đề cương hoặc phạm vi thi chính thức theo mã.',
                  scheduleNotice='Lịch được đọc ngày 07/10/2026. Lịch hiện tại có thể thay đổi; chưa có ca thi đầu vào cá nhân.'),
        profile=dict(name='Vàng Văn Thuận', nickname='Thuận', university='Đại học Phenikaa', cohort='K20',
                     major='Trí tuệ nhân tạo', className='ICT5-2610210.01', gpaTarget=3.6,
                     englishTarget=8.5, currentLesson='EN02', currentMathLesson='GT10',
                     englishPlacement=dict(startDate='2026-10-17', endDate='2026-10-18', location='Tòa A6',
                                           status='tentative_group_window', personalSlotKnown=False,
                                           durationMinutes=60, totalQuestions=50,
                                           sections=[dict(name='Nghe', questions=10), dict(name='Ngữ pháp', questions=15),
                                                     dict(name='Từ vựng', questions=15), dict(name='Đọc', questions=10)],
                                           exemptions=[dict(minScore=6, maxScore=8.4, courses=['Tiếng Anh 1']),
                                                       dict(minScore=8.5, maxScore=10, courses=['Tiếng Anh 1', 'Tiếng Anh 2'])],
                                           exemptionFirstAttemptOnly=True, source='placement-notice'),
                     checkpoints=[dict(subjectId='EN', text='EN01 đã chẩn đoán; EN02 đang luyện khẳng định/phủ định.'),
                                  dict(subjectId='GT', text='Đã luyện giới hạn trực tiếp, nhân tử, liên hợp, sin theo hồ sơ; chưa tự gán hoàn thành các tiết kế hoạch.'),
                                  dict(subjectId='IT', text='C đã tới chuỗi; dùng dự án/AI không đồng nghĩa đã học mọi công nghệ.'),
                                  dict(subjectId='VL', text='Chưa xác nhận bắt đầu Vật lý chính thức.'),
                                  dict(subjectId='PL', text='Chưa xác nhận bắt đầu Pháp luật chính thức.')]),
        subjects=SUBJECTS, lessons=lessons, schedule=schedule, curriculum=curriculum,
        initialProgress=progress, sources=SOURCES,
        initialReviews=[dict(id=f'EN02-review-{day}', lessonId='EN02', subjectId='EN', date=f'2026-10-{day}',
                             title='Ôn am/is/are, not và ký hiệu email', status='planned', source='recorded_review_plan')
                        for day in ['08', '10', '14']],
    )


def main() -> None:
    data = build()
    OUT.mkdir(parents=True, exist_ok=True)
    for filename, payload in [('study-data.json', data), ('content.json', CONTENT)]:
        (OUT / filename).write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"Generated {len(data['lessons'])} lessons, {len(data['schedule'])} classes, "
          f"{len(data['curriculum'])} curriculum rows; {len(CONTENT)} authored modules / "
          f"{sum(len(value['questions']) for value in CONTENT.values())} questions.")


if __name__ == '__main__':
    main()
