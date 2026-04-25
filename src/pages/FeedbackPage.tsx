import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';

const FeedbackPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // 模拟 AI 评分过程
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">页面未找到</h1>
          <Link 
            to="/" 
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const mockFeedback = {
    score: 78,
    strengths: [
      '逻辑思维清晰，分析问题有条理',
      '对岗位工作内容有基本了解',
      '表达能力良好'
    ],
    improvements: [
      '建议深入理解用户需求',
      '需要更多实践经验',
      '建议学习相关工具使用'
    ]
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl mb-6 mx-auto animate-pulse shadow-lg`}>
            {job.icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI 正在评分中...</h1>
          <p className="text-gray-600">请稍候，我们正在分析你的答案</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className={`h-3 bg-gradient-to-r ${job.color}`}></div>
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-5xl mb-6 mx-auto shadow-lg`}>
                {job.icon}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">评分完成！</h1>
              <p className="text-gray-600">以下是对你表现的详细分析</p>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                    <circle cx="80" cy="80" r="70" stroke="url(#gradient)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={`${mockFeedback.score * 4.4} 440`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-5xl font-bold text-gray-800">{mockFeedback.score}</span>
                    <span className="text-gray-500">分</span>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">综合评分</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">👍</span>
                  优势
                </h3>
                <ul className="space-y-3">
                  {mockFeedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-green-800">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">💡</span>
                  改进建议
                </h3>
                <ul className="space-y-3">
                  {mockFeedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">→</span>
                      <span className="text-orange-800">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate(`/profile/${job.id}`)}
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r ${job.color} hover:opacity-90 transition-opacity shadow-lg`}
              >
                查看能力画像
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 12h8M8 12l4-4m-4 4l4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
