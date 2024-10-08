// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: CommentService for handling operations related to comments,
// including fetching, creating, updating, and deleting comments, as well as
// retrieving comments by user or product.
// -----------------------------------------------------------------------------

using MongoDB.Bson;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface ICommentService
    {
        // Retrieves all comments
        Task<List<Comment>> GetAllComments();

        // Retrieves a comment by its ID
        Task<Comment> GetCommentById(string id);

        // Creates a new comment and returns the comment along with any error message
        Task<(Comment comment, string error)> CreateComment(CommentDto commentDto);

        // Updates an existing comment and returns the updated comment
        Task<Comment> UpdateComment(CommentDto commentDto);

        // Deletes a comment by its ID and returns an error message if not found
        Task<string> DeleteComment(string id);

        // Retrieves all comments made by a specific user
        Task<List<Comment>> GetCommentsByUserId(string userId);

        // Retrieves all comments for a specific product
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

        // Retrieves all comments
        public async Task<List<Comment>> GetAllComments()
        {
            return await _commentRepository.GetAllComments();
        }

        // Retrieves a comment by its ID
        public async Task<Comment> GetCommentById(string id)
        {
            var comment = await _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                throw new Exception($"Comment with id '{id}' not found.");
            }
            return comment; // Return the found comment
        }

        // Creates a new comment and returns the comment along with any error message
        public async Task<(Comment comment, string error)> CreateComment(CommentDto commentDto)
        {
            // Check if ProductId is a valid ObjectId
            if (!ObjectId.TryParse(commentDto.ProductId, out _))
            {
                return (null, "Product Id does not exist.");
            }

            var existingProduct = await _productService.GetProductById(commentDto.ProductId);
            if (existingProduct == null)
            {
                return (null, "Product does not exist."); // Product not found
            }

            var existingCustomer = await _userService.GetUserByUserName(commentDto.UserName);
            if (existingCustomer == null)
            {
                return (null, "User does not exist."); // User not found
            }

            // Create a new Comment object
            var newComment = new Comment
            {
                ProductId = commentDto.ProductId,
                Description = commentDto.Description,
                UserId = existingCustomer.Id,
                UserName = commentDto.UserName
            };

            await _commentRepository.CreateComment(newComment);
            return (newComment, null); // Return the created comment
        }

        // Updates an existing comment and returns the updated comment
        public async Task<Comment> UpdateComment(CommentDto commentDto)
        {
            var existingComment = await _commentRepository.GetCommentById(commentDto.Id);
            if (existingComment == null)
            {
                throw new Exception($"Comment with id '{commentDto.Id}' not found."); // Comment not found
            }

            // Verify if the user is authorized to edit the comment
            var userVerify = existingComment.UserName == commentDto.UserName;
            if (!userVerify)
            {
                throw new Exception($"User Not authorized to edit '{commentDto.Id}'."); // Unauthorized access
            }

            // Create an updated Comment object
            var updatedComment = new Comment
            {
                Id = existingComment.Id,
                ProductId = commentDto.ProductId,
                Description = commentDto.Description,
                UserId = existingComment.UserId,
                UserName = existingComment.UserName
            };

            await _commentRepository.UpdateComment(updatedComment);
            return updatedComment; // Return the updated comment
        }

        // Deletes a comment by its ID and returns an error message if not found
        public async Task<string> DeleteComment(string id)
        {
            var existingComment = await _commentRepository.GetCommentById(id);
            if (existingComment == null)
            {
                return $"Comment with id '{id}' does not exist."; // Comment not found
            }

            await _commentRepository.DeleteComment(id); // Perform the delete operation
            return null; // Return null if deletion is successful
        }

        // Retrieves all comments made by a specific user
        public async Task<List<Comment>> GetCommentsByUserId(string userId)
        {
            return await _commentRepository.GetCommentsByUserId(userId); // Return comments for the specified user
        }

        // Retrieves all comments for a specific product
        public async Task<List<Comment>> GetCommentsByProductId(string productId)
        {
            return await _commentRepository.GetCommentsByProductId(productId); // Return comments for the specified product
        }
    }
}
