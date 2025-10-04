using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Core.Students;
using ExamPortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static ExamPortal.Core.Requests.StudentsRequestResponse;

namespace ExamPortal.Infrastructure.Services.Students;

public class StudentTestService : IStudentTestService
{
    private readonly IBaseRepository<TestCategory> _categoryRepo;
    private readonly IQuestionRepository _questionRepo;
    private readonly IBaseRepository<QuestionOption> _optionRepo;
    private readonly IBaseRepository<StudentTestAttempt> _attemptRepo;
    private readonly IBaseRepository<StudentAnswer> _answerRepo;
    private readonly IBaseRepository<StudentAnswerOption> _answerOptionRepo;

    private readonly AppDbContext _context;

    public StudentTestService(
        AppDbContext context,
        IBaseRepository<TestCategory> categoryRepo,
        IQuestionRepository questionRepo,
        IBaseRepository<QuestionOption> optionRepo,
        IBaseRepository<StudentTestAttempt> attemptRepo,
        IBaseRepository<StudentAnswer> answerRepo,
        IBaseRepository<StudentAnswerOption> answerOptionRepo)
    {
        _categoryRepo = categoryRepo;
        _questionRepo = questionRepo;
        _optionRepo = optionRepo;
        _attemptRepo = attemptRepo;
        _answerRepo = answerRepo;
        _answerOptionRepo = answerOptionRepo;
        _context = context;
    }

    public async Task<List<TestCategory>> GetAllTestCategoriesAsync()
    {
        var categories = await _categoryRepo.GetAllAsync();
        return categories
            .Where(c => c.IsActive && !c.IsDeleted)
            .ToList();
    }

    public async Task<TestCategory?> GetTestCategoryDetailAsync(Guid id)
        => await _categoryRepo.GetByIdAsync(id);

    public async Task<List<Question>> GetQuestionsByCategoryAsync(Guid testCategoryId)
    {
        return await _context.Questions
        .Include(q => q.Options)
        .Where(q => q.TestCategoryId == testCategoryId && q.IsActive && !q.IsDeleted)
        .ToListAsync();
    }

    public async Task<StudentTestAttempt> SubmitTestAsync(Guid studentId, SubmitTestRequest request)
    {
        var attempt = new StudentTestAttempt
        {
            Id = Guid.NewGuid(),
            StudentId = studentId,
            TestCategoryId = request.TestCategoryId,
            StartedAt = DateTime.UtcNow,
            CompletedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        };

        await _attemptRepo.AddAsync(attempt);

        int totalQuestions = request.Answers.Count;
        int correctAnswers = 0;

        foreach (var q in request.Answers)
        {
            var question = await _questionRepo.GetByIdAsync(q.QuestionId);
            if (question == null) continue;

            var answer = new StudentAnswer
            {
                Id = Guid.NewGuid(),
                StudentTestAttemptId = attempt.Id,
                QuestionId = q.QuestionId,
                AnswerText = q.AnswerText,
                CreatedAt = DateTime.UtcNow
            };

            // Initialize score logic
            bool? isCorrect = null;

            if (question.AnswerType is "SingleSelect" or "MultiSelect")
            {

                var correctOptionIds = (await _optionRepo
                    .GetAllAsync()).Where(o => o.QuestionId == q.QuestionId && o.IsCorrect)
                    .Select(o => o.Id)
                    .ToHashSet();

                var selectedOptionIds = q.SelectedOptionIds?.ToHashSet() ?? new();

                isCorrect = selectedOptionIds.SetEquals(correctOptionIds);
                if (isCorrect == true) correctAnswers++;
            }

            // For text inputs, we don’t auto evaluate
            answer.IsCorrect = isCorrect;

            await _answerRepo.AddAsync(answer);

            // Save selected options if any
            if (q.SelectedOptionIds?.Any() == true)
            {
                foreach (var optId in q.SelectedOptionIds)
                {
                    await _answerOptionRepo.AddAsync(new StudentAnswerOption
                    {
                        Id = Guid.NewGuid(),
                        StudentAnswerId = answer.Id,
                        QuestionOptionId = optId
                    });
                }
            }
        }

        // Set score
        attempt.Score = totalQuestions > 0
            ? Math.Round((decimal)correctAnswers / totalQuestions * 100, 2)
            : 0;

        _attemptRepo.Update(attempt);

        return attempt;
    }

    public async Task<List<StudentTestAttempt>> GetStudentTestAttemptsAsync(Guid studentId)
    {
        var attempts = await _attemptRepo.GetAllAsync();
        return attempts.Where(a => a.StudentId == studentId && !a.IsDeleted).ToList();
    }
}