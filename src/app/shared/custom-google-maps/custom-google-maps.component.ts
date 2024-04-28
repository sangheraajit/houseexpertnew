import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-custom-google-maps',
  templateUrl: './custom-google-maps.component.html',
  styleUrls: ['./custom-google-maps.component.scss'],
})
export class CustomGoogleMapsComponent
  implements OnInit, OnChanges, AfterViewInit
{
  //@Input() mapOptions: any;
  @Input() markerOptions: any;
  @Input()
  markers!: Observable<any>;

  apiLoaded!: Observable<boolean>;
  mapZoom = 18;
  zoom = 18;
  maxZoom = 18;
  minZoom = 8;
  center: google.maps.LatLngLiteral | undefined;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  @ViewChild(GoogleMap, { static: false }) googlemap!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  infoContent = '';
  latitude: any;
  longitude: any;
  loading = false;
  mapCenter!: google.maps.LatLng;
  /* marker = {
    position: { lat: 19.295821, lng: 72.8719911 },
 } */
 markerInfoContent = '';
  @ViewChild(google.maps.Map, { static: false }) map!: google.maps.Map;
  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;

  constructor(private readonly httpClient: HttpClient) {
    // this.loadMap();
  }
  ngAfterViewInit(): void {
    // this.openInfo(this.markers[0],this.markers[0].info)
  }
  ngOnChanges(changes: any) {
    console.log('changes', changes);
    if(changes.markers)
    {
     // this.openInfo(changes.markers[0],changes.markers[0].info)
    }
  }
  ngOnInit(): void {
    this.getCurrentLocation();
    console.log('center', this.center);

   // console.log('custom-google-maps ngOnInit markerPositions', this.markers);
    //console.log('custom-google-maps ngOnInit mapOptions', this.mapOptions);
    this.markers.subscribe((res: any) => {
      this.openInfoWindow(res[0])
     })



  }

  loadMap() {
    this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key==AIzaSyBytLTJj9R7ZiPYP1g68vPHwQl1UBkZF6U',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
  getCurrentLocation() {
    this.loading = true;

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.loading = false;

        const pos: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.mapCenter = new google.maps.LatLng(pos);



        const locationInfoWindow = new google.maps.InfoWindow({
          content: 'You are here.',
          position:  this.mapCenter,
          pixelOffset: new google.maps.Size(0, -25)
         })
console.log("this.map",this.map)
         locationInfoWindow.open(this.gmap.nativeElement)

        this.markerOptions = {
          draggable: false,
          icon:'assets/images/map-house.svg',
          animation: google.maps.Animation.DROP,
        };
      },
      (error) => {
        this.loading = false;

        if (error.PERMISSION_DENIED) {
          //  this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          /*  this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );  */
        } else if (error.TIMEOUT) {
          //this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          // this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true }
    );
  }
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng?.toJSON());
  }
}
