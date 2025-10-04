using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static ExamPortal.Core.Requests.CommonRequests;
using static ExamPortal.Core.ResponseDTO.CommonResponseDTO;

namespace ExamPortal.WebApi.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/test-categories")]
    //[Authorize(Roles = "Admin")]
    [ApiExplorerSettings(GroupName = "Admin")]
    [Tags("Auth")]
    public class TestCategoryController : ControllerBase
    {
        private readonly ITestCategoryService _service;
        public TestCategoryController(ITestCategoryService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _service.GetAllAsync();
            var response = categories.Select(c => new TestCategoryResponse(c.Id, c.Name));
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var category = await _service.GetByIdAsync(id);
            return category == null ? NotFound() : Ok(new TestCategoryResponse(category.Id, category.Name));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTestCategoryRequest request)
        {
            var category = new TestCategory
            {
                Name = request.Name,
                Description = request.Description,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
            var created = await _service.CreateAsync(category);
            return Ok(new TestCategoryResponse(created.Id, created.Name));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateTestCategoryRequest request)
        {
            var category = await _service.GetByIdAsync(id);
            if (category == null) return NotFound();
            category.Name = request.Name;
            category.Description = request.Description;
            return Ok(await _service.UpdateAsync(category));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) => Ok(await _service.DeleteAsync(id));
    }
}
