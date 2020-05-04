using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TourOfHeroes.Data;

namespace TourOfHeroes.Controllers
{
    [Microsoft.AspNetCore.Components.Route("controller")]
    [ApiController]
    public abstract class HeroesBaseController<TEntity, TRepository> : ControllerBase
        where TEntity : class, IEntity
        where TRepository : IRepository<TEntity>
    {
        private readonly TRepository _repository;

        public HeroesBaseController(TRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var hero = await _repository.Get(id);
            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TEntity hero)
        {
            if (id != hero.Id)
            {
                return BadRequest();
            }

            await _repository.Update(hero);
            return Ok(hero);
        }

        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity hero)
        {
            await _repository.Add(hero);
            var returnHero = await _repository.Get(hero.Id);
            return Ok(returnHero);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(int id)
        {
            var hero = await _repository.Delete(id);
            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }
        
    }
}