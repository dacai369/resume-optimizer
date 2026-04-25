export interface Job {
  id: string;
  name: string;
  icon: string;
  description: string;
  salary: string;
  industry: string;
  requirements: string[];
  dailyTasks: string[];
  color: string;
}

export const jobs: Job[] = [
  {
    id: 'product-manager',
    name: '产品经理',
    icon: '📱',
    description: '负责产品规划、需求分析和项目管理，是连接用户、技术和商业的桥梁',
    salary: '15-30K',
    industry: '互联网',
    requirements: [
      '具备良好的逻辑思维和分析能力',
      '熟悉用户体验设计',
      '能够撰写清晰的需求文档',
      '具备跨部门沟通协调能力'
    ],
    dailyTasks: [
      '用户调研与需求分析',
      '撰写产品需求文档（PRD）',
      '与开发团队协作跟进项目进度',
      '数据分析与产品迭代'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ui-designer',
    name: 'UI 设计师',
    icon: '🎨',
    description: '专注于用户界面设计，创造美观且易用的数字产品体验',
    salary: '12-25K',
    industry: '设计',
    requirements: [
      '精通 Figma、Sketch 等设计工具',
      '具备良好的审美能力',
      '了解用户体验设计原则',
      '能够制作高保真原型'
    ],
    dailyTasks: [
      '界面设计与视觉规范制定',
      '制作设计稿和原型',
      '与开发团队对接设计交付',
      '参与用户测试与设计迭代'
    ],
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'frontend-developer',
    name: '前端开发',
    icon: '💻',
    description: '负责 Web 应用的前端开发，将设计转化为可交互的用户界面',
    salary: '15-35K',
    industry: '技术',
    requirements: [
      '精通 HTML、CSS、JavaScript',
      '熟悉 React/Vue 等前端框架',
      '了解响应式设计和性能优化',
      '具备良好的代码规范意识'
    ],
    dailyTasks: [
      '页面组件开发与维护',
      '实现交互效果和动画',
      '与后端对接 API 接口',
      '代码审查与性能优化'
    ],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'backend-developer',
    name: '后端开发',
    icon: '⚙️',
    description: '负责服务端开发，构建稳定、高效的系统架构和 API',
    salary: '18-40K',
    industry: '技术',
    requirements: [
      '精通至少一门后端语言（Java/Go/Python/Node.js）',
      '熟悉数据库设计和优化',
      '了解分布式系统和微服务',
      '具备良好的系统设计能力'
    ],
    dailyTasks: [
      'API 接口设计与开发',
      '数据库设计与优化',
      '系统架构设计与实现',
      '线上问题排查与性能优化'
    ],
    color: 'from-green-500 to-emerald-500'
  }
];
