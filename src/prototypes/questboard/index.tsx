import React from 'react';
import { useProjectStore } from '../../shared/store/useProjectStore';
import { TaskCard, MilestoneCard, MemberList, ProgressIndicator } from '../../shared/components';
import { LayoutDashboard, Award, Swords, ScrollText } from 'lucide-react';

export const PrototypeCPage: React.FC = () => {
  const { project, updateTaskStatus, updateMilestoneStatus } = useProjectStore();

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Prototype Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                PROTOTYPE C
              </span>
              <span className="text-xs text-slate-400">Ownership: Agent 2</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-sky-400" />
              Questboard Experience
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Game-inspired productivity dashboard: Quest cards, mission progression, XP points, and team guilds.
            </p>
          </div>

          <div className="w-full sm:w-64 bg-slate-850 p-3 rounded-xl border border-slate-800">
            <ProgressIndicator progress={project.overallProgress} label="Campaign Progress" />
          </div>
        </div>

        {/* Milestone Tracks */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Swords className="w-4 h-4 text-amber-400" />
            <span>Campaign Milestones</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.milestones.slice(0, 3).map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                onStatusToggle={updateMilestoneStatus}
              />
            ))}
          </div>
        </section>

        {/* Active Quests & Guild Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <ScrollText className="w-4 h-4 text-sky-400" />
                <span>Active Quests ({project.tasks.length})</span>
              </div>
              <span className="text-xs text-slate-400">Interactive live state</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.tasks.map((task) => {
                const assigned = project.teamMembers.find((m) => m.id === task.assignedMemberId);
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    assignedMember={assigned}
                    onStatusChange={updateTaskStatus}
                  />
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Guild Members</span>
              </div>
              <MemberList members={project.teamMembers} variant="compact" />
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="font-semibold text-slate-300">Agent 2 Ready:</div>
              <p>
                This shell is connected to the shared Zustand store and mock data. Agent 2 has exclusive ownership of <code className="text-sky-300">src/prototypes/questboard/</code> to expand the game HUD and mission map.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
