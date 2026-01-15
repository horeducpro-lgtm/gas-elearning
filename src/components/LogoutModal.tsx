"use client";
import React from 'react';
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDark: boolean;
}

export default function LogoutModal({ isOpen, onClose, onConfirm, isDark }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        backgroundColor: isDark ? '#1E293B' : 'white',
        padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '400px',
        textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`
      }}>
        <div style={{ 
          backgroundColor: '#FEE2E2', width: '60px', height: '60px', 
          borderRadius: '30px', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', margin: '0 auto 20px' 
        }}>
          <LogOut size={30} color="#EF4444" />
        </div>
        
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: isDark ? 'white' : '#0F172A', marginBottom: '10px' }}>
          Déconnexion
        </h3>
        <p style={{ color: isDark ? '#94A3B8' : '#64748B', marginBottom: '30px', fontSize: '15px' }}>
          Êtes-vous sûr de vouloir quitter votre session GAS Academy ?
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0',
            backgroundColor: 'transparent', color: isDark ? '#94A3B8' : '#64748B', 
            fontWeight: 'bold', cursor: 'pointer'
          }}>
            Annuler
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
            backgroundColor: '#EF4444', color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}