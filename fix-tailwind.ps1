# fix-tailwind.ps1
# 🚀 Script de correction Tailwind/PostCSS pour GAS

Write-Host "========================================="
Write-Host " 🚀 Correction automatique Tailwind/PostCSS"
Write-Host "========================================="

# Se placer dans le dossier frontend
Set-Location "frontend"

# Supprimer @tailwindcss/postcss si présent
Write-Host "🧹 Suppression de @tailwindcss/postcss..."
npm uninstall @tailwindcss/postcss

# Recréer postcss.config.js propre
Write-Host "📝 Recréation de postcss.config.js..."
@"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@ | Out-File -Encoding utf8 postcss.config.js -Force

# Nettoyer le cache Next.js
Write-Host "🧹 Nettoyage du cache .next..."
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Relancer le serveur
Write-Host "🚀 Relance du serveur Next.js..."
npm run dev
