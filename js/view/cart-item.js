const getView = (recipeId, image, title, cuisine, quantity, price) => {
    const html = /*html*/`
    <article class="cart-product" recipe-id="${recipeId}">
        <div class="cart-product-details">
            <img src="${image}" alt="" class="cart-product-details-img">
            <div class="cart-product-details-text">
                <h6 class="cart-product-details-label">${cuisine}</h6>
                <a href="/html/recipe.html?id=${recipeId}" class="cart-product-details-title">${title}</a>
            </div>
        </div>
        <div class="cart-product-quantity">
            <button class="cart-btn-quantity btn-cart-minus">−</button>
            <p class="cart-text-quantity">${quantity}<p>
            <button class="cart-btn-quantity btn-cart-plus">+</button>
        </div>
        <p class="cart-product-price text-center">$${price.toFixed(2)}</p>
        <p class="cart-product-total text-center">$${(price*quantity).toFixed(2)}</p>
    </article>
    `;

    return html;
}

const renderCartItems = (recipes) => {
    const views = [];

    recipes.forEach(recipe => {
        const view = getView(recipe.recipeId, recipe.image, recipe.title, recipe.cuisine,
            recipe.quantity, recipe.price);

        views.push(view);
    });

    return views;
}

export { renderCartItems };