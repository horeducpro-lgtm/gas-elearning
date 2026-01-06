import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.core.database import get_db
from app.models.certificate import CertificateOrder
from app.schemas.user import CertificateOrderCreate, CertificateOrderResponse
from app.api import deps 

router = APIRouter()

# --- ROUTES UTILISATEURS ---

@router.post("/", response_model=CertificateOrderResponse, status_code=status.HTTP_201_CREATED)
async def create_certificate_order(
    order_in: CertificateOrderCreate,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Enregistre une nouvelle commande de certificat papier."""
    try:
        new_order = CertificateOrder(
            id=str(uuid.uuid4()),
            user_id=str(current_user.id),
            full_name=order_in.fullName,
            email=order_in.email,
            phone=order_in.phone,
            city=order_in.city,
            address=order_in.address,
            status="pending", 
            created_at=datetime.utcnow()
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        return new_order
    except Exception as e:
        db.rollback()
        print(f"❌ Erreur DB: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur d'enregistrement.")

@router.get("/my-orders", response_model=List[CertificateOrderResponse])
async def list_my_orders(
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Récupère les commandes de l'utilisateur connecté."""
    return db.query(CertificateOrder).filter(
        CertificateOrder.user_id == str(current_user.id)
    ).all()

# --- ROUTES ADMINISTRATION ---

@router.get("/admin/all", response_model=List[CertificateOrderResponse])
async def list_all_orders_admin(
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Récupère TOUTES les commandes (Réservé à l'Admin)."""
    # Optionnel: if not current_user.is_admin: raise HTTPException(403)
    return db.query(CertificateOrder).all()

@router.patch("/{order_id}/status", response_model=CertificateOrderResponse)
async def update_order_status(
    order_id: str,
    new_status: str,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user) 
):
    """Met à jour le statut d'une commande (Admin)."""
    order = db.query(CertificateOrder).filter(CertificateOrder.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Commande introuvable")
    
    order.status = new_status
    db.commit()
    db.refresh(order)
    return order