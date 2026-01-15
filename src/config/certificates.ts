// /src/config/certificates.ts

export interface CertificateRecord {
    id: string;
    studentName: string;
    course: string;
    issueDate: string;
    status: "VALIDE" | "EXPIRE" | "ANNULE";
    mention: string;
  }
  
  export const GAS_CERTIFICATES_REGISTRY: Record<string, CertificateRecord> = {
    "GAS-2026-PREMIUM": {
      id: "GAS-2026-PREMIUM",
      studentName: "CANDIDAT GAS", // Correspond au nom par défaut dans ta page Certificat
      course: "EXPERT EN STRATÉGIE DIGITALE",
      issueDate: "08 JANVIER 2026",
      status: "VALIDE",
      mention: "Mention Très Bien"
    },
    "GAS-2026-001": {
      id: "GAS-2026-001",
      studentName: "JEAN DUPONT",
      course: "DÉVELOPPEMENT WEB FULLSTACK",
      issueDate: "05 JANVIER 2026",
      status: "VALIDE",
      mention: "Excellent"
    }
  };