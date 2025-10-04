namespace ExamPortal.Core.Entities;

public class Attachment
{
    public Guid Id { get; set; }

    public string EntityType { get; set; }     // e.g., 'Question', 'User', 'Student'
    public Guid EntityId { get; set; }

    public string FileUrl { get; set; }
    public string FileName { get; set; }
    public string MimeType { get; set; }
    public string Description { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
}

