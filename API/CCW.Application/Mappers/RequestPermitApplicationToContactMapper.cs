using CCW.Application.Entities;
using CCW.Application.Models;

namespace CCW.Application.Mappers;

public class RequestPermitApplicationToContactMapper : IMapper<PermitApplicationRequestModel, Contact>
{
    public Contact Map(PermitApplicationRequestModel source)
    {
        return source.Application.Contact == null ? new Contact() :
            new Contact
            {
                PrimaryPhoneNumber = source.Application.Contact.PrimaryPhoneNumber,
                CellPhoneNumber = source.Application.Contact.CellPhoneNumber,
                WorkPhoneNumber = source.Application.Contact.WorkPhoneNumber,
                TextMessageUpdates = source.Application.Contact.TextMessageUpdates,
            };
    }
}
