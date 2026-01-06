from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.core.security import verify_password, create_access_token

router = APIRouter()

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # 1. Vérification de l'utilisateur
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
        )

    # 2. Génération du Token
    access_token = create_access_token(subject=user.id)

    # 3. Réponse avec Cookie HTTPOnly
    content = {
        "message": "Connexion réussie",
        "user": {
            "full_name": user.full_name,
            "is_premium": user.is_premium
        }
    }
    response = JSONResponse(content=content)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=10080 * 60, # 7 jours
        path="/",
        samesite="lax",
        secure=False, # Mettre à True en production avec HTTPS
    )
    return response

@router.post("/logout")
async def logout():
    # Création de la réponse de sortie
    response = JSONResponse(content={"message": "Déconnecté avec succès"})
    
    # Suppression du cookie (on s'assure que le path est le même que pour le login)
    response.delete_cookie(
        key="access_token",
        path="/",
        httponly=True,
        samesite="lax",
    )
    return response