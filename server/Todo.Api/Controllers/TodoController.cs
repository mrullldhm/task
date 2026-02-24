using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Api.Data;
using Todo.Api.Dtos;
using Todo.Api.DTOs;
using Todo.Api.Models;

namespace Todo.Api.Controllers;

/// Manages CRUD operations for user task items.
[Route("api/tasks")]
[ApiController]
[Authorize]
public class TodoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TodoController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// Extracts the authenticated user's ID from JWT claims.
    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim!);
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<TodoItemResponseDto>>>> GetTasks()
    {
        var userId = GetCurrentUserId();

        var tasks = await _context
            .TodoTasks.Where(t => t.UserId == userId)
            .OrderByDescending(t => t.Id)
            .Select(t => new TodoItemResponseDto(t.Id, t.Title, t.Description, t.IsCompleted))
            .ToListAsync();

        return Ok(ApiResponse<IEnumerable<TodoItemResponseDto>>.Ok(tasks));
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<ApiResponse<TodoItemResponseDto>>> CreateTask(
        [FromBody] CreateTodoRequestDto request
    )
    {
        var userId = GetCurrentUserId();

        var task = new TodoTask
        {
            Title = request.Title,
            Description = request.Description,
            IsCompleted = false,
            UserId = userId,
        };

        _context.TodoTasks.Add(task);
        await _context.SaveChangesAsync();

        var responseDto = new TodoItemResponseDto(
            task.Id,
            task.Title,
            task.Description,
            task.IsCompleted
        );

        return CreatedAtAction(
            nameof(GetTasks),
            ApiResponse<TodoItemResponseDto>.Ok(responseDto, "Task created")
        );
    }

    // PUT: api/tasks/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<TodoItemResponseDto>>> UpdateTask(
        int id,
        [FromBody] UpdateTodoRequestDto request
    )
    {
        var userId = GetCurrentUserId();

        var task = await _context.TodoTasks.FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
            return NotFound(ApiResponse<TodoItemResponseDto>.Fail("Task not found"));

        if (task.UserId != userId)
            return Forbid();

        task.Title = request.Title;
        task.Description = request.Description;
        task.IsCompleted = request.IsCompleted;

        await _context.SaveChangesAsync();

        var responseDto = new TodoItemResponseDto(
            task.Id,
            task.Title,
            task.Description,
            task.IsCompleted
        );
        return Ok(ApiResponse<TodoItemResponseDto>.Ok(responseDto, "Task updated"));
    }

    // DELETE: api/tasks/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteTask(int id)
    {
        var userId = GetCurrentUserId();

        var task = await _context.TodoTasks.FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
            return NotFound(ApiResponse<string>.Fail("Task not found"));

        if (task.UserId != userId)
            return Forbid();

        _context.TodoTasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok(ApiResponse<string>.Ok(null!, "Task deleted successfully"));
    }
}
