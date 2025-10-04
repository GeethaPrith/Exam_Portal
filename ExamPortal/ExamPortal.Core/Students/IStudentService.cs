using ExamPortal.Core.Entities;
using static ExamPortal.Core.Requests.StudentsRequestResponse;

namespace ExamPortal.Core.Students;

public interface IStudentService
{
    Task<Student> RegisterAsync(StudentRegisterRequest request);
    Task<Student?> AuthenticateAsync(string email, string password);
    Task<bool> UpdatePasswordAsync(Guid studentId, string newPassword);
    Task<Student> GetByIdAsync(Guid studentId);
    Task<Student> UpdateProfileAsync(Guid studentId, UpdateStudentProfileRequest request);
}
