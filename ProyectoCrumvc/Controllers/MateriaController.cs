using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyecto1escuela.Models;

namespace Proyecto1escuela.Controllers
{
    [Route("api/Materia/")]
    [ApiController]
    public class MateriaController : ControllerBase
    {
        private readonly EscuelaContext _dbcontext;

        public MateriaController(EscuelaContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Materium> lista = await _dbcontext.Materia.OrderByDescending(c => c.Idmateria).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Materium request)
        {
            await _dbcontext.Materia.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Materium request)
        {
            _dbcontext.Materia.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Materium materia = _dbcontext.Materia.Find(id);

            _dbcontext.Materia.Remove(materia);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

    }
}
