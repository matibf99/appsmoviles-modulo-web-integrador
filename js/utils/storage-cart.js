const CART_KEY = "cart";

const getCart = () => {
    return JSON.parse(localStorage.getItem(CART_KEY));
}

const addRecipeToCart = (quantity, recipe) => {
    let list = getCart();

    if (!Array.isArray(list))
        list = new Array();

    const recipeExists = list.find(e => e.recipeId == recipe.recipeId);
    if (recipeExists == null) {
        let newRecipe = recipe;
        recipe.quantity = parseInt(quantity);

        list.push(newRecipe);
    } else {
        recipeExists.quantity += parseInt(quantity);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(list));
}

const setRecipeQuantityInCart = (quantity, recipeId) => {
    let list = getCart();

    if (!Array.isArray(list))
        list = new Array();

    const recipeExists = list.find(e => e.recipeId == recipeId);
    if (recipeExists != null)
        recipeExists.quantity = parseInt(quantity);

    localStorage.setItem(CART_KEY, JSON.stringify(list));
}

const removeRecipeQuantityFromCart = (quantity, recipeId) => {
    let list = getCart();

    if (!Array.isArray(list))
        return null;

    const recipeExists = list.find(e => e.recipeId == recipeId);
    if (recipeExists == null)
        return;

    recipeExists.quantity -= parseInt(quantity);
    if (recipeExists.quantity <= 0)
        list = list.filter(e => e.recipeId != recipeId);

    localStorage.setItem(CART_KEY, JSON.stringify(list));
}

const removeRecipeFromCart = (recipeId) => {
    let list = getCart();

    if (!Array.isArray(list))
        return;

    let newList = list.filter(e => e.recipeId != recipeId);
    localStorage.setItem(CART_KEY, JSON.stringify(newList));
}

const clearRecipesFromCart = () => {
    localStorage.removeItem(CART_KEY);
}

const getRecipeTotalPrice = (recipeId) => {
    const list = getCart();

    if (!Array.isArray(list))
        return 0;

    const recipeExists = list.find(e => e.recipeId == recipeId);
    if (recipeExists != null)
        return recipeExists.price * recipeExists.quantity;

    return 0;
}

const getTotalPrice = () => {
    const list = getCart();

    if (!Array.isArray(list))
        return 0;

    let totalPrice = 0;
    list.forEach(element => {
        totalPrice += element.price * element.quantity;
    });

    return totalPrice;
}

export { getCart, addRecipeToCart, setRecipeQuantityInCart,
    removeRecipeQuantityFromCart, removeRecipeFromCart, clearRecipesFromCart,
    getRecipeTotalPrice, getTotalPrice }