"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "@/context/ThemeContext"; 
import { 
  LayoutDashboard, BookOpen, User, Award, 
  Settings, LogOut, Moon, Sun, GraduationCap, Sparkles,
  Timer, Library, MessageSquareCode, Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme(); 
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [userXP, setUserXP] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Calcule le niveau basé sur les XP (Ex: 1000 XP par niveau)
  const userLevel = Math.floor(userXP / 1000) + 1;

  // --- MOTEUR DE SYNCHRONISATION ---
  const syncSidebarData = () => {
    try {
      // 1. Sync Progression du cours spécifique (Architecture Moderne)
      const savedArchi = localStorage.getItem('gas_archi_progress');
      if (savedArchi) {
        const completed = JSON.parse(savedArchi).length;
        // On base le pourcentage sur 9 modules prévus
        setProgress(Math.round((completed / 9) * 100));
      }

      // 2. Sync Points XP globaux
      const savedXP = localStorage.getItem('gas_user_xp');
      if (savedXP) {
        setUserXP(parseInt(savedXP));
      }
    } catch (e) {
      console.error("Sidebar Sync Error:", e);
    }
  };

  useEffect(() => {
    // Initialisation au montage
    syncSidebarData();

    // Écouteurs d'événements pour la réactivité instantanée
    window.addEventListener('storage', syncSidebarData); // Entre onglets
    window.addEventListener('progressUpdated', syncSidebarData); // Via les modules
    window.addEventListener('xpUpdated', syncSidebarData); // Via les actions du dashboard

    return () => {
      window.removeEventListener('storage', syncSidebarData);
      window.removeEventListener('progressUpdated', syncSidebarData);
      window.removeEventListener('xpUpdated', syncSidebarData);
    };
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    localStorage.clear();
    window.location.href = '/';
  };

  const GOLD = '#BE9B4B'; 
  const bgMain = isDark ? '#0F1115' : '#FFFFFF';
  const textMain = isDark ? '#F0F6FC' : '#1C1D1F';
  const textSoft = isDark ? '#8B949E' : '#6A6F73';
  const borderSidebar = `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#D1D7DC'}`;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
    { icon: BookOpen, label: 'Mes Formations', href: '/dashboard/courses' },
    { icon: Library, label: 'Elite Vault', href: '/dashboard/vault' },
    { icon: MessageSquareCode, label: 'IA Mentor', href: '/dashboard/mentor' },
    { icon: Timer, label: 'Mode Focus', href: '/dashboard/focus' },
    { icon: GraduationCap, label: 'Quiz & Tests', href: '/dashboard/quiz' },
    { icon: Award, label: 'Certifications', href: '/dashboard/certification' }, 
    { icon: User, label: 'Profil Apprenant', href: '/dashboard/profile' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
  ];

  return (
    <aside style={{ 
      width: '260px', backgroundColor: bgMain, height: '100vh', display: 'flex', flexDirection: 'column',
      borderRight: borderSidebar, position: 'fixed', left: 0, top: 0, zIndex: 100,
      padding: '20px 12px', transition: 'all 0.3s ease'
    }}>
      
      {/* LOGO SECTION */}
      <div style={{ padding: '10px 15px 25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '38px', height: '38px', backgroundColor: GOLD, borderRadius: '10px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${GOLD}40`
            }}>
                <Sparkles size={20} color="white" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: textMain, letterSpacing: '0.3px' }}>GAS ACADEMY</span>
                <span style={{ fontSize: '9px', fontWeight: '800', color: GOLD, letterSpacing: '1.2px' }}>ELITE LEARNING</span>
            </div>
        </div>
      </div>

      {/* INDICATEUR XP ET NIVEAU (Synchronisé) */}
      <div style={{ 
        margin: '0 10px 20px', padding: '10px 15px', borderRadius: '15px',
        backgroundColor: isDark ? 'rgba(190, 155, 75, 0.08)' : '#FFFBF0',
        border: `1px solid ${GOLD}20`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={14} fill={GOLD} color={GOLD} />
          <span style={{ fontSize: '12px', fontWeight: '900', color: textMain }}>{userXP.toLocaleString()} XP</span>
        </div>
        <div style={{ fontSize: '10px', fontWeight: '900', color: GOLD, background: `${GOLD}20`, padding: '2px 8px', borderRadius: '6px' }}>
          Lvl {userLevel}
        </div>
      </div>

      {/* NAVIGATION PRINCIPALE */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredIndex === index;

          return (
            <Link key={item.href} href={item.href} 
              onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}
              style={{ 
                display: 'flex', alignItems: 'center', padding: '11px 14px', borderRadius: '12px', textDecoration: 'none',
                backgroundColor: isActive ? (isDark ? 'rgba(190, 155, 75, 0.15)' : '#F0F4F8') : (isHovered ? (isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC') : 'transparent'),
                transition: 'all 0.2s ease', gap: '12px'
              }}
            >
              <item.icon size={19} color={isActive ? GOLD : textSoft} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ 
                color: isActive ? textMain : (isHovered ? textMain : textSoft), 
                fontWeight: isActive ? '750' : '600', 
                fontSize: '13.5px', flex: 1
              }}>
                {item.label}
              </span>
              {isActive && <div style={{ width: '4px', height: '14px', backgroundColor: GOLD, borderRadius: '2px' }} />}
            </Link>
          );
        })}
      </nav>

      {/* BARRE DE PROGRESSION GLOBALE DU CURSUS (Synchronisée) */}
      <div style={{ 
        padding: '16px', background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC', 
        borderRadius: '20px', marginBottom: '15px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0'}`
      }}>
        <div style={{ fontSize: '10px', fontWeight: '900', color: textSoft, marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span>CURSUS ARCHITECTURE</span>
          <span style={{ color: GOLD }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', backgroundColor: isDark ? '#1A1D23' : '#E2E8F0', borderRadius: '10px' }}>
          <div style={{ 
            width: `${progress}%`, height: '100%', 
            background: `linear-gradient(90deg, ${GOLD}, #F3D081)`, 
            borderRadius: '10px', transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' 
          }} />
        </div>
      </div>

      {/* SECTION BASSE (Thème & Déconnexion) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: borderSidebar, paddingTop: '15px' }}>
        <button onClick={toggleTheme} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', background: 'none', border: 'none', color: textSoft, cursor: 'pointer', fontSize: '13px', fontWeight: '700', borderRadius: '10px'
        }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'MODE CLAIR' : 'MODE SOMBRE'}
        </button>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '13px', fontWeight: '800', borderRadius: '10px'
        }}>
          <LogOut size={18} />
          DÉCONNEXION
        </button>
      </div>
    </aside>
  );
}