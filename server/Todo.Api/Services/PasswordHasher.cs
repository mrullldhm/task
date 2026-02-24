using BCrypt.Net;

namespace Todo.Api.Services;

/// Implements password hashing and verification
public class PasswordHasher : IPasswordHasher
{
    /// Hashes a plaintext password
    public string Hash(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    /// Verifies a plaintext password
    public bool Verify(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
