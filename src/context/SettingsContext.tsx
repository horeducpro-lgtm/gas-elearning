"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types pour tes paramètres
interface UserSettings {
  email: boolean;
  push: boolean;
  updates: boolean;
  twoFactor: boolean;
}

interface SettingsContextType {
  userName: string;
  accentColor: string;
  settings: UserSettings;
  updateProfile: (name: string, color: string) => void;
  updateSettings: (newSettings: UserSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("Ahmed Bennani");
  const [accentColor, setAccentColor] = useState("#BE9B4B");
  const [settings, setSettings] = useState<UserSettings>({
    email: true,
    push: true,
    updates: true,
    twoFactor: true,
  });

  // Chargement initial depuis le LocalStorage
  useEffect(() => {
    const savedName = localStorage.getItem('gas_user_name');
    const savedAccent = localStorage.getItem('gas_accent_color');
    const savedSettings = localStorage.getItem('gas_user_settings');

    if (savedName) setUserName(savedName);
    if (savedAccent) setAccentColor(savedAccent);
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  const updateProfile = (name: string, color: string) => {
    setUserName(name);
    setAccentColor(color);
    localStorage.setItem('gas_user_name', name);
    localStorage.setItem('gas_accent_color', color);
    // Notification aux autres composants
    window.dispatchEvent(new Event('storage'));
  };

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('gas_user_settings', JSON.stringify(newSettings));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <SettingsContext.Provider value={{ userName, accentColor, settings, updateProfile, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings doit être utilisé dans un SettingsProvider");
  return context;
};