import { getCart } from "./utils/storage-cart.js";
import { renderCartItems } from "./view/cart-item.js";

/* Functions */

const loadProducts = () => {
    const items = getCart();

    if (items != null) {
        const views = renderCartItems(items);

        views.forEach(element => {
            cartProducts.append(element);
        });
    }
}

/* Elements */

const cartProducts = $(".cart-products");

/* Load products */

loadProducts();
