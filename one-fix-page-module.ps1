# one-fix-page-module.ps1
$root = (Get-Location).Path
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = Join-Path $root "repair-backup-$ts"
New-Item -ItemType Directory -Path $backup | Out-Null
if (Test-Path (Join-Path $root "frontend\app")) { Copy-Item -Recurse -Force (Join-Path $root "frontend\app") (Join-Path $backup "app") }
Set-Location (Join-Path $root "frontend")
$codeFiles = Get-ChildItem -Recurse -Include *.tsx,*.ts -File -Path .\app -ErrorAction SilentlyContinue
$problemFiles = @()
foreach ($f in $codeFiles) {
  $txt = Get-Content -Raw $f.FullName -ErrorAction SilentlyContinue
  if ($txt -and ($txt -notmatch '\bexport\b')) {
    if ($f.Name -match '^page\.(tsx|ts)$' -or $f.FullName -match '\\app\\') { $problemFiles += $f }
  }
}
if ($problemFiles.Count -gt 0) {
  foreach ($pf in $problemFiles) {
    $orig = Get-Content -Raw $pf.FullName
    if ($orig -notmatch '\bexport\b') {
      $patch = "`n/* AUTO-ADDED: default export inserted by repair script on $ts */`nexport default function Page(){ return null; }`n"
      $orig + $patch | Set-Content -Encoding utf8 $pf.FullName
      Write-Host "Patched: $($pf.FullName)"
    }
  }
} else { Write-Host "No page files without export found." }
Write-Host "Backup saved at: $backup"
