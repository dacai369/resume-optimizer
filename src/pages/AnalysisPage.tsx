import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, TrendingUp, Briefcase } from 'lucide-react';
import { useAppStore } from '../store';
import { AnalysisChart } from '../components/AnalysisChart';

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? 'from-green-500 to-emerald-500' :
    score >= 70 ? 'from-blue-500 to-teal-500' :
    'from-orange-400 to-amber-500';
  const label =
    score >= 85 ? '高度匹配' :
    score >= 70 ? '良好匹配' :
    '成长空间大';

  return (
    <div className={`flex-shrink-0 inline-flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
      <span className="text-3xl font-bold">{score}</span>
      <span className="text-xs mt-0.5 font-medium opacity-90">{label}</span>
    </div>
  );
}

export function AnalysisPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { session, generateSessionHighlights } = useAppStore();

  React.useEffect(() => {
    if (!session || session.id !== sessionId || !session.analysis) {
      navigate('/');
    }
  }, [session, sessionId, navigate]);

  if (!session || !session.analysis) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  const handleContinue = async () => {
    await generateSessionHighlights(session.id);
    navigate(`/highlights/${session.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>

        {/* 得分概览 */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center gap-5">
          <ScoreBadge score={session.analysis.overallScore} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h1 className="text-2xl font-bold text-gray-800">能力分析报告</h1>
            </div>
            {session.parsedJd && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">目标岗位：{session.parsedJd.title}</span>
              </div>
            )}
            <p className="text-sm text-gray-500 leading-relaxed">{session.analysis.detailedFeedback}</p>
          </div>
        </div>

        {/* 优势 & 提升方向 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">核心优势</h3>
            </div>
            <ul className="space-y-2.5">
              {session.analysis.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">提升方向</h3>
            </div>
            <ul className="space-y-2.5">
              {session.analysis.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 维度图表 */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">各维度表现</h2>
          <AnalysisChart dimensions={session.analysis.dimensions} />
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          查看简历亮点提取 →
        </button>
      </div>
    </div>
  );
}
