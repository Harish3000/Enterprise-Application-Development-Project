// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: CommentRepository for handling operations related to comments 
// in the system, including retrieval, creation, update, and deletion.
// -----------------------------------------------------------------------------

using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface ICommentRepository
    {
        // Retrieves all comments from the database
        Task<List<Comment>> GetAllComments();

        // Retrieves a specific comment by its ID
        Task<Comment> GetCommentById(string id);

        // Retrieves all comments made by a specific user
        Task<List<Comment>> GetCommentsByUserId(string userId);

        // Retrieves all comments associated with a specific product
        Task<List<Comment>> GetCommentsByProductId(string productId);

        // Creates a new comment in the database
        Task CreateComment(Comment comment);

        // Updates an existing comment in the database
        Task UpdateComment(Comment comment);

        // Deletes a comment from the database by its ID
        Task DeleteComment(string id);
    }

    public class CommentRepository : ICommentRepository
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentRepository(IMongoDatabase database)
        {
            // Initializes the comments collection from the MongoDB database
            _comments = database.GetCollection<Comment>("Comments");
        }

        // Retrieves all comments from the database
        public async Task<List<Comment>> GetAllComments()
        {
            return await _comments.Find(_ => true).ToListAsync();
        }

        // Retrieves a specific comment by its ID
        public async Task<Comment> GetCommentById(string id)
        {
            return await _comments.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        // Retrieves all comments made by a specific user
        public async Task<List<Comment>> GetCommentsByUserId(string userId)
        {
            return await _comments.Find(c => c.UserId == userId).ToListAsync();
        }

        // Retrieves all comments associated with a specific product
        public async Task<List<Comment>> GetCommentsByProductId(string productId)
        {
            return await _comments.Find(c => c.ProductId == productId).ToListAsync();
        }

        // Creates a new comment in the database
        public async Task CreateComment(Comment comment)
        {
            await _comments.InsertOneAsync(comment);
        }

        // Updates an existing comment in the database
        public async Task UpdateComment(Comment comment)
        {
            await _comments.ReplaceOneAsync(c => c.Id == comment.Id, comment);
        }

        // Deletes a comment from the database by its ID
        public async Task DeleteComment(string id)
        {
            await _comments.DeleteOneAsync(c => c.Id == id);
        }
    }
}
