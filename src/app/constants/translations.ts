// constants/translations.ts

export type Language = 'fr' | 'en' | 'ar';

export const translations = {
  fr: {
    sidebar: {
      profil: "Profil & Identité",
      interface: "Interface Visuelle",
      notifications: "Communications",
      securite: "Sécurité & Accès",
      facturation: "Facturation",
    },
    header: {
      badge: "SESSIONS ELITE v2.0",
      title: "Paramètres Système",
      back: "Tableau de Bord",
    },
    profil: {
      title: "IDENTITÉ DE L'ARCHITECTE",
      subtitle: "Mettez à jour vos informations personnelles pour vos certificats.",
      labelName: "NOM COMPLET",
      placeholderName: "Ex: Ahmed Bennani",
    },
    interface: {
      title: "EXPÉRIENCE VISUELLE",
      subtitle: "Personnalisez l'ambiance de votre espace de travail.",
      modeLabel: "Mode d'affichage",
      modeDesc: "Basculez entre le mode clair et sombre.",
      accentLabel: "Couleur Signature",
      accentDesc: "Couleur d'accentuation appliquée sur tout le système.",
      langLabel: "Langue du Système",
      langDesc: "Choisissez votre langue de préférence.",
    },
    common: {
      save: "Enregistrer les modifications",
      success: "Modifications enregistrées",
      loading: "Traitement en cours...",
    }
  },
  en: {
    sidebar: {
      profil: "Profile & Identity",
      interface: "Visual Interface",
      notifications: "Communications",
      securite: "Security & Access",
      facturation: "Billing",
    },
    header: {
      badge: "ELITE SESSIONS v2.0",
      title: "System Settings",
      back: "Dashboard",
    },
    profil: {
      title: "ARCHITECT IDENTITY",
      subtitle: "Update your personal information for your certificates.",
      labelName: "FULL NAME",
      placeholderName: "e.g. Ahmed Bennani",
    },
    interface: {
      title: "VISUAL EXPERIENCE",
      subtitle: "Customize your workspace ambiance.",
      modeLabel: "Display Mode",
      modeDesc: "Switch between light and dark mode.",
      accentLabel: "Signature Color",
      accentDesc: "Accent color applied across the entire system.",
      langLabel: "System Language",
      langDesc: "Choose your preferred language.",
    },
    common: {
      save: "Save Changes",
      success: "Changes saved successfully",
      loading: "Processing...",
    }
  },
  ar: {
    sidebar: {
      profil: "الملف الشخصي",
      interface: "الواجهة البصرية",
      notifications: "الإشعارات",
      securite: "الأمان",
      facturation: "الفواتير",
    },
    header: {
      badge: "جلسات النخبة v2.0",
      title: "إعدادات النظام",
      back: "لوحة التحكم",
    },
    profil: {
      title: "هوية المهندس",
      subtitle: "قم بتحديث معلوماتك الشخصية لشهاداتك.",
      labelName: "الاسم الكامل",
      placeholderName: "مثال: أحمد بناني",
    },
    interface: {
      title: "التجربة البصرية",
      subtitle: "خصص أجواء مساحة عملك.",
      modeLabel: "وضع العرض",
      modeDesc: "تبديل بين الوضع الفاتح والداكن.",
      accentLabel: "لون التوقيع",
      accentDesc: "لون التمييز المطبق على النظام بأكمله.",
      langLabel: "لغة النظام",
      langDesc: "اختر لغتك المفضلة.",
    },
    common: {
      save: "حفظ التغييرات",
      success: "تم حفظ التغييرات",
      loading: "جاري المعالجة...",
    }
  }
};