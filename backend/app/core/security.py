from datetime import datetime, timedelta
from typing import Optional, Union, Any
from jose import jwt
from passlib.context import CryptContext
from app.core.settings import settings

# Configuration du hachage des mots de passe (BCrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Transforme un mot de passe en clair en un hash sécurisé."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifie si le mot de passe saisi correspond au hash en base de données."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Génère un token JWT (JSON Web Token).
    Le 'subject' est généralement l'ID de l'utilisateur.
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Utilise la valeur par défaut de 7 jours définie dans settings.py
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Construction du contenu du token (payload)
    to_encode = {
        "exp": expire, 
        "sub": str(subject),
        "iat": datetime.utcnow() # Date de création
    }
    
    # Encodage avec la SECRET_KEY et l'ALGORITHM de ton .env
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.SECRET_KEY, 
        algorithm=settings.ALGORITHM
    )
    
    return encoded_jwt