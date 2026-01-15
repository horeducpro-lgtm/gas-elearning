"use client";
import React, { useRef, useEffect } from 'react';
import { Download, X, Award } from 'lucide-react';

interface Props {
  userName: string;
  courseTitle: string;
  onClose: () => void;
}

const GOLD = "#BE9B4B";

export default function CertificateModal({ userName, courseTitle, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- RENDU DU CERTIFICAT ---
    // 1. Fond
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, "#ffffff");
    grd.addColorStop(1, "#f9fbfd");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Bordures Or
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // 3. Textes
    ctx.textAlign = "center";
    
    // Titre
    ctx.fillStyle = "#161B22";
    ctx.font = "bold 30px serif";
    ctx.fillText("CERTIFICAT DE RÉUSSITE", canvas.width / 2, 150);
    
    // Sous-titre
    ctx.font = "italic 20px serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText("Ce document atteste que", canvas.width / 2, 210);

    // Nom (L'élément central)
    ctx.font = "bold 60px 'Times New Roman', serif";
    ctx.fillStyle = GOLD;
    ctx.fillText(userName, canvas.width / 2, 300);

    // Corps
    ctx.font = "20px serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText("a complété avec succès le cursus de formation", canvas.width / 2, 360);

    // Titre du cours
    ctx.font = "bold 35px serif";
    ctx.fillStyle = "#161B22";
    ctx.fillText(courseTitle, canvas.width / 2, 420);

    // Signature et Date
    const date = new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    ctx.font = "16px serif";
    ctx.fillText(`Délivré le ${date}`, canvas.width / 2, 510);
    
    ctx.font = "bold 18px serif";
    ctx.fillText("GAS ELITE ACADEMY", canvas.width / 2, 545);

  }, [userName, courseTitle]);

  const downloadCert = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Certificat_${userName.replace(/\s+/g, '_')}_GAS.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="cert-preview">
          <canvas ref={canvasRef} width={800} height={600} />
        </div>

        <div className="actions">
          <div className="award-icon-float">
             <Award size={40} color={GOLD} />
          </div>
          <h3>Votre Expertise est Certifiée</h3>
          <p>Félicitations ! Ce document officiel valide vos acquis techniques.</p>
          <button onClick={downloadCert} className="download-btn">
            <Download size={20} /> ENREGISTRER LE DIPLÔME (PNG)
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.9); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;
          animation: fadeIn 0.4s ease-out;
        }

        .modal-content {
          background: white; border-radius: 30px; max-width: 850px; width: 100%;
          position: relative; padding: 50px; text-align: center;
          box-shadow: 0 50px 100px rgba(0,0,0,0.5);
        }

        .animate-pop {
          animation: scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .cert-preview canvas {
          width: 100%; height: auto; border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 30px; border: 1px solid #f0f0f0;
        }

        .award-icon-float {
          margin-bottom: 15px; animation: float 3s ease-in-out infinite;
        }

        .actions h3 { font-size: 26px; font-weight: 900; color: #161B22; margin: 0; }
        .actions p { color: #64748B; font-weight: 500; margin: 8px 0 25px; }

        .close-btn { 
          position: absolute; top: 25px; right: 25px; border: none; background: none; 
          cursor: pointer; color: #64748B; transition: 0.2s;
        }
        .close-btn:hover { color: #161B22; transform: rotate(90deg); }

        .download-btn {
          background: #161B22; color: white; border: none; padding: 18px 35px;
          border-radius: 15px; font-weight: 900; cursor: pointer; display: flex;
          align-items: center; gap: 12px; margin: 0 auto; transition: 0.3s;
        }

        .download-btn:hover {
          background: ${GOLD}; transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px ${GOLD}40;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.8) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

        @media (max-width: 600px) {
          .modal-content { padding: 30px 20px; }
          .actions h3 { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}