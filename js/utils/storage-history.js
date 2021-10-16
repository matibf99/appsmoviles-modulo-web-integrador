const HISTORY_KEY = "history";

const getHistory = () => {
    return JSON.parse(localStorage.getItem(HISTORY_KEY));
}

const addRecipeToHistory = (recipe) => {
    let list = getHistory();

    if (!Array.isArray(list))
        list = new Array();

    let newList = list.filter(e => e.reicpeId != recipe.recipeId);
    newList.push(recipe);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(newList));
}

const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
}

export { getHistory, addRecipeToHistory, clearHistory };