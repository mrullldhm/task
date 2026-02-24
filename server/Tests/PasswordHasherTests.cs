using Todo.Api.Services;
using Xunit;

namespace Todo.Tests;

public class PasswordHasherTests
{
    private readonly PasswordHasher _hasher;

    public PasswordHasherTests()
    {
        _hasher = new PasswordHasher();
    }

    [Fact]
    public void Hash_ShouldReturnDifferentString()
    {
        // Arrange
        var password = "mypassword";

        // Act
        var hash1 = _hasher.Hash(password);
        var hash2 = _hasher.Hash(password);

        // Assert
        Assert.NotEqual(hash1, hash2); // Salting should make them different
    }

    [Fact]
    public void Verify_ShouldReturnTrue_WhenPasswordMatches()
    {
        // Arrange
        var password = "mypassword";
        var hash = _hasher.Hash(password);

        // Act
        bool result = _hasher.Verify(password, hash);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void Verify_ShouldReturnFalse_WhenPasswordIsWrong()
    {
        // Arrange
        var password = "mypassword";
        var wrongPassword = "wrongpassword";
        var hash = _hasher.Hash(password);

        // Act
        bool result = _hasher.Verify(wrongPassword, hash);

        // Assert
        Assert.False(result);
    }
}
