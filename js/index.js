import { clearHistory, getHistory } from "./utils/storage-history.js";
import { addRecipeToCart } from "./utils/storage-cart.js";
import { renderHistoryEmpty } from "./view/history-empty.js";
import { getViews } from "./view/search-item.js";
import { renderAlert } from "./view/alert-view.js";

/* Functions */

const loadHistory = () => {
    const recipes = getHistory();

    if (recipes.length > 0) {
        const html = getViews(recipes);
        containerHistory.empty();
        containerHistory.append(html);

        initCartButtons();
    } else {
        const html = renderHistoryEmpty();
        containerHistory.empty();
        containerHistory.append(html);
    }
}

const initCartButtons = () => {
    const btnsMinus = $(".btn-cart-minus");
    const btnsPlus = $(".btn-cart-plus");

    const btnsAddToCart = $(".btn-cart");

    btnsMinus.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-cart").find(".card-recipe-cart-quantity");

        if (quantityText.text() > 1)
            quantityText.text(parseInt(quantityText.text()) - 1);
        else
            quantityText.text(1);
    });

    btnsPlus.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-cart").find(".card-recipe-cart-quantity");
        quantityText.text(parseInt(quantityText.text()) + 1);
    });

    btnsAddToCart.on("click", (e) => {
        const quantity = $(e.target).closest(".card-recipe-cart").find(".card-recipe-cart-quantity").text();
        if (quantity < 1)
            quantity = 1;

        const elemRecipe = $(e.target).closest(".card-recipe");

        const recipeId = elemRecipe.attr("recipe-id");
        const title = elemRecipe.find(".card-recipe-title").text();
        const cuisine = elemRecipe.find(".card-recipe-label").text();
        const mealType = elemRecipe.find(".card-recipe-subtitle").text();
        const image = elemRecipe.find(".card-recipe-image").attr("src");
        const price = parseFloat(elemRecipe.find(".card-recipe-price").text().replace("$", ""));

        const recipe = {
            recipeId: recipeId,
            title: title,
            cuisine: cuisine,
            mealType: mealType,
            image: image,
            price: price
        };

        addRecipeToCart(quantity, recipe);

        const alertHtml = renderAlert(`${title} (${quantity}) was successfully added to your cart.`);

        $("body").append(alertHtml);
        const alert = $(".alert");
        alert.fadeIn(250);

        setTimeout(() => {
            alert.fadeOut(250);

            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 1500);
    });
}

/* Variables */

const containerHistory = $(".history-content");

const btnEmpty = $(".btn-empty-history");
btnEmpty.on("click", (e) => {
    clearHistory();
    loadHistory();
});

/* Load history */

loadHistory();
