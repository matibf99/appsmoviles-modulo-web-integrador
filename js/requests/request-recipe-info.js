import { APP_ID_RECIPE, APP_KEY_RECIPE } from "../constants/key.js";

/**
 * Docs recipe API: https://developer.edamam.com/edamam-docs-recipe-api
 */

const RECIPE_INFO_URL = "https://api.edamam.com/api/recipes/v2/";

const FIELD_TYPE = "type";
const FIELD_APP_ID = "app_id";
const FIELD_APP_KEY = "app_key";

class RequestRecipeInfo {
    constructor(id) {
        this.id = id;
    }

    async get() {
        const params = new URLSearchParams();

        params.append(FIELD_TYPE, "public");
        params.append(FIELD_APP_ID, APP_ID_RECIPE);
        params.append(FIELD_APP_KEY, APP_KEY_RECIPE);

        const url = RECIPE_INFO_URL + this.id + "/?" + params.toString();

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

        return response.json();
    }
}

export { RequestRecipeInfo };