import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  X,
  Play,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  GraduationCap,
  ExternalLink,
  BookOpen,
  Terminal,
  ShieldAlert,
} from 'lucide-react';

export const PersistentHelp: React.FC = () => {
  const {
    state,
    startTour,
    resetOnboarding,
    setPersonalizationOpen,
    setHelpCenterOpen,
  } = useApp();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How do I get my code from VS Code onto GitHub?',
      a: 'There are two ways: 1) The Recommended Git CLI Way: Open the VS Code integrated terminal (`Ctrl + ~`), run `git init`, `git add .`, `git commit -m "Initial commit"`, and `git push -u origin main`. 2) The Browser Way: In your empty GitHub repository on github.com, click "uploading an existing file" and drag your project folder directly into the web browser.',
    },
    {
      q: 'What is the real difference between Git and GitHub?',
      a: 'Git is a local program running on your laptop that tracks file snapshots and diffs in a hidden `.git` folder. GitHub is a cloud web platform owned by Microsoft that stores your repositories online so your team and instructors can collaborate, review pull requests, and deploy applications.',
    },
    {
      q: 'Why are my commits not showing up on my Contribution Graph?',
      a: 'GitHub counts contributions based on the email address in your commit history. Make sure your local Git email matches your GitHub account email by running: `git config --global user.email "your.email@example.com"`.',
    },
    {
      q: 'What is a README.md and why do I need one?',
      a: 'A README.md is the front page of your repository. It tells anyone visiting your project what the project does, how to install and run it, and what technologies you used. Without a README, a repository looks abandoned to recruiters and teachers.',
    },
    {
      q: 'What should I do if I commit secret passwords or API keys by mistake?',
      a: 'Never push `.env` files or API keys! Add `.env` to your `.gitignore` file immediately. If already committed, revoke the key immediately on the provider website (OpenAI, Firebase, etc.) because commit history permanently preserves old files even if you delete them in a later commit.',
    },
  ];

  return (
    <>
      {/* Floating Persistent Help Button */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          id="persistent-help-button"
          type="button"
          onClick={() => setHelpCenterOpen(!state.helpCenterOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-line bg-surface shadow-lg text-ink hover:border-safe hover:bg-paper cursor-pointer transition-all hover:scale-105 group"
          title="Need help? Open IIIT Trichy Devs Help Center"
          aria-label="Open Help Center"
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-safe text-paper">
            <HelpCircle className="size-3.5" />
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider group-hover:text-safe transition-colors">
            Help Center
          </span>
        </button>
      </div>

      {/* Help Modal / Slideout */}
      {state.helpCenterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl editorial-card bg-surface p-6 sm:p-8 shadow-2xl border border-line animate-in zoom-in-95 duration-200 max-h-[88vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setHelpCenterOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full border border-line text-muted hover:text-ink hover:bg-paper cursor-pointer transition-colors"
              aria-label="Close help center"
            >
              <X className="size-4" />
            </button>

            {/* Header */}
            <div className="border-b border-line pb-5 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-safe/25 bg-safe-soft px-3 py-0.5 text-xs text-safe font-mono uppercase tracking-wider font-semibold">
                <GraduationCap className="size-3.5" />
                <span>IIIT TRICHY DEVS • ASSISTANCE & FAQ</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
                How Can We Help You?
              </h2>

              <p className="text-sm text-muted leading-relaxed">
                Whether you are brand new to Git or debugging a tricky commit, review the quick walkthroughs or connect with campus lab mentors below.
              </p>
            </div>

            {/* Quick Action Grid */}
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={startTour}
                className="p-3.5 rounded-xl border border-line bg-surface hover:bg-paper text-left transition-all cursor-pointer flex flex-col justify-between group hover:border-safe"
              >
                <div className="flex size-7 items-center justify-center rounded-lg bg-safe-soft text-safe border border-safe/25 mb-2 group-hover:bg-safe group-hover:text-paper transition-colors">
                  <Play className="size-3.5" />
                </div>
                <div>
                  <div className="font-sans text-xs font-semibold text-ink">
                    Take Tour Again
                  </div>
                  <div className="text-[11px] text-muted mt-0.5">
                    Relaunch spotlight coachmarks.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={resetOnboarding}
                className="p-3.5 rounded-xl border border-line bg-surface hover:bg-paper text-left transition-all cursor-pointer flex flex-col justify-between group hover:border-warn"
              >
                <div className="flex size-7 items-center justify-center rounded-lg bg-warn-soft text-warn border border-warn/25 mb-2 group-hover:bg-warn group-hover:text-paper transition-colors">
                  <RotateCcw className="size-3.5" />
                </div>
                <div>
                  <div className="font-sans text-xs font-semibold text-ink">
                    Reset Checklist
                  </div>
                  <div className="text-[11px] text-muted mt-0.5">
                    Start walkthrough fresh.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHelpCenterOpen(false);
                  setPersonalizationOpen(true);
                }}
                className="p-3.5 rounded-xl border border-line bg-surface hover:bg-paper text-left transition-all cursor-pointer flex flex-col justify-between group hover:border-safe"
              >
                <div className="flex size-7 items-center justify-center rounded-lg bg-paper text-ink border border-line mb-2 group-hover:border-safe transition-colors">
                  <Sliders className="size-3.5" />
                </div>
                <div>
                  <div className="font-sans text-xs font-semibold text-ink">
                    Change Profile
                  </div>
                  <div className="text-[11px] text-muted mt-0.5">
                    Update experience & goals.
                  </div>
                </div>
              </button>
            </div>

            {/* Beginner FAQ Section */}
            <div className="mt-8 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-2">
                <BookOpen className="size-3.5 text-safe" />
                <span>Frequently Asked Beginner Questions</span>
              </h3>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-surface overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-paper/50 cursor-pointer"
                      >
                        <span className="font-sans text-xs font-semibold text-ink">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="size-4 text-muted shrink-0" />
                        ) : (
                          <ChevronDown className="size-4 text-muted shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-muted leading-relaxed border-t border-line/60 bg-paper/30 font-sans">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Campus Community & Mentor Callout */}
            <div className="mt-8 p-4 rounded-xl border border-safe/30 bg-safe-soft/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-safe font-mono text-xs font-bold uppercase tracking-wider">
                  <MessageSquare className="size-3.5" />
                  <span>If you want some help, you can take it here</span>
                </div>
                <p className="text-xs text-ink/80 leading-relaxed">
                  Join the IIIT Trichy Devs Discord & WhatsApp groups to ask questions to seniors and lab assistants directly.
                </p>
              </div>

              <a
                href="https://github.com/Syed-Haseeb97"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-safe text-paper text-xs font-semibold hover:bg-safe/90 cursor-pointer transition-colors shadow-xs"
              >
                <span>Ask on GitHub</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
