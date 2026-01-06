from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any

from app.core.database import get_db
from app.core.auth import get_current_user, get_current_admin
from app.models.user import User

# Définition du router avec préfixe et tags pour la doc Swagger
router = APIRouter(prefix="/users", tags=["Utilisateurs"])

@router.get("/me", response_model=None)
def read_user_me(
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Récupère les informations du profil de l'utilisateur connecté.
    Accessible par : Tout utilisateur authentifié.
    """
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "is_premium": current_user.is_premium,
        "is_admin": current_user.is_admin,
        "current_progress": current_user.current_progress,
        "avatar_url": current_user.avatar_url,
        "created_at": current_user.created_at
    }

@router.get("/admin/all", response_model=None)
def read_all_users(
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_current_admin)
) -> Any:
    """
    Liste tous les utilisateurs inscrits.
    Accessible par : Administrateurs uniquement.
    """
    users = db.query(User).all()
    return users

@router.post("/admin/validate-cert")
def validate_user_certificate(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_current_admin)
) -> Any:
    """
    Route exemple pour valider manuellement un certificat.
    Accessible par : Administrateurs uniquement.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
        
    return {"message": f"Certificat validé avec succès par l'admin {admin_user.full_name}"}