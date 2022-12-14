$resourceGroupName = "rg-sdsd-it-ccw-dev-002"
$waBaseName = "pe-wa-sdsd-it-ccw-dev" 
$waSufix = "002"

az network private-endpoint delete -g $resourceGroupName -n ($waBaseName + "-admin-" + $waSufix)
az network private-endpoint delete -g $resourceGroupName -n ($waBaseName + "-application-" + $waSufix)
az network private-endpoint delete -g $resourceGroupName -n ($waBaseName + "-document-" + $waSufix)
az network private-endpoint delete -g $resourceGroupName -n ($waBaseName + "-payment-" + $waSufix)
az network private-endpoint delete -g $resourceGroupName -n ($waBaseName + "-schedule-" + $waSufix)
az network private-endpoint delete -g $resourceGroupName -n ($waBaseName + "-userprofile-" + $waSufix)
