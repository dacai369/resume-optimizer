import type { AnalysisResult, ParsedJd, ResumeHighlights } from '../types';

function getScoreLabel(ratio: number): string {
  if (ratio >= 0.90) return '优秀';
  if (ratio >= 0.80) return '良好';
  if (ratio >= 0.70) return '中等';
  return '基础';
}

function buildSkillsHighlight(analysis: AnalysisResult, parsedJd: ParsedJd) {
  const techSkills = parsedJd.skills
    .filter(s => !s.includes('年+') && !['沟通能力', '团队协作', '责任心', '执行力', '自我驱动', '快速学习', '创新思维', '问题解决'].includes(s))
    .slice(0, 5);

  const skillDim = analysis.dimensions.find(d => d.name === '专业技能' || d.name === '专业认知' || d.name === '技术决策');
  const ratio = skillDim ? skillDim.score / skillDim.maxScore : 0.75;
  const label = getScoreLabel(ratio);

  if (techSkills.length > 0) {
    const skillStr = techSkills.join('、');
    return {
      category: 'skills' as const,
      title: `核心技术能力 · ${parsedJd.title}`,
      description: `具备${skillStr}等核心技术栈的实际应用能力，技术掌握程度${label}。能在实际项目中灵活运用相关技术解决业务问题，注重代码质量和工程规范。`,
      keywords: techSkills.slice(0, 4),
    };
  }

  return {
    category: 'skills' as const,
    title: '专业技术能力',
    description: `具备扎实的专业基础，技术掌握程度${label}。善于学习新技术，能够快速适应不同技术栈，注重代码质量和最佳实践。`,
    keywords: ['专业技能', '快速学习', '工程规范', '代码质量'],
  };
}

function buildExperienceHighlight(analysis: AnalysisResult, parsedJd: ParsedJd) {
  const respList = parsedJd.responsibilities.slice(0, 2);
  const respText = respList.length > 0
    ? `熟悉${respList[0].substring(0, 20)}等工作场景`
    : '参与完整的项目开发流程';

  const dim = analysis.dimensions.find(d => ['问题解决', '执行力', '需求理解'].includes(d.name));
  const ratio = dim ? dim.score / dim.maxScore : 0.75;
  const execLabel = getScoreLabel(ratio);

  return {
    category: 'experience' as const,
    title: '项目实战经验',
    description: `${respText}，从需求分析、方案设计到开发上线具有完整的参与经验。执行力${execLabel}，能够在明确目标的情况下独立推进任务，按时高质量完成交付。`,
    keywords: ['项目管理', '全流程参与', '需求分析', parsedJd.title],
  };
}

function buildSoftSkillsHighlight(analysis: AnalysisResult) {
  const softDims = analysis.dimensions.filter(d =>
    ['团队协作', '沟通能力', '时间管理', '责任心'].includes(d.name)
  );

  const avgRatio = softDims.length > 0
    ? softDims.reduce((sum, d) => sum + d.score / d.maxScore, 0) / softDims.length
    : 0.75;

  const topSoftSkills = analysis.strengths
    .filter(s => s.includes('协作') || s.includes('沟通') || s.includes('责任') || s.includes('主动'))
    .slice(0, 2);

  const desc = topSoftSkills.length > 0
    ? `${topSoftSkills[0]}，能有效促进团队协作，加速项目推进。`
    : `具备良好的沟通协调能力，在团队合作中能积极发挥作用，推动项目顺利推进。`;

  return {
    category: 'soft-skills' as const,
    title: '团队协作与沟通',
    description: `${desc}善于在多方沟通中寻求共识，软技能综合表现${getScoreLabel(avgRatio)}。`,
    keywords: ['团队协作', '有效沟通', '跨部门配合', '积极主动'],
  };
}

function buildAchievementsHighlight(analysis: AnalysisResult, parsedJd: ParsedJd) {
  const score = analysis.overallScore;
  const level = score >= 85 ? '高度' : score >= 70 ? '良好' : '积极';

  const topStrength = analysis.strengths[0] || '展现出较强的综合素质';
  const reqHighlight = parsedJd.requirements[0]
    ? `符合"${parsedJd.requirements[0].substring(0, 20)}"等核心要求`
    : '与岗位要求高度契合';

  return {
    category: 'achievements' as const,
    title: '综合素质与岗位匹配度',
    description: `与${parsedJd.title}岗位${level}匹配（综合得分 ${score} 分）。${topStrength}。${reqHighlight}，具备在该岗位快速成长的潜力与素质基础。`,
    keywords: [`${parsedJd.title}`, '快速成长', '学习潜力', `${score}分匹配度`],
  };
}

export function generateHighlights(analysis: AnalysisResult, parsedJd: ParsedJd): ResumeHighlights {
  const highlights = [
    buildSkillsHighlight(analysis, parsedJd),
    buildExperienceHighlight(analysis, parsedJd),
    buildSoftSkillsHighlight(analysis),
    buildAchievementsHighlight(analysis, parsedJd),
  ];

  const score = analysis.overallScore;
  const skillStr = parsedJd.skills.filter(s => !s.includes('年+')).slice(0, 3).join('、') || '专业技能';
  const summary = score >= 80
    ? `基于你的答题表现，你与「${parsedJd.title}」岗位匹配度达 ${score} 分，核心优势在于 ${skillStr} 方面的技术积累和良好的综合素质。以下亮点可直接用于简历优化，帮助你在求职过程中脱颖而出。`
    : `基于你的答题表现，你在 ${skillStr} 等核心技能方面展现了基础实力（${score}分），同时具备良好的软技能基础。以下亮点提炼了你的竞争优势，建议结合具体项目经历进一步充实简历内容。`;

  return { highlights, summary };
}
