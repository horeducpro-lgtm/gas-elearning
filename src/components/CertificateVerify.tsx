"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { 
  ShieldCheck, 
  User, 
  BookOpen, 
  Calendar, 
  Globe, 
  AlertTriangle, 
  Award,
  ExternalLink,
  BadgeCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VerifyProps {
  certId: string;
}

export default function CertificateVerify({ certId }: VerifyProps) {
  const { isDark } = useTheme();
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');

  const COLORS = {
    GOLD: "#b59410",
    NAVY: "#0a1d37",
    SUCCESS: "#10b981",
    DANGER: "#ef4444"
  };

  useEffect(() => {
    const performVerification = async () => {
      // Simulation d'appel à la base de données GAS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (certId && certId.includes("GAS-2026")) {
        setStatus('valid');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: [COLORS.GOLD, COLORS.NAVY, '#ffffff']
        });
      } else {
        setStatus('invalid');
      }
    };

    performVerification();
  }, [certId]);

  return (
    <div className={`verify-wrapper ${isDark ? 'dark' : ''}`}>
      <div className="verify-card">
        {status === 'loading' && (
          <div className="loading-state">
            <div className="spinner"></div>
            <h3>Vérification sécurisée...</h3>
            <p>Interrogation du registre Global Academy of Skills</p>
          </div>
        )}

        {status === 'valid' && (
          <div className="verification-result fade-in">
            <div className="success-header">
              <div className="icon-seal">
                <ShieldCheck size={40} />
              </div>
              <div className="badge-verified">CERTIFICAT AUTHENTIQUE</div>
            </div>

            <h1 className="main-title">Validation du Diplôme</h1>
            <p className="subtitle">Ce document numérique est certifié conforme par la direction de l'académie.</p>

            <div className="data-grid">
              <div className="data-box">
                <User size={18} color={COLORS.GOLD} />
                <div className="data-content">
                  <label>Titulaire</label>
                  <span>CANDIDAT GAS PREMIUM</span>
                </div>
              </div>

              <div className="data-box">
                <BookOpen size={18} color={COLORS.GOLD} />
                <div className="data-content">
                  <label>Formation</label>
                  <span>EXPERT EN STRATÉGIE DIGITALE</span>
                </div>
              </div>

              <div className="data-box">
                <Calendar size={18} color={COLORS.GOLD} />
                <div className="data-content">
                  <label>Date d'obtention</label>
                  <span>01 JANVIER 2026</span>
                </div>
              </div>

              <div className="data-box">
                <Globe size={18} color={COLORS.GOLD} />
                <div className="data-content">
                  <label>Identifiant unique</label>
                  <span className="id-highlight">{certId}</span>
                </div>
              </div>
            </div>

            <div className="trust-footer">
              <BadgeCheck size={16} />
              <span>Signé numériquement par Global Academy of Skills</span>
            </div>
            
            <button className="btn-print" onClick={() => window.print()}>
              Imprimer une copie conforme
            </button>
          </div>
        )}

        {status === 'invalid' && (
          <div className="verification-result error fade-in">
            <AlertTriangle size={60} color={COLORS.DANGER} />
            <h1 className="error-title">Erreur de vérification</h1>
            <p>Désolé, l'identifiant <strong>{certId}</strong> est introuvable ou a été révoqué.</p>
            <button className="btn-retry" onClick={() => window.location.reload()}>
              Réessayer
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .verify-wrapper { 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 20px;
          background: #f8fafc;
        }
        .dark.verify-wrapper { background: #020617; }

        .verify-card {
          background: white;
          width: 100%;
          max-width: 600px;
          padding: clamp(30px, 5vw, 50px);
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          text-align: center;
          border: 1px solid #f1f5f9;
        }
        .dark .verify-card { background: #0f172a; border-color: rgba(255,255,255,0.05); color: white; }

        .loading-state { padding: 40px 0; }
        .spinner { 
          width: 50px; height: 50px; 
          border: 3px solid #f3f3f3; 
          border-top: 3px solid ${COLORS.GOLD}; 
          border-radius: 50%; 
          animation: spin 1s linear infinite; 
          margin: 0 auto 20px;
        }

        .success-header { margin-bottom: 30px; }
        .icon-seal { 
          background: #ecfdf5; 
          color: ${COLORS.SUCCESS}; 
          width: 80px; height: 80px; 
          border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          margin: 0 auto 15px;
        }
        .badge-verified {
          background: #ecfdf5;
          color: #065f46;
          padding: 6px 16px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        .main-title { font-size: 1.8rem; font-weight: 900; color: ${COLORS.NAVY}; margin-bottom: 10px; }
        .dark .main-title { color: white; }
        .subtitle { color: #64748b; margin-bottom: 35px; }

        .data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          text-align: left;
          margin-bottom: 40px;
        }

        .data-box {
          background: #f8fafc;
          padding: 15px;
          border-radius: 16px;
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .dark .data-box { background: rgba(255,255,255,0.03); }

        .data-content label { display: block; font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
        .data-content span { font-weight: 700; color: ${COLORS.NAVY}; }
        .dark .data-content span { color: #e2e8f0; }
        .id-highlight { color: ${COLORS.GOLD} !important; font-family: monospace; }

        .trust-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 30px;
        }

        .btn-print {
          background: ${COLORS.NAVY};
          color: white;
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-print:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

        .error-title { color: ${COLORS.DANGER}; font-weight: 900; margin-top: 20px; }
        .btn-retry { background: #f1f5f9; border: none; padding: 12px 25px; border-radius: 10px; margin-top: 20px; cursor: pointer; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        @media print {
          .btn-print, .verify-wrapper { background: white !important; }
          .verify-card { box-shadow: none !important; border: 1px solid #eee !important; }
          .btn-print { display: none; }
        }
      `}</style>
    </div>
  );
}