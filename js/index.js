import { getHistory } from "./utils/storage-history.js";
import { getViews } from "./view/search-item.js"

/* Functions */

const loadHistory = () => {
    const recipes = getHistory();
    console.log(recipes);

    const html = getViews(recipes);
    containerHistory.empty();
    containerHistory.append(html);
}

/* Variables */

const containerHistory = $(".history-content");

/* Load history */

loadHistory();

//nav toggle -select button and links
const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector("#nav-links");

//add event listener
navToggle.addEventListener("click", () => {
    nav.classList.toggle('nav-open')
});
