import fs from 'fs';
import path from 'path';
import { Lead } from '../types.js';
import { formatVietnamDateTime } from '../utils/dateUtils.js';

// Initial seeds for sample data
const defaultSampleLeads: Lead[] = [];

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'vici-leads-database.json');

// Ensure directory exists
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

// In-memory cache for ultra-fast access
let memoryLeads: Lead[] = [];
let isLoaded = false;

// Load database from file or fallback to defaults
export function getLeadsDatabase(): Lead[] {
  if (isLoaded) {
    return memoryLeads;
  }

  return reloadLeadsFromDisk();
}

export function reloadLeadsFromDisk(): Lead[] {
  ensureDataDir();
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryLeads = parsed;
        isLoaded = true;
        return memoryLeads;
      }
    }
  } catch (err) {
    console.warn('[DB] Could not load database file, initializing defaults:', err);
  }

  memoryLeads = [...defaultSampleLeads];
  saveLeadsToDisk();
  isLoaded = true;
  return memoryLeads;
}

// Save database to disk
export function saveLeadsToDisk(): boolean {
  ensureDataDir();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryLeads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB] Error saving leads to disk:', err);
    return false;
  }
}

// Add or update lead
export function saveOrUpdateLead(leadData: Partial<Lead> & { name: string; phone: string }): Lead {
  const allLeads = getLeadsDatabase();
  const cleanPhone = leadData.phone.replace(/[\s.-]/g, '');

  // Check if lead with this phone already exists
  const existingIndex = allLeads.findIndex(
    (l) => l.phone.replace(/[\s.-]/g, '') === cleanPhone
  );

  if (existingIndex !== -1) {
    const existing = allLeads[existingIndex];
    const updatedLead: Lead = {
      ...existing,
      name: leadData.name || existing.name,
      email: leadData.email || existing.email,
      interest: leadData.interest || existing.interest,
      category: leadData.category || existing.category,
      preferredTime: leadData.preferredTime || existing.preferredTime,
      goals: leadData.goals && leadData.goals.length > 0 ? leadData.goals : existing.goals,
      assignedTo: leadData.assignedTo || existing.assignedTo,
      recommendedCourse: leadData.recommendedCourse || existing.recommendedCourse,
      conversationSummary: leadData.conversationSummary || leadData.chatSummary || existing.conversationSummary,
      chatSummary: leadData.chatSummary || leadData.conversationSummary || existing.chatSummary,
      aiReport: leadData.aiReport || existing.aiReport,
      conversationHistory:
        leadData.conversationHistory && leadData.conversationHistory.length > 0
          ? leadData.conversationHistory
          : existing.conversationHistory,
      staffNotes: leadData.staffNotes
        ? (leadData.staffNotes.startsWith('[Phân khúc CRM:')
            ? leadData.staffNotes
            : `${existing.staffNotes || ''}\n[Cập nhật]: ${leadData.staffNotes}`.trim())
        : existing.staffNotes,
      nextAction: leadData.nextAction || existing.nextAction,
      leadScore: 'HOT'
    };

    allLeads[existingIndex] = updatedLead;
    saveLeadsToDisk();
    return updatedLead;
  }

  // Determine correct trainer assignment
  const determinedTrainer =
    leadData.assignedTo ||
    (leadData.category === 'TRAINER_EDUCATION' ||
    leadData.category === 'ADVANCED' ||
    (leadData.interest || '').toLowerCase().includes('hlv') ||
    (leadData.interest || '').toLowerCase().includes('huấn luyện viên') ||
    (leadData.interest || '').toLowerCase().includes('giáo viên') ||
    (leadData.recommendedCourse || '').toLowerCase().includes('hlv') ||
    (leadData.recommendedCourse || '').toLowerCase().includes('ashtanga')
      ? 'Master Henry Phan'
      : 'Master Mỹ Kiều');

  // Create new lead
  const newLead: Lead = {
    id: `VICI-LEAD-${Date.now().toString().slice(-4)}`,
    createdAt: formatVietnamDateTime(),
    name: leadData.name.trim(),
    phone: leadData.phone.trim(),
    email: leadData.email ? leadData.email.trim() : undefined,
    source: leadData.source || 'VICI AI Chatbot',
    interest: leadData.interest || 'Tư vấn trị liệu qua AI',
    category: leadData.category || 'THERAPY_INTEREST',
    experience: leadData.experience || 'Chưa xác định',
    goals: Array.isArray(leadData.goals) ? leadData.goals : [],
    preferredTime: leadData.preferredTime || 'Linh hoạt',
    preferredFormat: leadData.preferredFormat || 'Trực tiếp tại Studio',
    recommendedCourse: leadData.recommendedCourse || leadData.interest || 'Gói Phục Hồi Cá Nhân Hóa',
    leadScore: leadData.leadScore || 'HOT',
    status: 'New',
    assignedTo: determinedTrainer,
    conversationSummary: leadData.conversationSummary || leadData.chatSummary || 'Khách hàng để lại thông tin qua AI Chat',
    chatSummary: leadData.chatSummary || leadData.conversationSummary,
    aiReport: leadData.aiReport,
    conversationHistory: Array.isArray(leadData.conversationHistory) ? leadData.conversationHistory : [],
    staffNotes: leadData.staffNotes || 'Khách hàng gửi nhu cầu và thông tin từ AI Chatbot.',
    nextAction: leadData.nextAction || `${determinedTrainer} liên hệ xác nhận phác đồ`,
    isSampleData: false
  };

  memoryLeads = [newLead, ...allLeads];
  saveLeadsToDisk();
  return newLead;
}

