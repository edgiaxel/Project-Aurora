import React from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore } from '../shared/store/useProjectStore';
import { MemberList, ProgressIndicator } from '../shared/components';
import { LayoutDashboard, Building2, Map, Users, CheckCircle, RotateCcw } from 'lucide-react';

export const PrototypeSelectorPage: React.FC = () => {
  const { project, resetToDefault } = useProjectStore();

  const prototypes = [
    {
      id: 'c',
      route: '/prototype/c',
      name: 'Prototype C',
      title: 'Questboard',
      badge: 'Game-Inspired Dashboard',
      description:
        'A productivity dashboard redesigned with gamified mission maps, quest cards, and milestone rewards. Tests whether game progression engages teams without requiring a virtual world.',
      icon: <LayoutDashboard className="w-6 h-6 text-sky-400" />,
      features: ['Objective & Quest Cards', 'Milestone Progression Track', 'XP & Reward Indicators', 'Member Workload View'],
      status: 'Ready for Agent 2'
    },
    {
      id: 'd',
      route: '/prototype/d',
      name: 'Prototype D',
      title: 'Hybrid Studio',
      badge: '2D Virtual Studio + HUD',
      description:
        'A 2D navigable virtual studio combined with practical productivity panels. Students navigate workstations with avatars while opening tasks, artifacts, and team notes.',
      icon: <Building2 className="w-6 h-6 text-emerald-400" />,
      features: ['Interactive Workstations', 'Avatar WASD Movement', 'Simulated Presence & Teammates', 'Overlay Drawers & Panels'],
      status: 'Ready for Agent 3'
    },
    {
      id: 'e',
      route: '/prototype/e',
      name: 'Prototype E',
      title: 'Project World',
      badge: 'Explorable Project Map',
      description:
        'An explorable map where the project lifecycle is mapped into distinct spatial zones. Evaluates whether spatial progression makes complex project phases more intuitive.',
      icon: <Map className="w-6 h-6 text-purple-400" />,
      features: ['Spatial Lifecycle Zones', 'Stage Unlocks on Completion', 'Interactive Artifact Nodes', 'Visual Project Journey'],
      status: 'Ready for Agent 4'
    }
  ];

  return (
    <div className="min-w-full min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Scenario Header */}
        <section className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950 text-sky-400 border border-sky-800">
                  STACK 2026 Academic Evaluation
                </span>
                <span className="text-xs text-slate-400">Semester Project Scenario</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {project.name} Evaluation Lab
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <button
              type="button"
              onClick={resetToDefault}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors shrink-0"
              title="Reset tasks and milestones to original mock state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo State
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-400" />
                <span>Team Members (4)</span>
              </div>
              <MemberList members={project.teamMembers} variant="compact" />
            </div>

            <div className="space-y-3">
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Project Progress</span>
              </div>
              <ProgressIndicator progress={project.overallProgress} size="md" />
              <div className="text-xs text-slate-400">
                {project.tasks.filter((t) => t.status === 'completed').length} of {project.tasks.length} tasks completed
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400">Milestone Status</div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Completed: <span className="text-emerald-400 font-medium">2</span></div>
                <div>In Progress: <span className="text-sky-400 font-medium">2</span></div>
                <div>Pending: <span className="text-slate-500 font-medium">2</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Prototype Cards */}
        <section>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Three Alternative UX Prototypes</h3>
            <p className="text-sm text-slate-400 mt-1">
              Select any prototype to explore its interaction model using identical project data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {prototypes.map((proto) => (
              <div
                key={proto.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      {proto.icon}
                    </div>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {proto.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-sky-400 font-semibold mb-1">
                    {proto.name}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{proto.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {proto.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Core Elements
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {proto.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{proto.status}</span>
                  <Link
                    to={proto.route}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center gap-1.5"
                  >
                    Open {proto.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
