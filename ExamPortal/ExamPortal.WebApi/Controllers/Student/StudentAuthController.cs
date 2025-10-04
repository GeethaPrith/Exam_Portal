using ExamPortal.Core.Entities;
using ExamPortal.Core.Students;
using ExamPortal.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static ExamPortal.Core.Requests.StudentsRequestResponse;

namespace ExamPortal.WebApi.Controllers.Student;

[ApiController]
[Route("api/student/auth")]
[ApiExplorerSettings(GroupName = "Student")]
[Tags("StudentAuth")]
public class StudentAuthController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentAuthController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] StudentRegisterRequest request)
    {

        var studentReq = new StudentRegisterRequest()
        {
            FullName = request.FullName,
            Email = request.Email,
            Password = Utils.Hash(request.Password),
            MobileNumber = request.MobileNumber,
        };
        var student = await _studentService.RegisterAsync(studentReq);

        return Ok(new StudentResponse(student.Id, student.FullName, student.Email, student.MobileNumber));
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] StudentLoginRequest request)
    {
        var student = await _studentService.AuthenticateAsync(request.Email, request.Password);
        if (student == null) return Unauthorized("Invalid credentials");

        var user = new User()
        {
            Id = student.Id,
            Email = student.Email,
            FullName = student.FullName
        };
        var token = JwtTokenGenerator.GenerateToken(user);
        return Ok(new { token });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] StudentForgotPasswordRequest request)
    {
        // Add token logic/email logic if needed
        return Ok("Reset link sent to email");
    }

    [HttpPost("update-password")]
    //[Authorize(Roles = "Student")]
    public async Task<IActionResult> UpdatePassword([FromBody] StudentUpdatePasswordRequest request)
    {
        var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(studentId)) return Unauthorized();
        await _studentService.UpdatePasswordAsync(Guid.Parse(studentId), request.NewPassword);
        return Ok("Password updated successfully");
    }

    [HttpGet("profile")]
    //[Authorize(Roles = "Student")]
    public async Task<IActionResult> GetProfile()
    {
        var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(studentId)) return Unauthorized();
        var student = await _studentService.GetByIdAsync(Guid.Parse(studentId));
        return Ok(new StudentResponse(student.Id, student.FullName, student.Email, student.MobileNumber));
    }

    [HttpPut("profile")]
    //[Authorize(Roles = "Student")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateStudentProfileRequest request)
    {
        var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(studentId)) return Unauthorized();
        var updated = await _studentService.UpdateProfileAsync(Guid.Parse(studentId), request);
        return Ok(new StudentResponse(updated.Id, updated.FullName, updated.Email, updated.MobileNumber));
    }
}
