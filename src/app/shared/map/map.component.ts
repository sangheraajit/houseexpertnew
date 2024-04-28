import { AfterViewInit, Component, ElementRef, EventEmitter,
   Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild
   } from '@angular/core';
import {
  GoogleMap,
  MapInfoWindow,
  MapGeocoder,
  MapGeocoderResponse,
  MapDirectionsService,
  MapMarker,
} from '@angular/google-maps';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit,AfterViewInit,OnChanges {

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;
  @ViewChild('markerElem', { static: false })
  markerElem!: MapMarker;
  @Output() addressEvent = new EventEmitter<any>();
  @Input() origin!: any;
  @Input() destination!: any;
   request: google.maps.DirectionsRequest = {
    destination:this.origin,
    origin:this.destination,
    travelMode: google.maps.TravelMode.DRIVING
  };
  address = '';
  latitude!: any;
  longitude!: any;
  zoom = 16;
  maxZoom = 18;
  minZoom = 8;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    //mapTypeId: 'hybrid',
  };
  markers = [] as any;
  autocompletetext!: { input: string; };
  autocompleteItems!: any[];
  googleAutocomplete: any;

   directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  constructor(private ngZone: NgZone, private geoCoder: MapGeocoder,
    public zone: NgZone,
   private mapDirectionsService: MapDirectionsService
    ) {

    }

    ngOnChanges(changes: any): void {
      console.log('ngOnChanges',changes);
      this.request.destination=changes.destination;
      this.request.origin=changes.origin;
      this.directionsResults$ = this.mapDirectionsService.route(this.request).pipe(map(response => response.result));
    }
  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    /* const autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.request.origin=place.geometry.location;
        // Set marker position
      //  this.setMarkerPosition(this.latitude, this.longitude);

        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    }); */
  }

  ngOnInit() {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompletetext = { input: '' };
    this.autocompleteItems = [];
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // Set marker position
     // this.setMarkerPosition(this.latitude, this.longitude);
      this.getAddress(this.latitude, this.longitude);
    });
  }

  /* setMarkerPosition(latitude: any, longitude: any) {
    // Set marker position
    this.markers = [
      {
        position: {
          lat: latitude,
          lng: longitude,
        },
        options: {
          animation: google.maps.Animation.DROP,
          draggable: true,
        },
      },
    ];
  } */

  eventHandler(event: any, name: string) {
    // console.log(event, name);

    switch (name) {
      case 'mapDblclick': // Add marker on double click event
        break;

      case 'mapDragMarker':
        break;

      case 'mapDragend':
        this.getAddress(event.latLng.lat(), event.latLng.lng());
        break;

      default:
        break;
    }
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder
      .geocode({ location: { lat: latitude, lng: longitude } })
      .subscribe((addr: MapGeocoderResponse) => {
        if (addr.status === 'OK') {
          if (addr.results[0]) {
            this.zoom = 18;
            this.address = addr.results[0].formatted_address;
            console.log('this.address',addr.results[0]);
            const infowindow = new google.maps.InfoWindow();
            const marker = new google.maps.Marker({
              position: addr.results[0].geometry.location,
            });
            this.markers.push(marker);
            infowindow.setContent(addr.results[0].formatted_address);
            this.infoWindow.open(this.markerElem);
            this.addressEvent.emit(addr.results[0]);
          } else {
//this.address = null;
            window.alert('No results found');
          }
        } else {
//this.address = null;
          window.alert('Geocoder failed due to: ' + addr.status);
        }
      });
  }
//AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
updateSearchResults() {
  if (this.autocompletetext.input === '') {
    this.autocompleteItems = [];
    return;
  }
  this.googleAutocomplete.getPlacePredictions(
    { input: this.autocompletetext.input },
    (predictions: any[], status: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction.description);
        });
      });
    }
  );
}
//lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
clearAutocomplete() {
  this.autocompleteItems = [];
  this.autocompletetext.input = '';
}
}
