using ExamPortal.Core.Entities;

namespace ExamPortal.Core.Admin;

public interface ITestCategoryService
{
    Task<IEnumerable<TestCategory>> GetAllAsync();
    Task<TestCategory?> GetByIdAsync(Guid id);
    Task<TestCategory> CreateAsync(TestCategory category);
    Task<bool> UpdateAsync(TestCategory category);
    Task<bool> DeleteAsync(Guid id);
}
