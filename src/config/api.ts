
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

const userConfig = getUserConfig();

export const API_CONFIG = {
  mode: userConfig.mode,
  baseUrl: userConfig.baseUrl,
  endpoints: {
    resumeUpload: '/api/resume/upload',
    resumeAnalyze: '/api/resume/analyze',
    sessions: '/api/sessions',
    sessionById: (id) => `/api/sessions/${id}`
  }
};

export default API_CONFIG;

