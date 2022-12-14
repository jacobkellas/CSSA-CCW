$resourceGroupName = "rg-sdsd-it-ccw-dev-002"
$waBaseName = "wa-sdsd-it-ccw-dev" 
$waSufix = "002"

az webapp vnet-integration remove -g $resourceGroupName -n ($waBaseName + "-admin-" + $waSufix)
az webapp vnet-integration remove -g $resourceGroupName -n ($waBaseName + "-application-" + $waSufix)
az webapp vnet-integration remove -g $resourceGroupName -n ($waBaseName + "-document-" + $waSufix)
az webapp vnet-integration remove -g $resourceGroupName -n ($waBaseName + "-payment-" + $waSufix)
az webapp vnet-integration remove -g $resourceGroupName -n ($waBaseName + "-schedule-" + $waSufix)
az webapp vnet-integration remove -g $resourceGroupName -n ($waBaseName + "-userprofile-" + $waSufix)