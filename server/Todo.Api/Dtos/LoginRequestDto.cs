using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Dtos;

public record class LoginRequestDto
{
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
