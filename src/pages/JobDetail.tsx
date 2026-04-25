import { useParams, Link } from 'react-router-dom';
import { jobs } from '../data/jobs';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">岗位未找到</h1>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-gray-800 mb-6 inline-flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回岗位列表
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`h-3 bg-gradient-to-r ${job.color}`}></div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-4xl shadow-lg`}>
                {job.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {job.industry}
                  </span>
                  <span className="font-semibold text-green-600">{job.salary}</span>
                </div>
                <p className="text-gray-600 mt-4 text-lg">{job.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">📋</span>
                  招聘要求
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">✓</span>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">📅</span>
                  日常工作
                </h2>
                <ul className="space-y-3">
                  {job.dailyTasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">{index + 1}</span>
                      <span className="text-gray-600">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">准备好体验了吗？</h3>
                    <p className="text-gray-600 mt-1">通过模拟任务，了解真实工作内容，证明你的能力</p>
                  </div>
                  <Link
                    to={`/tasks/${job.id}`}
                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r ${job.color} hover:opacity-90 transition-opacity shadow-lg`}
                  >
                    开始模拟任务
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 12h8M8 12l4-4m-4 4l4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
