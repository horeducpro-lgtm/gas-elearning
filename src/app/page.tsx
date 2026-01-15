"use client";
import React from 'react';
import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, BookOpen, ShieldCheck, Zap, Star, Bot, Trophy, Users } from 'lucide-react';

export default function HomePage() {
  const { isDark } = useTheme();

  // Configuration de la palette "Elite"
  const brandColor = '#BE9B4B';
  const bgColor = isDark ? '#07090E' : '#FFFFFF';
  const textColor = isDark ? '#F0F6FC' : '#111827';
  const secondaryText = isDark ? '#8B949E' : '#4B5563';
  const cardBg = isDark ? '#11161D' : '#F9FAFB';
  const border = isDark ? 'rgba(190, 155, 75, 0.1)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ 
      backgroundColor: bgColor, 
      color: textColor, 
      minHeight: '100vh', 
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowX: 'hidden'
    }}>
      
      <style jsx global>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .reveal { animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .btn-premium {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          cursor: pointer;
        }
        .btn-premium:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 15px 30px ${brandColor}55;
        }

        .card-premium {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          border: 1px solid ${border} !important;
        }
        .card-premium:hover {
          transform: translateY(-10px);
          border-color: ${brandColor}88 !important;
          background: ${isDark ? '#161B22' : '#FFFFFF'} !important;
          box-shadow: 0 25px 50px rgba(0,0,0,${isDark ? '0.5' : '0.1'});
        }
        
        .glow-bg {
          position: absolute;
          top: -15%; left: -10%; width: 50%; height: 50%;
          background: radial-gradient(circle, ${brandColor}18 0%, transparent 75%);
          filter: blur(80px);
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="glow-bg" />

      {/* 💎 NAVIGATION HAUT DE GAMME */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '20px 6%', borderBottom: `1px solid ${border}`, 
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 1000, 
        backgroundColor: isDark ? 'rgba(7, 9, 14, 0.75)' : 'rgba(255, 255, 255, 0.85)'
      }}>
        <div style={{ fontWeight: 950, fontSize: '28px', letterSpacing: '-1.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '36px', height: '36px', backgroundColor: brandColor, 
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px ${brandColor}40`
          }}>
            <Star size={20} color="white" fill="white" />
          </div>
          GAS<span style={{ color: brandColor }}>ELITE</span>
        </div>

        <Link href="/login" className="btn-premium" style={{
          backgroundColor: brandColor, color: 'white', padding: '14px 32px',
          borderRadius: '16px', textDecoration: 'none', fontWeight: '800', fontSize: '0.95rem'
        }}>
          Accès Membre
        </Link>
      </nav>

      {/* 🚀 HERO SECTION */}
      <header className="reveal" style={{ 
        padding: '140px 6% 100px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1
      }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 24px', borderRadius: '100px', 
          backgroundColor: isDark ? `${brandColor}15` : '#F3F4F6', color: brandColor, 
          fontSize: '0.9rem', fontWeight: '800', marginBottom: '40px', border: `1px solid ${brandColor}33`
        }}>
          <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: brandColor }} />
          Nouveau : Intégration Mentorat IA & Elite Vault
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 9vw, 5.8rem)', fontWeight: '950', 
          lineHeight: '0.9', marginBottom: '35px', letterSpacing: '-4px'
        }}>
          Bâtissez l'excellence avec <br/>
          <span style={{ 
            color: brandColor,
            background: `linear-gradient(135deg, ${brandColor} 0%, #D4AF37 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>GAS Academy</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.4rem', color: secondaryText, marginBottom: '55px',
          lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 55px', fontWeight: '450'
        }}>
          L'écosystème d'apprentissage gamifié pour les architectes. 
          Maîtrisez la durabilité avec nos Mentors IA et accédez à l'Elite Vault.
        </p>
        
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" className="btn-premium" style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: brandColor, color: 'white', padding: '22px 50px',
            borderRadius: '24px', textDecoration: 'none', fontSize: '1.2rem',
            fontWeight: '900', boxShadow: `0 20px 40px ${brandColor}40`
          }}>
            Entrer dans l'Académie <ArrowRight size={26} strokeWidth={3} />
          </Link>
        </div>
      </header>

      {/* 🛠 FEATURES GRID (SYNCHRONISÉ AVEC LES NOUVELLES INTÉGRATIONS) */}
      <section style={{ 
        padding: '20px 6% 120px', display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: '35px', maxWidth: '1350px', margin: '0 auto'
      }}>
        <FeatureCard 
          icon={<Bot size={36} />}
          title="Mentorat IA 24/7"
          desc="Posez vos questions techniques à notre IA entraînée sur les standards d'architecture durable 2026."
          brandColor={brandColor} cardBg={cardBg} isDark={isDark}
        />
        <FeatureCard 
          icon={<Trophy size={36} />}
          title="Elite Vault"
          desc="Convertissez vos points d'apprentissage en ressources réelles : templates BIM, masterclasses et sessions privées."
          brandColor={brandColor} cardBg={cardBg} isDark={isDark}
        />
        <FeatureCard 
          icon={<Users size={36} />}
          title="Laboratoire Social"
          desc="Collaborez sur des projets réels avec d'autres membres et progressez grâce au système de revue par les pairs."
          brandColor={brandColor} cardBg={cardBg} isDark={isDark}
        />
      </section>

      {/* 🏛 FOOTER */}
      <footer style={{ 
        padding: '100px 6% 60px', textAlign: 'center',
        borderTop: `1px solid ${border}`, backgroundColor: isDark ? '#05070A' : '#FAFBFC'
      }}>
        <div style={{ fontWeight: 950, fontSize: '24px', marginBottom: '28px', color: textColor, opacity: 0.9 }}>
          GAS<span style={{ color: brandColor }}>ELITE</span>
        </div>
        <div style={{ color: secondaryText, fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 35px' }}>
          La première plateforme d'accélération architecturale pilotée par l'IA et la gamification.
        </div>
        <p style={{ color: secondaryText, fontSize: '0.9rem', opacity: 0.7 }}>
          © 2026 GAS Academy. Excellence, Rigueur & Innovation.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, brandColor, cardBg, isDark }: any) {
  return (
    <div className="card-premium reveal" style={{
      padding: '55px', borderRadius: '42px', backgroundColor: cardBg,
      textAlign: 'left', cursor: 'pointer', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ 
        marginBottom: '35px', width: '75px', height: '75px', borderRadius: '24px',
        backgroundColor: `${brandColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: brandColor, boxShadow: `inset 0 0 15px ${brandColor}20`
      }}>
        {icon}
      </div>
      <h3 style={{ marginBottom: '20px', fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.5px' }}>{title}</h3>
      <p style={{ color: isDark ? '#8B949E' : '#6B7280', lineHeight: '1.8', fontSize: '1.15rem', fontWeight: '450' }}>{desc}</p>
      
      <div style={{ 
        position: 'absolute', bottom: '0', right: '0', width: '120px', height: '120px', 
        background: `radial-gradient(circle at bottom right, ${brandColor}10, transparent 75%)` 
      }} />
    </div>
  );
}