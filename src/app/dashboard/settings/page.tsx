"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Shield, Save, CheckCircle2, ChevronLeft, CreditCard, Layout, 
  Moon, Sun, Sparkles, Mail, Zap, ShieldCheck, Key, 
  Crown, Receipt, ArrowUpRight, Loader2, Eye, EyeOff, LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from "@/context/ThemeContext";

export default function SettingsElitePage() {
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // --- UI STATES ---
  const [activeTab, setActiveTab] = useState("profil");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- DATA STATES ---
  const [profileData, setProfileData] = useState({
    name: "",
    email: "ahmed.b@example.com",
    phone: "+212 6 00 00 00 00",
    job: "Administrateur"
  });
  
  const [accentColor, setAccentColor] = useState("#BE9B4B");
  const [passwordData, setPasswordData] = useState({ current: "", next: "" });
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    updates: true,
    twoFactor: true,
    marketing: false,
  });

  // --- INITIALISATION & PERSISTENCE ---
  useEffect(() => {
    setMounted(true);
    
    // Récupération des données depuis le localStorage
    const savedName = localStorage.getItem('gas_user_name') || "Ahmed Bennani";
    const savedAccent = localStorage.getItem('gas_accent_color') || "#BE9B4B";
    const savedSettings = localStorage.getItem('gas_user_settings');
    const savedJob = localStorage.getItem('gas_user_job') || "Administrateur";
    
    setProfileData(prev => ({ ...prev, name: savedName, job: savedJob }));
    setAccentColor(savedAccent);
    
    if (savedSettings) {
      try { 
        setSettings(JSON.parse(savedSettings)); 
      } catch (e) { 
        console.error("Erreur parsing settings:", e); 
      }
    }

    // Simulation du chargement des factures (API)
    const timer = setTimeout(() => {
      setInvoices([
        { id: 1, date: "01 Jan 2026", amount: "49.00 €", ref: "INV-001", status: "Payé" },
        { id: 2, date: "01 Déc 2025", amount: "49.00 €", ref: "INV-098", status: "Payé" },
        { id: 3, date: "01 Nov 2025", amount: "49.00 €", ref: "INV-084", status: "Payé" }
      ]);
      setLoadingInvoices(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // --- LOGIQUE DE SAUVEGARDE GLOBALE ---
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulation délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      localStorage.setItem('gas_user_name', profileData.name);
      localStorage.setItem('gas_user_job', profileData.job);
      localStorage.setItem('gas_accent_color', accentColor);
      localStorage.setItem('gas_user_settings', JSON.stringify(settings));
      
      // Dispatch event pour mettre à jour les autres composants (ex: TopBar)
      window.dispatchEvent(new Event('storage'));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // --- LOGIQUE MOT DE PASSE (Ajoutée sans toucher au design) ---
  const handleUpdatePassword = async () => {
    if(!passwordData.current || !passwordData.next) {
        alert("Veuillez remplir les deux champs de mot de passe.");
        return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPasswordData({ current: "", next: "" }); // Reset des champs
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // --- HANDLERS ---
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!mounted) return null;

  // Variables CSS dynamiques injectées pour le thème et l'accentuation
  const themeStyles = {
    "--bg-glass": isDark ? "rgba(17, 21, 28, 0.7)" : "rgba(255, 255, 255, 0.8)",
    "--body-bg": isDark ? "#080A0F" : "#F8FAFC",
    "--card-border": isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    "--text": isDark ? "#F0F6FC" : "#0F172A",
    "--text-secondary": isDark ? "#8B949E" : "#64748B",
    "--input-bg": isDark ? "rgba(0,0,0,0.2)" : "#F1F5F9",
    "--accent": accentColor,
    "--accent-soft": `${accentColor}15`,
    "--accent-glow": `${accentColor}40`,
  };

  return (
    <div className="settings-elite-wrapper" style={themeStyles}>
      <div className="background-glow"></div>
      
      <div className="container">
        {/* --- HEADER --- */}
        <header className="settings-header">
          <button onClick={() => router.back()} className="back-btn-modern">
            <div className="icon-box"><ChevronLeft size={20} /></div>
            <span>Retour</span>
          </button>
          
          <div className="header-center">
            <div className="badge-status">
                <Sparkles size={10} className="sparkle-icon" /> 
                <span>SETTINGS PRO</span>
            </div>
            <h2>Paramètres</h2>
          </div>

          <div className="header-actions">
             <div className="user-mini-profile">
                {/* L'AVATAR SE MET À JOUR EN TEMPS RÉEL ICI */}
                <div className="avatar-small" style={{ backgroundColor: accentColor }}>
                  {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
                </div>
             </div>
          </div>
        </header>

        <div className="settings-layout">
          {/* --- SIDEBAR --- */}
          <aside className="settings-sidebar">
            <nav className="nav-group glass-panel">
              {[
                { id: "profil", label: "Mon Profil", icon: <User size={18} /> },
                { id: "interface", label: "Apparence", icon: <Layout size={18} /> },
                { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
                { id: "securite", label: "Sécurité", icon: <Shield size={18} /> },
                { id: "facturation", label: "Abonnement", icon: <CreditCard size={18} /> },
              ].map((item) => (
                <button 
                  key={item.id} 
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="nav-icon-box">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {activeTab === item.id && <div className="active-indicator" />}
                </button>
              ))}
            </nav>
            
            <div className="sidebar-footer">
              <p>v3.0.0 Stable</p>
              <button className="btn-logout" onClick={() => router.push('/login')}>
                <LogOut size={14} /> Déconnexion
              </button>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="settings-content glass-panel">
            <div className="content-scroll-area animate-fade" key={activeTab}>
              
              {/* 1. PROFIL */}
              {activeTab === "profil" && (
                <section>
                  <div className="section-header">
                    <h3>Informations Personnelles</h3>
                    <p>Mettez à jour vos coordonnées publiques.</p>
                  </div>
                  
                  <div className="grid-2-col">
                    <div className="input-group">
                      <label>NOM COMPLET</label>
                      <div className="input-wrapper">
                        <User className="input-icon" size={18} />
                        <input name="name" type="text" value={profileData.name} onChange={handleProfileChange} placeholder="Votre nom" />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>EMAIL</label>
                      <div className="input-wrapper">
                        <Mail className="input-icon" size={18} />
                        <input name="email" type="email" value={profileData.email} onChange={handleProfileChange} placeholder="email@exemple.com" />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>FONCTION</label>
                      <div className="input-wrapper">
                        <Crown className="input-icon" size={18} />
                        <input name="job" type="text" value={profileData.job} onChange={handleProfileChange} placeholder="Votre poste" />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>TÉLÉPHONE</label>
                      <div className="input-wrapper">
                        <Zap className="input-icon" size={18} />
                        <input name="phone" type="text" value={profileData.phone} onChange={handleProfileChange} placeholder="+212..." />
                      </div>
                    </div>
                  </div>

                  <div className="divider" />
                  <div className="info-banner">
                    <ShieldCheck size={18} />
                    <span>Ces informations sont visibles par votre équipe.</span>
                  </div>
                </section>
              )}

              {/* 2. INTERFACE */}
              {activeTab === "interface" && (
                <section>
                  <div className="section-header">
                    <h3>Personnalisation</h3>
                    <p>Adaptez l'interface à votre goût.</p>
                  </div>
                  
                  <div className="setting-card">
                    <div className="card-info">
                      <span className="card-title">Mode Sombre</span>
                      <span className="card-desc">Basculez entre le thème clair et sombre.</span>
                    </div>
                    <button className={`theme-switch ${isDark ? 'dark' : 'light'}`} onClick={toggleTheme}>
                      <div className="switch-knob">
                        {isDark ? <Moon size={12} fill="white" /> : <Sun size={12} fill="white" />}
                      </div>
                    </button>
                  </div>
                  
                  <div className="setting-card column">
                    <div className="card-info full">
                      <span className="card-title">Couleur d'Accentuation</span>
                      <span className="card-desc">Couleur principale de votre dashboard.</span>
                    </div>
                    <div className="color-grid">
                      {["#BE9B4B", "#3B82F6", "#EC4899", "#10B981", "#8B5CF6", "#F97316", "#6366f1"].map(color => (
                        <button 
                          key={color} 
                          onClick={() => setAccentColor(color)} 
                          className={`color-dot ${accentColor === color ? 'selected' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* 3. NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <section>
                  <div className="section-header">
                    <h3>Notifications</h3>
                    <p>Choisissez comment nous vous contactons.</p>
                  </div>
                  <div className="stack-vertical">
                    {[
                      { id: 'email', label: 'Rapports par Email', desc: 'Recevez vos stats hebdo.', icon: <Mail size={18} /> },
                      { id: 'push', label: 'Notifications Push', desc: 'Alertes en temps réel.', icon: <Zap size={18} /> },
                      { id: 'marketing', label: 'Nouveautés', desc: 'Mises à jour produit.', icon: <Sparkles size={18} /> },
                    ].map((item) => (
                      <div key={item.id} className="setting-card clickable" onClick={() => toggleSetting(item.id)}>
                        <div className="card-flex">
                          <div className="icon-badge">{item.icon}</div>
                          <div>
                             <div className="card-title">{item.label}</div>
                             <div className="card-desc">{item.desc}</div>
                          </div>
                        </div>
                        <div className={`toggle-switch ${settings[item.id] ? 'active' : ''}`}>
                            <div className="toggle-knob" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. SÉCURITÉ */}
              {activeTab === "securite" && (
                <section>
                  <div className="section-header">
                     <h3>Sécurité</h3>
                     <p>Gérez vos accès et mot de passe.</p>
                  </div>

                  <div className="security-box">
                    <label className="label-upper">CHANGEMENT DE MOT DE PASSE</label>
                    <div className="password-stack" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px', marginBottom: '15px' }}>
                      <div className="input-wrapper">
                          <Key className="input-icon" size={16} />
                          <input 
                              type="password" 
                              placeholder="Mot de passe actuel" 
                              value={passwordData.current}
                              onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                          />
                      </div>
                      
                      <div className="input-wrapper">
                          <Key className="input-icon" size={16} />
                          <input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Nouveau mot de passe" 
                              className="input-with-action"
                              value={passwordData.next}
                              onChange={(e) => setPasswordData({...passwordData, next: e.target.value})}
                          />
                           <button className="input-action-btn" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                           </button>
                      </div>
                    </div>
                    {/* APPEL À LA FONCTION DE MISE À JOUR MOT DE PASSE DÉDIÉE */}
                    <button className="btn-save" style={{ width: '100%', justifyContent: 'center' }} onClick={handleUpdatePassword}>Mettre à jour</button>
                  </div>

                  <div className="divider"></div>
                  
                  <div className="setting-card clickable" onClick={() => toggleSetting('twoFactor')}>
                    <div className="card-info">
                      <span className="card-title">Authentification 2FA</span>
                      <span className="card-desc">Code SMS à la connexion.</span>
                    </div>
                    <div className={`toggle-switch ${settings.twoFactor ? 'active' : ''}`}>
                       <div className="toggle-knob" />
                    </div>
                  </div>
                </section>
              )}

              {/* 5. FACTURATION */}
              {activeTab === "facturation" && (
                <section>
                    <div className="section-header">
                      <h3>Mon Abonnement</h3>
                      <p>Plan Elite actif.</p>
                    </div>
                    
                    <div className="credit-card-premium" style={{ background: `linear-gradient(135deg, ${accentColor}, #0f172a)` }}>
                      <div className="noise-overlay"></div>
                      <div className="cc-top">
                        <Crown size={24} className="gold-icon" />
                        <span className="cc-brand">ELITE</span>
                      </div>
                      <div className="cc-number">•••• •••• •••• 8842</div>
                      <div className="cc-bottom">
                        <div>
                          <label>TITULAIRE</label>
                          <span>{profileData.name.toUpperCase() || "MEMBER"}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <label>EXP</label>
                          <span>12/28</span>
                        </div>
                      </div>
                    </div>

                    <div className="invoices-section">
                      <label className="label-upper">DERNIÈRES FACTURES</label>
                      {loadingInvoices ? (
                          <div className="loader-box" style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                            <Loader2 className="spin" size={24} />
                          </div>
                      ) : (
                        <div className="invoice-list">
                          {invoices.map((inv) => (
                              <div key={inv.id} className="invoice-row">
                                <div className="inv-left">
                                  <div className="inv-icon"><Receipt size={16} /></div>
                                  <div>
                                    <div className="inv-ref">{inv.ref}</div>
                                    <div className="inv-date">{inv.date}</div>
                                  </div>
                                </div>
                                <div className="inv-right">
                                  <span className="inv-amount">{inv.amount}</span>
                                  <button className="btn-icon-soft"><ArrowUpRight size={14} /></button>
                                </div>
                              </div>
                          ))}
                        </div>
                      )}
                    </div>
                </section>
              )}

            </div>

            {/* FOOTER FIXE */}
            <div className="settings-footer">
              <button 
                className={`btn-save ${isSaving ? 'loading' : ''}`} 
                onClick={handleSave} 
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
                <span>Enregistrer les modifications</span>
              </button>
              
              {showSuccess && (
                <div className="toast-success">
                  <CheckCircle2 size={16} /> <span>Modifications enregistrées</span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .settings-elite-wrapper {
          background-color: var(--body-bg);
          min-height: 100vh;
          color: var(--text);
          font-family: 'Inter', -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
          transition: background-color 0.4s ease;
        }

        .background-glow {
          position: absolute; top: -20%; right: -10%; width: 800px; height: 800px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          filter: blur(80px); pointer-events: none; z-index: 0; opacity: 0.6;
        }

        .container {
          max-width: 1100px; margin: 0 auto; padding: 40px 20px;
          position: relative; z-index: 1; height: 100vh; display: flex; flex-direction: column;
        }

        .settings-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 25px; flex-shrink: 0;
        }
        .header-center { text-align: center; }
        .header-center h2 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
        
        .badge-status {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 800; letter-spacing: 1.5px;
          color: var(--accent); background: var(--accent-soft);
          padding: 4px 12px; border-radius: 20px; margin-bottom: 5px;
        }

        .back-btn-modern {
          display: flex; align-items: center; gap: 10px; background: none; border: none;
          color: var(--text-secondary); cursor: pointer; font-weight: 600; font-size: 14px;
          transition: color 0.2s; padding: 0;
        }
        .back-btn-modern:hover { color: var(--text); }
        
        .avatar-small {
          width: 36px; height: 36px; border-radius: 10px; color: white;
          display: flex; align-items: center; justify-content: center; font-weight: 700;
          box-shadow: 0 4px 10px var(--accent-glow);
        }

        .settings-layout {
          display: grid; grid-template-columns: 260px 1fr; gap: 30px;
          flex: 1; min-height: 0;
        }

        .settings-sidebar {
            display: flex; flex-direction: column; justify-content: space-between;
        }
        
        .glass-panel {
          background: var(--bg-glass);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.02);
        }

        .nav-group {
          padding: 16px; display: flex; flex-direction: column; gap: 6px;
        }

        .nav-item {
          display: flex; align-items: center; gap: 14px; padding: 12px 16px; width: 100%;
          background: transparent; border: none; border-radius: 14px;
          color: var(--text-secondary); cursor: pointer; transition: all 0.2s;
          position: relative; font-weight: 500; font-size: 14px; text-align: left;
        }
        .nav-item:hover { background: var(--card-border); color: var(--text); }
        .nav-item.active { background: var(--accent); color: white; font-weight: 600; box-shadow: 0 4px 12px var(--accent-glow); }
        
        .nav-icon-box { display: flex; align-items: center; justify-content: center; width: 20px; }

        .sidebar-footer {
            padding: 20px; text-align: center; color: var(--text-secondary);
        }
        .sidebar-footer p { font-size: 11px; margin-bottom: 10px; opacity: 0.5; }
        .btn-logout {
            display: flex; align-items: center; gap: 8px; margin: 0 auto;
            background: none; border: none; color: var(--text-secondary);
            font-size: 12px; cursor: pointer; transition: 0.2s;
        }
        .btn-logout:hover { color: #ef4444; }

        .settings-content {
          display: flex; flex-direction: column; overflow: hidden; position: relative;
        }
        
        .content-scroll-area {
          flex: 1; overflow-y: auto; padding: 40px;
          scrollbar-width: thin;
          scrollbar-color: var(--card-border) transparent;
        }
        .content-scroll-area::-webkit-scrollbar { width: 4px; }
        .content-scroll-area::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 4px; }

        .section-header { margin-bottom: 30px; }
        .section-header h3 { font-size: 20px; margin: 0 0 6px 0; font-weight: 700; }
        .section-header p { font-size: 13px; color: var(--text-secondary); margin: 0; }

        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label, .label-upper {
          font-size: 10px; font-weight: 800; letter-spacing: 0.8px; 
          color: var(--text-secondary); text-transform: uppercase;
        }

        .input-wrapper { position: relative; width: 100%; }
        .input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--text-secondary); pointer-events: none; z-index: 2;
        }
        
        .input-wrapper input {
          width: 100%; background: var(--input-bg); border: 1px solid transparent;
          padding: 12px 16px 12px 42px; border-radius: 12px;
          color: var(--text); font-size: 14px; font-weight: 500;
          transition: all 0.2s; outline: none;
        }
        .input-wrapper input:focus {
          background: var(--bg-glass); border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
        
        .input-with-action { padding-right: 40px !important; }
        .input-action-btn {
            position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
            background: none; border: none; color: var(--text-secondary); cursor: pointer;
            padding: 4px; display: flex;
        }
        .input-action-btn:hover { color: var(--text); }

        .divider { height: 1px; background: var(--card-border); margin: 30px 0; width: 100%; }
        
        .info-banner {
          background: rgba(59, 130, 246, 0.1); color: #3B82F6;
          padding: 12px 16px; border-radius: 12px; font-size: 13px;
          display: flex; gap: 10px; align-items: center; font-weight: 500;
        }

        .setting-card {
            display: flex; justify-content: space-between; align-items: center;
            padding: 20px; background: rgba(125,125,125,0.03); border: 1px solid var(--card-border);
            border-radius: 16px; margin-bottom: 12px; transition: 0.2s;
        }
        .setting-card.column { flex-direction: column; align-items: flex-start; gap: 16px; }
        .setting-card.clickable:hover { border-color: var(--accent); transform: translateY(-1px); }

        .card-flex { display: flex; align-items: center; gap: 15px; }
        .icon-badge {
            width: 40px; height: 40px; border-radius: 10px; background: var(--body-bg);
            color: var(--accent); display: flex; align-items: center; justify-content: center;
        }
        .card-title { display: block; font-weight: 600; font-size: 14px; margin-bottom: 2px; }
        .card-desc { display: block; font-size: 12px; color: var(--text-secondary); }

        .theme-switch, .toggle-switch {
            width: 48px; height: 26px; border-radius: 50px; position: relative;
            background: var(--card-border); border: none; cursor: pointer; transition: 0.3s;
        }
        .theme-switch.dark, .toggle-switch.active { background: var(--accent); }
        .switch-knob, .toggle-knob {
            width: 20px; height: 20px; background: white; border-radius: 50%;
            position: absolute; top: 3px; left: 3px; transition: 0.3s cubic-bezier(0.3, 1.5, 0.7, 1);
            display: flex; align-items: center; justify-content: center;
        }
        .theme-switch.dark .switch-knob, .toggle-switch.active .toggle-knob { transform: translateX(22px); }

        .color-grid { display: flex; gap: 10px; flex-wrap: wrap; }
        .color-dot {
            width: 30px; height: 30px; border-radius: 50%; border: 2px solid transparent;
            cursor: pointer; transition: 0.2s;
        }
        .color-dot.selected { border-color: var(--text); transform: scale(1.1); }

        .credit-card-premium {
            border-radius: 20px; padding: 25px; color: white; height: 180px;
            display: flex; flex-direction: column; justify-content: space-between;
            position: relative; overflow: hidden; box-shadow: 0 15px 35px -5px rgba(0,0,0,0.3);
            margin-bottom: 30px;
        }
        .noise-overlay {
            position: absolute; inset: 0; opacity: 0.1; 
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .cc-top { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; }
        .cc-brand { font-weight: 900; letter-spacing: 2px; font-size: 12px; opacity: 0.8; }
        .cc-number { font-family: monospace; font-size: 20px; letter-spacing: 3px; position: relative; z-index: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .cc-bottom { display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 1px; position: relative; z-index: 1; }
        .cc-bottom label { display: block; opacity: 0.7; margin-bottom: 2px; }
        .cc-bottom span { font-weight: 700; font-size: 12px; }

        .invoice-row {
            display: flex; justify-content: space-between; align-items: center;
            padding: 16px 0; border-bottom: 1px solid var(--card-border);
        }
        .inv-left { display: flex; gap: 12px; align-items: center; }
        .inv-icon { 
            width: 32px; height: 32px; background: var(--card-border); 
            border-radius: 8px; display: flex; align-items: center; justify-content: center; 
        }
        .inv-ref { font-weight: 600; font-size: 13px; }
        .inv-date { font-size: 11px; color: var(--text-secondary); }
        .inv-right { display: flex; align-items: center; gap: 10px; }
        .inv-amount { font-weight: 700; font-size: 13px; }
        .btn-icon-soft { 
            background: none; border: 1px solid var(--card-border); border-radius: 6px; 
            width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: var(--text); transition: 0.2s;
        }
        .btn-icon-soft:hover { background: var(--text); color: var(--body-bg); }

        .settings-footer {
            padding: 20px 40px; background: rgba(125,125,125,0.02);
            border-top: 1px solid var(--card-border);
            display: flex; align-items: center; justify-content: flex-end; gap: 15px;
        }
        .btn-save {
            background: var(--accent); color: white; border: none; padding: 12px 24px;
            border-radius: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px;
            cursor: pointer; font-size: 13px; transition: 0.3s;
        }
        .btn-save:hover:not(:disabled) { box-shadow: 0 4px 15px var(--accent-glow); transform: translateY(-1px); }
        .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .toast-success { color: #10B981; font-weight: 600; font-size: 13px; display: flex; gap: 6px; align-items: center; animation: slideIn 0.3s; }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-fade { animation: fadeIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }

        @media (max-width: 768px) {
            .container { padding: 20px 10px; height: auto; display: block; }
            .settings-layout { display: flex; flex-direction: column; gap: 20px; }
            .nav-group { flex-direction: row; overflow-x: auto; padding: 10px; gap: 10px; scrollbar-width: none; }
            .nav-group::-webkit-scrollbar { display: none; }
            .nav-item { width: auto; white-space: nowrap; padding: 8px 14px; flex-shrink: 0; }
            .grid-2-col { grid-template-columns: 1fr; }
            .content-scroll-area { overflow: visible; padding: 25px; }
            .settings-content { overflow: visible; }
            .settings-header { flex-direction: column; gap: 15px; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}