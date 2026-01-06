import enum
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    SHIPPED = "shipped"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class CertificateOrder(Base):
    """
    Modèle représentant une commande de certificat papier.
    """
    __tablename__ = "certificate_orders"

    # --- IDENTIFIANTS ---
    # On utilise String car ton image Supabase montre des IDs au format UUID/Text (Prisma)
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True) 
    course_id = Column(String, index=True)

    # --- INFORMATIONS DE LIVRAISON ---
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    city = Column(String, nullable=True)
    address = Column(String, nullable=True)
    
    # --- LOGISTIQUE ---
    status = Column(String, default=OrderStatus.PENDING)
    
    # --- HORODATAGE ---
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())