// ==================== WOMEN'S PAGE FUNCTIONALITY ====================

// Sample product data (in a real app, this would come from an API)
const products = [
  {
    id: 1,
    name: "Elegant Summer Dress",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=700&fit=crop&crop=center",
    ],
    category: "dresses",
    brand: "zara",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["pink", "blue", "white"],
    rating: 4.7,
    reviewCount: 156,
    discount: true,
    description:
      "Beautiful summer dress with floral pattern. Made from lightweight, breathable fabric perfect for warm weather occasions.",
  },
  {
    id: 2,
    name: "Classic Blouse",
    price: 54.99,
    originalPrice: 74.99,
    image:
      "https://images.unsplash.com/photo-1564257631407-3deb5d4c4b1c?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1564257631407-3deb5d4c4b1c?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=700&fit=crop&crop=center",
    ],
    category: "tops",
    brand: "h&m",
    sizes: ["XS", "S", "M", "L"],
    colors: ["white", "blue"],
    rating: 4.5,
    reviewCount: 89,
    discount: true,
    description:
      "Elegant blouse perfect for office wear or casual outings. Features a flattering cut and comfortable fit.",
  },
  {
    id: 3,
    name: "A-Line Skirt",
    price: 69.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=700&fit=crop&crop=center",
    ],
    category: "skirts",
    brand: "mango",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "navy"],
    rating: 4.3,
    reviewCount: 134,
    discount: false,
    description:
      "Classic A-line skirt with a flattering silhouette. Perfect for both professional and casual settings.",
  },
  {
    id: 4,
    name: "High-Waist Jeans",
    price: 79.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=700&fit=crop&crop=center",
    ],
    category: "jeans",
    brand: "forever21",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["blue", "black"],
    rating: 4.6,
    reviewCount: 203,
    discount: false,
    description:
      "Trendy high-waist jeans with stretch denim. Comfortable fit with a modern, flattering silhouette.",
  },
  {
    id: 5,
    name: "Ankle Boots",
    price: 129.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=700&fit=crop&crop=center",
    ],
    category: "shoes",
    brand: "zara",
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["black", "brown"],
    rating: 4.8,
    reviewCount: 342,
    discount: true,
    description:
      "Stylish ankle boots perfect for autumn and winter. Features a comfortable heel and durable construction.",
  },
  {
    id: 6,
    name: "Wide-Leg Pants",
    price: 59.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=700&fit=crop&crop=center",
    ],
    category: "pants",
    brand: "uniqlo",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["beige", "navy", "black"],
    rating: 4.4,
    reviewCount: 178,
    discount: false,
    description:
      "Comfortable wide-leg pants with a modern fit. Made from high-quality fabric with a slight stretch.",
  },
  {
    id: 7,
    name: "Silk Scarf",
    price: 34.99,
    originalPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=700&fit=crop&crop=center",
    ],
    category: "accessories",
    brand: "mango",
    sizes: ["One Size"],
    colors: ["pink", "purple", "blue"],
    rating: 4.2,
    reviewCount: 95,
    discount: false,
    description:
      "Elegant silk scarf with beautiful patterns. Perfect accessory to add style to any outfit.",
  },
  {
    id: 8,
    name: "Statement Necklace",
    price: 49.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=350&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=700&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop&crop=center",
    ],
    category: "accessories",
    brand: "forever21",
    sizes: ["One Size"],
    colors: ["gold", "silver"],
    rating: 4.7,
    reviewCount: 267,
    discount: true,
    description:
      "Beautiful statement necklace to elevate any outfit. Perfect for special occasions and everyday wear.",
  },
];

// Global variables
let currentPage = 1;
let productsPerPage = 6;
let filteredProducts = [...products];
let activeFilters = {
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  priceRange: { min: 0, max: 500 },
};

// DOM elements
const productsGrid = document.getElementById("products-grid");
const resultsCount = document.getElementById("results-count");
const filterToggle = document.getElementById("filter-toggle");
const filtersSidebar = document.getElementById("filters-sidebar");
const closeFilters = document.getElementById("close-filters");
const sortSelect = document.getElementById("sort-select");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageButtons = document.querySelectorAll(".page-btn");

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initializeFilters();
  displayProducts();
  setupEventListeners();
  updatePagination();
});

