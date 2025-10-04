namespace ExamPortal.Core.Requests
{
    public class StudentsRequestResponse
    {
        public record StudentRegisterRequest(string FullName, string Email, string Password, string MobileNumber)
        {
            public StudentRegisterRequest() : this(default!, default!, default!, default!)
            {
            }
        }

        public record StudentLoginRequest(string Email, string Password);
        public record UpdateStudentProfileRequest(string FullName, string MobileNumber);
        public record StudentForgotPasswordRequest(string Email);
        public record StudentUpdatePasswordRequest(string NewPassword);
        public record StudentResponse(Guid Id, string FullName, string Email, string MobileNumber);


        public record BuySubscriptionRequest(Guid PlanId);
        public record StudentSubscriptionResponse(Guid Id, Guid PlanId, DateTime SubscribedOn, DateTime ExpiresOn);

        public record SubmitTestRequest(Guid TestCategoryId, List<SubmitAnswer> Answers);
        public record SubmitAnswer(Guid QuestionId, string? AnswerText, List<Guid>? SelectedOptionIds);
    }
}
