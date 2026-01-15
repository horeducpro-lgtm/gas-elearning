"use client";

import { useEffect, useState } from 'react';
import { Module, User } from '../app/types';

export default function DashboardContent() {
  const [modules, setModules] = useState<Module[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [modRes, profRes] = await Promise.all([
          fetch('/api/modules'),
          fetch('/api/profile')
        ]);
        
        const modData = await modRes.json();
        const profData = await profRes.json();

        setModules(modData.modules || []);
        setUser(profData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Chargement de votre progression...</div>;

  const completedCount = modules.filter(m => m.status === 'completed').length;
  const progressPercentage = modules.length > 0 ? (completedCount / modules.length) * 100 : 0;

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Bienvenue, {user?.name || 'Candidat'} 👋</h1>
        <p className="text-slate-500">Suivez votre progression et vos certifications GAS.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 uppercase">Progression Globale</p>
          <p className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 uppercase">Modules Complétés</p>
          <p className="text-2xl font-bold text-green-600">{completedCount} / {modules.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 uppercase">Rôle</p>
          <p className="text-2xl font-bold text-slate-700 capitalize">{user?.role || 'candidate'}</p>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-semibold text-slate-700">Vos Modules de Formation</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {modules.map((mod) => (
            <div key={mod.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-medium text-slate-800">{mod.name}</h3>
                <p className="text-sm text-slate-500">{mod.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                mod.status === 'completed' ? 'bg-green-100 text-green-700' : 
                mod.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {mod.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
