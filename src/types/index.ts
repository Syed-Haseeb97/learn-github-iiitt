export type ViewMode = 
  | 'curriculum'
  | 'uimap'
  | 'sandbox'
  | 'assessments'
  | 'projects'
  | 'whats-next';

export interface UserProfile {
  experience: 'beginner' | 'intermediate' | 'advanced';
  goal: 'college_lab' | 'portfolio' | 'opensource';
  department: 'cse' | 'ece' | 'vlsi_other';
  completedAt?: string;
}

export interface OnboardingChecklistState {
  viewedCurriculum: boolean;
  inspectedUIMap: boolean;
  ranSandboxCmd: boolean;
  completedFirstQuiz: boolean;
}

export interface AppState {
  currentView: ViewMode;
  activePhaseId: number;
  completedQuizzes: Record<string, boolean>;
  completedTasks: Record<number, boolean>;
  userProfile: UserProfile | null;
  tourCompleted: boolean;
  tourActive: boolean;
  tourStep: number;
  checklist: OnboardingChecklistState;
  checklistMinimized: boolean;
  checklistDismissed: boolean;
  helpCenterOpen: boolean;
  personalizationOpen: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warn';
  title: string;
  message: string;
}
