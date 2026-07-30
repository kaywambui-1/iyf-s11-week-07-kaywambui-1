const state = {
    products: [
        { id: 1, name: "Laptop", price: 999, image: "..." },
        { id: 2, name: "Phone", price: 699, image: "..." },
        { id: 3, name: "Headphones", price: 199, image: "..." }
    ],
    cart: []  // { productId, quantity }
};

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem("cart");
    if (saved) {
        state.cart = JSON.parse(saved);
    }
}

function clearCart() {
    state.cart = [];
    saveCart();
    renderCart();
}

function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    
    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = state.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
    }

    saveCart();
    renderCart();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    renderCart();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    state.products.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        div.querySelector("button").addEventListener("click", () => {
            addToCart(product.id);
        });
        productList.appendChild(div);
    });
}

function renderCart() {
    const cartItemsEl = document.getElementById("cart-items");
    cartItemsEl.innerHTML = "";

    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} — Qty: 
            <input type="number" min="0" value="${item.quantity}" data-id="${product.id}">
            <button data-id="${product.id}">Remove</button>
        `;

        li.querySelector("input").addEventListener("change", (e) => {
            updateQuantity(product.id, parseInt(e.target.value));
        });

        li.querySelector("button").addEventListener("click", () => {
            removeFromCart(product.id);
        });

        cartItemsEl.appendChild(li);
    });

    document.getElementById("cart-total").textContent = getCartTotal();
    document.getElementById("cart-count").textContent = `🛒 ${getCartCount()}`;
}

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

loadCart();
renderProducts();
renderCart();