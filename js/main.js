import { RequestFoodParser } from '/js/requests/request-food-parser';

let body = RequestFoodParser()
    .setCalories(0, 1000)
    .setQuery("hamburger")
    .request();

console.log(body);