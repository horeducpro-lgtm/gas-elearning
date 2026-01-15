"use client";
import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, UserCheck, X } from 'lucide-react';

export type ToastType = 'points' | 'achievement' | 'social';

interface ToastProps {
  id: number;
  type: ToastType;
  message: string;
  onClose: (id: number) => void;
}

const Toast = ({ id, type, message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'points': return <Sparkles size={18} color="#BE9B4B" />;
      case 'achievement': return <Trophy size={18} color="#BE9B4B" />;
      case 'social': return <UserCheck size={18} color="#3B82F6" />;
    }
  };

  return (
    <div className="toast-item animate-slide-in">
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">{message}</div>
      <button className="toast-close" onClick={() => onClose(id)}><X size={14} /></button>

      <style jsx>{`
        .toast-item {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(190, 155, 75, 0.3);
          padding: 16px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          margin-bottom: 10px;
          min-width: 300px;
          position: relative;
        }
        :global(.dark) .toast-item {
          background: rgba(22, 27, 34, 0.95);
          border-color: rgba(190, 155, 75, 0.2);
          color: white;
        }
        .toast-icon {
          background: rgba(190, 155, 75, 0.1);
          padding: 8px;
          border-radius: 10px;
          display: flex;
        }
        .toast-content { font-size: 14px; font-weight: 600; flex: 1; }
        .toast-close { background: none; border: none; opacity: 0.4; cursor: pointer; transition: 0.2s; }
        .toast-close:hover { opacity: 1; }

        @keyframes slideIn {
          from { transform: translateX(100%) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default function ToastContainer({ notifications, setNotifications }: any) {
  const removeToast = (id: number) => {
    setNotifications((prev: any[]) => prev.filter(n => n.id !== id));
  };

  return (
    <div className="toast-container">
      {notifications.map((n: any) => (
        <Toast key={n.id} {...n} onClose={removeToast} />
      ))}
      <style jsx>{`
        .toast-container {
          position: fixed; top: 30px; right: 30px; z-index: 9999;
          display: flex; flex-direction: column; align-items: flex-end;
        }
      `}</style>
    </div>
  );
}