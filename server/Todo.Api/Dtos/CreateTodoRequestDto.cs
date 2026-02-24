using System.ComponentModel.DataAnnotations;

namespace Todo.Api.DTOs;

public record CreateTodoRequestDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; init; } = string.Empty;

    public string? Description { get; init; }
}
