// Products data (single source consistent with products.js, fields reduced for cart usage)
const products = [
  {
    id: 1,
    name: "Highland Single Malt Whiskey",
    price: 59.99,
    image: "images/Highland-Single-Malt-Scotch-Whisky.png"
  },
  {
    id: 2,
    name: "Kentucky Straight Bourbon",
    price: 49.99,
    image: "images/Kentucky-Bourbon-Whiskey.jpg"
  },
  {
    id: 3,
    name: "Premium Vodka",
    price: 29.99,
    image: "images/Haku-Japanese-Craft-Vodka.jpg"
  },
  {
    id: 4,
    name: "Aged Caribbean Rum",
    price: 34.99,
    image: "images/Dewars-8-Year-Old-Caribbean-Smooth.png"
  },
  {
    id: 5,
    name: "Craft London Dry Gin",
    price: 36.99,
    image: "images/London-Dry-Gin.jpg"
  },
  {
    id: 6,
    name: "Tequila Añejo",
    price: 54.99,
    image: "images/Don-Julio-Anejo-Tequila.jpg"
  }
];

// Toggle cart function – use active class consistently
function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartOverlay = document.getElementById('cart-overlay');
  cartModal.classList.toggle('active');
  cartOverlay.classList.toggle('active');
}

// Checkout function with purchase simulation
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  
  if (confirm(`Your total is $${total}. Would you like to proceed with the purchase?`)) {
    // Simulate purchase: clear cart, update UI, hide cart modal
    alert("Thank you for your purchase! Your order has been placed.");
    clearCart();
    toggleCart();
  }
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
  showCartNotification(`${product.name} added to cart.`);
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

// Show notification for cart actions
function showCartNotification(message) {
  let notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('fade-out');
    notification.addEventListener('animationend', () => {
      notification.remove();
    });
  }, 1500);
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
            <button class="quantity-btn minus" data-id="${item.id}" aria-label="Decrease quantity of ${item.name}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-price">
        $${itemTotal.toFixed(2)}
        <button class="remove-item" data-id="${item.id}" aria-label="Remove ${item.name} from cart">×</button>
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
      if (!item) return;
      
      if (e.target.classList.contains('plus')) {
        updateQuantity(productId, item.quantity + 1);
      } else if (e.target.classList.contains('minus')) {
        if (item.quantity > 1) {
          updateQuantity(productId, item.quantity - 1);
        }
      }
    }
    
    // Remove item
    if (e.target.classList.contains('remove-item')) {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
    }
  });
  
  // Cart toggle using event listener only (remove inline onclick in HTML)
  const cartToggle = document.getElementById('cart-toggle-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.querySelector('.checkout');
  
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
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }
}

// Search Functionality
function setupSearchFunctionality() {
  const searchBar = document.getElementById('search-bar');
  const searchBtn = document.getElementById('search-btn');
  
  if (searchBar) {
    const searchHandler = () => {
      const searchTerm = searchBar.value.toLowerCase();
      
      document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? '' : 'none';
      });
    };
    
    searchBar.addEventListener('input', searchHandler);
    
    if (searchBtn) {
      searchBtn.addEventListener('click', searchHandler);
    }
  }
}

// Form Handlers (unchanged from previous)
function setupFormHandlers() {
  // Name field validation for letters only
  const nameFields = document.querySelectorAll('input[id="name"], input[id="username"]');
  nameFields.forEach(field => {
    field.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    });
  });

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate CAPTCHA
      const captcha = document.getElementById('captcha').value;
      if (captcha !== "7") {
        alert("Please enter the correct CAPTCHA answer.");
        return;
      }
      
      // Validate other fields
      let isValid = true;
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });
      
      if (isValid) {
        alert("Thank you for your message. We'll respond shortly.");
        contactForm.reset();
      }
    });
  }
  
  // Feedback Form
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const review = document.getElementById('review').value.trim();
      
      if (!username || !review) {
        if (!username) document.getElementById('username').classList.add('is-invalid');
        if (!review) document.getElementById('review').classList.add('is-invalid');
        return;
      }
      
      // Save to localStorage
      const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
      feedbacks.push({ username, review, date: new Date().toISOString() });
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      
      // Display feedback
      displayFeedback({ username, review, date: new Date().toISOString() });
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
  
  reviewsList.innerHTML = ''; // Clear existing reviews
  
  feedbacks.forEach(feedback => {
    displayFeedback(feedback);
  });
}

function displayFeedback(feedback) {
  const reviewsList = document.getElementById('reviews-list');
  if (!reviewsList) return;
  
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <strong>${feedback.username}</strong>
    <span class="feedback-date">${new Date(feedback.date).toLocaleDateString()}</span>
    <p>${feedback.review}</p>
  `;
  reviewsList.appendChild(li);
}

