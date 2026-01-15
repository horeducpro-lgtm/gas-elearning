"use client";

import { Inter } from "next/font/google";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer"; // Ajout du Footer
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// Composant interne pour accéder au contexte du thème
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Synchronisation au montage du composant
  useEffect(() => {
    setMounted(true);
    
    const handleStorageChange = () => {
      window.dispatchEvent(new Event('progressUpdated'));
      window.dispatchEvent(new Event('xpUpdated'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Pages exclues de la Sidebar et du Footer (Landing, Login, Register)
  const noLayoutPages = ["/login", "/register", "/"];
  const isSimplePage = noLayoutPages.includes(pathname);

  // Empêcher le flash blanc au chargement
  if (!mounted) {
    return (
      <body className={inter.className} style={{ backgroundColor: '#0B0E14', margin: 0 }}>
        {children}
      </body>
    );
  }

  return (
    <body 
      className={inter.className} 
      style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: isDark ? '#0B0E14' : '#F8FAFC', 
        minHeight: '100vh',
        color: isDark ? '#F0F6FC' : '#111827',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        overflowX: 'hidden'
      }}
    >
      <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
        
        {/* Sidebar : Affichée uniquement sur le Dashboard */}
        {!isSimplePage && <Sidebar />}

        {/* Zone de contenu principal */}
        <main 
          style={{ 
            flex: 1, 
            width: '100%',
            marginLeft: isSimplePage ? '0' : '260px', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{ flex: 1 }}>
            {children}
          </div>
          
          {/* Footer intégré dynamiquement */}
          <Footer />
        </main>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDark ? '#0B0E14' : '#F1F5F9'};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? '#21262d' : '#CBD5E1'};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #BE9B4B;
        }

        @media (max-width: 1024px) {
          main { margin-left: 0 !important; }
        }
      `}</style>
    </body>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <title>Elite Architecture - GAS Academy</title>
        <meta name="description" content="Plateforme premium de formation en architecture durable" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <ThemeProvider>
        <LayoutContent>
          {children}
        </LayoutContent>
      </ThemeProvider>
    </html>
  );
}