"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Globe, Zap, Edit3, User, Info, ChevronLeft, Sun, Moon 
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";

export default function ProfileElitePage() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("Apprenant Elite");
  const [stats, setStats] = useState({ progress: 0, modules: 0, xp: 0, certifs: 0 });

  // 1. Logique de calcul du rang basée sur l'XP réelle stockée
  const getRank = (xp: number) => {
    if (xp >= 5000) return { title: "Légende Vivante", color: "#EF4444" };
    if (xp >= 2500) return { title: "Maître Stratège", color: "#BE9B4B" };
    if (xp >= 1000) return { title: "Architecte Senior", color: "#3B82F6" };
    return { title: "Apprenti Elite", color: isDark ? "#8B949E" : "#64748B" };
  };

  // 2. Fonction de synchronisation globale (Sync Sidebar + Formations)
  const syncAllData = () => {
    try {
      // Récupération du nom
      const savedName = localStorage.getItem('gas_user_name');
      if (savedName) setUserName(savedName);

      // Récupération de l'XP réelle synchronisée avec la Sidebar
      const savedXP = localStorage.getItem('gas_user_xp');
      const currentXP = savedXP ? parseInt(savedXP) : 0;

      // Récupération de la progression Architecture
      const savedArchi = localStorage.getItem('gas_archi_progress');
      const globalProgress = localStorage.getItem('gas_academy_progress');
      
      let archiProgress = 0;
      let modulesDone = 0;

      if (savedArchi) {
        const completed = JSON.parse(savedArchi).length;
        archiProgress = Math.round((completed / 9) * 100);
      }

      if (globalProgress) {
        const progressMap = JSON.parse(globalProgress);
        modulesDone = Object.values(progressMap).filter(val => val === 100).length;
      }

      setStats({
        progress: archiProgress > 100 ? 100 : archiProgress,
        modules: modulesDone,
        xp: currentXP, // Utilise l'XP globale synchronisée
        certifs: modulesDone 
      });
    } catch (e) {
      console.error("Profile Sync Error:", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    syncAllData();

    // ÉCOUTEURS POUR RÉACTIVITÉ INSTANTANÉE
    window.addEventListener('progressUpdated', syncAllData);
    window.addEventListener('xpUpdated', syncAllData); // Important pour la Sidebar
    window.addEventListener('storage', syncAllData);

    return () => {
      window.removeEventListener('progressUpdated', syncAllData);
      window.removeEventListener('xpUpdated', syncAllData);
      window.removeEventListener('storage', syncAllData);
    };
  }, []);

  if (!mounted) return null;

  const themeStyles = {
    "--bg": isDark ? "#161B22" : "#F0F2F5",
    "--body-bg": isDark ? "#0B0E14" : "#F8FAFC",
    "--shadow-dark": isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(165, 175, 189, 0.5)",
    "--shadow-light": isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.9)",
    "--text": isDark ? "#F0F6FC" : "#111827",
    "--text-secondary": isDark ? "#8B949E" : "#64748B",
    "--accent": "#BE9B4B",
    "--card-inner": isDark ? "rgba(255, 255, 255, 0.01)" : "rgba(255, 255, 255, 0.6)",
  };

  const currentRank = getRank(stats.xp);

  return (
    <div className="gas-elite-interface" style={themeStyles as React.CSSProperties}>
      <div className="container">
        
        {/* --- HEADER --- */}
        <header className="header-nav">
          <Link href="/dashboard" className="modern-back-btn">
            <div className="back-icon-box">
              <ChevronLeft size={18} />
            </div>
            <span>Dashboard</span>
          </Link>
          
          <div className="logo-group">
            <span className="logo-gas">GAS</span>
            <span className="logo-elite">ELITE</span>
          </div>

          <button onClick={toggleTheme} className="theme-toggle-btn">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* --- PROFIL CARD --- */}
        <section className="profile-main-card card-outer">
          <div className="profile-content">
            <div className="avatar-area">
              <div className="avatar-ring">
                <div className="avatar-img">
                  <User size={44} color={isDark ? "#8B949E" : "#9CA3AF"} />
                </div>
                <div className="badge-status-online"></div>
              </div>
            </div>
            <div className="user-info">
              <h2 style={{ color: 'var(--text)' }}>{userName}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <p className="subtitle" style={{ color: currentRank.color, margin: 0, fontWeight: 800 }}>
                  {currentRank.title}
                </p>
                <span style={{ fontSize: '12px', opacity: 0.5, color: 'var(--text)' }}>•</span>
                <p className="subtitle" style={{ color: 'var(--text-secondary)', margin: 0 }}>Membre Premium</p>
              </div>
            </div>
          </div>
          <Link href="/dashboard/settings" className="premium-edit-btn">
            <Edit3 size={18} />
            <span>Éditer Profil</span>
          </Link>
        </section>

        {/* --- GRID STATS & BADGES --- */}
        <div className="bottom-grid">
          <aside className="stats-aside card-outer">
            <div className="xp-header">
              <span className="label">SCORE D'EXPÉRIENCE</span>
              <span className="val-big">{stats.xp.toLocaleString()} <small>XP</small></span>
            </div>
            
            <div className="stat-list">
              <div className="stat-item-inner">
                <div className="icon-wrap dark-special"><Zap size={18} /></div>
                <div className="stat-text">
                  <strong>{stats.modules}</strong>
                  <span>Cours Validés</span>
                </div>
              </div>
              <div className="stat-item-inner">
                <div className="icon-wrap gold"><Trophy size={18} /></div>
                <div className="stat-text">
                  <strong>{stats.certifs}</strong>
                  <span>Certificats</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="details-main card-outer">
            <div className="section-title">
              <h3>BADGES DE DISTINCTION</h3>
              <Info size={16} className="info-icon" />
            </div>
            
            <div className="badges-grid">
              <div className="badge-slot active">
                <Zap size={28} color="var(--accent)" />
                <span>Pionnier</span>
              </div>
              <div className="badge-slot active-special">
                <Globe size={28} />
                <span>Global</span>
              </div>
              <div className={`badge-slot ${stats.certifs >= 1 ? 'active' : 'locked'}`}>
                <Trophy size={28} color={stats.certifs >= 1 ? "var(--accent)" : "currentColor"} />
                <span>{stats.certifs >= 1 ? 'Architecte' : 'Expert'}</span>
              </div>
            </div>

            <div className="parcours-wrapper">
              <div className="parcours-info">
                <span className="prog-label">PROGRESSION ARCHITECTURE</span>
                <span className="percent-text">{stats.progress}%</span>
              </div>
              <div className="custom-progress-bg">
                <div 
                  className="custom-progress-fill" 
                  style={{ width: `${stats.progress}%` }}
                ></div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .gas-elite-interface { background-color: var(--body-bg); width: 100%; min-height: 100vh; color: var(--text); transition: all 0.5s ease; padding-bottom: 50px; }
        .container { max-width: 1100px; margin: 0 auto; padding: 40px; }
        .header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .modern-back-btn { display: flex; align-items: center; gap: 12px; color: var(--text-secondary); text-decoration: none; font-weight: 700; transition: 0.3s; }
        .modern-back-btn:hover { color: var(--accent); }
        .back-icon-box { width: 40px; height: 40px; border-radius: 12px; background: var(--bg); display: flex; align-items: center; justify-content: center; box-shadow: 4px 4px 10px var(--shadow-dark), -4px -4px 10px var(--shadow-light); }
        .logo-gas { font-size: 26px; font-weight: 950; color: var(--text); }
        .logo-elite { font-size: 22px; font-weight: 300; margin-left: 8px; color: var(--accent); letter-spacing: 4px; }
        .theme-toggle-btn { width: 48px; height: 48px; border-radius: 14px; background: var(--bg); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light); color: var(--accent); transition: 0.2s; }
        .card-outer { background: var(--bg); border-radius: 35px; padding: 35px; box-shadow: 15px 15px 35px var(--shadow-dark), -15px -15px 35px var(--shadow-light); margin-bottom: 30px; border: 1px solid ${isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)"}; }
        .profile-main-card { display: flex; justify-content: space-between; align-items: center; }
        .profile-content { display: flex; align-items: center; gap: 30px; }
        .avatar-ring { width: 100px; height: 100px; border-radius: 50%; background: var(--bg); display: flex; align-items: center; justify-content: center; box-shadow: inset 6px 6px 12px var(--shadow-dark), inset -6px -6px 12px var(--shadow-light); position: relative; }
        .badge-status-online { position: absolute; bottom: 8px; right: 8px; width: 16px; height: 16px; background: #10B981; border: 4px solid var(--bg); border-radius: 50%; box-shadow: 0 0 10px #10B98150; }
        .user-info h2 { font-size: 32px; margin: 0; font-weight: 900; letter-spacing: -1px; }
        .subtitle { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .premium-edit-btn { display: flex; align-items: center; gap: 10px; padding: 14px 24px; background: var(--bg); border-radius: 18px; text-decoration: none; color: var(--text); font-weight: 800; font-size: 13px; box-shadow: 6px 6px 15px var(--shadow-dark), -6px -6px 15px var(--shadow-light); transition: 0.3s; }
        .premium-edit-btn:hover { background: var(--accent); color: white; transform: translateY(-2px); }
        .bottom-grid { display: grid; grid-template-columns: 320px 1fr; gap: 30px; }
        .xp-header { margin-bottom: 25px; border-bottom: 1px solid ${isDark ? "#21262d" : "#e1e4e8"}; padding-bottom: 20px; }
        .label { font-size: 10px; font-weight: 900; color: var(--text-secondary); letter-spacing: 2px; }
        .val-big { display: block; font-size: 44px; font-weight: 950; margin-top: 5px; color: var(--text); }
        .val-big small { font-size: 14px; color: var(--accent); margin-left: 5px; }
        .stat-item-inner { display: flex; align-items: center; gap: 18px; padding: 22px; background: var(--card-inner); border-radius: 24px; margin-bottom: 18px; border: 1px solid ${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}; }
        .icon-wrap { width: 50px; height: 50px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; }
        .icon-wrap.dark-special { background: #1F2937; box-shadow: 0 10px 15px rgba(0,0,0,0.2); }
        .icon-wrap.gold { background: var(--accent); box-shadow: 0 10px 15px #BE9B4B40; }
        .stat-text strong { display: block; font-size: 20px; font-weight: 900; }
        .stat-text span { font-size: 12px; color: var(--text-secondary); font-weight: 600; }
        .section-title { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; }
        .section-title h3 { font-size: 14px; font-weight: 900; letter-spacing: 2px; margin: 0; color: var(--text-secondary); }
        .info-icon { opacity: 0.4; }
        .badges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .badge-slot { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border-radius: 30px; font-weight: 800; font-size: 11px; box-shadow: inset 5px 5px 12px var(--shadow-dark), inset -5px -5px 12px var(--shadow-light); transition: 0.3s; }
        .badge-slot.active-special { background: var(--text); color: var(--body-bg); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
        .badge-slot.locked { opacity: 0.25; filter: grayscale(1); }
        .badge-slot span { text-transform: uppercase; letter-spacing: 1px; }
        .parcours-info { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px; }
        .prog-label { font-size: 11px; font-weight: 900; color: var(--text-secondary); letter-spacing: 1px; }
        .percent-text { font-size: 24px; font-weight: 950; color: var(--accent); }
        .custom-progress-bg { height: 14px; background: var(--shadow-dark); border-radius: 50px; overflow: hidden; box-shadow: inset 2px 2px 5px rgba(0,0,0,0.2); }
        .custom-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #D4AF37); border-radius: 50px; transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (max-width: 1024px) { .container { padding: 20px; } .bottom-grid { grid-template-columns: 1fr; } .profile-main-card { flex-direction: column; text-align: center; gap: 20px; } }
      `}</style>
    </div>
  );
}