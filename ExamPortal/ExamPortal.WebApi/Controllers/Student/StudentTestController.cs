using ExamPortal.Core.Students;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static ExamPortal.Core.Requests.StudentsRequestResponse;
using static ExamPortal.Core.ResponseDTO.CommonResponseDTO;

namespace ExamPortal.WebApi.Controllers.Student;

[ApiController]
[Route("api/student/tests")]
//[Authorize(Roles = "Student")]
[ApiExplorerSettings(GroupName = "Student")]
[Tags("StudentTests")]
public class StudentTestController : ControllerBase
{
    private readonly IStudentTestService _testService;

    public StudentTestController(IStudentTestService testService)
    {
        _testService = testService;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _testService.GetAllTestCategoriesAsync();
        var response = categories.Select(c => new TestCategoryResponse(c.Id, c.Name));
        return Ok(response);
    }

    [HttpGet("categories/{id}")]
    public async Task<IActionResult> GetCategoryDetail(Guid id)
    {
        var category = await _testService.GetTestCategoryDetailAsync(id);
        return category == null ? NotFound() : Ok(new TestCategoryResponse(category.Id, category.Name));
    }

    [HttpGet("categories/{id}/questions")]
    public async Task<IActionResult> GetQuestionsByCategory(Guid id)
    {
        var questions = await _testService.GetQuestionsByCategoryAsync(id);
        var response = questions.Select(q => new
        {
            q.Id,
            q.Title,
            q.Description,
            q.AnswerType,
            q.ImageUrl,
            Options = q.Options?.Select(o => new
            {
                o.Id,
                o.Text,
                o.ImageUrl
            })
        });
        return Ok(response);
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitTest([FromBody] SubmitTestRequest request)
    {
        var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(studentId)) return Unauthorized();

        var attempt = await _testService.SubmitTestAsync(Guid.Parse(studentId), request);
        return Ok(new { attempt.Id, attempt.TestCategoryId, attempt.StartedAt, attempt.CompletedAt });
    }

    [HttpGet("attempts")]
    public async Task<IActionResult> GetMyTestAttempts()
    {
        var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(studentId)) return Unauthorized();

        var attempts = await _testService.GetStudentTestAttemptsAsync(Guid.Parse(studentId));
        var response = attempts.Select(a => new
        {
            a.Id,
            a.TestCategoryId,
            a.StartedAt,
            a.CompletedAt,
            a.Score
        });
        return Ok(response);
    }
}