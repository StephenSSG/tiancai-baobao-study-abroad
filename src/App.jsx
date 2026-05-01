import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck2,
  Check,
  ChevronDown,
  ClipboardCheck,
  CircleDollarSign,
  Gift,
  GraduationCap,
  Medal,
  Menu,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

const navItems = [
  { label: '录取案例', href: '#offers' },
  { label: '服务路径', href: '#path' },
  { label: '学科导师', href: '#tutors' },
  { label: '结果保障', href: '#guarantee' },
  { label: '筛选机制', href: '#selection' },
  { label: '常见问题', href: '#faq' },
  { label: '预约评估', href: '#consult' },
];

const stats = [
  { value: '2026', label: 'QS 世界大学排名' },
  { value: '#11', label: '香港大学全球排名' },
  { value: '10', label: '每届限额席位' },
  { value: '5', label: '核心申请阶段' },
];

const offerCases = [
  {
    school: '香港大学',
    programme: 'Bachelor of Science',
    detail: 'Firm offer · 2025-26 入学',
    image: '/showcase/offer-hku-firm.jpg',
  },
  {
    school: '香港大学',
    programme: 'Bachelor of Science',
    detail: 'Conditional offer · IB 38+',
    image: '/showcase/offer-hku-conditional.jpg',
  },
  {
    school: '香港科技大学',
    programme: 'Science Group A',
    detail: '含 University Admissions Scholarship',
    image: '/showcase/offer-hkust.jpg',
  },
];

const campusPhotos = [
  {
    title: '港大校园现场',
    image: '/showcase/hku-sign.jpg',
  },
  {
    title: 'Chow Yei Ching Building',
    image: '/showcase/hku-window.jpg',
  },
  {
    title: '港大钟楼视角',
    image: '/showcase/hku-clock.jpg',
  },
];

const audience = [
  {
    icon: Target,
    title: '目标清晰但路径模糊',
    text: '希望冲刺港大本科，却不确定 IB / AP / A Level 选课、活动、竞赛与申请节奏如何衔接。',
  },
  {
    icon: BookOpenCheck,
    title: '成绩优秀但需要确定性',
    text: '已有高分基础，需要把课内、标化、夏校、文书和面试放入同一套可追踪的时间表。',
  },
  {
    icon: Users,
    title: '家庭希望长期跟进',
    text: '高一或高二开始规划，希望每周推进、每月复盘，减少信息差和临场决策成本。',
  },
];

const stages = [
  {
    step: '01',
    title: '基础诊断与路径规划',
    meta: '签约后首月',
    points: ['成绩单、标化、语言与活动清单诊断', '课程体系与选课匹配报告', '港大目标专业与个人升学地图'],
  },
  {
    step: '02',
    title: '学业与标化跟进',
    meta: '贯穿全程',
    points: ['每周一次见面推进', '月度正式复盘与成绩波动预警', '托福、雅思、SAT、ACT 节点规划'],
  },
  {
    step: '03',
    title: '活动、竞赛与夏校提升',
    meta: '每学期更新',
    points: ['专业匹配型竞赛与科研活动建议', '夏校与交换项目材料协助', '同步维护文书素材库'],
  },
  {
    step: '04',
    title: '专业确认与文书面试',
    meta: '高二下至申请季',
    points: ['专业深度探索与排序', 'PS、补充文书与推荐信策略', '群面、个面专项模拟'],
  },
  {
    step: '05',
    title: '申请递交与后续决策',
    meta: '申请季至入学前',
    points: ['Non-JUPAS 系统填写复核', '录取结果分析与入读决策支持', '签证、住宿、入学准备基础指导'],
  },
];

const tutorHighlights = [
  {
    icon: UserCheck,
    title: '亲历同一课程',
    text: 'IB 科目导师必须亲自完成对应 IB 课程，才会被匹配为学生的学科老师。',
  },
  {
    icon: Medal,
    title: '理论最高分标准',
    text: '导师需在对应科目达到理论最高成绩标准，例如 IB 7 分、A Level A*。',
  },
  {
    icon: CircleDollarSign,
    title: '签约内部优惠',
    text: '合作学生可享受学科导师的内部优惠课时价，也可单独选择老师进行学习。',
  },
];

const guarantees = [
  '港大本科目标未达：不成功全额退款。',
  '结果保障目标锁定香港大学本科录取。',
  '除港大外，其它院校录取不触发成功协议；无需补齐尾款，已付定金按约全额退还。',
  '若学生在合同期内按规划执行但未取得港大本科有条件或无条件录取，按正式合同约定退费。',
  '虚假材料、错过截止日期、未按规划申请等例外情形，以合同列明条款为准。',
];

