using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace Tabloid.Repositories
{

    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT Id, [Name]
                 FROM Category";

                    var reader = cmd.ExecuteReader();

                    var videos = new List<Category>();
                    while (reader.Read())
                    {
                        videos.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return videos;
                }
            }
        }
    }
}