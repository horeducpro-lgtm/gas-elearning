"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from "@/context/ThemeContext";
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle2, Coffee } from 'lucide-react';

export default function FocusPage() {
  const { isDark } = useTheme();
  const router = useRouter();
  
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const tokens = {
    brand: '#BE9B4B',
    bg: isDark ? '#0B0E14' : '#F8FAFC',
    card: isDark ? 'rgba(22, 27, 34, 0.8)' : '#FFFFFF',
    text: isDark ? '#F0F6FC' : '#1C1D1F',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0 && isActive) {
      handleFinish();
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleFinish = () => {
    setIsActive(false);
    setIsCompleted(true);
    
    // LOGIQUE DE SYNCHRONISATION AVEC LE DASHBOARD
    const currentXP = parseInt(localStorage.getItem('gas_user_xp') || '12450');
    if (localStorage.getItem('goal_focus') !== 'true') {
      localStorage.setItem('gas_user_xp', (currentXP + 20).toString());
      localStorage.setItem('goal_focus', 'true');
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsCompleted(false);
  };

  return (
    <div className="focus-container">
      <button className="back-btn" onClick={() => router.back()}>
        <ArrowLeft size={24} /> Retour au Dashboard
      </button>

      <div className="focus-card">
        <div className="header">
          <span className="badge">MODE FOCUS</span>
          <h1>Session de Travail Profond</h1>
          <p>Éliminez les distractions. Concentrez-vous sur l'essentiel.</p>
        </div>

        <div className="timer-display">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {!isCompleted ? (
          <div className="controls">
            <button onClick={toggleTimer} className="main-btn">
              {isActive ? <Pause fill="white" /> : <Play fill="white" />}
              {isActive ? "PAUSE" : "LANCER LA SESSION"}
            </button>
            <button onClick={resetTimer} className="reset-btn">
              <RotateCcw size={20} />
            </button>
          </div>
        ) : (
          <div className="completed-state">
            <CheckCircle2 size={60} color="#10B981" />
            <h2>Session Terminée !</h2>
            <p>+20 XP ajoutés à votre profil.</p>
            <button onClick={() => router.push('/dashboard')} className="main-btn">
              RETOUR AU DASHBOARD
            </button>
          </div>
        )}

        <div className="tips">
          <div className="tip-item">
            <Coffee size={18} color={tokens.brand} />
            <span>Hydratez-vous régulièrement</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .focus-container {
          min-height: 100vh;
          background: ${tokens.bg};
          color: ${tokens.text};
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }
        .back-btn {
          align-self: flex-start;
          background: none; border: none; color: ${tokens.text};
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; font-weight: 700; opacity: 0.6; transition: 0.3s;
          margin-bottom: 60px;
        }
        .back-btn:hover { opacity: 1; transform: translateX(-5px); }
        .focus-card {
          background: ${tokens.card};
          border: 1px solid ${tokens.border};
          padding: 60px;
          border-radius: 40px;
          text-align: center;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        .badge {
          background: ${tokens.brand}20; color: ${tokens.brand};
          padding: 6px 16px; border-radius: 100px; font-size: 12px; font-weight: 900;
        }
        h1 { font-size: 32px; font-weight: 900; margin: 20px 0 10px; }
        p { opacity: 0.6; font-weight: 500; }
        .timer-display {
          font-size: 120px; font-weight: 900; font-variant-numeric: tabular-nums;
          margin: 40px 0; color: ${tokens.text}; letter-spacing: -4px;
        }
        .controls { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .main-btn {
          background: ${tokens.brand}; color: white; border: none;
          padding: 18px 40px; border-radius: 20px; font-weight: 900;
          display: flex; align-items: center; gap: 12px; cursor: pointer;
          transition: 0.3s; box-shadow: 0 10px 20px ${tokens.brand}40;
        }
        .main-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px ${tokens.brand}60; }
        .reset-btn {
          background: ${tokens.border}; color: ${tokens.text}; border: none;
          width: 58px; height: 58px; border-radius: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .completed-state {
          display: flex; flex-direction: column; align-items: center; gap: 20px;
          animation: fadeIn 0.5s ease;
        }
        .tips { margin-top: 50px; padding-top: 30px; border-top: 1px solid ${tokens.border}; }
        .tip-item { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; font-weight: 600; opacity: 0.8; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}