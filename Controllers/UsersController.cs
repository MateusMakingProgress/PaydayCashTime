using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaydayCashTime.Data;
using PaydayCashTime.Models;

namespace PaydayCashTime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<List<UsersModel>>> Add(UsersModel users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpGet]
        public async Task<ActionResult<List<UsersModel>>> GetAll()
        {
            return Ok(await _context.Users.ToListAsync());
        }
    }
}
