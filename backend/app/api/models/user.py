from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    # --- Identifiants et informations de base ---
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # --- Rôles et Permissions ---
    is_admin = Column(Boolean, default=False)  # Indispensable pour tes routes @admin
    is_active = Column(Boolean, default=True) # Pour pouvoir bannir/désactiver un compte
    is_premium = Column(Boolean, default=False)
    
    # --- Champs spécifiques à GAS ELITE ---
    current_progress = Column(Integer, default=0) # Progression globale de 0 à 100
    avatar_url = Column(String, nullable=True)
    
    # --- Métadonnées pour le suivi ---
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    def __repr__(self):
        return f"<User(email={self.email}, full_name={self.full_name}, admin={self.is_admin}, premium={self.is_premium})>"