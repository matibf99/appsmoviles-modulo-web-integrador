import { RequestFoodParser } from "./requests/request-food-parser.js";
import { RequestRecipeSearch } from "./requests/request-recipe-search.js";
import { RequestRecipeInfo } from "./requests/request-recipe-info.js";

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


let body = new RequestFoodParser();

//body.setCalories(0, 1000);
body.setQuery("pizza");

const result = await body.get();
console.log(result);


let requestRecipe = new RequestRecipeSearch()
    .setQuery("pizza")
    //.setCalories(0, 2000);

const result2 = await requestRecipe.get();
console.log(result2);

let requestRecipeInfo = new RequestRecipeInfo("recipe_bcb8d69657ac1ee0ea44b9afbee042a8");
const result3 = await requestRecipeInfo.get();
console.log(result3);