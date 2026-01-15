"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { 
  Play, CheckCircle, Lock, ChevronLeft, 
  Sparkles, Loader2, PlayCircle, Trophy, 
  ArrowRight, ShieldCheck, Target, Award, Users,
  BookOpen, Clock, Zap
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

const GOLD = "#BE9B4B";
const GOLD_GRADIENT = "linear-gradient(135deg, #BE9B4B 0%, #F1D28C 50%, #BE9B4B 100%)";
const DARK_CARD = "rgba(15, 18, 25, 0.8)";

const QCM_DATA: Record<number, { question: string; options: string[]; correct: number }> = {
  1: { question: "Quel est le principe fondamental de l'architecture bioclimatique ?", options: ["L'usage exclusif du béton", "L'orientation selon le soleil", "Le style gothique flamboyant", "L'isolation par l'intérieur uniquement"], correct: 1 },
  3: { question: "En 2026, quel matériau est privilégié pour la durabilité extrême ?", options: ["Le plastique recyclé", "L'acier bas carbone", "Le bois brûlé (Shou Sugi Ban)", "Le verre simple vitrage"], correct: 2 },
  6: { question: "Quelle est la cible de réduction carbone pour le projet final ?", options: ["10%", "50%", "90% (Net Zero)", "Aucune restriction"], correct: 2 }
};

