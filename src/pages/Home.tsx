
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Settings } from 'lucide-react';
import { useAppStore } from '../store';
import API_CONFIG from '../config/api';

export function Home() {
  const [jdText, setJdText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiMode, setApiMode] = useState(API_CONFIG.mode);
  const [apiBaseUrl, setApiBaseUrl] = useState(API_CONFIG.baseUrl);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);
  const navigate = useNavigate();
  const { createSession, parseJd, generateQuestions } = useAppStore();
  
  const handleSaveApiConfig = () => {
    // 这里可以添加保存API配置的逻辑
    // 由于环境变量是静态的，我们可以通过localStorage来存储用户配置
    localStorage.setItem('apiMode', apiMode);
    localStorage.setItem('apiBaseUrl', apiBaseUrl);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2000);
  };
  
  const handleSubmit = async () => {
    if (!jdText.trim()) return;
    
    setIsProcessing(true);
    
    try {
      const newSession = createSession(jdText);
      await parseJd(newSession.id);
      await generateQuestions(newSession.id);
      navigate(`/questions/${newSession.id}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const sampleJd = `高级前端工程师
岗位职责：
1. 负责Web应用的前端开发工作
2. 参与产品需求分析和技术方案设计
3. 持续优化产品性能和用户体验
4. 指导初级工程师成长

任职要求：
1. 本科及以上学历
2. 3年以上前端开发经验
3. 精通React/Vue等框架
4. 熟悉TypeScript、Node.js
5. 良好的团队协作能力`;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          JD智能分析与亮点提取
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          上传招聘JD，通过35道选择题完成能力评估，自动提取简历亮点
        </p>
        <button
          onClick={() => setShowApiConfig(!showApiConfig)}
          className="flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-700 text-sm"
        >
          <Settings className="w-4 h-4" />
          {showApiConfig ? '隐藏API配置' : 'API配置'}
        </button>
      </div>
      
      {showApiConfig && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            API配置
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                API模式
              </label>
              <select
                value={apiMode}
                onChange={(e) => setApiMode(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="mock">模拟模式 (无需后端)</option>
                <option value="real">真实模式 (需要后端API)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                API基础URL
              </label>
              <input
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                placeholder="例如: https://api.example.com"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <button
              onClick={handleSaveApiConfig}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {configSaved ? '已保存' : '保存配置'}
            </button>
          </div>
        </div>
      )}
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FileText className="w-5 h-5" />
              粘贴招聘JD
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="请在此粘贴完整的招聘JD..."
              className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl resize-vertical focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
            />
          </div>
          
          <button
            onClick={() => setJdText(sampleJd)}
            className="text-blue-600 hover:text-blue-700 text-sm mb-4 underline"
          >
            使用示例JD
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!jdText.trim() || isProcessing}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                正在分析JD并生成题目...
              </span>
            ) : (
              '开始答题'
            )}
          </button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-md">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-800 mb-1">35道精选题目</h3>
            <p className="text-sm text-gray-600">从多个维度评估你的能力</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800 mb-1">详细能力分析</h3>
            <p className="text-sm text-gray-600">各维度的表现评估</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-semibold text-gray-800 mb-1">简历亮点提取</h3>
            <p className="text-sm text-gray-600">直接可用的简历素材</p>
          </div>
        </div>
      </div>
    </div>
  );
}

