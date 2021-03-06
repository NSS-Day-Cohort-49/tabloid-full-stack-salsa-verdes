using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;



namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        private readonly IUserProfileRepository _userprofileRepository;


        public PostRepository(IConfiguration configuration, IUserProfileRepository userProfileRepository) : base(configuration) 
        {
            _userprofileRepository = userProfileRepository;
        }

        public List<Post> GetAll(int currentUserId)
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
                            IsByCurrentUser = currentUserId == DbUtils.GetInt(reader, "UserProfileId") ? true : false 
                        });

                    }
                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetById(int id, int currentUserId)
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
                            IsByCurrentUser = currentUserId == DbUtils.GetInt(reader, "UserProfileId") ? true : false

                        };
                    }
                    reader.Close();

                    return post;
                }
            }
        }






















































































        public void Add(Post post)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Content, ImageLocation, 
                                        CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                                        OUTPUT Inserted.Id
                                        VALUES (@title, @content, @imageLocation, SYSDateTime(), @publishDateTime,
                                        @isApproved, @categoryId, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", 1);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }

            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post SET 
                                        Title = @title,
                                        Content = @content,
                                        ImageLocation = @imageLocation,
                                        PublishDateTime = @publishDateTime,
                                        CategoryId = @categoryId
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetUserPostsById(int userProfileId)
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
                    LEFT JOIN Category c ON p.CategoryId = c.Id
                    LEFT JOIN UserProfile up ON p.UserProfileId = up.Id
                    WHERE p.UserProfileId = userProfileId 
                    AND 
                    p.IsApproved = 1 
                    AND 
                    p.PublishDateTime < SYSDATETIME()
                    ORDER BY p.PublishDateTime DESC; 
                    ";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>(userProfileId);


                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }

        public List<Post> GetAllPostsForUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation AS HeaderImage, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                    c.[Name] AS CategoryName,
                    up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime, up.ImageLocation AS AvatarImage, up.UserTypeId,
                    ut.[Name] AS UserTypeName
                    FROM Post p
                    LEFT JOIN Category c ON p.CategoryId = c.Id
                    LEFT JOIN UserProfile up ON p.UserProfileId = up.Id
                    LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                    WHERE p.UserProfileId = @userProfileId 
                    ORDER BY p.PublishDateTime DESC;                     
                    ";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>(userProfileId);


                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

    }
}
