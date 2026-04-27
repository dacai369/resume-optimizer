import type { Question, AnalysisResult, ParsedJd } from '../types';

const categoryDescriptions: Record<string, string> = {
  '团队协作': '在团队中的沟通与协作表现',
  '时间管理': '任务优先级判断和时间规划能力',
  '学习能力': '面对新知识的学习意愿与方法',
  '问题解决': '分析和解决复杂问题的思路',
  '工作风格': '工作方式与习惯偏好',
  '沟通能力': '信息表达与沟通反馈能力',
  '专业素养': '职业态度和专业标准意识',
  '需求理解': '对需求的理解与梳理能力',
  '责任心': '对自己工作的负责程度',
  '工作态度': '对工作本身的认知与态度',
  '专业技能': '核心专业技术能力',
  '技术决策': '技术方案的评估与选择能力',
  '专业认知': '对所在领域的认知深度',
  '系统设计': '系统架构和设计思维',
  '沟通表达': '信息传递与表达效果',
  '协作能力': '与其他角色的协同工作能力',
  '产品思维': '以用户和业务为中心的思考方式',
  '数据意识': '用数据驱动决策的能力',
  '跨部门协作': '与不同团队的协调与合作',
  '适应能力': '快速融入新环境的能力',
  '职业规划': '对自身职业路径的思考',
  '主动性': '主动发现并推动改进的意愿',
  '执行力': '把计划落实为行动的能力',
  '自我认知': '对自身优势和特点的了解',
  '综合能力': '综合素质的整体表现',
};

const strengthMap: Record<string, string> = {
  '团队协作': '团队协作能力突出，善于推动共识，是团队的粘合剂',
  '学习能力': '学习意愿强烈，掌握高效学习方法，能快速适应新挑战',
  '问题解决': '具备系统性问题分析能力，能冷静应对复杂情况',
  '沟通能力': '沟通表达清晰，善于倾听和反馈，建立良好的协作关系',
  '责任心': '责任感强，能第一时间响应和处理问题，值得信赖',
  '专业技能': '专业技术扎实，理解深入，能独当一面',
  '执行力': '执行力强，能将计划有效落地，高效完成目标',
  '主动性': '主动发现问题，积极推动改进，具备强烈的自驱力',
  '时间管理': '时间规划能力强，能合理分配精力，高效完成多任务',
  '专业素养': '专业素养高，重视代码质量和文档规范',
  '需求理解': '需求理解能力强，善于提前澄清疑点，减少返工',
};

const improvementMap: Record<string, string> = {
  '团队协作': '建议多主动分享想法，在团队讨论中发挥更积极的作用',
  '学习能力': '建议建立系统的学习计划，多参与实战项目积累经验',
  '问题解决': '建议练习结构化分析，先明确问题本质再寻找方案',
  '沟通能力': '建议多练习清晰表达，学习如何高效传递信息',
  '责任心': '建议培养主动汇报进展的习惯，提升团队信任度',
  '专业技能': '建议加深专业技术学习，从会用到理解底层原理',
  '时间管理': '建议使用任务优先级矩阵，提升时间管理效率',
  '专业素养': '建议重视技术文档和代码规范，提升长期可维护性',
};

export function analyzeResults(
  questions: Question[],
  answers: Record<string, string>,
  parsedJd?: ParsedJd
): AnalysisResult {
  let totalScore = 0;
  let maxPossibleScore = 0;
  const categoryScores: Record<string, { score: number; max: number; count: number }> = {};

  questions.forEach(question => {
    const userAnswerId = answers[question.id];
    if (!userAnswerId) return;
    const selectedOption = question.options.find(opt => opt.id === userAnswerId);
    if (!selectedOption) return;

    const maxForQ = Math.max(...question.options.map(o => o.score));
    totalScore += selectedOption.score;
    maxPossibleScore += maxForQ;

    if (!categoryScores[question.category]) {
      categoryScores[question.category] = { score: 0, max: 0, count: 0 };
    }
    categoryScores[question.category].score += selectedOption.score;
    categoryScores[question.category].max += maxForQ;
    categoryScores[question.category].count++;
  });

  const overallScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

  const dimensions = Object.entries(categoryScores)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, data]) => ({
      name,
      score: data.score,
      maxScore: data.max,
      description: categoryDescriptions[name] || '综合能力评估',
    }));

  const strengths: string[] = [];
  const improvements: string[] = [];

  // 按得分率排序，提取优势（>= 85%）和待提升项（< 65%）
  const sorted = Object.entries(categoryScores)
    .map(([cat, data]) => ({ cat, ratio: data.score / data.max }))
    .sort((a, b) => b.ratio - a.ratio);

  sorted.forEach(({ cat, ratio }) => {
    if (ratio >= 0.85 && strengthMap[cat] && strengths.length < 4) {
      strengths.push(strengthMap[cat]);
    }
  });
  sorted.slice().reverse().forEach(({ cat, ratio }) => {
    if (ratio < 0.65 && improvementMap[cat] && improvements.length < 4) {
      improvements.push(improvementMap[cat]);
    }
  });

  const defaultStrengths = [
    '展现出积极的学习意愿和良好的职业素养',
    '有较强的问题意识，能主动思考解决方案',
    '具备良好的团队合作基础，沟通态度积极',
  ];
  const defaultImprovements = [
    '建议积累更多实战项目经验，让简历内容更有说服力',
    '可进一步加强技术深度，对核心技能做到原理级理解',
    '持续关注行业动态，建立个人知识体系',
  ];
  while (strengths.length < 3) strengths.push(defaultStrengths[strengths.length]);
  while (improvements.length < 3) improvements.push(defaultImprovements[improvements.length]);

  const jobTitle = parsedJd?.title || '目标岗位';
  const skillList = (parsedJd?.skills || [])
    .filter(s => !s.includes('年+'))
    .slice(0, 3)
    .join('、') || '相关专业技能';

  let detailedFeedback = '';
  if (overallScore >= 85) {
    detailedFeedback = `综合来看，你与${jobTitle}岗位的匹配度很高（${overallScore}分）。答题表现出色，在多个核心维度都有亮眼发挥。建议在简历中重点突出${skillList}方面的实战经验，并配合具体项目数据和成果，这将大幅提升你的竞争力。`;
  } else if (overallScore >= 70) {
    detailedFeedback = `综合来看，你与${jobTitle}岗位有较好的匹配基础（${overallScore}分）。多数维度表现稳定，部分方面还有提升空间。建议重点打磨${skillList}相关的实践经验，通过项目案例来证明自己的能力，让简历内容更有说服力。`;
  } else {
    detailedFeedback = `综合来看，你与${jobTitle}岗位还有一定差距（${overallScore}分），但这也意味着成长空间很大。建议聚焦${skillList}的系统学习，同时通过参与实际项目补充实战经验。在求职过程中，展示你的学习能力和成长潜力同样是重要竞争力。`;
  }

  return { overallScore, dimensions, strengths, improvements, detailedFeedback };
}
