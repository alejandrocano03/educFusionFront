import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapaInteractivoService } from '../../services/MapaInteractivoService.service';
import { MapaInteractivo } from '../../models/mapaInteractivo';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import { View } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Icon, Style } from 'ol/style';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent implements OnInit {

  mapas: MapaInteractivo[] = []; 
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  mapa: ol.Map | undefined;
  vectorLayer: VectorLayer; // Capa que contiene los puntos de los centros
  selectedFeature: Feature | undefined; // Para el marcador seleccionado

  constructor(private mapaService: MapaInteractivoService, private router: Router) {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });
  }

  ngOnInit(): void {
    this.loadMapas();
  }

  /**
   * Método para cargar los mapas de BD.
   */
  loadMapas(): void {
    this.mapaService.getAllMapas().subscribe((mapas) => {
      this.mapas = mapas;
      this.initializeMap();
    });
  }

  /**
   * Método que inicializa el mapa con las coordenadas de valladolid 
   * y los centros para visualizarlo en el mapa.
   */
  initializeMap(): void {
    const mapView = new View({
      center: fromLonLat([-4.7282, 41.6529]),
      zoom: 13,
    });

    this.mapa = new ol.Map({
      target: this.mapElement?.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: mapView,
    });

    this.addCentrosToMap();
  }

  addCentrosToMap(): void {
    const vectorSource = this.vectorLayer.getSource();
    
    this.mapas.forEach(mapa => {
      const coords = mapa.coordenadasGeograficas?.split(',').map(Number);
      if (coords) {
        const feature = new Feature({
          geometry: new Point(fromLonLat([coords[1], coords[0]])), 
          name: mapa.centro.nombre,
        });

        // Crear un marcador con una chincheta
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://img.icons8.com/ios/452/map-pin.png',
            scale: 0.1, 
          }),
        }));

        vectorSource?.addFeature(feature);
      }
    });
  }

  /**
   * Método para buscar un centro en el mapa
   * @param mapa mapa a buscar
   * @returns 
   */
  onCentroClick(mapa: MapaInteractivo | null): void {
    if (!mapa) {
      const mapView = this.mapa?.getView();
      if (mapView) {
        mapView.setCenter(fromLonLat([-4.7282, 41.6529]));  // Coordenadas de Valladolid (por defecto)
        mapView.setZoom(13);
      }
  
      // Desmarcar cualquier centro previamente seleccionado
      const selectedElement = document.querySelector('.centro-item.active');
      if (selectedElement) {
        selectedElement.classList.remove('active');
      }
  
      return;
    }
  
    // Obtener las coordenadas del centro
    const coords = mapa.coordenadasGeograficas?.split(',').map(Number);
    if (coords) {
      this.mapa?.getView().setCenter(fromLonLat([coords[1], coords[0]]));
      this.mapa?.getView().setZoom(20);
  
      // Desmarcar cualquier centro previamente seleccionado
      const selectedElement = document.querySelector('.centro-item.active');
      if (selectedElement) {
        selectedElement.classList.remove('active');
      }
  
      // Marcar el centro actual como seleccionado
      const selectedListItem = document.querySelector(`li[data-nombre='${mapa.centro.nombre}']`);
      if (selectedListItem) {
        selectedListItem.classList.add('active');
      }
    }
  }  
  
  /**
   * Método para volver a la pantalla principal.
   */
  volver(): void {
    this.router.navigate(['/principal']);
  }
}
