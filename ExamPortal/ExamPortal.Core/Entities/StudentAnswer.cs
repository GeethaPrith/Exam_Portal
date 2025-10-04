namespace ExamPortal.Core.Entities;

public class StudentAnswer
{
    public Guid Id { get; set; }

    public Guid StudentTestAttemptId { get; set; }
    public StudentTestAttempt StudentTestAttempt { get; set; }

    public Guid QuestionId { get; set; }
    public Question Question { get; set; }

    public string AnswerText { get; set; }
    public bool? IsCorrect { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<StudentAnswerOption> SelectedOptions { get; set; }
}
