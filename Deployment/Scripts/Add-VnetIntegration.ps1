$resourceGroupName = "rg-sdsd-it-ccw-dev-002"
$waBaseName = "wa-sdsd-it-ccw-dev" 
$waSufix = "002"

$vnetName = "/subscriptions/c74e04b6-0cd7-4778-863e-34654eb49270/resourceGroups/rg-sdsd-it-ccw-dev-XXX/providers/Microsoft.Network/virtualNetworks/vnet-sdsd-it-ccw-dev-XXX".Replace("XXX", $waSufix)
$snetName = $vnetName + "/subnets/snet-sdsd-it-ccw-dev-vni-XXX".Replace("XXX", $waSufix)

az webapp vnet-integration add -g $resourceGroupName --vnet $vnetName --subnet $snetName -n ($waBaseName + "-admin-" + $waSufix)
az webapp vnet-integration add -g $resourceGroupName --vnet $vnetName --subnet $snetName -n ($waBaseName + "-application-" + $waSufix)
az webapp vnet-integration add -g $resourceGroupName --vnet $vnetName --subnet $snetName -n ($waBaseName + "-document-" + $waSufix)
az webapp vnet-integration add -g $resourceGroupName --vnet $vnetName --subnet $snetName -n ($waBaseName + "-payment-" + $waSufix)
az webapp vnet-integration add -g $resourceGroupName --vnet $vnetName --subnet $snetName -n ($waBaseName + "-schedule-" + $waSufix)
az webapp vnet-integration add -g $resourceGroupName --vnet $vnetName --subnet $snetName -n ($waBaseName + "-userprofile-" + $waSufix)
