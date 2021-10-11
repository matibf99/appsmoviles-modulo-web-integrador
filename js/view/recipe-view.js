const arrayToString = (array) => {
    let s = "";

    for (let i = 0; i < array.length; i++) {
        if (i < array.length-1)
            s += `${array[i]}, `;
        else
            s += `${array[i]}`;
    }

    return s;
}

const htmlArrayToString = (array) => {
    let s = "";

    for (let i = 0; i < array.length; i++) {
        s += `${array[i]}`
    }

    return s;
}

const getView = (image, title, cuisine, mealType, totalTime, numberIngredients, dishType,
    calories, dietLabels, healthLabels, cautions, ingredients, totalNutrients, totalNutrientsDaily) => {

    const summaryCard = /*html*/`
    <section class="card-recipe-common card-recipe-summary">
        <div class="card-recipe-summary-time">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
            </svg>
            <span>${totalTime} minutes</span>
        </div>
        <img src="${image}" alt="" class="card-recipe-summary-img">
        <div class="card-recipe-summary-info">
            <h3 class="card-recipe-summary-label">${cuisine}</h3>
            <h1 class="card-recipe-summary-title">${title}</h1>
        </div>
        <div class="card-recipe-summary-extra">
            <p><span class="text-bold">Meal type:</span> <span>${mealType}</span></p>
            <p><span class="text-bold">Dish type:</span> <span>${dishType}</span></p>
            <p><span class="text-bold">Calories:</span> <span>${calories}</span></p>
            <p><span class="text-bold">Ingredients:</span> <span>${numberIngredients}</span></p>
            <p><span class="text-bold">Diet labels:</span> <span>${arrayToString(dietLabels)}</span></p>
            <p><span class="text-bold">Health labels:</span> <span>${arrayToString(healthLabels)}</span></p>
            <p><span class="text-bold">Cautions:</span> <span>${arrayToString(cautions)}</span></p>
        </div>
    </section>
    `;

    const ingredientCards = [];

    ingredients.forEach(element => {
        const ingredientCard = /*html*/`
            <article class="recipe-ingredient">
                <div class="recipe-ingredient-quantity">
                    <h1 class="recipe-ingredient-quantity-count">${element.quantity}</h1>
                    <h3 class="recipe-ingredient-quantity-unit">${element.measure}</h3>
                </div>
                <img src="${element.image}" alt="" class="recipe-ingredient-img">
                <div class="recipe-ingredient-text">
                    <h5 class="recipe-ingredient-label">${element.foodCategory}</h5>
                    <h2 class="recipe-ingredient-title">${element.food}</h2>
                </div>
            </article>
        `;

        ingredientCards.push(ingredientCard);
    });

    const nutrientCards = [];

    var totalNutrientsValues = $.map(totalNutrients, function(value, key) { return value });
    var totalNutrientsDailyValues = $.map(totalNutrientsDaily, function(value, key) { return value });

    console.log(totalNutrientsValues);
    console.log(totalNutrientsDailyValues);

    for (let i=0; i<totalNutrientsValues.length; i++) {
        const totalNutrient = totalNutrientsValues[i];
        const dailyNutrient = totalNutrientsDailyValues[i];

        const nutrientCard = /*html*/`
            <article class="recipe-nutrition">
                <p><span class="text-bold">${totalNutrient.label}</span></p>
                <p>${totalNutrient.quantity.toFixed(2)} ${totalNutrient.unit}</p>
            </article>
        `;

        nutrientCards.push(nutrientCard);
    }

    const html = /*html*/`
        ${summaryCard}
        <div class="container-recipe-data">
            <section class="card-recipe-ingredients">
                <h2 class="recipe-section-title">Ingredients</h2>
                ${htmlArrayToString(ingredientCards)}
            </section>
            <section class="card-recipe-nutrition">
                <h2 class="recipe-section-title">Nutrients</h2>
                ${htmlArrayToString(nutrientCards)}
            </section>
        </div>
    `;

    return html;
}

const renderRecipe = (recipe) => {
    console.log(recipe);

    const title = recipe.label;
    const image = recipe.image;

    const totalTime = recipe.totalTime;

    let cuisine = recipe.cuisineType[0];
    cuisine = cuisine[0].toUpperCase() + cuisine.slice(1);

    let mealType = recipe.mealType;

    let calories = recipe.calories.toString();
    calories = calories.substring(0, calories.lastIndexOf("."));

    const dishType = recipe.dishType;
    const dietLabels = recipe.dietLabels;
    const healthLabels = recipe.healthLabels;
    const cautions = recipe.cautions;

    const numIngredients = recipe.ingredientLines.length;
    const ingredients = recipe.ingredients;

    const totalNutrients = recipe.totalNutrients;
    const totalNutrientsDaily = recipe.totalDaily;

    console.log(totalNutrients);
    console.log(totalNutrientsDaily);

    const html = getView(image, title, cuisine, mealType, totalTime,
        numIngredients, dishType, calories, dietLabels, healthLabels,
        cautions, ingredients, totalNutrients, totalNutrientsDaily);

    return html;
}

export { renderRecipe };