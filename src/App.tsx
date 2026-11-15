import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { UIExplorerView } from './components/uimap/UIExplorerView';
import { CommandSandbox } from './components/sandbox/CommandSandbox';
import { AssessmentsView } from './components/assessments/AssessmentsView';
import { ProjectsLabView } from './components/projects/ProjectsLabView';
import { PersonalizationModal } from './components/onboarding/PersonalizationModal';
import { SpotlightTour } from './components/onboarding/SpotlightTour';
import { OnboardingChecklist } from './components/onboarding/OnboardingChecklist';
import { PersistentHelp } from './components/onboarding/PersistentHelp';

const MainContent: React.FC = () => {
  const { state } = useApp();

  return (
    <main className="flex-1 w-full mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {state.currentView === 'curriculum' && <CurriculumView />}
      {state.currentView === 'uimap' && <UIExplorerView />}
      {state.currentView === 'sandbox' && <CommandSandbox />}
      {state.currentView === 'assessments' && <AssessmentsView />}
      {state.currentView === 'projects' && <ProjectsLabView />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-safe-soft selection:text-ink relative">
        <Navbar />
        <MainContent />
        <Footer />
        <ToastContainer />

        {/* First-time and persistent guidance components */}
        <PersonalizationModal />
        <SpotlightTour />
        <OnboardingChecklist />
        <PersistentHelp />
      </div>
    </AppProvider>
  );
};

export default App;
