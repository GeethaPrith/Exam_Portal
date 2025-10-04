namespace ExamPortal.Core.Requests
{
    public class CommonRequests
    {
        public record CreateUserRequest(string FullName, Guid RoleId, string Email, string Password);
        public record CreateRoleRequest(string? Id, string Name);
        public record CreateSubscriptionPlanRequest(string? Id, string Name, decimal Amount, int MaxQuestions, int MockTestLimit);
        public record CreateTestCategoryRequest(string? Id, string Name, string? Description, Guid? AttachmentId);

        public record LoginRequest(string Email, string Password);
        public record ForgotPasswordRequest(string Email);
        public record UpdatePasswordRequest(string NewPassword);
    }
}
