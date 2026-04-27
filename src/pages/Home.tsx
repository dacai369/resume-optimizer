import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Target, BarChart2, Star } from 'lucide-react';
import { useAppStore } from '../store';

const SAMPLE_JD = `前端开发工程师（应届/实习）

岗位职责：
1. 参与公司核心产品的前端开发与维护
2. 与产品、设计团队协作，快速实现高质量的产品功能
3. 持续优化前端性能与用户体验
4. 参与技术方案讨论，推动前端工程化建设

任职要求：
1. 本科及以上学历，计算机相关专业优先
2. 熟练掌握 React 或 Vue，有实际项目经验
3. 熟悉 TypeScript、HTML5、CSS3
4. 了解 Node.js、Webpack/Vite 等工具
5. 具备良好的沟通能力和团队协作精神
6. 有开源项目经验或个人作品集者优先`;

const steps = [
  { icon: FileText, label: '粘贴 JD', desc: '复制招聘描述' },
  { icon: Target, label: '完成测评', desc: '35 道专属题目' },
  { icon: BarChart2, label: '能力报告', desc: '多维度评估' },
  { icon: Star, label: '简历亮点', desc: '即拿即用素材' },
];

export function Home() {
  const [jdText, setJdText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { createSession, parseJd, generateQuestions } = useAppStore();

  const handleSubmit = async () => {
    if (!jdText.trim() || isProcessing) return;
    setIsProcessing(true);
    try {
      const newSession = createSession(jdText);
      await parseJd(newSession.id);
      await generateQuestions(newSession.id);
      navigate(`/questions/${newSession.id}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 max-w-3xl pt-14 pb-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            AI 驱动 · 专为大学生求职设计
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            用 JD 驱动能力评测
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              30 分钟读懂你的竞争力
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            粘贴招聘 JD → 完成 35 道测评 → 获得专属能力报告 + 可直接使用的简历亮点
          </p>
        </div>

        {/* 步骤导引 */}
        <div className="flex items-start justify-center gap-2 mb-10">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center w-20">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                  i === 0
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-400 shadow-sm'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-gray-700">{step.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-5 text-gray-200 font-light text-lg">→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* JD 输入卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
            <FileText className="w-5 h-5 text-blue-600" />
            粘贴招聘 JD
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder={`在这里粘贴完整的招聘 JD...\n\n支持各类格式，内容越完整，分析越准确。`}
            className="w-full h-56 p-4 border-2 border-gray-100 rounded-xl resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 text-sm leading-relaxed"
          />

          <div className="flex items-center justify-between mt-3 mb-5">
            <button
              onClick={() => setJdText(SAMPLE_JD)}
              className="text-blue-500 hover:text-blue-600 text-sm underline underline-offset-2 transition-colors"
            >
              使用示例 JD 体验一下
            </button>
            <span className="text-xs text-gray-400">
              {jdText.length > 0 ? `已输入 ${jdText.length} 字` : '建议粘贴完整 JD，分析更准确'}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!jdText.trim() || isProcessing}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                正在解析 JD 并生成专属题目...
              </span>
            ) : (
              '开始能力评测 →'
            )}
          </button>
        </div>

        {/* 价值卡片 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { emoji: '🎯', title: 'JD 驱动，精准评测', desc: '题目根据岗位要求动态生成，覆盖专业技能与软技能' },
            { emoji: '📊', title: '多维能力图谱', desc: '6+ 能力维度评分，清晰看到你的优势和提升方向' },
            { emoji: '✨', title: '即用型简历素材', desc: '根据评测自动提炼亮点，直接复制到简历中使用' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="font-semibold text-gray-800 text-sm mb-1">{item.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          数据仅用于生成本次报告，不保存个人信息
        </p>
      </div>
    </div>
  );
}
