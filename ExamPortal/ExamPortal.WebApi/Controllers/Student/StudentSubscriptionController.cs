using ExamPortal.Core.Students;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static ExamPortal.Core.Requests.StudentsRequestResponse;
using static ExamPortal.Core.ResponseDTO.CommonResponseDTO;

namespace ExamPortal.WebApi.Controllers.Student
{
    [ApiController]
    [Route("api/student/subscription")]
   // [Authorize(Roles = "Student")]
    [ApiExplorerSettings(GroupName = "Student")]
    [Tags("StudentSubscription")]
    public class StudentSubscriptionController : ControllerBase
    {
        private readonly IStudentSubscriptionService _subscriptionService;

        public StudentSubscriptionController(IStudentSubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        [HttpGet("plans")]
        public async Task<IActionResult> GetPlans()
        {
            var plans = await _subscriptionService.GetAvailablePlansAsync();
            var response = plans.Select(p => new SubscriptionPlanResponse(p.Id, p.Name, p.Amount));
            return Ok(response);
        }

        [HttpPost("buy")]
        public async Task<IActionResult> BuyPlan([FromBody] BuySubscriptionRequest request)
        {
            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(studentId)) return Unauthorized();

            var sub = await _subscriptionService.BuySubscriptionAsync(Guid.Parse(studentId), request.PlanId);
            return Ok(new StudentSubscriptionResponse(sub.Id, sub.SubscriptionPlanId, sub.SubscribedOn, sub.ExpiresOn));
        }

        [HttpGet("my-subscriptions")]
        public async Task<IActionResult> MySubscriptions()
        {
            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(studentId)) return Unauthorized();

            var subs = await _subscriptionService.GetStudentSubscriptionsAsync(Guid.Parse(studentId));
            var response = subs.Select(s => new StudentSubscriptionResponse(s.Id, s.SubscriptionPlanId, s.SubscribedOn, s.ExpiresOn));
            return Ok(response);
        }
    }
}
