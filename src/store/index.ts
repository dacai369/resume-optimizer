import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiService } from '../services/api';
import { parseJd } from '../utils/jdParser';
import { generateQuestions } from '../utils/questionGenerator';
import { analyzeResults } from '../utils/analyzer';
import { generateHighlights } from '../utils/highlightGenerator';

const useAppStore = create(
  persist(
    (set, get) => ({
      session: null,
      
      createSession: async (jdText) => {
        try {
          const response = await apiService.createSession({ jdText });
          if (response.success) {
            const session = {
              id: response.data.id,
              jdText,
              questions: [],
              answers: {},
              status: 'idle'
            };
            set({ session });
            return session;
          } else {
            // 回退到本地实现
            const session = {
              id: Date.now().toString(),
              jdText,
              questions: [],
              answers: {},
              status: 'idle'
            };
            set({ session });
            return session;
          }
        } catch (error) {
          // 回退到本地实现
          const session = {
            id: Date.now().toString(),
            jdText,
            questions: [],
            answers: {},
            status: 'idle'
          };
          set({ session });
          return session;
        }
      },
      
      parseJd: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId) {
          set({ session: { ...state.session, status: 'parsing' } });
          
          try {
            const response = await apiService.analyzeResume({ jdText: state.session.jdText });
            if (response.success) {
              const parsedJd = parseJd(state.session.jdText);
              set({ 
                session: { 
                  ...state.session, 
                  parsedJd, 
                  status: 'idle' 
                } 
              });
            } else {
              // 回退到本地实现
              const parsedJd = parseJd(state.session.jdText);
              set({ 
                session: { 
                  ...state.session, 
                  parsedJd, 
                  status: 'idle' 
                } 
              });
            }
          } catch (error) {
            // 回退到本地实现
            const parsedJd = parseJd(state.session.jdText);
            set({ 
              session: { 
                ...state.session, 
                parsedJd, 
                status: 'idle' 
              } 
            });
          }
        }
      },
      
      generateQuestions: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId) {
          set({ session: { ...state.session, status: 'generating' } });
          
          try {
            // 暂时使用本地实现，因为没有对应的API
            await new Promise(resolve => setTimeout(resolve, 2000));
            const questions = generateQuestions();
            set({ 
              session: { 
                ...state.session, 
                questions, 
                status: 'answering' 
              } 
            });
          } catch (error) {
            // 回退到本地实现
            await new Promise(resolve => setTimeout(resolve, 2000));
            const questions = generateQuestions();
            set({ 
              session: { 
                ...state.session, 
                questions, 
                status: 'answering' 
              } 
            });
          }
        }
      },
      
      submitAnswer: (sessionId, questionId, optionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId) {
          set({
            session: {
              ...state.session,
              answers: {
                ...state.session.answers,
                [questionId]: optionId
              }
            }
          });
        }
      },
      
      analyzeSessionResults: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId) {
          set({ session: { ...state.session, status: 'analyzing' } });
          
          try {
            // 暂时使用本地实现，因为没有对应的API
            await new Promise(resolve => setTimeout(resolve, 2000));
            const analysis = analyzeResults(state.session.questions, state.session.answers);
            set({ 
              session: { 
                ...state.session, 
                analysis, 
                status: 'idle' 
              } 
            });
          } catch (error) {
            // 回退到本地实现
            await new Promise(resolve => setTimeout(resolve, 2000));
            const analysis = analyzeResults(state.session.questions, state.session.answers);
            set({ 
              session: { 
                ...state.session, 
                analysis, 
                status: 'idle' 
              } 
            });
          }
        }
      },
      
      generateSessionHighlights: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId && state.session.analysis && state.session.parsedJd) {
          try {
            // 暂时使用本地实现，因为没有对应的API
            await new Promise(resolve => setTimeout(resolve, 1500));
            const highlights = generateHighlights(state.session.analysis, state.session.parsedJd);
            set({ 
              session: { 
                ...state.session, 
                highlights, 
                status: 'complete' 
              } 
            });
          } catch (error) {
            // 回退到本地实现
            await new Promise(resolve => setTimeout(resolve, 1500));
            const highlights = generateHighlights(state.session.analysis, state.session.parsedJd);
            set({ 
              session: { 
                ...state.session, 
                highlights, 
                status: 'complete' 
              } 
            });
          }
        }
      },
      
      resetSession: () => {
        set({ session: null });
      }
    }),
    {
      name: 'resume-session-storage',
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // 迁移逻辑，如果需要的话
          return persistedState;
        }
        return persistedState;
      },
      partialize: (state) => {
        // 只持久化必要的字段
        return {
          session: state.session ? {
            id: state.session.id,
            jdText: state.session.jdText,
            questions: state.session.questions,
            answers: state.session.answers,
            parsedJd: state.session.parsedJd,
            analysis: state.session.analysis,
            highlights: state.session.highlights,
            status: state.session.status
          } : null
        };
      }
    }
  )
);

export { useAppStore };