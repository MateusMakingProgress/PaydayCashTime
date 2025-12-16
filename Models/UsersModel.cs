using System.ComponentModel.DataAnnotations;

namespace PaydayCashTime.Models
{
    public class UsersModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? email { get; set; }
    }

    public class CreateUserRequest
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

    }
}
