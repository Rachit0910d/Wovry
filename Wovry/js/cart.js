import { showMessage, formatPrice } from './utils.js';

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

export function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.textContent = count;
    }
}

export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const cartItemId = `${product.id}-${product.selectedSize || ''}-${product.selectedColor || ''}`;
    const productWithCartId = { ...product, cartItemId };
    const existingItem = cart.find(item => (item.cartItemId || item.id) === cartItemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...productWithCartId, quantity });
    }
    saveCart(cart);
    showMessage(`${product.name} added to cart!`, 'success');
}

export function removeFromCart(cartItemId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => (item.cartItemId || item.id) !== cartItemId);
    saveCart(updatedCart);
}

export function updateQuantity(cartItemId, newQuantity) {
    const cart = getCart();
    const item = cart.find(i => (i.cartItemId || i.id) === cartItemId);
    if (item) {
        const qty = parseInt(newQuantity);
        if (isNaN(qty) || qty <= 0) {
            removeFromCart(cartItemId);
        } else {
            item.quantity = qty;
            saveCart(cart);
        }
    }
}

export function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalElem = document.getElementById('subtotal-price');
    const cartTotalElem = document.getElementById('total-price');

    if (!cartItemsContainer) return;
    const cart = getCart();
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="p-8 text-center text-gray-600">Your cart is empty.</p>`;
        if (cartSubtotalElem) cartSubtotalElem.textContent = formatPrice(0);
        if (cartTotalElem) cartTotalElem.textContent = formatPrice(0);
        return;
    }

    let subtotal = 0;
    const itemsHtml = cart.map(item => {
        subtotal += item.price * item.quantity;
        const itemId = item.cartItemId || item.id;
        return `
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
                <div class="flex items-center gap-4 w-full sm:w-auto">
                    <img src="${item.imageUrl}" alt="${item.name}" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0">
                    <div>
                        <h3 class="font-semibold text-sm sm:text-base">${item.name}</h3>
                        ${item.selectedSize ? `<p class="text-xs text-gray-500 mt-0.5">Size: ${item.selectedSize}</p>` : ''}
                        <p class="text-gray-600 text-sm mt-1">${formatPrice(item.price)}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between w-full sm:w-auto sm:ml-auto gap-4">
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-400 sm:hidden">Qty:</span>
                        <input type="number" min="1" value="${item.quantity}" class="w-16 p-1.5 sm:p-2 border border-gray-300 rounded-lg text-center cart-quantity text-sm" data-id="${itemId}">
                    </div>
                    <button class="text-red-500 hover:text-red-700 remove-from-cart-btn p-1" data-id="${itemId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    cartItemsContainer.innerHTML = itemsHtml;
    if (cartSubtotalElem) cartSubtotalElem.textContent = formatPrice(subtotal);
    if (cartTotalElem) cartTotalElem.textContent = formatPrice(subtotal);
}
