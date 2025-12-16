using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaydayCashTime.Migrations
{
    /// <inheritdoc />
    public partial class Second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    TransactionValue = table.Column<decimal>(type: "TEXT", nullable: true),
                    HaveInstallments = table.Column<bool>(type: "INTEGER", nullable: false),
                    TotalInstallments = table.Column<int>(type: "INTEGER", nullable: true),
                    WhoDid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
