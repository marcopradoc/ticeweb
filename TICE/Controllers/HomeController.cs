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

        public ActionResult Tarea(string codigoCurso, int codigoActividad)
        {
            ViewData["Message"] = "Your application description page.";
            ViewData["menu"] = "cursos";
            ViewData["codigoActividad"] = codigoActividad;
            ViewData["codigoCurso"] = codigoCurso;
            return View();
        }

        public ActionResult Actividad(string codigoCurso)
        {
            ViewData["Message"] = "Your contact page.";
            ViewData["menu"] = "cursos";
            ViewData["codigoCurso"] = codigoCurso;
            return View();
        }
        public ActionResult Documento(string codigoCurso, int codigoActividad, int codigoTarea)
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
        public ActionResult Proyeccion()
        {
            //ViewBag.Message = "Página de Actividades.";
            ViewData["menu"] = "proyeccion";
            return View();
        }

        public JsonResult Upload(string codigoCurso)
        {
            for (int i = 0; i < Request.Files.Count; i++)
            {
                HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                //Use the following properties to get file's name, size and MIMEType
                int fileSize = file.ContentLength;
                string fileName = file.FileName;
                string mimeType = file.ContentType;
                System.IO.Stream fileContent = file.InputStream;
                //To save file, use SaveAs method
                System.IO.Directory.CreateDirectory(Server.MapPath("~/documentos/" + codigoCurso + "/"));
                file.SaveAs(Server.MapPath("~/documentos/" + codigoCurso + "/") + "documento.xls"); //File will be saved in application root
            }
            return Json("Se cargó el archivo correctamente");
        }

        public JsonResult ValidarCarpetas(string codigoCurso)
        {
            string result = null;
            if (System.IO.Directory.Exists(Server.MapPath("~/documentos/" + codigoCurso + "/")))
                result = "disabled";

            return Json(result);
        }
    }
}