export interface Task {
  id: string;
  jobId: string;
  title: string;
  description: string;
  questions: TaskQuestion[];
}

export interface TaskQuestion {
  id: string;
  type: 'text' | 'multiple-choice';
  question: string;
  options?: string[];
  placeholder?: string;
}

export const tasks: Task[] = [
  {
    id: 'pm-task-1',
    jobId: 'product-manager',
    title: '产品需求分析',
    description: '假设你是一名产品经理，请分析以下场景并回答问题。',
    questions: [
      {
        id: 'q1',
        type: 'text',
        question: '场景：公司计划开发一款面向大学生的时间管理 APP。作为产品经理，请简述你的产品定位和核心价值主张。',
        placeholder: '请输入你的分析...'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: '在产品初期，你认为最重要的功能是什么？',
        options: [
          '课程表同步',
          '任务清单与提醒',
          '学习时间统计',
          '社交分享功能'
        ]
      },
      {
        id: 'q3',
        type: 'text',
        question: '请简述你会如何验证这个产品 idea 的可行性？',
        placeholder: '请输入你的验证方案...'
      }
    ]
  },
  {
    id: 'ui-task-1',
    jobId: 'ui-designer',
    title: '移动端界面设计',
    description: '请根据以下需求，回答关于 UI 设计的问题。',
    questions: [
      {
        id: 'q1',
        type: 'text',
        question: '为一款美食点评 APP 设计首页，你会如何布局主要内容区域？请描述你的设计思路。',
        placeholder: '请输入你的设计思路...'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: '在移动端设计中，你认为最重要的设计原则是什么？',
        options: [
          '视觉美观性',
          '操作便捷性',
          '信息层级清晰',
          '品牌一致性'
        ]
      },
      {
        id: 'q3',
        type: 'text',
        question: '如果让你为这款 APP 选择主色调，你会选择什么颜色？为什么？',
        placeholder: '请输入颜色选择及理由...'
      }
    ]
  },
  {
    id: 'fe-task-1',
    jobId: 'frontend-developer',
    title: '前端组件开发',
    description: '请回答以下关于前端开发的问题。',
    questions: [
      {
        id: 'q1',
        type: 'text',
        question: '请简述 React 中 useState 和 useEffect 的作用，并各举一个使用场景。',
        placeholder: '请输入你的答案...'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: '以下哪种方案最适合实现高性能的长列表渲染？',
        options: [
          '普通渲染所有元素',
          '虚拟滚动（Virtual Scrolling）',
          '分页加载',
          '无限滚动'
        ]
      },
      {
        id: 'q3',
        type: 'text',
        question: '你会如何优化一个首屏加载时间较长的 Web 应用？请至少列举 3 种优化方案。',
        placeholder: '请输入你的优化方案...'
      }
    ]
  },
  {
    id: 'be-task-1',
    jobId: 'backend-developer',
    title: '系统设计与 API 开发',
    description: '请回答以下关于后端开发的问题。',
    questions: [
      {
        id: 'q1',
        type: 'text',
        question: '请简述 RESTful API 的设计原则，并举例说明。',
        placeholder: '请输入你的答案...'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: '在高并发场景下，你会优先选择哪种缓存策略？',
        options: [
          '本地缓存',
          'Redis 分布式缓存',
          '数据库查询缓存',
          'CDN 缓存'
        ]
      },
      {
        id: 'q3',
        type: 'text',
        question: '设计一个用户登录系统，你会考虑哪些安全因素？请至少列举 3 点。',
        placeholder: '请输入安全考虑因素...'
      }
    ]
  }
];
