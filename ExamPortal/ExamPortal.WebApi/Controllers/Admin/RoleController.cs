using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static ExamPortal.Core.Requests.CommonRequests;
using static ExamPortal.Core.ResponseDTO.CommonResponseDTO;

namespace ExamPortal.WebApi.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/roles")]
    //[Authorize(Roles = "Admin")]
    [ApiExplorerSettings(GroupName = "Admin")]
    [Tags("Auth")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _service;
        public RoleController(IRoleService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _service.GetAllAsync();
            var response = roles.Select(r => new RoleResponse(r.Id, r.Name));
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var role = await _service.GetByIdAsync(id);
            return role == null ? NotFound() : Ok(new RoleResponse(role.Id, role.Name));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoleRequest request)
        {
            var role = new Role
            {
                Name = request.Name,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
            var created = await _service.CreateAsync(role);
            return Ok(new RoleResponse(created.Id, created.Name));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateRoleRequest request)
        {
            var role = await _service.GetByIdAsync(id);
            if (role == null) return NotFound();
            role.Name = request.Name;
            return Ok(await _service.UpdateAsync(role));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) => Ok(await _service.DeleteAsync(id));
    }
}
