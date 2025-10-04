namespace ExamPortal.Core.Entities;

public class SubscriptionPlan
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Amount { get; set; }
    public int MaxQuestions { get; set; }
    public int MaxMockTests { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<StudentSubscription> StudentSubscriptions { get; set; }
}

