"use client";
import React, { useState } from 'react';
import { Users, BrainCircuit, Timer, ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';

export default function LabHub({ tokens, isDark, addNotification }: any) {
  const [activeTab, setActiveTab] = useState<'collab' | 'spaced'>('collab');

  const collabProjects = [
    { id: 1, title: "Éco-Quartier Marina 2026", team: 3, max: 5, difficulty: "Expert" },
    { id: 2, title: "Rénovation Thermique Lycée", team: 2, max: 4, difficulty: "Intermédiaire" }
  ];

  const reviewCards = [
    { id: 1, topic: "Inertie Thermique", lastSeen: "Il y a 3 jours", status: "À réviser" },
    { id: 2, topic: "Bilan Carbone BIM", lastSeen: "Il y a 10 jours", status: "Critique" }
  ];

  const GOLD = "#BE9B4B";

  return (
    <div className="lab-card" style={{ background: tokens.card, border: `1px solid ${tokens.border}` }}>
      {/* TABS SELECTOR */}
      <div className="tab-nav">
        <button className={activeTab === 'collab' ? 'active' : ''} onClick={() => setActiveTab('collab')}>
          <Users size={16} /> Projets Collab
        </button>
        <button className={activeTab === 'spaced' ? 'active' : ''} onClick={() => setActiveTab('spaced')}>
          <BrainCircuit size={16} /> Révisions IA
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'collab' ? (
          <div className="collab-list">
            {collabProjects.map(p => (
              <div key={p.id} className="project-item">
                <div className="project-info">
                  <h4>{p.title}</h4>
                  <p>{p.team}/{p.max} membres • <span>{p.difficulty}</span></p>
                </div>
                <button className="join-btn" onClick={() => addNotification('social', 'Demande envoyée au chef de projet !')}>
                  Rejoindre
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="spaced-list">
            <div className="spaced-header">
              <FlaskConical size={14} color={GOLD} />
              <span>Algorithme de répétition espacée actif</span>
            </div>
            {reviewCards.map(c => (
              <div key={c.id} className="review-item">
                <div className="review-info">
                  <p className="topic">{c.topic}</p>
                  <p className="last-seen">{c.lastSeen}</p>
                </div>
                <div className={`status-pill ${c.status === 'Critique' ? 'critical' : ''}`}>
                  {c.status}
                </div>
              </div>
            ))}
            <button className="start-session-btn">Lancer la session (5 min)</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .lab-card { padding: 25px; border-radius: 28px; margin-top: 24px; }
        .tab-nav { display: flex; gap: 10px; margin-bottom: 20px; background: ${isDark ? 'rgba(0,0,0,0.2)' : '#f1f5f9'}; padding: 5px; border-radius: 14px; }
        .tab-nav button { 
          flex: 1; border: none; padding: 10px; border-radius: 10px; cursor: pointer;
          font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: transparent; color: ${tokens.text}; opacity: 0.6; transition: 0.2s;
        }
        .tab-nav button.active { background: ${isDark ? '#1C2128' : 'white'}; opacity: 1; color: ${GOLD}; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        
        .project-item, .review-item { 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 15px; background: ${isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'};
          border-radius: 16px; margin-bottom: 10px;
        }

        .project-info h4 { margin: 0 0 4px; font-size: 14px; }
        .project-info p { margin: 0; font-size: 11px; opacity: 0.5; font-weight: 700; }
        .project-info span { color: ${GOLD}; }

        .join-btn { 
          background: ${GOLD}20; color: ${GOLD}; border: 1px solid ${GOLD}40;
          padding: 6px 12px; border-radius: 10px; font-size: 12px; font-weight: 800; cursor: pointer;
        }

        .review-info .topic { margin: 0; font-size: 14px; font-weight: 700; }
        .review-info .last-seen { margin: 0; font-size: 11px; opacity: 0.5; }
        
        .status-pill { font-size: 10px; font-weight: 900; padding: 4px 8px; border-radius: 6px; background: rgba(16, 185, 129, 0.1); color: #10B981; }
        .status-pill.critical { background: rgba(239, 68, 68, 0.1); color: #EF4444; }

        .start-session-btn {
          width: 100%; margin-top: 10px; padding: 12px; border-radius: 12px; border: none;
          background: ${GOLD}; color: white; font-weight: 800; cursor: pointer;
        }
        
        .spaced-header { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; opacity: 0.6; margin-bottom: 15px; justify-content: center; }
      `}</style>
    </div>
  );
}