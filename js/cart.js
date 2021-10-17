import { clearRecipesFromCart, getCart, getRecipeTotalPrice, getTotalPrice, removeRecipeFromCart, setRecipeQuantityInCart } from "./utils/storage-cart.js";
import { renderCartEmpty } from "./view/cart-empty.js";
import { renderCartItems } from "./view/cart-item.js";

/* Functions */

const loadProducts = () => {
    const items = getCart();

    cartProducts.empty();
    if (items != null && items.length > 0) {
        const views = renderCartItems(items);

        views.forEach(element => {
            cartProducts.append(element);
        });

        initCartButtons();
    } else {
        const html = renderCartEmpty();
        cartProducts.append(html);
    }

    refreshTotal();
}

const initCartButtons = () => {
    console.log("hi2");

    const btnsMinus = $(".btn-cart-minus");
    const btnsPlus = $(".btn-cart-plus");
    const btnsDelete = $(".cart-product-delete");

    btnsMinus.on("click", (e) => {
        const element = $(e.target).closest(".cart-product");
        refreshProduct(element, -1);

        refreshTotal();
    });

    btnsPlus.on("click", (e) => {
        const element = $(e.target).closest(".cart-product");
        refreshProduct(element, +1);

        refreshTotal();
    });

    btnsDelete.on("click", (e) => {
        const element = $(e.target).closest(".cart-product");

        const recipeId = element.attr("recipe-id");
        removeRecipeFromCart(recipeId);

        loadProducts();
    })
}

const refreshTotal = () => {
    const total = getTotalPrice();
    totalPrice.text(`$${total.toFixed(2)}`);
}

const refreshProduct = (element, v) => {
    const recipeId = element.attr("recipe-id");

    const totalElem = element.find(".cart-product-total");
    const quantityElem = element.find(".cart-text-quantity");

    let quantity = parseInt(quantityElem.text());
    quantity += v;

    if (quantity < 1)
        quantity = 1;

    setRecipeQuantityInCart(quantity, recipeId);

    quantityElem.text(quantity);
    totalElem.text(`$${getRecipeTotalPrice(recipeId).toFixed(2)}`);

    refreshTotal();
}

/* Elements */

const cartProducts = $(".cart-products");
const totalPrice = $(".cart-total-price");

const btnEmpty = $(".btn-empty-cart");
btnEmpty.on("click", (e) => {
    clearRecipesFromCart();
    loadProducts();
});

/* Load products */

loadProducts();
