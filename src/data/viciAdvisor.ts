/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VICI Yoga Therapy - Knowledge Base & Advisory Engine
 * Upgraded: Precision Schedule Sync, Clinical Consultation, Zero Conflicts.
 */

import { queryScheduleSmart, getSessionContext } from './viciScheduleEngine';

export const VICI_CARE_SYSTEM_PROMPT = `
Bạn là "MyVici" – Trợ lý Chuyên môn và Tư vấn của Vici Yoga Therapy Center (viciyoga.vercel.app).

1. PHONG THÁI & NGUYÊN TẮC GIAO TIẾP:
- Tên gọi: Luôn xưng "MyVici" hoặc "mình", gọi khách là "bạn" hoặc "anh/chị".
- Tính cách: Thấu cảm, chuẩn mực khoa học, giải thích rõ ràng, súc tích.
- Hotline/Zalo: 036 684 0130. Địa chỉ: Căn hộ B1-0705, Chung cư Opal Boulevard, đường Phạm Văn Đồng, TP. Dĩ An (giáp TP. Thủ Đức, TP. HCM).

2. QUY TẮC SỐNG CÒN VỀ LỊCH HỌC (BẮT BUỘC TUÂN THỦ 100%):
- TUYỆT ĐỐI KHÔNG ĐƯỢC TỪ CHỐI bất kỳ lớp nào có trong Thời khóa biểu bên dưới.
- Trung tâm VICI giảng dạy ĐA DẠNG trường phái, bao gồm: Nền tảng (Newbie, Hatha), Dòng chảy thể lực (Vinyasa, Dynamic, Balance), Đốt mỡ (Detox), Trị liệu (Mở vai, Mở hông, Vặn xoắn, Cột sống), Thư giãn (Yin, Gentle, Chuông xoay), và Nâng cao/HLV.
- KHI KHÁCH HỎI LỊCH LỚP NÀO:
  + BƯỚC 1: Phải trả lời CHÍNH XÁC ngày, giờ, buổi tập của lớp đó theo bảng dữ liệu chuẩn bên dưới.
  + BƯỚC 2: Mô tả ngắn gọn lợi ích của lớp.
  + BƯỚC 3: Mời khách đăng ký/giữ chỗ tập thử hoặc hỏi xem khung giờ đó có thuận tiện với khách không.
  + TUYỆT ĐỐI KHÔNG tự ý phán xét rằng Vici "không dạy lớp này" hoặc "chỉ dạy trị liệu" để ép khách sang dịch vụ Scan 650k, trừ khi khách nói rõ họ đang bị đau bệnh lý nặng.

3. THỜI KHÓA BIỂU CHÍNH THỨC CỦA VICI (ÁP DỤNG T9/2026 - T12/2026 CHO CẢ ONLINE & OFFLINE):
Tra cứu chính xác theo bảng sau:

| Khung Giờ | Thứ 2 | Thứ 3 | Thứ 4 | Thứ 5 | Thứ 6 | Thứ 7 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **05:00 - 06:00 (Sáng sớm)** | Yoga For Newbie | Yoga For Newbie | Yoga For Newbie | Yoga For Newbie | Yoga For Newbie | (Lịch riêng) |
| **06:30 - 07:30 (Sáng)** | Yoga Stretching (Kéo giãn) | Hip Opening (Mở hông) | Shoulder & Upperback (Mở vai & lưng trên) | Twisting Yoga (Vặn xoắn) | Yoga Balance (Thăng bằng) | (Lịch riêng) |
| **08:00 - 09:00 (Sáng)** | Hatha Yoga | Vinyasa Yoga | Yin Yoga | Yoga Detox Giảm Cân | Ashtanga (Chăm sóc cột sống) | (Lịch riêng) |
| **09:00 - 12:00 (Sáng)** | Đào tạo HLV Quốc tế | — | Đào tạo HLV Quốc tế | — | Đào tạo HLV Quốc tế | (Lịch riêng) |
| **14:00 - 15:30 (Chiều T3, T5)** | — | Ashtanga Nâng Cao (10 chuyên đề Master Henry) | — | Ashtanga Nâng Cao (10 chuyên đề Master Henry) | — | (Lịch riêng) |
| **17:45 - 18:45 (Tan ca/Tối)** | Hatha Yoga | Open Shoulder (Mở vai) | Dynamic Yoga | Hip Opening (Mở hông) | Yoga Stretching (Kéo giãn) | (Lịch riêng) |
| **19:00 - 20:00 (Tối)** | Yoga For Newbie | Gentle Yoga | Yoga For Newbie | Yoga Therapy (Chuông xoay) | Yoga For Newbie | Đào tạo HLV Thầy Henry |

*Lưu ý các lớp đặc thù khi khách hỏi:*
- **Vinyasa Yoga:** Sáng Thứ 3 (08:00 – 09:00).
- **Yoga Detox Giảm Cân:** Sáng Thứ 5 (08:00 – 09:00).
- **Mở vai & Lưng trên:** Sáng Thứ 4 (06:30 – 07:30: Shoulder & Upperback) và Tối Thứ 3 (17:45 – 18:45: Open Shoulder).
- **Mở hông (Hip Opening):** Sáng Thứ 3 (06:30 – 07:30) và Chiều tối Thứ 5 (17:45 – 18:45).
- **Ashtanga:** Có 2 lựa chọn: Lớp nhóm sáng Thứ 6 (08:00 – 09:00) và Khóa chuyên sâu 10 chuyên đề chiều Thứ 3 & Thứ 5 (14:00 – 15:30).
- **Chuông xoay:** Tối Thứ 5 (19:00 – 20:00: Yoga Therapy Chuông xoay) và Workshop sáng Thứ 7.
- **Thứ 7:** Ca tối 19:00 – 20:00 là Đào tạo HLV Thầy Henry. Ban ngày là các chương trình đặt trước: Training tập trung, Nhân lực đỏ, Henry Wellness Team, Gia đình Yoga.

4. QUY TẮC GIỮ NGỮ CẢNH ĐA LƯỢT (MULTI-TURN MEMORY):
- Khi khách đang hỏi về một lớp X (ví dụ Vinyasa, Detox, Mở vai...), nếu ở câu tiếp theo khách chỉ nói thời gian rảnh (ví dụ: "Tôi rảnh buổi sáng", "Tôi rảnh buổi tối", "Sáng thứ mấy?"):
  + BẮT BUỘC kiểm tra xem lớp X đó có ca sáng/tối hay không.
  + Nếu có: Xác nhận ngay buổi học đó của lớp X.
  + Nếu không có: Thông báo rõ lớp X chỉ có ca hiện tại, sau đó mới gợi ý các lớp khác trong cùng buổi sáng/tối đó để khách lựa chọn.
  + TUYỆT ĐỐI KHÔNG tự động chuyển sang tư vấn đau bệnh hay Scan trị liệu nếu khách chưa hề than phiền về chấn thương.

5. KHI NÀO MỚI TƯ VẤN SCAN TRỊ LIỆU 1-1 (650K) & PHÁC ĐỒ BỆNH LÝ?
- CHỈ KHI khách hàng chủ động nói về triệu chứng bệnh/đau đớn (thoát vị đĩa đệm, đau nhức cổ vai gáy, đau khớp gối, tê bì chân tay, mất ngủ lâu năm...).
- Lúc này mới áp dụng cơ chế y sinh học: giải thích nguyên nhân chèn ép thần kinh, khuyên không bẻ vặn cổ hoặc uốn lưng gắt, và đề xuất buổi Scan 1-1 (45-60 phút, 650.000đ) để đo góc lệch trước khi tập.
`;

