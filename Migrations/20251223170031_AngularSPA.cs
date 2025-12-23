using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaydayCashTime.Migrations
{
    /// <inheritdoc />
    public partial class AngularSPA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExitJoin",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExitJoin",
                table: "Transactions");
        }
    }
}
