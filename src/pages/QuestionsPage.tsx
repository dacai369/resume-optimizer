import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Briefcase } from 'lucide-react';
import { useAppStore } from '../store';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressIndicator } from '../components/ProgressIndicator';

export function QuestionsPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { session, submitAnswer, analyzeSessionResults } = useAppStore();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session || session.id !== sessionId) {
      navigate('/');
    }
  }, [session, sessionId, navigate]);

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  const answeredCount = Object.keys(session.answers).length;
  const totalCount = session.questions.length;
  const allAnswered = answeredCount === totalCount && totalCount > 0;
  const remaining = totalCount - answeredCount;

  const handleSubmit = async () => {
    if (!allAnswered) return;
    await analyzeSessionResults(session.id);
    navigate(`/analysis/${session.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div ref={topRef} className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>

        {/* 岗位标题 */}
        {session.parsedJd && (
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm mb-6 flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <span className="text-sm text-gray-500">正在评估岗位：</span>
              <span className="font-semibold text-gray-800 ml-1">{session.parsedJd.title}</span>
              {session.parsedJd.skills.length > 0 && (
                <span className="ml-2 text-xs text-gray-400">
                  · {session.parsedJd.skills.filter(s => !s.includes('年+')).slice(0, 3).join(' / ')}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">能力评估问卷</h1>
          <p className="text-gray-500 mb-4">根据你的真实情况作答，结果将用于提取简历亮点</p>
          <ProgressIndicator current={answeredCount} total={totalCount} label="答题进度" />
        </div>

        <div className="space-y-2 mb-24">
          {session.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedOptionId={session.answers[question.id]}
              onSelect={(optionId) => submitAnswer(session.id, question.id, optionId)}
              index={index}
            />
          ))}
        </div>

        {/* 悬浮提交栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-100 px-4 py-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                allAnswered
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {allAnswered
                ? '提交答案，查看能力分析 →'
                : `还有 ${remaining} 题未作答`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
