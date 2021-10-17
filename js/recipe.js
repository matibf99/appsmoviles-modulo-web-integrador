import { RequestRecipeInfo } from "./requests/request-recipe-info.js";
import { renderRecipe } from "./view/recipe-view.js";
import { addRecipeToCart } from "./utils/storage-cart.js";
import { addRecipeToHistory } from "./utils/storage-history.js";
import { renderAlert } from "./view/alert-view.js";

/* Functions */

const loadRecipe = async (recipeId) => {
    const response = await new RequestRecipeInfo(recipeId).get();

    const html = renderRecipe(response.recipe);
    containerRecipe.empty();
    containerRecipe.append(html);

    let recipe = response;
    addRecipeToHistory(recipe);
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
        const quantity = $(e.target).closest(".card-recipe-summary-cart").find(".card-recipe-cart-quantity").text();

        const elemRecipe = $(".card-recipe-summary");

        const recipeId = urlParams.get("id");
        const title = elemRecipe.find(".card-recipe-summary-title").text();
        const cuisine = elemRecipe.find(".card-recipe-summary-label").text();
        const mealType = elemRecipe.find("#meal-type").text();
        const image = elemRecipe.find(".card-recipe-summary-img").attr("src");
        const price = parseFloat(elemRecipe.find(".card-recipe-summary-price").text().replace("$", ""));

        const recipe = {
            recipeId: recipeId,
            title: title,
            cuisine: cuisine,
            mealType: mealType,
            image: image,
            price: price
        };

        console.log(recipe);

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

/* HTML Elements */

const containerRecipe = $(".container-recipe");

/* Load recipe from query params */

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get("id"));
await loadRecipe(urlParams.get("id"));

initCartButtons();
