namespace CCW.Application.Entities
{
    public class Contact
    {
        public string PrimaryPhoneNumber { get; set; }
        public string CellPhoneNumber { get; set; }
        public string WorkPhoneNumber { get; set; }
        public string FaxPhoneNumber { get; set; }
        public bool TextMessageUpdates { get; set; }
    }
}
