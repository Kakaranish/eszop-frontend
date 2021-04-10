param(
    [Parameter(Mandatory = $true)]
    [string] $OutputDirectory
)

$out_dir = Resolve-Path $OutputDirectory

if(-not(Test-Path $out_dir)) {
    Write-Error "There is no such directory" -ErrorAction Stop
}

$build_suffix = Get-Date -UFormat "+%Y%m%d_%H%M%S"

Set-Location $PSScriptRoot/../..

npm run-script build

$zip_filename = "frontend`_$build_suffix.zip"
$build_path = Resolve-Path (Join-Path $PSScriptRoot ".." ".." "build")
Compress-Archive -CompressionLevel Optimal -Path $build_path/* -DestinationPath $out_dir/$zip_filename

Remove-Item -Path $build_path -Recurse -Force | Out-Null

Set-Location -Path $PSScriptRoot

Write-Host "[INFO] Build $build_suffix succeeded" -ForegroundColor Green