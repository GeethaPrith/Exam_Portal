using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Students;

public interface IStudentSubscriptionService
{
    Task<List<SubscriptionPlan>> GetAvailablePlansAsync();
    Task<StudentSubscription> BuySubscriptionAsync(Guid studentId, Guid planId);
    Task<List<StudentSubscription>> GetStudentSubscriptionsAsync(Guid studentId);
}
