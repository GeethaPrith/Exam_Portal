using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Core.Students;

namespace ExamPortal.Infrastructure.Services.Students;

public class StudentSubscriptionService : IStudentSubscriptionService
{
    private readonly ISubscriptionPlanRepository _planRepo;
    private readonly IStudentSubscriptionRepository _studentSubRepo;

    public StudentSubscriptionService(
        ISubscriptionPlanRepository planRepo,
        IStudentSubscriptionRepository studentSubRepo)
    {
        _planRepo = planRepo;
        _studentSubRepo = studentSubRepo;
    }

    public async Task<List<SubscriptionPlan>> GetAvailablePlansAsync()
    {
        return (List<SubscriptionPlan>)await _planRepo.GetActivePlansAsync();
    }

    public async Task<StudentSubscription> BuySubscriptionAsync(Guid studentId, Guid planId)
    {
        var plan = await _planRepo.GetByIdAsync(planId);
        if (plan == null || plan.IsDeleted || !plan.IsActive)
            throw new Exception("Invalid plan");

        var sub = new StudentSubscription
        {
            Id = Guid.NewGuid(),
            StudentId = studentId,
            SubscriptionPlanId = planId,
            SubscribedOn = DateTime.UtcNow,
            ExpiresOn = DateTime.UtcNow.AddDays(30),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _studentSubRepo.AddAsync(sub);

        return sub;
    }

    public async Task<List<StudentSubscription>> GetStudentSubscriptionsAsync(Guid studentId)
    {
        var subs = await _studentSubRepo.GetAllAsync();
        return subs.Where(s => s.IsActive).ToList();
    }
}
