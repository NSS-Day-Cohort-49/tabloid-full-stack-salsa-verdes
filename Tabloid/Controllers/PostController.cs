using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Repositories;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAll();

            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("myPosts")]
        public IActionResult GetLoggedInUserPosts()
        {
            var loggedInUser = GetCurrentUserProfileId();
            var fireBaseUser = _userProfileRepository.GetByFirebaseUserId(loggedInUser);
            var posts = _postRepository.GetAllPostsForUser(fireBaseUser.Id);
            return Ok(posts);
        }

        private string GetCurrentUserProfileId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }
    }
}
