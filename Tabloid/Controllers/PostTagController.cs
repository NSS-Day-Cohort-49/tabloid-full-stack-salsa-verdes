using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;
using Tabloid.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;

        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            try
            {
                _postTagRepository.Add(postTag);
                return Ok(postTag);
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return BadRequest();
        }
    }
}
