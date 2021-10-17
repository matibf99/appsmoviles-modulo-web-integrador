import { getHistory } from "./utils/storage-history.js";
import { renderHistoryEmpty } from "./view/history-empty.js";
import { getViews } from "./view/search-item.js"

/* Functions */

const loadHistory = () => {
    const recipes = getHistory();
    console.log(recipes);

    if (recipes.length > 0) {
        const html = getViews(recipes);
        containerHistory.empty();
        containerHistory.append(html);
    } else {
        const html = renderHistoryEmpty();
        containerHistory.empty();
        containerHistory.append(html);
    }
}

/* Variables */

const containerHistory = $(".history-content");

/* Load history */

loadHistory();
