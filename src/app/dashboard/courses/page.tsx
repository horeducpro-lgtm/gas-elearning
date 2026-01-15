"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { 
  Clock, Search, BookOpen, 
  Star, ChevronRight, Sparkles, CheckCircle,
  Filter, Zap
} from 'lucide-react';
import Link from 'next/link';

// CONFIGURATION CORRIGÉE : Le slug doit être "architecture" pour correspondre à ton dossier
const INITIAL_COURSES = [
  {
    id: 1,
    slug: "architecture", // <--- CHANGÉ : correspond maintenant au nom de ton dossier
    title: "Architecture Moderne & Design Durable",
    instructor: "Dr. Elena Rossi",
    duration: "12h 45min",
    level: "Certification Élite",
    progress: 0,
    category: "Design",
    imageColor: "linear-gradient(135deg, #BE9B4B 0%, #161B22 100%)", 
    accentColor: "#BE9B4B"
  },
  {
    id: 2,
    slug: "ia-et-futur",
    title: "IA & Systèmes LMD : Vers le Futur",
    instructor: "Jean-Pierre Tech",
    duration: "18h 20min",
    level: "Avancé",
    progress: 30,
    category: "Technologie",
    imageColor: "linear-gradient(135deg, #7C3AED 0%, #2D1B4E 100%)",
    accentColor: "#7C3AED"
  },
  {
    id: 3,
    slug: "gestion-elite",
    title: "Gestion de Projet Académique Élite",
    instructor: "Marc Aurèle",
    duration: "10h 00min",
    level: "Masterclass",
    progress: 0,
    category: "Management",
    imageColor: "linear-gradient(135deg, #059669 0%, #064E3B 100%)",
    accentColor: "#059669"
  }
];

