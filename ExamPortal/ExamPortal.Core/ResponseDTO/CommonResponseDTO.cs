
namespace ExamPortal.Core.ResponseDTO
{
    public class CommonResponseDTO
    {
        public record UserResponse(Guid Id, string FullName, string Email);
        public record RoleResponse(Guid Id, string Name);
        public record SubscriptionPlanResponse(Guid Id, string Name, decimal Amount);
        public record TestCategoryResponse(Guid Id, string Name);
    }
}
