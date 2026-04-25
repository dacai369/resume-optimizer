import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';

const ResumePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
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

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl mb-6 mx-auto animate-pulse shadow-lg`}>
            {job.icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">生成简历中...</h1>
          <p className="text-gray-600">请稍候</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className={`h-3 bg-gradient-to-r ${job.color}`}></div>
            
            {/* 简历内容 */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${job.color} flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg`}>
                  {job.icon}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">张三</h1>
                <p className="text-xl text-gray-600 mb-4">{job.name}</p>
                <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <span>📧</span>
                    zhangsan@example.com
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📱</span>
                    138-0000-0000
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📍</span>
                    北京市
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center text-white text-sm`}>👤</span>
                  个人简介
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  对{job.name}岗位有浓厚兴趣，通过岗位模拟任务对该岗位工作内容有了深入了解。具备良好的学习能力和团队协作精神，逻辑思维清晰，表达能力良好。希望能在相关领域发展，贡献自己的力量。
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center text-white text-sm`}>💪</span>
                  专业技能
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {job.requirements.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center text-white text-sm`}>📝</span>
                  项目经历
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800">岗位模拟任务</h3>
                    <p className="text-gray-500 mb-2">2024年</p>
                    <p className="text-gray-600">
                      完成了{job.name}岗位的模拟任务，包括需求分析、方案设计等环节，获得了AI评分78分。通过该任务深入了解了岗位日常工作内容。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center text-white text-sm`}>🎓</span>
                  教育背景
                </h2>
                <div>
                  <h3 className="font-bold text-gray-800">某某大学</h3>
                  <p className="text-gray-500 mb-2">2020年 - 2024年</p>
                  <p className="text-gray-600">计算机科学与技术 | 本科</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity shadow-lg"
              onClick={() => window.print()}
            >
              下载/打印简历
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
            <button
              onClick={() => navigate(`/suggestions/${job.id}`)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-lg"
            >
              查看发展建议
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

export default ResumePage;
