import React from 'react';
import type { Artifact, ArtifactType } from '../types';
import { FileText, Link2, Layout, Monitor, Presentation, Code2 } from 'lucide-react';

interface ArtifactCardProps {
  artifact: Artifact;
  onClick?: (artifact: Artifact) => void;
  className?: string;
}

const typeIcons: Record<ArtifactType, React.ReactNode> = {
  document: <FileText className="w-4 h-4 text-sky-400" />,
  reference: <Link2 className="w-4 h-4 text-emerald-400" />,
  wireframe: <Layout className="w-4 h-4 text-amber-400" />,
  prototype: <Monitor className="w-4 h-4 text-purple-400" />,
  presentation: <Presentation className="w-4 h-4 text-rose-400" />,
  code: <Code2 className="w-4 h-4 text-cyan-400" />
};

export const ArtifactCard: React.FC<ArtifactCardProps> = ({
  artifact,
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={() => onClick?.(artifact)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick(artifact);
        }
      }}
      className={`p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-slate-700 transition-all text-left flex flex-col justify-between gap-2 ${
        onClick ? 'cursor-pointer hover:bg-slate-900/80' : ''
      } ${className}`}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-750">
            {typeIcons[artifact.type]}
          </div>
          <span className="text-xs uppercase font-mono text-slate-400 font-semibold tracking-wider">
            {artifact.type}
          </span>
        </div>
        <h4 className="font-semibold text-slate-100 text-sm mb-1 leading-snug">{artifact.title}</h4>
        <p className="text-xs text-slate-400 line-clamp-2">{artifact.description}</p>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <span>Updated {artifact.lastUpdated}</span>
        {artifact.fileSize && <span>{artifact.fileSize}</span>}
        {artifact.url && <span className="text-sky-400 truncate max-w-[120px]">Live Link</span>}
      </div>
    </div>
  );
};
