using ExamPortal.Core.Admin;
using ExamPortal.Core.Interfaces;
using ExamPortal.Core.Students;
using ExamPortal.Infrastructure.Data;
using ExamPortal.Infrastructure.Repositories;
using ExamPortal.Infrastructure.Services.Admin;
using ExamPortal.Infrastructure.Services.Students;
using Microsoft.EntityFrameworkCore;

namespace ExamPortal.WebApi.Extensions
{
    public static class ServiceExtensions
    {

        public static void AddDataAccess(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        }

        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<ITeacherRepository, TeacherRepository>();
            services.AddScoped<ISubscriptionPlanRepository, SubscriptionPlanRepository>();
            services.AddScoped<IStudentSubscriptionRepository, StudentSubscriptionRepository>();
            services.AddScoped<ITestCategoryRepository, TestCategoryRepository>();
            services.AddScoped<IQuestionRepository, QuestionRepository>();
            services.AddScoped<IQuestionOptionRepository, QuestionOptionRepository>();
            services.AddScoped<IStudentTestAttemptRepository, StudentTestAttemptRepository>();
            services.AddScoped<IStudentAnswerRepository, StudentAnswerRepository>();
            services.AddScoped<IStudentAnswerOptionRepository, StudentAnswerOptionRepository>();
            services.AddScoped<IAttachmentRepository, AttachmentRepository>();


            // Admin Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<ISubscriptionPlanService, SubscriptionPlanService>();
            services.AddScoped<ITestCategoryService, TestCategoryService>();


            //Student Services
            services.AddScoped<IStudentService, StudentService>();
            services.AddScoped<IStudentTestService, StudentTestService>();

        }
    }
}
