import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border border-line bg-surface shadow-lg animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' ? (
              <span className="flex size-7 items-center justify-center rounded-full bg-safe-soft text-safe border border-safe/25">
                <CheckCircle2 className="size-4" />
              </span>
            ) : toast.type === 'info' ? (
              <span className="flex size-7 items-center justify-center rounded-full bg-paper text-ink border border-line">
                <Info className="size-4" />
              </span>
            ) : (
              <span className="flex size-7 items-center justify-center rounded-full bg-warn-soft text-warn border border-warn/25">
                <AlertCircle className="size-4" />
              </span>
            )}
          </div>

          <div className="flex-1 text-sm">
            <h4 className="font-semibold text-ink">
              {toast.title}
            </h4>
            <p className="text-xs text-muted mt-0.5">{toast.message}</p>
          </div>

          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-muted hover:text-ink transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
