using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

using Proyecto1escuela.Models;
using Proyecto1escuela.Models.ViewModels;

namespace Proyecto1escuela.Controllers
{
    [Route("api/calificacion/")]
    [ApiController]
    public class CalificacionController : ControllerBase
    {
        private readonly EscuelaContext _dbcontext;
        private Alumno alumno;


        public CalificacionViewModel vistaVM { get; set; }
        public CalificacionController(EscuelaContext context)
        {
            _dbcontext = context;
        }

        public EscuelaContext Get_dbcontext()
        {
            return _dbcontext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista(EscuelaContext _dbcontext)
        {

            //vistaVM = new CalificacionViewModel();
            var lista2 = Lista;

            //var lista2 = _dbcontext.Calificacions.Include(c => c.Alumno, (c)=> new(c.Idalumno,c.Nombre) ).Include(a => a.Materium).Where(c => c.Idalumno == 1).ToList();

            //var lista2 = _dbcontext.Calificacions.Include(c => c.Alumno.Idalumno).Include(a => a.Materium.Idmateria);


            //List<Alumno> lista2 = await _dbcontext.Alumnos.OrderByDescending(c => c.Idalumno).ToListAsync();

            //var lista2 = _dbcontext.Alumnos.Where(c => c.Idalumno == 1).SelectMany(c => c.Calificacions, (c, i) =>
            //new
            //{
            //    c.Idalumno,
            //    c.Nombre
            //})



            //using (var db = new EscuelaContext())

            EscuelaContext db = new EscuelaContext();

                //{
                //var list = (from a in db.Alumnos
                //             join c in db.Calificacions on a.Idalumno equals c.Idalumno
                //             select new { a.idalumno, a.Nombre }).Take(1000);

            ////Executing the LINQ query
            //var result = lista2.ToList();


            //var list = (from s in ctx.Alumnos where s.Idalumno == 1
            //            select s).FirstOrDefault<Alumno>();

            //   var query = (from c in db.Calificacions
            //                join a in db.Alumnos on c.Idalumno equals a.Idalumno
            //                join m in db.Materia on c.Idmateria equals m.Idmateria
            //                where c.Idalumno == 1
            //                select new { a.Idalumno, a.Nombre, m.Nombre, c.Calificacion1 })
            //.Take(1000);




                var query = (from c in db.Calificacions
                             join a in db.Alumnos on c.Idalumno equals a.Idalumno
                             join m in db.Materia on c.Idmateria equals m.Idmateria
                             where c.Idalumno == 1
                             select new { c.Idcalificacion, a.Nombre, nombrem = m.Nombre , c.Calificacion1 })
             .Take(1000);

                //Executing the LINQ query
                var result = query.ToList();

 
            //}

            
            

                //var lista2 = _dbcontext.Alumnos.Where(c => c.Idalumno == 1).SelectMany(c => c.Calificacions, (c, i) =>
                //new
                //{
                //    c.Idalumno,
                //    c.Nombre


                //}).ToList();


                //var lista2 = _dbcontext.Calificacions.Include(p => p.Materium).Include(m=>m.Alumno).Where(d=> d.Idalumno==1).ToList();

                //var lista2 = _dbcontext.Alumnos.Where(c => c.Idalumno == 1).SelectMany(c => c.Calificacions).Include(o=>o.Materium).Where(o=> o.Materium=;



                //var lista2 = _dbcontext.Calificacions.Include(c => c.Alumno.Idalumno).Include(a => a.Materium).Where(c => c.Idalumno == 1).ToList();

                //List<Alumno> lista = await _dbcontext.Alumnos.Include(a=> a.Calificacions).ThenInclude(e => e.Alumno)
                //    .where(d=> d.);

                // vistaVM.Alumnos = _dbcontext.Calificacions.Include(p => p.a)

                //List<vistaVM> lista = await _dbcontext.Calificacions.OrderByDescending(ca => ca.Idalumno).Include(pa => Alumno).Include(td => Materium)
                //    .where();


                return StatusCode(StatusCodes.Status200OK, result);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar(Calificacion cal)
        {

            //var a = new Alumno();
            //a.Idalumno = 2;
            //a.Nombre = null;
            //a.Correo = null;
            //a.Direccion = null;
            //var m = new Materium();

            //m.Idmateria = 2;

            //m.Nombre = null;

            //var cal = new Calificacion { Idalumno = 1, Idmateria = 1, Calificacion1 = 10 };

            //Calificacion c = new Calificacion();
            //c.Idalumno = 2;
            //c.Idmateria = 2;
            //c.Calificacion1 = 2;


            await _dbcontext.Calificacions.AddAsync(cal);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Calificacion request)
        {
            _dbcontext.Calificacions.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Calificacion calificacion = _dbcontext.Calificacions.Find(id);

            _dbcontext.Calificacions.Remove(calificacion);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

    }
}
