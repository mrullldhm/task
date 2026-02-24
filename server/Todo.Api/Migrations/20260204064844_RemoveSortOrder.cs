using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSortOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "TodoTasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "TodoTasks",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
