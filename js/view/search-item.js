const getView = (image, title, cuisine, mealType, numIngredients, calories, totalTime) => {
    const html = /*html*/`
    <article class="card-recipe">
        <div class="card-recipe-time">
            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
            </svg>
            <span>${totalTime} minutes</span>
        </div>
        <img src="${image}" alt="" class="card-recipe-image">
        <div class="card-recipe-text">
            <h6 class="card-recipe-label">${cuisine}</h6>
            <h2 class="card-recipe-title">${title}</h2>
            <h6 class="card-recipe-subtitle">${mealType}</h6>
            <div class="card-recipe-info">
                <p><span class="text-blue text-bold">${numIngredients}</span> ingredients</p>
                <p><span class="text-red text-bold">${calories}</span> calories</p>
            </div>
        </div>
    </article>`;

    return html;
}

const getViews = (items) => {
    const views = [];

    items.forEach(item => {
        const recipe = item.recipe;

        const title = recipe.label;
        const image = recipe.image;

        let cuisine = recipe.cuisineType[0];
        cuisine = cuisine[0].toUpperCase() + cuisine.slice(1);

        let mealType = recipe.mealType;

        let calories = recipe.calories.toString();
        calories = calories.substring(0, calories.lastIndexOf("."));

        const numIngredients = recipe.ingredientLines.length;

        const totalTime = recipe.totalTime;

        const view =  getView(image, title, cuisine, mealType, numIngredients, calories, totalTime);
        views.push(view);
    });

    return views;
}

export { getViews };