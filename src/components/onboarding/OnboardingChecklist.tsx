import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Map,
  Terminal,
  CheckSquare,
  Award,
  ArrowRight,
  X,
} from 'lucide-react';
import type { ViewMode } from '../../types';

export const OnboardingChecklist: React.FC = () => {
  const {
    state,
    setView,
    setActivePhase,
    updateChecklist,
    setChecklistMinimized,
    setChecklistDismissed,
  } = useApp();

  // If dismissed by user or auto-dismissed on completion, do not render
  if (state.checklistDismissed) {
    return null;
  }

  const checklistItems = [
    {
      key: 'viewedCurriculum' as const,
      title: 'Explore Phase 1: What is a Repository?',
      desc: 'Understand repositories, commits, and why companies use GitHub.',
      icon: BookOpen,
      view: 'curriculum' as ViewMode,
      action: () => {
        setView('curriculum');
        setActivePhase(1);
        updateChecklist('viewedCurriculum', true);
      },
    },
    {
      key: 'inspectedUIMap' as const,
      title: 'Inspect a Button on the GitHub UI Map',
      desc: 'See where Fork, Star, Code, and Pull Requests live on github.com.',
      icon: Map,
      view: 'uimap' as ViewMode,
      action: () => {
        setView('uimap');
        updateChecklist('inspectedUIMap', true);
      },
    },
    {
      key: 'ranSandboxCmd' as const,
      title: 'Run a Command in the CMD Sandbox',
      desc: 'Practice git init, git add, or git status without altering real files.',
      icon: Terminal,
      view: 'sandbox' as ViewMode,
      action: () => {
        setView('sandbox');
      },
    },
    {
      key: 'completedFirstQuiz' as const,
      title: 'Verify Phase 1 Knowledge Check',
      desc: 'Test your understanding with instant multiple-choice questions.',
      icon: CheckSquare,
      view: 'assessments' as ViewMode,
      action: () => {
        setView('assessments');
      },
    },
  ];

  const completedCount = Object.values(state.checklist).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isAllDone = completedCount === totalCount;

  // If minimized
  if (state.checklistMinimized) {
    return (
      <aside aria-label="Onboarding Progress" className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
        <button
          type="button"
          onClick={() => setChecklistMinimized(false)}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full border border-line bg-surface shadow-lg hover:border-safe text-ink cursor-pointer transition-all hover:scale-105"
        >
          <div className="flex items-center justify-center size-5 rounded-full bg-safe-soft text-safe font-mono text-[10px] font-bold">
            {completedCount}/{totalCount}
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            {isAllDone ? 'Onboarding Complete' : 'Walkthrough Checklist'}
          </span>
          <ChevronUp className="size-3.5 text-muted" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      id="onboarding-checklist-card"
      aria-label="Onboarding Walkthrough"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-[92vw] max-w-sm editorial-card bg-surface p-4 sm:p-5 shadow-xl border border-line animate-in slide-in-from-bottom-3 duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-safe-soft text-safe border border-safe/25">
            <Sparkles className="size-3.5" />
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
              Onboarding Checklist
            </h4>
            <p className="font-mono text-[10px] text-muted">
              {completedCount} of {totalCount} tasks verified ({progressPercent}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setChecklistMinimized(true)}
            className="p-1 rounded-md text-muted hover:text-ink hover:bg-paper cursor-pointer transition-colors"
            title="Minimize checklist"
            aria-label="Minimize checklist"
          >
            <ChevronDown className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setChecklistDismissed(true)}
            className="p-1 rounded-md text-muted hover:text-ink hover:bg-paper cursor-pointer transition-colors"
            title="Dismiss checklist"
            aria-label="Dismiss checklist"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-paper rounded-full h-1.5 overflow-hidden border border-line/60">
        <div
          className="bg-safe h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Tasks List */}
      <div className="mt-3.5 space-y-2">
        {checklistItems.map((item) => {
          const isDone = Boolean(state.checklist[item.key]);

          return (
            <div
              key={item.key}
              className={`p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2.5 ${
                isDone
                  ? 'border-safe/30 bg-safe-soft/20 text-ink'
                  : 'border-line/70 bg-surface hover:bg-paper/60'
              }`}
            >
              <button
                type="button"
                onClick={() => updateChecklist(item.key, !isDone)}
                className="mt-0.5 text-muted hover:text-safe cursor-pointer shrink-0 transition-colors"
                title={isDone ? 'Mark unverified' : 'Mark verified'}
              >
                {isDone ? (
                  <CheckCircle2 className="size-4 text-safe" />
                ) : (
                  <Circle className="size-4 text-line" />
                )}
              </button>

              <div
                onClick={item.action}
                className="flex-1 cursor-pointer select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-sans text-xs font-semibold leading-tight ${
                      isDone ? 'line-through text-muted' : 'text-ink'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-[11px] text-muted mt-0.5 line-clamp-1 leading-normal">
                  {item.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={item.action}
                className="p-1 text-muted hover:text-ink rounded-md hover:bg-paper cursor-pointer shrink-0"
                title={`Open ${item.view}`}
              >
                <ArrowRight className="size-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Completion celebratory banner with instant dismiss button */}
      {isAllDone && (
        <div className="mt-3 p-3 rounded-xl bg-safe-soft border border-safe/30 flex items-center justify-between gap-2 text-safe animate-in fade-in">
          <div className="flex items-center gap-2">
            <Award className="size-4 shrink-0" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              All Tasks Verified! Closing...
            </span>
          </div>
          <button
            type="button"
            onClick={() => setChecklistDismissed(true)}
            className="px-2 py-0.5 rounded-md bg-safe text-paper text-[10px] font-mono font-bold cursor-pointer hover:bg-safe/90"
          >
            Dismiss
          </button>
        </div>
      )}
    </aside>
  );
};
