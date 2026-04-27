import { ParsedJd } from '../types';

const TECH_SKILLS = [
  'React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust',
  'Node.js', 'Django', 'Flask', 'Spring', 'FastAPI', 'Next.js', 'Nuxt',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'DevOps',
  'Git', 'Linux', 'REST', 'GraphQL', 'Webpack', 'Vite',
  'Figma', 'Photoshop', 'Sketch', 'UI/UX',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
  'Kafka', 'RabbitMQ', 'gRPC', 'Microservices',
  'HTML', 'CSS', 'SASS', 'Tailwind',
];

const SOFT_SKILLS = [
  '沟通能力', '团队协作', '项目管理', '敏捷开发', 'Scrum',
  '快速学习', '责任心', '执行力', '创新思维', '问题解决',
  '时间管理', '自我驱动', '抗压能力',
];

const JOB_TITLE_KEYWORDS = [
  '工程师', '开发', '架构师', '经理', '总监', '设计师', '产品', '运营',
  '分析师', '测试', 'QA', 'PM', '主管', '负责人', 'Leader', '专家',
  'Engineer', 'Developer', 'Designer', 'Manager', 'Analyst',
];

function extractTitle(lines: string[]): string {
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();
    if (line.length > 2 && line.length < 50) {
      const hasKeyword = JOB_TITLE_KEYWORDS.some(k => line.includes(k));
      if (hasKeyword || i === 0) return line;
    }
  }
  return lines[0]?.trim() || '岗位职位';
}

function extractCompany(text: string): string {
  const patterns = [
    /(?:公司|集团|科技|网络|信息|互联网|有限|股份)[^，。\n]{0,10}/,
    /\b[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*\s*(?:Inc|Ltd|Co|Corp|Group)\b/,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[0];
  }
  return '';
}

function extractSkills(text: string): string[] {
  const found: string[] = [];
  for (const skill of TECH_SKILLS) {
    if (text.includes(skill)) found.push(skill);
  }
  for (const skill of SOFT_SKILLS) {
    if (text.includes(skill)) found.push(skill);
  }
  const yearMatch = text.match(/(\d+)\s*年以上?(?:工作|开发|相关)?经验/);
  if (yearMatch) {
    found.push(`${yearMatch[1]}年+经验`);
  }
  return found.length > 0 ? found : ['综合能力', '快速学习', '团队协作'];
}

function extractSections(text: string): { requirements: string[]; responsibilities: string[] } {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const requirementMarkers = ['任职要求', '岗位要求', '资质要求', '职位要求', 'Requirements', '要求'];
  const responsibilityMarkers = ['岗位职责', '工作职责', '工作内容', '主要职责', 'Responsibilities', '职责'];

  let reqSection: string[] = [];
  let respSection: string[] = [];
  let currentSection = '';

  for (const line of lines) {
    const isReqHeader = requirementMarkers.some(m => line.includes(m));
    const isRespHeader = responsibilityMarkers.some(m => line.includes(m));

    if (isReqHeader) { currentSection = 'req'; continue; }
    if (isRespHeader) { currentSection = 'resp'; continue; }

    const cleaned = line.replace(/^[\d\.\-\*\s]+/, '').trim();
    if (cleaned.length < 5) continue;

    if (currentSection === 'req' && reqSection.length < 8) reqSection.push(cleaned);
    else if (currentSection === 'resp' && respSection.length < 8) respSection.push(cleaned);
  }

  if (reqSection.length === 0) {
    reqSection = [
      '具备相关领域的专业知识与技能',
      '拥有良好的沟通能力和团队协作精神',
      '能够独立分析并解决复杂问题',
      '有相关项目实战经验优先',
    ];
  }
  if (respSection.length === 0) {
    respSection = [
      '负责相关业务功能的设计与开发实现',
      '参与技术方案的调研、讨论与落地',
      '持续优化产品性能与用户体验',
      '与产品、设计及其他团队密切配合',
    ];
  }

  return { requirements: reqSection, responsibilities: respSection };
}

function extractEducation(text: string): string {
  if (text.includes('博士')) return '博士';
  if (text.includes('硕士')) return '硕士';
  if (text.includes('本科') || text.includes('大学本科')) return '本科';
  if (text.includes('大专') || text.includes('专科')) return '大专';
  return '';
}

function extractExperience(text: string): string {
  const m = text.match(/(\d+)\s*[-~～]\s*(\d+)\s*年|(\d+)\s*年以上?/);
  if (m) {
    if (m[1] && m[2]) return `${m[1]}-${m[2]}年经验`;
    if (m[3]) return `${m[3]}年以上经验`;
  }
  return '';
}

export function parseJd(jdText: string): ParsedJd {
  const lines = jdText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const title = extractTitle(lines);
  const company = extractCompany(jdText);
  const skills = extractSkills(jdText);
  const { requirements, responsibilities } = extractSections(jdText);
  const education = extractEducation(jdText);
  const experience = extractExperience(jdText);

  return {
    title,
    company,
    requirements,
    responsibilities,
    skills,
    education,
    experience,
    description: jdText.substring(0, 300) + (jdText.length > 300 ? '...' : ''),
  };
}
