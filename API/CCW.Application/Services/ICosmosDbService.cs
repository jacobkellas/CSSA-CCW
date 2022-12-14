﻿using CCW.Application.Entities;


namespace CCW.Application.Services;

public interface ICosmosDbService
{
    Task<PermitApplication> AddAsync(PermitApplication application, CancellationToken cancellationToken);
    Task<PermitApplication?> GetLastApplicationAsync(string userEmail, bool isOrderId, bool isComplete, CancellationToken cancellationToken);
    Task<IEnumerable<PermitApplication>> GetAllUserApplicationsAsync(string userEmail, CancellationToken cancellationToken);
    Task<IEnumerable<History>> GetApplicationHistoryAsync(string applicationIdOrOrderId, CancellationToken cancellationToken, bool isOrderId = false);
    Task<IEnumerable<SummarizedPermitApplication>> GetAllApplicationsAsync(CancellationToken cancellationToken);
    Task<IEnumerable<SummarizedPermitApplication>> SearchApplicationsAsync(string searchValue, CancellationToken cancellationToken);
    Task UpdateUserApplicationAsync(PermitApplication application, CancellationToken cancellationToken);
    Task UpdateApplicationAsync(PermitApplication application, CancellationToken cancellationToken);
    Task DeleteUserApplicationAsync(string applicationId, CancellationToken cancellationToken);
    Task DeleteApplicationAsync(string applicationId, CancellationToken cancellationToken);
}
