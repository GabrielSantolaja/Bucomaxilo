param(
  [string[]]$Files = @('index.html', 'casos.html', 'admin.html'),
  [string]$Version = (Get-Date -Format 'yyyyMMdd-HHmm')
)

$assetPattern = '((?:href|src)=")(?!https?:|data:|mailto:|tel:|#)([^"]+\.(?:css|js))(?:\?v=[^"]*)?(")'

foreach ($file in $Files) {
  if (-not (Test-Path $file)) {
    Write-Host "Ignorando arquivo inexistente: $file" -ForegroundColor Yellow
    continue
  }

  $content = Get-Content -Path $file -Raw
  $updated = [regex]::Replace($content, $assetPattern, "${1}${2}?v=$Version${3}")

  if ($updated -ne $content) {
    Set-Content -Path $file -Value $updated -Encoding UTF8
    Write-Host "Versao atualizada em: $file" -ForegroundColor Green
  } else {
    Write-Host "Nenhum asset local encontrado em: $file" -ForegroundColor DarkGray
  }
}

Write-Host "Asset version final: $Version" -ForegroundColor Cyan
