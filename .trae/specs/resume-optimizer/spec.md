# 岗位模拟与简历生成 AI 助手 - Product Requirement Document

## Overview
- **Summary**: 为在校大学生提供岗位模拟体验，通过完成真实工作任务生成能力画像和专业简历，帮助他们探索职业方向并证明自己的能力。
- **Purpose**: 解决大学生不了解岗位真实工作、不会判断自己是否适合、不会将优势转化为简历的问题。
- **Target Users**: 还没明确职业方向的在校大学生

## Goals
- 让大学生通过模拟任务体验岗位日常工作
- 基于学生表现生成客观的能力画像
- 自动生成专业且个性化的简历
- 提供清晰的职业发展下一步建议

## Non-Goals (Out of Scope)
- 不提供真实就业机会或内推服务
- 不涉及简历投递或面试辅导
- 不处理财务或支付相关功能
- 不覆盖所有行业和岗位（初期聚焦热门领域）

## Background & Context
- 大学生对职业认知主要来自招聘 JD，缺乏实际工作体验
- 传统简历辅导主要是"帮写"，而非让学生真正理解和证明自己的能力
- 岗位模拟可以让学生在低风险环境下试错和学习
- AI 能力可以提供个性化评估和建议

## Functional Requirements
- **FR-1**: 用户可以选择和浏览岗位列表
- **FR-2**: 系统解析招聘要求并展示岗位关键信息
- **FR-3**: 用户可以查看岗位日常工作内容
- **FR-4**: 用户可以完成模拟工作任务
- **FR-5**: AI 对用户的任务表现进行评分和反馈
- **FR-6**: 系统基于用户表现生成能力画像
- **FR-7**: 系统自动生成专业简历
- **FR-8**: 提供下一步职业发展建议

## Non-Functional Requirements
- **NFR-1**: 界面友好，适合大学生使用
- **NFR-2**: 任务流程流畅，体验感强
- **NFR-3**: AI 响应时间合理（<10秒）
- **NFR-4**: 支持导出简历为 PDF 格式

## Constraints
- **Technical**: React + Supabase 技术栈
- **Business**: 初期免费使用，聚焦用户体验
- **Dependencies**: 需要集成 LLM API 用于任务生成、评分和内容创作

## Assumptions
- 用户有基本的电脑操作能力
- 用户愿意投入时间完成模拟任务
- 模拟任务能有效反映岗位所需能力

## Acceptance Criteria

### AC-1: 岗位选择功能
- **Given**: 用户进入系统
- **When**: 用户浏览岗位列表并选择感兴趣的岗位
- **Then**: 系统显示该岗位的详细信息
- **Verification**: `programmatic`

### AC-2: 岗位信息展示
- **Given**: 用户已选择某个岗位
- **When**: 用户查看岗位详情
- **Then**: 系统展示解析后的招聘要求和日常工作内容
- **Verification**: `human-judgment`

### AC-3: 模拟任务完成
- **Given**: 用户已了解岗位信息
- **When**: 用户完成模拟任务并提交
- **Then**: 系统记录用户的所有行为和答案
- **Verification**: `programmatic`

### AC-4: AI 评分与反馈
- **Given**: 用户已提交模拟任务
- **When**: 系统调用 AI 进行评分
- **Then**: 用户获得详细的评分报告和改进建议
- **Verification**: `human-judgment`

### AC-5: 能力画像生成
- **Given**: 用户已完成模拟任务并获得评分
- **When**: 用户查看能力画像
- **Then**: 系统展示基于表现的能力雷达图和详细分析
- **Verification**: `human-judgment`

### AC-6: 简历生成
- **Given**: 用户已完成能力画像
- **When**: 用户请求生成简历
- **Then**: 系统生成专业简历并支持下载
- **Verification**: `human-judgment`

### AC-7: 发展建议
- **Given**: 用户已获得简历
- **When**: 用户查看下一步建议
- **Then**: 系统提供个性化的学习和发展建议
- **Verification**: `human-judgment`

## Open Questions
- [ ] 初期覆盖哪些岗位？（产品经理、UI 设计师、前端开发、后端开发等）
- [ ] 是否需要用户账号系统？
- [ ] 模拟任务的复杂度如何控制？
