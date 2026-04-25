
// 从localStorage读取用户配置
const getUserConfig = () => {
  try {
    const mode = localStorage.getItem('apiMode');
    const baseUrl = localStorage.getItem('apiBaseUrl');
    return {
      mode: mode || import.meta.env.VITE_API_MODE || 'mock',
      baseUrl: baseUrl || import.meta.env.VITE_API_BASE_URL || ''
    };
  } catch (error) {
    return {
      mode: import.meta.env.VITE_API_MODE || 'mock',
      baseUrl: import.meta.env.VITE_API_BASE_URL || ''
    };
  }
};

// 定义endpoints
const endpoints = {
  resumeUpload: '/api/resume/upload',
  resumeAnalyze: '/api/resume/analyze',
  sessions: '/api/sessions',
  sessionById: (id) => `/api/sessions/${id}`
};

// 导出getApiConfig函数，每次调用时读取最新配置
export const getApiConfig = () => {
  const userConfig = getUserConfig();
  return {
    mode: userConfig.mode,
    baseUrl: userConfig.baseUrl,
    endpoints
  };
};

// 保持API_CONFIG导出以向后兼容
export const API_CONFIG = getApiConfig();

export default API_CONFIG;

