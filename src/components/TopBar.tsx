"use client";
import React, { useState } from 'react';
import { Bell, User, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import LogoutModal from './LogoutModal'; // Importation de la modale

export default function TopBar() {
  const { isDark, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Déconnexion..."); // Ici tu pourras ajouter la logique de redirection
    window.location.href = "/"; // Redirige vers l'accueil par exemple
  };

  return (
    <header style={{
      height: '70px', backgroundColor: isDark ? '#0F172A' : 'white',
      borderBottom: `1px solid ${isDark ? '#1E293B' : '#E2E8F0'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      padding: '0 40px', transition: 'all 0.3s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* BOUTON THÈME */}
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {isDark ? <Sun color="#FACC15" /> : <Moon color="#64748B" />}
        </button>

        {/* BOUTON DÉCONNEXION */}
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px',
            borderRadius: '10px', border: '1px solid #FEE2E2', backgroundColor: '#FFF5F5',
            color: '#EF4444', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          <LogOut size={16} /> Quitter
        </button>

        {/* MODALE DE CONFIRMATION */}
        <LogoutModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleLogout}
          isDark={isDark}
        />
      </div>
    </header>
  );
}