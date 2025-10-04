using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ExamPortal.Infrastructure.Repositories;

public class StudentRepository : BaseRepository<Student>, IStudentRepository
{
    private readonly AppDbContext _context;

    public StudentRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Student?> GetByEmailAsync(string email)
    {
        return await _context.Students
            .FirstOrDefaultAsync(s => s.Email == email && !s.IsDeleted);
    }
}