// Setup event listeners
function setupEventListeners() {
  // Filter toggle for mobile
  filterToggle.addEventListener("click", toggleFilters);
  closeFilters.addEventListener("click", toggleFilters);

  // Sort functionality
  sortSelect.addEventListener("change", handleSort);

  // Pagination
  prevPageBtn.addEventListener("click", () => changePage(currentPage - 1));
  nextPageBtn.addEventListener("click", () => changePage(currentPage + 1));

  // Page number buttons
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.dataset.page);
      changePage(page);
    });
  });

  // Close filters when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      if (
        !filtersSidebar.contains(e.target) &&
        !filterToggle.contains(e.target)
      ) {
        filtersSidebar.classList.remove("active");
      }
    }
  });
}

// Initialize filters
function initializeFilters() {
  // Category checkboxes
  const categoryCheckboxes = document.querySelectorAll(
    'input[value="dresses"], input[value="tops"], input[value="skirts"], input[value="jeans"], input[value="pants"], input[value="shoes"]'
  );
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleFilterChange);
  });

  // Brand checkboxes
  const brandCheckboxes = document.querySelectorAll(
    'input[value="zara"], input[value="h&m"], input[value="forever21"], input[value="mango"], input[value="uniqlo"]'
  );
  brandCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleFilterChange);
  });

  // Size buttons
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      handleFilterChange();
    });
  });

  // Color buttons
  const colorButtons = document.querySelectorAll(".color-btn");
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      handleFilterChange();
    });
  });

  // Price range sliders
  const priceMinSlider = document.getElementById("price-min");
  const priceMaxSlider = document.getElementById("price-max");
  const priceMinInput = document.getElementById("price-min-input");
  const priceMaxInput = document.getElementById("price-max-input");

  priceMinSlider.addEventListener("input", (e) => {
    priceMinInput.value = e.target.value;
    handleFilterChange();
  });

  priceMaxSlider.addEventListener("input", (e) => {
    priceMaxInput.value = e.target.value;
    handleFilterChange();
  });

  priceMinInput.addEventListener("input", (e) => {
    priceMinSlider.value = e.target.value;
    handleFilterChange();
  });

  priceMaxInput.addEventListener("input", (e) => {
    priceMaxSlider.value = e.target.value;
    handleFilterChange();
  });

  // Clear filters button
  const clearFiltersBtn = document.querySelector(".clear-filters");
  clearFiltersBtn.addEventListener("click", clearAllFilters);
}

// Handle filter changes
function handleFilterChange() {
  updateActiveFilters();
  applyFilters();
  currentPage = 1;
  displayProducts();
  updatePagination();
}

// Update active filters object
function updateActiveFilters() {
  // Categories
  activeFilters.categories = Array.from(
    document.querySelectorAll(
      'input[value="dresses"], input[value="tops"], input[value="skirts"], input[value="jeans"], input[value="pants"], input[value="shoes"]:checked'
    )
  ).map((cb) => cb.value);

  // Brands
  activeFilters.brands = Array.from(
    document.querySelectorAll(
      'input[value="zara"], input[value="h&m"], input[value="forever21"], input[value="mango"], input[value="uniqlo"]:checked'
    )
  ).map((cb) => cb.value);

  // Sizes
  activeFilters.sizes = Array.from(
    document.querySelectorAll(".size-btn.active")
  ).map((btn) => btn.dataset.size);

  // Colors
  activeFilters.colors = Array.from(
    document.querySelectorAll(".color-btn.active")
  ).map((btn) => btn.dataset.color);

  // Price range
  activeFilters.priceRange.min = parseInt(
    document.getElementById("price-min").value
  );
  activeFilters.priceRange.max = parseInt(
    document.getElementById("price-max").value
  );
}

