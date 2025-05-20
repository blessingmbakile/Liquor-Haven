// Product Data
const products = [
  {
    id: 1,
    name: "Highland Single Malt Whiskey",
    description: "Aged 12 years in oak barrels, this single malt offers notes of honey, oak, and a subtle smokiness.",
    price: 59.99,
    category: "whiskey",
    abv: 40,
    volume: "700ml",
    origin: "Scotland",
    image: "images/Highland Single Malt.png",
    featured: true
  },
  {
    id: 2,
    name: "Kentucky Straight Bourbon",
    description: "Small batch bourbon with caramel and vanilla notes, aged 8 years.",
    price: 49.99,
    category: "bourbon",
    abv: 45,
    volume: "750ml",
    origin: "USA",
    image: "images/Kentucky Bourbon.png",
    featured: true
  },
  // Additional products...
];

// Load Featured Products
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  
  if (!featuredContainer) return;
  
  const featuredProducts = products.filter(product => product.featured);
  
  featuredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="product-meta">
          <span class="abv-badge">${product.abv}% ABV</span>
          <span>${product.volume}</span>
        </div>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    featuredContainer.appendChild(productCard);
  });
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', loadFeaturedProducts);