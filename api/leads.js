import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const requiredFields = ['grade', 'city', 'curriculum', 'direction', 'academicProfile', 'contact'];

const labels = {
  grade: {
    'grade-10': '十年级 / 高一',
    'grade-11': '十一年级 / 高二',
    other: '其他年级',
  },
  curriculum: {
    ib: 'IB',
    ap: 'AP',
    alevel: 'A Level',
    other: '其他国际课程',
  },
};

function normalizeLead(body = {}) {
  return {
    grade: String(body.grade || '').trim(),
    city: String(body.city || '').trim().slice(0, 200),
    curriculum: String(body.curriculum || '').trim(),
    target_direction: String(body.direction || '').trim().slice(0, 500),
    academic_profile: String(body.academicProfile || '').trim().slice(0, 2000),
    contact: String(body.contact || '').trim().slice(0, 500),
    note: String(body.note || '').trim().slice(0, 2000),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function hasMissingRequired(body = {}) {
  return requiredFields.some((field) => !String(body[field] || '').trim());
}

function hasValidSupabaseUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

function leadEmailText(lead) {
  return [
    '天财保宝官网收到新的预约评估线索：',
    '',
    `学生年级：${labels.grade[lead.grade] || lead.grade}`,
    `所在城市：${lead.city}`,
    `课程体系：${labels.curriculum[lead.curriculum] || lead.curriculum}`,
    `目标专业方向：${lead.target_direction}`,
    `当前成绩概况：${lead.academic_profile}`,
    `家长联系方式：${lead.contact}`,
    `备注：${lead.note || '无'}`,
    '',
    `提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' })}`,
  ].join('\n');
}

function leadEmailHtml(lead) {
  const rows = [
    ['学生年级', labels.grade[lead.grade] || lead.grade],
    ['所在城市', lead.city],
    ['课程体系', labels.curriculum[lead.curriculum] || lead.curriculum],
    ['目标专业方向', lead.target_direction],
    ['当前成绩概况', lead.academic_profile],
    ['家长联系方式', lead.contact],
    ['备注', lead.note || '无'],
  ];

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif; line-height: 1.7; color: #161616;">
      <h2 style="margin: 0 0 16px;">天财保宝官网新预约评估</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        ${rows
          .map(
            ([key, value]) => `
              <tr>
                <td style="border: 1px solid #e6e6e1; padding: 10px 12px; width: 140px; font-weight: 700;">${escapeHtml(key)}</td>
                <td style="border: 1px solid #e6e6e1; padding: 10px 12px; white-space: pre-wrap;">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
    </div>
  `;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Method not allowed' });
      return;
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      res.status(500).json({ ok: false, error: 'Supabase is not configured' });
      return;
    }

    if (!hasValidSupabaseUrl(process.env.SUPABASE_URL)) {
      res.status(500).json({ ok: false, error: 'Supabase URL is invalid' });
      return;
    }

    let body;

    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    } catch {
      res.status(400).json({ ok: false, error: 'Invalid JSON' });
      return;
    }

    if (hasMissingRequired(body)) {
      res.status(400).json({ ok: false, error: 'Missing required fields' });
      return;
    }

    const lead = normalizeLead(body);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .from(process.env.SUPABASE_LEADS_TABLE || 'leads')
      .insert({
        ...lead,
        source: 'website',
        metadata: {
          user_agent: req.headers['user-agent'] || null,
          referer: req.headers.referer || null,
        },
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase lead insert failed:', error);
      res.status(500).json({ ok: false, error: 'Failed to save lead' });
      return;
    }

    let emailSent = false;

    if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || '天财保宝 <onboarding@resend.dev>',
          to: process.env.LEAD_NOTIFY_EMAIL,
          subject: '天财保宝官网新预约评估',
          text: leadEmailText(lead),
          html: leadEmailHtml(lead),
        });
        emailSent = true;
      } catch (emailError) {
        console.error('Resend notification failed:', emailError);
      }
    }

    res.status(201).json({ ok: true, id: data.id, emailSent });
  } catch (error) {
    console.error('Lead API unhandled error:', error);
    res.status(500).json({ ok: false, error: 'Lead API server error' });
  }
}
