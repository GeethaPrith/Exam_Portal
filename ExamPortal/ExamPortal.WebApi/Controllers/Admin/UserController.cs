using ExamPortal.Core.Admin;
using ExamPortal.Core.Entities;
using ExamPortal.WebApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using static ExamPortal.Core.Requests.CommonRequests;
using static ExamPortal.Core.ResponseDTO.CommonResponseDTO;

namespace ExamPortal.WebApi.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    //[Authorize(Roles = "Admin")]
    [ApiExplorerSettings(GroupName = "Admin")]
    [Tags("Auth")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllAsync();
            var response = users.Select(u => new UserResponse(u.Id, u.FullName, u.Email));
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _service.GetByIdAsync(id);
            return result == null ? NotFound()
            : Ok(new UserResponse(result.Id, result.FullName, result.Email));
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequest request)
        {
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = Utils.Hash(request.Password),
                RoleId = request.RoleId,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
            var created = await _service.CreateAsync(user);
            return Ok(new UserResponse(created.Id, created.FullName, created.Email));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, User user)
        {
            if (id != user.Id) return BadRequest();
            return Ok(await _service.UpdateAsync(user));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) => Ok(await _service.DeleteAsync(id));
    }
}
