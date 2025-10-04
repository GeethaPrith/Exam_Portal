using ExamPortal.Core.Admin;
using ExamPortal.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static ExamPortal.Core.Requests.CommonRequests;

namespace ExamPortal.WebApi.Controllers.Admin
{

    [ApiController]
    [Route("api/admin/auth")]
    [ApiExplorerSettings(GroupName = "Admin")]
    [Tags("Auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _authService.AuthenticateAsync(request.Email, request.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var token = JwtTokenGenerator.GenerateToken(user);
            return Ok(new { token });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            return Ok("Reset instructions sent.");
        }

        [HttpPost("update-password")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userService.GetByIdAsync(Guid.Parse(userId));
            if (user == null) return NotFound();

            user.PasswordHash = Utils.Hash(request.NewPassword);
            await _userService.UpdateAsync(user);
            return Ok("Password updated successfully.");
        }
    }
}
