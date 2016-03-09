using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TICE.Startup))]
namespace TICE
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
