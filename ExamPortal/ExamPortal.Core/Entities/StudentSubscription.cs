namespace ExamPortal.Core.Entities;

public class StudentSubscription
{
    public Guid Id { get; set; }

    public Guid StudentId { get; set; }
    public Student Student { get; set; }

    public Guid SubscriptionPlanId { get; set; }
    public SubscriptionPlan SubscriptionPlan { get; set; }

    public DateTime SubscribedOn { get; set; }
    public DateTime ExpiresOn { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
}

