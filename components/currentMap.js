class CurrentMap {
  constructor(userInterest, mapApi) {
    this.handleViewTypeClick = this.handleViewTypeClick.bind(this);
    this.initMap = this.initMap.bind(this);
    this.userInterest = userInterest;
    this.mapApi = mapApi;
    this.data = userInterest.eventData;
  }

  onViewTypeClick() {
    var viewElt = document.getElementById('view');
    viewElt.addEventListener('click', this.handleViewTypeClick);
  }

  handleViewTypeClick(e) {
    e.preventDefault();
    var currentMapElt = document.getElementById('map');
    var listRowElt = document.getElementById('listArea');
    var currentViewElt = document.querySelector('.view');
    var titleRowElt = document.querySelector('.list-title')
    var localEventElt = document.createElement('h4');
    localEventElt.id = 'mapViewNote'

    currentMapElt.appendChild(localEventElt);
    if (currentViewElt.id === 'mapView') {
      localEventElt.textContent = "Map View (Local Events Only)"
      titleRowElt.appendChild(localEventElt)
      currentViewElt.src = 'icon/list.png';
      currentViewElt.alt = 'List View';
      currentViewElt.id = 'listView';
      listRowElt.classList.add('hide');
      currentMapElt.classList.remove('hide');
    } else if (currentViewElt.id === 'listView') {
      var mapViewNoteElt = document.getElementById('mapViewNote')
      mapViewNoteElt.remove();
      currentViewElt.src = 'icon/map.png';
      currentViewElt.alt = 'Map View';
      currentViewElt.id = 'mapView';
      listRowElt.classList.remove('hide');
      currentMapElt.classList.add('hide');
      }
    }

  initMap() {
    var locations = this.getLocationList()
    var centerLatLng = {
      lat: this.data.city.lat,
      lng: this.data.city.lon
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: centerLatLng,
      mapId: this.mapApi.mapId,
    });

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i<locations.length; i++){
      var markers = new google.maps.Marker({
        position: {'lat':locations[i].lat, 'lng':locations[i].lng},
        label: labels[i % labels.length],
        title: locations[i].name,
        map: map
      })
    }
    return markers;
  }
  getLocationList() {
    var locations = [];

    for (var i = 0; i < this.data.events.length; i++) {
      if (!this.data.events[i].is_online_event){
        var lat = this.data.events[i].group.lat;
        var lng = this.data.events[i].group.lon;
        var name = this.data.events[i].name
        locations.push({ 'lat':lat, 'lng':lng, 'name': name });
      }
    }
    return locations;
  }

  addScriptTag() {
    var mapScriptElt = document.createElement('script');
    mapScriptElt.setAttribute('defer', true);
    var url = "https://maps.googleapis.com/maps/api/js?key=" + this.mapApi.key
              + "&map_ids=" + this.mapApi.mapId
              + "&callback=startApp.map.initMap";
    mapScriptElt.setAttribute('src', url);
    document.body.appendChild(mapScriptElt);
  }
}
