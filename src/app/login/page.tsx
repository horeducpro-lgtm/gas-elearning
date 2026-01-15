"use client";

import React, { useState } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { Loader2, Sparkles, ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const GOLD = "#BE9B4B";

export default function LoginPage() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // États pour les identifiants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      /**
       * SYNCHRONISATION BACKEND (FastAPI OAuth2)
       * On utilise URLSearchParams car FastAPI attend un format form-data pour le login
       */
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI utilise 'username' par défaut pour l'email
      formData.append('password', password);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Le cookie HTTPOnly est automatiquement géré par le navigateur
        // On redirige vers le dashboard
        window.location.href = "/";
      } else {
        alert(data.detail || "Identifiants invalides.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur de base de données. Vérifiez votre connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const bgGradient = isDark 
    ? "radial-gradient(circle at top, #1c2128 0%, #0d1117 100%)" 
    : "radial-gradient(circle at top, #ffffff 0%, #f3f4f6 100%)";

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bgGradient, padding: '20px', fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ 
        width: '100%', maxWidth: '450px', 
        backgroundColor: isDark ? '#161B22' : '#FFFFFF',
        padding: '50px 40px', borderRadius: '32px', textAlign: 'center',
        boxShadow: isDark ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.1)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Ligne dorée premium */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: `linear-gradient(90deg, ${GOLD}, #E5C37B)` }} />

        {/* Header du Login */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            width: '64px', height: '64px', backgroundColor: `${GOLD}15`, 
            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px auto', border: `1px solid ${GOLD}30`
          }}>
            <ShieldCheck size={32} color={GOLD} />
          </div>
          
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: isDark ? '#FFF' : '#111', marginBottom: '10px', letterSpacing: '-0.5px' }}>
            GAS ACADEMY
          </h1>
          <p style={{ color: isDark ? '#8B949E' : '#6B7280', fontSize: '15px' }}>
            Accédez à votre espace d'élite.
          </p>
        </div>

        {/* Formulaire Synchronisé */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Champ Email */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: GOLD, marginBottom: '8px', display: 'block', letterSpacing: '1px' }}>EMAIL PROFESSIONNEL</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} size={18} />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                style={{ 
                  width: '100%', padding: '15px 15px 15px 45px', borderRadius: '14px',
                  border: `1px solid ${isDark ? '#30363d' : '#e5e7eb'}`,
                  backgroundColor: isDark ? '#0d1117' : '#f9fafb',
                  color: isDark ? 'white' : 'black', outline: 'none', transition: '0.2s'
                }}
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: GOLD, marginBottom: '8px', display: 'block', letterSpacing: '1px' }}>MOT DE PASSE</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', padding: '15px 45px 15px 45px', borderRadius: '14px',
                  border: `1px solid ${isDark ? '#30363d' : '#e5e7eb'}`,
                  backgroundColor: isDark ? '#0d1117' : '#f9fafb',
                  color: isDark ? 'white' : 'black', outline: 'none'
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Bouton de Connexion */}
          <button 
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%', padding: '18px', borderRadius: '16px', border: 'none',
              backgroundColor: isLoading ? (isDark ? '#30363d' : '#e5e7eb') : GOLD,
              color: 'white', fontWeight: '800', fontSize: '15px', cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              transition: 'all 0.3s', boxShadow: isLoading ? 'none' : `0 10px 25px ${GOLD}40`,
            }}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Sparkles size={20} />
                ENTRER DANS L'ACADÉMIE
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '35px' }}>
          <p style={{ fontSize: '11px', color: isDark ? '#484f58' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
            Système sécurisé GAS-SECURE 2.0
          </p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', fontSize: '13px', color: isDark ? '#484f58' : '#9ca3af' }}>
        © 2026 Elite Architecture Academy. Tous droits réservés.
      </div>
    </div>
  );
}