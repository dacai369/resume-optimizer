
export function analyzeResults(questions, answers) {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  const categoryScores = {};
  
  questions.forEach(question => {
    const userAnswerId = answers[question.id];
    if (userAnswerId) {
      const selectedOption = question.options.find(opt => opt.id === userAnswerId);
      if (selectedOption) {
        totalScore += selectedOption.score;
        const maxScoreForQuestion = Math.max(...question.options.map(o => o.score));
        maxPossibleScore += maxScoreForQuestion;
        
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { score: 0, max: 0, count: 0 };
        }
        categoryScores[question.category].score += selectedOption.score;
        categoryScores[question.category].max += maxScoreForQuestion;
        categoryScores[question.category].count++;
      }
    }
  });
  
  const dimensions = Object.entries(categoryScores).map(([name, data]) => ({
    name,
    score: data.score,
    maxScore: data.max,
    description: getDimensionDescription(name)
  }));
  
  const overallScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  const strengths = [
    '展现出良好的问题解决能力',
    '团队协作意识较强',
    '具备学习新事物的潜力',
    '有良好的沟通能力'
  ];
  
  const improvements = [
    '可以在技术深度上继续加强',
    '建议多参与实际项目积累经验',
    '可以提升系统设计能力',
    '持续关注行业发展趋势'
  ];
  
  return {
    overallScore,
    dimensions,
    strengths,
    improvements,
    detailedFeedback: '通过你的答题表现，展现出了良好的综合素质。在多个维度都有不错的表现，建议在技术深度和项目经验上继续加强。'
  };
}

function getDimensionDescription(name) {
  const descriptions = {
    '专业技能': '评估你的专业知识和技术能力',
    '问题解决': '评估你解决问题的思路和方法',
    '团队协作': '评估你在团队中的表现',
    '学习能力': '评估你的学习意愿和方法',
    '沟通能力': '评估你的表达和理解能力',
    '项目经验': '评估你对项目工作的理解'
  };
  return descriptions[name] || '综合能力评估';
}

