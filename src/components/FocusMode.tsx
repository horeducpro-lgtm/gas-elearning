"use client";
import React, { useState } from 'react';
import { 
  Maximize2, Minimize2, Trophy, ArrowLeft, 
  Settings, MessageSquare, ChevronRight, Zap
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";

export default function FocusMode({ courseTitle, onExit }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const GOLD = "#BE9B4B";

  return (
    <div className="focus-overlay">
      {/* BARRE HAUTE MINIMALISTE */}
      <nav className="focus-nav">
        <button onClick={onExit} className="exit-btn">
          <ArrowLeft size={20} />
          <span>Quitter le mode Focus</span>
        </button>
        
        <div className="course-info">
          <span className="live-dot"></span>
          <span className="title">{courseTitle}</span>
        </div>

        <div className="leaderboard-mini">
          <Trophy size={16} color={GOLD} />
          <span>Rang : <strong>#4</strong> / 1,250</span>
        </div>
      </nav>

      {/* ZONE VIDÉO PRINCIPALE */}
      <main className="video-container">
        <div className="video-placeholder">
          <div className="play-overlay">
             <div className="brand-logo">ELITE ACADEMY</div>
          </div>
        </div>

        {/* CONTRÔLES FLOTTANTS */}
        <div className="floating-controls">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MessageSquare size={20} />
          </button>
          <button><Settings size={20} /></button>
          <button><Maximize2 size={20} /></button>
        </div>
      </main>

      {/* SIDEBAR DE NOTES DISCRÈTE */}
      {isSidebarOpen && (
        <aside className="focus-sidebar">
          <h3>Notes du module</h3>
          <textarea placeholder="Prenez vos notes ici..." />
          <div className="next-up">
            <p>SUIVANT</p>
            <h4>Calcul de l'inertie thermique</h4>
            <ChevronRight size={16} />
          </div>
        </aside>
      )}

      <style jsx>{`
        .focus-overlay {
          position: fixed; inset: 0; background: #0B0E14; z-index: 10000;
          display: flex; flex-direction: column; color: white;
        }
        
        .focus-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 40px; background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .exit-btn { 
          background: none; border: none; color: white; display: flex; align-items: center; 
          gap: 10px; cursor: pointer; opacity: 0.6; transition: 0.3s;
        }
        .exit-btn:hover { opacity: 1; }

        .live-dot { width: 8px; height: 8px; background: #EF4444; border-radius: 50%; box-shadow: 0 0 10px #EF4444; }
        .course-info { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 14px; }

        .leaderboard-mini { 
          background: rgba(190, 155, 75, 0.1); padding: 8px 16px; border-radius: 20px;
          border: 1px solid rgba(190, 155, 75, 0.2); font-size: 13px; display: flex; gap: 8px;
        }

        .video-container { flex: 1; position: relative; display: flex; justify-content: center; align-items: center; padding: 40px; }
        .video-placeholder { 
          width: 100%; max-width: 1100px; aspect-ratio: 16/9; 
          background: #000; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
        }
        .brand-logo { font-size: 24px; font-weight: 900; letter-spacing: 5px; opacity: 0.2; }

        .floating-controls {
          position: absolute; bottom: 60px; right: 60px; display: flex; gap: 15px;
        }
        .floating-controls button {
          background: rgba(255,255,255,0.1); border: none; color: white; padding: 15px;
          border-radius: 18px; cursor: pointer; backdrop-filter: blur(10px); transition: 0.2s;
        }
        .floating-controls button:hover { background: ${GOLD}; }

        .focus-sidebar {
          width: 350px; background: #161B22; border-left: 1px solid rgba(255,255,255,0.05);
          padding: 30px; display: flex; flex-direction: column;
        }
        .focus-sidebar h3 { font-size: 18px; margin-bottom: 20px; }
        textarea { 
          flex: 1; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 15px; color: white; resize: none; margin-bottom: 20px;
        }

        .next-up {
          background: ${GOLD}15; padding: 20px; border-radius: 16px; border: 1px solid ${GOLD}30;
          cursor: pointer;
        }
        .next-up p { font-size: 10px; font-weight: 900; color: ${GOLD}; margin: 0 0 5px; }
        .next-up h4 { margin: 0; font-size: 14px; }
      `}</style>
    </div>
  );
}