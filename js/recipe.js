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

/* HTML Elements */

const containerRecipe = $(".container-recipe");

/* Load recipe from query params */

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get("id"));
await loadRecipe(urlParams.get("id"));
