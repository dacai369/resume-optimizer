
export function parseJd(jdText) {
  const lines = jdText.split('\n').filter(line => line.trim().length > 0);
  
  let title = '未知职位';
  let company = '未知公司';
  
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (firstLine.includes('工程师') || firstLine.includes('经理') || firstLine.includes('设计师') || firstLine.includes('开发')) {
      title = firstLine;
    }
  }
  
  const skillKeywords = ['React', 'Vue', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'Go', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Figma', 'Photoshop', '敏捷', '项目管理', '沟通能力', '团队协作'];
  const foundSkills = skillKeywords.filter(skill => jdText.includes(skill));
  
  const requirements = [
    '具备相关领域的专业知识',
    '拥有良好的沟通能力和团队协作精神',
    '能够独立解决问题',
    '有相关项目经验优先'
  ];
  
  const responsibilities = [
    '负责相关业务功能的设计与开发',
    '参与技术方案的讨论与制定',
    '持续优化产品性能和用户体验',
    '与产品、设计等团队密切配合'
  ];
  
  return {
    title: title,
    company: company,
    requirements: requirements,
    responsibilities: responsibilities,
    skills: foundSkills.length > 0 ? foundSkills : ['综合能力', '专业技能', '软技能'],
    description: jdText.substring(0, 200) + (jdText.length > 200 ? '...' : '')
  };
}

