using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Admin;

public interface IRoleService
{
    Task<IEnumerable<Role>> GetAllAsync();
    Task<Role?> GetByIdAsync(Guid id);
    Task<Role> CreateAsync(Role role);
    Task<bool> UpdateAsync(Role role);
    Task<bool> DeleteAsync(Guid id);
}
