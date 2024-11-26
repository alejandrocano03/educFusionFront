import { Injectable } from '@angular/core';
import { Informe } from '../models/informe';

@Injectable({
  providedIn: 'root',
})
export class SharedInformeService {
  private informeGenerado: Informe | null = null;
  private añoInforme: number | null = null;

  setAñoInforme(anio: number): void{
    this.añoInforme = anio;
  }

  getAñoInforme(): number | null {
    return this.añoInforme;
  }

  clearAñoInforme(): void {
    this.añoInforme = null;
  }

  setInformeGenerado(informe: Informe): void {
    this.informeGenerado = informe;
  }

  getInformeGenerado(): Informe | null {
    return this.informeGenerado;
  }

  clearInformeGenerado(): void {
    this.informeGenerado = null;
  }
}
