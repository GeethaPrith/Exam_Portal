using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;

namespace ExamPortal.Infrastructure.Services.Admin;

public class UserService : IUserService
{
    private readonly IUserRepository _repo;

    public UserService(IUserRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<User>> GetAllAsync() => _repo.GetAllAsync();

    public Task<User?> GetByIdAsync(Guid id) => _repo.GetByIdAsync(id);

    public async Task<User> CreateAsync(User user)
    {
        await _repo.AddAsync(user);
        await _repo.SaveChangesAsync();
        return user;
    }

    public async Task<bool> UpdateAsync(User user)
    {
        _repo.Update(user);
        return await _repo.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return false;

        user.IsDeleted = true;
        return await _repo.SaveChangesAsync();
    }
}
