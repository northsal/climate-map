// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });
    //var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    //create a geocoder object
    var geocoder = new google.maps.Geocoder();

    //geocode an address
    var addr1 = 'University of Washington, Seattle, WA';
    var coords1;
    geocoder.geocode({address: addr1}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //results is an array of possible matches
            //coordiantes for each are in geometery.location
            var coords = results[0].geometry.location;
            coords1 = new google.maps.LatLng(coords.lat(), coords.lng());
            var marker = new google.maps.Marker({
                position: coords1,
                map: map
            });
        }
    });

    var addr2 = "Seattle University, Seattle, WA";
    var coords2;
    geocoder.geocode({address: addr2}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //results is an array of possible matches
            //coordiantes for each are in geometery.location
            var coords = results[0].geometry.location;
            coords2 = new google.maps.LatLng(coords.lat(), coords.lng());
            var marker = new google.maps.Marker({
                position: coords2,
                map: map
            });
        }
    });
    calcRoute(coords1, coords2);
});

function calcRoute(start, end) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
        origin:start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if(status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
};