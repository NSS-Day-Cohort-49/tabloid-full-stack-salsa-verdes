using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }
        public List<Comment> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT c.Id, c.Subject, c.Content, 
                                            c.PostId, c.UserProfileId,
                                            p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
                                            p.PublishDateTime, p.CategoryId, p.UserProfileId,
                                            up.Id, up.DisplayName, up.FirstName, up.LastName, 
                                            up.Email, up.CreateDateTime, up.ImageLocation

                                        FROM Comment c
                                        JOIN Post p ON p.Id = c.PostId
                                        JOIN UserProfile up ON up.Id = c.UserProfileId
                                        JOIN Category cat ON p.CategoryId = cat.Id
                                        ORDER By p.CreateDateTIme DESC";
                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while(reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Subject = DbUtils.GetString(reader, "Subject"),
                Content = DbUtils.GetString(reader, "Content"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                PostId = DbUtils.GetInt(reader, "PostId"),
                Post = new Post()
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
            
    }
}
