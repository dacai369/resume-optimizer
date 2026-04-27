import { Question, ParsedJd } from '../types';

const softSkillQuestions = [
  {
    text: '在团队项目中，当你和同事对技术方案有分歧时，你会？',
    category: '团队协作',
    options: [
      { text: '主动组织讨论，列出各方案优劣势，达成共识', score: 10 },
      { text: '坚持自己认为更好的方案，说服对方', score: 6 },
      { text: '尊重同事意见，服从团队决定', score: 7 },
      { text: '向上级反映，由上级决定', score: 5 },
    ],
  },
  {
    text: '当同时有多个紧急任务需要处理时，你会如何安排？',
    category: '时间管理',
    options: [
      { text: '按重要程度和紧急程度排序，逐一处理', score: 10 },
      { text: '先完成简单的，再做复杂的', score: 6 },
      { text: '同时推进多个任务', score: 7 },
      { text: '向领导反映，请求帮助排优先级', score: 8 },
    ],
  },
  {
    text: '遇到从未接触过的新技术时，你会？',
    category: '学习能力',
    options: [
      { text: '快速找官方文档和优质资料，系统学习', score: 10 },
      { text: '找有经验的人请教，少走弯路', score: 8 },
      { text: '先找个实战项目练手，边做边学', score: 9 },
      { text: '搜索相关教程，跟着视频学习', score: 6 },
    ],
  },
  {
    text: '项目临近截止日期，但发现有一个较重要的Bug，你会？',
    category: '问题解决',
    options: [
      { text: '立即评估影响范围，同步给团队，给出修复方案', score: 10 },
      { text: '加班加点修复后再提交', score: 7 },
      { text: '先记录好，发布后修复', score: 5 },
      { text: '向领导汇报，听从指示', score: 8 },
    ],
  },
  {
    text: '你更倾向于哪种工作方式？',
    category: '工作风格',
    options: [
      { text: '制定详细计划，按步骤推进，保证质量', score: 9 },
      { text: '快速迭代，尽早交付，收集反馈', score: 8 },
      { text: '先整体把握，再逐步细化', score: 10 },
      { text: '灵活应对变化，随需求调整', score: 7 },
    ],
  },
  {
    text: '收到用户或同事的负面反馈时，你的第一反应是？',
    category: '沟通能力',
    options: [
      { text: '感谢反馈，深入了解具体问题，快速改进', score: 10 },
      { text: '先解释背景和原因，再讨论改进', score: 7 },
      { text: '认真倾听，记录问题，排期修复', score: 9 },
      { text: '评估反馈是否合理，再决定是否处理', score: 6 },
    ],
  },
  {
    text: '你如何看待代码审查（Code Review）？',
    category: '专业素养',
    options: [
      { text: '非常重要，能提升代码质量，也是互相学习的机会', score: 10 },
      { text: '有帮助，但不应占用太多时间', score: 7 },
      { text: '对个人成长有帮助，但流程可以更高效', score: 8 },
      { text: '小改动可以跳过，重要功能才需要', score: 4 },
    ],
  },
  {
    text: '面对不明确的需求，你会如何处理？',
    category: '需求理解',
    options: [
      { text: '主动和产品/需求方沟通，澄清所有疑点再开始', score: 10 },
      { text: '按自己理解先做，有问题再调整', score: 6 },
      { text: '列出疑问清单，一次性确认', score: 9 },
      { text: '参考类似功能的做法，自行判断', score: 7 },
    ],
  },
  {
    text: '当你负责的模块出现线上故障时，你会？',
    category: '责任心',
    options: [
      { text: '第一时间响应，迅速定位问题，及时通报进展', score: 10 },
      { text: '先恢复服务，再排查根本原因', score: 9 },
      { text: '组织相关人员共同排查', score: 8 },
      { text: '向领导汇报，等待指示', score: 5 },
    ],
  },
  {
    text: '你对技术文档的态度是？',
    category: '专业素养',
    options: [
      { text: '写好文档是专业的体现，对团队长期有益', score: 10 },
      { text: '核心逻辑要写，细节可以省略', score: 7 },
      { text: '代码即文档，写好代码比写文档更重要', score: 5 },
      { text: '视情况而定，关键功能一定要写', score: 8 },
    ],
  },
  {
    text: '在工作中如何持续提升自己的专业能力？',
    category: '学习能力',
    options: [
      { text: '定期总结复盘，阅读技术资料，参与开源或实践项目', score: 10 },
      { text: '工作中遇到问题再学习，按需学习', score: 7 },
      { text: '跟随团队成长，向优秀同事学习', score: 8 },
      { text: '参加培训课程，系统学习', score: 7 },
    ],
  },
  {
    text: '如何看待加班这件事？',
    category: '工作态度',
    options: [
      { text: '高效工作是目标，偶尔加班可接受，但不应成为常态', score: 10 },
      { text: '只要工作有意思，加班也不介意', score: 7 },
      { text: '提前规划好，尽量在工作时间内完成', score: 9 },
      { text: '视项目情况而定，关键期间全力投入', score: 8 },
    ],
  },
];

