'use client';
import React, { useState } from 'react';

const allModules = [
  { id: 1, name: 'Architecture & BIM', domain: 'Architecture', progress: '80%' },
  { id: 2, name: 'DevOps & Scripts', domain: 'DevOps', progress: '65%' },
  { id: 3, name: 'Frontend Next.js & Tailwind', domain: 'Frontend', progress: '90%' },
  { id: 4, name: 'Documentation & Certification', domain: 'Documentation', progress: '50%' }
];

export default function ModulesPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? allModules.filter(m => m.domain === filter) : allModules;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Modules GAS</h1>
      <div className="space-x-2">
        {['Architecture', 'DevOps', 'Frontend', 'Documentation'].map(domain => (
          <button
            key={domain}
            onClick={() => setFilter(domain)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {domain}
          </button>
        ))}
        <button
          onClick={() => setFilter(null)}
          className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Tous</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(m => (
          <div key={m.id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold mb-2">{m.name}</h3>
            <p>Domaine : {m.domain}</p>
            <p>Progression : {m.progress}</p>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              Demander validation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}