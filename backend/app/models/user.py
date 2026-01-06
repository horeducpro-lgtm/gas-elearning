from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class CertificateOrder(Base):
    __tablename__ = "certificate_orders"

    id = Column(Integer, primary_key=True, index=True)
    # Liaison avec la table users
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    city = Column(String, nullable=False)
    address = Column(String, nullable=False)
    
    # Suivi de commande
    status = Column(String, default="PENDING")  # PENDING, SHIPPED, DELIVERED
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relation (optionnel)
    owner = relationship("User", back_populates="certificates")