const technicalTemplates = {
  frontend: [
    {
      text: '在前端项目中，遇到页面性能问题时，你会优先考虑哪种优化方式？',
      category: '专业技能',
      options: [
        { text: '使用性能分析工具定位瓶颈，针对性优化', score: 10 },
        { text: '减少HTTP请求，合并静态资源', score: 7 },
        { text: '使用懒加载和虚拟滚动优化渲染', score: 8 },
        { text: '增加CDN节点，加速资源加载', score: 6 },
      ],
    },
    {
      text: '在组件设计时，你更看重什么？',
      category: '专业技能',
      options: [
        { text: '可复用性和可测试性，清晰的职责边界', score: 10 },
        { text: '功能完整，满足当前需求', score: 6 },
        { text: '良好的性能表现和渲染效率', score: 8 },
        { text: '开发效率，快速交付', score: 7 },
      ],
    },
    {
      text: '面对复杂的状态管理需求时，你会如何选择方案？',
      category: '技术决策',
      options: [
        { text: '根据项目规模和团队熟悉度，选择合适的状态管理库', score: 10 },
        { text: '尽量用组件内部状态，减少全局状态', score: 7 },
        { text: '统一使用成熟的状态管理方案', score: 8 },
        { text: '用Context API，避免引入额外依赖', score: 7 },
      ],
    },
    {
      text: '你如何保证前端代码的可维护性？',
      category: '专业素养',
      options: [
        { text: '遵循统一规范，做好组件拆分和代码注释', score: 10 },
        { text: '写好单元测试，保证代码质量', score: 9 },
        { text: '使用TypeScript增加类型约束', score: 8 },
        { text: '定期重构，去掉技术债务', score: 8 },
      ],
    },
    {
      text: '如何处理前后端接口联调中的问题？',
      category: '协作能力',
      options: [
        { text: '提前对齐接口文档，遇到问题及时沟通复盘', score: 10 },
        { text: '用Mock数据开发，减少等待', score: 8 },
        { text: '前端先自测好再联调，提高效率', score: 7 },
        { text: '接口出问题找后端解决', score: 4 },
      ],
    },
  ],
  backend: [
    {
      text: '设计API接口时，你最关注哪些方面？',
      category: '专业技能',
      options: [
        { text: '清晰的接口规范、错误码定义和版本控制', score: 10 },
        { text: '性能和响应速度', score: 7 },
        { text: '安全性和权限控制', score: 8 },
        { text: '简洁易用，方便前端调用', score: 7 },
      ],
    },
    {
      text: '数据库查询慢时，你的优化思路是？',
      category: '专业技能',
      options: [
        { text: '先分析执行计划，找到慢查询，针对性加索引或改写SQL', score: 10 },
        { text: '增加缓存层，减少数据库压力', score: 8 },
        { text: '拆分查询，避免复杂Join', score: 7 },
        { text: '升级数据库配置，增加资源', score: 5 },
      ],
    },
    {
      text: '如何保证系统的高可用性？',
      category: '系统设计',
      options: [
        { text: '限流熔断、服务降级、多副本部署，多维度保障', score: 10 },
        { text: '完善监控报警，快速发现和恢复', score: 8 },
        { text: '做好数据备份和故障预案', score: 7 },
        { text: '选用成熟稳定的技术栈和云服务', score: 6 },
      ],
    },
    {
      text: '代码中如何处理异常和错误？',
      category: '专业素养',
      options: [
        { text: '分层处理，记录完整日志，给用户友好提示', score: 10 },
        { text: '全局异常捕获，统一返回格式', score: 8 },
        { text: '在可能出错的地方加try-catch', score: 6 },
        { text: '让调用方自己处理错误', score: 4 },
      ],
    },
    {
      text: '如何设计一个可扩展的系统架构？',
      category: '系统设计',
      options: [
        { text: '分析业务增长预期，适度抽象，避免过度设计', score: 10 },
        { text: '微服务架构，各模块独立扩展', score: 8 },
        { text: '设计好接口和边界，便于后续拆分', score: 9 },
        { text: '先满足当前需求，扩展时再重构', score: 6 },
      ],
    },
  ],
  data: [
    {
      text: '在数据分析项目中，发现数据有异常值时，你会？',
      category: '专业技能',
      options: [
        { text: '先分析异常值产生的原因，再决定处理策略', score: 10 },
        { text: '直接删除，保证数据干净', score: 4 },
        { text: '用均值/中位数填充，减少影响', score: 7 },
        { text: '保留并标记，在分析时单独处理', score: 8 },
      ],
    },
    {
      text: '如何向非技术人员展示数据分析结果？',
      category: '沟通表达',
      options: [
        { text: '用可视化图表配合业务语言，突出关键结论', score: 10 },
        { text: '提供完整的数据表格，让对方自己查看', score: 4 },
        { text: '写详细的分析报告，逐步讲解', score: 7 },
        { text: '先结论后数据，用故事线串联', score: 9 },
      ],
    },
    {
      text: '如何评估一个数据分析模型的质量？',
      category: '专业技能',
      options: [
        { text: '根据业务场景选择合适的评估指标，结合业务验证', score: 10 },
        { text: '看准确率，越高越好', score: 5 },
        { text: '在测试集上验证，防止过拟合', score: 8 },
        { text: 'A/B测试，用实际业务数据验证', score: 9 },
      ],
    },
    {
      text: '面对海量数据的处理需求，你会选择什么方案？',
      category: '技术决策',
      options: [
        { text: '根据数据量和实时性要求，选择批处理或流处理方案', score: 10 },
        { text: '直接用SQL，成熟可靠', score: 6 },
        { text: '引入Spark等大数据框架', score: 8 },
        { text: '分批处理，控制内存使用', score: 7 },
      ],
    },
    {
      text: '数据指标下降时，你如何排查原因？',
      category: '问题解决',
      options: [
        { text: '拆分维度下钻，对比历史数据，排查数据链路', score: 10 },
        { text: '检查数据采集是否有问题', score: 8 },
        { text: '和业务方沟通，看是否有业务变化', score: 7 },
        { text: '等更多数据，排除偶然因素', score: 5 },
      ],
    },
  ],
  product: [
    {
      text: '当用户需求和业务目标冲突时，你会如何处理？',
      category: '产品思维',
      options: [
        { text: '深入分析用户背后的真实诉求，找到两者的平衡点', score: 10 },
        { text: '以业务目标为主，确保商业可行性', score: 7 },
        { text: '以用户体验为主，长期有利于业务', score: 7 },
        { text: '同步给多方stakeholder，共同决策', score: 8 },
      ],
    },
    {
      text: '如何验证一个新功能是否值得做？',
      category: '产品思维',
      options: [
        { text: '先做用户调研和数据分析，设定可量化的成功指标', score: 10 },
        { text: '做MVP快速上线，通过数据验证', score: 9 },
        { text: '参考竞品的做法，有案可查', score: 6 },
        { text: '基于行业经验判断，敏捷推进', score: 7 },
      ],
    },
    {
      text: '如何写出一份高质量的PRD？',
      category: '专业技能',
      options: [
        { text: '明确背景、目标、用户故事、功能边界和验收标准', score: 10 },
        { text: '描述清楚功能点，让开发能看懂', score: 7 },
        { text: '配合原型图，减少歧义', score: 8 },
        { text: '简洁为主，避免过度设计', score: 7 },
      ],
    },
    {
      text: '如何处理开发说"这个做不了"的情况？',
      category: '跨部门协作',
      options: [
        { text: '深入了解技术限制，一起讨论替代方案', score: 10 },
        { text: '评估用户影响，决定是否坚持', score: 8 },
        { text: '找更高优先级的方案替代', score: 7 },
        { text: '向上级升级，协调资源', score: 6 },
      ],
    },
    {
      text: '你如何衡量产品的成功？',
      category: '数据意识',
      options: [
        { text: '设定可量化的北极星指标，持续追踪核心数据', score: 10 },
        { text: '用户留存和口碑是最重要的', score: 7 },
        { text: '收入增长和业务目标完成情况', score: 8 },
        { text: '用户反馈和满意度调查', score: 7 },
      ],
    },
  ],
  general: [
    {
      text: '你如何快速融入一个新的团队和项目？',
      category: '适应能力',
      options: [
        { text: '主动了解团队文化和项目背景，快速找到能贡献的切入点', score: 10 },
        { text: '先把文档和代码读一遍，再开始工作', score: 8 },
        { text: '多和团队成员沟通，建立信任关系', score: 9 },
        { text: '谦虚学习，完成分配的任务', score: 7 },
      ],
    },
    {
      text: '你对职业发展的规划是？',
      category: '职业规划',
      options: [
        { text: '在专业深度和广度上持续发展，成为领域专家', score: 9 },
        { text: '向技术管理方向发展，带领团队', score: 8 },
        { text: '保持开放，根据机会和兴趣决定', score: 7 },
        { text: '先把当前工作做好，未来再说', score: 5 },
      ],
    },
    {
      text: '当你发现现有流程有很大优化空间时，你会？',
      category: '主动性',
      options: [
        { text: '整理改进方案，主动推动优化落地', score: 10 },
        { text: '提出建议，等待团队讨论', score: 8 },
        { text: '先在自己负责的范围内做改进', score: 7 },
        { text: '等待上级安排', score: 4 },
      ],
    },
    {
      text: '你如何在保证质量的同时快速推进项目？',
      category: '执行力',
      options: [
        { text: '聚焦核心功能，明确验收标准，分阶段交付', score: 10 },
        { text: '做好任务拆分，并行推进', score: 8 },
        { text: '及时同步进展，预警风险', score: 9 },
        { text: '减少返工，第一次就做对', score: 8 },
      ],
    },
    {
      text: '遇到技术难题超过预期时间还未解决，你会？',
      category: '问题解决',
      options: [
        { text: '评估影响，及时同步，寻求帮助或调整方案', score: 10 },
        { text: '加班加点，一定要自己解决', score: 6 },
        { text: '换一个思路，从头来过', score: 7 },
        { text: '向更有经验的人求助', score: 8 },
      ],
    },
    {
      text: '在工作中如何平衡个人贡献和团队协作？',
      category: '团队协作',
      options: [
        { text: '在保证个人产出的同时，主动帮助团队，共同成长', score: 10 },
        { text: '先把自己的事情做好，有余力再帮别人', score: 7 },
        { text: '团队整体目标优先，必要时放下个人任务', score: 8 },
        { text: '看领导怎么分配，执行好自己的职责', score: 6 },
      ],
    },
    {
      text: '你认为成为一名优秀求职者最重要的是什么？',
      category: '自我认知',
      options: [
        { text: '清楚自己的优势和成长方向，能用具体事例证明能力', score: 10 },
        { text: '掌握扎实的专业技能，技术过硬', score: 8 },
        { text: '良好的沟通能力和团队合作精神', score: 8 },
        { text: '有足够的实习和项目经验', score: 7 },
      ],
    },
  ],
};

