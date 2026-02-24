using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Api.Models;

/// Represents a task item owned by a user.
/// Includes ordering metadata for list management.
[Table("TodoTasks")]
public class TodoTask
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; } = false;

    // Foreign Key
    [Required]
    public int UserId { get; set; }

    // Navigation property for accessing the task's parent user
    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;
}
