using System;
using System.Collections.Generic;

namespace Proyecto1escuela.Models;

public partial class Materium
{
    public int Idmateria { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Calificacion> Calificacions { get; set; } = new List<Calificacion>();
}
