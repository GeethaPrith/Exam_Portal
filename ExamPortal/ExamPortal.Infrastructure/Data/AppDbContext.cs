using ExamPortal.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExamPortal.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
    public DbSet<StudentSubscription> StudentSubscriptions { get; set; }
    public DbSet<TestCategory> TestCategories { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionOption> QuestionOptions { get; set; }
    public DbSet<StudentTestAttempt> StudentTestAttempts { get; set; }
    public DbSet<StudentAnswer> StudentAnswers { get; set; }
    public DbSet<StudentAnswerOption> StudentAnswerOptions { get; set; }
    public DbSet<Attachment> Attachments { get; set; }
}

