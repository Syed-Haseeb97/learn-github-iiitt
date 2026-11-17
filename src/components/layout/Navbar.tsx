import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ViewMode } from '../../types';
import {
  BookOpen,
  Map,
  Terminal,
  CheckSquare,
  FolderGit2,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  HelpCircle,
  Compass,
  User,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { state, setView, startTour, setHelpCenterOpen, setIdentityModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: {
    id: ViewMode;
    navId: string;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'curriculum',
      navId: 'nav-curriculum',
      label: 'Curriculum',
      shortLabel: 'Curriculum',
      icon: BookOpen,
    },
    {
      id: 'uimap',
      navId: 'nav-uimap',
      label: 'GitHub UI Map',
      shortLabel: 'UI Map',
      icon: Map,
    },
    {
      id: 'sandbox',
      navId: 'nav-sandbox',
      label: 'CMD Sandbox & DAG',
      shortLabel: 'CMD Sandbox',
      icon: Terminal,
    },
    {
      id: 'assessments',
      navId: 'nav-assessments',
      label: 'Assessments',
      shortLabel: 'Quizzes',
      icon: CheckSquare,
    },
    {
      id: 'projects',
      navId: 'nav-projects',
      label: 'Student Projects',
      shortLabel: 'Projects',
      icon: FolderGit2,
    },
    {
      id: 'whats-next',
      navId: 'nav-whats-next',
      label: "What's Next",
      shortLabel: 'Roadmap',
      icon: Compass,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 gap-2">
        {/* Left: Brand Identity */}
        <div
          onClick={() => setView('curriculum')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-line bg-paper text-safe shadow-sm group-hover:border-safe transition-colors">
            <GraduationCap className="size-4 sm:size-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-safe bg-safe-soft border border-safe/25 px-1.5 sm:px-2 py-0.5 rounded-full">
                IIIT TRICHY DEVS
              </span>
              <span className="hidden xl:inline-block font-mono text-[10px] text-muted uppercase">
                CSE • ECE • VLSI
              </span>
            </div>
            <h1 className="font-serif text-lg sm:text-2xl text-ink leading-tight font-semibold tracking-tight">
              Learn GitHub{' '}
              <span className="font-sans text-[10px] sm:text-xs font-normal text-muted font-mono ml-0.5 sm:ml-1">
                v2.0
              </span>
            </h1>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs - Responsive for Half Screen */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-line bg-paper p-1 shrink-0 overflow-x-auto no-scrollbar max-w-[55vw] lg:max-w-none"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.currentView === item.id;
            return (
              <button
                key={item.id}
                id={item.navId}
                type="button"
                onClick={() => setView(item.id)}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-surface text-ink border border-line shadow-sm font-semibold'
                    : 'text-muted hover:text-ink hover:bg-surface/50'
                }`}
              >
                <Icon
                  className={`size-3.5 shrink-0 ${
                    isActive ? 'text-safe' : 'text-muted'
                  }`}
                />
                <span className="hidden lg:inline">{item.label}</span>
                <span className="inline lg:hidden">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Assistance & Client Status */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* Quick Tour Button */}
          <button
            type="button"
            onClick={startTour}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-surface text-xs font-mono text-muted hover:text-ink hover:border-safe transition-colors cursor-pointer"
            title="Start Spotlight Coachmarks Tour"
          >
            <Sparkles className="size-3 text-safe" />
            <span className="text-[11px] font-semibold">Take Tour</span>
          </button>

          {/* Quick Help Trigger */}
          <button
            type="button"
            onClick={() => setHelpCenterOpen(true)}
            className="inline-flex items-center gap-1.5 p-1.5 lg:px-3 lg:py-1 rounded-full border border-line bg-surface text-xs font-mono text-muted hover:text-safe hover:border-safe transition-colors cursor-pointer"
            title="Open Help Center & FAQ"
          >
            <HelpCircle className="size-3.5 text-muted hover:text-safe" />
            <span className="hidden xl:inline text-[11px] font-semibold text-ink">
              Help
            </span>
          </button>

          {/* Student Identity Pill */}
          {state.studentIdentity ? (
            <button
              type="button"
              onClick={() => setIdentityModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-surface hover:bg-paper text-xs font-mono text-ink cursor-pointer transition-colors"
              title="Click to view or edit student details"
            >
              <User className="size-3 text-safe" />
              <span className="text-[11px] font-semibold truncate max-w-[140px]">
                {state.studentIdentity.name.split(' ')[0]} (@{state.studentIdentity.githubUsername})
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIdentityModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-safe/30 bg-safe-soft text-xs font-mono text-safe hover:bg-safe hover:text-paper cursor-pointer transition-colors"
              title="Click to set your Name and GitHub username"
            >
              <User className="size-3" />
              <span className="text-[11px] font-semibold">Enter Details</span>
            </button>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-line bg-surface text-ink hover:bg-paper cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-paper text-ink font-semibold border border-line'
                    : 'text-muted hover:bg-paper/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`size-4 ${isActive ? 'text-safe' : 'text-muted'}`}
                  />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-2 border-t border-line/60 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIdentityModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-safe/30 bg-safe-soft text-xs font-semibold text-safe cursor-pointer"
            >
              <User className="size-3.5 text-safe" />
              <span>
                {state.studentIdentity
                  ? `${state.studentIdentity.name} (@${state.studentIdentity.githubUsername})`
                  : 'Enter Name & GitHub Username'}
              </span>
            </button>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  startTour();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-line bg-paper text-xs font-semibold text-ink cursor-pointer"
              >
                <Sparkles className="size-3.5 text-safe" />
                <span>Take Tour</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setHelpCenterOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-line bg-paper text-xs font-semibold text-ink cursor-pointer"
              >
                <HelpCircle className="size-3.5 text-safe" />
                <span>Help Center</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
