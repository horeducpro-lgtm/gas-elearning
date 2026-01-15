"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from "@/context/ThemeContext";
import confetti from 'canvas-confetti';
import { 
  PlayCircle, Sparkles, Search, Clock, Award, 
  X, Trophy, UserCheck, Flame, Zap, Target, BookOpen
} from 'lucide-react';
import CertificateModal from "@/components/CertificateModal";

// --- COMPOSANT TOAST OPTIMISÉ ---
const Toast = ({ id, type, message, onClose, tokens }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 6000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'achievement': return <Trophy size={18} color="#10B981" />;
      case 'points': return <Sparkles size={18} color={tokens.brand} />;
      default: return <UserCheck size={18} color="#3B82F6" />;
    }
  };

  return (
    <div className="toast-item">
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">{message}</div>
      <button className="toast-close" onClick={() => onClose(id)}><X size={14} /></button>
      <style jsx>{`
        .toast-item {
          background: ${tokens.isDark ? 'rgba(22, 27, 34, 0.98)' : 'white'};
          backdrop-filter: blur(12px); 
          border: 1px solid ${type === 'achievement' ? '#10B981' : tokens.brand}50;
          padding: 16px 20px; border-radius: 20px; display: flex; align-items: center; gap: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2); margin-bottom: 10px;
          min-width: 320px; animation: slideIn 0.5s cubic-bezier(0.17, 0.88, 0.32, 1.2);
        }
        .toast-icon { background: ${type === 'achievement' ? '#10B98120' : tokens.brand + '15'}; padding: 10px; border-radius: 12px; }
        .toast-content { font-size: 14px; font-weight: 800; flex: 1; color: ${tokens.text}; }
        .toast-close { background: none; border: none; cursor: pointer; opacity: 0.5; color: ${tokens.text}; }
        @keyframes slideIn { from { transform: translateX(110%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default function GasMainContent() {
  const { isDark } = useTheme();
  const router = useRouter();
  const prevProgress = useRef(0);
  
  // --- ÉTATS SYNCHRONISÉS ---
  const [userName, setUserName] = useState("Elite Member");
  const [accentColor, setAccentColor] = useState("#BE9B4B");
  const [userSettings, setUserSettings] = useState({ push: true });
  
  const [userXP, setUserXP] = useState(12450);
  const [archiProgress, setArchiProgress] = useState(0);
  const [showCert, setShowCert] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, text: "Session Focus (25 min)", completed: false, xp: 20, route: '/dashboard/focus', key: 'goal_focus' },
    { id: 2, text: "Consulter l'IA Mentor", completed: false, xp: 50, route: '/dashboard/mentor', key: 'goal_mentor' },
    { id: 3, text: "Ouvrir l'Elite Vault", completed: false, xp: 30, route: '/dashboard/vault', key: 'goal_vault' },
  ]);

  // --- DESIGN TOKENS DYNAMIQUES ---
  const tokens = {
    brand: accentColor,
    card: isDark ? 'rgba(22, 27, 34, 0.8)' : '#FFFFFF',
    text: isDark ? '#F0F6FC' : '#1C1D1F',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
    isDark: isDark
  };

  const fireCelebration = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [tokens.brand, '#10B981', '#FFFFFF']
    });
  }, [tokens.brand]);

  // Système de notification respectant les paramètres
  const notify = useCallback((type, message) => {
    if (!userSettings.push) return; // Bloque si désactivé dans Settings
    setNotifications(prev => [...prev, { id: Date.now(), type, message }]);
  }, [userSettings.push]);

  // --- LOGIQUE DE SYNCHRONISATION TOTALE AVEC SETTINGS ---
  const syncAllData = useCallback(() => {
    // 1. Sync Profil & UI
    const savedName = localStorage.getItem('gas_user_name');
    const savedAccent = localStorage.getItem('gas_accent_color');
    const savedSettings = localStorage.getItem('gas_user_settings');

    if (savedName) setUserName(savedName);
    if (savedAccent) setAccentColor(savedAccent);
    if (savedSettings) setUserSettings(JSON.parse(savedSettings));
    
    // 2. Sync Progression
    const savedXP = localStorage.getItem('gas_user_xp');
    if (savedXP) setUserXP(parseInt(savedXP));

    const savedArchi = localStorage.getItem('gas_archi_progress');
    if (savedArchi) {
      const completedModules = JSON.parse(savedArchi).length || 0;
      const currentCalc = Math.min(Math.round((completedModules / 9) * 100), 100);
      
      if (currentCalc === 100 && prevProgress.current < 100 && prevProgress.current !== 0) {
        notify('achievement', "Félicitations ! Vous avez débloqué votre certification Elite.");
        fireCelebration();
      }
      setArchiProgress(currentCalc);
      prevProgress.current = currentCalc;
    }

    setDailyGoals(prev => prev.map(goal => ({
      ...goal,
      completed: localStorage.getItem(goal.key) === 'true'
    })));
  }, [fireCelebration, notify]);

  useEffect(() => {
    syncAllData();
    // Écoute les changements du localStorage (venant de la page Settings)
    window.addEventListener('storage', syncAllData);
    return () => window.removeEventListener('storage', syncAllData);
  }, [syncAllData]);

  return (
    <div className="gas-container">
      <div className="toast-container">
        {notifications.map(n => (
          <Toast key={n.id} {...n} tokens={tokens} onClose={(id) => setNotifications(prev => prev.filter(t => t.id !== id))} />
        ))}
      </div>

      <style jsx>{`
        .gas-container { color: ${tokens.text}; max-width: 1200px; margin: 0 auto; padding: 40px 20px; transition: all 0.3s ease; }
        .bento-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
        .main-card { 
          grid-column: span 8; 
          background: ${isDark ? '#161B22' : '#1C1D1F'}; 
          color: white; padding: 45px; border-radius: 35px; 
          position: relative; overflow: hidden;
          border: 1px solid ${archiProgress === 100 ? '#10B98160' : tokens.brand + '30'};
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .progress-bar { height: 12px; background: rgba(255,255,255,0.1); border-radius: 20px; margin: 25px 0; overflow: hidden; }
        .progress-fill { 
          height: 100%; width: ${archiProgress}%;
          background: ${archiProgress === 100 ? 'linear-gradient(90deg, #10B981, #34D399)' : `linear-gradient(90deg, ${tokens.brand}, #E5C171)`}; 
          transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1); 
        }
        .cert-pulse { animation: ${archiProgress === 100 ? 'pulse-green 2s infinite' : 'none'}; }
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; }
        @media (max-width: 1024px) { .main-card { grid-column: span 12; } .bento-grid { display: flex; flex-direction: column; } }
      `}</style>

      {/* HEADER NAV SYNCHRONISÉ */}
      <div className="nav-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div className="search-bar" style={{ background: tokens.card, border: `1px solid ${tokens.border}`, padding: '12px 20px', borderRadius: '15px', display: 'flex', gap: '10px', flex: 0.6 }}>
          <Search size={18} color={tokens.brand} />
          <input placeholder="Rechercher une formation..." style={{ background: 'none', border: 'none', color: 'inherit', outline: 'none', width: '100%', fontWeight: '600' }} />
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ background: `${tokens.brand}15`, color: tokens.brand, padding: '8px 18px', borderRadius: '12px', fontWeight: '900', display: 'flex', gap: '8px', border: `1px solid ${tokens.brand}30` }}>
            <Flame size={18} fill={tokens.brand} /> 12 JOURS
          </div>
          {/* Avatar dynamique basé sur la couleur et l'initiale de Settings */}
          <div onClick={() => router.push('/dashboard/settings')} style={{ width: '48px', height: '48px', background: tokens.brand, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', boxShadow: `0 4px 14px ${tokens.brand}40` }}>
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>Dashboard <span style={{ color: tokens.brand }}>Elite</span></h1>
        <p style={{ opacity: 0.5, fontWeight: '600', marginTop: '5px' }}>Ravi de vous revoir, {userName.split(' ')[0]}. Vos paramètres sont à jour.</p>
      </header>

      <div className="bento-grid">
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <QuickStat label="XP TOTAL" value={userXP.toLocaleString()} icon={<Zap size={22}/>} color={tokens.brand} tokens={tokens} />
            <QuickStat label="TITRE" value={archiProgress === 100 ? "Expert Elite" : "Architecte"} icon={<Award size={22}/>} color="#10B981" tokens={tokens} />
            <QuickStat label="OBJECTIFS" value={`${dailyGoals.filter(g=>g.completed).length}/${dailyGoals.length}`} icon={<Target size={22}/>} color="#3B82F6" tokens={tokens} />
        </div>

        <div className="main-card">
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', opacity: 0.08, transform: 'rotate(-10deg)' }}>
             <Trophy size={280} color={archiProgress === 100 ? '#10B981' : 'white'} />
          </div>
          
          <div style={{ 
            background: archiProgress === 100 ? '#10B98120' : `${tokens.brand}20`, 
            color: archiProgress === 100 ? '#10B981' : tokens.brand, padding: '6px 15px', borderRadius: '10px', 
            fontSize: '12px', fontWeight: '900', width: 'fit-content', 
            marginBottom: '24px', border: '1px solid currentColor'
          }}>
            {archiProgress === 100 ? 'SUCCESS : CURSUS COMPLÉTÉ' : 'CURSUS EN COURS'}
          </div>

          <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px', maxWidth: '500px', lineHeight: '1.1' }}>Architecture Durable 2026</h2>
          
          <div style={{ margin: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '15px', marginBottom: '12px' }}>
              <span style={{ opacity: 0.7 }}>Progression globale</span>
              <span style={{ color: archiProgress === 100 ? '#10B981' : tokens.brand }}>{archiProgress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" />
            </div>
          </div>

          <button 
            className="cert-pulse"
            onClick={() => archiProgress === 100 ? setShowCert(true) : router.push('/dashboard/courses/architecture')} 
            style={{ 
              background: archiProgress === 100 ? '#10B981' : 'white', 
              color: archiProgress === 100 ? 'white' : '#1C1D1F',
              border: 'none', padding: '20px 40px', borderRadius: '22px', 
              fontWeight: '900', cursor: 'pointer', display: 'flex', 
              gap: '15px', alignItems: 'center', transition: '0.4s' 
            }}
          >
            {archiProgress === 100 ? (
              <><Trophy size={24}/> VOIR LE DIPLÔME ELITE</>
            ) : (
              <><PlayCircle size={24}/> REPRENDRE LE MODULE</>
            )}
          </button>
        </div>

        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: tokens.card, padding: '30px', borderRadius: '35px', border: `1px solid ${tokens.border}` }}>
            <h3 style={{ margin: '0 0 25px', fontSize: '18px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Target size={20} color={tokens.brand}/> Objectifs du jour
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {dailyGoals.map(goal => (
                <div key={goal.id} className={`goal-item`} onClick={() => router.push(goal.route)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '18px', background: goal.completed ? '#10B98108' : 'rgba(255,255,255,0.02)', border: `1px solid ${goal.completed ? '#10B98140' : tokens.border}`, cursor: 'pointer', transition: '0.2s' }}>
                  <div style={{ width: '24px', height: '24px', border: `2px solid ${goal.completed ? '#10B981' : tokens.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: goal.completed ? '#10B981' : 'transparent' }}>
                    {goal.completed && <X size={14} color="white" style={{ transform: 'rotate(45deg)' }} />}
                  </div>
                  <span style={{ flex: 1, fontSize: '14px', fontWeight: '700', opacity: goal.completed ? 0.5 : 1 }}>{goal.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <QuickLink label="Elite Vault" icon={<BookOpen size={24}/>} route="/dashboard/vault" tokens={tokens} />
              <QuickLink label="Paramètres" icon={<Clock size={24}/>} route="/dashboard/settings" tokens={tokens} />
          </div>
        </div>
      </div>

      {showCert && (
        <CertificateModal 
          userName={userName} 
          courseTitle="Architecture Durable & Bioclimatique" 
          onClose={() => setShowCert(false)} 
        />
      )}
    </div>
  );
}

function QuickStat({ label, value, icon, color, tokens }) {
    return (
        <div style={{ background: tokens.card, padding: '26px', borderRadius: '30px', border: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: `${color}15`, color: color, padding: '14px', borderRadius: '16px' }}>{icon}</div>
            <div>
                <div style={{ fontSize: '11px', fontWeight: '800', opacity: 0.5 }}>{label}</div>
                <div style={{ fontSize: '22px', fontWeight: '900' }}>{value}</div>
            </div>
        </div>
    );
}

function QuickLink({ label, icon, route, tokens }) {
    const router = useRouter();
    return (
        <div 
            onClick={() => router.push(route)}
            style={{ background: tokens.card, padding: '25px', borderRadius: '30px', border: `1px solid ${tokens.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: '0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.brand; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.border; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
            <div style={{ color: tokens.brand }}>{icon}</div>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>{label}</span>
        </div>
    );
}