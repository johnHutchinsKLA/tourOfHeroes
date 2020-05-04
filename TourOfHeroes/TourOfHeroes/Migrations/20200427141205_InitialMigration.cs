using Microsoft.EntityFrameworkCore.Migrations;

namespace TourOfHeroes.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Heroes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Heroes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Powers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    HeroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Powers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Powers_Heroes_HeroId",
                        column: x => x.HeroId,
                        principalTable: "Heroes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Heroes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Dr Nice" },
                    { 2, "Narco" },
                    { 3, "Bombasto" },
                    { 4, "Celeritas" },
                    { 5, "Magneta" },
                    { 6, "RubberMan" },
                    { 7, "Dynama" },
                    { 8, "Dr IQ" },
                    { 9, "Magma" },
                    { 10, "Tornado" },
                    { 11, "Wicker Man" }
                });

            migrationBuilder.InsertData(
                table: "Powers",
                columns: new[] { "Id", "HeroId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Super Strength" },
                    { 2, 1, "Flight" },
                    { 4, 2, "Laser Eyes" },
                    { 5, 2, "Healing Factor" },
                    { 6, 3, "Super Intelligence" },
                    { 7, 4, "Telekinesis" },
                    { 8, 5, "Telepathy" },
                    { 9, 6, "Super Speed" },
                    { 3, 7, "Invisibility" },
                    { 10, 11, "BEEEEEEEEEEEEEEEEEES" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Powers_HeroId",
                table: "Powers",
                column: "HeroId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Powers");

            migrationBuilder.DropTable(
                name: "Heroes");
        }
    }
}
