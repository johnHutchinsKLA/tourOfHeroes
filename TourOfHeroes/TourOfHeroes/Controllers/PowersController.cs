using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TourOfHeroes.Repositories;

namespace TourOfHeroes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PowersController : HeroesBaseController<Power, PowerRepository>
    {
        private readonly PowerRepository _powerRepository;

        public PowersController(PowerRepository powerRepository) : base(powerRepository)
        {
            _powerRepository = powerRepository;
        }
        
        [HttpGet("getPowers")]
        public async Task<ActionResult<IEnumerable<Power>>> GetAllDistinct()
        {
            return await _powerRepository.GetAllDistinct();
        }
    }
}