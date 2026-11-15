import React, { useState } from 'react';
import { projectsLabData, type ProjectBlueprint } from '../../data/projects';
import {
  Layers,
  GraduationCap,
  FileCode,
  Copy,
  Check,
  FolderGit2,
  Search,
  X,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const ProjectsLabView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectBlueprint>(projectsLabData[0]);
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [copiedFile, setCopiedFile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'fullstack' | 'club' | 'hardware'>('all');

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const filteredProjects = projectsLabData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.goal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter === 'fullstack') {
      return p.title.toLowerCase().includes('portal') || p.title.toLowerCase().includes('mess') || p.title.toLowerCase().includes('hostel');
    }
    if (categoryFilter === 'club') {
      return p.title.toLowerCase().includes('ieee') || p.title.toLowerCase().includes('club') || p.title.toLowerCase().includes('student');
    }
    if (categoryFilter === 'hardware') {
      return p.title.toLowerCase().includes('ece') || p.title.toLowerCase().includes('vlsi') || p.title.toLowerCase().includes('embedded');
    }

    return true;
  });

  const currentFile = selectedProject.files && selectedProject.files[activeFileIdx]
    ? selectedProject.files[activeFileIdx]
    : null;

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="border-b border-line pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-xs text-muted shadow-xs mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-safe">
            APPLIED REPOSITORIES • IIIT TRICHY CAMPUS BUILDS
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink uppercase">
          Real-World GitHub Projects <br />
          <span className="text-safe italic font-normal">for First-Year Students.</span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-muted">
          Don't just memorize commands—build production repositories. These curated campus project blueprints
          prepare you for hackathons, research labs, and open-source contributions with copyable starter code and configuration files.
        </p>
      </section>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campus blueprints (hostel, IEEE, ECE)..."
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-line bg-surface text-xs font-sans text-ink placeholder:text-muted outline-hidden focus:border-safe"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 bg-paper p-1 rounded-full border border-line text-[11px] font-mono overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'fullstack', label: 'Full-Stack' },
            { id: 'club', label: 'Club & Web' },
            { id: 'hardware', label: 'ECE / Core' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id as typeof categoryFilter)}
              className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-surface text-ink font-bold shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Responsive Grid: Projects Catalog on Left, Blueprint Code Viewer on Right */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
        {/* Left Column: Projects Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-muted">
              SELECT A PROJECT BLUEPRINT
            </h2>
            <span className="font-mono text-xs text-safe font-semibold">
              {filteredProjects.length} Available
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            /* Helpful Empty State */
            <div className="editorial-card p-8 sm:p-10 text-center space-y-3 bg-surface border border-line">
              <div className="flex size-12 mx-auto items-center justify-center rounded-full bg-paper border border-line text-muted">
                <FolderGit2 className="size-6 text-muted" />
              </div>
              <h3 className="font-serif text-2xl text-ink font-semibold">
                No Projects Found
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                No items match "{searchQuery}". Click here to clear your search and explore all starter blueprints.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ink text-paper text-xs font-semibold hover:bg-ink/90 cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                <span>Clear Filters & Reset</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((project, idx) => {
                const isSelected = project.id === selectedProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveFileIdx(0);
                    }}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2.5 ${
                      isSelected
                        ? 'border-safe bg-surface shadow-md ring-2 ring-safe/20'
                        : 'border-line bg-surface/70 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase font-bold text-safe bg-safe-soft px-2.5 py-0.5 rounded-full border border-safe/25">
                        {project.tag || `CAMPUS BLUEPRINT`}
                      </span>
                      <span className="font-mono text-[11px] text-muted">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                        {project.goal || project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-line/60 font-mono text-xs">
                      <span className="text-muted text-[11px]">
                        {project.files?.length || 0} Starter Templates
                      </span>
                      <span className="text-safe font-semibold flex items-center gap-1 text-[11px]">
                        Inspect Code &rarr;
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Code & Configuration Inspector */}
        <div className="space-y-5 lg:sticky lg:top-20">
          <div className="editorial-card p-5 sm:p-7 space-y-5 border border-line bg-surface">
            {/* Project Header */}
            <div className="space-y-2 border-b border-line pb-4">
              <span className="font-mono text-[10px] uppercase font-bold text-safe bg-safe-soft px-2.5 py-0.5 rounded-full border border-safe/25">
                {selectedProject.tag || 'ACTIVE BLUEPRINT'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight">
                {selectedProject.title}
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                {selectedProject.goal || selectedProject.description}
              </p>
            </div>

            {/* File Switcher Tabs */}
            {selectedProject.files && selectedProject.files.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-muted">
                    SELECT STARTER TEMPLATE FILE:
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {selectedProject.files.length} files
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {selectedProject.files.map((file, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveFileIdx(idx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                        activeFileIdx === idx
                          ? 'bg-ink text-paper font-bold'
                          : 'bg-paper text-muted border border-line hover:bg-surface hover:text-ink'
                      }`}
                    >
                      <FileCode className="size-3" />
                      <span>{file.name}</span>
                    </button>
                  ))}
                </div>

                {/* File Code Display Box */}
                {currentFile && (
                  <div className="rounded-xl border border-line overflow-hidden bg-white shadow-xs">
                    <div className="bg-paper px-3 sm:px-4 py-2 border-b border-line flex items-center justify-between text-xs font-mono">
                      <span className="text-ink font-bold truncate max-w-xs">
                        {currentFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode((currentFile as any).code || (currentFile as any).content || '')}
                        className="inline-flex items-center gap-1 text-xs text-safe hover:text-ink cursor-pointer transition-colors"
                      >
                        {copiedFile ? (
                          <>
                            <Check className="size-3 text-safe" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy File</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3.5 sm:p-4 text-[11px] sm:text-xs font-mono leading-relaxed bg-white text-ink overflow-x-auto max-h-[380px] custom-scroll">
                      <code>{(currentFile as any).code || (currentFile as any).content || ''}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
