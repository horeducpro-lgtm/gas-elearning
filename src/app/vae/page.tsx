"use client";

import { useState, useEffect } from 'react';
import { VaeDossier, VaeStatus } from '../types';

export default function VaePage() {
  const [dossiers, setDossiers] = useState<VaeDossier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadVae() {
      try {
        const res = await fetch('/api/vae');
        const data = await res.json();
        setDossiers(data.dossiers || []);
      } catch (err) {
        console.error("Erreur VAE:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVae();
  }, []);

  const getStatusStyle = (status: VaeStatus) => {
    const styles: Record<string, string> = {
      validated: 'bg-green-100 text-green-700 border-green-200',
      under_review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      submitted: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return styles[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  if (loading) return <div className="p-8 animate-pulse text-slate-500">Chargement de vos dossiers VAE...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Ma Validation d'Expérience</h1>
          <p className="text-slate-500 mt-1">Transformez votre expertise terrain en diplôme officiel.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          {showForm ? 'Fermer' : '+ Nouveau Dossier'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-xl animate-in fade-in zoom-in duration-300">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-lg text-blue-600"></span>
            Déposer un nouveau dossier
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Intitulé du poste visé</label>
              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="ex: Expert Cloud & DevOps" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Années d'expérience</label>
              <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="ex: 5" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Résumé de votre parcours</label>
              <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-32 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Détaillez vos responsabilités majeures..."></textarea>
            </div>
            <div className="md:col-span-2">
              <button type="button" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg">
                Soumettre le dossier à l'expert GAS
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Suivi de vos candidatures</h2>
        {dossiers.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="text-4xl mb-4"></div>
            <p className="text-slate-500 font-medium">Vous n'avez pas encore de dossier VAE.</p>
            <p className="text-sm text-slate-400">Cliquez sur le bouton bleu pour commencer.</p>
          </div>
        ) : (
          dossiers.map(dossier => (
            <div key={dossier.id} className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{dossier.title}</h3>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(dossier.status)}`}>
                    {dossier.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"> {new Date(dossier.updatedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"> Expert GAS assigné</span>
                </div>
              </div>
              <button className="bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all border border-slate-100">
                Détails du dossier
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
