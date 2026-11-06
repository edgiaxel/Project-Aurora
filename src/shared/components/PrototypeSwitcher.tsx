import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Map, Home } from 'lucide-react';

interface PrototypeSwitcherProps {
  className?: string;
}

export const PrototypeSwitcher: React.FC<PrototypeSwitcherProps> = ({ className = '' }) => {
  const links = [
    { to: '/', label: 'Selector', icon: <Home className="w-4 h-4" /> },
    { to: '/prototype/c', label: 'C — Questboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/prototype/d', label: 'D — Hybrid Studio', icon: <Building2 className="w-4 h-4" /> },
    { to: '/prototype/e', label: 'E — Project World', icon: <Map className="w-4 h-4" /> }
  ];

  return (
    <header className={`bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 py-3 sticky top-0 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            PA
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2 m-0 p-0">
              Project Aurora
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
                FALL 2026
              </span>
            </h1>
            <p className="text-xs text-slate-400 m-0">Evaluation Lab</p>
          </div>
        </div>

        <nav aria-label="Prototypes navigation" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`
              }
            >
              {link.icon}
              <span className="hidden md:inline">{link.label}</span>
              <span className="inline md:hidden">
                {link.to === '/' ? 'Home' : link.to.replace('/prototype/', '').toUpperCase()}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
