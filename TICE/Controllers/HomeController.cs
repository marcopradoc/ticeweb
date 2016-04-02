using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TICE.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Cursos()
        {
            ViewBag.Message = "Página de Cursos.";
            ViewData["menu"] = "cursos";
            return View();
        }

        public ActionResult Main()
        {
            //ViewBag.Message = "Página de Actividades.";
            ViewData["menu"] = "main";
            return View();
        }

        public ActionResult Tarea(int codigoCurso, int codigoActividad)
        {
            ViewData["Message"] = "Your application description page.";
            ViewData["menu"] = "cursos";
            ViewData["codigoActividad"] = codigoActividad;
            ViewData["codigoCurso"] = codigoCurso;
            return View();
        }

        public ActionResult Actividad(int codigoCurso)
        {
            ViewData["Message"] = "Your contact page.";
            ViewData["menu"] = "cursos";
            ViewData["codigoCurso"] = codigoCurso;
            return View();
        }
        public ActionResult Documento(int codigoCurso, int codigoActividad, int codigoTarea)
        {
            ViewData["menu"] = "cursos";
            ViewData["Message"] = "Your contact page.";
            ViewData["codigoActividad"] = codigoActividad;
            ViewData["codigoCurso"] = codigoCurso;
            ViewData["codigoTarea"] = codigoTarea;
            return View();
        }

        public ActionResult CrearCapa()
        {
            ViewData["menu"] = "main";
            return View();
        }

        public ActionResult EditarCapa(int codigoCapa)
        {
            ViewData["menu"] = "main";
            ViewData["codigoCapa"] = codigoCapa;
            return View("CrearCapa");
        }

        public ActionResult CrearCapa2(int codigoCapa)
        {
            ViewData["menu"] = "main";
            ViewData["codigoCapa"] = codigoCapa;
            return View();
        }

        public ActionResult CrearCapa3(int codigoCapa)
        {
            ViewData["menu"] = "main";
            ViewData["codigoCapa"] = codigoCapa;
            return View();
        }
        public ActionResult Error()
        {
            return View();
        }

        public ActionResult FocusGroup()
        {
            //ViewBag.Message = "Página de Actividades.";
            ViewData["menu"] = "focusgroup";
            return View();
        }

        public ActionResult Horario()
        {
            //ViewBag.Message = "Página de Actividades.";
            ViewData["menu"] = "focusgroup";
            return View();
        }
        public ActionResult Actas()
        {
            //ViewBag.Message = "Página de Actividades.";
            ViewData["menu"] = "actas";
            return View();
        }
    }
}