import React from 'react';
import type { Milestone, MilestoneStatus } from '../types';
import { CheckCircle2, Clock, CircleDot, Compass } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
  onStatusToggle?: (milestoneId: string, nextStatus: MilestoneStatus) => void;
  className?: string;
}

const statusConfig = {
  completed: {
    badge: 'Completed',
    badgeClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  },
  in_progress: {
    badge: 'In Progress',
    badgeClass: 'text-sky-400 bg-sky-950/40 border-sky-800/60',
    icon: <Clock className="w-5 h-5 text-sky-400" />
  },
  not_started: {
    badge: 'Not Started',
    badgeClass: 'text-slate-400 bg-slate-800 border-slate-700',
    icon: <CircleDot className="w-5 h-5 text-slate-500" />
  }
};

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  onStatusToggle,
  className = ''
}) => {
  const current = statusConfig[milestone.status];

  return (
    <div
      className={`p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 transition-all ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{current.icon}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400">Step {milestone.order}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${current.badgeClass}`}
              >
                {current.badge}
              </span>
            </div>
            <h4 className="font-semibold text-slate-100 text-sm">{milestone.title}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{milestone.description}</p>
          </div>
        </div>

        {onStatusToggle && (
          <button
            type="button"
            onClick={() => {
              const nextStatus: MilestoneStatus =
                milestone.status === 'completed'
                  ? 'in_progress'
                  : milestone.status === 'in_progress'
                  ? 'completed'
                  : 'in_progress';
              onStatusToggle(milestone.id, nextStatus);
            }}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shrink-0"
          >
            Advance
          </button>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div>
          <span className="text-slate-500">Deliverables: </span>
          <span className="text-slate-300">{milestone.deliverablesSummary}</span>
        </div>
        {milestone.unlockedArea && (
          <div className="flex items-center gap-1 text-sky-400 shrink-0 ml-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{milestone.unlockedArea}</span>
          </div>
        )}
      </div>
    </div>
  );
};
