# Builds a clean deploy/ folder containing ONLY the files that should go live.
# Usage: right-click > Run with PowerShell (or: powershell -File make-deploy.ps1)
# Then drag the deploy/ folder onto Netlify.

$root = $PSScriptRoot
$deploy = Join-Path $root "deploy"

if (Test-Path $deploy) { Remove-Item -Recurse -Force $deploy }
New-Item -ItemType Directory -Path $deploy | Out-Null

# Root files that go live
$files = @(
    "index.html", "contact.html", "portfolio.html", "about.html", "services.html",
    "privacy-policy.html",
    "demo.html", "thank-you.html", "download.html",
    "cookies.js", "robots.txt", "sitemap.xml",
    "BingSiteAuth.xml", "googlec6fa2383d904a23d.html"
)
foreach ($f in $files) {
    $src = Join-Path $root $f
    if (Test-Path $src) { Copy-Item $src $deploy } else { Write-Warning "Missing: $f" }
}

# Folders that go live
$folders = @("styles", "assets", "favicons", "about", "portfolio", "logos")
foreach ($d in $folders) {
    $src = Join-Path $root $d
    if (Test-Path $src) { Copy-Item -Recurse $src (Join-Path $deploy $d) } else { Write-Warning "Missing folder: $d" }
}

Write-Host ""
Write-Host "Done. Drag the 'deploy' folder onto Netlify:" -ForegroundColor Green
Write-Host "  $deploy"
