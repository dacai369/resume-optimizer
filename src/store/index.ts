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
          status: 'idle',
        };
        set({ session });
        return session;
      },

      parseJd: async (sessionId) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({ session: { ...state.session, status: 'parsing' } });
        await new Promise(resolve => setTimeout(resolve, 800));
        const parsedJd = parseJd(state.session.jdText);
        set({ session: { ...get().session, parsedJd, status: 'idle' } });
      },

      generateQuestions: async (sessionId) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({ session: { ...state.session, status: 'generating' } });
        await new Promise(resolve => setTimeout(resolve, 1200));
        const questions = generateQuestions(state.session.parsedJd);
        set({ session: { ...get().session, questions, status: 'answering' } });
      },

      submitAnswer: (sessionId, questionId, optionId) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({
          session: {
            ...state.session,
            answers: { ...state.session.answers, [questionId]: optionId },
          },
        });
      },

      analyzeSessionResults: async (sessionId) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({ session: { ...state.session, status: 'analyzing' } });
        await new Promise(resolve => setTimeout(resolve, 1500));
        const analysis = analyzeResults(
          state.session.questions,
          state.session.answers,
          state.session.parsedJd
        );
        set({ session: { ...get().session, analysis, status: 'idle' } });
      },

      generateSessionHighlights: async (sessionId) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId || !state.session.analysis || !state.session.parsedJd) return;
        await new Promise(resolve => setTimeout(resolve, 1000));
        const highlights = generateHighlights(state.session.analysis, state.session.parsedJd);
        set({ session: { ...get().session, highlights, status: 'complete' } });
      },

      resetSession: () => set({ session: null }),
    }),
    {
      name: 'resume-session-storage',
      version: 2,
      migrate: () => ({ session: null }),
      partialize: (state) => ({
        session: state.session
          ? {
              id: state.session.id,
              jdText: state.session.jdText,
              questions: state.session.questions,
              answers: state.session.answers,
              parsedJd: state.session.parsedJd,
              analysis: state.session.analysis,
              highlights: state.session.highlights,
              status: state.session.status,
            }
          : null,
      }),
    }
  )
);

export { useAppStore };
