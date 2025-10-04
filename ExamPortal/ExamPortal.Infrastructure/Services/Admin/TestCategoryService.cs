using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;

namespace ExamPortal.Infrastructure.Services.Admin;

public class TestCategoryService : ITestCategoryService
{
    private readonly ITestCategoryRepository _repo;

    public TestCategoryService(ITestCategoryRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<TestCategory>> GetAllAsync() => _repo.GetAllAsync();

    public Task<TestCategory?> GetByIdAsync(Guid id) => _repo.GetByIdAsync(id);

    public async Task<TestCategory> CreateAsync(TestCategory category)
    {
        await _repo.AddAsync(category);
        await _repo.SaveChangesAsync();
        return category;
    }

    public async Task<bool> UpdateAsync(TestCategory category)
    {
        _repo.Update(category);
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
