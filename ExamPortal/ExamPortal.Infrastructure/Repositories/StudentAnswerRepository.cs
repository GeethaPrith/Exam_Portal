using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class StudentAnswerRepository : BaseRepository<StudentAnswer>, IStudentAnswerRepository
{
    public StudentAnswerRepository(AppDbContext context) : base(context) { }
}