export default function CoursesPage() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [mounted, setMounted] = useState(false);
  const [userXP, setUserXP] = useState(0);
  
  const GOLD = "#BE9B4B";
  const bgCard = isDark ? "#161B22" : "#FFFFFF";
  const textMain = isDark ? "#F0F6FC" : "#0F172A";
  const textSoft = isDark ? "#8B949E" : "#64748B";
  const borderCard = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  useEffect(() => {
    setMounted(true);
    
    const syncData = () => {
      try {
        const savedXP = localStorage.getItem('gas_user_xp');
        if (savedXP) setUserXP(parseInt(savedXP));

        const globalProgress = localStorage.getItem('gas_academy_progress');
        const progressMap = globalProgress ? JSON.parse(globalProgress) : {};
        
        // Synchronisation spécifique pour le cours d'architecture
        const savedArchi = localStorage.getItem('gas_archi_progress');
        let archiRealProgress = 0;
        if (savedArchi) {
          const completedSteps = JSON.parse(savedArchi).length;
          archiRealProgress = Math.round((completedSteps / 9) * 100);
        }

        setCourses(prev => prev.map(course => {
          if (course.slug === "architecture") {
            return { ...course, progress: archiRealProgress };
          }
          return { 
            ...course, 
            progress: progressMap[course.slug] || course.progress 
          };
        }));
      } catch (e) {
        console.warn("Sync check failed", e);
      }
    };

    syncData();
    window.addEventListener('storage', syncData);
    window.addEventListener('progressUpdated', syncData);
    window.addEventListener('xpUpdated', syncData);

    return () => {
      window.removeEventListener('storage', syncData);
      window.removeEventListener('progressUpdated', syncData);
      window.removeEventListener('xpUpdated', syncData);
    };
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) return null;

  return (
    <div className="courses-container">
      <header className="page-header">
        <div className="header-top-nav">
           <div className="xp-badge">
              <Zap size={14} fill={GOLD} color={GOLD} />
              <span>{userXP.toLocaleString()} XP COLLECTÉS</span>
           </div>
        </div>

        <div className="header-content">
          <div className="title-section">
            <div className="badge-premium">
               <Sparkles size={14} color={GOLD} />
               <span>ACADÉMIE GAS ELITE • 2026</span>
            </div>
            <h1>Cursus d'Excellence</h1>
            <p>Maîtrisez les technologies LMD et le design de demain.</p>
          </div>

          <div className="search-wrapper">
            <Search size={18} color={textSoft} className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher une masterclass..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-label"><BookOpen size={14} /><span>Secteur :</span></div>
          {['Tous', 'Design', 'Technologie', 'Management'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="courses-grid">
        {filteredCourses.map((course) => {
          const isCompleted = course.progress >= 100;
          return (
            <div key={course.id} className="course-card">
              <div className="card-banner" style={{ background: course.imageColor }}>
                <div className="banner-top">
                  <span className="category-tag">{course.category}</span>
                  {isCompleted && (
                    <div className="completed-icon">
                      <CheckCircle color="#22C55E" size={24} fill="white" />
                    </div>
                  )}
                </div>
                <div className="instructor-info">
                  <span className="label">Expert Référent</span>
                  <span className="name">{course.instructor}</span>
                </div>
              </div>

              <div className="card-body">
                <h3>{course.title}</h3>
                <div className="meta-info">
                  <div className="meta-item"><Clock size={14} /> <span>{course.duration}</span></div>
                  <div className="meta-item"><Star size={14} color={GOLD} /> <span>{course.level}</span></div>
                </div>

                <div className="progress-section">
                  <div className="progress-labels">
                    <span className="status-text">{isCompleted ? 'CERTIFICAT DÉBLOQUÉ' : 'COMPLÉTION'}</span>
                    <span className="percent" style={{ color: isCompleted ? '#22C55E' : GOLD }}>{course.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min(course.progress, 100)}%`, 
                        background: isCompleted ? '#22C55E' : GOLD 
                      }} 
                    />
                  </div>
                </div>

                {/* LIEN CORRIGÉ : pointera vers /dashboard/courses/architecture */}
                <Link href={`/dashboard/courses/${course.slug}`} style={{ textDecoration: 'none' }}>
                  <button className={`action-btn ${isCompleted ? 'completed' : ''}`}>
                    <span>{isCompleted ? 'REVOIR LES MODULES' : (course.progress > 0 ? 'REPRENDRE' : 'DÉMARRER')}</span>
                    <ChevronRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          )})}
      </div>

      <style jsx>{`
        .courses-container { width: 100%; max-width: 1400px; margin: 0 auto; padding: 40px 20px; animation: fadeIn 0.5s ease-out; }
        .page-header { margin-bottom: 50px; }
        .header-top-nav { display: flex; justify-content: flex-end; margin-bottom: 20px; }
        .xp-badge { background: ${isDark ? '#1E232D' : '#F1F5F9'}; padding: 10px 18px; border-radius: 30px; display: flex; align-items: center; gap: 10px; font-weight: 900; font-size: 11px; border: 1px solid ${borderCard}; color: ${textMain}; letter-spacing: 0.5px; }
        .header-content { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; flex-wrap: wrap; margin-bottom: 40px; }
        .badge-premium { display: inline-flex; align-items: center; gap: 8px; background: ${GOLD}15; padding: 8px 16px; border-radius: 12px; margin-bottom: 16px; color: ${GOLD}; font-size: 11px; font-weight: 900; letter-spacing: 1px; }
        .title-section h1 { font-size: 48px; font-weight: 950; color: ${textMain}; margin: 0; letter-spacing: -1.5px; }
        .title-section p { color: ${textSoft}; font-size: 18px; margin-top: 10px; font-weight: 500; }
        .search-wrapper { position: relative; width: 100%; max-width: 450px; }
        .search-wrapper input { width: 100%; padding: 18px 20px 18px 55px; border-radius: 24px; border: 1px solid ${borderCard}; background: ${bgCard}; color: ${textMain}; font-weight: 600; transition: 0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .search-wrapper input:focus { border-color: ${GOLD}; outline: none; box-shadow: 0 0 0 4px ${GOLD}15; }
        .search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); }
        .filter-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .filter-label { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 800; color: ${textSoft}; margin-right: 10px; }
        .filter-btn { padding: 10px 24px; border-radius: 14px; border: 1px solid ${borderCard}; background: ${bgCard}; color: ${textSoft}; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .filter-btn:hover { border-color: ${GOLD}; color: ${GOLD}; }
        .filter-btn.active { background: ${GOLD}; color: white; border-color: ${GOLD}; }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 40px; }
        .course-card { background: ${bgCard}; border-radius: 35px; border: 1px solid ${borderCard}; overflow: hidden; transition: 0.4s; display: flex; flex-direction: column; box-shadow: 0 15px 45px rgba(0,0,0,0.07); }
        .course-card:hover { transform: translateY(-10px); border-color: ${GOLD}40; box-shadow: 0 25px 60px rgba(0,0,0,0.12); }
        .card-banner { height: 220px; padding: 35px; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
        .category-tag { background: rgba(0,0,0,0.25); backdrop-filter: blur(10px); color: white; padding: 6px 14px; border-radius: 10px; font-size: 10px; font-weight: 900; text-transform: uppercase; width: fit-content; }
        .instructor-info { color: white; }
        .instructor-info .label { font-size: 10px; opacity: 0.8; font-weight: 800; text-transform: uppercase; }
        .instructor-info .name { font-size: 24px; font-weight: 900; display: block; }
        .card-body { padding: 35px; flex-grow: 1; display: flex; flex-direction: column; }
        .card-body h3 { font-size: 24px; font-weight: 900; color: ${textMain}; margin-bottom: 20px; line-height: 1.2; }
        .meta-info { display: flex; gap: 20px; margin-bottom: 30px; }
        .meta-item { display: flex; align-items: center; gap: 6px; color: ${textSoft}; font-size: 13px; font-weight: 800; }
        .progress-section { margin-bottom: 30px; margin-top: auto; }
        .progress-labels { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .status-text { font-size: 10px; font-weight: 900; color: ${textSoft}; }
        .percent { font-size: 16px; font-weight: 900; }
        .progress-track { height: 8px; background: ${isDark ? '#0B0E14' : '#F1F5F9'}; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 10px; }
        .action-btn { width: 100%; padding: 18px; border-radius: 20px; border: none; background: ${isDark ? '#FFF' : '#0F172A'}; color: ${isDark ? '#000' : '#FFF'}; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        .action-btn:hover { background: ${GOLD}; color: white; }
        .action-btn.completed { background: ${GOLD}10; color: ${GOLD}; border: 1px solid ${GOLD}30; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) { .courses-grid { grid-template-columns: 1fr; } .title-section h1 { font-size: 36px; } }
      `}</style>
    </div>
  );
}