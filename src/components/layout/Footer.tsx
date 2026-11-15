import React from 'react';
import { GitBranch, ShieldCheck, Heart } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line bg-surface mt-16 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-lg text-ink font-semibold">
                IIIT Tiruchirappalli • Developer Community
              </h4>
            </div>
            <p className="text-xs text-muted max-w-md">
              Institute of National Importance • Permanent Campus: Sethurappatti, Tiruchirappalli – 620012, Tamil Nadu, India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-paper">
              <GitBranch className="size-3 text-safe" />
              Git DAG • SHA-1 Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-paper">
              <ShieldCheck className="size-3 text-warn" />
              OIDC • Zero Static Keys
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-paper">
              <Heart className="size-3 text-risk" />
              Crafted for IIITT CSE & ECE
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            &copy; {CURRENT_YEAR} IIIT Trichy Devs. Built strictly in light mode with editorial typography.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-safe font-semibold">
              v2.0 PRODUCTION GRADE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
