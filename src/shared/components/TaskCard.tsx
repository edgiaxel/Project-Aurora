import React from 'react';
import type { Task, Member, TaskStatus } from '../types';
import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Avatar } from './Avatar';

interface TaskCardProps {
  task: Task;
  assignedMember?: Member;
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
  onClick?: (taskId: string) => void;
  className?: string;
}

const priorityColors = {
  low: 'text-slate-400 bg-slate-800/80 border-slate-700',
  medium: 'text-sky-400 bg-sky-950/40 border-sky-800/50',
  high: 'text-amber-400 bg-amber-950/40 border-amber-800/50',
  urgent: 'text-rose-400 bg-rose-950/40 border-rose-800/50'
};

const statusLabels: Record<TaskStatus, { label: string; color: string; icon: React.ReactNode }> = {
  todo: { label: 'To Do', color: 'text-slate-400 bg-slate-800', icon: <Clock className="w-3.5 h-3.5" /> },
  in_progress: { label: 'In Progress', color: 'text-sky-300 bg-sky-900/40', icon: <Clock className="w-3.5 h-3.5 text-sky-400" /> },
  review: { label: 'Review', color: 'text-amber-300 bg-amber-900/40', icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> },
  completed: { label: 'Completed', color: 'text-emerald-300 bg-emerald-900/40', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> }
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  assignedMember,
  onStatusChange,
  onClick,
  className = ''
}) => {
  const currentStatus = statusLabels[task.status];

  return (
    <div
      onClick={() => onClick?.(task.id)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick(task.id);
        }
      }}
      className={`p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-slate-700 transition-all text-left flex flex-col justify-between gap-3 ${
        onClick ? 'cursor-pointer hover:bg-slate-900/80' : ''
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
          <div className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded bg-slate-850 text-slate-300 border border-slate-800">
            {currentStatus.icon}
            <span>{currentStatus.label}</span>
          </div>
        </div>

        <h3 className="font-semibold text-slate-100 text-sm mb-1 leading-snug">{task.title}</h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-2">{task.description}</p>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{task.deadline}</span>
        </div>

        <div className="flex items-center gap-2">
          {task.xpReward && (
            <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/30">
              +{task.xpReward} XP
            </span>
          )}
          {assignedMember && <Avatar member={assignedMember} size="sm" />}
        </div>
      </div>

      {onStatusChange && (
        <div className="pt-2 flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextStatus: TaskStatus = task.status === 'completed' ? 'in_progress' : 'completed';
              onStatusChange(task.id, nextStatus);
            }}
            className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
              task.status === 'completed'
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 border border-emerald-600/40'
            }`}
          >
            {task.status === 'completed' ? 'Mark In Progress' : 'Complete Task'}
          </button>
        </div>
      )}
    </div>
  );
};
