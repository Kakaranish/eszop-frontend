param (
    [Parameter(Mandatory = $true)]
    [string] $BuildSuffix,

    [Parameter(Mandatory = $true)]
    [string] $BuildDirectory
)

# ---  FILL VALUES BELOW vvv  --------------------------------------------------

$GCS_BUCKET_NAME = "eszop-app-storage"

# ------------------------------------------------------------------------------

$build_dir = Resolve-Path $BuildDirectory
$build_filename = "frontend`_$BuildSuffix.zip"
$build_path = Join-Path $BuildDirectory $build_filename
if(-not(Test-Path $build_path)) {
    Write-Error "$build_filename cannot be published because does not exist" -ErrorAction Stop
}

gsutil cp $build_path "gs://$GCS_BUCKET_NAME"

Write-Host "[INFO] Published $build_filename in gcs bucket $GCS_BUCKET_NAME" -ForegroundColor DarkGreen
