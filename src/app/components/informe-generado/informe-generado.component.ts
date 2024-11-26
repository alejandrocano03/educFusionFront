import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SharedInformeService } from '../../services/shared-informe.service';
import { EstadisticaRendimientoEducativoService } from '../../services/EstadisticaRendimientoService.service';
import { EstadisticaRendimiento } from '../../models/EstadisticaRendimiento';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Informe } from '../../models/informe';
import {  Router } from '@angular/router';
import { SharedUsuarioService } from '../../services/shared-usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-informe-generado',
  standalone: true,
  imports: [CommonModule,NgFor,NgIf],
  templateUrl: './informe-generado.component.html',
  styleUrls: ['./informe-generado.component.scss'],
})
export class InformeGeneradoComponent implements OnInit {
  informe: Informe | null = null;
  usuario: Usuario | null = null;
  anoAcademico: number | null = null;
  estadisticas: EstadisticaRendimiento[] = [];
  columnas: string[] = [];
  constructor(
    private sharedInformeService: SharedInformeService,
    private estadisticaService: EstadisticaRendimientoEducativoService,
    private sharedUsuarioService: SharedUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.sharedUsuarioService.getUsuarioIniciado();
    this.informe = this.sharedInformeService.getInformeGenerado();
    this.anoAcademico = this.sharedInformeService.getAñoInforme();

    if (this.informe?.centro?.id && this.anoAcademico) {
      const centroId = this.informe.centro.id;

      this.estadisticaService.filterByCentroId(centroId).subscribe((data) => {
        this.estadisticas = data.filter(e => e.anoAcademico === this.anoAcademico);
        this.columnas = this.informe?.datosIncluidos?.split(',') || [];
      });
    }
  }

/**
   * Navega a la pantalla principal.
   */
volver(): void {
  this.router.navigate(['/principal']);
}
/**
   * Genera el PDF con el contenido completo de la página HTML.
   */
generarPDF(): void {
  const content = document.querySelector('.generar-informes-container') as HTMLElement;

  // Usamos html2canvas para capturar la página HTML como una imagen
  html2canvas(content, {
    scale: 2, 
    useCORS: true,
    scrollX: 0,
    scrollY: -window.scrollY, 
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    // Creamos un nuevo documento PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.width;

    const imgWidth = pageWidth - 20; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    pdf.save('informe_educFusion.pdf');
  });
}
/**
 * Método para formatear date a formato DD/MM/YYYY HH:MM:SS
 * @param date fecha a modificar 
 * @returns fecha formateda
 */
formatDate(date: Date | string | undefined): string {
  if (!date) {
    return ''; 
  }

  const dateObj = (typeof date === 'string') ? new Date(date) : date;

  // Verifica si la conversión fue exitosa (si es un objeto Date válido)
  if (isNaN(dateObj.getTime())) {
    return ''; 
  }

  // Recogemos los días meses y años
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  // Recogemos la hora min y seg
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  // Retornar la fecha formateada
  return `el ${day}/${month}/${year} a las ${hours}:${minutes}:${seconds}`;
}




}