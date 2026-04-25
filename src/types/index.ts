
// 会话状态
export interface Session {
  id: string;
  jdText: string;
  parsedJd?: ParsedJd;
  questions: Question[];
  answers: Record<string, string>;
  analysis?: AnalysisResult;
  highlights?: ResumeHighlights;
  status: 'idle' | 'parsing' | 'generating' | 'answering' | 'analyzing' | 'complete';
}

// 解析后的JD
export interface ParsedJd {
  title: string;
  company: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  description: string;
}

// 题目类型
export interface Question {
  id: string;
  text: string;
  options: Option[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// 选项类型
export interface Option {
  id: string;
  text: string;
  score: number; // 用于评分
}

// 能力维度得分
export interface DimensionScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

// 分析结果
export interface AnalysisResult {
  overallScore: number;
  dimensions: DimensionScore[];
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
}

// 简历亮点
export interface ResumeHighlight {
  category: 'skills' | 'experience' | 'soft-skills' | 'achievements';
  title: string;
  description: string;
  keywords: string[];
}

export interface ResumeHighlights {
  highlights: ResumeHighlight[];
  summary: string;
}

