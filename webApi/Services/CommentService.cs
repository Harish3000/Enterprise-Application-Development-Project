using MongoDB.Bson;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface ICommentService
    {
        Task<List<Comment>> GetAllComments();
        Task<Comment> GetCommentById(string id);
        Task<(Comment comment, string error)> CreateComment(CommentDto commentDto);
        Task<Comment> UpdateComment(CommentDto commentDto);
        Task<string> DeleteComment(string id);
        Task<List<Comment>> GetCommentsByUserId(string userId);
        Task<List<Comment>> GetCommentsByProductId(string productId);
    }

    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IProductService _productService;
        private readonly IUserService _userService;

        public CommentService(ICommentRepository commentRepository, IProductService productService, IUserService userService)
        {
            _commentRepository = commentRepository;
            _productService = productService;
            _userService = userService;
        }

        public async Task<List<Comment>> GetAllComments()
        {
            return await _commentRepository.GetAllComments();
        }

        public async Task<Comment> GetCommentById(string id)
        {
            var comment = await _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                throw new Exception($"Comment with id '{id}' not found.");
            }
            return comment;
        }

        public async Task<(Comment comment, string error)> CreateComment(CommentDto commentDto)
        {
            if (!ObjectId.TryParse(commentDto.ProductId, out _))
            {
                return (null, "Product Id does not exist.");
            }
            var existingProduct = await _productService.GetProductById(commentDto.ProductId);
            if (existingProduct == null)
            {
                return (null, "Product does not exist.");
            }

            var existingCustomer = await _userService.GetUserByUserName(commentDto.UserName);
            if (existingCustomer == null)
            {
                return (null, "User does not exist.");
            }

            var newComment = new Comment
            {
                ProductId = commentDto.ProductId,
                Description = commentDto.Description,
                UserId = existingCustomer.Id,
                UserName = commentDto.UserName
            };

            await _commentRepository.CreateComment(newComment);
            return (newComment, null);
        }

        public async Task<Comment> UpdateComment(CommentDto commentDto)
        {
            var existingComment = await _commentRepository.GetCommentById(commentDto.Id);
            if (existingComment == null)
            {
                throw new Exception($"Comment with id '{commentDto.Id}' not found.");
            }

            var updatedComment = new Comment
            {
                Id = existingComment.Id,
                ProductId = commentDto.ProductId,
                Description = commentDto.Description,
                UserId = existingComment.UserId,
                UserName = existingComment.UserName
            };

            await _commentRepository.UpdateComment(updatedComment);
            return updatedComment;
        }

        public async Task<string> DeleteComment(string id)
        {
            var existingComment = await _commentRepository.GetCommentById(id);
            if (existingComment == null)
            {
                return $"Comment with id '{id}' does not exist.";
            }

            await _commentRepository.DeleteComment(id);
            return null;
        }

        public async Task<List<Comment>> GetCommentsByUserId(string userId)
        {
            return await _commentRepository.GetCommentsByUserId(userId);
        }

        public async Task<List<Comment>> GetCommentsByProductId(string productId)
        {
            return await _commentRepository.GetCommentsByProductId(productId);
        }
    }
}
