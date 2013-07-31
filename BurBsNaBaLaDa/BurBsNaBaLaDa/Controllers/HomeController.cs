using System.Web.Mvc;

//using burbsDB;

namespace BurBsNaBaLaDa.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        /*ublic ActionResult Logar()
        {
            //naelsonEntities db = new naelsonEntities();

            String loginEmail = Request["txtLoginEmail"];
            String senhaEmail = Request["txtLoginEmail"]; //PODE SER ENCRYPT Util.Encrypt( aqui ) ;

            var query = db.Usuarios.Where(w => w.email == loginEmail && w.senha == senhaEmail);

            var loginValido = query.Count() == 1 ? true : false;

            if (loginValido == true)
            {
                return Json(new
                {
                    success = true,
                    mensagem = "Autenticado",
                });
            }
            else
            {
                return Json(new
                {
                    success = false,
                    mensagem = "Login e ou senha inválidos",
                });
            }
        }*/
    }
}