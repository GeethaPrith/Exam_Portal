using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class StudentSubscriptionRepository : BaseRepository<StudentSubscription>, IStudentSubscriptionRepository
{
    public StudentSubscriptionRepository(AppDbContext context) : base(context) { }
}