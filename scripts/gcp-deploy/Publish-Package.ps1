param (
  [Parameter(Mandatory = $true)]
  [string] $BuildSuffix,

  [Parameter(Mandatory = $true)]
  [string] $BuildDirectory
)

Import-Module "$PSScriptRoot/Config.psm1" -Force

$build_dir = Resolve-Path $BuildDirectory
$build_filename = "frontend`_$BuildSuffix.zip"
$build_path = Join-Path $BuildDirectory $build_filename
if(-not(Test-Path $build_path)) {
  Write-Error "$build_filename cannot be published because does not exist" -ErrorAction Stop
}

Write-Host $build_path
gsutil cp $build_path "gs://$GCP_PACKAGE_STORAGE"
if($LASTEXITCODE -eq 0) {
  Write-Host "[INFO] Published $build_filename into gcs bucket $GCP_PACKAGE_STORAGE" -ForegroundColor DarkGreen
}
