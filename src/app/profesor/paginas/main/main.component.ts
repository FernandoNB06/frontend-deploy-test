import { Component, OnInit } from '@angular/core';
import { CursoCardComponent } from '../../components/curso-card/curso-card.component';
import { Curso } from '../../../core/interfaces/curso';
import { CursoService } from '../../../admin/services/curso/curso.service';
import { AuthService } from '../../../auth/login/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CursoCardComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class ProfesorMainComponent implements OnInit{
  cursos: Curso[] = []
  cargando: boolean = false;
  error: string | null = null;
  profesorId: number | null = null;

  constructor(private cursoService: CursoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.error = null;
    this.profesorId = this.authService.getProfesorId();

    if (!this.profesorId) {
      this.error = 'No se pudo obtener el ID del profesor.';
      this.cargando = false;
      return;
    }

    // Mock data for testing
    // const mockCursos: Curso[] = [
    //   { id: 1, nombre: 'Matemáticas Avanzadas', descripcion: 'Curso de álgebra y cálculo avanzado', profesorId: 1, fechaCreacion: new Date(), gradoId: 1 },
    //   { id: 2, nombre: 'Física Moderna', descripcion: 'Introducción a la física cuántica y relatividad', profesorId: 1, fechaCreacion: new Date(), gradoId: 1},
    //   { id: 3, nombre: 'Programación en JavaScript', descripcion: 'Curso básico e intermedio de JavaScript', profesorId: 1,fechaCreacion: new Date(), gradoId: 1}
    // ];

    // Simulate API call with mock data
    setTimeout(() => {
      // this.cursos = mockCursos;
      // this.cargando = false;
    }, 1000); // Simulate a delay of 1 second

    // Uncomment the following block to use the real API call
    /*
    this.cursoService.getCursoByProfesor(this.profesorId).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los cursos:', err);
        this.error = 'No se pudieron cargar los cursos. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
    */
  }
  trackById(index: number, grado: Curso): number {
    return grado.id;
  }
}