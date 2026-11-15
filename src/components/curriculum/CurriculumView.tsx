import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { phasesData, type Phase } from '../../data/phases';
import {
  BeginnerProfileTour,
  UploadMethodsInteractiveGuide,
  CommitDiffExplorer,
  GitIgnoreInteractiveGuide,
} from './BeginnerVisualGuides';
import { GithubMcpConnectorGuide } from './GithubMcpConnectorGuide';
import {
  Compass,
  UploadCloud,
  Clock,
  GitBranch,
  Layers,
  Terminal,
  Shield,
  Bot,
  Network,
  ArrowRight,
  Copy,
  Check,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  GitFork,
} from 'lucide-react';

export const CurriculumView: React.FC = () => {
  const { state, setActivePhase, setView } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activePhase: Phase =
    phasesData.find((p) => p.id === state.activePhaseId) || phasesData[0];

  const handleCopy = (codeText: string, label: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getPhaseIcon = (id: number) => {
    switch (id) {
      case 1:
        return Compass;
      case 2:
        return UploadCloud;
      case 3:
        return Clock;
      case 4:
        return GitBranch;
      case 5:
        return Layers;
      case 6:
        return Terminal;
      case 7:
        return Shield;
      case 8:
        return Bot;
      case 9:
        return Network;
      case 10:
        return GitFork;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-10 view-enter">
      {/* Top Hero: Editorial Manifesto Banner */}
      <section className="border-b border-line pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-muted shadow-sm mb-4">
          <span className="font-mono text-[11px] tracking-wider uppercase font-semibold text-safe">
            THE ARCHITECTURAL CONTINUUM • IIIT TRICHY
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[0.94] tracking-tight text-ink uppercase">
          From Beginner Foundations <br />
          <span className="text-safe italic font-normal">to AI Agentic Orchestration.</span>
        </h1>

        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted">
          A definitive, ten-phase progressive curriculum for Indian Institute of Information Technology,
          Tiruchirappalli developers. Slow-paced for complete beginners on day one, journeying from basic repositories,
          commits, and code uploads to enterprise CI/CD, OIDC federation, Model Context Protocol (MCP) AI agents, and the open-source workflow.
        </p>
      </section>

      {/* Phase Progression Stepper Grid (10 Phases) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-muted">
            01 / TEN-PHASE PROGRESSIVE ROADMAP
          </h2>
          <span className="font-mono text-xs text-safe font-semibold">
            Phase {activePhase.id} of 10 Selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {phasesData.map((phase) => {
            const Icon = getPhaseIcon(phase.id);
            const isSelected = phase.id === activePhase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhase(phase.id)}
                className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-safe bg-surface shadow-md ring-2 ring-safe/20'
                    : 'border-line bg-surface/70 hover:bg-surface hover:border-line'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`font-mono text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-safe text-paper'
                        : 'bg-paper text-muted border border-line'
                    }`}
                  >
                    {phase.id < 10 ? `0${phase.id}` : phase.id}
                  </span>
                  <Icon
                    className={`size-3.5 ${isSelected ? 'text-safe' : 'text-muted'}`}
                  />
                </div>
                <div>
                  <h3 className="font-sans text-[11px] font-semibold text-ink line-clamp-1">
                    {phase.shortTitle}
                  </h3>
                  <p className="font-mono text-[9px] text-muted mt-0.5">
                    {phase.id <= 3 ? 'Beginner' : phase.id <= 6 ? 'Core' : 'Advanced'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Phase Deep Dive */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left Column: Architectural Content & Explanations */}
        <div className="space-y-8">
          {/* Main Phase Header */}
          <div className="editorial-card p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-safe bg-safe-soft border border-safe/25 px-3 py-1 rounded-full font-bold">
                {activePhase.code} SPECIFICATION
              </span>
              <span className="text-muted text-xs font-mono">•</span>
              <span className="text-muted text-xs font-mono">
                {activePhase.id <= 3 ? 'Foundational Track' : 'Engineering Track'}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-semibold">
              {activePhase.title}
            </h2>

            <p className="text-sm leading-relaxed text-muted">
              {activePhase.subtitle}
            </p>

            {/* Analogy Callout Box */}
            <div className="p-4 sm:p-5 rounded-xl border border-safe/30 bg-safe-soft/40 space-y-2">
              <div className="flex items-center gap-2 text-safe font-semibold text-xs font-mono uppercase tracking-wider">
                <Lightbulb className="size-4 text-safe" />
                <span>{activePhase.analogyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {activePhase.analogyText}
              </p>
            </div>

            {/* Technical Terms Glossary Chips */}
            {activePhase.technicalTerms && activePhase.technicalTerms.length > 0 && (
              <div className="pt-2 border-t border-line/60 space-y-2">
                <span className="font-mono text-[11px] font-bold text-ink uppercase">
                  Key Vocabulary for Beginners:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activePhase.technicalTerms.map((t, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-2.5 rounded-lg border border-line bg-paper/60 space-y-0.5"
                    >
                      <p className="font-mono font-bold text-ink text-[11px]">
                        {t.term}
                      </p>
                      <p className="text-muted text-[11px] leading-relaxed">
                        {t.plain}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Beginner Visual Guides based on active phase */}
          {activePhase.id === 1 && <BeginnerProfileTour />}
          {activePhase.id === 2 && (
            <div className="space-y-6">
              <UploadMethodsInteractiveGuide />
              <GitIgnoreInteractiveGuide />
            </div>
          )}
          {activePhase.id === 3 && <CommitDiffExplorer />}
          {activePhase.id === 9 && <GithubMcpConnectorGuide />}

          {/* Core Architectural Sections */}
          <div className="space-y-6">
            {activePhase.sections.map((section, sIdx) => (
              <div key={sIdx} className="editorial-card p-6 sm:p-8 space-y-4">
                <h3 className="font-serif text-2xl text-ink font-semibold flex items-center gap-2">
                  <span className="font-mono text-sm text-safe font-bold">
                    0{sIdx + 1}.
                  </span>
                  <span>{section.heading}</span>
                </h3>

                <p className="text-sm text-ink leading-relaxed">
                  {section.content || section.body}
                </p>

                {section.code && (
                  <div className="rounded-xl border border-ink bg-surface overflow-hidden">
                    <div className="bg-paper px-4 py-2 border-b border-line flex items-center justify-between text-xs font-mono text-muted">
                      <span>SYNTAX • SPECIFICATION</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(section.code!, `sec-${activePhase.id}-${sIdx}`)
                        }
                        className="flex items-center gap-1 hover:text-ink transition-colors cursor-pointer"
                      >
                        {copiedCode === `sec-${activePhase.id}-${sIdx}` ? (
                          <>
                            <Check className="size-3 text-safe" />
                            <span className="text-safe">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 font-mono text-xs text-ink overflow-x-auto whitespace-pre-wrap bg-white">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                )}

                {section.tip && (
                  <div className="p-3.5 rounded-lg border border-line bg-paper text-xs text-muted flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-safe shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{section.tip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="p-6 rounded-2xl border border-line bg-surface flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-sm text-ink">
                Ready to practice {activePhase.code}?
              </h4>
              <p className="text-xs text-muted">
                Test your skills in the Windows CMD simulator or take the phase quiz.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setView('sandbox')}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-full border border-line bg-paper hover:bg-surface text-ink font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Terminal className="size-3.5" />
                <span>Open Terminal</span>
              </button>
              <button
                type="button"
                onClick={() => setView('assessments')}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-ink hover:bg-ink/90 text-paper font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Take Quiz</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {activePhase.id === 10 && (
            <div className="p-6 rounded-2xl border border-safe/30 bg-safe-soft/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-safe bg-surface px-2.5 py-0.5 rounded-full border border-safe/25">
                  FINAL CURRICULUM MILESTONE
                </span>
                <h4 className="font-serif text-lg text-ink font-semibold mt-1.5">
                  Ready for Life Beyond the Curriculum?
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Explore the week-by-week developer roadmap: identity setup, campus builds, team projects, and specialized tracks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setView('whats-next')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-safe hover:bg-safe/90 text-paper font-mono text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <span>Explore What's Next</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Visual Frame & CLI Examples */}
        <div className="space-y-6 lg:sticky lg:top-20">
          {/* Visual Showcase Card */}
          <div className="editorial-card overflow-hidden">
            <div className="p-3 border-b border-line bg-paper flex items-center justify-between text-xs font-mono text-muted">
              <span className="font-semibold text-ink">
                {activePhase.code} • VISUAL OVERVIEW
              </span>
              <span className="text-[10px] bg-white border border-line px-2 py-0.5 rounded-full">
                FIG. 0{activePhase.id}
              </span>
            </div>

            <div className="relative aspect-video w-full bg-paper overflow-hidden">
              <img
                src={activePhase.image}
                alt={activePhase.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-4 bg-surface text-xs text-muted border-t border-line">
              <p className="italic font-serif text-sm text-ink mb-1">
                "{activePhase.shortTitle}"
              </p>
              <p>
                {activePhase.imageCaption || 'Visual model mapping workflows from local development to cloud collaboration.'}
              </p>
            </div>
          </div>

          {/* Hands-on CLI Reference Card */}
          <div className="editorial-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-2">
                <Terminal className="size-4 text-safe" />
                <span>PHASE {activePhase.id} COMMAND RUNBOOK</span>
              </h3>
              <span className="font-mono text-[10px] text-muted">
                cmd.exe • bash
              </span>
            </div>

            <p className="text-xs text-muted">
              Standard commands for this phase. Click copy to run them on your computer.
            </p>

            <div className="space-y-3">
              {(activePhase.commandsTable || []).map((cli, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-xl border border-line bg-paper overflow-hidden text-xs"
                >
                  <div className="px-3.5 py-1.5 border-b border-line/60 bg-surface/50 flex items-center justify-between">
                    <span className="font-medium text-ink text-[11px] font-mono">
                      $ {cli.cmd}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(cli.cmd, `cli-${cIdx}`)}
                      className="text-muted hover:text-ink transition-colors cursor-pointer"
                      title="Copy command"
                    >
                      {copiedCode === `cli-${cIdx}` ? (
                        <Check className="size-3 text-safe" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                  </div>
                  <div className="p-3 font-mono space-y-1">
                    <p className="text-muted text-[11px] leading-relaxed">
                      {cli.use || (cli as any).desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
