using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class QuestionOptionRepository : BaseRepository<QuestionOption>, IQuestionOptionRepository
{
    public QuestionOptionRepository(AppDbContext context) : base(context) { }
}