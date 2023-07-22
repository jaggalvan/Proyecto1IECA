using System;
using System.Collections.Generic;

namespace Proyecto1escuela.Models;

public partial class Alumno
{
    public int Idalumno { get; set; }

    public string? Nombre { get; set; }

    public string? Correo { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public virtual ICollection<Calificacion> Calificacions { get; set; } = new List<Calificacion>();
}
