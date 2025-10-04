using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;

namespace ExamPortal.Infrastructure.Services.Admin;

public class SubscriptionPlanService : ISubscriptionPlanService
{
    private readonly ISubscriptionPlanRepository _repo;

    public SubscriptionPlanService(ISubscriptionPlanRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<SubscriptionPlan>> GetAllAsync() => _repo.GetAllAsync();

    public Task<SubscriptionPlan?> GetByIdAsync(Guid id) => _repo.GetByIdAsync(id);

    public async Task<SubscriptionPlan> CreateAsync(SubscriptionPlan plan)
    {
        await _repo.AddAsync(plan);
        await _repo.SaveChangesAsync();
        return plan;
    }

    public async Task<bool> UpdateAsync(SubscriptionPlan plan)
    {
        _repo.Update(plan);
        return await _repo.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return false;
        entity.IsDeleted = true;
        return await _repo.SaveChangesAsync();
    }
}
