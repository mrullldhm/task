using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace Todo.Api.Data;

/// Entity Framework Core database context
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<TodoTask> TodoTasks { get; set; }
}
