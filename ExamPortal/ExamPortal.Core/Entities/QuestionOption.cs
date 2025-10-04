namespace ExamPortal.Core.Entities;

public class QuestionOption
{
    public Guid Id { get; set; }

    public Guid QuestionId { get; set; }
    public Question Question { get; set; }

    public string Text { get; set; }
    public string ImageUrl { get; set; }
    public bool IsCorrect { get; set; }

    public ICollection<StudentAnswerOption> StudentAnswerOptions { get; set; }
}

