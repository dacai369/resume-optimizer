
export function generateHighlights(analysis, parsedJd) {
  const highlights = [];
  
  highlights.push({
    category: 'skills',
    title: '专业技能',
    description: '具备扎实的专业基础，能够快速学习和掌握新技术。在相关领域有一定的实践经验。',
    keywords: parsedJd.skills.length > 0 ? parsedJd.skills : ['学习能力', '问题解决', '团队协作']
  });
  
  highlights.push({
    category: 'experience',
    title: '项目实践',
    description: '具有项目开发和管理的理解，能够参与项目的全流程，从需求分析到上线交付。',
    keywords: ['项目管理', '需求分析', '开发流程', '质量把控']
  });
  
  highlights.push({
    category: 'soft-skills',
    title: '软技能',
    description: '良好的沟通协调能力，团队合作意识强，能够在团队中发挥积极作用。',
    keywords: ['沟通能力', '团队协作', '问题解决', '学习能力']
  });
  
  highlights.push({
    category: 'achievements',
    title: '能力特质',
    description: '展现出快速学习和适应能力，具有强烈的责任心和执行力，能够持续改进和优化工作。',
    keywords: ['快速学习', '责任心', '执行力', '持续改进']
  });
  
  const summary = '基于你的表现，展现出了成为优秀专业人才的潜力。你在团队协作、问题解决等方面都有不错的表现，建议在技术深度和项目经验上继续积累。';
  
  return {
    highlights,
    summary
  };
}

