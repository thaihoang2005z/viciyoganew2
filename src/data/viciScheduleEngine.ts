/**
 * VICI Yoga Therapy - Precision Schedule & Stateful Query Engine
 * File: viciScheduleEngine.ts
 */

export interface ScheduleSession {
  id: string;
  day: string;
  dayIndex: number;
  time: string;
  shift: 'early_morning' | 'morning' | 'afternoon' | 'evening';
  className: string;
  classCode: string;
  category: string;
  description: string;
  keywords: string[];
}

export const VICI_SCHEDULE_MATRIX: ScheduleSession[] = [
  // 05:00 - 06:00
  { id: 'SCH-01', day: 'Thứ 2', dayIndex: 2, time: '05:00 - 06:00', shift: 'early_morning', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Đón bình minh, căn chỉnh thở và tư thế an toàn.', keywords: ['newbie', 'người mới', 'mới bắt đầu', 'cơ bản'] },
  { id: 'SCH-02', day: 'Thứ 3', dayIndex: 3, time: '05:00 - 06:00', shift: 'early_morning', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Đón bình minh, căn chỉnh thở và tư thế an toàn.', keywords: ['newbie', 'người mới', 'mới bắt đầu', 'cơ bản'] },
  { id: 'SCH-03', day: 'Thứ 4', dayIndex: 4, time: '05:00 - 06:00', shift: 'early_morning', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Đón bình minh, căn chỉnh thở và tư thế an toàn.', keywords: ['newbie', 'người mới', 'mới bắt đầu', 'cơ bản'] },
  { id: 'SCH-04', day: 'Thứ 5', dayIndex: 5, time: '05:00 - 06:00', shift: 'early_morning', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Đón bình minh, căn chỉnh thở và tư thế an toàn.', keywords: ['newbie', 'người mới', 'mới bắt đầu', 'cơ bản'] },
  { id: 'SCH-05', day: 'Thứ 6', dayIndex: 6, time: '05:00 - 06:00', shift: 'early_morning', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Đón bình minh, căn chỉnh thở và tư thế an toàn.', keywords: ['newbie', 'người mới', 'mới bắt đầu', 'cơ bản'] },

  // 06:30 - 07:30
  { id: 'SCH-06', day: 'Thứ 2', dayIndex: 2, time: '06:30 - 07:30', shift: 'morning', className: 'Yoga Stretching (Kéo giãn)', classCode: 'STRETCH', category: 'Kéo giãn phục hồi', description: 'Giải phóng căng cơ, tăng độ dẻo dai khớp xương.', keywords: ['kéo giãn', 'stretching', 'giãn cơ'] },
  { id: 'SCH-07', day: 'Thứ 3', dayIndex: 3, time: '06:30 - 07:30', shift: 'morning', className: 'Hip Opening (Mở hông)', classCode: 'HIP', category: 'Trị liệu mục tiêu', description: 'Mở khớp hông đa chiều, giải tỏa thắt lưng.', keywords: ['hip opening', 'mở hông', 'khớp hông', 'háng'] },
  { id: 'SCH-08', day: 'Thứ 4', dayIndex: 4, time: '06:30 - 07:30', shift: 'morning', className: 'Shoulder & Upperback (Mở vai & Lưng trên)', classCode: 'SHOULDER_UPPER', category: 'Trị liệu mục tiêu', description: 'Mở khớp vai và đốt sống ngực, giảm đau cổ vai gáy.', keywords: ['shoulder & upperback', 'shoulder', 'upperback', 'mở vai & lưng trên', 'mở vai', 'lưng trên'] },
  { id: 'SCH-09', day: 'Thứ 5', dayIndex: 5, time: '06:30 - 07:30', shift: 'morning', className: 'Twisting Yoga (Vặn xoắn)', classCode: 'TWIST', category: 'Trị liệu mục tiêu', description: 'Linh hoạt cột sống, hỗ trợ tiêu hóa tự nhiên.', keywords: ['twisting', 'vặn xoắn', 'xoay cột sống'] },
  { id: 'SCH-10', day: 'Thứ 6', dayIndex: 6, time: '06:30 - 07:30', shift: 'morning', className: 'Yoga Balance (Thăng bằng)', classCode: 'BALANCE', category: 'Thể lực & Core', description: 'Tăng khả năng thăng bằng và kích hoạt cơ lõi sâu.', keywords: ['balance', 'thăng bằng', 'cơ lõi', 'core'] },

  // 08:00 - 09:00
  { id: 'SCH-11', day: 'Thứ 2', dayIndex: 2, time: '08:00 - 09:00', shift: 'morning', className: 'Hatha Yoga', classCode: 'HATHA', category: 'Nền tảng', description: 'Nhịp độ chậm rãi, căn chỉnh trục cột sống an toàn.', keywords: ['hatha'] },
  { id: 'SCH-12', day: 'Thứ 3', dayIndex: 3, time: '08:00 - 09:00', shift: 'morning', className: 'Vinyasa Yoga', classCode: 'VINYASA', category: 'Dòng chảy thể lực', description: 'Chuỗi chuyển động nối liền hơi thở, tăng sức bền.', keywords: ['vinyasa', 'flow', 'dòng chảy'] },
  { id: 'SCH-13', day: 'Thứ 4', dayIndex: 4, time: '08:00 - 09:00', shift: 'morning', className: 'Yin Yoga', classCode: 'YIN', category: 'Phục hồi sâu', description: 'Giữ tĩnh 3-5 phút phục hồi màng cơ và thư giãn thần kinh.', keywords: ['yin yoga', 'yin', 'thư giãn sâu', 'mô liên kết'] },
  { id: 'SCH-14', day: 'Thứ 5', dayIndex: 5, time: '08:00 - 09:00', shift: 'morning', className: 'Yoga Detox Giảm Cân', classCode: 'DETOX', category: 'Đốt mỡ & Vóc dáng', description: 'Kích hoạt trao đổi chất, hỗ trợ giảm mỡ thon gọn eo.', keywords: ['detox', 'yoga detox', 'giảm cân', 'đốt mỡ', 'thon gọn', 'eo'] },
  { id: 'SCH-15', day: 'Thứ 6', dayIndex: 6, time: '08:00 - 09:00', shift: 'morning', className: 'Ashtanga (Chăm sóc cột sống)', classCode: 'ASHTANGA_DAILY', category: 'Trị liệu cột sống', description: 'Chuỗi bài tập bảo vệ cột sống, tăng sức bền cơ lõi.', keywords: ['ashtanga', 'chăm sóc cột sống', 'ashtanga sáng'] },

  // 09:00 - 12:00
  { id: 'SCH-16', day: 'Thứ 2', dayIndex: 2, time: '09:00 - 12:00', shift: 'morning', className: 'Đào tạo HLV Yoga Quốc tế', classCode: 'TTC', category: 'Đào tạo chuyên nghiệp', description: 'Chuẩn Yoga Alliance Hoa Kỳ do Master Henry Phan giảng dạy.', keywords: ['đào tạo hlv', 'hlv quốc tế', 'lớp hlv'] },
  { id: 'SCH-17', day: 'Thứ 4', dayIndex: 4, time: '09:00 - 12:00', shift: 'morning', className: 'Đào tạo HLV Yoga Quốc tế', classCode: 'TTC', category: 'Đào tạo chuyên nghiệp', description: 'Chuẩn Yoga Alliance Hoa Kỳ do Master Henry Phan giảng dạy.', keywords: ['đào tạo hlv', 'hlv quốc tế', 'lớp hlv'] },
  { id: 'SCH-18', day: 'Thứ 6', dayIndex: 6, time: '09:00 - 12:00', shift: 'morning', className: 'Đào tạo HLV Yoga Quốc tế', classCode: 'TTC', category: 'Đào tạo chuyên nghiệp', description: 'Chuẩn Yoga Alliance Hoa Kỳ do Master Henry Phan giảng dạy.', keywords: ['đào tạo hlv', 'hlv quốc tế', 'lớp hlv'] },

  // 14:00 - 15:30
  { id: 'SCH-19', day: 'Thứ 3', dayIndex: 3, time: '14:00 - 15:30', shift: 'afternoon', className: 'Yoga Nâng Cao Ashtanga & Cột Sống (10 Chuyên Đề)', classCode: 'ASHTANGA_ADV', category: 'Nâng cao', description: '10 chuyên đề nâng cao kèm chỉnh trục cùng Master Henry.', keywords: ['ashtanga nâng cao', '10 chuyên đề', 'handstand', 'uốn lưng', 'pincha', 'chuối'] },
  { id: 'SCH-20', day: 'Thứ 5', dayIndex: 5, time: '14:00 - 15:30', shift: 'afternoon', className: 'Yoga Nâng Cao Ashtanga & Cột Sống (10 Chuyên Đề)', classCode: 'ASHTANGA_ADV', category: 'Nâng cao', description: '10 chuyên đề nâng cao kèm chỉnh trục cùng Master Henry.', keywords: ['ashtanga nâng cao', '10 chuyên đề', 'handstand', 'uốn lưng', 'pincha', 'chuối'] },

  // 17:45 - 18:45
  { id: 'SCH-21', day: 'Thứ 2', dayIndex: 2, time: '17:45 - 18:45', shift: 'evening', className: 'Hatha Yoga', classCode: 'HATHA', category: 'Nền tảng', description: 'Giải tỏa áp lực sau giờ làm việc văn phòng.', keywords: ['hatha tối'] },
  { id: 'SCH-22', day: 'Thứ 3', dayIndex: 3, time: '17:45 - 18:45', shift: 'evening', className: 'Open Shoulder (Mở vai)', classCode: 'OPEN_SHOULDER', category: 'Trị liệu mục tiêu', description: 'Kéo giãn mở khớp vai, xua tan đau mỏi vùng cổ gáy.', keywords: ['open shoulder', 'mở vai', 'mở vai tối', 'vai gáy tối'] },
  { id: 'SCH-23', day: 'Thứ 4', dayIndex: 4, time: '17:45 - 18:45', shift: 'evening', className: 'Dynamic Yoga', classCode: 'DYNAMIC', category: 'Thể lực', description: 'Tăng cường sức bền và giải phóng năng lượng ứ đọng.', keywords: ['dynamic', 'năng động'] },
  { id: 'SCH-24', day: 'Thứ 5', dayIndex: 5, time: '17:45 - 18:45', shift: 'evening', className: 'Hip Opening (Mở hông)', classCode: 'HIP', category: 'Trị liệu mục tiêu', description: 'Mở rộng khớp hông, thư giãn nhóm cơ thắt lưng chậu.', keywords: ['hip opening', 'mở hông', 'hông tối'] },
  { id: 'SCH-25', day: 'Thứ 6', dayIndex: 6, time: '17:45 - 18:45', shift: 'evening', className: 'Yoga Stretching (Kéo giãn)', classCode: 'STRETCH', category: 'Kéo giãn phục hồi', description: 'Thư giãn sâu toàn thân trước kỳ nghỉ cuối tuần.', keywords: ['kéo giãn tối', 'stretching tối'] },

  // 19:00 - 20:00
  { id: 'SCH-26', day: 'Thứ 2', dayIndex: 2, time: '19:00 - 20:00', shift: 'evening', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Lớp tối cho người mới, nhẹ nhàng, nắn chỉnh tỉ mỉ.', keywords: ['newbie tối', '19h thứ 2'] },
  { id: 'SCH-27', day: 'Thứ 3', dayIndex: 3, time: '19:00 - 20:00', shift: 'evening', className: 'Gentle Yoga', classCode: 'GENTLE', category: 'Phục hồi', description: 'Nhẹ nhàng, thư thái, giải phóng stress.', keywords: ['gentle', 'nhẹ nhàng', 'thư giãn'] },
  { id: 'SCH-28', day: 'Thứ 4', dayIndex: 4, time: '19:00 - 20:00', shift: 'evening', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Lớp tối cho người mới, nhẹ nhàng, nắn chỉnh tỉ mỉ.', keywords: ['newbie tối', '19h thứ 4'] },
  { id: 'SCH-29', day: 'Thứ 5', dayIndex: 5, time: '19:00 - 20:00', shift: 'evening', className: 'Yoga Therapy (Chuông xoay)', classCode: 'SOUND_THERAPY', category: 'Trị liệu tâm trí', description: 'Yoga kết hợp sóng âm chuông xoay, hỗ trợ ngủ sâu giấc.', keywords: ['chuông xoay', 'yoga therapy', 'sound healing', 'mất ngủ', 'chuông'] },
  { id: 'SCH-30', day: 'Thứ 6', dayIndex: 6, time: '19:00 - 20:00', shift: 'evening', className: 'Yoga For Newbie', classCode: 'NEWBIE', category: 'Nền tảng', description: 'Lớp tối cho người mới, nhẹ nhàng, nắn chỉnh tỉ mỉ.', keywords: ['newbie tối', '19h thứ 6'] },
  { id: 'SCH-31', day: 'Thứ 7', dayIndex: 7, time: '19:00 - 20:00', shift: 'evening', className: 'Đào tạo HLV Thầy Henry', classCode: 'HENRY_TTC', category: 'Đào tạo chuyên nghiệp', description: 'Thực hành nâng cao kỹ năng đứng lớp cùng Thầy Henry.', keywords: ['đào tạo hlv thầy henry', 'hlv thầy henry', 'tối thứ 7'] }
];

export interface UserSessionContext {
  lastInquiredClassCode?: string;
  lastInquiredClassName?: string;
  preferredShift?: 'morning' | 'evening' | 'afternoon';
  leadPhone?: string;
  leadName?: string;
}

const sessionMemoryStore: Record<string, UserSessionContext> = {};

export function getSessionContext(sessionId: string = 'default'): UserSessionContext {
  if (!sessionMemoryStore[sessionId]) {
    sessionMemoryStore[sessionId] = {};
  }
  return sessionMemoryStore[sessionId];
}

export function queryScheduleSmart(message: string, sessionId: string = 'default'): string | null {
  const lower = message.toLowerCase().trim();
  const context = getSessionContext(sessionId);

  // 1. Nếu đang hỏi giá/học phí thuần túy -> nhường cho nhánh Bảng Giá
  if ((lower.includes('học phí') || lower.includes('giá bao nhiêu') || lower.includes('bao nhiêu tiền')) && 
      !lower.includes('lịch') && !lower.includes('thứ mấy') && !lower.includes('mấy giờ')) {
    return null;
  }

  // 2. Nhận diện ca/buổi tập người dùng mong muốn
  let userRequestedShift: 'morning' | 'evening' | 'afternoon' | null = null;
  if (lower.includes('sáng') || lower.includes('buổi sáng') || lower.includes('rảnh sáng') || lower.includes('5h') || lower.includes('6h30') || lower.includes('8h')) {
    userRequestedShift = 'morning';
    context.preferredShift = 'morning';
  } else if (lower.includes('tối') || lower.includes('buổi tối') || lower.includes('rảnh tối') || lower.includes('tan làm') || lower.includes('17h') || lower.includes('19h')) {
    userRequestedShift = 'evening';
    context.preferredShift = 'evening';
  } else if (lower.includes('chiều') || lower.includes('14h')) {
    userRequestedShift = 'afternoon';
    context.preferredShift = 'afternoon';
  }

  // 3. Nhận diện lớp học mới trong câu hỏi
  let matchedClassCode: string | null = null;

  // Xử lý riêng lớp Mở vai (gom cả Shoulder & Upperback sáng T4 và Open Shoulder tối T3)
  if (lower.includes('mở vai') || lower.includes('shoulder') || lower.includes('lưng trên') || lower.includes('upperback')) {
    context.lastInquiredClassCode = 'GROUP_SHOULDER';
    context.lastInquiredClassName = 'Mở Vai & Lưng Trên';
    matchedClassCode = 'GROUP_SHOULDER';
  } else if (lower.includes('ashtanga') && !lower.includes('nâng cao')) {
    // Nếu chỉ hỏi chung "Ashtanga" -> trả về cả 2 lựa chọn
    context.lastInquiredClassCode = 'GROUP_ASHTANGA';
    context.lastInquiredClassName = 'Ashtanga Yoga';
    matchedClassCode = 'GROUP_ASHTANGA';
  } else {
    for (const session of VICI_SCHEDULE_MATRIX) {
      if (session.keywords.some(kw => lower.includes(kw)) || lower.includes(session.className.toLowerCase())) {
        matchedClassCode = session.classCode;
        context.lastInquiredClassCode = session.classCode;
        context.lastInquiredClassName = session.className;
        break;
      }
    }
  }

  // 4. MULTI-TURN: Nếu không nhắc lại tên lớp nhưng có `lastInquiredClassCode` VÀ đang nói về thời gian
  const targetCode = matchedClassCode || (userRequestedShift ? context.lastInquiredClassCode : null);

  if (targetCode) {
    // A. Xử lý nhóm Mở vai
    if (targetCode === 'GROUP_SHOULDER') {
      const shoulderSessions = VICI_SCHEDULE_MATRIX.filter(s => s.classCode === 'SHOULDER_UPPER' || s.classCode === 'OPEN_SHOULDER');
      let filtered = shoulderSessions;
      if (userRequestedShift === 'morning') filtered = shoulderSessions.filter(s => s.shift === 'morning');
      if (userRequestedShift === 'evening') filtered = shoulderSessions.filter(s => s.shift === 'evening');

      const lines = filtered.map(s => `• **${s.day}**: ${s.time} — *${s.className}* (${s.description})`).join('\n');
      return `Namaste bạn! Các lớp **Mở Vai & Lưng Trên** tại VICI có lịch như sau:\n\n${lines}\n\n📍 **Địa điểm:** Căn hộ B1-0705 Opal Boulevard, Phạm Văn Đồng (có lớp Online song song).\n\nBạn muốn đăng ký tập thử lớp nào để MyVici giữ chỗ nhé? 🙏`;
    }

    // B. Xử lý nhóm Ashtanga
    if (targetCode === 'GROUP_ASHTANGA') {
      const ashtangaSessions = VICI_SCHEDULE_MATRIX.filter(s => s.classCode === 'ASHTANGA_DAILY' || s.classCode === 'ASHTANGA_ADV');
      const lines = ashtangaSessions.map(s => `• **${s.day}**: ${s.time} — *${s.className}* (${s.description})`).join('\n');
      return `Namaste bạn! VICI có 2 chương trình **Ashtanga Yoga** phù hợp theo từng mục tiêu:\n\n${lines}\n\n👉 Bạn đang quan tâm lớp duy trì sáng Thứ 6 hay khóa chuyên sâu 10 chuyên đề chiều Thứ 3 & Thứ 5 của Master Henry ạ?`;
    }

    // C. Xử lý các lớp đơn lẻ (Detox, Hip Opening, Newbie, Yin,...)
    const matchedSessions = VICI_SCHEDULE_MATRIX.filter(s => s.classCode === targetCode);
    const className = matchedSessions[0]?.className || context.lastInquiredClassName || '';

    if (userRequestedShift) {
      let filtered = matchedSessions.filter(s => {
        if (userRequestedShift === 'morning') return s.shift === 'morning' || s.shift === 'early_morning';
        if (userRequestedShift === 'evening') return s.shift === 'evening';
        if (userRequestedShift === 'afternoon') return s.shift === 'afternoon';
        return true;
      });

      if (filtered.length > 0) {
        const lines = filtered.map(s => `• **${s.day}**: ${s.time} — *${s.className}* (${s.description})`).join('\n');
        return `Dạ chuẩn luôn bạn nhé! Lớp **${className}** tại VICI có khung giờ **buổi ${userRequestedShift === 'morning' ? 'sáng' : userRequestedShift === 'evening' ? 'tối' : 'chiều'}** đúng theo thời gian bạn thuận tiện:\n\n${lines}\n\n📍 **Địa điểm:** Căn hộ B1-0705 Opal Boulevard, Phạm Văn Đồng (có lớp Online song song).\n\nBạn có muốn MyVici giữ chỗ trải nghiệm lớp này vào buổi tới không ạ? 🙏`;
      } else {
        const allLines = matchedSessions.map(s => `• **${s.day}**: ${s.time}`).join('\n');
        return `Dạ bạn ơi, hiện tại lớp **${className}** tại VICI chỉ có ca cố định vào:\n\n${allLines}\n\nLớp chưa có ca vào buổi ${userRequestedShift === 'morning' ? 'sáng' : 'tối'} bạn vừa hỏi. Bạn có thể thu xếp tham gia khung giờ trên hay muốn MyVici gợi ý các lớp khác diễn ra vào buổi ${userRequestedShift === 'morning' ? 'sáng' : 'tối'} tại trung tâm ạ?`;
      }
    }

    const lines = matchedSessions.map(s => `• **${s.day}**: ${s.time} — *${s.className}* (${s.description})`).join('\n');
    return `Namaste bạn! Theo thời khóa biểu chính thức tại VICI (Online & Offline), lớp **${className}** có lịch học chi tiết:\n\n${lines}\n\n📍 **Địa điểm:** Căn hộ B1-0705 Opal Boulevard, Phạm Văn Đồng, TP. Dĩ An (giáp TP. Thủ Đức).\n\nBạn thuận tiện tham gia vào ngày nào để MyVici hỗ trợ đăng ký cho bạn nhé? 🙏`;
  }

  // 5. Hỏi lịch theo Thứ trong tuần (Thứ 2 đến Thứ 7)
  const dayMatch = lower.match(/(thứ\s*[2-7]|chủ\s*nhật|t[2-7])/i);
  if (dayMatch) {
    let dayStr = '';
    const raw = dayMatch[0].toLowerCase();
    if (raw.includes('2') || raw.includes('t2')) dayStr = 'Thứ 2';
    else if (raw.includes('3') || raw.includes('t3')) dayStr = 'Thứ 3';
    else if (raw.includes('4') || raw.includes('t4')) dayStr = 'Thứ 4';
    else if (raw.includes('5') || raw.includes('t5')) dayStr = 'Thứ 5';
    else if (raw.includes('6') || raw.includes('t6')) dayStr = 'Thứ 6';
    else if (raw.includes('7') || raw.includes('t7')) dayStr = 'Thứ 7';

    if (dayStr === 'Thứ 7') {
      return `Namaste bạn! Lịch học và hoạt động ngày **Thứ 7** tại VICI:\n\n` +
        `• **19:00 – 20:00:** Lớp *Đào tạo HLV Thầy Henry* (Trực tiếp cùng Thầy Henry Phan).\n` +
        `• **Chương trình theo yêu cầu (Đặt lịch trước):** Training tập trung, Nhân lực đỏ, Henry Wellness Team (chăm sóc sức khỏe doanh nghiệp/Vinpearl), Gia đình Yoga by Kiều Hùng.\n\n` +
        `Bạn quan tâm đến buổi đào tạo HLV tối Thứ 7 hay dịch vụ thiết kế liệu trình riêng cho tổ chức ạ?`;
    }

    if (dayStr) {
      const dayClasses = VICI_SCHEDULE_MATRIX.filter(s => s.day === dayStr);
      const lines = dayClasses.map(s => `• **${s.time}**: **${s.className}** (${s.category})`).join('\n');
      return `Namaste bạn! Thời khóa biểu ngày **${dayStr}** tại VICI (Online & Offline) gồm các ca tập:\n\n${lines}\n\nBạn thuận tiện tham gia ca sáng, chiều hay tối của ${dayStr} ạ?`;
    }
  }

  return null;
}