export const VICI_SYSTEM_PROMPT = VICI_CARE_SYSTEM_PROMPT;

export function getViciConsultation(message: string, sessionId: string = 'default'): string {
  const lower = (message || '').toLowerCase().trim();
  const context = getSessionContext(sessionId);

  // 0. BẮT LEAD SỐ ĐIỆN THOẠI NGAY LẬP TỨC
  const phoneRegex = /(?:(?:\+84|84|0)[1-9](?:[\s.-]?\d){8,9})/;
  const phoneMatch = message.match(phoneRegex);
  if (phoneMatch) {
    context.leadPhone = phoneMatch[0].replace(/[\s.-]/g, '');
    return `Dạ, MyVici xin chào bạn! 🙏\n\nHệ thống đã ghi nhận số điện thoại của bạn: **${context.leadPhone}**.\nChuyên viên tư vấn VICI sẽ liên hệ trực tiếp qua Zalo/Điện thoại trong vòng 5 – 10 phút để xác nhận lịch kiểm tra tầm vận động (ROM Test) và chuẩn bị buổi tập an toàn nhất cho bạn nhé!`;
  }

  // 1. TRUY VẤN LỊCH HỌC ƯU TIÊN SỐ 1 (Đảm bảo chính xác và giữ vững ngữ cảnh)
  const scheduleResponse = queryScheduleSmart(message, sessionId);
  if (scheduleResponse) {
    return scheduleResponse;
  }

  // 2. BỆNH LÝ: CỔ VAI GÁY, TÊ TAY, HỘI CHỨNG CHÉO TRÊN DÂN VĂN PHÒNG
  if (
    lower.includes('vai gáy') ||
    lower.includes('đau cổ') ||
    lower.includes('mỏi cổ') ||
    lower.includes('tê tay') ||
    lower.includes('gù lưng') ||
    lower.includes('ngồi máy tính') ||
    lower.includes('chéo trên')
  ) {
    return `Namaste bạn! Tình trạng đau mỏi Cổ - Vai - Gáy và tê bì ngón tay là dấu hiệu của **Hội chứng Chéo Trên (Upper Crossed Syndrome)** do ngồi cúi nhìn màn hình lâu, làm cơ nâng vai co rút và chèn ép dây thần kinh:

🌿 **Lời khuyên tự chăm sóc tại chỗ:**
* Thực hiện bài tập **Thu cằm (Chin Tuck)**: Ngồi thẳng, từ từ đẩy cằm thẳng ra sau tạo nếp gấp cằm đôi, giữ 5 giây rồi thả lỏng (10 lần/ngày).
* Tuyệt đối **không bẻ lắc cổ phát tiếng rắc** đột ngột vì dễ gây tổn thương đĩa đệm cổ.

🎯 **Khóa học VICI gợi ý phù hợp nhất:**
1. **01 buổi Scan Trị Liệu Cơ - Vai - Cổ - Gáy 1-1 (45-60 phút, 650.000đ):** Master Henry Phan sẽ đo biên độ khớp cổ, giải phóng điểm xoắn mạc cơ (Trigger Point) và thiết lập phác đồ riêng.
2. Tham gia lớp **Shoulder & Upperback (06:30 sáng Thứ 4)** hoặc **Open Shoulder (17:45 tối Thứ 3)**.

👉 Bạn bị đau mỏi bao lâu rồi và có bị tê lan xuống cánh tay không? Hãy để lại **Họ tên + SĐT/Zalo** để HLV VICI lên hồ sơ và xếp lịch kiểm tra cho bạn nhé!`;
  }

  // 3. BỆNH LÝ: THOÁT VỊ ĐĨA ĐỆM L4-L5, THOÁI HÓA CỘT SỐNG, ĐAU THẮT LƯNG
  if (
    lower.includes('thoát vị') ||
    lower.includes('đĩa đệm') ||
    lower.includes('l4') ||
    lower.includes('l5') ||
    lower.includes('s1') ||
    lower.includes('thắt lưng') ||
    lower.includes('đau lưng') ||
    lower.includes('cột sống') ||
    lower.includes('thoái hóa')
  ) {
    return `Namaste bạn! Người bị đau thắt lưng hay thoát vị đĩa đệm (L4-L5, L5-S1) **hoàn toàn tập Yoga được và phục hồi rất tốt**, nhưng bắt buộc phải theo phương pháp kéo giãn trục dọc an toàn:

🌿 **Nguyên tắc an toàn sống còn:**
* Ưu tiên các động tác giải áp đốt sống: *Tư thế Con Mèo - Con Bò chậm*, *Tư thế Nhân Sư (Sphinx Pose)* giúp đưa nhân nhầy về trung tính.
* **Tuyệt đối tránh:** Cúi gập người sâu kéo giật, vặn xoắn gắt khi hông chưa cố định, hoặc uốn cong lưng ra sau quá mức.

🎯 **Khóa học VICI gợi ý phù hợp nhất:**
* **Gói Trị Liệu Cá Nhân Hóa 1-1 (1.200.000đ/buổi) hoặc Gói Hội Viên Trị Liệu 3 - 6 Tháng:** Kích hoạt cơ ngang bụng để tạo "đai nẹp sinh học tự nhiên" bảo vệ đĩa đệm.

👉 Cơn đau của bạn có lan xuống mông hay cẳng chân không? Bạn vui lòng gửi **Họ tên + SĐT/Zalo** để Master Henry Phan chuẩn bị phác đồ và hẹn lịch tư vấn trực tiếp cho bạn nhé!`;
  }

  // 4. NGƯỜI MỚI BẮT ĐẦU, CƠ THỂ CỨNG, CHƯA TẬP BAO GIỜ, LỚN TUỔI
  if (
    lower.includes('mới') ||
    lower.includes('chưa tập') ||
    lower.includes('cơ bản') ||
    lower.includes('cứng') ||
    lower.includes('50 tuổi') ||
    lower.includes('60 tuổi') ||
    lower.includes('lớn tuổi') ||
    lower.includes('bắt đầu')
  ) {
    return `Namaste bạn! Tại VICI, triết lý của Master Henry Phan là: **"Chính vì cơ thể chưa dẻo nên chúng ta mới cần đến Yoga để được mềm mại, giải tỏa áp lực và trẻ hóa xương khớp!"**

🌿 **Ưu tiên cho người mới tại VICI:**
* Không có sự so sánh: Lớp tập trang bị đầy đủ dụng cụ hỗ trợ (gạch xốp, dây đai, gối nêm) giúp vào thế an toàn, tuyệt đối không ép dẻo quá sức.
* Được giáo viên nắn chỉnh từng tư thế đặt chân, bảo vệ khớp gối và học kỹ thuật thở sâu.

🎯 **Lớp học phù hợp nhất:**
* **Lớp Yoga For Newbie:** Ca sáng sớm **05:00 - 06:00** hoặc Ca tối **19:00 - 20:00 (Thứ 2 - 4 - 6)**.
* Học phí ưu đãi: Gói 3 tháng chỉ 2.550.000đ (~850k/tháng).

👉 Bạn thuận tiện tập vào khung giờ sáng sớm hay buổi tối sau giờ làm? Bạn có thể gửi **Họ tên + SĐT/Zalo** để MyVici giữ chỗ trải nghiệm lớp cho bạn nhé!`;
  }

  // 5. MẤT NGỦ, STRESS, LO ÂU, CHUÔNG XOAY TÂY TẠNG
  if (
    lower.includes('mất ngủ') ||
    lower.includes('khó ngủ') ||
    lower.includes('stress') ||
    lower.includes('căng thẳng') ||
    lower.includes('chuông') ||
    lower.includes('sound healing')
  ) {
    return `Namaste bạn! Mất ngủ và lo âu kéo dài là do hệ thần kinh giao cảm bị quá tải. VICI có phương pháp chữa lành tự nhiên không dùng thuốc rất hiệu quả:

🌸 **Giải pháp tại VICI:**
* Kết hợp tư thế phục hồi xoa dịu thần kinh (*Gác chân lên tường Viparita Karani*) với kỹ thuật thở luân phiên giúp hạ nhịp tim.
* **Sóng âm Chuông Xoay Tây Tạng (Master Mỹ Kiều dẫn dắt):** Đưa não bộ về sóng Alpha/Theta để tái tạo giấc ngủ sâu lành.

🎯 **Khóa học gợi ý:**
* **Lớp Yoga Therapy & Chuông Xoay:** 19:00 - 20:00 (Tối Thứ 5 hàng tuần).
* **Workshop Chuông Xoay Trị Liệu Cuối Tuần:** 1.200.000đ/buổi.

👉 Bạn bị mất ngủ bao lâu rồi? Bạn vui lòng nhắn **Họ tên + SĐT/Zalo** để VICI gửi bài tập thở và xếp lịch trải nghiệm chuông xoay cho bạn nhé!`;
  }

  // 6. BẢNG HỌC PHÍ CÁC GÓI TẬP
  if (
    lower.includes('học phí') ||
    lower.includes('giá') ||
    lower.includes('tiền') ||
    lower.includes('bao nhiêu') ||
    lower.includes('chi phí') ||
    lower.includes('gói tập')
  ) {
    return `Namaste bạn! Bảng học phí tại VICI Yoga Therapy Training Center được niêm yết công khai và minh bạch:

📋 **CÁC GÓI HỘI VIÊN LỚP NHÓM:**
* **Gói 3 tháng:** 2.550.000đ (~850.000đ/tháng)
* **Gói 6 tháng:** 4.800.000đ (~800.000đ/tháng)
* **Gói VIP 1 năm:** 8.000.000đ *(Tặng 01 buổi Scan Trị Liệu 650k + 01 vé Workshop Chuông Xoay 1.2tr)*

🌿 **DỊCH VỤ TRỊ LIỆU 1-1 & NÂNG CAO:**
* **Scan Trị Liệu Cơ Vai Cổ Gáy 1-1 (45-60p):** 650.000đ
* **Trị Liệu Chuyên Sâu 1-1 Cá nhân hóa (60-75p):** 1.200.000đ
* **Khóa Ashtanga 10 chuyên đề (Master Henry):** 1.290.000đ (Early Bird)
* **Khóa Đào tạo HLV Yoga Quốc tế E-RYT 500:** Liên hệ để nhận chính sách học bổng.

👉 Bạn đang quan tâm đến gói tập nào? Hãy để lại **Họ tên + SĐT/Zalo** để VICI gửi ưu đãi và hỗ trợ đăng ký cho bạn nhé!`;
  }

  // 7. ĐỊA CHỈ & LIÊN HỆ
  if (
    lower.includes('địa chỉ') ||
    lower.includes('ở đâu') ||
    lower.includes('chỗ nào') ||
    lower.includes('đường đi') ||
    lower.includes('gửi xe') ||
    lower.includes('opal')
  ) {
    return `📍 **Địa chỉ VICI Yoga Therapy Training Center:**
* **Vị trí:** Căn hộ B1-0705, Chung cư Opal Boulevard, mặt tiền đường Phạm Văn Đồng, phường An Bình, TP. Dĩ An (giáp ranh trực tiếp TP. Thủ Đức, TP. Hồ Chí Minh).
* **Tiện ích:** Có hầm gửi xe ô tô và xe máy rộng rãi, an ninh 24/7. Không gian thoáng đãng, yên tĩnh, tách biệt khói bụi.
* **Hotline đón khách:** **036 684 0130** (Master Henry Phan).

👉 Bạn dự định ghé thăm trung tâm vào ngày nào trong tuần? Hãy nhắn **Họ tên + SĐT/Zalo** để VICI đón tiếp chu đáo nhất nhé!`;
  }

  // 8. MẶC ĐỊNH
  return `Namaste bạn! Rất vui được đồng hành cùng bạn. Tôi là **MyVici** – Trợ lý Chuyên môn của VICI Yoga Therapy do Master Henry Phan sáng lập. 🙏

🌿 **Các dịch vụ cốt lõi tại VICI:**
1. **Trị liệu Phục hồi Cột sống:** Thoát vị đĩa đệm (L4-L5), thoái hóa lưng, nắn chỉnh cổ vai gáy văn phòng.
2. **Yoga Cho Người Mới & Lớn Tuổi:** Các ca sáng sớm (05:00), sáng (06:30/08:00), chiều (14:00), tan ca (17:45) và tối (19:00).
3. **Trị Liệu Chuông Xoay Himalaya:** Giải tỏa stress, cải thiện giấc ngủ sâu.
4. **Khóa Ashtanga 10 Chuyên Đề & Đào Tạo HLV Quốc Tế E-RYT 500.**

Bạn đang quan tâm đến việc cải thiện sức khỏe vùng cơ khớp nào hay muốn tra cứu lịch lớp học cụ thể? Hãy chia sẻ với MyVici nhé!`;
}