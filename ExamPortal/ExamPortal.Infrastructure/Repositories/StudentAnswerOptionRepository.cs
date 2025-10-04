using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class StudentAnswerOptionRepository : BaseRepository<StudentAnswerOption>, IStudentAnswerOptionRepository
{
    public StudentAnswerOptionRepository(AppDbContext context) : base(context) { }
}
