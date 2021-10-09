import { RequestFoodParser } from "./requests/request-food-parser.js";
import { RequestRecipeSearch } from "./requests/request-recipe-search.js";
import { RequestRecipeInfo } from "./requests/request-recipe-info.js";

let body = new RequestFoodParser();

//body.setCalories(0, 1000);
body.setQuery("pizza");

const result = await body.get();
console.log(result);


let requestRecipe = new RequestRecipeSearch()
    .setQuery("pizza")
    //.setCalories(0, 2000);

const result2 = await requestRecipe.get();
console.log(result2);

let requestRecipeInfo = new RequestRecipeInfo("recipe_bcb8d69657ac1ee0ea44b9afbee042a8");
const result3 = await requestRecipeInfo.get();
console.log(result3);