const faqs = [
  {
    question: '如果没有港大录取，但收到了港中文或港科大，算成功吗？',
    answer:
      '不算成功。除香港大学本科录取外，其它院校录取不触发本录取保障协议；学生无需补齐尾款，已付定金按正式合同约定全额退还。',
  },
  {
    question: '为什么页面不直接公开具体价格？',
    answer:
      '首版采用高端稳健表达。费用会在初步评估后结合年级、课程体系、目标专业和服务周期说明，正式金额以合同为准。',
  },
  {
    question: '服务会保证法律意义上的录取结果吗？',
    answer:
      '不会。升学结果受学生执行、当年竞争、院校政策等因素影响。天财保宝提供专业规划与结果保障机制，完整责任边界以正式合同为准。',
  },
  {
    question: '适合什么时候开始？',
    answer:
      '高一开始最适合做两至三年规划；高二学生也可以进入加速方案，重点补齐选课、标化、背景活动和文书素材。',
  },
  {
    question: '高三或 12 年级还适合加入录取辅导项目吗？',
    answer:
      '高三阶段通常预估分已经基本确定，很多关键选择也较难再调整。我们更建议高三学生优先参与学科补课服务，集中提高最终成绩与有条件录取达标能力。',
  },
  {
    question: '港大之外的院校会提供哪些支持？',
    answer:
      '港中文、港科大与英国前五等附赠规划院校，我们会协助申请系统填写、文书修改和模拟面试。但这些录取不触发港大录取保障协议。',
  },
  {
    question: '文书服务会代写吗？',
    answer:
      '不会代写。我们会帮助学生头脑风暴、梳理真实经历、搭建文书框架，并进行多轮修改与表达优化，但不提供任何代写服务。',
  },
  {
    question: '5 节免费课程适用于哪些内容？',
    answer:
      '免费课程主要用于 IB、A Level、AP 等学术课程。雅思、托福等语言考试无法完全体现我们学科导师的课程理解与教学实力，因此不作为默认体验方向。',
  },
  {
    question: '免费课程一共有几节？每节多长？',
    answer:
      '签署录取辅导项目的学生可获得一共 5 节免费课程，每节 60 分钟，用来感受课程有效性与老师匹配度。',
  },
  {
    question: '签约后补课优惠是多少？',
    answer:
      '与我们签署录取辅导项目的学生，后续学科补课可享受合作老师课程价格 8 折优惠。',
  },
  {
    question: '家长多久可以收到一次进度反馈？',
    answer:
      '家长每个月可以收到正式进度反馈，并与我们进行线上会议。学生也可以提前预约增加会议次数，不额外收费。',
  },
  {
    question: '什么情况下会拒绝签约？',
    answer:
      '如果学生当前成绩与目标差距很大，且学习意愿较弱，我们会拒绝签署录取辅导协议，避免给家庭制造不现实的期待。',
  },
  {
    question: '你们会做包装、造假或其它灰色业务吗？',
    answer:
      '不会。我们不做任何灰色业务，只基于学生真实经历和真实能力进行规划、提升与表达优化，帮助学生光明正大进入大学。',
  },
];

