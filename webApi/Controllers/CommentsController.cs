// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: CommentsController for handling CRUD operations related to 
// comments, including fetching, creating, updating, and deleting comments.
// -----------------------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;
using webApi.DTOs;
using webApi.Models;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        // Constructor to inject the ICommentService dependency.
        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        // GET: api/comments
        // Retrieves all comments from the database.
        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetAllComments()
        {
            var comments = await _commentService.GetAllComments();
            return Ok(comments); // Return 200 OK with the list of comments.
        }

        // GET: api/comments/getById
        // Retrieves a specific comment based on its ID.
        [HttpGet("getById")]
        public async Task<ActionResult<Comment>> GetComment(IdDto idDto)
        {
            try
            {
                var comment = await _commentService.GetCommentById(idDto.Id);
                return Ok(comment); // Return 200 OK with the comment object.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 if comment is not found.
            }
        }

        // GET: api/comments/getByUserId
        // Retrieves all comments made by a specific user.
        [HttpGet("getByUserId")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByUserId(IdDto idDto)
        {
            var comments = await _commentService.GetCommentsByUserId(idDto.Id);
            return Ok(comments); // Return 200 OK with comments made by the user.
        }

        // GET: api/comments/getByProductId
        // Retrieves all comments related to a specific product.
        [HttpGet("getByProductId")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByProductId(IdDto idDto)
        {
            var comments = await _commentService.GetCommentsByProductId(idDto.Id);
            return Ok(comments); // Return 200 OK with comments for the product.
        }

        // POST: api/comments
        // Creates a new comment based on the provided data.
        [HttpPost]
        public async Task<ActionResult<Comment>> CreateComment(CommentDto commentDto)
        {
            var (comment, error) = await _commentService.CreateComment(commentDto);
            if (error != null)
            {
                return BadRequest(new { error }); // Return 400 BadRequest if there's an error.
            }
            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
        }

        // PUT: api/comments
        // Updates an existing comment based on the provided data.
        [HttpPut]
        public async Task<ActionResult<Comment>> UpdateComment(CommentDto commentDto)
        {
            try
            {
                var updatedComment = await _commentService.UpdateComment(commentDto);
                return Ok(updatedComment); // Return 200 OK with the updated comment.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 if comment is not found.
            }
        }

        // DELETE: api/comments/delete
        // Deletes a comment based on its ID.
        [HttpDelete("delete")]
        public async Task<ActionResult<string>> DeleteComment(IdDto idDto)
        {
            var error = await _commentService.DeleteComment(idDto.Id);
            if (error != null)
            {
                return NotFound(new { error }); // Return 404 if deletion fails.
            }
            return NoContent(); // Return 204 No Content if deletion is successful.
        }
    }
}
