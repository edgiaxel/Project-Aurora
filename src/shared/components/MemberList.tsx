import React from 'react';
import type { Member } from '../types';
import { Avatar } from './Avatar';

interface MemberListProps {
  members: Member[];
  selectedMemberId?: string | null;
  onSelectMember?: (memberId: string) => void;
  variant?: 'compact' | 'cards' | 'avatars-only';
  className?: string;
}

export const MemberList: React.FC<MemberListProps> = ({
  members,
  selectedMemberId,
  onSelectMember,
  variant = 'compact',
  className = ''
}) => {
  if (variant === 'avatars-only') {
    return (
      <div className={`flex -space-x-2 overflow-hidden ${className}`}>
        {members.map(member => (
          <Avatar key={member.id} member={member} size="sm" showStatus={false} />
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
        {members.map(member => {
          const isSelected = selectedMemberId === member.id;
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onSelectMember?.(member.id)}
              className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'border-sky-500 bg-sky-950/30'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <Avatar member={member} size="md" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-slate-100 truncate text-sm">{member.name}</div>
                <div className="text-xs text-slate-400 truncate">{member.role}</div>
                {member.currentActivity && (
                  <div className="text-xs text-slate-500 truncate mt-1 italic">
                    {member.currentActivity}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {members.map(member => {
        const isSelected = selectedMemberId === member.id;
        return (
          <div
            key={member.id}
            onClick={() => onSelectMember?.(member.id)}
            role={onSelectMember ? 'button' : undefined}
            tabIndex={onSelectMember ? 0 : undefined}
            onKeyDown={e => {
              if (onSelectMember && (e.key === 'Enter' || e.key === ' ')) {
                onSelectMember(member.id);
              }
            }}
            className={`p-2.5 rounded-md flex items-center justify-between border transition-all ${
              onSelectMember ? 'cursor-pointer' : ''
            } ${
              isSelected
                ? 'border-sky-500 bg-sky-950/20'
                : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar member={member} size="sm" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-200 truncate">{member.name}</div>
                <div className="text-xs text-slate-400 truncate">{member.role}</div>
              </div>
            </div>
            <span className="text-xs capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
              {member.status}
            </span>
          </div>
        );
      })}
    </div>
  );
};
