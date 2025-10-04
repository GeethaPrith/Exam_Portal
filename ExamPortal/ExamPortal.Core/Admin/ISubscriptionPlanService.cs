using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Admin;

public interface ISubscriptionPlanService
{
    Task<IEnumerable<SubscriptionPlan>> GetAllAsync();
    Task<SubscriptionPlan?> GetByIdAsync(Guid id);
    Task<SubscriptionPlan> CreateAsync(SubscriptionPlan plan);
    Task<bool> UpdateAsync(SubscriptionPlan plan);
    Task<bool> DeleteAsync(Guid id);
}
