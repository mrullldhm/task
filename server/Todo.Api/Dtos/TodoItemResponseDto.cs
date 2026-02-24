namespace Todo.Api.DTOs;

public record TodoItemResponseDto(int Id, string Title, string? Description, bool IsCompleted);
