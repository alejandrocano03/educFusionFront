import { Component, OnInit, ViewChild } from '@angular/core';
import { OpinionUsuario } from '../models/opinionUsuario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentroEducativo } from '../models/centroEducativo';
import { Usuario } from '../models/usuario';
import { OpinionDeUsuarioService } from '../services/OpinionDeUsuarioService.service';
import { CentroEducativoService } from '../services/CentroEducativoService.service';
import { SharedUsuarioService } from '../services/shared-usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-opinion-usuario',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatMenuModule, HttpClientModule, 
            MatSelectModule, MatOptionModule, MatPaginatorModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule ],
  templateUrl: './opinion-usuario.component.html',
  styleUrls: ['./opinion-usuario.component.scss']
})
export class OpinionUsuarioComponent implements OnInit {
  opinionForm: FormGroup;
  centros: CentroEducativo[] = [];
  opiniones: OpinionUsuario[] = [];
  paginatedOpiniones: OpinionUsuario[] = [];
  usuario: Usuario | null = null;

  // Tablas
  dataSource = new MatTableDataSource<OpinionUsuario>();
  displayedColumns: string[] = ['usuarioNombre', 'centro', 'comentario', 'fechaOpinion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Mensajes de error
  errorMessage: string = '';

  // Paginación
  totalOpiniones: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    private fb: FormBuilder,
    private opinionService: OpinionDeUsuarioService,
    private centroService: CentroEducativoService,
    private sharedUsuarioService: SharedUsuarioService,
    private router: Router
  ) {
    this.opinionForm = this.fb.group({
      comentario: ['', [Validators.required]],
      centro: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.usuario = this.sharedUsuarioService.getUsuarioIniciado();
    this.loadCentros();
    this.loadOpiniones();
  }

  /**
   * Método para cargar los centros de la BD.
   */
  loadCentros() {
    this.centroService.getAllCentros().subscribe(centros => {
      this.centros = centros;
    });
  }

  /**
   * Método para cargar las opiniones de la BD.
   */
  loadOpiniones() {
    this.opinionService.getAllOpiniones().subscribe(opiniones => {
      this.opiniones = opiniones;
      this.totalOpiniones = opiniones.length;
      this.updatePaginatedOpiniones();
      this.dataSource.data = this.opiniones;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Método que crea un opinión con los datos del form
   * y actualiza la tabla para visualizarla dinámicamente.
   * @returns Opinión creada
   */
  submitOpinion() {
    if (this.opinionForm.valid) {
      const centroSeleccionado = this.centros.find(c => c.nombre === this.opinionForm.value.centro);
      this.errorMessage = '';

      if (!centroSeleccionado) {
        console.error('Centro no válido');
        return;
      }

      const opinion: OpinionUsuario = {
        comentario: this.opinionForm.value.comentario,
        centro: centroSeleccionado,
        usuario: this.usuario || {
          nombre: 'Invitado',
          apellido: '',
          correoElectronico: '',
          contraseñaCifrada: '',
          rol: 'invitado',
          fechaRegistro: new Date()
        },
        fechaOpinion: new Date()
      };

      this.opinionService.createOpinion(opinion).subscribe({
        next: (response) => {
          this.loadOpiniones();
          this.opinionForm.reset();
        },
        error: (error) => {
          console.error('Error al enviar la opinión:', error);
        },
        complete: () => {
          console.log('Opinión enviada exitosamente.');
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }

  /**
   * Método para volver a la pantalla principal.
   */
  volver() {
    this.router.navigate([`/principal`]);
  }

  /**
   * Método paracontrolar el cambio de página del paginador.
   * @param event Evento del paginador.
   */
  onChangePage(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePaginatedOpiniones();
  }

  /**
   * Método para modificar el paginador dinámicamente 
   * cuando se añade una opinión.
   */
  updatePaginatedOpiniones() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedOpiniones = this.opiniones.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Método que formatea de YYYY-MM-DD a DD/MM/YYYY.
   * @param dateString fecha a modificar
   * @returns fecha formateada.
   */
  formatDate(date: any): string {
    // Verificar si el valor es nulo o indefinido
    if (!date) return '';
  
    // Verificar si es un string y convertirlo a Date
    if (typeof date === 'string') {
      date = new Date(date); // Convertir la cadena a un objeto Date
    }
  
    // Asegurarse de que date es un objeto Date válido
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Fecha inválida'; // Retornar un mensaje si no es una fecha válida
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  


}
