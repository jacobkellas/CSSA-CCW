using Microsoft.AspNetCore.Mvc;
using CCW.Document.Services;
using Microsoft.AspNetCore.Authorization;
using iText.Forms;
using iText.Kernel.Pdf;
using iText.Forms.Fields;
using Org.BouncyCastle.Crypto.IO;
using System.Reflection.Metadata;

namespace CCW.Document.Controllers;

[Route(Constants.AppName + "/v1/[controller]")]
[ApiController]
public class DocumentController : ControllerBase
{
    private IAzureStorage _azureStorage;
    private readonly ILogger<DocumentController> _logger;

    private string[] _allowedFileTypes = new[] { "image/jpeg", "image/png", "application/pdf" };

    public DocumentController(
        IAzureStorage azureStorage,
        ILogger<DocumentController> logger
    )
    {
        _azureStorage = azureStorage;
        _logger = logger;
    }


    [Authorize(Policy = "B2CUsers")]
    [Authorize(Policy = "AADUsers")]
    [HttpPost("uploadApplicantFile", Name = "uploadApplicantFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadApplicantFile(
        IFormFile fileToUpload,
        string saveAsFileName,
        CancellationToken cancellationToken)
    {
        try
        {
            GetUserId(out var userId);
            saveAsFileName = userId + "_" + saveAsFileName;

            if (string.IsNullOrEmpty(fileToUpload.ContentType) || !_allowedFileTypes.Contains(fileToUpload.ContentType))
            {
                return ValidationProblem("Content type missing or invalid.");
            }

            await _azureStorage.UploadApplicantFileAsync(fileToUpload, saveAsFileName, cancellationToken: default);

            return Ok();
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to upload applicant file.");
        }
    }



    [Authorize(Policy = "AADUsers")]
    [HttpPost("uploadAgencyFile", Name = "uploadAgencyFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadAgencyFile(
        IFormFile fileToUpload,
        string saveAsFileName,
        CancellationToken cancellationToken)
    {
        try
        {
            if (string.IsNullOrEmpty(fileToUpload.ContentType) || !_allowedFileTypes.Contains(fileToUpload.ContentType))
            {
                return ValidationProblem("Content type missing or invalid.");
            }

            await _azureStorage.UploadAgencyFileAsync(fileToUpload, saveAsFileName, cancellationToken: default);

            return Ok();
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to upload agency file.");
        }
    }


    [Authorize(Policy = "RequireSystemAdminOnly")]
    [Authorize(Policy = "AADUsers")]
    [HttpPost("uploadAgencyLogo", Name = "uploadAgencyLogo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadAgencyLogo(
        IFormFile fileToUpload,
        string saveAsFileName,
        CancellationToken cancellationToken)
    {
        try
        {
            if (string.IsNullOrEmpty(fileToUpload.ContentType) || !_allowedFileTypes.Contains(fileToUpload.ContentType))
            {
                return ValidationProblem("Content type missing or invalid.");
            }

            await _azureStorage.UploadAgencyLogoAsync(fileToUpload, saveAsFileName, cancellationToken: default);

            return Ok();
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to upload agency logo.");
        }
    }


    [Authorize(Policy = "B2CUsers")]
    [Authorize(Policy = "AADUsers")]
    [HttpGet("downloadApplicantFile", Name = "downloadApplicantFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DownloadApplicantFile(
        string applicantFileName,
        CancellationToken cancellationToken)
    {
        try
        {
            GetUserId(out var userId);
            applicantFileName = userId + "_" + applicantFileName;

            MemoryStream ms = new MemoryStream();

            var file = await _azureStorage.DownloadApplicantFileAsync(applicantFileName, cancellationToken: default);
            if (await file.ExistsAsync())
            {
                await file.DownloadToStreamAsync(ms);
                Stream blobStream = file.OpenReadAsync().Result;

                if (file.Properties.ContentType == "application/pdf")
                {
                    Response.Headers.Append("Content-Disposition", "inline");
                    Response.Headers.Add("X-Content-Type-Options", "nosniff");
                }

                return new FileStreamResult(blobStream, file.Properties.ContentType);
            }

            return Content("Image does not exist");
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to download applicant file.");
        }
    }


    [Authorize(Policy = "AADUsers")]
    [HttpGet("downloadAgencyFile", Name = "downloadAgencyFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DownloadAgencyFile(
        string agencyFileName,
        CancellationToken cancellationToken)
    {
        try
        {
            MemoryStream ms = new MemoryStream();

            var file = await _azureStorage.DownloadAgencyFileAsync(agencyFileName, cancellationToken: default);
            if (await file.ExistsAsync())
            {
                await file.DownloadToStreamAsync(ms);
                Stream blobStream = file.OpenReadAsync().Result;

                if (file.Properties.ContentType == "application/pdf")
                {
                    Response.Headers.Append("Content-Disposition", "inline");
                    Response.Headers.Add("X-Content-Type-Options", "nosniff");
                }

                return new FileStreamResult(blobStream, file.Properties.ContentType);
            }

            return Content("Image does not exist");
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to download agency file.");
        }
    }


    [HttpGet("downloadAgencyLogo", Name = "downloadAgencyLogo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<string> DownloadAgencyLogo(
        string agencyLogoName,
        CancellationToken cancellationToken)
    {
        try
        {
            var result = await _azureStorage.DownloadAgencyLogoAsync(agencyLogoName, cancellationToken: default);

            return result;
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to download agency logo.");
        }
    }


    //[Authorize(Policy = "RequireSystemAdminOnly")]
    [Authorize(Policy = "AADUsers")]
    [HttpDelete("deleteAgencyLogo", Name = "deleteAgencyLogo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteAgencyLogo(
        string agencyLogoName, CancellationToken cancellationToken)
    {
        try
        {
            await _azureStorage.DeleteAgencyLogoAsync(agencyLogoName, cancellationToken: default);

            return Ok();
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to delete agency logo.");
        }
    }


    //[Authorize(Policy = "RequireAdminOnly")]
    [Authorize(Policy = "AADUsers")]
    [HttpDelete("deleteApplicantFile", Name = "deleteApplicantFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteApplicantFile(
        string applicantFileName, CancellationToken cancellationToken)
    {
        try
        {
            await _azureStorage.DeleteApplicantFileAsync(applicantFileName, cancellationToken: default);

            return Ok();
        }
        catch (Exception e)
        {
            var originalException = e.GetBaseException();
            _logger.LogError(originalException, originalException.Message);
            throw new Exception("An error occur while trying to delete applicant file.");
        }
    }


    //[Authorize(Policy = "B2CUsers")]
    //[Authorize(Policy = "AADUsers")]
    [HttpGet("getFile", Name = "getFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetFile(
        string fileName,
        CancellationToken cancellationToken)
    {
        var agencyFileName = "Template_2022";

        IDictionary<string, PdfFormField> fields;
        MemoryStream outStream = new MemoryStream();

        var pdfTemplate = await _azureStorage.DownloadAgencyFileAsync(agencyFileName, cancellationToken: default);
        if (await pdfTemplate.ExistsAsync())
        {
            await pdfTemplate.DownloadToStreamAsync(outStream);
            //Stream blobStream = pdfTemplate.OpenReadAsync().Result;
            var stream = await pdfTemplate.OpenReadAsync();
            var docFile = File(stream, pdfTemplate.Properties.ContentType);

            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(outStream));
            iText.Layout.Document docText = new iText.Layout.Document(pdfDoc);

            PdfReader pdfReader = new PdfReader(outStream);
            PdfWriter pdfWriter = new PdfWriter(outStream);
            PdfDocument doc = new PdfDocument(pdfReader, pdfWriter);

            PdfAcroForm form = PdfAcroForm.GetAcroForm(doc, true);
            form.SetGenerateAppearance(true);

            // Get the list of possible form fields so we can implement setting them
            //var fields = form.GetFormFields();
            //foreach(var item in fields)
            //{
            //    Console.WriteLine(item.Key);
            //}

            // Sample setting the Last Name field
            var lastName = form.GetField("order.data.application.lastname");
            lastName.SetValue("McWhirter", true);

            var firstName = form.GetField("order.data.application.firstname");
            firstName.SetValue("Leslie", true);

            doc.Close();


            //stream.Flush(); //Always catches me out
            //stream.Position = 0; //Not sure if this is required

            //return File(stream, "application/pdf", "DownloadName.pdf");




            //    using (PdfReader pdfReader = new PdfReader(agencyFileName))
            //    {
            //        using (PdfStamper pdfStamper = new PdfStamper(pdfReader, new FileStream(agencyFileName, FileMode.Create)))
            //        {
            //            AcroFields pdfFormFields = pdfStamper.AcroFields;

            //            pdfFormFields.SetField("11", "Porumb");
            //            pdfFormFields.SetField("12", "Ofelia");


            //foreach (var field in this.textFields)
            //{
            //    //Locate the field
            //    IList<AcroFields.FieldPosition> fieldLocations = pdfFormFields.GetFieldPositions(field.FieldName);
            //    if (field.FieldText != null)
            //    {
            //        foreach (var location in fieldLocations)
            //        {
            //            canvas = pdfStamper.GetOverContent(location.page);
            //            position = location.position;

            //            ct = new ColumnText(canvas);
            //            ct.SetSimpleColumn(position);
            //            ct.SetLeading(field.FixedLeading, field.MultipliedLeading);
            //            ct.SetIndent(field.Indent, false);
            //            ct.AddText(new Phrase(field.FieldText));//Insert the value for the field
            //            ct.Go();
            //        }

            //        //Remove the field name so that it cannot be edited.
            //        pdfFormFields.RemoveField(field.FieldName);
            //    }
            //}


            //                pdfStamper.Close();
            //            }
            //        }


            //    //using (FileStream outFile = new FileStream(blobStream, FileMode.Create))
            //    //    {
            //    //        PdfReader pdfReader = new PdfReader(blobStream);
            //    //        PdfStamper pdfStamper = new PdfStamper(pdfReader, outFile);
            //    //        AcroFields fields = pdfStamper.AcroFields;

            //    //        fields.SetField("11", "Porumb");
            //    //        fields.SetField("12", "Ofelia");

            //    //        pdfStamper.FormFlattening = true;


            //            //Response.Headers.Append("Content-Disposition", "inline");
            //            //Response.Headers.Add("X-Content-Type-Options", "nosniff");

            //            return File(ms, "application/pdf", "DownloadName.pdf");
            //      //  }
            //    }

          
            //}
            //catch (Exception e)
            //{
            //    var originalException = e.GetBaseException();
            //    _logger.LogError(originalException, originalException.Message);
            //    throw new Exception("An error occur while trying to download agency file.");
        }
        return null!;
    }

    private void GetUserId(out string? userId)
    {
        userId = this.HttpContext.User.Claims
            .Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier")
            .Select(c => c.Value).FirstOrDefault();

        if (userId == null)
        {
            throw new ArgumentNullException("userId", "Invalid token.");
        }
    }
}