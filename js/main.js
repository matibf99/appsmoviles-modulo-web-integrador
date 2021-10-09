const hum = document.querySelector('.boton-hum');
const enlaces = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.boton-hum span');

hum.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => {child.classList.toggle('animado')});
});



const mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);


var myIcon = L.icon({
    iconUrl: '/img/map-marker-icon.png',
    iconSize: [38, 50],
    iconAnchor: [23, 94],
    popupAnchor: [-3, -76],
});

L.marker([51.505, -0.09], {icon: myIcon}).addTo(mymap).bindPopup('ProDiet')
.openPopup();