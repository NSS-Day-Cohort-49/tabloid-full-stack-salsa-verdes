﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> Get();
        void Add(Tag tag);
        void Delete(int id);
    }
}