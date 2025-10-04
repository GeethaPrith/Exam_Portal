namespace ExamPortal.Core.Entities;

public class TestCategory
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<Question> Questions { get; set; }
    public ICollection<StudentTestAttempt> TestAttempts { get; set; }
}

