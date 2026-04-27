import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnalysisResult, ParsedJd, ResumeHighlights, Session, Question } from '../types';
import { parseJd } from '../utils/jdParser';
import { generateQuestions } from '../utils/questionGenerator';
import { analyzeResults } from '../utils/analyzer';
import { generateHighlights } from '../utils/highlightGenerator';

interface AppStore {
  session: Session | null;
  createSession: (jdText: string) => Session;
  parseJd: (sessionId: string) => Promise<void>;
  generateQuestions: (sessionId: string) => Promise<void>;
  submitAnswer: (sessionId: string, questionId: string, optionId: string) => void;
  analyzeSessionResults: (sessionId: string) => Promise<void>;
  generateSessionHighlights: (sessionId: string) => Promise<void>;
  resetSession: () => void;
}

interface PersistedState {
  session: Session | null;
}

type SessionDraft = Omit<Session, 'parsedJd' | 'analysis' | 'highlights'> & {
  parsedJd?: ParsedJd;
  analysis?: AnalysisResult;
  highlights?: ResumeHighlights;
};

const createBaseSession = (jdText: string): SessionDraft => ({
  id: Date.now().toString(),
  jdText,
  questions: [] as Question[],
  answers: {},
  status: 'idle',
});

const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      session: null,

      createSession: (jdText: string) => {
        const session = createBaseSession(jdText);
        set({ session });
        return session;
      },

      parseJd: async (sessionId: string) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({ session: { ...state.session, status: 'parsing' } });
        await new Promise(resolve => setTimeout(resolve, 800));
        const parsedJd = parseJd(state.session.jdText);
        set({ session: { ...get().session, parsedJd, status: 'idle' } });
      },

      generateQuestions: async (sessionId: string) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({ session: { ...state.session, status: 'generating' } });
        await new Promise(resolve => setTimeout(resolve, 1200));
        const questions = generateQuestions(state.session.parsedJd);
        set({ session: { ...get().session, questions, status: 'answering' } });
      },

      submitAnswer: (sessionId: string, questionId: string, optionId: string) => {
        const state = get();
        if (!state.session || state.session.id !== sessionId) return;
        set({
          session: {
            ...state.session,
            answers: { ...state.session.answers, [questionId]: optionId },
          },
        });
      },

      analyzeSessionResults: async (sessionId: string) => {
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

      generateSessionHighlights: async (sessionId: string) => {
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
      migrate: (): PersistedState => ({ session: null }),
      partialize: (state): PersistedState => ({
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
