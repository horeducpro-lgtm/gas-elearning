from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# --- SCHÉMAS UTILISATEUR (Authentification) ---

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserOut(BaseModel):
    # On utilise str pour l'ID car Supabase/Prisma utilise des UUID
    id: str 
    email: EmailStr
    full_name: str

    class Config:
        # Indispensable pour que Pydantic puisse lire les objets SQLAlchemy
        from_attributes = True 

# --- SCHÉMAS CERTIFICATS (Commandes) ---

class CertificateOrderCreate(BaseModel):
    """
    Schéma pour la création d'une commande.
    Utilise fullName (camelCase) pour correspondre aux formulaires React/Next.js.
    """
    fullName: str
    email: EmailStr
    phone: str
    city: str
    address: str

class CertificateOrderResponse(BaseModel):
    """
    Schéma pour renvoyer les données au frontend.
    """
    id: str
    user_id: Optional[str]
    full_name: str
    email: EmailStr
    phone: str
    city: str
    address: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True