# start-stack.ps1
# 🚀 Démarrage du frontend GAS (Next.js)

Write-Host "========================================="
Write-Host " 🚀 Lancement du frontend GAS - Global Academy of Skills"
Write-Host "========================================="

# Vérifie si Node.js est installé
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js n'est pas installé. Installe-le avant de lancer le projet." -ForegroundColor Red
    exit 1
}

# Vérifie si le dossier frontend existe
if (-not (Test-Path "frontend")) {
    Write-Host "❌ Dossier 'frontend' introuvable. Vérifie la structure de ton projet." -ForegroundColor Red
    exit 1
}

# Se place dans le dossier frontend
Set-Location "frontend"

# Lance le serveur Next.js
Start-Process powershell -ArgumentList "npm run dev" -NoNewWindow

# Ouvre le navigateur automatiquement
Start-Process "http://localhost:3000"

Write-Host "✅ Frontend GAS lancé sur http://localhost:3000"
# start-stack.ps1
Write-Host "🚀 Lancement du frontend GAS..."

Set-Location "frontend"

# Supprime le lock si présent
$lockPath = ".next\dev\lock"
if (Test-Path $lockPath) {
    Remove-Item $lockPath
    Write-Host "🔓 Lock supprimé"
}

# Lance le serveur
Start-Process powershell -ArgumentList "npm run dev" -NoNewWindow

# Ouvre le navigateur
Start-Process "http://localhost:3000"

Write-Host "✅ Frontend GAS lancé sur http://localhost:3000"
