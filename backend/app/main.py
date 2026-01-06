from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.core.settings import settings

# --- IMPORT DES MODÈLES ---
# Obligatoire pour que Base.metadata.create_all détecte les tables
from app.models.user import User
from app.models.certificate import CertificateOrder 

# --- IMPORT DES ROUTERS ---
from app.api.endpoints import certificates, users
from app.api import auth

# --- CRÉATION AUTOMATIQUE DES TABLES ---
# Note : À l'avenir, il est recommandé d'utiliser Alembic pour les migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GAS ELITE API",
    description="Backend sophistiqué pour l'écosystème GAS Academy",
    version="1.0.0"
)

# --- CONFIGURATION DES CORS ---
# Mise à jour pour inclure ton domaine Render et localhost
origins = [
    "http://localhost:3000",          # Frontend local
    "https://gas-elearning.vercel.app", # Exemple de ton futur frontend
    "https://gas-elearning.onrender.com" # Ton propre domaine backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- INCLUSION DES ROUTES ---

# Authentification (Login, Logout, Token)
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

# Utilisateurs (Profil, Admin, Gestion)
app.include_router(users.router, prefix="/api", tags=["Utilisateurs"])

# Certificats (Commande, Historique)
app.include_router(certificates.router, prefix="/api/certificates", tags=["Certificats"])


@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "message": "Bienvenue sur l'API GAS ELITE",
        "environment": "production",
        "version": "1.0.0"
    }

# Commande de lancement (en local) : 
# uvicorn app.main:app --reload