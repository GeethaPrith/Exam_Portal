using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Interfaces;

public interface ISubscriptionPlanRepository : IBaseRepository<SubscriptionPlan>
{
    Task<IEnumerable<SubscriptionPlan>> GetActivePlansAsync();
}
