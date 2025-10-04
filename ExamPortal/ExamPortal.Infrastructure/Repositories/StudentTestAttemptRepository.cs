using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class StudentTestAttemptRepository : BaseRepository<StudentTestAttempt>, IStudentTestAttemptRepository
{
    public StudentTestAttemptRepository(AppDbContext context) : base(context) { }
}
