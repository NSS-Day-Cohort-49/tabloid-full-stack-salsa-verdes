using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        void Delete(int id);
        List<PostTag> Get(int postId);
    }
}