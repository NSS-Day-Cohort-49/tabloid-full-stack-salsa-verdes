using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            var currentUserId = GetCurrentUserProfile().Id;
            var posts = _postRepository.GetAll(currentUserId);

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

























































































        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.UserProfileId = GetCurrentUserProfile().Id;
            try
            {
                _postRepository.Add(post);
                return CreatedAtAction("Get", new { id = post.Id }, post);
        }
            catch
            {
                return BadRequest();
    }
}
            [HttpPut]
            public IActionResult Update(Post post)
            {
            try
            {
                _postRepository.Update(post);

                    return Ok(post);
            }
            catch
            {
                return BadRequest();
            }
        }
        }
    }

