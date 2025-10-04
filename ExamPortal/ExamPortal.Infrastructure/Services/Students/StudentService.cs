using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Core.Students;
using ExamPortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static ExamPortal.Core.Requests.StudentsRequestResponse;

namespace ExamPortal.Infrastructure.Services.Students;

public class StudentService : IStudentService
{
    private readonly IBaseRepository<Student> _studentRepo;
    private readonly AppDbContext _context;

    public StudentService(AppDbContext context, IBaseRepository<Student> studentRepo)
    {
        _context = context;
        _studentRepo = studentRepo;
    }

    public async Task<Student> RegisterAsync(StudentRegisterRequest studentReq)
    {
        var student = new Student()
        {
            FullName = studentReq.FullName,
            Email = studentReq.Email,
            PasswordHash = studentReq.Password,
            MobileNumber = studentReq.MobileNumber,
            IsActive = true,
            IsDeleted = false,
        };

        await _studentRepo.AddAsync(student);
        await _studentRepo.SaveChangesAsync();
        return student;
    }

    public async Task<Student?> AuthenticateAsync(string email, string password)
    {
        return await _context.Students
            .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password && !u.IsDeleted);
    }

    public async Task<bool> UpdatePasswordAsync(Guid studentId, string newPassword)
    {
        var student = await _studentRepo.GetByIdAsync(studentId);
        if (student == null) throw new Exception("Student not found");
        _studentRepo.Update(student);
        return await _studentRepo.SaveChangesAsync();
    }

    public async Task<Student> GetByIdAsync(Guid studentId)
    {
        var student = await _studentRepo.GetByIdAsync(studentId);
        if (student == null) throw new Exception("Student not found");
        return student;
    }

    public async Task<Student> UpdateProfileAsync(Guid studentId, UpdateStudentProfileRequest request)
    {
        var student = await _studentRepo.GetByIdAsync(studentId);
        if (student == null) throw new Exception("Student not found");

        student.FullName = request.FullName;
        student.MobileNumber = request.MobileNumber;

        _studentRepo.Update(student);
        await _studentRepo.SaveChangesAsync();
        return student;
    }
}
