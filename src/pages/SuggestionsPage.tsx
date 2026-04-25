import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';

const SuggestionsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
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

  const suggestions = [
    {
      title: '学习建议',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
      items: [
        '深入学习岗位相关专业知识',
        '阅读行业相关书籍和文章',
        '参加线上/线下培训课程',
        '关注行业最新动态和趋势'
      ]
    },
    {
      title: '实践建议',
      icon: '🔧',
      color: 'from-green-500 to-emerald-500',
      items: [
        '完成更多相关的模拟练习',
        '尝试做一些个人项目',
        '参与开源项目贡献',
        '寻找实习或兼职机会'
      ]
    },
    {
      title: '技能提升',
      icon: '🚀',
      color: 'from-purple-500 to-indigo-500',
      items: [
        '提升沟通表达能力',
        '学习项目管理方法',
        '培养团队协作能力',
        '提高问题解决能力'
      ]
    }
  ];

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl mb-6 mx-auto animate-pulse shadow-lg`}>
            {job.icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">生成建议中...</h1>
          <p className="text-gray-600">请稍候</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className={`h-3 bg-gradient-to-r ${job.color}`}></div>
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg`}>
                  {job.icon}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">发展建议</h1>
                <p className="text-gray-600">基于你的表现，我们为你准备了以下建议</p>
              </div>

              <div className="space-y-6 mb-8">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className={`w-10 h-10 rounded-lg bg-gradient-to-br ${suggestion.color} flex items-center justify-center text-white`}>
                        {suggestion.icon}
                      </span>
                      {suggestion.title}
                    </h3>
                    <ul className="space-y-3">
                      {suggestion.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                            {itemIndex + 1}
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">推荐学习资源</h3>
                  <p className="text-gray-600">一些可以帮助你提升的资源</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <a
                    href="#"
                    className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-3xl mb-2 block">🎯</span>
                    <h4 className="font-bold text-gray-800">在线课程</h4>
                    <p className="text-sm text-gray-600">Coursera / Udemy</p>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-3xl mb-2 block">📖</span>
                    <h4 className="font-bold text-gray-800">技术博客</h4>
                    <p className="text-sm text-gray-600">掘金 / 知乎</p>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-3xl mb-2 block">👥</span>
                    <h4 className="font-bold text-gray-800">社区交流</h4>
                    <p className="text-sm text-gray-600">GitHub / 微信群</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity shadow-lg"
            >
              重新开始
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-lg"
            >
              查看岗位详情
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 12h8M8 12l4-4m-4 4l4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;
