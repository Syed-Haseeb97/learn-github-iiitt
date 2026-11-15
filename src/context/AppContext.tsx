import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ViewMode, AppState, UserProfile, OnboardingChecklistState, ToastMessage } from '../types';

interface AppContextType {
  state: AppState;
  setView: (view: ViewMode) => void;
  setActivePhase: (phaseId: number) => void;
  recordQuizComplete: (phaseId: number, questionIdx: number) => void;
  recordTaskComplete: (phaseId: number) => void;
  setUserProfile: (profile: UserProfile) => void;
  setPersonalizationOpen: (open: boolean) => void;
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
        return {
          ...defaultState,
          ...parsed,
          checklist: { ...defaultChecklist, ...(parsed.checklist || {}) },
          // Don't persist tourActive or modals as open across reloads
          tourActive: false,
          helpCenterOpen: false,
          personalizationOpen: !parsed.userProfile,
        };
      }
    } catch {
      // fallback
    }
    return {
      ...defaultState,
      personalizationOpen: true, // First-time visitor gets personalization prompt
    };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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
      return { ...prev, currentView: view, checklist: updatedChecklist };
    });
    window.scrollTo(0, 0);
  };

  const setActivePhase = (phaseId: number) => {
    setState((prev) => {
      const updatedChecklist = { ...prev.checklist, viewedCurriculum: true };
      checkAndCelebrateChecklistCompletion(updatedChecklist);
      return {
        ...prev,
        activePhaseId: phaseId,
        checklist: updatedChecklist,
      };
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

        return {
          ...prev,
          completedQuizzes: { ...prev.completedQuizzes, [key]: true },
          checklist: updatedChecklist,
        };
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

        return {
          ...prev,
          completedTasks: { ...prev.completedTasks, [phaseId]: true },
          checklist: updatedChecklist,
        };
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
        profile.experience === 'intermediate' ? 'Phase 04 (Branching)' : profile.experience === 'advanced' ? 'Phase 07 (CI/CD)' : 'Phase 01 (Git Basics)'
      }.`,
    });
  };

  const setPersonalizationOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, personalizationOpen: open }));
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
