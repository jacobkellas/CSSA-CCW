﻿using CCW.Application.Entities;
using Newtonsoft.Json;


namespace CCW.Application.Models;

public class PermitApplicationResponseModel
{
    public Entities.Application Application { get; set; }
    [JsonProperty("id")]
    public Guid Id { get; set; }
    [JsonProperty("userId")]
    public string UserId { get; set; }
    public History[] History { get; set; }
    public PaymentHistory[] PaymentHistory { get; set; }
}