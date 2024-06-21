# Ścieżki do folderów
# .\copy_prod_files_to_www.ps1

$sourcePath = "dist/pamo-angular-pwa"
$destinationPath = "PamoAndroidPwaApp/www"

# Usunięcie zawartości folderu docelowego
if (Test-Path $destinationPath) {
    Remove-Item -Recurse -Force -Path "$destinationPath\*"
} else {
    Write-Host "Folder docelowy nie istnieje: $destinationPath"
    exit
}

# Skopiowanie zawartości z folderu źródłowego do docelowego
if (Test-Path $sourcePath) {
    Copy-Item -Recurse -Path "$sourcePath\*" -Destination $destinationPath
    Write-Host "Kopiowanie zakonczone pomyslnie."
} else {
    Write-Host "Folder zrodlowy nie istnieje: $sourcePath"
    exit
}
