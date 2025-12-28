// CART DATA BEFORE ADDING ITEMS.
let cart = [];
let total = 0;

// 1. THEME SWITCH Light and Dark mode
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeBtn");

    if (body.classList.contains("light-theme")) {
        // Switch to Dark
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        btn.innerText = "☀️ Light Mode";
    } else {
        // Switch to Light
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        btn.innerText = "🌙 Dark Mode";
    }
}

// 2. ADD TO CART SECTION
function addToCart(name, price) {
    // Add item to our data list
    cart.push({ name: name, price: price });
    total += price;

    // UPDATE VALUES AFTER ADDING ITEMS
    updateUI();
    renderCart();
    
    // Slide the cart open automatically When item added 
    document.getElementById("sideCart").classList.add("active");
}

// 3.Refreshes numbers across the page
function updateUI() {
    // Update navbar
    document.getElementById("cartCount").innerText = cart.length;
    document.getElementById("totalPrice").innerText = total;
    
    // Update floating button
    document.getElementById("floatingCartCount").innerText = cart.length;
    
    // Update sidebar total
    document.getElementById("sidebarTotal").innerText = total;
}

// 4. Builds the HTML list for the sidebar
function renderCart() {
    const list = document.getElementById("cartItemsList");
    
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:gray;">Your tray is empty!</p>';
        return;
    }

    list.innerHTML = ""; // Clear existing list
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.style.display = "flex";
        itemDiv.style.justifyContent = "space-between";
        itemDiv.style.padding = "10px 0";
        itemDiv.style.borderBottom = "1px solid #eee";
        itemDiv.innerHTML = `
            <span>${item.name} <br> <small>PKR ${item.price}</small></span>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">✕</button>
        `;
        list.appendChild(itemDiv);
    });
}

// 5. REMOVE ITEM: Deletes a specific item
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateUI();
    renderCart();
}

// 6.Opens/Closes Sidebar
function toggleCart() {
    document.getElementById("sideCart").classList.toggle("active");
}

// 7. MODAL LOGIC
function openModal(title, msg, icon) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalMessage").innerText = msg;
    document.querySelector(".modal-icon").innerText = icon;
    document.getElementById("customModal").classList.add("active");
}

function closeModal() {
    document.getElementById("customModal").classList.remove("active");
}

// 8. CHECKOUT & BUY
function buyNow(name, price) {
    openModal("Direct Purchase", "Buying " + name + " for PKR " + price, "🛍️");
}

function checkout() {
    if (cart.length === 0) {
        openModal("Wait!", "Add something to your tray first.", "🥐");
    } else {
        openModal("Order Received", "Total: PKR " + total + ". Baking it now!", "✨");
        // Clear cart after checkout
        cart = [];
        total = 0;
        updateUI();
        renderCart();
        document.getElementById("sideCart").classList.remove("active");
    }
}