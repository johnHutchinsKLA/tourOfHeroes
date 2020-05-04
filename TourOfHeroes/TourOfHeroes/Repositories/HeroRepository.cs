using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TourOfHeroes.Data.EfCore;

namespace TourOfHeroes.Repositories
{
    public class HeroRepository : EfCoreRepository<Hero, DatabaseContext>
    {
        private readonly DatabaseContext _context;
        
        public HeroRepository(DatabaseContext context) : base(context)
        {
            _context = context;
        }
        
        public async Task<List<Hero>> GetAllInclude()
        {
            return await _context.Heroes.Include(h => h.Powers).OrderBy(x => x.Id).ToListAsync();
        }
        
        public async Task<Hero> GetInclude(int id)
        {
            return await _context.Heroes.Include(h => h.Powers).Where( h => h.Id == id).FirstAsync();
        }
    }
}