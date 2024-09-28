using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllComments();
        Task<Comment> GetCommentById(string id);
        Task<List<Comment>> GetCommentsByUserId(string userId);
        Task<List<Comment>> GetCommentsByProductId(string productId);
        Task CreateComment(Comment comment);
        Task UpdateComment(Comment comment);
        Task DeleteComment(string id);
    }

    public class CommentRepository : ICommentRepository
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentRepository(IMongoDatabase database)
        {
            _comments = database.GetCollection<Comment>("Comments");
        }

        public async Task<List<Comment>> GetAllComments()
        {
            return await _comments.Find(_ => true).ToListAsync();
        }

        public async Task<Comment> GetCommentById(string id)
        {
            return await _comments.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Comment>> GetCommentsByUserId(string userId)
        {
            return await _comments.Find(c => c.UserId == userId).ToListAsync();
        }

        public async Task<List<Comment>> GetCommentsByProductId(string productId)
        {
            return await _comments.Find(c => c.ProductId == productId).ToListAsync();
        }

        public async Task CreateComment(Comment comment)
        {
            await _comments.InsertOneAsync(comment);
        }

        public async Task UpdateComment(Comment comment)
        {
            await _comments.ReplaceOneAsync(c => c.Id == comment.Id, comment);
        }

        public async Task DeleteComment(string id)
        {
            await _comments.DeleteOneAsync(c => c.Id == id);
        }
    }
}
