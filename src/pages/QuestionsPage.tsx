
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressIndicator } from '../components/ProgressIndicator';

export function QuestionsPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { session, submitAnswer, analyzeSessionResults } = useAppStore();
  
  if (!session || session.id !== sessionId) {
    navigate('/');
    return null;
  }
  
  const answeredCount = Object.keys(session.answers).length;
  const totalCount = session.questions.length;
  const allAnswered = answeredCount > 0 && totalCount > 0;
  
  const handleSubmit = async () => {
    await analyzeSessionResults(session.id);
    navigate(`/analysis/${session.id}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            能力评估问卷
          </h1>
          <p className="text-gray-600 mb-4">
            请根据你的真实想法回答以下题目
          </p>
          <ProgressIndicator
            current={answeredCount}
            total={totalCount}
            label="答题进度"
          />
        </div>
        
        <div className="space-y-2 mb-8">
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
        
        <div className="sticky bottom-8">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-4 rounded-xl shadow-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              allAnswered
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            提交答案并查看分析
            {!allAnswered && ` (${totalCount - answeredCount}题未完成)`}
          </button>
        </div>
      </div>
    </div>
  );
}

