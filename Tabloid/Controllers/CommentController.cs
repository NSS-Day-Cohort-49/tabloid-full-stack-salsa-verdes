using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var comments = _commentRepository.GetAll();
            return Ok(comments);
        }
        


        [HttpGet("GetCommentsByPost/{id}")]
        public IActionResult GetCommentsByPost(int id)
        {
            var comments = _commentRepository.GetCommentsByPostId(id);
            if (comments == null)
            {
                return null;
            }
            return Ok(comments);
        }

    }
}
