import { RequestRecipeSearch } from "./requests/request-recipe-search.js";
import { getViews } from "./view/search-item.js";

/* Important variables */

let loading = true;
let nextPage = null;

/* Functions */

const restoreFiltersFromParams = (urlParams) => {
    const calMin = urlParams.get("calMin");
    const calMax = urlParams.get("calMax");
    const ingrMin = urlParams.get("ingrMin");
    const ingrMax = urlParams.get("ingrMax");

    const diet = urlParams.getAll("diet");
    const cuisineType = urlParams.getAll("cuisineType");
    const mealType = urlParams.getAll("mealType");

    if (calMin)
        caloriesMin.val(calMin);

    if (calMax)
        caloriesMax.val(calMax);

    if (ingrMin)
        ingredientsMin.val(ingrMin);

    if (ingrMax)
        ingredientsMax.val(ingrMax);

    if (diet) {
        diet.forEach(element => {
            $(`#${element}`).attr("checked", true);
        });
    }

    if (cuisineType) {
        cuisineType.forEach(element => {
            $(`#${element}`).attr("checked", true);
        });
    }

    if (mealType) {
        mealType.forEach(element => {
            $(`#${element}`).attr("checked", true);
        });
    }
}

const getRecipes = async (query) => {
    const newUrlParams = new URLSearchParams();

    newUrlParams.append("q", query);

    if (caloriesMin.val())
        newUrlParams.append("calMin", caloriesMin.val());

    if (caloriesMax.val())
        newUrlParams.append("calMax", caloriesMax.val())

    if (ingredientsMin.val())
        newUrlParams.append("ingrMin", ingredientsMin.val());

    if (ingredientsMax.val())
        newUrlParams.append("ingrMax", ingredientsMax.val());

    const request = new RequestRecipeSearch()
        .setQuery(query)
        .setNumberIngredients(ingredientsMin.val(), ingredientsMax.val())
        .setCalories(caloriesMin.val(), caloriesMax.val());

    dietFilters.each((index, element) => {
        if ($(element).prop("checked") == true) {
            request.addDiet($(element).attr("id"));
            newUrlParams.append("diet", $(element).attr("id"));
        }
    });

    cuisineTypeFilters.each((index, element) => {
        if ($(element).prop("checked") == true) {
            let cuisine = $(element).closest("div").find("label").text();
            request.addCuisineType(cuisine);
            newUrlParams.append("cuisineType", cuisine);
        }
    });

    mealTypeFilters.each((index, element) => {
        if ($(element).prop("checked") == true) {
            let meal = $(element).closest("div").find("label").text();
            request.addMealType(meal);
            newUrlParams.append("mealType", meal);
        }
    });

    const refresh_url = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newUrlParams.toString()}`;
    history.pushState(null, null, refresh_url);

    return await request.get();
}

const loadResults = async () => {
    const response = await getRecipes(urlParams.get("q"));
    nextPage = response._links.next.href;

    const views = getViews(response.hits);

    views.forEach(element => {
        searchContent.append(element);
    });

    loading = false;
}

const loadMore = async () => {
    loading = true;

    const string = nextPage.substring(nextPage.indexOf("?")+1);
    const urlParams = new URLSearchParams(string);
    console.log(string);

    const res = new RequestRecipeSearch()
        .setQuery(urlParams.get("q"))
        .setCont(urlParams.get("_cont"));

    const response = await res.get();
    nextPage = response._links.next.href;

    const views = getViews(response.hits);

    views.forEach(element => {
        searchContent.append(element);
    });

    loading = false;
}

/* Create a constant for each filter */

// Amount of ingredients
const ingredientsMin = $("#ingr-min");
const ingredientsMax = $("#ingr-max");

// Calories
const caloriesMin = $("#min-calories");
const caloriesMax = $("#max-calories");

// Diet
const dietFilters = $("#diet").find("input");

// Cuisine type
const cuisineTypeFilters = $("#cuisine-type").find("input");

// Meal type
const mealTypeFilters = $("#meal-type").find("input");

// Apply filters button
const button = $("#btn-apply-filters");
button.on("click", (e) => {
    getRecipes(urlParams.get("q"));
});

// Search content
const searchContent = $(".search-content");

/* Get URLSearchParameters */

const urlParams = new URLSearchParams(window.location.search);
restoreFiltersFromParams(urlParams);

/* Load results */

await loadResults();

/* Add more elements on scroll */

$(window).on("scroll", async () => {
    if(!loading && $(window).scrollTop() >= searchContent.offset().top + searchContent.outerHeight() - window.innerHeight) {
        console.log('end reached');

        if (nextPage != null || nextPage.length > 0) {
            await loadMore();
        }
    }
});