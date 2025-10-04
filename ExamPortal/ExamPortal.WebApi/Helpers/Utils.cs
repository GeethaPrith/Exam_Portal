using System.Security.Cryptography;
using System.Text;

namespace ExamPortal.WebApi.Helpers
{
    public class Utils
    {
        public static string Hash(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
