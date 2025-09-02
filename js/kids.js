// ==================== KIDS' PAGE FUNCTIONALITY ====================

// Sample product data for kids
const products = [
  {
    id: 1,
    name: "Colorful Graphic T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=350&fit=crop&crop=center",
    category: "tops",
    ageGroup: "preschool",
    brand: "carters",
    sizes: ["3T", "4T", "5", "6"],
    colors: ["blue", "red", "green"],
    rating: 4.6,
    reviewCount: 89,
    discount: true,
    description: "Fun and colorful graphic t-shirt perfect for active kids.",
  },
  {
    id: 2,
    name: "Comfortable Denim Jeans",
    price: 39.99,
    originalPrice: 49.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=350&fit=crop&crop=center",
    category: "bottoms",
    ageGroup: "school-age",
    brand: "gap-kids",
    sizes: ["5", "6", "7", "8"],
    colors: ["blue", "black"],
    rating: 4.4,
    reviewCount: 156,
    discount: true,
    description: "Durable denim jeans with stretch fabric for maximum comfort.",
  },
];

// Global variables
let currentPage = 1;
let productsPerPage = 6;
let filteredProducts = [...products];
let activeFilters = {
  categories: [],
  ageGroups: [],
  brands: [],
  sizes: [],
  colors: [],
  priceRange: { min: 0, max: 200 },
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Filter toggle for mobile
  const filterToggle = document.getElementById("filter-toggle");
  const filtersSidebar = document.getElementById("filters-sidebar");
  const closeFilters = document.getElementById("close-filters");

  if (filterToggle) {
    filterToggle.addEventListener("click", toggleFilters);
  }
  if (closeFilters) {
    closeFilters.addEventListener("click", toggleFilters);
  }

  // Close filters when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      if (
        filtersSidebar &&
        !filtersSidebar.contains(e.target) &&
        filterToggle &&
        !filterToggle.contains(e.target)
      ) {
        filtersSidebar.classList.remove("active");
      }
    }
  });
}

// Display products
function displayProducts() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const discountBadge = product.discount
    ? `<div class="discount-badge">-${Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )}%</div>`
    : "";

  // Check if product is in wishlist
  const isInWishlist = checkIfInWishlist(product.id);
  const wishlistClass = isInWishlist ? "wishlist active" : "wishlist";

  card.innerHTML = `
    <div class="product-image-container">
      <img src="${product.image}" alt="${product.name}" />
      ${discountBadge}
    </div>
    <h3>${product.name}</h3>
    <div class="product-price">
      <span class="current-price">$${product.price.toFixed(2)}</span>
      ${
        product.discount
          ? `<span class="original-price">$${product.originalPrice.toFixed(
              2
            )}</span>`
          : ""
      }
    </div>
    <div class="product-rating">
      ${generateStars(product.rating)}
      <span class="rating-text">(${product.rating})</span>
    </div>
    <div class="product-actions">
      <button class="btn primary add-to-cart" data-product-id="${
        product.id
      }">
        <img src="assets/icons/cart.png" alt="Cart" />
        Add to Cart
      </button>
      <button class="${wishlistClass}" data-product-id="${product.id}">
        <img src="assets/icons/wishlist.png" alt="Wishlist" />
      </button>
    </div>
  `;

  // Add event listeners
  const addToCartBtn = card.querySelector(".add-to-cart");
  const wishlistBtn = card.querySelector(".wishlist");

  addToCartBtn.addEventListener("click", () => addToCart(product.id));
  wishlistBtn.addEventListener("click", () => addToWishlist(product.id));

  return card;
}

// Generate star rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += "⭐";
  }
  if (hasHalfStar) {
    stars += "⭐";
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += "☆";
  }

  return stars;
}

// Add to cart functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if cart manager is available
  if (window.cartManager) {
    window.cartManager.addToCart(product);
  } else {
    // Fallback: save to localStorage directly
    const savedCart = localStorage.getItem('cart') || '[]';
    const cartItems = JSON.parse(savedCart);
    
    // Check if already in cart
    const existingIndex = cartItems.findIndex(item => item.id === productId);
    
    if (existingIndex !== -1) {
      // Update existing item quantity
      cartItems[existingIndex].quantity += 1;
    } else {
      // Add new item
      cartItems.unshift({ ...product, quantity: 1, dateAdded: new Date().toISOString() });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Show feedback
  const button = event.target;
  button.style.transform = "scale(1.2)";
  button.style.filter = "brightness(1.2)";

  setTimeout(() => {
    button.style.transform = "";
    button.style.filter = "";
  }, 500);

  // Show success message
  showNotification(`${product.name} added to cart`);
}

// Add to wishlist functionality
function addToWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Check if wishlist manager is available
  if (window.wishlistManager) {
    window.wishlistManager.addToWishlist(product);
  } else {
    // Fallback: save to localStorage directly
    const savedWishlist = localStorage.getItem("wishlist") || "[]";
    const wishlistItems = JSON.parse(savedWishlist);

    // Check if already in wishlist
    const existingIndex = wishlistItems.findIndex(
      (item) => item.id === productId
    );

    if (existingIndex !== -1) {
      // Update existing item
      wishlistItems[existingIndex] = {
        ...product,
        dateAdded: new Date().toISOString(),
      };
    } else {
      // Add new item
      wishlistItems.unshift({
        ...product,
        dateAdded: new Date().toISOString(),
      });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }

  // Show feedback
  const button = event.target;
  button.style.transform = "scale(1.2)";
  button.style.filter = "brightness(1.2)";

  // Update button appearance to show it's in wishlist
  button.classList.add("active");

  setTimeout(() => {
    button.style.transform = "";
    button.style.filter = "";
  }, 500);

  // Show success message
  showWishlistNotification(`${product.name} added to wishlist`);
}

// Mobile filter functionality
function toggleFilters() {
  const filtersSidebar = document.getElementById("filters-sidebar");
  if (filtersSidebar) {
    filtersSidebar.classList.toggle("active");

    // Prevent body scroll when filters are open
    if (filtersSidebar.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}

// Helper function to check if product is in wishlist
function checkIfInWishlist(productId) {
  const savedWishlist = localStorage.getItem('wishlist') || '[]';
  const wishlistItems = JSON.parse(savedWishlist);
  return wishlistItems.some(item => item.id === productId);
}

// Show wishlist notification
function showWishlistNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'wishlist-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

// Add CSS for discount badge and wishlist
const style = document.createElement("style");
style.textContent = `
  .product-image-container {
    position: relative;
    margin-bottom: 16px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .product-image-container:hover {
    transform: scale(1.02);
  }
  
  .discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff4d4d;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .product-price {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    margin-bottom: 12px;
  }
  
  .current-price {
    color: #ff4d4d;
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 0.9rem;
  }
  
  .product-rating {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .rating-text {
    color: #666;
    font-size: 0.9rem;
  }
  
  .wishlist img {
    width: 16px;
    height: 16px;
  }
  
  .wishlist {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    color: #333;
    transition: all 0.3s ease;
  }
  
  .wishlist:hover {
    background: #e9ecef;
    border-color: #dee2e6;
    transform: scale(1.05);
  }
  
  .wishlist.active {
    background: #ff6b6b;
    border-color: #ff6b6b;
    color: white;
  }
  
  .wishlist.active:hover {
    background: #ff5252;
    border-color: #ff5252;
  }
  
  .wishlist.active img {
    filter: brightness(0) invert(1);
  }
`;
document.head.appendChild(style);
