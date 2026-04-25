# 简历优化 - JD智能分析与亮点提取

一个将招聘JD转化为可体验的岗位模拟平台，帮助学生证明自己适合什么岗位，并自动提取简历亮点。

## 功能特性

- 📋 **JD输入与解析**：支持粘贴招聘JD或使用示例JD
- 🧠 **智能题目生成**：根据JD内容自动生成35道选择题
- 📊 **能力分析**：详细的能力维度评估报告
- ✨ **简历亮点提取**：根据答题结果自动提取简历亮点
- 🔧 **API自定义**：支持mock和real两种模式，可灵活配置
- 🚀 **自动部署**：通过 GitHub Actions 自动部署到 GitHub Pages

## 技术栈

- **前端框架**：React + TypeScript + Vite
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **路由**：React Router DOM
- **图标**：Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 部署到GitHub Pages

```bash
npm run deploy:build
```

## 使用说明

### 1. 输入JD
- 在首页粘贴招聘JD或使用示例JD
- 点击"开始答题"按钮

### 2. 完成答题
- 回答35道选择题
- 系统会自动保存答案

### 3. 查看分析
- 答题完成后，查看详细的能力分析报告

### 4. 提取亮点
- 系统会根据分析结果提取简历亮点
- 可以直接复制使用

## API配置

### 环境变量

创建 `.env` 文件并配置以下变量：

```env
# API模式：'mock' 或 'real'
VITE_API_MODE=mock

# 真实API基础URL（仅在VITE_API_MODE=real时需要）
VITE_API_BASE_URL=https://your-api-server.com
```

### 在应用中配置

- 打开应用首页
- 点击"API配置"按钮
- 选择API模式
- 输入API基础URL（真实模式时）
- 点击"保存配置"

## 项目结构

```
简历优化/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！
