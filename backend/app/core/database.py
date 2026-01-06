from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.settings import settings

# Engine configuré pour Supabase (PgBouncer)
engine = create_engine(
    settings.DATABASE_URL, 
    future=True,
    # pool_pre_ping: vérifie la connexion avant chaque requête (crucial pour le cloud)
    pool_pre_ping=True,
    # Paramètres recommandés pour PgBouncer
    pool_size=5,
    max_overflow=10
)

# Fabrique de sessions
SessionLocal = sessionmaker(
    bind=engine, 
    autoflush=False, 
    autocommit=False,
    expire_on_commit=False
)

# Base de déclaration pour tes modèles (User, Course, etc.)
Base = declarative_base()

# Dépendance injectée dans tes routes FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()