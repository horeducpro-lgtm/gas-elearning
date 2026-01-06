from fastapi import Depends, HTTPException, status, Request
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.settings import settings
from app.models.user import User

def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    """
    Middleware pour récupérer l'utilisateur connecté à partir du JWT.
    """
    # 1. Extraire le token (on vérifie le cookie access_token généré lors du login/logout)
    token = request.cookies.get("access_token")
    
    # Alternative si tu utilises les headers :
    # auth_header = request.headers.get("Authorization")
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Session expirée ou invalide. Veuillez vous reconnecter.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token:
        raise credentials_exception

    try:
        # 2. Décoder le token avec la SECRET_KEY partagée (NextAuth)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # 3. Récupérer l'utilisateur dans Supabase
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    
    return user