
const questionTemplates = {
  technical: [
    {
      base: "在{topic}项目中，你更倾向于采用哪种设计模式？",
      options: [
        { text: "根据具体需求灵活选择，追求可维护性", score: 10 },
        { text: "使用自己熟悉的模式，提高开发效率", score: 7 },
        { text: "遵循团队约定的模式，保持一致性", score: 8 },
        { text: "尝试最新的模式，探索新技术", score: 6 }
      ]
    },
    {
      base: "面对复杂的{topic}问题，你的解决思路是？",
      options: [
        { text: "先理解问题本质，再设计解决方案", score: 10 },
        { text: "参考类似问题的解决方案", score: 7 },
        { text: "快速原型验证，边做边调整", score: 8 },
        { text: "寻求他人帮助，共同讨论", score: 6 }
      ]
    }
  ],
  softSkills: [
    {
      base: "在团队协作中，你的工作风格是？",
      options: [
        { text: "积极沟通，确保信息同步", score: 10 },
        { text: "独立完成自己的任务，减少依赖", score: 7 },
        { text: "主动帮助团队成员，共同进步", score: 9 },
        { text: "跟随团队节奏，完成分配的工作", score: 6 }
      ]
    },
    {
      base: "面对紧急的工作任务，你会？",
      options: [
        { text: "优先处理关键部分，确保质量", score: 10 },
        { text: "快速完成，先交付再优化", score: 7 },
        { text: "协调资源，寻求支持", score: 8 },
        { text: "延长工作时间确保按时完成", score: 6 }
      ]
    }
  ],
  problemSolving: [
    {
      base: "遇到技术难题时，你的第一反应是？",
      options: [
        { text: "查阅文档和资料，系统性分析", score: 10 },
        { text: "先尝试几种可能的解决方案", score: 7 },
        { text: "向有经验的人请教", score: 8 },
        { text: "暂时跳过，先做其他部分", score: 5 }
      ]
    }
  ]
};

const topics = ['软件开发', '项目管理', '产品设计', '数据分析', '系统架构'];
const categories = ['专业技能', '问题解决', '团队协作', '学习能力', '沟通能力', '项目经验'];

export function generateQuestions() {
  const questions = [];
  
  for (let i = 0; i < 35; i++) {
    const category = categories[i % categories.length];
    const difficulty = i < 12 ? 'easy' : (i < 24 ? 'medium' : 'hard');
    
    let template;
    if (category === '专业技能' || category === '问题解决') {
      template = questionTemplates.technical[i % questionTemplates.technical.length];
    } else {
      template = questionTemplates.softSkills[i % questionTemplates.softSkills.length];
    }
    
    const topic = topics[i % topics.length];
    
    const options = template.options.map((opt, idx) => ({
      id: `q${i}_opt${idx}`,
      text: opt.text,
      score: opt.score
    }));
    
    questions.push({
      id: `question_${i}`,
      text: template.base.replace('{topic}', topic),
      options: options,
      category: category,
      difficulty: difficulty
    });
  }
  
  return questions;
}