// Apply filters to products
function applyFilters() {
  filteredProducts = products.filter((product) => {
    // Category filter
    if (
      activeFilters.categories.length > 0 &&
      !activeFilters.categories.includes(product.category)
    ) {
      return false;
    }

    // Brand filter
    if (
      activeFilters.brands.length > 0 &&
      !activeFilters.brands.includes(product.brand)
    ) {
      return false;
    }

    // Size filter
    if (
      activeFilters.sizes.length > 0 &&
      !activeFilters.sizes.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }

    // Color filter
    if (
      activeFilters.colors.length > 0 &&
      !activeFilters.colors.some((color) => product.colors.includes(color))
    ) {
      return false;
    }

    // Price filter
    if (
      product.price < activeFilters.priceRange.min ||
      product.price > activeFilters.priceRange.max
    ) {
      return false;
    }

    return true;
  });

  // Update results count
  resultsCount.textContent = filteredProducts.length;
}

// Handle sorting
function handleSort() {
  const sortValue = sortSelect.value;

  switch (sortValue) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default: // popular - keep original order
      break;
  }

  currentPage = 1;
  displayProducts();
  updatePagination();
}

// Display products
function displayProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  productsGrid.innerHTML = "";

  productsToShow.forEach((product) => {
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
  const wishlistClass = isInWishlist ? 'wishlist active' : 'wishlist';

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
  const productImageContainer = card.querySelector(".product-image-container");

  addToCartBtn.addEventListener("click", () => addToCart(product.id));
  wishlistBtn.addEventListener("click", () => addToWishlist(product.id));
  productImageContainer.addEventListener("click", () =>
    openProductModal(product.id)
  );

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
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if wishlist manager is available
  if (window.wishlistManager) {
    window.wishlistManager.addToWishlist(product);
  } else {
    // Fallback: save to localStorage directly
    const savedWishlist = localStorage.getItem('wishlist') || '[]';
    const wishlistItems = JSON.parse(savedWishlist);
    
    // Check if already in wishlist
    const existingIndex = wishlistItems.findIndex(item => item.id === productId);
    
    if (existingIndex !== -1) {
      // Update existing item
      wishlistItems[existingIndex] = { ...product, dateAdded: new Date().toISOString() };
    } else {
      // Add new item
      wishlistItems.unshift({ ...product, dateAdded: new Date().toISOString() });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }

  // Show feedback
  const button = event.target;
  button.style.transform = "scale(1.2)";
  button.style.filter = "brightness(1.2)";
  
  // Update button appearance to show it's in wishlist
  button.classList.add('active');

  setTimeout(() => {
    button.style.transform = "";
    button.style.filter = "";
  }, 500);

  // Show success message
  showWishlistNotification(`${product.name} added to wishlist`);
}

// Pagination functions
function changePage(page) {
  const maxPage = Math.ceil(filteredProducts.length / productsPerPage);

  if (page < 1 || page > maxPage) return;

  currentPage = page;
  displayProducts();
  updatePagination();

  // Scroll to top of products section
  document
    .querySelector(".products-section")
    .scrollIntoView({ behavior: "smooth" });
}

function updatePagination() {
  const maxPage = Math.ceil(filteredProducts.length / productsPerPage);

  // Update page buttons
  pageButtons.forEach((btn) => {
    const pageNum = parseInt(btn.dataset.page);
    btn.classList.toggle("active", pageNum === currentPage);
    btn.style.display = pageNum <= maxPage ? "flex" : "none";
  });

  // Update navigation buttons
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === maxPage;

  // Update page dots visibility
  const pageDots = document.querySelector(".page-dots");
  if (pageDots) {
    pageDots.style.display = maxPage <= 5 ? "none" : "block";
  }
}

// Mobile filter functionality
function toggleFilters() {
  filtersSidebar.classList.toggle("active");

  // Prevent body scroll when filters are open
  if (filtersSidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Clear all filters
function clearAllFilters() {
  // Reset checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
  });

  // Reset size buttons
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Reset color buttons
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Reset price range
  document.getElementById("price-min").value = 0;
  document.getElementById("price-max").value = 500;
  document.getElementById("price-min-input").value = "";
  document.getElementById("price-max-input").value = "";

  // Reset sort
  sortSelect.value = "popular";

  // Clear active filters and refresh
  activeFilters = {
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 500 },
  };

  filteredProducts = [...products];
  currentPage = 1;
  displayProducts();
  updatePagination();
  resultsCount.textContent = products.length;
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

// Add some CSS for the discount badge and wishlist
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

// ==================== PRODUCT MODAL FUNCTIONALITY ====================

// Global variables for modal
let currentModalProduct = null;
let currentImageIndex = 0;
let selectedSize = null;
let selectedColor = null;
let selectedQuantity = 1;

// Modal elements
const productModal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalOverlay = document.querySelector(".modal-overlay");

// Initialize modal event listeners
document.addEventListener("DOMContentLoaded", function () {
  setupModalEventListeners();
});

// Setup modal event listeners
function setupModalEventListeners() {
  // Close modal
  modalClose.addEventListener("click", closeProductModal);
  modalOverlay.addEventListener("click", closeProductModal);

  // Image navigation
  document
    .getElementById("image-prev")
    .addEventListener("click", () => changeImage(-1));
  document
    .getElementById("image-next")
    .addEventListener("click", () => changeImage(1));

  // Quantity controls
  document
    .getElementById("qty-minus")
    .addEventListener("click", () => changeQuantity(-1));
  document
    .getElementById("qty-plus")
    .addEventListener("click", () => changeQuantity(1));
  document.getElementById("qty-input").addEventListener("change", (e) => {
    selectedQuantity = parseInt(e.target.value) || 1;
    updateQuantityDisplay();
  });

  // Action buttons
  document
    .getElementById("modal-add-to-cart")
    .addEventListener("click", addToCartFromModal);
  document
    .getElementById("modal-buy-now")
    .addEventListener("click", buyNowFromModal);
  document
    .getElementById("modal-wishlist")
    .addEventListener("click", toggleWishlistFromModal);

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && productModal.classList.contains("active")) {
      closeProductModal();
    }
  });
}

