

$(function() {

    /*
    * Intial variable declarations
    * Initializes all the needed google map
    * api info -- for how to setup api:
    * https://developers.google.com/maps/documentation/javascript/tutorial
    */
    var api = google.maps,
        mapCenter = new api.LatLng(39.9833, 82.9833),
        mapOptions = {
            zoom: 13,
            center: mapCenter,
            mapTypeId: api.MapTypeId.ROADMAP,
            disableDefaultUI: true
        },
        map = new api.Map(document.getElementById( 'map' ), mapOptions),
        $ui = $( '#ui' ),
        clicks = 0,
        positions = [];

    /*
    * Sets the hq/homeMarker on the map via the Marker constructor
    * Sets it in the middle of the map and gives it an icon
    * Uses Google's Marker constructor
    */
    var homeMarker = new api.Marker({
        position: mapCenter,
        map: map,
        icon: 'img/hq.png'
    });

    /*
    * Creates an info window when you click on hq marker
    * Uses Google's InfoWindow constructor
    */
    var infoWindow = new api.InfoWindow({
        content: document.getElementById('hqInfo')
    });

    /*
    * Listens for the click event on the homeMarker then displays infoWindow
    * Event docs - https://developers.google.com/maps/documentation/javascript/events
    */
    api.event.addListener( homeMarker, 'click', function() {
        infoWindow.open(map, homeMarker);
    });

    /*
    * @function addMarker
    * 
    * Creates a new instance of a Marker on click and drops
    * marker on the click point 
    */
    var addMarker = function(e) {
        if( clicks <= 1 ) {
            positions.push(e.latLng);

            var marker = new api.Marker({
                map: map,
                position: e.latLng,
                flat: ( clicks === 0 ) ? true : false,
                animation: api.Animation.DROP,
                title: ( clicks === 0 ) ? 'Start' : 'End',
                icon: ( clicks === 0 ) ? 'img/start.png' : '',
                draggable: true,
                id: ( clicks === 0 ) ? 'Start' : 'End'
            });
            // @event trigger Adds location via locationAdd
            api.event.trigger( map, 'locationAdd', e );

        } else {
            // @event removeListener
            api.event.removeListener( mapClick );
            return false;
        }
    };

    /*
    * @event addListener
    * @fires addMarker
    * 
    * Listens for click on map that drops marker on map
    */
    var mapClick = api.event.addListener( map, 'click', addMarker );


});