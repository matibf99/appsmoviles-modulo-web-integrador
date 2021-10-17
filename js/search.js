import { RequestRecipeSearch } from "./requests/request-recipe-search.js";
import { getViews } from "./view/search-item.js";
import { addRecipeToCart } from "./utils/storage-cart.js";
import { renderSearchEmpty } from "./view/search-empty.js";
import { renderAlert } from "./view/alert-view.js";

/* Variables */

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

const loadResults = async () => {
    loading = true;

    const newUrlParams = new URLSearchParams();

    newUrlParams.append("q", urlParams.get("q"));

    if (caloriesMin.val())
        newUrlParams.append("calMin", caloriesMin.val());

    if (caloriesMax.val())
        newUrlParams.append("calMax", caloriesMax.val())

    if (ingredientsMin.val())
        newUrlParams.append("ingrMin", ingredientsMin.val());

    if (ingredientsMax.val())
        newUrlParams.append("ingrMax", ingredientsMax.val());

    const request = new RequestRecipeSearch()
        .setQuery(urlParams.get("q"))
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

    const response = await request.get();

    try {
        nextPage = response._links.next.href;
    } catch (error) {
        nextPage = null;
    }

    searchQuery.text(`"${urlParams.get("q")}"`);
    searchNumResults.text(`${response.count} results`)

    if (response.hits.length > 0) {
        const views = getViews(response.hits);

        searchContent.empty();
        views.forEach(element => {
            searchContent.append(element);
        });

        initCartButtons();
    } else {
        const html = renderSearchEmpty();

        searchContent.empty();
        searchContent.append(html);
    }

    loading = false;
}

const loadMore = async () => {
    loading = true;

    const paramsString = nextPage.substring(nextPage.indexOf("?")+1);
    const urlParams = new URLSearchParams(paramsString);

    const res = new RequestRecipeSearch()
        .setQuery(urlParams.get("q"))
        .setCont(urlParams.get("_cont"));

    const response = await res.get();

    try {
        nextPage = response._links.next.href;
    } catch (error) {
        nextPage = null;
    }

    const views = getViews(response.hits);

    views.forEach(element => {
        searchContent.append(element);
    });

    initCartButtons();

    loading = false;
}

const resetResults = () => {
    searchContent.empty();
}

const initCartButtons = () => {
    const btnsMinus = $(".btn-cart-minus");
    const btnsPlus = $(".btn-cart-plus");

    const btnsAddToCart = $(".btn-cart");

    btnsMinus.unbind("click");
    btnsMinus.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-cart").find(".card-recipe-cart-quantity");

        if (quantityText.text() > 1)
            quantityText.text(parseInt(quantityText.text()) - 1);
        else
            quantityText.text(1);
    });

    btnsPlus.unbind("click");
    btnsPlus.on("click", (e) => {
        const quantityText = $(e.target).closest(".card-recipe-cart").find(".card-recipe-cart-quantity");
        quantityText.text(parseInt(quantityText.text()) + 1);
    });

    btnsAddToCart.unbind("click");
    btnsAddToCart.on("click", (e) => {
        const quantity = $(e.target).closest(".card-recipe-cart").find(".card-recipe-cart-quantity").text();
        if (quantity < 1)
            quantity = 1;

        const elemRecipe = $(e.target).closest(".card-recipe");

        const recipeId = elemRecipe.attr("recipe-id");
        const title = elemRecipe.find(".card-recipe-title").text();
        const cuisine = elemRecipe.find(".card-recipe-label").text();
        const mealType = elemRecipe.find(".card-recipe-subtitle").text();
        const image = elemRecipe.find(".card-recipe-image").attr("src");
        const price = parseFloat(elemRecipe.find(".card-recipe-price").text().replace("$", ""));

        const recipe = {
            recipeId: recipeId,
            title: title,
            cuisine: cuisine,
            mealType: mealType,
            image: image,
            price: price
        };

        addRecipeToCart(quantity, recipe);

        const alertHtml = renderAlert(`${title} (${quantity}) was successfully added to your cart.`);
        $("body").append(alertHtml);
        const alert = $(".alert");
        alert.fadeIn(250);

        setTimeout(() => {
            alert.fadeOut(250);

            setTimeout(() => {
                alert.remove();
            }, 250);
        }, 1500);
    });
}

/* Create a constant for each filter */

// Amount of ingredients
const ingredientsMin = $("#ingr-min");
const ingredientsMax = $("#ingr-max");

// Calories
const caloriesMin = $("#cal-min");
const caloriesMax = $("#cal-max");

// Diet
const dietFilters = $("#diet").find("input");

// Cuisine type
const cuisineTypeFilters = $("#cuisine-type").find("input");

// Meal type
const mealTypeFilters = $("#meal-type").find("input");

// Apply filters button
const button = $("#btn-apply-filters");
button.on("click", (e) => {
    resetResults();
    loadResults();
});

// Filters list
const filtersList = $(".search-filters-list");

// Show more filters (mobile)
const btnShowFilters = $("#show-more-filters");
btnShowFilters.on("click", () => {
    filtersList.slideToggle();
    filtersList.toggleClass("visible");

    if (filtersList.hasClass("visible")) {
        btnShowFilters.text("Hide filters");
    } else {
        btnShowFilters.text("Show filters");
    }
})

// Search result texts
const searchQuery = $(".search-query");
const searchNumResults = $(".search-n-results");

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
        if (nextPage != null && nextPage.length > 0) {
            await loadMore();
        }
    }
});