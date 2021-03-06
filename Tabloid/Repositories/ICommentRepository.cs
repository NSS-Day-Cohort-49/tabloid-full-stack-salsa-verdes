using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAll();
        List<Comment> GetCommentsByPostId(int id);
        void Add(Comment comment); 
    }
}
