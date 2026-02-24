using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Api.Data;
using Todo.Api.Dtos;
using Todo.Api.Models;
using Todo.Api.Services;

namespace Todo.Api.Controllers;

/// Authentication and authorization operations.
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IPasswordHasher _passwordHasher;

    public AuthController(
        ApplicationDbContext context,
        ITokenService tokenService,
        IPasswordHasher passwordHasher
    )
    {
        _context = context;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    // POST: api/auth/register
    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<LoginResultDto>>> Register(
        [FromBody] RegisterRequestDto request
    )
    {
        // Validate email uniqueness
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest(
                ApiResponse<LoginResultDto>.Fail("User with this email already exists.")
            );
        }

        // Create new user
        var user = new User
        {
            Email = request.Email,
            PasswordHash = _passwordHasher.Hash(request.Password),
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Generate JWT token
        var token = _tokenService.CreateToken(user.Email, user.Id);
        var userDto = new UserDto(user.Id, user.Email);
        var data = new LoginResultDto(token, userDto);

        return Ok(ApiResponse<LoginResultDto>.Ok(data, "User signed up successfully"));
    }

    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResultDto>>> Login(
        [FromBody] LoginRequestDto request
    )
    {
        // Locate user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !_passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized(ApiResponse<LoginResultDto>.Fail("Invalid email or password."));
        }

        // Generate JWT token
        var token = _tokenService.CreateToken(user.Email, user.Id);
        var userDto = new UserDto(user.Id, user.Email);
        var data = new LoginResultDto(token, userDto);

        return Ok(ApiResponse<LoginResultDto>.Ok(data, "Login successful"));
    }
}
