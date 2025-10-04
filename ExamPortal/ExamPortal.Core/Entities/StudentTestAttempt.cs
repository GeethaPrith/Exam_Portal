namespace ExamPortal.Core.Entities;

public class StudentTestAttempt
{
    public Guid Id { get; set; }

    public Guid StudentId { get; set; }
    public Student Student { get; set; }

    public Guid TestCategoryId { get; set; }
    public TestCategory TestCategory { get; set; }

    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public decimal? Score { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<StudentAnswer> Answers { get; set; }
}

