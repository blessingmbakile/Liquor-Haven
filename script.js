// Products data (add at the top of script.js)
const products = [
  {
    id: 1,
    name: "Highland Single Malt",
    price: 49.99,
    image: "images/highland-single-malt.png"
  },
  {
    id: 2,
    name: "Kentucky Bourbon",
    price: 39.99,
    image: "images/kentucky-bourbon.png"
  },
  {
    id: 3,
    name: "Premium Vodka",
    price: 29.99,
    image: "images/premium-vodka.png"
  },
  {
    id: 4,
    name: "Aged Caribbean Rum",
    price: 34.99,
    image: "images/aged-rum.png"
  },
  {
    id: 5,
    name: "Craft London Dry Gin",
    price: 36.99,
    image: "images/craft-gin.png"
  },
  {
    id: 6,
    name: "Tequila Añejo",
    price: 54.99,
    image: "images/tequila-anejo.png"
  }
];

// Toggle cart function (add to script.js)
function toggleCart() {
  document.getElementById('cart-modal').classList.toggle('hidden');
  document.getElementById('cart-overlay').classList.toggle('hidden');
}

// Checkout function (add to script.js)
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  alert("Proceeding to checkout! Total: $" + 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
  clearCart();
  toggleCart();
}

// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  setupCartEventListeners();
  setupSearchFunctionality();
  setupFormHandlers();
});

// Cart Management
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }
  
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

// Cart UI Updates
function updateCartUI() {
  updateCartBadge();
  if (document.getElementById('cart-items')) {
    renderCartItems();
  }
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

function renderCartItems() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  
  if (!cartItemsEl || !cartTotalEl) return;
  
  cartItemsEl.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty</p>';
    cartTotalEl.textContent = '0.00';
    return;
  }
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}" width="50">
        <div>
          <h4>${item.name}</h4>
          <div class="cart-item-controls">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-price">
        $${itemTotal.toFixed(2)}
        <button class="remove-item" data-id="${item.id}">×</button>
      </div>
    `;
    cartItemsEl.appendChild(li);
  });
  
  cartTotalEl.textContent = total.toFixed(2);
}

// Event Listeners
function setupCartEventListeners() {
  // Add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    }
    
    // Cart quantity controls
    if (e.target.classList.contains('quantity-btn')) {
      const productId = parseInt(e.target.dataset.id);
      const item = cart.find(item => item.id === productId);
      
      if (e.target.classList.contains('plus')) {
        updateQuantity(productId, item.quantity + 1);
      } else if (e.target.classList.contains('minus')) {
        updateQuantity(productId, item.quantity - 1);
      }
    }
    
    // Remove item
    if (e.target.classList.contains('remove-item')) {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
    }
  });
  
  // Cart toggle
  const cartToggle = document.getElementById('cart-toggle-btn');
  const cartModal = document.querySelector('.cart-modal');
  const cartOverlay = document.querySelector('.cart-overlay');
  
  if (cartToggle && cartModal && cartOverlay) {
    cartToggle.addEventListener('click', () => {
      cartModal.classList.toggle('active');
      cartOverlay.classList.toggle('active');
    });
    
    cartOverlay.addEventListener('click', () => {
      cartModal.classList.remove('active');
      cartOverlay.classList.remove('active');
    });
  }
}

// Search Functionality
function setupSearchFunctionality() {
  const searchBar = document.getElementById('search-bar');
  
  if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
      });
    });
  }
}

// Form Handlers
function setupFormHandlers() {
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const captcha = document.getElementById('captcha').value;
      
      if (captcha !== "7") {
        alert("Please enter the correct CAPTCHA answer.");
        return;
      }
      
      alert("Thank you for your message. We'll respond shortly.");
      contactForm.reset();
    });
  }
  
  // Feedback Form
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const review = document.getElementById('review').value;
      
      if (!username || !review) return;
      
      // Save to localStorage
      const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
      feedbacks.push({ username, review, date: new Date().toISOString() });
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      
      // Display feedback
      displayFeedback({ username, review });
      feedbackForm.reset();
    });
    
    // Load existing feedback
    loadFeedback();
  }
}

function loadFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  const reviewsList = document.getElementById('reviews-list');
  
  if (!reviewsList) return;
  
  feedbacks.forEach(feedback => {
    displayFeedback(feedback);
  });
}

function displayFeedback(feedback) {
  const reviewsList = document.getElementById('reviews-list');
  if (!reviewsList) return;
  
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${feedback.username}</strong>
    <span class="feedback-date">${new Date(feedback.date).toLocaleDateString()}</span>
    <p>${feedback.review}</p>
  `;
  reviewsList.appendChild(li);
}