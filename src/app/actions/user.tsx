"use client";

import React from 'react';

/**
 * Action pour enregistrer un nouvel étudiant
 */
export const registerStudent = async (userData: any) => {
  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Nouvel étudiant inscrit :", userData.email);
    
    return {
      success: true,
      message: "Compte créé avec succès !",
      user: { name: userData.fullName, email: userData.email }
    };
  } catch (error) {
    return { success: false, message: "Erreur lors de l'inscription." };
  }
};

/**
 * Action pour connecter un étudiant
 */
export const loginStudent = async (email: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      user: { name: "Alexandre", email: email, progress: 68 }
    };
  } catch (error) {
    return { success: false, message: "Identifiants incorrects." };
  }
};

/**
 * Récupère les données de progression
 */
export const getUserDashboardData = async (email: string = "candidat@email.com") => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      user: {
        id: "u123",
        name: "Alexandre",
        email: email,
        progress: 68,
        lastModule: "Architecture Bioclimatique"
      }
    };
  } catch (error) {
    return { success: false, message: "Erreur de chargement." };
  }
};

// Composant utilitaire de Layout
export default function UserLayout({ loading, children, isDark }: any) {
  if (loading) return <div style={{ padding: '20px', color: isDark ? '#fff' : '#000' }}>Chargement...</div>;
  return <>{children}</>;
}