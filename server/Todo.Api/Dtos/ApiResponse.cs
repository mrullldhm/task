namespace Todo.Api.Dtos;

public record ApiResponse<T>
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
    public T Data { get; init; } = default!;

    // Factory methods for cleaner usage
    public static ApiResponse<T> Ok(T data, string message = "Operation successful") =>
        new()
        {
            Success = true,
            Message = message,
            Data = data,
        };

    public static ApiResponse<T> Fail(string message, T? data = default) =>
        new()
        {
            Success = false,
            Message = message,
            Data = data!,
        };
}
