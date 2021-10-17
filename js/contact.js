/* Map */ 
const mymap = L.map('mapid').setView([-34.9225759, -57.9554079], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);


var myIcon = L.icon({
    iconUrl: '/img/map-marker-icon.png',
    iconSize: [38, 50],
    iconAnchor: [23, 94],
    popupAnchor: [-3, -76],
});

L.marker([-34.9225759, -57.9554079], {icon: myIcon}).addTo(mymap).bindPopup('ProDiet').openPopup();