function detectJobType(parsedJd: ParsedJd): keyof typeof technicalTemplates {
  const text = [parsedJd.title, ...parsedJd.skills, ...parsedJd.responsibilities].join(' ').toLowerCase();
  if (/前端|frontend|react|vue|angular|css|html|ui/.test(text)) return 'frontend';
  if (/后端|backend|java|python|go|node|spring|django|api|数据库|微服务/.test(text)) return 'backend';
  if (/数据|data|bi|分析|挖掘|机器学习|pandas|sql/.test(text)) return 'data';
  if (/产品|product|pm|需求|用户研究|ux/.test(text)) return 'product';
  return 'general';
}

function makeSkillQuestion(skill: string, jobTitle: string, idx: number): { text: string; category: string; options: { text: string; score: number }[] } {
  const variants = [
    {
      text: `在使用 ${skill} 进行开发时，你认为最重要的是？`,
      category: '专业技能',
      options: [
        { text: `深入理解 ${skill} 的核心原理，不仅会用还知道为什么`, score: 10 },
        { text: `熟练掌握 ${skill} 的常用API和最佳实践`, score: 8 },
        { text: `能够用 ${skill} 快速完成业务需求`, score: 7 },
        { text: `配合团队已有的 ${skill} 使用规范`, score: 6 },
      ],
    },
    {
      text: `如果项目要求你从零引入 ${skill}，你会怎么做？`,
      category: '技术决策',
      options: [
        { text: '先做技术调研和风险评估，再制定迁移计划', score: 10 },
        { text: '找一个小功能先试点，验证后推广', score: 9 },
        { text: '参考业内成熟案例，直接应用', score: 7 },
        { text: '组织团队一起学习，边用边摸索', score: 6 },
      ],
    },
    {
      text: `对于 ${jobTitle} 岗位而言，${skill} 的掌握程度应该达到？`,
      category: '专业认知',
      options: [
        { text: '熟练掌握核心特性，能解决实际生产问题，具备调优能力', score: 10 },
        { text: '能独立完成日常开发任务', score: 7 },
        { text: '了解基本概念，能在指导下使用', score: 5 },
        { text: '有相关学习经验，能快速上手', score: 6 },
      ],
    },
  ];
  return variants[idx % variants.length];
}

