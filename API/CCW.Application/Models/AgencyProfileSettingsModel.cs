using Newtonsoft.Json;

namespace CCW.Application.Models;

public class AgencyProfileSettingsModel
{
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("agencyName")]
    public string AgencyName { get; set; }
    [JsonProperty("agencySheriffName")]
    public string AgencySheriffName { get; set; }
    [JsonProperty("agencyTelephone")]
    public string AgencyTelephone { get; set; }
    [JsonProperty("chiefOfPoliceName")]
    public string ChiefOfPoliceName { get; set; }
    [JsonProperty("ori")]
    public string ORI { get; set; }
    [JsonProperty("courthouse")]
    public string Courthouse { get; set; }
    [JsonProperty("localAgencyNumber")]
    public string LocalAgencyNumber { get; set; }
    [JsonProperty("agencyBillingNumber")]
    public string AgencyBillingNumber { get; set; }
    [JsonProperty("contactName")]
    public string ContactName { get; set; }
    [JsonProperty("shippingAddress")]
    public string ShippingAddress { get; set; }
    [JsonProperty("mailCode")]
    public string MailCode { get; set; }

}
