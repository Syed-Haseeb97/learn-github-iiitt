import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, X, Sparkles, HelpCircle, Smartphone } from 'lucide-react';
import type { ViewMode } from '../../types';

interface TourStep {
  targetId: string;
  view: ViewMode;
  badge: string;
  title: string;
  description: string;
  tip?: string;
  position?: 'bottom' | 'top' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    targetId: 'nav-curriculum',
    view: 'curriculum',
    badge: '01 / 06 • CURRICULUM ROADMAP',
    title: 'Beginner-Friendly 9-Phase Curriculum',
    description:
      'Start your journey here! We break down everything in simple English: what a repository actually is, how to upload code from VS Code, commit history, stars, and contribution graphs—before advancing into team branching, CI/CD, and AI.',
    tip: 'Tip: You can swipe through all 9 phases at your own pace. Phases 1 to 3 are designed especially for complete beginners.',
    position: 'bottom',
  },
  {
    targetId: 'nav-uimap',
    view: 'uimap',
    badge: '02 / 06 • VISUAL REPO MAP',
    title: 'GitHub.com Visual Anatomy Map',
    description:
      'Never wonder where a button is on github.com. Click on interactive hotspots—Fork, Star, Watch, Code, Branches, and Pull Requests—to see real visual screenshots and crystal-clear explanations of what happens behind the scenes.',
    tip: 'Tip: Tap any button on the simulated repo to see its simple explanation.',
    position: 'bottom',
  },
  {
    targetId: 'nav-sandbox',
    view: 'sandbox',
    badge: '03 / 06 • TERMINAL SIMULATOR',
    title: 'Interactive Windows CMD Sandbox',
    description:
      'Practice running real Git commands like "git init", "git add", and "git commit" inside a safe, simulated terminal right in your browser. Watch your commit history graph build live without risking your computer files.',
    tip: 'Tip: Tap the quick starter buttons above the prompt to run commands with one touch.',
    position: 'bottom',
  },
  {
    targetId: 'nav-assessments',
    view: 'assessments',
    badge: '04 / 06 • PRACTICE & VERIFICATION',
    title: 'Instant Quizzes & Terminal Challenges',
    description:
      'Cement your knowledge after reading each phase. Solve quick 3-question multiple choice checks and real terminal command tasks with immediate instant feedback.',
    tip: 'Tip: No stress or grading here—you can retry as many times as you want until you feel confident.',
    position: 'bottom',
  },
  {
    targetId: 'nav-projects',
    view: 'projects',
    badge: '05 / 06 • APPLIED REPOSITORIES',
    title: 'IIIT Trichy Campus Project Blueprints',
    description:
      'Build real projects for your resume. Explore curated blueprints for campus systems (Hostel Portal, Club Sites) with copyable README.md files, .gitignore configurations, and starter file trees.',
    tip: 'Tip: Copy these templates directly into VS Code to kickstart your first semester projects.',
    position: 'bottom',
  },
  {
    targetId: 'persistent-help-button',
    view: 'curriculum',
    badge: '06 / 06 • PERSISTENT ASSISTANCE',
    title: 'Always Available Help & Onboarding Checklist',
    description:
      'You are all set! Keep an eye on the Onboarding Checklist in the bottom right corner to track your day-one milestones. If you ever get stuck or want to retake this tour, click the floating "?" button anytime.',
    tip: 'Tip: The "?" button contains an instant FAQ for common beginner confusions and links to campus mentors.',
    position: 'top',
  },
];