const initialForm = {
  grade: '',
  city: '',
  curriculum: '',
  direction: '',
  academicProfile: '',
  contact: '',
  note: '',
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const completeFields = useMemo(
    () => Object.values(form).filter((value) => value.trim().length > 0).length,
    [form],
  );
  const totalFields = Object.keys(initialForm).length;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || '提交失败');
      }

      setSubmitState('success');
      setSubmitMessage('提交成功。我们已收到预约信息，会尽快通过微信或电话联系你。');
      setForm(initialForm);
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage('提交暂时失败。请稍后再试，或直接扫描左侧微信二维码添加顾问。');
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="天财保宝留学业务首页" onClick={closeMenu}>
          <span className="brand-mark">天</span>
          <span>天财保宝 留学业务</span>
        </a>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#consult">
          预约评估
          <ArrowRight size={16} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">天财保宝 · 港大本科申请规划</p>
            <h1>把港大申请，放进一条可追踪的确定路径。</h1>
            <p className="hero-lede">
              面向高一、高二国际课程学生，提供从选课、标化、竞赛、夏校、文书到面试的长期规划，
              并以清晰合同约定建立结果保障机制。
            </p>

            <div className="refund-banner" aria-label="不成功全额退款保障">
              <span>核心保障</span>
              <strong>不成功全额退款</strong>
              <p>以香港大学本科录取为目标；学生按规划执行但未达目标，按正式合同约定退费。</p>
            </div>

            <div className="hero-actions">
              <a className="primary-button" href="#consult">
                预约初步评估
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="secondary-button" href="#guarantee">
                查看结果保障
              </a>
            </div>

            <a className="scroll-cue" href="#stats" aria-label="继续向下了解更多内容">
              <span>继续了解服务路径</span>
              <ChevronDown size={18} aria-hidden="true" />
            </a>

            <p className="fine-print">
              结果保障目标为香港大学本科录取；完整服务边界、例外情形与退费规则以正式合同为准。
            </p>
          </div>

          <div className="hero-visual" aria-label="港大申请规划摘要">
            <div className="planning-panel">
              <div className="planning-panel-header">
                <span>HKU Planning System</span>
                <strong>2026 · QS #11</strong>
              </div>

              <div className="planning-focus">
                <span>录取目标</span>
                <strong>香港大学本科录取</strong>
                <p>围绕选课、成绩、背景、文书与面试，把每一步变成可追踪节点。</p>
              </div>

              <div className="admission-track" aria-label="申请规划步骤">
                {['选课', '标化', '竞赛', '文书', '面试'].map((item, index) => (
                  <div className="track-step" key={item} style={{ '--step-delay': `${index * 130}ms` }}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="planning-metrics" aria-label="服务摘要">
                <div>
                  <strong>10</strong>
                  <span>每届限额席位</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>核心申请阶段</span>
                </div>
                <div>
                  <strong>月度</strong>
                  <span>正式复盘会议</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band" id="stats" aria-label="权威数据">
          {stats.map((item) => (
            <div className="stat" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
          <p>
            排名信息参考香港大学 Quick Stats 与 QS World University Rankings 2026。
          </p>
        </section>

        <section className="section-pad proof-section" id="offers">
          <div className="proof-heading">
            <div>
              <img className="proof-logo" src="/showcase/tiancai-logo.jpg" alt="天财保宝" />
              <p className="eyebrow">Verified outcomes</p>
              <h2>真实录取材料与校园现场，让承诺有迹可循。</h2>
            </div>
            <p>
              以下为经授权展示的过往录取材料节选，个人信息与申请编号已做隐私处理。录取结果受学生背景、执行情况与当年招生政策影响，最终以院校官方通知为准。
            </p>
          </div>

          <div className="offer-grid" aria-label="录取成果案例">
            {offerCases.map((item) => (
              <article className="offer-card" key={`${item.school}-${item.detail}`}>
                <div className="offer-preview">
                  <img src={item.image} alt={`${item.school} ${item.programme} 录取材料节选`} />
                  <span>隐私信息已处理</span>
                </div>
                <div className="offer-copy">
                  <span>{item.school}</span>
                  <strong>{item.programme}</strong>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="campus-gallery" aria-label="校园现场照片">
            {campusPhotos.map((photo) => (
              <figure key={photo.title}>
                <img src={photo.image} alt={photo.title} />
                <figcaption>{photo.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section-pad" id="fit">
          <div className="section-heading compact">
            <p className="eyebrow">For families who start early</p>
            <h2>适合已经认真投入，却需要系统节奏的家庭。</h2>
          </div>

          <div className="audience-grid">
            {audience.map(({ icon: Icon, title, text }) => (
              <article className="audience-card" key={title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad path-section" id="path">
          <div className="section-heading">
            <p className="eyebrow">End-to-end advisory path</p>
            <h2>五个阶段，把申请拆成可执行、可复盘、可交付的工作。</h2>
            <p>
              每一阶段均形成书面或电子记录，关键节点输出正式报告，让家庭知道下一步为什么做、何时做、做到什么标准。
            </p>
          </div>

          <div className="stage-list">
            {stages.map((stage) => (
              <article className="stage-card" key={stage.step}>
                <div className="stage-index">{stage.step}</div>
                <div>
                  <div className="stage-meta">{stage.meta}</div>
                  <h3>{stage.title}</h3>
                  <ul>
                    {stage.points.map((point) => (
                      <li key={point}>
                        <Check size={16} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad tutor-section" id="tutors">
          <div className="section-heading">
            <p className="eyebrow">Academic tutoring support</p>
            <h2>由真正读过这门课、拿过高分的大学生老师带你学。</h2>
            <p>
              我们的学科导师来自成绩非常突出的大学生群体。IB 科目只匹配亲自完成对应课程的老师，
              并要求老师在对应科目达到理论最高分标准，确保他们理解课程结构、评分逻辑与备考节奏。
            </p>
          </div>

          <div className="tutor-grid">
            {tutorHighlights.map(({ icon: Icon, title, text }) => (
              <article className="tutor-card" key={title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="trial-band">
            <div>
              <Gift size={26} aria-hidden="true" />
              <span>签约录取辅导项目学生专享</span>
            </div>
            <strong>赠送 5 节免费课程</strong>
            <p>先感受课程有效性，再决定后续学科补强节奏。</p>
          </div>
        </section>

        <section className="section-pad guarantee-section" id="guarantee">
          <div className="guarantee-copy">
            <p className="eyebrow">Result assurance</p>
            <h2>不成功全额退款，结果保障写清楚。</h2>
            <p>
              天财保宝不把升学包装成简单承诺，而是通过筛选、长期跟进、过程记录与合同约定，
              为学生建立更高确定性的港大申请路径。
            </p>
          </div>

          <div className="guarantee-panel">
            <div className="panel-title">
              <ShieldCheck size={24} aria-hidden="true" />
              <span>保障摘要</span>
            </div>
            <ul>
              {guarantees.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-pad selection-section" id="selection">
          <div className="selection-card">
            <div>
              <p className="eyebrow">Selective by design</p>
              <h2>每届限额，不做流水线规划。</h2>
              <p>
                为保证导师精力与服务质量，每届目标招收不超过 10 名学生。初期咨询、评估会议与双向确认后，
                才进入正式规划。
              </p>
            </div>
            <div className="selection-steps">
              <div>
                <ClipboardCheck size={21} aria-hidden="true" />
                <span>成绩与活动初筛</span>
              </div>
              <div>
                <CalendarCheck2 size={21} aria-hidden="true" />
                <span>导师评估会议</span>
              </div>
              <div>
                <GraduationCap size={21} aria-hidden="true" />
                <span>目标与配合确认</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad faq-section" id="faq">
          <div className="section-heading compact">
            <p className="eyebrow">FAQ</p>
            <h2>家长最先会问的几个问题。</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={faq.question}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                    <span>{faq.question}</span>
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-pad consult-section" id="consult">
          <div className="consult-copy">
            <p className="eyebrow">Private evaluation</p>
            <h2>预约一次初步评估。</h2>
            <p>
              提交学生当前情况后，团队会基于年级、课程体系、目标专业与已有成绩判断是否适合进入港大结果保障规划。
            </p>

            <div className="wechat-box" aria-label="天财保宝顾问微信二维码">
              <article className="wechat-card">
                <img className="wechat-qr" src="/wechat-qr.jpg" alt="天财保宝顾问微信二维码一" />
                <p>顾问微信 1</p>
              </article>
              <article className="wechat-card">
                <img className="wechat-qr" src="/wechat-qr-second.jpg" alt="天财保宝顾问微信二维码二" />
                <p>顾问微信 2</p>
              </article>
              <p className="wechat-note">任选一位顾问扫码添加，发送学生年级与当前课程体系。</p>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit} aria-busy={submitState === 'submitting'}>
            <div className="form-progress">
              <span>资料完整度</span>
              <strong>
                {completeFields}/{totalFields}
              </strong>
            </div>

            <label>
              学生年级
              <select name="grade" value={form.grade} onChange={handleChange} required>
                <option value="">请选择</option>
                <option value="grade-10">十年级 / 高一</option>
                <option value="grade-11">十一年级 / 高二</option>
                <option value="other">其他年级</option>
              </select>
            </label>

            <label>
              学生所在城市
              <input
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="例如：深圳、上海、香港"
                required
              />
            </label>

            <label>
              当前课程体系
              <select name="curriculum" value={form.curriculum} onChange={handleChange} required>
                <option value="">请选择</option>
                <option value="ib">IB</option>
                <option value="ap">AP</option>
                <option value="alevel">A Level</option>
                <option value="other">其他国际课程</option>
              </select>
            </label>

            <label>
              目标专业方向
              <input
                name="direction"
                type="text"
                value={form.direction}
                onChange={handleChange}
                placeholder="例如：商科、工程、法律、医学"
                required
              />
            </label>

            <label>
              当前成绩概况
              <textarea
                name="academicProfile"
                value={form.academicProfile}
                onChange={handleChange}
                placeholder="可填写校内成绩、预估分、语言或标化分数"
                required
              />
            </label>

            <label>
              家长联系方式
              <input
                name="contact"
                type="text"
                value={form.contact}
                onChange={handleChange}
                placeholder="微信号 / 手机号"
                required
              />
            </label>

            <label>
              备注
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="希望团队优先评估的问题"
              />
            </label>

            <button className="submit-button" type="submit" disabled={submitState === 'submitting'}>
              {submitState === 'submitting' ? '提交中...' : '提交预约信息'}
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            {submitMessage && (
              <p className={submitState === 'error' ? 'error-message' : 'success-message'} role="status">
                {submitMessage}
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>天财保宝</strong>
          <span>港大本科申请规划与结果保障</span>
        </div>
        <p>排名与服务说明截至 2026 年；完整合同条款以双方签署文件为准。</p>
      </footer>
    </div>
  );
}

export default App;
