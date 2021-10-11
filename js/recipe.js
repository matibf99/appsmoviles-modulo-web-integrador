import { RequestRecipeInfo } from "./requests/request-recipe-info.js";
import { renderRecipe } from "./view/recipe-view.js";

console.log("hi")

/* Functions */

const loadRecipe = async (recipeId) => {
    const response = await new RequestRecipeInfo(recipeId).get();

    const html = renderRecipe(response.recipe);
    containerRecipe.empty();
    containerRecipe.append(html);
}

const initCartButtons = () => {
    const btnsMinus = $(".btn-cart-minus");
    const btnsPlus = $(".btn-cart-plus");

    const btnsAddToCart = $(".btn-cart");

    btnsMinus.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-summary-cart").find(".card-recipe-cart-quantity");

        if (quantityText.text() > 1)
            quantityText.text(parseInt(quantityText.text()) - 1);
    });

    btnsPlus.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-summary-cart").find(".card-recipe-cart-quantity");
        quantityText.text(parseInt(quantityText.text()) + 1);
    });

    btnsAddToCart.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-summary-cart").find(".card-recipe-cart-quantity");
        console.log(quantityText.text());
    });
}

/* HTML Elements */

const containerRecipe = $(".container-recipe");

/* Load recipe from query params */

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get("id"));
await loadRecipe(urlParams.get("id"));

initCartButtons();
