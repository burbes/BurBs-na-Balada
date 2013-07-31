using System.Linq;
using System.Web.Mvc;
using CMS.Models.Conexao;

namespace CMS.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LogOff()
        {
            Session.Abandon();
            //LIMPA SESSÃO

            return Redirect("~/Home/");
            //return View();
        }

        //VERIFICA SE O USUÁRIO ESTÁ NA BASE
        public ActionResult IdentificaUsuario(string Login, string Senha)
        {
            BurBsNaBaladaEntities dbContex = new BurBsNaBaladaEntities();
            bool auxOk;

            var buscaUsuario = (from q in dbContex.Usuarios
                                where 1 == 1
                                && q.email == Login
                                && q.senha == Senha
                                select q);

            //CASO ENCONTRADO
            if (buscaUsuario.Count() == 1)
            {
                //ABRE SESSÃO
                Session["USUARIO"] = buscaUsuario.FirstOrDefault().nome;
                Session["EMAIL"] = buscaUsuario.FirstOrDefault().email;

                //RETORNO
                auxOk = true;
            }
            else
            {
                //LIMPA SESSÃO
                Session["USUARIO"] = null;
                Session["EMAIL"] = null;

                //RETORNO
                auxOk = false;
            }

            return Json(new { ok = auxOk });
        }
    }
}