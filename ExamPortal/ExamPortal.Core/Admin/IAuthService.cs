using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Admin;

public interface IAuthService
{
    Task<User?> AuthenticateAsync(string email, string password);
}
