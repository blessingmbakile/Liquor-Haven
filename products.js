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
    image: "images/Highland-Single-Malt-Scotch-Whisky.png",
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
    image: "images/Kentucky-Bourbon-Whiskey.jpg",
    featured: true
  },
  {
    id: 3,
    name: "Premium Vodka",
    description: "Ultra-smooth vodka distilled five times for exceptional purity.",
    price: 29.99,
    category: "vodka",
    abv: 40,
    volume: "750ml",
    origin: "Russia",
    image: "images/Haku-Japanese-Craft-Vodka.jpg",
    featured: true
  },
];

// Load Featured Products
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  
  if (!featuredContainer) return;
  
  const featuredProducts = products.filter(product => product.featured);
  
  featuredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-4 mb-4';
    productCard.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h3 class="card-title h5">${product.name}</h3>
          <div class="product-meta mb-2">
            <span class="badge bg-warning">${product.abv}% ABV</span>
            <span class="text-muted">${product.volume}</span>
          </div>
          <p class="card-text">${product.description}</p>
        </div>
        <div class="card-footer bg-transparent">
          <p class="price h5 text-primary">$${product.price.toFixed(2)}</p>
          <button class="btn btn-dark add-to-cart w-100" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    featuredContainer.appendChild(productCard);
  });
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', loadFeaturedProducts);