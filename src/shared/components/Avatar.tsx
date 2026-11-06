import React from 'react';
import type { Member } from '../types';

interface AvatarProps {
  member: Member;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg font-bold'
};

const statusClasses = {
  online: 'bg-emerald-500',
  working: 'bg-sky-500',
  idle: 'bg-amber-500',
  offline: 'bg-gray-500'
};

export const Avatar: React.FC<AvatarProps> = ({
  member,
  size = 'md',
  showStatus = true,
  className = ''
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white shadow-sm border border-white/10`}
        style={{ backgroundColor: member.avatarColor }}
        title={`${member.name} (${member.role})`}
      >
        {member.initials}
      </div>
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#0B0F19] ${
            statusClasses[member.status]
          }`}
          title={`Status: ${member.status}`}
        />
      )}
    </div>
  );
};
