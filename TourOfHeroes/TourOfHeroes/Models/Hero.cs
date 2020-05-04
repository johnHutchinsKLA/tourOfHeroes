using System.Collections.Generic;
using TourOfHeroes.Data;

namespace TourOfHeroes
{
    public class Hero : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public virtual ICollection<Power> Powers { get; set; }
    }
}