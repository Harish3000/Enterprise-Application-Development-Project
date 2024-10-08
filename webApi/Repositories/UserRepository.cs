// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: UserRepository for handling operations related to users in the
// system, including retrieval, creation, update, and deletion of user records.
// -----------------------------------------------------------------------------

using MongoDB.Driver;
using webApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Repositories
{
    public interface IUserRepository
    {
        // Retrieves a user by their email address
        Task<User> GetUserByEmail(string email);

        // Retrieves a user by their unique ID
        Task<User> GetUserById(string id);

        // Retrieves a user by their username
        Task<User> GetUserByUserName(string userName);

        // Retrieves all users from the database
        Task<List<User>> GetAllUsers();

        // Creates a new user in the database
        Task CreateUser(User user);

        // Updates an existing user in the database
        Task UpdateUser(User user);

        // Deletes a user from the database by their ID
        Task DeleteUser(string id);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IMongoDatabase database)
        {
            // Initializes the users collection from the MongoDB database
            _users = database.GetCollection<User>("Users");
        }

        // Retrieves a user by their email address
        public async Task<User> GetUserByEmail(string email)
        {
            return await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
        }

        // Retrieves a user by their username
        public async Task<User> GetUserByUserName(string userName)
        {
            return await _users.Find(u => u.UserName == userName).FirstOrDefaultAsync();
        }

        // Retrieves a user by their unique ID
        public async Task<User> GetUserById(string id)
        {
            return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        // Retrieves all users from the database
        public async Task<List<User>> GetAllUsers()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        // Creates a new user in the database
        public async Task CreateUser(User user)
        {
            await _users.InsertOneAsync(user);
        }

        // Updates an existing user in the database
        public async Task UpdateUser(User user)
        {
            await _users.ReplaceOneAsync(u => u.Id == user.Id, user);
        }

        // Deletes a user from the database by their ID
        public async Task DeleteUser(string id)
        {
            await _users.DeleteOneAsync(u => u.Id == id);
        }
    }
}
