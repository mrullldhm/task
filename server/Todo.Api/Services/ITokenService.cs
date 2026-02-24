namespace Todo.Api.Services;

public interface ITokenService
{
    string CreateToken(string Username, int userId);
}
