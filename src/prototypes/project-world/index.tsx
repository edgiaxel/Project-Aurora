import React, { useState } from 'react';
import { useProjectStore } from '../../shared/store/useProjectStore';
import { Modal, ArtifactCard, ProgressIndicator } from '../../shared/components';
import { Map, Compass, CheckCircle2, Lock, ArrowRight, Layers } from 'lucide-react';

export const PrototypeEPage: React.FC = () => {
  const { project, updateMilestoneStatus } = useProjectStore();
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);

  const zones = [
    { id: 'zone-1', name: 'Research Forest', stage: 'Planning & Research', status: 'unlocked', milestoneId: 'milestone-1' },
    { id: 'zone-2', name: 'Knowledge Bridge', stage: 'Requirements & Benchmarks', status: 'unlocked', milestoneId: 'milestone-2' },
    { id: 'zone-3', name: 'Design Workshop', stage: 'Wireframes & UI Kit', status: 'current', milestoneId: 'milestone-3' },
    { id: 'zone-4', name: 'Development Zone', stage: 'Frontend Implementation', status: 'current', milestoneId: 'milestone-4' },
    { id: 'zone-5', name: 'Integration Hub', stage: 'Testing & Usability', status: 'locked', milestoneId: 'milestone-5' },
    { id: 'zone-6', name: 'Final Showcase', stage: 'Academic Defense', status: 'locked', milestoneId: 'milestone-6' }
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#090B14] text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* World Map Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                PROTOTYPE E
              </span>
              <span className="text-xs text-slate-400">Ownership: Agent 4</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Map className="w-6 h-6 text-purple-400" />
              Project World Map
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Explorable spatial landscape where semester progression unlocks territories, stages, and project artifacts.
            </p>
          </div>

          <div className="w-full sm:w-64 bg-slate-850 p-3 rounded-xl border border-slate-800">
            <ProgressIndicator progress={project.overallProgress} label="World Unlocked" />
          </div>
        </div>

        {/* Spatial Zone Path */}
        <section className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Project Journey Map (Agent 4 Phaser Canvas Area)</span>
            </div>
            <span className="text-xs text-slate-400">Click a territory node to inspect</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone, idx) => {
              const isUnlocked = zone.status === 'unlocked' || zone.status === 'current';
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[140px] ${
                    zone.status === 'current'
                      ? 'border-purple-500/70 bg-purple-950/20 hover:bg-purple-950/30'
                      : isUnlocked
                      ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      : 'border-slate-850 bg-slate-900/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Stage {idx + 1}</span>
                    {zone.status === 'unlocked' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : zone.status === 'current' ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700">
                        Active Zone
                      </span>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-100 text-sm mt-2">{zone.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{zone.stage}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-purple-400 font-medium mt-2">
                    <span>Inspect Area</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Artifacts and Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Discovered Artifacts Across World</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.artifacts.slice(0, 4).map((art) => (
                <ArtifactCard key={art.id} artifact={art} />
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200">Spatial Architecture Note</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Agent 4 has isolated ownership of <code className="text-purple-300">src/prototypes/project-world/</code>. The Phaser scene will render a tilemap or isometric region where students travel through the semester milestones as physical landscapes.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => updateMilestoneStatus('milestone-4', 'completed')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Complete Milestone 4 to trigger world unlock
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Area Inspection Modal */}
      <Modal
        isOpen={Boolean(activeZoneId)}
        onClose={() => setActiveZoneId(null)}
        title={zones.find((z) => z.id === activeZoneId)?.name || 'Project Zone'}
      >
        <div className="space-y-4">
          <div className="text-xs text-slate-300">
            Stage focus: <span className="font-semibold text-white">{zones.find((z) => z.id === activeZoneId)?.stage}</span>
          </div>
          <p className="text-xs text-slate-400">
            This area represents spatial project progression. Completed milestones open paths and illuminate the world terrain.
          </p>
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-slate-400">Relevant Artifacts</h4>
            <div className="grid grid-cols-1 gap-2">
              {project.artifacts.slice(0, 2).map((art) => (
                <ArtifactCard key={art.id} artifact={art} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
