using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;

namespace ExamPortal.Infrastructure.Services.Admin;

public class RoleService : IRoleService
{
    private readonly IRoleRepository _repo;

    public RoleService(IRoleRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<Role>> GetAllAsync() => _repo.GetAllAsync();

    public Task<Role?> GetByIdAsync(Guid id) => _repo.GetByIdAsync(id);

    public async Task<Role> CreateAsync(Role role)
    {
        await _repo.AddAsync(role);
        await _repo.SaveChangesAsync();
        return role;
    }

    public async Task<bool> UpdateAsync(Role role)
    {
        _repo.Update(role);
        return await _repo.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return false;
        entity.IsDeleted = true;
        return await _repo.SaveChangesAsync();
    }
}
