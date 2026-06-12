# Versionamento de Assets

Use o script abaixo para atualizar automaticamente o parametro `?v=` de arquivos locais `.css` e `.js` em `index.html`, `casos.html` e `admin.html`.

## Comando padrao

```powershell
Set-Location "c:\Users\g.camargo.santolaja\Desktop\Trabalho\Anizzolavo\Bucomaxilo"
.\scripts\bump-asset-version.ps1
```

## Com versao manual

```powershell
.\scripts\bump-asset-version.ps1 -Version "20260610-1"
```

## Com arquivos especificos

```powershell
.\scripts\bump-asset-version.ps1 -Files @('index.html','casos.html')
```
