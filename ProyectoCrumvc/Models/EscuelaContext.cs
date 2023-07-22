using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Proyecto1escuela.Models;

public partial class EscuelaContext : DbContext
{
    public EscuelaContext()
    {
    }

    public EscuelaContext(DbContextOptions<EscuelaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alumno> Alumnos { get; set; }

    public virtual DbSet<Calificacion> Calificacions { get; set; }

    public virtual DbSet<Materium> Materia { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; DataBase=Escuela;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alumno>(entity =>
        {
            entity.HasKey(e => e.Idalumno);

            entity.ToTable("Alumno");

            entity.Property(e => e.Idalumno).HasColumnName("idalumno");
            entity.Property(e => e.Correo).HasMaxLength(100);
            entity.Property(e => e.Direccion).HasMaxLength(50);
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.Telefono).HasMaxLength(50);
        });

        modelBuilder.Entity<Calificacion>(entity =>
        {
            entity.HasKey(e => e.Idcalificacion);

            entity.ToTable("Calificacion");

            entity.Property(e => e.Idcalificacion).HasColumnName("idcalificacion");
            entity.Property(e => e.Calificacion1).HasColumnName("Calificacion");
            entity.Property(e => e.Idalumno).HasColumnName("idalumno");
            entity.Property(e => e.Idmateria).HasColumnName("idmateria");

            entity.HasOne(d => d.Alumno).WithMany(p => p.Calificacions)
                .HasForeignKey(d => d.Idalumno)
                .HasConstraintName("FK_Calificacion_Alumno");

            entity.HasOne(d => d.Materium).WithMany(p => p.Calificacions)
                .HasForeignKey(d => d.Idmateria)
                .HasConstraintName("FK_Calificacion_Materia");
        });

        modelBuilder.Entity<Materium>(entity =>
        {
            entity.HasKey(e => e.Idmateria);

            entity.Property(e => e.Idmateria).HasColumnName("idmateria");
            entity.Property(e => e.Nombre).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
