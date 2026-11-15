import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserProfile } from '../../types';
import { Sparkles, GraduationCap, ArrowRight, X, Compass, Target, BookOpen } from 'lucide-react';

export const PersonalizationModal: React.FC = () => {
  const { state, setUserProfile, setPersonalizationOpen } = useApp();

  const [experience, setExperience] = useState<UserProfile['experience']>(
    state.userProfile?.experience || 'beginner'
  );
  const [goal, setGoal] = useState<UserProfile['goal']>(
    state.userProfile?.goal || 'college_lab'
  );
  const [department, setDepartment] = useState<UserProfile['department']>(
    state.userProfile?.department || 'cse'
  );

  if (!state.personalizationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      experience,
      goal,
      department,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl editorial-card bg-surface p-6 sm:p-8 shadow-2xl border border-line animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button if profile already exists */}
        {state.userProfile && (
          <button
            type="button"
            onClick={() => setPersonalizationOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full border border-line text-muted hover:text-ink hover:bg-paper cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        )}

        {/* Header */}
        <div className="space-y-2 border-b border-line pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-safe/25 bg-safe-soft px-3.5 py-1 text-xs text-safe font-mono uppercase tracking-wider font-semibold">
            <GraduationCap className="size-3.5" />
            <span>IIIT TRICHY DEVS ONBOARDING</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
            Personalize Your Journey.
          </h2>

          <p className="text-sm text-muted leading-relaxed">
            Answer 3 quick questions so we can tailor the curriculum pacing, recommendations, and starter blueprints for your background.
          </p>
        </div>

        {/* Form Questions */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Question 1: Experience */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
              <Compass className="size-3.5 text-safe" />
              1. What is your prior Git & GitHub experience?
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'beginner',
                  title: 'Absolute Beginner',
                  desc: 'Never used Git before. Start from day-one basics.',
                },
                {
                  id: 'intermediate',
                  title: 'Practiced Basics',
                  desc: 'Know add, commit, push. Ready for branches & PRs.',
                },
                {
                  id: 'advanced',
                  title: 'Advanced / Exploring',
                  desc: 'Looking into CI/CD, GitHub Actions & AI agents.',
                },
              ].map((opt) => {
                const isSelected = experience === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setExperience(opt.id as UserProfile['experience'])}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-safe bg-safe-soft/30 text-ink ring-2 ring-safe/20'
                        : 'border-line bg-surface hover:bg-paper text-muted'
                    }`}
                  >
                    <div>
                      <div className="font-sans text-xs font-semibold text-ink">
                        {opt.title}
                      </div>
                      <div className="text-[11px] text-muted mt-1 leading-snug">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Primary Goal */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
              <Target className="size-3.5 text-safe" />
              2. What is your main objective right now?
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'college_lab',
                  title: 'College Lab Work',
                  desc: 'Submitting assignments, CSE/ECE coursework repos.',
                },
                {
                  id: 'portfolio',
                  title: 'Resume & Portfolio',
                  desc: 'Building clean projects for internships & hackathons.',
                },
                {
                  id: 'opensource',
                  title: 'Team & Open-Source',
                  desc: 'Collaborating in teams, GSoC, and club projects.',
                },
              ].map((opt) => {
                const isSelected = goal === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoal(opt.id as UserProfile['goal'])}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-safe bg-safe-soft/30 text-ink ring-2 ring-safe/20'
                        : 'border-line bg-surface hover:bg-paper text-muted'
                    }`}
                  >
                    <div>
                      <div className="font-sans text-xs font-semibold text-ink">
                        {opt.title}
                      </div>
                      <div className="text-[11px] text-muted mt-1 leading-snug">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Department */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
              <BookOpen className="size-3.5 text-safe" />
              3. Which engineering department are you in?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'cse', title: 'CSE', desc: 'Computer Science' },
                { id: 'ece', title: 'ECE', desc: 'Electronics & Comm' },
                { id: 'vlsi_other', title: 'VLSI / Other', desc: 'Hardware & Core Engg' },
              ].map((opt) => {
                const isSelected = department === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDepartment(opt.id as UserProfile['department'])}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-safe bg-safe-soft/30 text-ink ring-2 ring-safe/20'
                        : 'border-line bg-surface hover:bg-paper text-muted'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-ink uppercase">
                      {opt.title}
                    </div>
                    <div className="text-[10px] text-muted mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-muted">
              Picks customize phase pacing & examples
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink text-paper font-sans text-xs font-semibold hover:bg-ink/90 cursor-pointer shadow-md transition-transform active:scale-95"
            >
              <span>Save & Start Spotlight Tour</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
