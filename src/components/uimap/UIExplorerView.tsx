import React, { useState } from 'react';
import { uiHotspotsData, type Hotspot } from '../../data/hotspots';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  GitBranch,
  GitPullRequest,
  AlertCircle,
  PlayCircle,
  Shield,
  Star,
  GitFork,
  Eye,
  CheckCircle2,
  HelpCircle,
  FileCode,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Download,
  Terminal,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

export const UIExplorerView: React.FC = () => {
  const { updateChecklist } = useApp();
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(uiHotspotsData[0]);
  const [copiedClone, setCopiedClone] = useState(false);
  const [showClonePopup, setShowClonePopup] = useState(false);

  const handleSelect = (spot: Hotspot) => {
    setSelectedHotspot(spot);
    updateChecklist('inspectedUIMap', true);
  };

  const copyCloneCmd = () => {
    navigator.clipboard.writeText('git clone https://github.com/iiitt-devs/campus-portal.git');
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div className="space-y-8 sm:space-y-10 view-enter">
      {/* Header Banner */}
      <section className="border-b border-line pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-xs text-muted shadow-sm mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-safe">
            SURFACE ANATOMY • GITHUB.COM REPOSITORY
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink uppercase">
          Where Everything Lives on GitHub. <br />
          <span className="text-safe italic font-normal">Interactive Beginner Guide.</span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-muted">
          Never feel lost when opening github.com. Click on any button, tab, or file in the simulated GitHub window below to see exactly what it does in simple, plain English.
        </p>
      </section>

      {/* Main Responsive Split Grid */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
        {/* Left Column: Interactive Simulated GitHub Browser Window */}
        <div className="space-y-4">
          <div className="editorial-card overflow-hidden shadow-sm border border-line bg-surface">
            {/* Browser top chrome bar */}
            <div className="bg-paper border-b border-line px-3 sm:px-4 py-2 flex items-center justify-between text-xs font-mono text-muted">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#E57373]" />
                <span className="size-2.5 rounded-full bg-[#FFD54F]" />
                <span className="size-2.5 rounded-full bg-[#81C784]" />
                <span className="ml-2 font-mono text-[10px] sm:text-[11px] text-muted truncate max-w-[200px] sm:max-w-xs">
                  https://github.com/iiitt-devs/campus-portal
                </span>
              </div>
              <span className="text-[10px] text-safe bg-safe-soft px-2 py-0.5 rounded-full font-bold">
                CLICK ANY ITEM TO INSPECT
              </span>
            </div>

            {/* Simulated GitHub Header & Action Hotspots */}
            <div className="p-4 sm:p-6 bg-surface border-b border-line space-y-4">
              {/* Row 1: Repo Title & Fork / Star / Watch buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Hotspot 1: Namespace */}
                <button
                  type="button"
                  onClick={() => handleSelect(uiHotspotsData[0])}
                  className={`flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedHotspot.id === 1
                      ? 'bg-safe-soft text-safe ring-2 ring-safe/40'
                      : 'hover:bg-paper text-ink'
                  }`}
                  title="Click to inspect Repository Namespace"
                >
                  <span className="text-muted font-normal">iiitt-devs</span>
                  <span className="text-muted font-normal">/</span>
                  <span className="text-ink font-mono font-bold">campus-portal</span>
                  <span className="text-[10px] font-mono border border-line px-2 py-0.5 rounded-full text-muted ml-1">
                    Public
                  </span>
                </button>

                {/* Hotspots 2 & 3: Watch, Fork, Star buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono">
                  {/* Watch */}
                  <button
                    type="button"
                    onClick={() => handleSelect(uiHotspotsData[2])}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-all ${
                      selectedHotspot.id === 3
                        ? 'border-safe bg-safe-soft text-safe ring-2 ring-safe/30'
                        : 'border-line bg-paper text-ink hover:bg-surface'
                    }`}
                  >
                    <Eye className="size-3 text-muted" />
                    <span>Watch</span>
                    <span className="bg-line/40 px-1.5 py-0.2 rounded-full text-[10px]">12</span>
                  </button>

                  {/* Fork */}
                  <button
                    type="button"
                    onClick={() => handleSelect(uiHotspotsData[1])}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-all ${
                      selectedHotspot.id === 2
                        ? 'border-safe bg-safe-soft text-safe ring-2 ring-safe/30'
                        : 'border-line bg-paper text-ink hover:bg-surface'
                    }`}
                  >
                    <GitFork className="size-3 text-muted" />
                    <span>Fork</span>
                    <span className="bg-line/40 px-1.5 py-0.2 rounded-full text-[10px]">8</span>
                  </button>

                  {/* Star */}
                  <button
                    type="button"
                    onClick={() => handleSelect(uiHotspotsData[2])}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-all ${
                      selectedHotspot.id === 3
                        ? 'border-safe bg-safe-soft text-safe ring-2 ring-safe/30'
                        : 'border-line bg-paper text-ink hover:bg-surface'
                    }`}
                  >
                    <Star className="size-3 text-warn fill-warn/20" />
                    <span>Star</span>
                    <span className="bg-line/40 px-1.5 py-0.2 rounded-full text-[10px]">47</span>
                  </button>
                </div>
              </div>

              {/* Row 2: GitHub Main Navigation Tabs (Code, Issues, PRs, Actions) */}
              <div className="flex items-center gap-1 border-b border-line/60 pt-1 -mb-1 overflow-x-auto no-scrollbar">
                {[
                  { name: 'Code', icon: FileCode, spotId: 4 },
                  { name: 'Issues', icon: AlertCircle, count: '3', spotId: 5 },
                  { name: 'Pull requests', icon: GitPullRequest, count: '1', spotId: 6 },
                  { name: 'Actions', icon: PlayCircle, spotId: 7 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isLinked = selectedHotspot.id === tab.spotId;
                  return (
                    <button
                      key={tab.spotId}
                      type="button"
                      onClick={() => {
                        const target = uiHotspotsData.find((h) => h.id === tab.spotId);
                        if (target) handleSelect(target);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer shrink-0 ${
                        isLinked
                          ? 'border-safe text-safe font-semibold bg-safe-soft/30'
                          : 'border-transparent text-muted hover:text-ink hover:border-line'
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{tab.name}</span>
                      {tab.count && (
                        <span className="bg-paper border border-line text-[10px] px-1.5 py-0.2 rounded-full font-mono text-muted">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Branch selector & Green <> Code Button */}
            <div className="p-4 sm:p-5 bg-paper/30 border-b border-line flex flex-wrap items-center justify-between gap-3">
              {/* Branch Selector Hotspot */}
              <button
                type="button"
                onClick={() => handleSelect(uiHotspotsData[7])}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                  selectedHotspot.id === 8
                    ? 'border-safe bg-safe-soft text-safe ring-2 ring-safe/30'
                    : 'border-line bg-surface text-ink hover:bg-paper'
                }`}
              >
                <GitBranch className="size-3.5 text-muted" />
                <span className="font-semibold">main</span>
                <ChevronDown className="size-3 text-muted" />
              </button>

              {/* Commit counter link */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted">
                  <strong className="text-ink">14</strong> commits
                </span>

                {/* Green Code Button Hotspot */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelect(uiHotspotsData[8]);
                      setShowClonePopup(!showClonePopup);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shadow-sm ${
                      selectedHotspot.id === 9
                        ? 'bg-safe text-paper ring-3 ring-safe/30'
                        : 'bg-[#1D6B52] text-paper hover:bg-[#165641]'
                    }`}
                  >
                    <FileCode className="size-3.5" />
                    <span>&lt;&gt; Code</span>
                    <ChevronDown className="size-3" />
                  </button>

                  {/* Interactive Clone Dropdown Simulation */}
                  {showClonePopup && (
                    <div className="absolute right-0 top-9 w-72 sm:w-80 editorial-card bg-surface p-3.5 shadow-xl border border-line z-30 animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between text-xs font-mono border-b border-line pb-2 mb-2">
                        <span className="font-bold text-ink">Clone HTTPS</span>
                        <span className="text-[10px] text-safe bg-safe-soft px-1.5 py-0.5 rounded">
                          Recommended
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-paper p-1.5 rounded-lg border border-line">
                        <input
                          type="text"
                          readOnly
                          value="https://github.com/iiitt-devs/campus-portal.git"
                          className="bg-transparent text-[11px] font-mono text-muted w-full outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={copyCloneCmd}
                          className="p-1 rounded hover:bg-surface text-muted hover:text-ink cursor-pointer"
                          title="Copy clone URL"
                        >
                          {copiedClone ? (
                            <Check className="size-3.5 text-safe" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-muted mt-2 leading-tight">
                        Run <code className="font-mono bg-paper px-1 py-0.5 rounded">git clone &lt;url&gt;</code> in VS Code to download.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated File List with Hotspot 10 for Foundational Files */}
            <div className="divide-y divide-line/60 text-xs font-mono">
              {[
                { name: '.github/workflows/deploy.yml', desc: 'Add CI build & test runner', time: '1 day ago', isCore: false },
                { name: 'src/components/Portal.tsx', desc: 'Update student hostel forms', time: '3 hours ago', isCore: false },
                { name: '.gitignore', desc: 'Ignore node_modules and .env secrets', time: '2 days ago', isCore: true },
                { name: 'LICENSE', desc: 'Add MIT License', time: '3 days ago', isCore: true },
                { name: 'README.md', desc: 'Document setup and project architecture', time: '4 hours ago', isCore: true },
              ].map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (file.isCore) {
                      handleSelect(uiHotspotsData[9]);
                    } else {
                      handleSelect(uiHotspotsData[3]);
                    }
                  }}
                  className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    file.isCore && selectedHotspot.id === 10
                      ? 'bg-safe-soft/30 font-semibold'
                      : 'hover:bg-paper/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`size-3.5 shrink-0 ${file.isCore ? 'text-safe' : 'text-muted'}`} />
                    <span className={file.isCore ? 'text-ink font-semibold' : 'text-ink'}>
                      {file.name}
                    </span>
                  </div>
                  <div className="hidden sm:block text-muted text-[11px] truncate max-w-xs">
                    {file.desc}
                  </div>
                  <span className="text-[10px] text-muted shrink-0">{file.time}</span>
                </div>
              ))}
            </div>

            {/* Rendered README preview box */}
            <div
              onClick={() => handleSelect(uiHotspotsData[9])}
              className="p-4 sm:p-5 bg-paper/20 border-t border-line cursor-pointer hover:bg-paper/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
                <FileCode className="size-3.5 text-safe" />
                <span className="font-semibold text-ink">README.md Preview</span>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-line text-xs font-sans text-muted space-y-1">
                <h4 className="font-serif text-base text-ink font-semibold">
                  # Campus Hostel & Room Allotment Portal
                </h4>
                <p className="text-[11px] leading-relaxed">
                  Official full-stack portal built by IIIT Trichy Devs. Run <code className="font-mono bg-paper px-1 rounded">npm install</code> followed by <code className="font-mono bg-paper px-1 rounded">npm run dev</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Hotspot Buttons Grid */}
          <div className="editorial-card p-4 sm:p-5 border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-muted">
                ALL 10 REPOSITORY HOTSPOTS
              </span>
              <span className="font-mono text-xs text-safe font-semibold">
                Click any button to learn
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {uiHotspotsData.map((spot) => {
                const isSelected = selectedHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleSelect(spot)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-safe bg-safe-soft text-ink font-semibold ring-2 ring-safe/25'
                        : 'border-line bg-paper/60 hover:bg-surface text-muted hover:text-ink'
                    }`}
                  >
                    <div className="font-mono text-[9px] uppercase font-bold text-safe">
                      0{spot.id}
                    </div>
                    <div className="font-sans text-xs font-medium text-ink mt-0.5 line-clamp-1">
                      {spot.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Clear, Simplified Explanations */}
        <div className="editorial-card p-5 sm:p-7 space-y-5 lg:sticky lg:top-20 border border-line bg-surface">
          {/* Header pill */}
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="font-mono text-xs font-bold text-safe bg-safe-soft border border-safe/25 px-3 py-1 rounded-full uppercase">
              {selectedHotspot.badge}
            </span>
            <span className="font-mono text-[11px] text-muted">
              BEGINNER ANATOMY
            </span>
          </div>

          {/* Title and Simple Summary */}
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight">
              {selectedHotspot.title}
            </h2>
            <div className="p-3 rounded-xl bg-paper border border-line text-xs sm:text-sm font-sans text-ink font-medium leading-relaxed">
              💡 {selectedHotspot.simpleSummary}
            </div>
          </div>

          {/* Detailed explanation */}
          <div className="space-y-1.5 text-xs sm:text-sm text-muted leading-relaxed font-sans">
            <h4 className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider">
              What does this do?
            </h4>
            <p>{selectedHotspot.whatItIs}</p>
          </div>

          {/* Where is it located */}
          <div className="p-3 rounded-xl border border-line bg-paper/60 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink uppercase">
              <MapPin className="size-3.5 text-safe" />
              <span>Where to look on github.com</span>
            </div>
            <p className="text-muted leading-relaxed">
              {selectedHotspot.where}
            </p>
          </div>

          {/* Student advice */}
          <div className="p-3.5 rounded-xl border border-safe/30 bg-safe-soft/30 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-safe uppercase">
              <Lightbulb className="size-3.5 text-safe" />
              <span>First-Year IIITT Student Advice</span>
            </div>
            <p className="text-ink leading-relaxed">
              {selectedHotspot.studentTip}
            </p>
          </div>

          {/* Beginner mistake alert */}
          {selectedHotspot.beginnerMistake && (
            <div className="p-3 rounded-xl border border-warn/30 bg-warn-soft/30 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-warn uppercase">
                <AlertTriangle className="size-3.5 text-warn" />
                <span>Common Beginner Mistake to Avoid</span>
              </div>
              <p className="text-ink/80 leading-relaxed">
                {selectedHotspot.beginnerMistake}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
