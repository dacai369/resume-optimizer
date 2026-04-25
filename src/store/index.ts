
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { parseJd } from '../utils/jdParser';
import { generateQuestions } from '../utils/questionGenerator';
import { analyzeResults } from '../utils/analyzer';
import { generateHighlights } from '../utils/highlightGenerator';

const useAppStore = create(
  persist(
    (set, get) => ({
      session: null,
      
      createSession: (jdText) => {
        const session = {
          id: Date.now().toString(),
          jdText,
          questions: [],
          answers: {},
          status: 'idle'
        };
        set({ session });
        return session;
      },
      
      parseJd: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId) {
          set({ session: { ...state.session, status: 'parsing' } });
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const parsedJd = parseJd(state.session.jdText);
          set({ 
            session: { 
              ...state.session, 
              parsedJd, 
              status: 'idle' 
            } 
          });
        }
      },
      
      generateQuestions: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId) {
          set({ session: { ...state.session, status: 'generating' } });
          
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
      },
      
      generateSessionHighlights: async (sessionId) => {
        const state = get();
        if (state.session && state.session.id === sessionId && state.session.analysis && state.session.parsedJd) {
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
      },
      
      resetSession: () => {
        set({ session: null });
      }
    }),
    {
      name: 'resume-session-storage'
    }
  )
);

export { useAppStore };

