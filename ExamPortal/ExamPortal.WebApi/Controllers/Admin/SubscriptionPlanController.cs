using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static ExamPortal.Core.Requests.CommonRequests;
using static ExamPortal.Core.ResponseDTO.CommonResponseDTO;

namespace ExamPortal.WebApi.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/subscription-plans")]
    //[Authorize(Roles = "Admin")]
    [ApiExplorerSettings(GroupName = "Admin")]
    [Tags("Auth")]
    public class SubscriptionPlanController : ControllerBase
    {
        private readonly ISubscriptionPlanService _service;
        public SubscriptionPlanController(ISubscriptionPlanService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _service.GetAllAsync();
            var response = plans.Select(p => new SubscriptionPlanResponse(p.Id, p.Name, p.Amount));
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var plan = await _service.GetByIdAsync(id);
            return plan == null ? NotFound() : Ok(new SubscriptionPlanResponse(plan.Id, plan.Name, plan.Amount));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSubscriptionPlanRequest request)
        {
            var plan = new SubscriptionPlan
            {
                Name = request.Name,
                Amount = request.Amount,
                MaxQuestions = request.MaxQuestions,
                MaxMockTests = request.MockTestLimit,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
            var created = await _service.CreateAsync(plan);
            return Ok(new SubscriptionPlanResponse(created.Id, created.Name, created.Amount));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateSubscriptionPlanRequest request)
        {
            var plan = await _service.GetByIdAsync(id);
            if (plan == null) return NotFound();
            plan.Name = request.Name;
            plan.Amount = request.Amount;
            plan.MaxQuestions = request.MaxQuestions;
            plan.MaxMockTests = request.MockTestLimit;
            return Ok(await _service.UpdateAsync(plan));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) => Ok(await _service.DeleteAsync(id));
    }
}
