using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Interfaces;

public interface IStudentRepository : IBaseRepository<Student>
{
    Task<Student?> GetByEmailAsync(string email);
}