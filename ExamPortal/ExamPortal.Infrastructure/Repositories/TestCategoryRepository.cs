using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class TestCategoryRepository : BaseRepository<TestCategory>, ITestCategoryRepository
{
    public TestCategoryRepository(AppDbContext context) : base(context) { }
}