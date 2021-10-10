const getView = (image, title, cuisine, mealType, numIngredients, calories) => {
    const html = /*html*/`
    <article class="card-recipe">
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

        const view =  getView(image, title, cuisine, mealType, numIngredients, calories);
        views.push(view);
    });

    return views;
}

export { getViews };