export const SpotlightTour: React.FC = () => {
  const { state, setView, nextTourStep, prevTourStep, skipTour } = useApp();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const currentStep = tourSteps[state.tourStep] || tourSteps[0];

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto switch view to the one relevant for the tour step
  useEffect(() => {
    if (!state.tourActive) return;
    if (state.currentView !== currentStep.view) {
      setView(currentStep.view);
    }
  }, [state.tourActive, state.tourStep]);

  // Update target rect on resize, scroll, or step change
  useEffect(() => {
    if (!state.tourActive) return;

    const updateRect = () => {
      const el = document.getElementById(currentStep.targetId);
      // On mobile, if desktop nav item is hidden, target element might have width 0
      if (el && el.offsetParent !== null) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setTargetRect(rect);
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
      }
      setTargetRect(null);
    };

    updateRect();
    const timer = setTimeout(updateRect, 120);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [state.tourActive, state.tourStep, currentStep.targetId, isMobile]);

  if (!state.tourActive) return null;

  const isFirst = state.tourStep === 0;
  const isLast = state.tourStep === tourSteps.length - 1;

  // Calculate tooltip placement - Adaptive for Mobile & Desktop
  let tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 100,
  };

  if (isMobile) {
    // Mobile: Clean bottom sheet style with comfortable margins
    tooltipStyle.bottom = '16px';
    tooltipStyle.left = '12px';
    tooltipStyle.right = '12px';
    tooltipStyle.width = 'calc(100% - 24px)';
    tooltipStyle.maxWidth = '480px';
    tooltipStyle.margin = '0 auto';
  } else if (targetRect && targetRect.width > 0) {
    // Desktop: Anchored near target
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const preferTop = currentStep.position === 'top' || spaceBelow < 280;

    if (preferTop) {
      tooltipStyle.bottom = `${window.innerHeight - targetRect.top + 16}px`;
      tooltipStyle.left = `${Math.max(16, Math.min(targetRect.left, window.innerWidth - 420))}px`;
    } else {
      tooltipStyle.top = `${targetRect.bottom + 16}px`;
      tooltipStyle.left = `${Math.max(16, Math.min(targetRect.left, window.innerWidth - 420))}px`;
    }
  } else {
    // Fallback: Centered on screen
    tooltipStyle.top = '50%';
    tooltipStyle.left = '50%';
    tooltipStyle.transform = 'translate(-50%, -50%)';
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Darkened backdrop overlay */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-[1px] transition-all duration-300"
        onClick={skipTour}
      />

      {/* Target element spotlight cutout (Desktop or visible mobile target) */}
      {!isMobile && targetRect && targetRect.width > 0 && (
        <div
          style={{
            position: 'fixed',
            top: `${targetRect.top - 6}px`,
            left: `${targetRect.left - 6}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
            borderRadius: '9999px',
            boxShadow: '0 0 0 9999px rgba(22, 24, 29, 0.45)',
            border: '2px solid #1D6B52',
            pointerEvents: 'none',
            zIndex: 60,
          }}
          className="transition-all duration-300 ring-2 ring-safe/30"
        />
      )}

      {/* Coachmark Card - Optimized for Mobile & Desktop */}
      <div
        style={tooltipStyle}
        className="editorial-card bg-surface p-4 sm:p-6 shadow-2xl border border-line z-70 animate-in fade-in slide-in-from-bottom-3 duration-200 max-h-[82vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-line pb-2.5 mb-2.5">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-safe bg-safe-soft px-2 sm:px-2.5 py-0.5 rounded-full border border-safe/25">
            <Sparkles className="size-3 shrink-0" />
            <span>{currentStep.badge}</span>
          </div>

          <button
            type="button"
            onClick={skipTour}
            className="text-muted hover:text-ink text-xs font-mono px-2 py-1 rounded-md hover:bg-paper cursor-pointer transition-colors"
          >
            Skip
          </button>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold leading-tight tracking-tight">
          {currentStep.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed font-sans">
          {currentStep.description}
        </p>

        {currentStep.tip && (
          <div className="mt-2.5 p-2 sm:p-2.5 rounded-xl bg-paper border border-line text-[11px] text-ink font-sans leading-snug">
            {currentStep.tip}
          </div>
        )}

        {/* Step indicator & Navigation buttons with thumb-friendly touch targets */}
        <div className="mt-4 pt-3 border-t border-line flex items-center justify-between gap-2">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {tourSteps.map((_, idx) => (
              <span
                key={idx}
                className={`size-1.5 sm:size-2 rounded-full transition-all ${
                  idx === state.tourStep ? 'bg-safe w-3 sm:w-4' : 'bg-line'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={prevTourStep}
                className="min-h-[38px] px-3.5 py-1.5 rounded-full border border-line bg-surface text-xs font-medium text-ink hover:bg-paper cursor-pointer transition-colors"
              >
                Back
              </button>
            )}

            <button
              type="button"
              onClick={nextTourStep}
              className="min-h-[38px] inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-ink text-paper text-xs font-semibold hover:bg-ink/90 cursor-pointer shadow-sm transition-transform active:scale-95"
            >
              <span>{isLast ? 'Complete Tour' : 'Next'}</span>
              <ArrowRight className="size-3 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
