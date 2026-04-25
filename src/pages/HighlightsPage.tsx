
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCcw, Copy } from 'lucide-react';
import { useAppStore } from '../store';
import { HighlightCard } from '../components/HighlightCard';

export function HighlightsPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { session, resetSession } = useAppStore();
  const [allCopied, setAllCopied] = useState(false);
  
  useEffect(() => {
    if (!session || session.id !== sessionId || !session.highlights) {
      navigate('/');
    }
  }, [session, sessionId, navigate]);
  
  if (!session || !session.highlights) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }
  
  const handleRestart = () => {
    resetSession();
    navigate('/');
  };
  
  const handleCopyAll = () => {
    const allText = session.highlights!.highlights
      .map(h => `${h.title}:\n${h.description}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(allText).then(() => {
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2000);
    });
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                简历亮点提取完成！
              </h1>
              <p className="text-gray-600">
                以下是根据你的答题生成的简历亮点，可直接复制使用
              </p>
            </div>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              {allCopied ? '已全部复制' : '复制全部'}
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
            <p className="text-gray-700 leading-relaxed">
              {session.highlights.summary}
            </p>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {session.highlights.highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              highlight={highlight}
              index={index}
            />
          ))}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-700 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
}

