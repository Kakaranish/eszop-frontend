param(
    [string] $ImageTag = "latest"
)

docker push "eszopregistry.azurecr.io/eszop-frontend:$ImageTag"