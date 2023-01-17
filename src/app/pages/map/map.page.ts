import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map:any;
  mapIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
    
  })
  constructor() { }

  ngOnInit(): void {
    this.verMapa();
  }
  verMapa(){
    const latYlon = {
      lat:4.6265976722086375,
      lng:-74.15139124716826,
    };
    this.map = L.map('map', {
      center: [ latYlon.lat,latYlon.lng ],
      zoom: 13
    });
  //  const mapa = L.tileLayer('	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',{
    const mapa = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',{
      minZoom:12,
      maxZoom:17,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    mapa.addTo(this.map);
    const descripcion = 'Politecnico internacional';


    const popUpoptions = {
      coords:latYlon,
      text:descripcion,
      open:true,
    };
    this.agregarMarcador(popUpoptions.coords,popUpoptions.text,popUpoptions.open);
  }

  agregarMarcador(coords:any,text:string,open:boolean){
    const marker = L.marker( [coords.lat,coords.lng ],{icon:this.mapIcon});
    if(open){
     marker.addTo(this.map).bindPopup(text).openPopup();
    }
    else
    {
      marker.addTo(this.map).bindPopup(text);
    }
  }

}
