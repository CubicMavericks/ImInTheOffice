using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class UserSignUpRequest
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Email { get; set; }
    
    [Required]
    public string Avatar { get; set; }
}