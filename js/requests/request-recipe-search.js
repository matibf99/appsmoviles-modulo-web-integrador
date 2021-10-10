import { APP_ID_RECIPE, APP_KEY_RECIPE } from "../constants/key.js";

/**
 * Docs recipe API: https://developer.edamam.com/edamam-docs-recipe-api
 */

const REQUEST_RECIPE_URL = "https://api.edamam.com/api/recipes/v2?";

const FIELD_TYPE = "type";
const FIELD_APP_ID = "app_id";
const FIELD_APP_KEY = "app_key";
const FIELD_Q = "q";
const FIELD_INGR = "ingr";
const FIELD_DIET = "diet";
const FIELD_HEALTH = "health";
const FIELD_CUISINE_TYPE = "cuisineType";
const FIELD_MEAL_TYPE = "mealType";
const FIELD_DISH_TYPE = "dishType";
const FIELD_CALORIES = "calories";

class RequestRecipeSearch {
    constructor() {
        this.q = null;
        this.ingr = null;
        this.diet = [];
        this.health = [];
        this.cuisineType = [];
        this.mealType = [];
        this.dishType = [];
        this.calories = null;
    }

    setQuery(q) {
        this.q = q;
        return this;
    }

    setNumberIngredients(min, max) {
        if (min == 0)
            this.ingr = `${max}`;
        else if (max == 0)
            this.ingr = `${min}%2B`;
        else
            this.ingr = `${min}-${max}`;

        return this;
    }

    addDiet(type) {
        this.diet.push(type);
        return this;
    }

    addHealth(type) {
        this.health.push(type);
        return this;
    }

    addCuisineType(type) {
        this.cuisineType.push(type);
        return this;
    }

    addMealType(type) {
        this.mealType.push(type);
        return this;
    }

    addDishType(type) {
        this.dishType.push(type);
        return this;
    }

    setCalories(min, max) {
        this.calories = `${min}-${max}`;
        return this;
    }

    async get() {
        const params = new URLSearchParams();

        params.append(FIELD_TYPE, "public");
        params.append(FIELD_APP_ID, APP_ID_RECIPE);
        params.append(FIELD_APP_KEY, APP_KEY_RECIPE);

        if (this.q != null)
            params.append(FIELD_Q, this.q);

        if (this.ingr != null)
            params.append(FIELD_INGR, this.ingr);

        if (this.diet.length > 0)
            this.diet.forEach(d => params.append(FIELD_DIET, d));

        if (this.health.length > 0)
            this.health.forEach(h => params.append(FIELD_HEALTH, h));

        if (this.cuisineType.length > 0)
            this.cuisineType.forEach(c => params.append(FIELD_CUISINE_TYPE, c));

        if (this.mealType.length > 0)
            this.mealType.forEach(m => params.append(FIELD_MEAL_TYPE, m));

        if (this.dishType.length > 0)
            this.dishType.forEach(d => params.append(FIELD_DISH_TYPE, d));

        if (this.calories != null)
            params.append(FIELD_CALORIES, this.calories);

        let url = REQUEST_RECIPE_URL + params.toString();
        console.log(url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "*/*",
                "Access-Control-Allow-Origin" : "*",
                "Accept-Encoding": "gzip, deflate, br"
            },
            mode: "cors",
            cache: "default"
        });

        console.log(response);
        return response.json();
    }
}

export { RequestRecipeSearch };