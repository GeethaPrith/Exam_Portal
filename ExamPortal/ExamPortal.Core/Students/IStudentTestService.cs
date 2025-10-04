using ExamPortal.Core.Entities;
using static ExamPortal.Core.Requests.StudentsRequestResponse;

namespace ExamPortal.Core.Students;

public interface IStudentTestService
{
    Task<List<TestCategory>> GetAllTestCategoriesAsync();
    Task<TestCategory?> GetTestCategoryDetailAsync(Guid id);
    Task<List<Question>> GetQuestionsByCategoryAsync(Guid testCategoryId);
    Task<StudentTestAttempt> SubmitTestAsync(Guid studentId, SubmitTestRequest request);
    Task<List<StudentTestAttempt>> GetStudentTestAttemptsAsync(Guid studentId);
}
