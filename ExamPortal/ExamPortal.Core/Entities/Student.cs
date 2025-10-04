namespace ExamPortal.Core.Entities;


public class Student
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string MobileNumber { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<StudentSubscription> Subscriptions { get; set; }
    public ICollection<StudentTestAttempt> TestAttempts { get; set; }
}
