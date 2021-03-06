/**
 * Created by:
 * User: vaishali
 * Date: 6/6/13
 * Time: 10:31 AM
 */

// Determine support for Geolocation
if (navigator.geolocation) {
    // Locate position
    navigator.geolocation.getCurrentPosition(displayPosition, errorFunction);
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

if (localStorage.getItem('prevLong')===null) localStorage.setItem('prevLong', 0);
if (localStorage.getItem('prevLat')===null) localStorage.setItem('prevLat', 0);


// Success callback function
function displayPosition(pos) {
    var mylat = pos.coords.latitude;
    var mylong = pos.coords.longitude;
    var thediv = document.getElementById('locationinfo');

    thediv.innerHTML = '<p>Your longitude is: ' +
        mylong + ' and your latitide is ' + mylat + '</p>';

    //Load Google Map
    var latlng = new google.maps.LatLng(mylat, mylong);

    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


    var latlngPrevious = new google.maps.LatLng(localStorage.getItem('prevLat'),localStorage.getItem('prevLong'));
    var markerPrevious = new google.maps.Marker ({
        position: latlngPrevious,
        map: map,
        title:"Last time you were here",
        icon: "http://maps.google.com/mapfiles/ms/icons/pink-pushpin.png"
    });

    //Add marker
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"You are here",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });

    var distance = google.maps.geometry.spherical.computeDistanceBetween(latlng, latlngPrevious);

    $('#distance').html = '<p>Distance to previous location is: ' +
        distance + ' meters</p>';
    localStorage.setItem('prevLong',mylong);
    localStorage.setItem('prevLat',mylat);

    $('#map_header').html('Previous and Current Location');
    $('#form_legend').html('Change your previous Location');
    $('#lat_label').html('Latitude');
    $('#long_label').html('Longitude');
    $('#change_button').html('Change');
    $('#prevLat').attr('value',localStorage.getItem('previousLat'));
    $('#prevLong').attr('value',localStorage.getItem('previousLong'));

}

// Error callback function
function errorFunction(pos) {
    alert('Error!');
}

function changeLocalSetorageLatLang(lat,long){
    localStorage.setItem('prevLong',long);
    localStorage.setItem('prevLat',lat);
}

