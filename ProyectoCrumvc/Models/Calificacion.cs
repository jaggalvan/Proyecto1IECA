using System;
using System.Collections.Generic;

namespace Proyecto1escuela.Models;

public partial class Calificacion
{
    public int Idcalificacion { get; set; }

    public int? Idalumno { get; set; }

    public int? Idmateria { get; set; }

    public int? Calificacion1 { get; set; }

    public virtual Alumno? Alumno { get; set; }

    public virtual Materium? Materium { get; set; }
}