// Update single lead by ID
export function updateLeadById(id: string, updates: Partial<Lead>): Lead | null {
  const allLeads = getLeadsDatabase();
  const index = allLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  allLeads[index] = {
    ...allLeads[index],
    ...updates
  };

  saveLeadsToDisk();
  return allLeads[index];
}

// Delete single lead by ID
export function deleteLeadById(id: string): boolean {
  const allLeads = getLeadsDatabase();
  const index = allLeads.findIndex((l) => l.id === id);
  if (index === -1) return false;

  memoryLeads = allLeads.filter((l) => l.id !== id);
  saveLeadsToDisk();
  return true;
}

// Full JSON Backup Export
export function exportDatabaseBackup() {
  const allLeads = getLeadsDatabase();
  return {
    version: '2.0',
    system: 'VICI Yoga Therapy CRM',
    exportedAt: new Date().toISOString(),
    totalLeads: allLeads.length,
    leads: allLeads
  };
}

// Full JSON Restore Import
export function restoreDatabaseBackup(
  importedData: any,
  mode: 'replace' | 'merge' = 'merge'
): { success: boolean; count: number; message: string } {
  let leadsToImport: any[] = [];

  if (Array.isArray(importedData)) {
    leadsToImport = importedData;
  } else if (importedData && Array.isArray(importedData.leads)) {
    leadsToImport = importedData.leads;
  } else if (importedData && Array.isArray(importedData.data)) {
    leadsToImport = importedData.data;
  } else {
    return { success: false, count: 0, message: 'Định dạng file sao lưu JSON không hợp lệ' };
  }

  // Validate and normalize leads
  const validLeads: Lead[] = leadsToImport
    .filter((l) => l && (l.name || l.fullName) && (l.phone || l.phoneNumber))
    .map((item, index) => {
      const now = new Date();
      const defaultDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const cleanPhone = String(item.phone || item.phoneNumber || '').trim();
      const cleanName = String(item.name || item.fullName || '').trim();
      const id = item.id || `VICI-LEAD-${Date.now()}-${index + 1}`;

      return {
        id,
        createdAt: item.createdAt || defaultDate,
        name: cleanName,
        phone: cleanPhone,
        email: item.email || undefined,
        source: item.source || 'Website Form',
        interest: item.interest || item.course || 'Yoga Trị Liệu Cá Nhân Hóa',
        category: item.category || 'THERAPY_INTEREST',
        experience: item.experience || 'Chưa từng tập Yoga',
        goals: Array.isArray(item.goals) ? item.goals : typeof item.goals === 'string' ? [item.goals] : [],
        preferredTime: item.preferredTime || 'Linh hoạt',
        preferredFormat: item.preferredFormat || 'Trực tiếp tại Studio',
        recommendedCourse: item.recommendedCourse || item.interest || 'Gói Yoga Trị Liệu Cá Nhân Hóa',
        leadScore: (item.leadScore === 'HOT' || item.leadScore === 'WARM' || item.leadScore === 'COLD') ? item.leadScore : 'HOT',
        status: (item.status === 'New' || item.status === 'Contacted' || item.status === 'Consulting' || item.status === 'Trial' || item.status === 'Enrolled' || item.status === 'Lost') ? item.status : 'New',
        assignedTo: item.assignedTo || 'Master Henry Phan',
        conversationSummary: item.conversationSummary || item.chatSummary || '',
        chatSummary: item.chatSummary || item.conversationSummary || '',
        aiReport: item.aiReport || undefined,
        conversationHistory: Array.isArray(item.conversationHistory) ? item.conversationHistory : [],
        staffNotes: item.staffNotes || '',
        nextAction: item.nextAction || 'Liên hệ tư vấn và xác nhận lịch hẹn',
        isSampleData: Boolean(item.isSampleData)
      };
    });

  if (validLeads.length === 0) {
    return { success: false, count: 0, message: 'Không tìm thấy dữ liệu hồ sơ khách hàng hợp lệ trong file' };
  }

  if (mode === 'replace') {
    memoryLeads = validLeads;
  } else {
    // Merge by phone or ID
    const currentLeads = [...getLeadsDatabase()];
    for (const item of validLeads) {
      const idx = currentLeads.findIndex(
        (existing) => existing.id === item.id || existing.phone.replace(/[\s.-]/g, '') === item.phone.replace(/[\s.-]/g, '')
      );
      if (idx !== -1) {
        currentLeads[idx] = { ...currentLeads[idx], ...item };
      } else {
        currentLeads.unshift(item);
      }
    }
    memoryLeads = currentLeads;
  }

  saveLeadsToDisk();
  return {
    success: true,
    count: memoryLeads.length,
    message: `Đã đồng bộ thành công ${validLeads.length} hồ sơ vào cơ sở dữ liệu website.`
  };
}
