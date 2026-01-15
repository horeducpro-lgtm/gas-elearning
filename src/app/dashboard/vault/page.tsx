"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from "@/context/ThemeContext";
import { ArrowLeft, Lock, Unlock, FileText, Video, Download, Search } from 'lucide-react';

export default function VaultPage() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);

  const tokens = {
    brand: '#BE9B4B',
    bg: isDark ? '#0B0E14' : '#F8FAFC',
    card: isDark ? 'rgba(22, 27, 34, 0.8)' : '#FFFFFF',
    text: isDark ? '#F0F6FC' : '#1C1D1F',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
  };

  const resources = [
    { id: 1, title: "Blueprint : Stratégie 2026", type: "PDF", size: "4.2 MB", category: "Stratégie" },
    { id: 2, title: "Masterclass : Architecture Bio-sourcée", type: "VIDEO", size: "1.2 GB", category: "Formation" },
    { id: 3, title: "Template : Contrat Client Elite", type: "DOC", size: "150 KB", category: "Business" },
  ];

  const handleUnlock = (id: number) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds([...unlockedIds, id]);
      
      // LOGIQUE DE SYNCHRONISATION
      const currentXP = parseInt(localStorage.getItem('gas_user_xp') || '12450');
      if (localStorage.getItem('goal_vault') !== 'true') {
        localStorage.setItem('gas_user_xp', (currentXP + 30).toString());
        localStorage.setItem('goal_vault', 'true');
        // Déclenche la mise à jour sur le Dashboard si ouvert en simultané
        window.dispatchEvent(new Event('progressUpdated'));
      }
    }
  };

  return (
    <div className="vault-container">
      <header className="vault-header">
        <button className="back-btn" onClick={() => router.back()}>
          <ArrowLeft size={20} /> Dashboard
        </button>
        <div className="title-section">
          <h1>Elite <span style={{ color: tokens.brand }}>Vault</span></h1>
          <p>Accédez à vos ressources confidentielles et outils exclusifs.</p>
        </div>
      </header>

      <div className="search-box">
        <Search size={20} opacity={0.5} />
        <input placeholder="Rechercher dans le coffre-fort..." />
      </div>

      <div className="resources-grid">
        {resources.map((res) => (
          <div key={res.id} className={`res-card ${unlockedIds.includes(res.id) ? 'unlocked' : ''}`}>
            <div className="res-icon">
              {res.type === 'VIDEO' ? <Video size={24} /> : <FileText size={24} />}
            </div>
            <div className="res-info">
              <span className="res-category">{res.category}</span>
              <h3>{res.title}</h3>
              <span className="res-meta">{res.type} • {res.size}</span>
            </div>
            <button 
              className="unlock-btn" 
              onClick={() => handleUnlock(res.id)}
            >
              {unlockedIds.includes(res.id) ? (
                <><Download size={18} /> TELECHARGER</>
              ) : (
                <><Lock size={18} /> DEBLOQUER</>
              )}
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .vault-container {
          min-height: 100vh; background: ${tokens.bg}; color: ${tokens.text};
          padding: 40px 20px; max-width: 1000px; margin: 0 auto;
        }
        .vault-header { margin-bottom: 40px; }
        .back-btn {
          background: none; border: none; color: ${tokens.text};
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          font-weight: 700; opacity: 0.6; margin-bottom: 20px;
        }
        .title-section h1 { font-size: 42px; font-weight: 900; margin: 0; }
        .search-box {
          background: ${tokens.card}; border: 1px solid ${tokens.border};
          padding: 15px 25px; border-radius: 20px; display: flex; gap: 15px; margin-bottom: 40px;
        }
        .search-box input { background: none; border: none; color: inherit; width: 100%; outline: none; font-weight: 600; }
        
        .resources-grid { display: flex; flex-direction: column; gap: 16px; }
        .res-card {
          background: ${tokens.card}; border: 1px solid ${tokens.border};
          padding: 24px; border-radius: 24px; display: flex; align-items: center; gap: 20px;
          transition: 0.3s; position: relative; overflow: hidden;
        }
        .res-card.unlocked { border-color: ${tokens.brand}40; }
        .res-card::after {
          content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
          background: ${tokens.brand}; opacity: 0; transition: 0.3s;
        }
        .res-card:hover::after { opacity: 1; }

        .res-icon {
          background: ${tokens.brand}15; color: ${tokens.brand};
          padding: 15px; border-radius: 18px;
        }
        .res-info { flex: 1; }
        .res-category { font-size: 10px; font-weight: 900; color: ${tokens.brand}; letter-spacing: 1px; text-transform: uppercase; }
        .res-info h3 { margin: 4px 0; font-size: 18px; font-weight: 800; }
        .res-meta { font-size: 12px; opacity: 0.5; font-weight: 600; }

        .unlock-btn {
          padding: 12px 24px; border-radius: 14px; font-weight: 900; font-size: 12px;
          cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 8px;
          background: ${tokens.brand}; color: white; border: none;
        }
        .res-card.unlocked .unlock-btn {
          background: transparent; color: ${tokens.text}; border: 2px solid ${tokens.border};
        }
        .unlock-btn:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}