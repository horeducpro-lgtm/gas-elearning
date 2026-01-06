from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import certificates  # Import du nouveau module
from app.api import auth
from app.core.database import engine, Base

# --- IMPORT DES MODÈLES ---
# Important : Ils doivent être importés ici pour que Base.metadata.create_all 
# puisse détecter les tables à créer.
from app.models.user import User
from app.models.certificate import CertificateOrder 

# --- CRÉATION DES TABLES ---
# Si tu n'utilises pas encore Alembic, cette ligne crée les tables 
# automatiquement dans ta base de données au démarrage.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GAS ELITE API",
    description="Backend sophistiqué pour l'écosystème GAS Academy",
    version="1.0.0"
)

# --- CONFIGURATION DES CORS ---
# Permet à ton frontend Next.js de communiquer avec ce backend
origins = [
    "http://localhost:3000",    # Frontend local
    "https://ton-domaine.com",  # Production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- INCLUSION DES ROUTES ---

# Authentification (Login, Register)
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

# Certificats (Commande, Historique)
app.include_router(certificates.router, prefix="/api/certificates", tags=["Certificats"])


@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Bienvenue sur l'API GAS ELITE",
        "version": "1.0.0"
    }

# Lancement recommandé via uvicorn : 
# uvicorn app.main:app --reload