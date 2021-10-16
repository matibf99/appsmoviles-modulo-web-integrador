const HISTORY_KEY = "history";

const getHistory = () => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY));

    if (history != null)
        return history;
    else
        return new Array();
}

const addRecipeToHistory = (item) => {
    let list = getHistory();

    if (!Array.isArray(list))
        list = new Array();

    let newList = list.filter(e => e.recipe.uri != item.recipe.uri);
    const history = [item].concat(newList)

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
}

export { getHistory, addRecipeToHistory, clearHistory };