using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class TeacherRepository : BaseRepository<Teacher>, ITeacherRepository
{
    public TeacherRepository(AppDbContext context) : base(context) { }
}