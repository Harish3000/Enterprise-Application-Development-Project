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

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetAllComments()
        {
            var comments = await _commentService.GetAllComments();
            return Ok(comments);
        }

        [HttpGet("getById")]
        public async Task<ActionResult<Comment>> GetComment(IdDto idDto)
        {
            try
            {
                var comment = await _commentService.GetCommentById(idDto.Id);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }

        [HttpGet("getByUserId")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByUserId(IdDto idDto)
        {
            var comments = await _commentService.GetCommentsByUserId(idDto.Id);
            return Ok(comments);
        }

        [HttpGet("getByProductId")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByProductId(IdDto idDto)
        {
            var comments = await _commentService.GetCommentsByProductId(idDto.Id);
            return Ok(comments);
        }

        [HttpPost]
        public async Task<ActionResult<Comment>> CreateComment(CommentDto commentDto)
        {
            var (comment, error) = await _commentService.CreateComment(commentDto);
            if (error != null)
            {
                return BadRequest(new { error });
            }
            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
        }

        [HttpPut]
        public async Task<ActionResult<Comment>> UpdateComment(CommentDto commentDto)
        {
            try
            {
                var updatedComment = await _commentService.UpdateComment(commentDto);
                return Ok(updatedComment);
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<string>> DeleteComment(IdDto idDto)
        {
            var error = await _commentService.DeleteComment(idDto.Id);
            if (error != null)
            {
                return NotFound(new { error });
            }
            return NoContent();
        }
    }
}
