using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using System.Linq;
using Tabloid.Utils;
using Microsoft.Extensions.Configuration;


namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
	                        c.[Name],
	                        up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime, up.ImageLocation

                        FROM Post p
                        JOIN Category c ON p.CategoryId = c.Id
                        JOIN UserProfile up ON p.UserProfileId = up.Id
                        WHERE p.IsApproved = 1
                        AND p.PublishDateTime < SYSDATETIME()
                        ORDER BY p.PublishDateTime DESC;
                    ";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            },
                        });

                    }
                        reader.Close();

                        return posts;
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, 
                            p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                            c.[Name],
	                        up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime, up.ImageLocation

                            FROM Post p
                            JOIN Category c ON p.CategoryId = c.Id
                            JOIN UserProfile up ON p.UserProfileId = up.Id
                            WHERE p.IsApproved = 1
                            AND p.PublishDateTime < SYSDATETIME()                          
                            AND p.Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            },

                        };
                    }
                    reader.Close();

                    return post;
                }
            }
        }

        public void Add()
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(Post post)
        {
            throw new NotImplementedException();
        }
    }
}
