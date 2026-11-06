import React, { useState } from 'react';
import { useProjectStore } from '../../shared/store/useProjectStore';
import { MemberList, Drawer, TaskCard, ArtifactCard } from '../../shared/components';
import { Building2, Laptop, Palette, BookOpen, Presentation, Users, Sparkles } from 'lucide-react';

export const PrototypeDPage: React.FC = () => {
  const { project, updateTaskStatus } = useProjectStore();
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const workstations = [
    { id: 'research', name: 'Research Station', icon: <BookOpen className="w-5 h-5 text-amber-400" />, desc: 'Literature review & academic requirements', tag: 'Husnaen' },
    { id: 'design', name: 'Design Workshop', icon: <Palette className="w-5 h-5 text-sky-400" />, desc: 'Figma wireframes & component styling', tag: 'Axel' },
    { id: 'dev', name: 'Development Desk', icon: <Laptop className="w-5 h-5 text-emerald-400" />, desc: 'Phaser scenes & React state architecture', tag: 'Jonathan' },
    { id: 'presentation', name: 'Presentation Corner', icon: <Presentation className="w-5 h-5 text-purple-400" />, desc: 'Defense slides & demo walkthrough', tag: 'Deffa' }
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#070A10] text-slate-100 flex flex-col">
      {/* Studio Top HUD */}
      <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              PROTOTYPE D
            </span>
            <span className="text-xs text-slate-400">Ownership: Agent 3</span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
            <Building2 className="w-5 h-5 text-emerald-400" />
            Hybrid Studio (2D Studio + HUD)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Live Studio Presence (4 active)</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 p-6 gap-6">
        {/* Phaser Studio Canvas Area Placeholder / Workstations */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative flex-1 min-h-[420px] rounded-2xl border border-slate-800 bg-slate-950/80 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Ambient Studio Grid background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                PHASER 2D STUDIO CANVAS AREA (Agent 3 workspace)
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                Avatar Movement: WASD / Arrow Keys
              </span>
            </div>

            {/* Interactive Workstation Nodes */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 my-auto">
              {workstations.map((ws) => (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => setSelectedStation(ws.id)}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 hover:border-emerald-500/60 transition-all text-left flex flex-col gap-2 group shadow-md"
                >
                  <div className="p-2.5 rounded-lg bg-slate-800 w-fit group-hover:scale-105 transition-transform">
                    {ws.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {ws.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{ws.desc}</p>
                  </div>
                  <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 w-fit border border-slate-700">
                    Lead: {ws.tag}
                  </div>
                </button>
              ))}
            </div>

            <div className="relative z-10 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Click any workstation node above to trigger slide-out productivity drawers.</span>
              </div>
              <span>Phaser 3 instance mounts here</span>
            </div>
          </div>

          {/* Quick Tasks Grid */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Studio Priority Tasks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.tasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} onStatusChange={updateTaskStatus} />
              ))}
            </div>
          </div>
        </div>

        {/* Studio Sidebar */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Studio Occupants</span>
            </div>
            <MemberList members={project.teamMembers} variant="compact" />
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Recent Studio Artifacts
            </h4>
            <div className="space-y-2">
              {project.artifacts.slice(0, 2).map((art) => (
                <ArtifactCard key={art.id} artifact={art} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Overlay for Workstations */}
      <Drawer
        isOpen={Boolean(selectedStation)}
        onClose={() => setSelectedStation(null)}
        title={workstations.find((w) => w.id === selectedStation)?.name || 'Workstation'}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            {workstations.find((w) => w.id === selectedStation)?.desc}
          </p>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
            Productivity drawer overlay is active while keeping the 2D studio accessible underneath.
          </div>
          <h4 className="text-xs font-semibold uppercase text-slate-400">Related Tasks</h4>
          <div className="space-y-2">
            {project.tasks.slice(0, 2).map((task) => (
              <TaskCard key={task.id} task={task} onStatusChange={updateTaskStatus} />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};
