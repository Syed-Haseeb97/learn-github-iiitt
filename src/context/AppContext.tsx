import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ViewMode,
  AppState,
  UserProfile,
  StudentIdentity,
  OnboardingChecklistState,
  ToastMessage,
} from '../types';
import { telemetry, type ProgressStats } from '../services/telemetry';

interface AppContextType {
  state: AppState;
  setView: (view: ViewMode) => void;
  setActivePhase: (phaseId: number) => void;
  recordQuizComplete: (phaseId: number, questionIdx: number) => void;
  recordTaskComplete: (phaseId: number) => void;
  setUserProfile: (profile: UserProfile) => void;
  setPersonalizationOpen: (open: boolean) => void;
  setStudentIdentity: (identity: StudentIdentity) => void;
  setIdentityModalOpen: (open: boolean) => void;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  skipTour: () => void;
  setHelpCenterOpen: (open: boolean) => void;
  updateChecklist: (key: keyof OnboardingChecklistState, val: boolean) => void;
  setChecklistMinimized: (minimized: boolean) => void;
  setChecklistDismissed: (dismissed: boolean) => void;
  resetOnboarding: () => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  triggerToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const STORAGE_KEY = 'iiitt_learn_github_state_clean_v2';

const defaultChecklist: OnboardingChecklistState = {
  viewedCurriculum: false,
  inspectedUIMap: false,
  ranSandboxCmd: false,
  completedFirstQuiz: false,
};

const defaultState: AppState = {
  currentView: 'curriculum',
  activePhaseId: 1,
  completedQuizzes: {},
  completedTasks: {},
  userProfile: null,
  studentIdentity: null,
  identityModalOpen: false,
  tourCompleted: false,
  tourActive: false,
  tourStep: 0,
  checklist: defaultChecklist,
  checklistMinimized: false,
  checklistDismissed: false,
  helpCenterOpen: false,
  personalizationOpen: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasIdentity = Boolean(
          parsed.studentIdentity?.name && parsed.studentIdentity?.githubUsername
        );
        const isExistingUser = Boolean(parsed.userProfile || parsed.tourCompleted);

        return {
          ...defaultState,
          ...parsed,
          checklist: { ...defaultChecklist, ...(parsed.checklist || {}) },
          studentIdentity: parsed.studentIdentity || null,
          // Don't persist tourActive or modals as open across reloads
          tourActive: false,
          helpCenterOpen: false,
          personalizationOpen: !parsed.userProfile,
          // If they are an existing visitor who hasn't provided name/github username yet, prompt them immediately
          identityModalOpen: !hasIdentity && isExistingUser,
        };
      }
    } catch {
      // fallback
    }
    return {
      ...defaultState,
      personalizationOpen: true, // First-time visitor gets personalization prompt
      identityModalOpen: false, // New visitor finishes tour first before identity prompt
    };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Debounced persistence to avoid layout stutter
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // storage unavailable
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [state]);

  const getProgressStats = (currentState: AppState): ProgressStats => {
    const verifiedQuizzesCount = Object.values(currentState.completedQuizzes).filter(Boolean).length;
    const completedTasksCount = Object.values(currentState.completedTasks).filter(Boolean).length;
    const totalQuizzesCount = 30; // 10 phases * 3 questions
    const totalTasksCount = 10; // 10 phase terminal tasks
    const curriculumPercentage = Math.min(
      100,
      Math.round(
        ((verifiedQuizzesCount + completedTasksCount) / (totalQuizzesCount + totalTasksCount)) * 100
      )
    );

    return {
      verifiedQuizzesCount,
      totalQuizzesCount,
      completedTasksCount,
      totalTasksCount,
      curriculumPercentage,
    };
  };

  // Initial visit telemetry ping
  useEffect(() => {
    if (state.studentIdentity) {
      const stats = getProgressStats(state);
      telemetry.sendBuffered(
        state.studentIdentity,
        {
          type: 'visit',
          description: `Platform opened / session resumed by ${state.studentIdentity.name}`,
          details: `Active phase: Phase ${state.activePhaseId}`,
          timestamp: new Date().toISOString(),
        },
        stats
      );
    }
  }, []);

  const triggerToast = (toastData: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toastData, id };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const checkAndCelebrateChecklistCompletion = (checklist: OnboardingChecklistState) => {
    const isAllComplete =
      checklist.viewedCurriculum &&
      checklist.inspectedUIMap &&
      checklist.ranSandboxCmd &&
      checklist.completedFirstQuiz;

    if (isAllComplete && !state.checklistDismissed) {
      setTimeout(() => {
        setState((prev) => ({ ...prev, checklistDismissed: true }));
        triggerToast({
          type: 'success',
          title: 'Onboarding Completed!',
          message: 'All 4 milestones verified. Walkthrough checklist is now completed and closed.',
        });
      }, 1200);
    }
  };

  const setView = (view: ViewMode) => {
    setState((prev) => {
      const updatedChecklist = { ...prev.checklist };
      if (view === 'uimap') updatedChecklist.inspectedUIMap = true;
      if (view === 'curriculum') updatedChecklist.viewedCurriculum = true;
      checkAndCelebrateChecklistCompletion(updatedChecklist);

      const nextState = { ...prev, currentView: view, checklist: updatedChecklist };
      const stats = getProgressStats(nextState);

      telemetry.sendBuffered(
        nextState.studentIdentity,
        {
          type: 'navigation',
          description: `Navigated to view: ${view}`,
          timestamp: new Date().toISOString(),
        },
        stats
      );

      return nextState;
    });
    window.scrollTo(0, 0);
  };

  const setActivePhase = (phaseId: number) => {
    setState((prev) => {
      const updatedChecklist = { ...prev.checklist, viewedCurriculum: true };
      checkAndCelebrateChecklistCompletion(updatedChecklist);

      const nextState = {
        ...prev,
        activePhaseId: phaseId,
        checklist: updatedChecklist,
      };

      const stats = getProgressStats(nextState);
      telemetry.sendBuffered(
        nextState.studentIdentity,
        {
          type: 'phase_select',
          description: `Selected Phase ${phaseId < 10 ? `0${phaseId}` : phaseId}`,
          timestamp: new Date().toISOString(),
        },
        stats
      );

      return nextState;
    });
  };

  const recordQuizComplete = (phaseId: number, questionIdx: number) => {
    const key = `${phaseId}-${questionIdx}`;
    if (!state.completedQuizzes[key]) {
      setState((prev) => {
        const updatedChecklist = {
          ...prev.checklist,
          completedFirstQuiz: true,
        };
        checkAndCelebrateChecklistCompletion(updatedChecklist);

        const nextCompletedQuizzes = { ...prev.completedQuizzes, [key]: true };
        const nextState = {
          ...prev,
          completedQuizzes: nextCompletedQuizzes,
          checklist: updatedChecklist,
        };

        const stats = getProgressStats(nextState);
        telemetry.sendBuffered(
          nextState.studentIdentity,
          {
            type: 'quiz_verified',
            description: `Verified Phase ${phaseId} Quiz Question #${questionIdx + 1}`,
            timestamp: new Date().toISOString(),
          },
          stats
        );

        if (stats.curriculumPercentage === 100 && nextState.studentIdentity) {
          telemetry.sendImmediate(
            nextState.studentIdentity,
            {
              type: 'curriculum_completed',
              description: `100% Curriculum Completed (All 10 Phases & Challenges)`,
              details: `Total Quizzes: 30/30 • Total Tasks: 10/10`,
              timestamp: new Date().toISOString(),
            },
            stats
          );
        }

        return nextState;
      });

      triggerToast({
        type: 'success',
        title: 'Quiz Verified',
        message: `Phase ${phaseId} question #${questionIdx + 1} completed correctly.`,
      });
    }
  };

  const recordTaskComplete = (phaseId: number) => {
    if (!state.completedTasks[phaseId]) {
      setState((prev) => {
        const updatedChecklist = {
          ...prev.checklist,
          ranSandboxCmd: true,
        };
        checkAndCelebrateChecklistCompletion(updatedChecklist);

        const nextCompletedTasks = { ...prev.completedTasks, [phaseId]: true };
        const nextState = {
          ...prev,
          completedTasks: nextCompletedTasks,
          checklist: updatedChecklist,
        };

        const stats = getProgressStats(nextState);
        telemetry.sendBuffered(
          nextState.studentIdentity,
          {
            type: 'task_completed',
            description: `Executed Terminal Challenge for Phase ${phaseId}`,
            timestamp: new Date().toISOString(),
          },
          stats
        );

        if (stats.curriculumPercentage === 100 && nextState.studentIdentity) {
          telemetry.sendImmediate(
            nextState.studentIdentity,
            {
              type: 'curriculum_completed',
              description: `100% Curriculum Completed (All 10 Phases & Challenges)`,
              details: `Total Quizzes: 30/30 • Total Tasks: 10/10`,
              timestamp: new Date().toISOString(),
            },
            stats
          );
        }

        return nextState;
      });

      triggerToast({
        type: 'success',
        title: 'Challenge Verified',
        message: `Phase ${phaseId} terminal task successfully executed.`,
      });
    }
  };

  const setUserProfile = (profile: UserProfile) => {
    setState((prev) => {
      let suggestedPhase = 1;
      if (profile.experience === 'intermediate') suggestedPhase = 4;
      if (profile.experience === 'advanced') suggestedPhase = 7;

      return {
        ...prev,
        userProfile: profile,
        activePhaseId: suggestedPhase,
        personalizationOpen: false,
        tourActive: !prev.tourCompleted,
        tourStep: 0,
      };
    });

    triggerToast({
      type: 'info',
      title: 'Profile Saved',
      message: `Welcome! Pacing set for ${
        profile.experience === 'intermediate'
          ? 'Phase 04 (Branching)'
          : profile.experience === 'advanced'
          ? 'Phase 07 (CI/CD)'
          : 'Phase 01 (Git Basics)'
      }.`,
    });
  };

  const setPersonalizationOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, personalizationOpen: open }));
  };

  const setStudentIdentity = (identity: StudentIdentity) => {
    setState((prev) => {
      const isUpdate = Boolean(prev.studentIdentity);
      const updatedState = {
        ...prev,
        studentIdentity: identity,
        identityModalOpen: false,
      };

      const stats = getProgressStats(updatedState);

      if (isUpdate) {
        telemetry.sendImmediate(
          identity,
          {
            type: 'profile_update',
            description: `Student details updated: ${identity.name} (@${identity.githubUsername})`,
            details: `Department: ${identity.department.toUpperCase()}`,
            timestamp: new Date().toISOString(),
          },
          stats
        );
      } else {
        telemetry.sendImmediate(
          identity,
          {
            type: 'registration',
            description: `New student registration: ${identity.name} (@${identity.githubUsername})`,
            details: `Department: ${identity.department.toUpperCase()}`,
            timestamp: new Date().toISOString(),
          },
          stats
        );
      }

      return updatedState;
    });

    triggerToast({
      type: 'success',
      title: 'Identity Confirmed',
      message: `Welcome, ${identity.name}! Your progress is being tracked on Discord.`,
    });
  };

  const setIdentityModalOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, identityModalOpen: open }));
  };

  const startTour = () => {
    setState((prev) => ({
      ...prev,
      tourActive: true,
      tourStep: 0,
      helpCenterOpen: false,
    }));
  };

  const nextTourStep = () => {
    setState((prev) => {
      if (prev.tourStep >= 5) {
        return {
          ...prev,
          tourActive: false,
          tourCompleted: true,
          // If the student hasn't entered their identity yet, prompt them right after the tour finishes!
          identityModalOpen: !prev.studentIdentity,
        };
      }
      return {
        ...prev,
        tourStep: prev.tourStep + 1,
      };
    });
  };

  const prevTourStep = () => {
    setState((prev) => ({
      ...prev,
      tourStep: Math.max(0, prev.tourStep - 1),
    }));
  };

  const skipTour = () => {
    setState((prev) => ({
      ...prev,
      tourActive: false,
      tourCompleted: true,
      // If the student hasn't entered their identity yet, prompt them right after skipping the tour!
      identityModalOpen: !prev.studentIdentity,
    }));
    triggerToast({
      type: 'info',
      title: 'Tour Dismissed',
      message: 'You can restart the tour anytime from the Help Center (?) at the bottom.',
    });
  };

  const setHelpCenterOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, helpCenterOpen: open }));
  };

  const updateChecklist = (key: keyof OnboardingChecklistState, val: boolean) => {
    setState((prev) => {
      const updatedChecklist = { ...prev.checklist, [key]: val };
      checkAndCelebrateChecklistCompletion(updatedChecklist);
      return {
        ...prev,
        checklist: updatedChecklist,
      };
    });
  };

  const setChecklistMinimized = (minimized: boolean) => {
    setState((prev) => ({ ...prev, checklistMinimized: minimized }));
  };

  const setChecklistDismissed = (dismissed: boolean) => {
    setState((prev) => ({ ...prev, checklistDismissed: dismissed }));
  };

  const resetOnboarding = () => {
    setState((prev) => ({
      ...prev,
      tourCompleted: false,
      tourActive: true,
      tourStep: 0,
      checklist: defaultChecklist,
      checklistMinimized: false,
      checklistDismissed: false,
      helpCenterOpen: false,
    }));
    triggerToast({
      type: 'info',
      title: 'Onboarding Reset',
      message: 'Checklist and tour have been restarted fresh.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setView,
        setActivePhase,
        recordQuizComplete,
        recordTaskComplete,
        setUserProfile,
        setPersonalizationOpen,
        setStudentIdentity,
        setIdentityModalOpen,
        startTour,
        nextTourStep,
        prevTourStep,
        skipTour,
        setHelpCenterOpen,
        updateChecklist,
        setChecklistMinimized,
        setChecklistDismissed,
        resetOnboarding,
        toasts,
        dismissToast,
        triggerToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
