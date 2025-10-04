namespace ExamPortal.Core.Entities;

public class Role
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<User> Users { get; set; }
}

