using Domain.Base;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MainCategory : BaseEntity
    {
        public required string Name { get; set; }
        public State State { get; set; } 
        public ICollection<Category> Categories { get; set; } = new List<Category>();
        public MainCategory()
        {
            State = State.active;
        }
    }
}
