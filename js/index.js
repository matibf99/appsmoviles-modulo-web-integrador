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