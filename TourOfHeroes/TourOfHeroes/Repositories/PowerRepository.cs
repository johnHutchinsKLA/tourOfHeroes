using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoreLinq;
using TourOfHeroes.Data.EfCore;

namespace TourOfHeroes.Repositories
{
    public class PowerRepository : EfCoreRepository<Power, DatabaseContext>
    {
        private readonly DatabaseContext _context;
        
        public PowerRepository(DatabaseContext context) : base(context)
        {
            _context = context;
        }
        
        public async Task<List<Power>> GetAllDistinct()
        {
            return _context.Powers.ToListAsync().Result.DistinctBy(power => power.Name).OrderBy(power => power.Name).ToList();
        }
    }
}