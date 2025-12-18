# start-backend.ps1
# Script pour lancer le backend GAS

Write-Host "Activation de l'environnement virtuel..."
& "$PSScriptRoot\venv\Scripts\Activate.ps1"

Write-Host "Installation des dépendances..."
python -m pip install -r "$PSScriptRoot\requirements.txt"

Write-Host "Démarrage du serveur FastAPI avec Uvicorn..."
python -m uvicorn app.main:app --reload --port 4000
