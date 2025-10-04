using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using ExamPortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ExamPortal.Infrastructure.Services.Admin;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> AuthenticateAsync(string email, string password)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password && !u.IsDeleted);
    }
}
