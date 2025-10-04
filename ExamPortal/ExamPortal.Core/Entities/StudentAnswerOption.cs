namespace ExamPortal.Core.Entities;

public class StudentAnswerOption
{
    public Guid Id { get; set; }

    public Guid StudentAnswerId { get; set; }
    public StudentAnswer StudentAnswer { get; set; }

    public Guid QuestionOptionId { get; set; }
    public QuestionOption QuestionOption { get; set; }
}

