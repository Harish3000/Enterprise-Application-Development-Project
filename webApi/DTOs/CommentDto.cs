namespace webApi.DTOs
{
    // Data Transfer Object for Comment
    public class CommentDto
    {
        // Unique identifier for the comment
        public string Id { get; set; }

        // Unique identifier of the product this comment is associated with
        public string ProductId { get; set; }

        // Text description of the comment
        public string Description { get; set; }

        // Username of the person who made the comment
        public string UserName { get; set; }
    }
}