export function generateQuestions(parsedJd?: ParsedJd): Question[] {
  const questions: Question[] = [];
  const jobTitle = parsedJd?.title || '目标岗位';

  const techSkills = (parsedJd?.skills || [])
    .filter(s => !['综合能力', '快速学习', '团队协作', '沟通能力', '责任心', '执行力', '创新思维', '问题解决', '时间管理', '自我驱动', '抗压能力'].includes(s) && !s.includes('年+'))
    .slice(0, 5);

  const jobType = parsedJd ? detectJobType(parsedJd) : 'general';

  // 1. 软技能题（前12题，打乱顺序）
  const softPool = [...softSkillQuestions].sort(() => Math.random() - 0.5).slice(0, 12);
  softPool.forEach((q, i) => {
    questions.push({
      id: `q_soft_${i}`,
      text: q.text,
      options: q.options.map((o, j) => ({ id: `q_soft_${i}_opt${j}`, text: o.text, score: o.score })),
      category: q.category,
      difficulty: 'easy',
    });
  });

  // 2. JD技能专题题（最多5题）
  techSkills.forEach((skill, i) => {
    const tmpl = makeSkillQuestion(skill, jobTitle, i);
    questions.push({
      id: `q_skill_${i}`,
      text: tmpl.text,
      options: tmpl.options.map((o, j) => ({ id: `q_skill_${i}_opt${j}`, text: o.text, score: o.score })),
      category: tmpl.category,
      difficulty: 'medium',
    });
  });

  // 3. 技术方向题（补足35题）
  const techPool = technicalTemplates[jobType];
  const generalPool = technicalTemplates.general;
  const combined = [...techPool, ...generalPool];
  let idx = 0;
  while (questions.length < 35) {
    const tmpl = combined[idx % combined.length];
    const qIdx = questions.length;
    questions.push({
      id: `q_tech_${qIdx}`,
      text: tmpl.text,
      options: tmpl.options.map((o, j) => ({ id: `q_tech_${qIdx}_opt${j}`, text: o.text, score: o.score })),
      category: tmpl.category,
      difficulty: idx < techPool.length ? 'medium' : 'hard',
    });
    idx++;
  }

  return questions.slice(0, 35);
}
