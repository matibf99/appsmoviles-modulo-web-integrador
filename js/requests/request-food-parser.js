import { APP_ID_FOOD, APP_ID_FOOD, APP_ID_RECIPE, APP_KEY_RECIPE } from "../constants/key";

const food_parser_url = "https://api.edamam.com/api/food-database/v2/parser?";

const FIELD_Q = "q";
const FIELD_APP_ID = "app_id";
const FIELD_APP_KEY = "app_key";
const FIELD_TYPE = "type";
const FIELD_CALORIES = "";

export default class RequestFoodParser {

    constructor() {
        this.q = FIELD_Q;
        this.calories = null;
    }

    setCalories(min,max) {
        this.calories = [min, max]
    }

    setQuery(q) {
        this.q = q;
    }

    request() {
        let url = "https://api.edamam.com/api/food-database/v2/parser?";

        const headers = new Headers();

        headers.append(FIELD_TYPE, "public");
        headers.append(FIELD_APP_ID, APP_ID_RECIPE);
        headers.append(FIELD_APP_KEY, APP_KEY_RECIPE);

        if (this.q != null)
            headers.append(FIELD_Q, this.q);

        if (this.calories != null)
            headers.append(FIELD_CALORIES, this.calories);

        url += headers.toString();

        const response = await fetch(food_parser_url, {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
        });

        return response.json();
    }
}