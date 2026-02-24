using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Api.Models;

/// Represents an application user with authentication credentials.
[Table("Users")]
public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    // One-to-many relationship: User can have multiple TodoTasks
    public ICollection<TodoTask> TodoTasks { get; set; } = [];
}
