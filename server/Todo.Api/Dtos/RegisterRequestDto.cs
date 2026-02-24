using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Dtos;

public record class RegisterRequestDto
{
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}
