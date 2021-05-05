param(
  [Parameter(Mandatory = $true)]
  [string] $OutputDirectory
)

$out_dir = Resolve-Path $OutputDirectory

if(-not(Test-Path $out_dir)) {
  Write-Error "There is no such directory" -ErrorAction Stop
}

$build_suffix = Get-Date -UFormat "+%Y%m%d_%H%M%S"
 
Set-Location "$PSScriptRoot/../.."

npm run-script build

if($LASTEXITCODE -ne 0) {
  exit
}

$build_path = Resolve-Path (Join-Path $PSScriptRoot ".." ".." "build")
Copy-Item -Path "$PSScriptRoot\..\.env" -Destination "$build_path/.env"
Remove-Item -Path "$build_path\wwwroot" -Recurse -Force | Out-Null

$zip_filename = "frontend`_$build_suffix.zip"
Get-ChildItem -Path $build_path -Force `
  | Compress-Archive -DestinationPath $out_dir/$zip_filename -ErrorAction SilentlyContinue  -WarningAction SilentlyContinue
Remove-Item -Path $build_path -Recurse -Force | Out-Null

Set-Location -Path $PSScriptRoot

$build_info = @{ 
  "BuildSuffix" = $build_suffix;
  "BuildDirectory" = (Resolve-Path $OutputDirectory).Path;
}
New-Item -ItemType File -Path "$PSScriptRoot/.last_build" -Force | Out-Null
$build_info | ConvertTo-Yaml | Set-Content "$PSScriptRoot/.last_build" -NoNewline

Write-Host "[INFO] Build $build_suffix succeeded" -ForegroundColor Green
