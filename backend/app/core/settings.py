import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# 1. Calcul dynamique du chemin vers la racine (backend/)
# Remonte de : app/core/settings.py -> app/core -> app -> racine/
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"

class Settings(BaseSettings):
    # --- CONFIGURATION BASE DE DONNÉES ---
    # URL de connexion Supabase (via PgBouncer sur le port 6543)
    DATABASE_URL: str

    # --- SÉCURITÉ & JWT ---
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 jours par défaut

    # --- FRONTEND ---
    # Utilisé pour la configuration des CORS (ex: http://localhost:3000)
    FRONTEND_URL: str

    # --- CONFIGURATION EMAIL (SMTP) ---
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str

    # --- CHARGEMENT DU FICHIER .ENV ---
    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        extra="ignore"  # Empêche de crasher si des variables inutiles sont présentes
    )

# 2. DIAGNOSTIC ET INSTANCIATION AU DÉMARRAGE
print(f"\n--- DIAGNOSTIC CONFIGURATION GAS ACADEMY ---")
print(f"📍 Chemin du .env : {ENV_PATH}")

if ENV_PATH.exists():
    print("✅ Le fichier .env a été trouvé !")
else:
    print(f"❌ ERREUR CRITIQUE : Le fichier .env est INTROUVABLE dans {BASE_DIR}")
    print("Assure-toi que ton fichier .env est bien placé à la racine du dossier backend.")

try:
    # Instance globale 'settings' utilisée par le reste de l'application
    settings = Settings()
    print("🚀 Toutes les variables (DB, Sécurité, Mail) sont chargées avec succès.\n")
except Exception as e:
    print("❌ ERREUR DE VALIDATION : Une ou plusieurs variables obligatoires manquent dans le .env")
    print(f"Détails de l'erreur : {e}\n")
    # On stoppe l'exécution si la config est incomplète pour éviter des bugs silencieux
    raise e