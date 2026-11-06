import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrototypeSwitcher } from './shared/components/PrototypeSwitcher';
import { PrototypeSelectorPage } from './pages/PrototypeSelectorPage';
import { PrototypeCPage } from './prototypes/questboard';
import { PrototypeDPage } from './prototypes/hybrid-studio';
import { PrototypeEPage } from './prototypes/project-world';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        <PrototypeSwitcher />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PrototypeSelectorPage />} />
            <Route path="/prototype/c" element={<PrototypeCPage />} />
            <Route path="/prototype/d" element={<PrototypeDPage />} />
            <Route path="/prototype/e" element={<PrototypeEPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
