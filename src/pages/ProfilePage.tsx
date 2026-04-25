import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';

const ProfilePage = () => {
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

  const abilities = [
    { name: '逻辑思维', score: 85 },
    { name: '表达能力', score: 80 },
    { name: '专业知识', score: 75 },
    { name: '学习能力', score: 82 },
    { name: '创新思维', score: 70 },
    { name: '问题解决', score: 78 }
  ];

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl mb-6 mx-auto animate-pulse shadow-lg`}>
            {job.icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">生成能力画像中...</h1>
          <p className="text-gray-600">请稍候</p>
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
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg`}>
                {job.icon}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">能力画像</h1>
              <p className="text-gray-600">基于你在模拟任务中的表现</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">能力雷达图</h3>
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full max-w-md">
                    {/* 背景网格 */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => (
                      <polygon
                        key={i}
                        points={abilities
                          .map((_, idx) => {
                            const angle = (idx * 2 * Math.PI) / abilities.length - Math.PI / 2;
                            const x = 200 + 140 * scale * Math.cos(angle);
                            const y = 200 + 140 * scale * Math.sin(angle);
                            return `${x},${y}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* 轴线 */}
                    {abilities.map((_, idx) => {
                      const angle = (idx * 2 * Math.PI) / abilities.length - Math.PI / 2;
                      const x = 200 + 140 * Math.cos(angle);
                      const y = 200 + 140 * Math.sin(angle);
                      return (
                        <line
                          key={idx}
                          x1="200"
                          y1="200"
                          x2={x}
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      );
                    })}
                    
                    {/* 能力区域 */}
                    <polygon
                      points={abilities
                        .map((ability, idx) => {
                          const angle = (idx * 2 * Math.PI) / abilities.length - Math.PI / 2;
                          const x = 200 + 140 * (ability.score / 100) * Math.cos(angle);
                          const y = 200 + 140 * (ability.score / 100) * Math.sin(angle);
                          return `${x},${y}`;
                        })
                        .join(' ')}
                      fill="rgba(99, 102, 241, 0.2)"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    
                    {/* 数据点 */}
                    {abilities.map((ability, idx) => {
                      const angle = (idx * 2 * Math.PI) / abilities.length - Math.PI / 2;
                      const x = 200 + 140 * (ability.score / 100) * Math.cos(angle);
                      const y = 200 + 140 * (ability.score / 100) * Math.sin(angle);
                      return (
                        <circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r="5"
                          fill="#6366f1"
                        />
                      );
                    })}
                    
                    {/* 标签 */}
                    {abilities.map((ability, idx) => {
                      const angle = (idx * 2 * Math.PI) / abilities.length - Math.PI / 2;
                      const x = 200 + 170 * Math.cos(angle);
                      const y = 200 + 170 * Math.sin(angle);
                      return (
                        <text
                          key={idx}
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-medium text-gray-700"
                          fill="#374151"
                        >
                          {ability.name}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">能力明细</h3>
                <div className="space-y-4">
                  {abilities.map((ability, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">{ability.name}</span>
                        <span className="text-indigo-600 font-bold">{ability.score}分</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${ability.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate(`/resume/${job.id}`)}
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r ${job.color} hover:opacity-90 transition-opacity shadow-lg`}
              >
                生成简历
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

export default ProfilePage;
