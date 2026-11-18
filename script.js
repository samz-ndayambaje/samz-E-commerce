
// =====================================
// SAMMART ONLINE SHOPPING JAVASCRIPT
// =====================================


// 1. SHOPPING CART
let cart = JSON.parse(localStorage.getItem("samCart")) || [];


// Save cart in browser storage
function saveCart() {
    localStorage.setItem("samCart", JSON.stringify(cart));
    updateCartCount();
}


// 2. ADD PRODUCT TO CART
function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " has been added to your cart!");
}


// 3. UPDATE CART COUNT
function updateCartCount() {

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        let totalItems = cart.reduce(
            (total, item) => total + item.quantity, 0
        );

        cartCount.textContent = totalItems;
    }
}


// 4. VIEW CART
function showCart() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some products!");
        return;
    }

    let cartMessage = "YOUR SAMMART CART\n\n";

    cart.forEach((item, index) => {
        cartMessage +=
            (index + 1) + ". " + item.name +
            "\nQuantity: " + item.quantity +
            "\nPrice: RWF " + item.price.toLocaleString() +
            "\nSubtotal: RWF " +
            (item.price * item.quantity).toLocaleString() +
            "\n\n";
    });

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartMessage += "TOTAL: RWF " + total.toLocaleString();

    alert(cartMessage);
}


// 5. REMOVE PRODUCT FROM CART
function removeFromCart(name) {

    cart = cart.filter(item => item.name !== name);

    saveCart();

    alert(name + " removed from your cart.");
}


// 6. INCREASE PRODUCT QUANTITY
function increaseQuantity(name) {

    let product = cart.find(item => item.name === name);

    if (product) {
        product.quantity++;
    }

    saveCart();
}


// 7. DECREASE PRODUCT QUANTITY
function decreaseQuantity(name) {

    let product = cart.find(item => item.name === name);

    if (product && product.quantity > 1) {
        product.quantity--;
    }

    saveCart();
}


// 8. SEARCH PRODUCTS
function searchProducts() {

    let input = document.getElementById("searchInput");
    let searchValue = input.value.toLowerCase().trim();

    let products = document.querySelectorAll(".km-product-card");
    let foundProducts = 0;

    products.forEach(product => {

        let productName =
            product.dataset.name.toLowerCase();

        let productText =
            product.textContent.toLowerCase();

        if (
            productName.includes(searchValue) ||
            productText.includes(searchValue)
        ) {
            product.style.display = "";
            foundProducts++;
        } else {
            product.style.display = "none";
        }
    });

    let noProducts = document.getElementById("noProducts");

    if (noProducts) {
        noProducts.hidden = foundProducts !== 0;
    }
}


// Search when pressing Enter
document.getElementById("searchInput")?.addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            searchProducts();
        }
    }
);


// 9. NEWSLETTER SUBSCRIPTION
function subscribe(event) {

    event.preventDefault();

    let email = event.target.querySelector("input[type='email']").value;

    alert("Thank you for subscribing to SAMMART: " + email);

    event.target.reset();
}


// 10. SHOP NOW BUTTON
// Your HTML already uses href="#products".
// This smooth scrolling makes the movement attractive.

document.querySelectorAll('a[href="#products"]').forEach(link => {

    link.addEventListener("click", function(event) {

        let productsSection = document.getElementById("products");

        if (productsSection) {
            event.preventDefault();

            productsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });

});


// 11. UPDATE CART WHEN WEBSITE OPENS
updateCartCount();
