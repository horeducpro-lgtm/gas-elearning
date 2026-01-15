'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';
import { SessionProvider, useSession } from "next-auth/react";
import { getUserDashboardData } from "@/app/actions/user";

// --- Tes styles globaux neumorphiques ---
const GlobalStyles = () => {
  const { isDark } = useTheme();
  const GOLD = "#BE9B4B";
  
  return (
    <style jsx global>{`
      html, body { 
        margin: 0; padding: 0; 
        overflow-x: hidden; width: 100%; height: 100%; 
        scroll-behavior: smooth;
        background-color: ${isDark ? "#0B0E14" : "#D1D5DB"};
      }
      .neo-btn-premium {
        background: ${isDark ? "#161B22" : "#E5E7EB"};
        color: ${GOLD} !important;
        border: 1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)"};
        box-shadow: 6px 6px 12px ${isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}, 
                    -6px -6px 12px ${isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)"};
        transition: all 0.3s ease;
      }
      @media (max-width: 1024px) {
        .main-content { margin-left: 0 !important; width: 100%; }
        .mobile-header { display: flex !important; }
      }
      @media (min-width: 1025px) {
        .main-content { margin-left: 280px; width: calc(100% - 280px); }
        .mobile-header { display: none !important; }
      }
    `}</style>
  );
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [globalProgress, setGlobalProgress] = useState<number>(0);

  const colors = {
    gold: "#BE9B4B",
    bg: isDark ? "#0B0E14" : "#D1D5DB",
    card: isDark ? "#161B22" : "#E5E7EB",
    border: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)",
  };

  const isPublicPage = pathname === '/' || pathname === '/login';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ background: '#0B0E14', height: '100vh' }} />;

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh', display: 'flex', width: '100%' }}>
      <GlobalStyles />
      
      {!isPublicPage && (
        <>
          <header className="mobile-header" style={{
            display: 'none', position: 'fixed', top: 0, left: 0, right: 0, height: '70px',
            padding: '0 20px', alignItems: 'center', justifyContent: 'space-between',
            background: isDark ? 'rgba(11, 14, 20, 0.8)' : 'rgba(209, 213, 219, 0.8)',
            borderBottom: `1px solid ${colors.border}`, zIndex: 900
          }}>
            <div style={{ fontWeight: 900, fontSize: '20px' }}>GAS<span style={{ color: colors.gold }}>ELITE</span></div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="neo-btn-premium" style={{ padding: '10px', borderRadius: '14px' }}>
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </header>

          <div className={`sidebar-container ${isMobileMenuOpen ? 'open' : ''}`} style={{ width: '280px', position: 'fixed', height: '100vh', zIndex: 1000 }}>
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onLogoutRequest={() => setShowLogoutConfirm(true)} progressData={globalProgress} />
          </div>
        </>
      )}

      <div className={`main-content ${isPublicPage ? 'full-width-wrapper' : ''}`} style={{ flex: 1 }}>
        <main className="page-wrapper" style={{ padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </SessionProvider>
  );
}