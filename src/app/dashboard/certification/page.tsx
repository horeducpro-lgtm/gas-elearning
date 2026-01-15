"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { 
  Download, Truck, QrCode, MapPin, Sparkles, 
  ArrowLeft, Lock, Award, ShieldCheck, 
  Globe, ExternalLink, ArrowRight
} from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

const GOLD = "#BE9B4B";
const NAVY = "#0a1d37";
const GOLD_GRADIENT = "linear-gradient(135deg, #BE9B4B 0%, #F1D28C 50%, #BE9B4B 100%)";

export default function CertificatesPage() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showForm, setShowForm] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState("CANDIDAT ELITE");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: ""
  });

  const syncAllData = useCallback(() => {
    // 1. Récupération du nom de l'utilisateur
    const savedName = localStorage.getItem('gas_user_name');
    if (savedName) {
      setUserName(savedName.toUpperCase());
      setFormData(prev => ({ ...prev, fullName: savedName }));
    }

    // 2. Calcul de la progression réelle du cours Architecture
    const savedProgress = localStorage.getItem('gas_progress_arch');
    if (savedProgress) {
      const completedSteps = JSON.parse(savedProgress);
      // On base le calcul sur les 9 modules du cours d'architecture
      const totalSteps = 9;
      const calculatedProgress = Math.round((completedSteps.length / totalSteps) * 100);
      
      setProgress(calculatedProgress > 100 ? 100 : calculatedProgress);
      setIsLocked(calculatedProgress < 100);
    } else {
      setProgress(0);
      setIsLocked(true);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    syncAllData();
  }, [syncAllData]);

  const handleGetLocation = () => {
    setLoadingLoc(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            city: data.address.city || data.address.town || "",
            address: data.display_name
          }));
        } catch (e) { console.error("Location Error"); }
        finally { setLoadingLoc(false); }
      });
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const w = 297; const h = 210;
    
    doc.setFillColor(253, 252, 240); doc.rect(0, 0, w, h, 'F');
    doc.setDrawColor(190, 155, 75); doc.setLineWidth(1.5); doc.rect(5, 5, w-10, h-10);
    doc.setDrawColor(190, 155, 75); doc.setLineWidth(0.5); doc.rect(8, 8, w-16, h-16);
    
    doc.setTextColor(10, 29, 55); doc.setFontSize(14); doc.text("GAS ACADEMY • OFFICIAL VERIFIED ACCREDITATION", w/2, 25, { align: "center" });
    doc.setTextColor(190, 155, 75); doc.setFontSize(55); doc.text(userName, w/2, 105, { align: "center" });
    doc.setTextColor(10, 29, 55); doc.setFontSize(22); doc.text("Pour l'excellence académique démontrée en :", w/2, 125, { align: "center" });
    doc.setFont("helvetica", "bold"); doc.text("ARCHITECTURE DURABLE & BIOCLIMATIQUE", w/2, 142, { align: "center" });
    
    doc.setFontSize(9); doc.setTextColor(150, 150, 150);
    doc.text(`VÉRIFICATION ID: GAS-ARC-2026-${Math.random().toString(36).toUpperCase().substring(2, 8)}`, 20, 195);
    doc.save(`Certificat_GAS_ELITE.pdf`);
    confetti({ particleCount: 150, colors: [GOLD, '#FFF'] });
  };

  if (!mounted) return null;

  return (
    <div className={`cert-container ${isDark ? 'is-dark' : 'is-light'}`}>
      {isLocked ? (
        /* ÉCRAN VERROUILLÉ */
        <div className="locked-overlay">
          <div className="glass-card locked-box">
            <div className="lock-icon-wrapper">
              <Lock size={40} color={GOLD} />
            </div>
            <h2>Certification Verrouillée</h2>
            <p>Complétez 100% de votre formation pour débloquer votre accréditation officielle GAS Academy.</p>
            <div className="progress-mini">
               <div className="progress-mini-fill" style={{width: `${progress}%`}} />
               <span>{progress}% complété</span>
            </div>
            <button className="gold-btn-solid" onClick={() => window.location.href='/dashboard/courses/architecture'}>
              CONTINUER L'APPRENTISSAGE
            </button>
          </div>
        </div>
      ) : (
        /* ÉCRAN DÉVERROUILLÉ - CERTIFICAT */
        <div className="cert-main-grid">
          {/* SECTION GAUCHE : INFOS & ACTIONS */}
          <section className="controls-panel">
            <header className="panel-header">
              <div className="badge-elite"><Sparkles size={14} /> CERTIFICATION ÉLITE</div>
              <h1 className="main-h1">Félicitations, <br/>Expert {userName.split(' ')[0]}</h1>
              <p className="p-desc">Votre diplôme est prêt. Il atteste de vos compétences en architecture durable et de votre appartenance au réseau GAS Elite.</p>
            </header>

            <div className="action-stack">
              <div className="premium-option" onClick={generatePDF}>
                <div className="opt-icon"><Download size={22} /></div>
                <div className="opt-content">
                  <h3>Téléchargement Digital HD</h3>
                  <p>Fichier PDF vectoriel prêt pour LinkedIn et impression.</p>
                </div>
                <ExternalLink size={16} className="arrow-hint" />
              </div>

              <div className="premium-option" onClick={() => setShowForm(true)}>
                <div className="opt-icon"><Truck size={22} /></div>
                <div className="opt-content">
                  <h3>Édition Prestige Papier</h3>
                  <p>Papier texturé 300g, dorure à chaud, livraison incluse.</p>
                </div>
                <span className="premium-tag">OFFERT</span>
              </div>
            </div>

            <div className="trust-row">
                <div className="trust-item"><ShieldCheck size={18} color="#10B981" /> Authentifié Blockchain</div>
                <div className="trust-item"><Globe size={18} /> Réseau International</div>
            </div>
          </section>

          {/* SECTION DROITE : PREVIEW 3D + BOUTON REVOIR */}
          <section className="preview-panel">
             <div className="scene" 
                  onMouseMove={e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setMousePos({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
                  }}
                  onMouseLeave={() => setMousePos({x: 0, y: 0})}>
                <div className="cert-3d-card" style={{ transform: `rotateY(${mousePos.x * 20}deg) rotateX(${mousePos.y * -20}deg)` }}>
                   <div className="cert-face">
                      <div className="cert-border">
                         <div className="cert-header">
                            <img src="/gas-logo-gold.png" alt="" className="cert-logo-small" />
                            <span>GAS ACADEMY VERIFIED ACCREDITATION</span>
                         </div>
                         <div className="cert-center">
                            <span className="cert-label">EST DÉCERNÉ À</span>
                            <h2 className="cert-user-name">{userName}</h2>
                            <div className="cert-divider" />
                            <p className="cert-course">Expert en Architecture Durable & Bioclimatique</p>
                         </div>
                         <div className="cert-footer">
                            <QrCode size={50} strokeWidth={1} />
                            <div className="cert-seal">
                               <div className="seal-inner">GAS</div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="cert-shine" style={{ background: `radial-gradient(circle at ${mousePos.x * 100 + 50}% ${mousePos.y * 100 + 50}%, rgba(255,255,255,0.4) 0%, transparent 60%)` }} />
                </div>
             </div>

             {/* BOUTON REVOIR LES MODULES (Integration Style Prestige) */}
             <button className="revoir-modules-btn" onClick={() => window.location.href='/dashboard/courses/architecture'}>
                REVOIR LES MODULES <ArrowRight size={18} />
             </button>
          </section>
        </div>
      )}

      {/* MODAL DE LIVRAISON LUXE */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="glass-card modal-content">
            <button className="close-modal" onClick={() => setShowForm(false)}><ArrowLeft size={18} /> Retour</button>
            <div className="modal-header">
                <h2>Livraison de votre Diplôme</h2>
                <p>Veuillez confirmer l'adresse d'expédition pour votre édition physique.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsOrdered(true); confetti(); setTimeout(() => setShowForm(false), 2000); }} className="order-form">
               <div className="input-group">
                  <label>Nom Complet (pour l'expédition)</label>
                  <input type="text" value={userName} className="locked-input" readOnly />
               </div>
               <div className="input-row">
                  <div className="input-group">
                    <label>Ville</label>
                    <div className="with-action">
                      <input type="text" placeholder="Casablanca" value={formData.city} readOnly />
                      <button type="button" onClick={handleGetLocation} className="geo-btn">{loadingLoc ? "..." : <MapPin size={18} />}</button>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Téléphone</label>
                    <input type="tel" placeholder="+212 600 000 000" required />
                  </div>
               </div>
               <div className="input-group">
                  <label>Adresse de Résidence</label>
                  <textarea placeholder="N°, Rue, Quartier..." rows={3} required />
               </div>
               <button type="submit" className="gold-btn-solid full-width">
                  {isOrdered ? "COMMANDE ENVOYÉE..." : "CONFIRMER L'EXPÉDITION PRESTIGE"}
               </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .cert-container { min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .is-dark { background: #080A0F; color: #E2E8F0; }
        .is-light { background: #F8FAFC; color: #0F172A; }

        .cert-main-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; max-width: 1400px; width: 100%; align-items: center; }

        /* CONTROLS PANEL */
        .badge-elite { background: ${GOLD}20; color: ${GOLD}; padding: 6px 14px; border-radius: 50px; font-size: 11px; font-weight: 900; letter-spacing: 1px; width: fit-content; margin-bottom: 20px; }
        .main-h1 { font-size: 56px; font-weight: 900; line-height: 1.1; margin-bottom: 20px; letter-spacing: -2px; }
        .p-desc { font-size: 17px; opacity: 0.7; line-height: 1.6; margin-bottom: 40px; }

        .action-stack { display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px; }
        .premium-option { 
          display: flex; align-items: center; gap: 20px; padding: 25px; border-radius: 24px;
          background: ${isDark ? 'rgba(255,255,255,0.03)' : '#FFF'};
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
          cursor: pointer; transition: 0.3s; position: relative;
        }
        .premium-option:hover { transform: translateX(12px); border-color: ${GOLD}; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .opt-icon { width: 50px; height: 50px; background: ${GOLD}15; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: ${GOLD}; }
        .opt-content h3 { font-size: 16px; font-weight: 800; margin: 0; }
        .opt-content p { font-size: 13px; opacity: 0.6; margin: 4px 0 0; }
        .premium-tag { position: absolute; right: 25px; top: 25px; background: #10B981; color: white; font-size: 9px; font-weight: 900; padding: 4px 8px; border-radius: 6px; }
        .arrow-hint { opacity: 0.3; margin-left: auto; }

        .trust-row { display: flex; gap: 25px; border-top: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; padding-top: 30px; }
        .trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; opacity: 0.8; }

        /* PREVIEW PANEL & 3D */
        .preview-panel { display: flex; flex-direction: column; align-items: center; }
        .scene { perspective: 1500px; width: 100%; height: 500px; display: flex; align-items: center; justify-content: center; }
        .cert-3d-card { 
          width: 600px; aspect-ratio: 1.41; background: #FDFCF0; border: 12px solid #BE9B4B; border-radius: 4px;
          position: relative; transform-style: preserve-3d; transition: 0.1s linear;
          box-shadow: 0 50px 100px rgba(0,0,0,0.5); padding: 20px;
        }
        .cert-face { border: 1px solid #BE9B4B; height: 100%; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; color: ${NAVY}; }
        .cert-logo-small { height: 30px; margin-bottom: 10px; }
        .cert-header { display: flex; flex-direction: column; align-items: center; gap: 10px; font-weight: 800; font-size: 11px; letter-spacing: 2px; }
        .cert-center { text-align: center; }
        .cert-user-name { font-family: 'Playfair Display', serif; font-size: 48px; color: ${GOLD}; font-style: italic; margin: 15px 0; }
        .cert-divider { width: 80px; height: 2px; background: ${GOLD}; margin: 15px auto; }
        .cert-course { font-size: 18px; font-weight: 700; }
        .cert-footer { display: flex; justify-content: space-between; align-items: flex-end; }
        .cert-seal { width: 80px; height: 80px; border: 2px dashed ${GOLD}; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: rotate(-15deg); }
        .seal-inner { font-weight: 900; font-size: 12px; color: ${GOLD}; border: 1px solid ${GOLD}; padding: 10px; border-radius: 50%; }
        .cert-shine { position: absolute; inset: 0; pointer-events: none; z-index: 5; mix-blend-mode: soft-light; }

        /* BOUTON REVOIR MODULES (IMAGE STYLE) */
        .revoir-modules-btn {
          margin-top: 20px; width: 100%; max-width: 400px; padding: 18px;
          background: ${isDark ? 'rgba(190, 155, 75, 0.1)' : '#FDFCF0'};
          border: 1px solid ${GOLD}40; border-radius: 50px; color: ${GOLD};
          font-weight: 900; font-size: 14px; letter-spacing: 1px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          transition: all 0.3s ease;
        }
        .revoir-modules-btn:hover { background: ${GOLD}; color: white; transform: translateY(-3px); box-shadow: 0 10px 20px ${GOLD}30; }

        /* LOCKED STATE */
        .locked-overlay { max-width: 500px; text-align: center; }
        .glass-card { 
            background: ${isDark ? 'rgba(15,18,25,0.8)' : '#FFF'}; backdrop-filter: blur(20px); 
            padding: 50px; border-radius: 40px; border: 1px solid ${GOLD}30;
            box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }
        .lock-icon-wrapper { width: 80px; height: 80px; background: ${GOLD}15; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; }
        .progress-mini { height: 8px; background: ${isDark ? '#1E293B' : '#F1F5F9'}; border-radius: 10px; margin: 25px 0; position: relative; overflow: hidden; }
        .progress-mini-fill { height: 100%; background: ${GOLD_GRADIENT}; border-radius: 10px; transition: width 1s ease-in-out; }
        .progress-mini span { font-size: 11px; font-weight: 800; color: ${GOLD}; margin-top: 5px; display: block; }

        .gold-btn-solid { 
          width: 100%; background: ${GOLD_GRADIENT}; color: white; border: none; padding: 20px; 
          border-radius: 18px; font-weight: 900; cursor: pointer; transition: 0.3s;
          box-shadow: 0 10px 20px ${GOLD}40;
        }
        .gold-btn-solid:hover { transform: translateY(-3px); box-shadow: 0 15px 30px ${GOLD}60; }
        
        /* MODAL */
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(15px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-content { max-width: 600px; width: 100%; text-align: left; }
        .close-modal { background: none; border: none; color: inherit; display: flex; align-items: center; gap: 8px; font-weight: 800; cursor: pointer; margin-bottom: 25px; opacity: 0.6; }
        
        .order-form { display: flex; flex-direction: column; gap: 20px; margin-top: 30px; }
        .input-group label { display: block; font-size: 12px; font-weight: 800; color: ${GOLD}; margin-bottom: 8px; text-transform: uppercase; }
        .input-group input, .input-group textarea { 
          width: 100%; padding: 16px; border-radius: 14px; 
          background: ${isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC'};
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'};
          color: inherit;
        }
        .locked-input { opacity: 0.5; cursor: not-allowed; border-color: ${GOLD}50 !important; }
        .with-action { display: flex; gap: 10px; }
        .geo-btn { background: ${GOLD}; color: white; border: none; padding: 0 15px; border-radius: 12px; cursor: pointer; }

        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        @media (max-width: 1100px) {
          .cert-main-grid { grid-template-columns: 1fr; gap: 40px; }
          .preview-panel { order: -1; }
          .cert-3d-card { width: 100%; }
          .input-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}