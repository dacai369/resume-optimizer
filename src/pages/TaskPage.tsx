import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tasks } from '../data/tasks';
import { jobs } from '../data/jobs';

const TaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const task = tasks.find(t => t.jobId === id);
  const job = jobs.find(j => j.id === id);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!task || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">任务未找到</h1>
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

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    const allAnswered = task.questions.every(q => answers[q.id]?.trim());
    if (!allAnswered) {
      alert('请回答所有问题后再提交！');
      return;
    }

    setIsSubmitting(true);
    // 模拟提交过程
    setTimeout(() => {
      // 保存答案到 sessionStorage
      sessionStorage.setItem('taskAnswers', JSON.stringify(answers));
      sessionStorage.setItem('currentJob', JSON.stringify(job));
      // 跳转到评分页面
      navigate(`/feedback/${job.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to={`/jobs/${job.id}`} 
          className="text-gray-600 hover:text-gray-800 mb-6 inline-flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回岗位详情
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className={`h-3 bg-gradient-to-r ${job.color}`}></div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-2xl shadow-md`}>
                {job.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
                <p className="text-gray-600">{task.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {task.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`w-8 h-8 bg-gradient-to-br ${job.color} text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0`}>
                      {index + 1}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800 flex-1">
                      {question.question}
                    </h2>
                  </div>

                  {question.type === 'text' ? (
                    <textarea
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      className="w-full min-h-[120px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    />
                  ) : (
                    <div className="space-y-3">
                      {question.options?.map((option, optIndex) => (
                        <label 
                          key={optIndex}
                          className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-5 h-5 text-indigo-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r ${job.color} hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    提交中...
                  </>
                ) : (
                  <>
                    提交答案
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
