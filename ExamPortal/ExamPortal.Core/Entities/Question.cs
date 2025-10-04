namespace ExamPortal.Core.Entities;

public class Question
{
    public Guid Id { get; set; }

    public Guid TestCategoryId { get; set; }
    public TestCategory TestCategory { get; set; }

    public string Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string AnswerType { get; set; } // 'SingleSelect', 'MultiSelect', 'TextBox', 'TextArea'

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<QuestionOption> Options { get; set; }
    public ICollection<StudentAnswer> Answers { get; set; }
}

