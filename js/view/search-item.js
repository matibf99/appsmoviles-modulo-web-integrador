import { calculatePrice } from "../utils/recipe-utils.js";
import { arrayToStringWithDash } from "../utils/array-to-string.js";

const getView = (recipeId, image, title, cuisine, mealType, numIngredients, calories, totalTime) => {
    const html = /*html*/`
    <article class="card-recipe" recipe-id="${recipeId}">
        <div class="card-recipe-time">
            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
            </svg>
            <span>${totalTime} minutes</span>
        </div>
        <a href="/html/share.html?id=${recipeId}&title=${title}" class="card-recipe-share">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
            </svg>
        </a>
        <img src="${image}" alt="" class="card-recipe-image">
        <a href="/html/recipe.html?id=${recipeId}" class="card-recipe-link">
            <div class="card-recipe-text">
                <h6 class="card-recipe-label">${arrayToStringWithDash(cuisine)}</h6>
                <h2 class="card-recipe-title">${title}</h2>
                <h6 class="card-recipe-subtitle">${mealType}</h6>
                <div class="card-recipe-info">
                    <p><span class="text-bold">${numIngredients}</span> ingredients</p>
                    <p><span class="text-red text-bold">${calories}</span> calories</p>
                </div>
                <h2 class="card-recipe-price">$${calculatePrice(calories)}</h2>
            </div>
        </a>
        <div class="card-recipe-cart">
            <button class="btn-cart">
                ADD TO CART
            </button>
            <button class="btn-cart-symbol btn-cart-minus">−</button>
            <p class="card-recipe-cart-quantity">1<p>
            <button class="btn-cart-symbol btn-cart-plus">+</button>
        </div>
    </article>`;

    return html;
}

const getViews = (items) => {
    const views = [];

    items.forEach(item => {
        const recipe = item.recipe;

        let recipeId = recipe.uri;
        recipeId = recipeId.substring(recipeId.indexOf("#")+1);

        const title = recipe.label;
        const image = recipe.image;

        let cuisine = recipe.cuisineType;

        let mealType = recipe.mealType;

        const calories = recipe.calories.toFixed(0);
        const numIngredients = recipe.ingredientLines.length;

        const totalTime = recipe.totalTime;

        const view =  getView(recipeId, image, title, cuisine, mealType, numIngredients, calories, totalTime);
        views.push(view);
    });

    return views;
}

export { getViews };