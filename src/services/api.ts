
import { getApiConfig } from '../config/api';

class ApiService {
  async uploadResume(file) {
    const API_CONFIG = getApiConfig();
    if (API_CONFIG.mode === 'mock') {
      return this.mockUploadResume(file);
    } else {
      return this.realUploadResume(file);
    }
  }

  async analyzeResume(data) {
    const API_CONFIG = getApiConfig();
    if (API_CONFIG.mode === 'mock') {
      return this.mockAnalyzeResume(data);
    } else {
      return this.realAnalyzeResume(data);
    }
  }

  async createSession(data) {
    const API_CONFIG = getApiConfig();
    if (API_CONFIG.mode === 'mock') {
      return this.mockCreateSession(data);
    } else {
      return this.realCreateSession(data);
    }
  }

  async getSession(id) {
    const API_CONFIG = getApiConfig();
    if (API_CONFIG.mode === 'mock') {
      return this.mockGetSession(id);
    } else {
      return this.realGetSession(id);
    }
  }

  // Mock implementations
  async mockUploadResume(file) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            fileUrl: 'https://example.com/resume.pdf',
            fileName: file.name
          }
        });
      }, 1500);
    });
  }

  async mockAnalyzeResume() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
            experience: 2,
            education: '本科',
            projects: 3,
            certifications: ['AWS Certified Developer']
          }
        });
      }, 2000);
    });
  }

  async mockCreateSession(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
          }
        });
      }, 1000);
    });
  }

  async mockGetSession(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id,
            jdText: 'Sample JD text',
            parsedJd: {
              title: 'Software Engineer',
              requirements: ['React', 'TypeScript', 'Node.js'],
              responsibilities: ['Develop web applications', 'Collaborate with team']
            },
            createdAt: new Date().toISOString()
          }
        });
      }, 800);
    });
  }

  // Real API implementations
  async realUploadResume(file) {
    const API_CONFIG = getApiConfig();
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.resumeUpload}`, {
      method: 'POST',
      body: formData
    });
    
    return response.json();
  }

  async realAnalyzeResume(data) {
    const API_CONFIG = getApiConfig();
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.resumeAnalyze}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return response.json();
  }

  async realCreateSession(data) {
    const API_CONFIG = getApiConfig();
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.sessions}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return response.json();
  }

  async realGetSession(id) {
    const API_CONFIG = getApiConfig();
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.sessionById(id)}`);
    return response.json();
  }
}

export const apiService = new ApiService();

export default apiService;
