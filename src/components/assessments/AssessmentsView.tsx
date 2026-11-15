import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { assessmentsData } from '../../data/assessments';
import { phasesData } from '../../data/phases';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Terminal,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Check,
  Filter,
} from 'lucide-react';

export const AssessmentsView: React.FC = () => {
  const { state, recordQuizComplete, recordTaskComplete } = useApp();
  const [activePhaseId, setActivePhaseId] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [filterMode, setFilterMode] = useState<'all' | 'verified' | 'pending'>('all');
  const [taskInput, setTaskInput] = useState('');
  const [taskFeedback, setTaskFeedback] = useState<{ status: 'idle' | 'success' | 'error'; msg: string }>({
    status: 'idle',
    msg: '',
  });

  const phaseAssessment = assessmentsData[activePhaseId];
  const activePhase = phasesData.find((p) => p.id === activePhaseId) || phasesData[0];
  const quizList = phaseAssessment?.mcqs || phaseAssessment?.quiz || [];

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
    const question = quizList[qIdx];
    if (question && optionIdx === question.correct) {
      recordQuizComplete(activePhaseId, qIdx);
    }
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const task = phaseAssessment.terminalTask;
    let isSuccess = false;
    if (typeof task.validate === 'function') {
      isSuccess = Boolean(task.validate(taskInput));
    } else if (task.expected) {
      const cleanInput = taskInput.trim().toLowerCase().replace(/\s+/g, ' ');
      const exp = task.expected.toLowerCase().replace(/\s+/g, ' ');
      isSuccess = cleanInput.includes(exp) || cleanInput === exp;
    }

    if (isSuccess) {
      setTaskFeedback({
        status: 'success',
        msg: task.successOutput || `Exact match verified! Executed "${taskInput}". Challenge completed!`,
      });
      recordTaskComplete(activePhaseId);
    } else {
      setTaskFeedback({
        status: 'error',
        msg: `Incorrect syntax. Hint: ${task.hint}`,
      });
    }
  };

  // Filter questions based on filterMode
  const filteredQuizList = quizList
    .map((q, idx) => ({ ...q, originalIdx: idx }))
    .filter((q) => {
      const isVerified = Boolean(state.completedQuizzes[`${activePhaseId}-${q.originalIdx}`]);
      if (filterMode === 'verified') return isVerified;
      if (filterMode === 'pending') return !isVerified;
      return true;
    });

  const totalVerifiedInPhase = quizList.filter((_, idx) =>
    Boolean(state.completedQuizzes[`${activePhaseId}-${idx}`])
  ).length;

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="border-b border-line pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-xs text-muted shadow-xs mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-safe">
            KNOWLEDGE VERIFICATION • QUIZZES & TERMINAL TASKS
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink uppercase">
          Phase Verification & <br />
          <span className="text-safe italic font-normal">Interactive Terminal Challenges.</span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-muted">
          Validate your architectural and operational understanding across all nine phases. Each response is verified
          live with detailed rationales, with zero stress or point deductions.
        </p>
      </section>

      {/* Phase Selector Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-line pb-4 overflow-x-auto no-scrollbar">
        {phasesData.map((phase) => {
          const isSelected = phase.id === activePhaseId;
          const isTaskDone = state.completedTasks[phase.id];
          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => {
                setActivePhaseId(phase.id);
                setSelectedAnswers({});
                setTaskInput('');
                setTaskFeedback({ status: 'idle', msg: '' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-ink text-paper font-semibold shadow-xs'
                  : 'bg-surface text-muted border border-line hover:bg-paper hover:text-ink'
              }`}
            >
              <span>{phase.code}</span>
              {isTaskDone && <CheckCircle2 className="size-3 text-safe shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Responsive Grid: Quiz on Left, Terminal Verification on Right */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
        {/* Left Column: Conceptual Architectural Quiz */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-2">
              <Award className="size-4 text-safe" />
              <span>{activePhase.code} CONCEPTUAL QUIZ</span>
            </h2>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-paper p-1 rounded-full border border-line text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  filterMode === 'all' ? 'bg-surface text-ink font-bold shadow-xs' : 'text-muted hover:text-ink'
                }`}
              >
                All ({quizList.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('verified')}
                className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  filterMode === 'verified' ? 'bg-surface text-safe font-bold shadow-xs' : 'text-muted hover:text-ink'
                }`}
              >
                Verified ({totalVerifiedInPhase})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('pending')}
                className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  filterMode === 'pending' ? 'bg-surface text-warn font-bold shadow-xs' : 'text-muted hover:text-ink'
                }`}
              >
                Pending ({quizList.length - totalVerifiedInPhase})
              </button>
            </div>
          </div>

          {/* Helpful Empty State when no questions match filter */}
          {filteredQuizList.length === 0 ? (
            <div className="editorial-card p-8 sm:p-10 text-center space-y-3 bg-surface border border-line">
              <div className="flex size-12 mx-auto items-center justify-center rounded-full bg-paper border border-line text-muted">
                <CheckCircle2 className="size-6 text-safe" />
              </div>
              <h3 className="font-serif text-2xl text-ink font-semibold">
                {filterMode === 'verified'
                  ? 'No Verified Items Yet'
                  : 'All Questions Verified!'}
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                {filterMode === 'verified'
                  ? 'No items verified in this phase yet. Click below to view all questions and add your first verification!'
                  : 'Great job! You have answered every question in this phase correctly.'}
              </p>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ink text-paper text-xs font-semibold hover:bg-ink/90 cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                <span>View All Questions</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredQuizList.map((q) => {
                const qIdx = q.originalIdx;
                const selected = selectedAnswers[qIdx];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correct;
                const isSaved = state.completedQuizzes[`${activePhaseId}-${qIdx}`];

                return (
                  <div key={qIdx} className="editorial-card p-5 sm:p-7 space-y-4 border border-line bg-surface">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold leading-snug">
                        <span className="font-mono text-xs text-safe mr-2 font-bold">
                          Q{qIdx + 1}.
                        </span>
                        {q.q}
                      </h3>
                      {(isSaved || isCorrect) && (
                        <span className="font-mono text-[10px] text-safe bg-safe-soft px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                          VERIFIED
                        </span>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isOptionSelected = selected === oIdx;
                        const isOptionCorrect = oIdx === q.correct;

                        let btnStyle = 'border-line bg-paper/60 hover:bg-surface text-ink';
                        if (isAnswered) {
                          if (isOptionCorrect) {
                            btnStyle = 'border-safe bg-safe-soft text-safe font-semibold';
                          } else if (isOptionSelected && !isCorrect) {
                            btnStyle = 'border-risk bg-risk-soft text-risk';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(qIdx, oIdx)}
                            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span className="leading-relaxed">{opt}</span>
                            {isAnswered && isOptionCorrect && (
                              <CheckCircle2 className="size-4 text-safe shrink-0 ml-2" />
                            )}
                            {isAnswered && isOptionSelected && !isCorrect && (
                              <XCircle className="size-4 text-risk shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation rationale */}
                    {isAnswered && (
                      <div className="p-3.5 rounded-xl border border-line bg-paper text-xs leading-relaxed space-y-1 animate-in fade-in">
                        <p className="font-mono font-bold text-[11px] text-ink uppercase flex items-center gap-1.5">
                          <HelpCircle className="size-3.5 text-safe" />
                          <span>Architectural Rationale</span>
                        </p>
                        <p className="text-muted">{q.explain}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Interactive Terminal Verification Task */}
        <div className="space-y-5 lg:sticky lg:top-20">
          <div className="editorial-card p-5 sm:p-7 space-y-4 border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-xs font-bold text-safe uppercase flex items-center gap-1.5">
                <Terminal className="size-3.5" />
                <span>TERMINAL VERIFICATION TASK</span>
              </span>
              <span className="font-mono text-[10px] text-safe bg-safe-soft px-2.5 py-0.5 rounded-full font-bold">
                PRACTICE TASK
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-ink font-semibold">
                Hands-on CLI Assessment
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Execute the expected Git command to verify terminal competence for {activePhase.code}.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-paper border border-line font-mono text-xs space-y-2">
              <p className="text-muted font-bold">TASK INSTRUCTION:</p>
              <p className="text-ink">{phaseAssessment.terminalTask.instruction}</p>
            </div>

            <form onSubmit={handleTaskSubmit} className="space-y-3">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-ink/40 font-mono text-xs">
                <span className="text-safe font-bold select-none">&gt;</span>
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="Enter exact command syntax..."
                  className="w-full bg-transparent outline-hidden text-ink"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setTaskFeedback({
                      status: 'idle',
                      msg: `Hint: ${phaseAssessment.terminalTask.hint}`,
                    })
                  }
                  className="text-[11px] font-mono text-muted hover:text-ink cursor-pointer"
                >
                  Need a hint?
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-ink text-paper font-mono text-xs font-semibold cursor-pointer hover:bg-ink/90 transition-transform active:scale-95"
                >
                  Verify Command
                </button>
              </div>
            </form>

            {taskFeedback.msg && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-mono leading-relaxed animate-in fade-in ${
                  taskFeedback.status === 'success'
                    ? 'border-safe bg-safe-soft text-safe font-semibold'
                    : taskFeedback.status === 'error'
                    ? 'border-risk bg-risk-soft text-risk font-semibold'
                    : 'border-line bg-paper text-muted'
                }`}
              >
                {taskFeedback.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
