﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace alpha_labs.Migrations
{
    /// <inheritdoc />
    public partial class AddingMonthNameForBirthdays : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MonthName",
                table: "Calendar.Birthdays",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MonthName",
                table: "Calendar.Birthdays");
        }
    }
}
