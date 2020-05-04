using Microsoft.EntityFrameworkCore;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace TourOfHeroes.Data.EfCore
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Power> Powers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hero>().HasData(new Hero {Id=1, Name="Dr Nice"},
                new Hero {Id=2, Name="Narco"},
                new Hero {Id=3, Name="Bombasto"},
                new Hero {Id=4, Name="Celeritas"},
                new Hero {Id=5, Name="Magneta"},
                new Hero {Id=6, Name="RubberMan"},
                new Hero {Id=7, Name="Dynama"},
                new Hero {Id=8, Name="Dr IQ"},
                new Hero {Id=9, Name="Magma"},
                new Hero {Id=10, Name="Tornado"},
                new Hero {Id=11, Name="Wicker Man"});
            
            modelBuilder.Entity<Power>().HasData(new Power {Id=1, Name="Super Strength", HeroId=1},
                new Power {Id=2, Name="Flight", HeroId=1},
                new Power {Id=3, Name="Invisibility", HeroId=7},
                new Power {Id=4, Name="Laser Eyes", HeroId=2},
                new Power {Id=5, Name="Healing Factor", HeroId=2},
                new Power {Id=6, Name="Super Intelligence", HeroId=3},
                new Power {Id=7, Name="Telekinesis", HeroId=4},
                new Power {Id=8, Name="Telepathy", HeroId=5},
                new Power {Id=9, Name="Super Speed", HeroId=6},
                new Power {Id=10, Name="BEEEEEEEEEEEEEEEEEES", HeroId=11});
        }
    }
}