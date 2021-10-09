import { APP_ID_FOOD, APP_KEY_FOOD } from "../constants/key.js";

/**
 * Docs food API: https://developer.edamam.com/food-database-api-docs
 */

const FOOD_PARSER_URL = "https://api.edamam.com/api/food-database/v2/parser?";

const FIELD_INGR = "ingr";
const FIELD_APP_ID = "app_id";
const FIELD_APP_KEY = "app_key";
const FIELD_TYPE = "type";
const FIELD_CALORIES = "calories";

class RequestFoodParser {

    constructor() {
        this.ingr = null;
        this.calories = null;
    }

    setCalories(min, max) {
        this.calories = `${min}-${max}`;
        return this;
    }

    setQuery(q) {
        this.ingr = q;
        return this;
    }

    async get() {
        const params = new URLSearchParams();

        params.append(FIELD_TYPE, "public");
        params.append(FIELD_APP_ID, APP_ID_FOOD);
        params.append(FIELD_APP_KEY, APP_KEY_FOOD);

        if (this.ingr != null)
            params.append(FIELD_INGR, this.ingr);

        if (this.calories != null)
            params.append(FIELD_CALORIES, this.calories);

        let url = FOOD_PARSER_URL + params.toString();
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

export { RequestFoodParser };