// Open product modal
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  currentImageIndex = 0;
  selectedSize = null;
  selectedColor = null;
  selectedQuantity = 1;

  populateModalContent(product);
  updateModalImages(product);
  updateSizeButtons(product);
  updateColorButtons(product);
  updateQuantityDisplay();

  productModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close product modal
function closeProductModal() {
  productModal.classList.remove("active");
  document.body.style.overflow = "";
  currentModalProduct = null;
}

// Populate modal content
function populateModalContent(product) {
  document.getElementById("modal-product-title").textContent = product.name;
  document.getElementById("modal-product-brand").textContent =
    product.brand.charAt(0).toUpperCase() + product.brand.slice(1);

  const currentPriceEl = document.getElementById("modal-current-price");
  const originalPriceEl = document.getElementById("modal-original-price");

  currentPriceEl.textContent = `$${product.price.toFixed(2)}`;
  if (product.discount) {
    originalPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
    originalPriceEl.style.display = "inline";
  } else {
    originalPriceEl.style.display = "none";
  }

  document.getElementById("modal-stars").innerHTML = generateStars(
    product.rating
  );
  document.getElementById(
    "modal-review-count"
  ).textContent = `(${product.reviewCount} reviews)`;
  document.getElementById("modal-description").textContent =
    product.description;
}

// Update modal images
function updateModalImages(product) {
  const mainImage = document.getElementById("modal-main-image");
  const thumbnailsContainer = document.getElementById("image-thumbnails");

  if (product.images && product.images.length > 0) {
    mainImage.src = product.images[currentImageIndex];

    // Create thumbnails
    thumbnailsContainer.innerHTML = "";
    product.images.forEach((image, index) => {
      const thumb = document.createElement("img");
      thumb.src = image;
      thumb.alt = `${product.name} - Image ${index + 1}`;
      thumb.classList.toggle("active", index === currentImageIndex);
      thumb.addEventListener("click", () => {
        currentImageIndex = index;
        mainImage.src = image;
        updateThumbnailSelection();
      });
      thumbnailsContainer.appendChild(thumb);
    });
  } else {
    // Fallback to single image
    mainImage.src = product.image;
    thumbnailsContainer.innerHTML = "";
  }
}

