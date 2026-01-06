from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from app.core.settings import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_status_update_email(email_to: str, full_name: str, new_status: str):
    # Traduction pour l'utilisateur
    status_fr = {
        "pending": "En attente",
        "shipped": "Expédié",
        "completed": "Livré",
        "cancelled": "Annulé"
    }.get(new_status.lower(), new_status)

    html = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1a56db;">GAS Academy - Mise à jour de commande</h2>
        <p>Bonjour <strong>{full_name}</strong>,</p>
        <p>Le statut de votre commande de certificat papier a changé :</p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
            <span style="font-size: 1.2em; font-weight: bold; color: #1e40af;">{status_fr.upper()}</span>
        </div>
        <p>Nous faisons de notre mieux pour vous faire parvenir votre diplôme rapidement.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #888;">Ceci est un message automatique de GAS Academy Elite.</p>
    </div>
    """
    
    message = MessageSchema(
        subject="📦 Mise à jour de votre certificat - GAS Academy",
        recipients=[email_to],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)