using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TourOfHeroes.Repositories;

namespace TourOfHeroes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeroesController : HeroesBaseController<Hero, HeroRepository>
    {
        private readonly HeroRepository _heroRepository;
        private readonly PowerRepository _powerRepository;
        
        public HeroesController(HeroRepository heroRepository, PowerRepository powerRepository) : base(heroRepository)
        {
            _heroRepository = heroRepository;
            _powerRepository = powerRepository;
        }
        
        [HttpGet("getHeroes")]
        public async Task<ActionResult<IEnumerable<Hero>>> GetAllInclude()
        {
            return await _heroRepository.GetAllInclude();

        }
        
        [HttpGet("getHero/{id}")]
        public async Task<ActionResult<Hero>> GetInclude(int id)
        {
            return await _heroRepository.GetInclude(id);

        }
        
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Put(int id, Hero hero)
        {
            if (id != hero.Id)
            {
                return BadRequest();
            }

            // Need to make a copy for our SyncPowers call.  Saw weird behavior when using the same
            // object for both update and sync.  
            var syncHero = new Hero {Id = hero.Id, Name = hero.Name, Powers = hero.Powers.ToList()};

            await _heroRepository.Update(hero);

            await SyncPowers(syncHero);

            return Ok(syncHero);
        }

        public async Task SyncPowers(Hero hero)
        {
            var databasePowers = _powerRepository.GetAll().Result.Where(power =>
            {
                return power.HeroId == hero.Id;
            });

            // For each currentPower, if not in hero.Powers list remove
            foreach (Power currentPower in databasePowers.ToList())
            {
                var foundPower = hero.Powers.Any(p =>
                {
                    return p.Name == currentPower.Name;
                });
                if (!foundPower)
                {
                    await _powerRepository.Delete(currentPower.Id);
                }
            }

            // For each new power, if not in currentPowers add
            foreach (Power currentPower in hero.Powers.ToList())
            {
                var foundPower = databasePowers.Any(p =>
                {
                    return p.Name == currentPower.Name;
                });
                if (!foundPower)
                {
                    await _powerRepository.Add(new Power{Name = currentPower.Name, HeroId = hero.Id});
                }
            }
        }
    }
}