// Change image in modal
function changeImage(direction) {
  if (!currentModalProduct || !currentModalProduct.images) return;

  const newIndex = currentImageIndex + direction;
  if (newIndex >= 0 && newIndex < currentModalProduct.images.length) {
    currentImageIndex = newIndex;
    document.getElementById("modal-main-image").src =
      currentModalProduct.images[currentImageIndex];
    updateThumbnailSelection();
  }
}

// Update thumbnail selection
function updateThumbnailSelection() {
  const thumbnails = document.querySelectorAll("#image-thumbnails img");
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentImageIndex);
  });
}

// Update size buttons
function updateSizeButtons(product) {
  const sizeButtonsContainer = document.getElementById("modal-size-buttons");
  sizeButtonsContainer.innerHTML = "";

  product.sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.textContent = size;
    btn.classList.add("size-option-btn");
    btn.addEventListener("click", () => {
      selectedSize = size;
      updateSizeButtonSelection();
    });
    sizeButtonsContainer.appendChild(btn);
  });
}

// Update size button selection
function updateSizeButtonSelection() {
  const sizeBtns = document.querySelectorAll(".size-option-btn");
  sizeBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === selectedSize);
  });
}

// Update color buttons
function updateColorButtons(product) {
  const colorButtonsContainer = document.getElementById("modal-color-buttons");
  colorButtonsContainer.innerHTML = "";

  product.colors.forEach((color) => {
    const btn = document.createElement("button");
    btn.classList.add("color-option-btn");
    btn.style.backgroundColor = getColorValue(color);
    btn.dataset.color = color;
    btn.addEventListener("click", () => {
      selectedColor = color;
      updateColorButtonSelection();
    });
    colorButtonsContainer.appendChild(btn);
  });
}

// Update color button selection
function updateColorButtonSelection() {
  const colorBtns = document.querySelectorAll(".color-option-btn");
  colorBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.color === selectedColor);
  });
}

// Get color value for CSS
function getColorValue(color) {
  const colorMap = {
    white: "#ffffff",
    black: "#000000",
    blue: "#0066cc",
    red: "#cc0000",
    pink: "#ff69b4",
    purple: "#800080",
    beige: "#f5f5dc",
    navy: "#000080",
    gold: "#ffd700",
    silver: "#c0c0c0",
  };
  return colorMap[color] || "#cccccc";
}

// Update quantity display
function updateQuantityDisplay() {
  document.getElementById("qty-input").value = selectedQuantity;
}

// Change quantity
function changeQuantity(direction) {
  const newQty = selectedQuantity + direction;
  if (newQty >= 1 && newQty <= 99) {
    selectedQuantity = newQty;
    updateQuantityDisplay();
  }
}

// Modal action functions
function addToCartFromModal() {
  if (!selectedSize || !selectedColor) {
    alert("Please select a size and color");
    return;
  }

  console.log(
    `Added to cart: ${currentModalProduct.name} - Size: ${selectedSize}, Color: ${selectedColor}, Qty: ${selectedQuantity}`
  );

  // Show feedback
  const button = document.getElementById("modal-add-to-cart");
  const originalText = button.textContent;
  button.textContent = "Added!";
  button.style.background = "#28a745";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = "";
  }, 2000);
}

function buyNowFromModal() {
  if (!selectedSize || !selectedColor) {
    alert("Please select a size and color");
    return;
  }

  console.log(
    `Buy now: ${currentModalProduct.name} - Size: ${selectedSize}, Color: ${selectedColor}, Qty: ${selectedQuantity}`
  );
  alert("Redirecting to checkout...");
}

function toggleWishlistFromModal() {
  const wishlistBtn = document.getElementById("modal-wishlist");
  wishlistBtn.classList.toggle("active");

  if (wishlistBtn.classList.contains("active")) {
    console.log(`Added ${currentModalProduct.name} to wishlist`);
  } else {
    console.log(`Removed ${currentModalProduct.name} from wishlist`);
  }
}
