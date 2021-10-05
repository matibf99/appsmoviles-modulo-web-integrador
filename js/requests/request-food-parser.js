const app_id = "app_id";
const app_key = "app_key";
const type = "type";

export default class RequestFoodParser {

    constructor() {
        this.q = q;
        this.calories = null;
    }

    setCalories(min,max) {
        this.calories = [min, max]
    }

    setQuery(q) {
        this.q = q;
    }

    
}