export default function ArchitectureCoursePage() {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [qcmStatus, setQcmStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lessons = [
    { id: 0, title: "01. Vision Stratégique 2026", type: "video", duration: "12:45", xp: 50 },
    { id: 1, title: "02. Quiz : Fondamentaux Bioclimatiques", type: "qcm", duration: "5 min", xp: 100 },
    { id: 2, title: "03. Matériaux & Analyse du Cycle de Vie", type: "video", duration: "18:20", xp: 50 },
    { id: 3, title: "04. Masterclass : Expertise RM", type: "qcm", duration: "8 min", xp: 150 },
    { id: 4, title: "05. Coaching Live : Dr. Archi", type: "webinar", duration: "Direct", xp: 200 },
    { id: 5, title: "06. Ingénierie de la Lumière Naturelle", type: "video", duration: "15:10", xp: 50 },
    { id: 6, title: "07. Examen Final Certifiant", type: "qcm", duration: "15 min", xp: 500 },
    { id: 7, title: "08. Jury : Soutenance Projet", type: "webinar", duration: "Direct", xp: 1000 },
    { id: 8, title: "09. Accréditation GAS ELITE", type: "award", duration: "Instant", xp: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(`gas_progress_arch`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompletedSteps(parsed);
      setCurrentStep(Math.max(...parsed));
    }
    setIsLoaded(true);
  }, []);

  const handleAction = () => {
    if (isLoading || qcmStatus === 'correct') return;
    const currentLesson = lessons[currentStep];
    
    if (currentLesson.type === 'qcm') {
      const data = QCM_DATA[currentStep];
      if (selectedOption === data?.correct) {
        setQcmStatus('correct');
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: [GOLD, '#FFF'] });
        setTimeout(() => unlockNext(), 1000);
      } else {
        setQcmStatus('wrong');
        setTimeout(() => { setQcmStatus('idle'); setSelectedOption(null); }, 800);
      }
      return;
    }
    setIsLoading(true);
    setTimeout(() => { unlockNext(); setIsLoading(false); }, 1500);
  };

  const unlockNext = () => {
    const nextIdx = currentStep + 1;
    if (nextIdx < lessons.length) {
      const newSteps = [...new Set([...completedSteps, nextIdx])];
      setCompletedSteps(newSteps);
      setCurrentStep(nextIdx);
      localStorage.setItem(`gas_progress_arch`, JSON.stringify(newSteps));
      setSelectedOption(null);
      setQcmStatus('idle');
    }
  };

  if (!isLoaded) return null;
  const progressPercent = Math.round((completedSteps.length / lessons.length) * 100);

  return (
    <div className="course-wrapper">
      {/* HEADER ULTRA-LUMINEUX (FUSION COURSERA/UDEMY) */}
      <nav className="top-nav">
        <div className="nav-left">
          <Link href="/dashboard" className="back-btn">
            <ChevronLeft size={20} />
            <div className="back-text">
              <span className="back-label">RETOUR</span>
              <span className="back-sub">Tableau de Bord</span>
            </div>
          </Link>
        </div>

        <div className="nav-center">
          <div className="course-badge">PARCOURS CERTIFIANT</div>
          <h2 className="main-title">Architecture Durable & Design Bioclimatique</h2>
        </div>

        <div className="nav-right">
          <div className="global-progress">
            <div className="progress-info">
              <span>PROGRESSION</span>
              <span className="gold-text">{progressPercent}%</span>
            </div>
            <div className="bar-bg"><div className="bar-fill" style={{ width: `${progressPercent}%` }} /></div>
          </div>
        </div>
      </nav>

      <div className="layout-grid">
        {/* LECTEUR ET CONTENU (UX IMMERSIVE) */}
        <main className="content-container">
          <div className="viewport-card">
            <div className="viewport-header">
              <div className="meta-tags">
                <span className="tag-xp"><Zap size={12} /> +{lessons[currentStep].xp} XP</span>
                <span className="tag-time"><Clock size={12} /> {lessons[currentStep].duration}</span>
              </div>
              <h1 className="active-lesson-title">{lessons[currentStep].title}</h1>
            </div>

            <div className="media-box">
              {lessons[currentStep].type === 'video' || lessons[currentStep].type === 'webinar' ? (
                <div className="elite-player" onClick={handleAction}>
                  <div className="player-inner">
                    <div className="play-circle">
                      {isLoading ? <Loader2 className="spin" size={40} /> : <Play fill={GOLD} size={30} style={{marginLeft: 4}} />}
                    </div>
                    <div className="player-text">
                      <h3>{lessons[currentStep].type === 'webinar' ? "ACCÉDER AU DIRECT" : "DÉMARRER LA LEÇON"}</h3>
                      <p>Module haute définition • Audio Spatial activé</p>
                    </div>
                  </div>
                  <div className="animated-border" />
                </div>
              ) : lessons[currentStep].type === 'qcm' ? (
                <div className="quiz-container">
                   <div className="quiz-intro">
                      <Target color={GOLD} size={40} />
                      <h3>Évaluation de palier</h3>
                      <p className="question-text">{QCM_DATA[currentStep]?.question}</p>
                   </div>
                   <div className="options-grid">
                      {QCM_DATA[currentStep]?.options.map((opt, i) => (
                        <button key={i} onClick={() => setSelectedOption(i)}
                          className={`quiz-opt ${selectedOption === i ? 'selected' : ''} ${qcmStatus === 'correct' && selectedOption === i ? 'is-correct' : ''} ${qcmStatus === 'wrong' && selectedOption === i ? 'is-wrong' : ''}`}>
                          <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                          <span className="opt-val">{opt}</span>
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="certification-zone">
                  <div className="award-glow" />
                  <Trophy size={120} className="trophy-anim" />
                  <h2 className="congrats-title">Expertise Validée</h2>
                  <p>Votre certification "GAS Elite Architecture" est prête à être générée.</p>
                  <button className="gold-action-btn"><Award size={22} /> OBTENIR MON DIPLÔME</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="content-footer">
             <div className="footer-card">
                <BookOpen size={20} color={GOLD} />
                <div>
                   <h4>Ressources du module</h4>
                   <p>Téléchargez les fiches techniques et le PDF du cours.</p>
                </div>
                <button className="download-btn">TÉLÉCHARGER (4.2 MB)</button>
             </div>
          </div>
        </main>

        {/* SIDEBAR (UX UDEMY : LISTE SCROLLABLE ET CLAIRE) */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <h3>Sommaire du Module</h3>
            <div className="curriculum-stats">
               <span>{lessons.length} Étapes</span>
               <span className="dot">•</span>
               <span>2h 45m au total</span>
            </div>
          </div>

          <div className="lesson-list">
            {lessons.map((lesson, index) => {
              const isLocked = !completedSteps.includes(index);
              const isActive = currentStep === index;
              const isDone = completedSteps.includes(index) && !isActive;

              return (
                <div key={index} className={`lesson-card ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => !isLocked && setCurrentStep(index)}>
                  <div className="lesson-status">
                    {isLocked ? <Lock size={14} /> : isDone ? <CheckCircle size={18} className="done-icon" /> : <div className="active-dot" />}
                  </div>
                  <div className="lesson-detail">
                    <span className="l-title">{lesson.title}</span>
                    <div className="l-meta">
                       <span className={`l-type ${lesson.type}`}>{lesson.type}</span>
                       <span className="l-time">{lesson.duration}</span>
                    </div>
                  </div>
                  {isActive && <div className="glow-indicator" />}
                </div>
              );
            })}
          </div>

          <div className="sidebar-action">
             <button className="main-step-btn" onClick={handleAction} 
                disabled={isLoading || (lessons[currentStep].type === 'qcm' && selectedOption === null)}>
                {isLoading ? <Loader2 className="spin" /> : <Sparkles size={20} />}
                <span>{currentStep === lessons.length - 1 ? "VOIR LE DIPLÔME" : "VALIDER L'ÉTAPE"}</span>
                <ArrowRight size={18} />
             </button>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .course-wrapper { 
          min-height: 100vh; 
          background: ${isDark ? '#05070A' : '#F8FAFC'}; 
          color: ${isDark ? '#F1F5F9' : '#0F172A'};
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 20px;
        }

        /* TOP NAVIGATION */
        .top-nav {
          display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center;
          padding: 15px 30px; background: ${isDark ? DARK_CARD : '#FFF'};
          backdrop-filter: blur(20px); border-radius: 24px;
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .back-btn { display: flex; align-items: center; gap: 15px; text-decoration: none; color: inherit; transition: 0.3s; }
        .back-btn:hover { color: ${GOLD}; transform: translateX(-5px); }
        .back-label { display: block; font-size: 10px; font-weight: 800; color: ${GOLD}; }
        .back-sub { font-size: 13px; font-weight: 700; opacity: 0.6; }

        .main-title { font-size: 18px; font-weight: 900; letter-spacing: -0.5px; margin: 0; text-align: center; }
        .course-badge { font-size: 9px; font-weight: 900; color: ${GOLD}; border: 1px solid ${GOLD}50; padding: 2px 10px; border-radius: 50px; width: fit-content; margin: 0 auto 5px; letter-spacing: 1px; }

        .progress-info { display: flex; justify-content: space-between; font-size: 10px; font-weight: 900; margin-bottom: 8px; }
        .bar-bg { height: 6px; background: ${isDark ? '#1E293B' : '#E2E8F0'}; border-radius: 10px; overflow: hidden; }
        .bar-fill { height: 100%; background: ${GOLD_GRADIENT}; transition: 1.2s cubic-bezier(0.22, 1, 0.36, 1); }

        /* MAIN GRID */
        .layout-grid { display: grid; grid-template-columns: 1fr 400px; gap: 25px; max-width: 1700px; margin: 0 auto; }

        /* VIEWPORT */
        .viewport-card { 
          background: ${isDark ? DARK_CARD : '#FFF'}; border-radius: 32px; 
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }
        .viewport-header { padding: 40px 50px 20px; }
        .meta-tags { display: flex; gap: 12px; margin-bottom: 15px; }
        .tag-xp { background: ${GOLD}20; color: ${GOLD}; padding: 6px 12px; border-radius: 12px; font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
        .tag-time { background: rgba(255,255,255,0.05); padding: 6px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 6px; }
        .active-lesson-title { font-size: 42px; font-weight: 900; margin: 0; letter-spacing: -1.5px; line-height: 1.1; }

        .media-box { padding: 0 50px 50px; }
        .elite-player { 
          aspect-ratio: 16/9; background: #000; border-radius: 24px; 
          position: relative; display: flex; align-items: center; justify-content: center;
          cursor: pointer; overflow: hidden;
        }
        .player-inner { z-index: 2; text-align: center; }
        .play-circle { 
          width: 90px; height: 90px; background: #FFF; border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
          box-shadow: 0 0 40px rgba(255,255,255,0.3); transition: 0.4s;
        }
        .elite-player:hover .play-circle { transform: scale(1.1); background: ${GOLD}; }
        .elite-player:hover .play-circle :global(svg) { fill: white; }
        .player-text h3 { color: white; font-weight: 900; letter-spacing: 2px; margin: 0; }
        .player-text p { color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 5px; }

        /* QUIZ */
        .quiz-container { padding: 20px 0; }
        .quiz-intro { text-align: center; margin-bottom: 40px; }
        .question-text { font-size: 22px; font-weight: 700; margin-top: 15px; max-width: 600px; margin-inline: auto; }
        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .quiz-opt { 
          background: ${isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9'}; 
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'transparent'};
          padding: 25px; border-radius: 20px; display: flex; align-items: center; gap: 20px;
          cursor: pointer; transition: 0.2s; color: inherit; text-align: left;
        }
        .quiz-opt:hover { transform: translateY(-3px); background: ${isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'}; }
        .quiz-opt.selected { border-color: ${GOLD}; background: ${GOLD}10; }
        .quiz-opt.is-correct { border-color: #10B981; background: #10B98115; }
        .quiz-opt.is-wrong { border-color: #EF4444; background: #EF444415; }
        .opt-letter { width: 40px; height: 40px; background: ${isDark ? '#000' : '#FFF'}; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: ${GOLD}; }

        /* FOOTER & SIDEBAR */
        .content-footer { margin-top: 25px; }
        .footer-card { 
           display: flex; align-items: center; gap: 20px; padding: 25px 40px;
           background: ${GOLD}10; border-radius: 24px; border: 1px solid ${GOLD}20;
        }
        .footer-card h4 { margin: 0; font-weight: 800; }
        .footer-card p { margin: 2px 0 0; font-size: 13px; opacity: 0.7; }
        .download-btn { margin-left: auto; padding: 12px 20px; border-radius: 12px; border: none; background: #000; color: #FFF; font-weight: 800; font-size: 11px; cursor: pointer; transition: 0.3s; }
        .download-btn:hover { background: ${GOLD}; }

        .sidebar { 
          background: ${isDark ? DARK_CARD : '#FFF'}; border-radius: 32px; padding: 30px; 
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          display: flex; flex-direction: column; height: calc(100vh - 160px); position: sticky; top: 120px;
        }
        .sidebar-top h3 { margin: 0; font-weight: 900; font-size: 20px; }
        .curriculum-stats { font-size: 12px; font-weight: 700; opacity: 0.5; margin-top: 5px; display: flex; gap: 10px; }
        
        .lesson-list { flex: 1; overflow-y: auto; margin: 25px -10px; padding: 0 10px; }
        .lesson-card { 
          display: flex; align-items: center; gap: 15px; padding: 18px; 
          border-radius: 20px; cursor: pointer; margin-bottom: 8px; transition: 0.3s;
          position: relative;
        }
        .lesson-card:hover:not(.locked) { background: ${isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9'}; }
        .lesson-card.active { background: ${GOLD}15; }
        .lesson-card.locked { opacity: 0.3; cursor: not-allowed; grayscale: 1; }
        .lesson-status { width: 24px; display: flex; justify-content: center; }
        .done-icon { color: #10B981; }
        .active-dot { width: 8px; height: 8px; background: ${GOLD}; border-radius: 50%; box-shadow: 0 0 10px ${GOLD}; }
        
        .l-title { display: block; font-size: 13px; font-weight: 700; line-height: 1.3; }
        .l-meta { display: flex; gap: 10px; margin-top: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        .l-type { color: ${GOLD}; }
        .l-time { opacity: 0.4; }
        .glow-indicator { position: absolute; left: 0; top: 20%; height: 60%; width: 4px; background: ${GOLD}; border-radius: 0 4px 4px 0; }

        .main-step-btn { 
          width: 100%; padding: 22px; border-radius: 20px; border: none;
          background: ${GOLD_GRADIENT}; color: white; font-weight: 900;
          display: flex; align-items: center; justify-content: center; gap: 15px;
          cursor: pointer; transition: 0.4s; box-shadow: 0 15px 30px ${GOLD}30;
        }
        .main-step-btn:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 20px 40px ${GOLD}50; }
        .main-step-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .trophy-anim { color: ${GOLD}; filter: drop-shadow(0 0 30px ${GOLD}60); animation: float 4s infinite ease-in-out; }
        .gold-action-btn { background: ${GOLD_GRADIENT}; color: white; border: none; padding: 20px 40px; border-radius: 15px; font-weight: 900; cursor: pointer; display: flex; gap: 12px; margin: 40px auto 0; transition: 0.3s; }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </div>
  );
}