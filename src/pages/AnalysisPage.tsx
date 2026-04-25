
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store';
import { AnalysisChart } from '../components/AnalysisChart';

export function AnalysisPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { session, generateSessionHighlights } = useAppStore();
  
  useEffect(() => {
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
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                能力分析报告
              </h1>
              <p className="text-gray-600">
                你的综合得分：{session.analysis.overallScore}分
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">核心优势</h3>
            </div>
            <ul className="space-y-2">
              {session.analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800">提升方向</h3>
            </div>
            <ul className="space-y-2">
              {session.analysis.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            各维度表现
          </h2>
          <AnalysisChart dimensions={session.analysis.dimensions} />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h3 className="font-semibold text-gray-800 mb-3">详细评语</h3>
          <p className="text-gray-600 leading-relaxed">
            {session.analysis.detailedFeedback}
          </p>
        </div>
        
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          查看简历亮点 →
        </button>
      </div>
    </div>
  );
}

