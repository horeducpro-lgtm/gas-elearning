"use client";
import React, { useState } from 'react';
import { Lock, Unlock, Zap, ChevronRight, FileText, Video, MessageSquare } from 'lucide-react';

interface Reward {
  id: number;
  title: string;
  cost: number;
  type: 'resource' | 'video' | 'coaching';
  description: string;
  unlocked: boolean;
}

export default function EliteVault({ userPoints, onPurchase }: { userPoints: number, onPurchase: (cost: number) => void }) {
  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, title: "Template Cahier des Charges BIM", cost: 500, type: 'resource', description: "Un modèle complet prêt à l'emploi.", unlocked: false },
    { id: 2, title: "Masterclass : Urbanisme Solaire", cost: 1200, type: 'video', description: "1h30 de cours magistral exclusif.", unlocked: false },
    { id: 3, title: "Session Q&A Privée (15 min)", cost: 3000, type: 'coaching', description: "Échange direct avec un expert GAS.", unlocked: false },
  ]);

  const handleUnlock = (reward: Reward) => {
    if (userPoints >= reward.cost && !reward.unlocked) {
      onPurchase(reward.cost);
      setRewards(prev => prev.map(r => r.id === reward.id ? { ...r, unlocked: true } : r));
    }
  };

  const GOLD = "#BE9B4B";

  return (
    <div className="vault-container">
      <div className="vault-header">
        <h2 className="vault-title">Elite Vault</h2>
        <div className="points-badge">
          <Zap size={14} fill={GOLD} color={GOLD} />
          <span>{userPoints} points disponibles</span>
        </div>
      </div>

      <div className="rewards-list">
        {rewards.map((reward) => (
          <div key={reward.id} className={`reward-card ${reward.unlocked ? 'unlocked' : ''}`}>
            <div className="reward-icon">
              {reward.type === 'resource' && <FileText size={20} />}
              {reward.type === 'video' && <Video size={20} />}
              {reward.type === 'coaching' && <MessageSquare size={20} />}
            </div>
            
            <div className="reward-info">
              <h4>{reward.title}</h4>
              <p>{reward.description}</p>
            </div>

            <button 
              className={`unlock-btn ${userPoints < reward.cost && !reward.unlocked ? 'disabled' : ''}`}
              onClick={() => handleUnlock(reward)}
              disabled={reward.unlocked || userPoints < reward.cost}
            >
              {reward.unlocked ? (
                <><Unlock size={16} /> DÉBLOQUÉ</>
              ) : (
                <><Lock size={16} /> {reward.cost} PTS</>
              )}
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .vault-container { margin-top: 30px; }
        .vault-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .vault-title { font-size: 18px; font-weight: 900; margin: 0; }
        
        .points-badge { 
          background: ${GOLD}15; color: ${GOLD}; padding: 6px 12px; 
          border-radius: 10px; font-size: 12px; font-weight: 800;
          display: flex; align-items: center; gap: 6px;
        }

        .rewards-list { display: flex; flex-direction: column; gap: 12px; }
        
        .reward-card {
          display: flex; align-items: center; gap: 15px;
          background: rgba(255,255,255,0.03); padding: 16px;
          border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);
          transition: 0.3s;
        }
        .reward-card.unlocked { border-color: ${GOLD}40; background: ${GOLD}05; }

        .reward-icon { 
          background: rgba(255,255,255,0.05); padding: 10px; 
          border-radius: 12px; color: ${GOLD};
        }

        .reward-info { flex: 1; }
        .reward-info h4 { margin: 0 0 4px; font-size: 14px; font-weight: 800; }
        .reward-info p { margin: 0; font-size: 12px; opacity: 0.5; }

        .unlock-btn {
          border: none; padding: 10px 16px; border-radius: 12px;
          font-weight: 900; font-size: 12px; cursor: pointer;
          display: flex; align-items: center; gap: 8px; transition: 0.2s;
          background: ${GOLD}; color: white;
        }
        
        .unlock-btn.disabled { background: #30363d; opacity: 0.5; cursor: not-allowed; }
        .unlock-btn:not(.disabled):hover { transform: scale(1.05); }
        .reward-card.unlocked .unlock-btn { background: #10B981; }
      `}</style>
    </div>
  );
}