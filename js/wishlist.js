// ==================== WISHLIST PAGE FUNCTIONALITY ====================

// Global wishlist state
let wishlistItems = [];
let recentlyViewed = [];

// DOM elements
const wishlistItemsContainer = document.getElementById('wishlist-items');
const emptyWishlist = document.getElementById('empty-wishlist');
const wishlistCount = document.getElementById('wishlist-count');
const totalValue = document.getElementById('total-value');
const clearWishlistBtn = document.getElementById('clear-wishlist');
const addAllToCartBtn = document.getElementById('add-all-to-cart');
const wishlistSort = document.getElementById('wishlist-sort');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadWishlist();
  loadRecentlyViewed();
  setupEventListeners();
  updateWishlistDisplay();
});

// Setup event listeners
function setupEventListeners() {
  // Clear all wishlist items
  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', clearAllWishlist);
  }

  // Add all items to cart
  if (addAllToCartBtn) {
    addAllToCartBtn.addEventListener('click', addAllToCart);
  }

  // Sort wishlist
  if (wishlistSort) {
    wishlistSort.addEventListener('click', handleSort);
  }
}

// Load wishlist from localStorage
function loadWishlist() {
  const savedWishlist = localStorage.getItem('wishlist');
  if (savedWishlist) {
    wishlistItems = JSON.parse(savedWishlist);
  }
}

// Save wishlist to localStorage
function saveWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}

// Load recently viewed from localStorage
function loadRecentlyViewed() {
  const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
  if (savedRecentlyViewed) {
    recentlyViewed = JSON.parse(savedRecentlyViewed);
  }
}

// Update wishlist display
function updateWishlistDisplay() {
  if (wishlistItems.length === 0) {
    showEmptyWishlist();
  } else {
    showWishlistItems();
  }
  updateWishlistStats();
}

// Show empty wishlist state
function showEmptyWishlist() {
  if (wishlistItemsContainer) {
    wishlistItemsContainer.style.display = 'none';
  }
  if (emptyWishlist) {
    emptyWishlist.style.display = 'block';
  }
}

// Show wishlist items
function showWishlistItems() {
  if (emptyWishlist) {
    emptyWishlist.style.display = 'none';
  }
  if (wishlistItemsContainer) {
    wishlistItemsContainer.style.display = 'grid';
    renderWishlistItems();
  }
}

// Render wishlist items
function renderWishlistItems() {
  if (!wishlistItemsContainer) return;

  wishlistItemsContainer.innerHTML = '';
  
  wishlistItems.forEach((item, index) => {
    const wishlistItem = createWishlistItemElement(item, index);
    wishlistItemsContainer.appendChild(wishlistItem);
  });
}

// Create wishlist item element
function createWishlistItemElement(item, index) {
  const wishlistItem = document.createElement('div');
  wishlistItem.className = 'wishlist-item';
  wishlistItem.dataset.index = index;

  const discountBadge = item.discount ? 
    `<div class="discount-badge">-${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%</div>` : '';

  wishlistItem.innerHTML = `
    <div class="wishlist-item-image">
      <img src="${item.image}" alt="${item.name}" />
      ${discountBadge}
    </div>
    <div class="wishlist-item-details">
      <div class="item-info">
        <h3>${item.name}</h3>
        <div class="item-brand">${item.brand}</div>
        <div class="item-price">
          <span class="current-price">$${item.price.toFixed(2)}</span>
          ${item.discount ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button class="btn primary add-to-cart-btn" data-index="${index}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add to Cart
        </button>
        <button class="btn secondary view-product-btn" data-index="${index}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          View Product
        </button>
      </div>
    </div>
    <div class="wishlist-item-controls">
      <button class="remove-wishlist" data-index="${index}" title="Remove from wishlist">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <div class="item-size">${item.selectedSize || 'One Size'}</div>
    </div>
  `;

  // Add event listeners
  const addToCartBtn = wishlistItem.querySelector('.add-to-cart-btn');
  const viewProductBtn = wishlistItem.querySelector('.view-product-btn');
  const removeBtn = wishlistItem.querySelector('.remove-wishlist');

  addToCartBtn.addEventListener('click', () => addToCartFromWishlist(index));
  viewProductBtn.addEventListener('click', () => viewProduct(item));
  removeBtn.addEventListener('click', () => removeFromWishlist(index));

  return wishlistItem;
}

// Add item to cart from wishlist
function addToCartFromWishlist(index) {
  const item = wishlistItems[index];
  if (!item) return;

  // Add to cart (in a real app, this would integrate with cart system)
  console.log(`Added to cart: ${item.name}`);
  
  // Show feedback
  const button = event.target.closest('.add-to-cart-btn');
  const originalText = button.innerHTML;
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    Added!
  `;
  button.style.background = '#28a745';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = '';
    button.disabled = false;
  }, 2000);
}

// View product details
function viewProduct(item) {
  // In a real app, this would navigate to product page or open modal
  console.log(`Viewing product: ${item.name}`);
  
  // For now, just show an alert
  alert(`Viewing ${item.name} - This would navigate to the product page in a real app.`);
}

// Remove item from wishlist
function removeFromWishlist(index) {
  if (index < 0 || index >= wishlistItems.length) return;

  const item = wishlistItems[index];
  
  // Add loading state
  const wishlistItem = document.querySelector(`[data-index="${index}"]`);
  if (wishlistItem) {
    wishlistItem.classList.add('loading');
  }

  // Simulate API call delay
  setTimeout(() => {
    wishlistItems.splice(index, 1);
    saveWishlist();
    updateWishlistDisplay();
    
    // Show success message
    showNotification(`${item.name} removed from wishlist`, 'success');
  }, 500);
}

// Clear all wishlist items
function clearAllWishlist() {
  if (wishlistItems.length === 0) return;

  if (confirm('Are you sure you want to clear all items from your wishlist?')) {
    wishlistItems = [];
    saveWishlist();
    updateWishlistDisplay();
    showNotification('Wishlist cleared successfully', 'success');
  }
}

// Add all items to cart
function addAllToCart() {
  if (wishlistItems.length === 0) return;

  // Show loading state
  addAllToCartBtn.disabled = true;
  addAllToCartBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    Adding...
  `;

  // Add all items to cart
  wishlistItems.forEach(item => {
    if (window.cartManager) {
      window.cartManager.addToCart(item);
    } else {
      // Fallback: save to localStorage directly
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems = JSON.parse(savedCart);
      
      // Check if already in cart
      const existingIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingIndex !== -1) {
        // Update existing item quantity
        cartItems[existingIndex].quantity += 1;
      } else {
        // Add new item
        cartItems.unshift({ ...item, quantity: 1, dateAdded: new Date().toISOString() });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  });

  // Clear wishlist
  wishlistItems = [];
  saveWishlist();
  updateWishlistDisplay();
  
  // Reset button
  addAllToCartBtn.disabled = false;
  addAllToCartBtn.innerHTML = `
    <img src="assets/icons/cart.png" alt="Cart" />
    Add All to Cart
  `;
  
  showNotification('All items added to cart successfully!', 'success');
}

// Handle wishlist sorting
function handleSort() {
  const sortValue = wishlistSort.value;
  
  switch (sortValue) {
    case 'price-low':
      wishlistItems.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      wishlistItems.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      wishlistItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'date-added':
    default:
      // Keep original order (most recently added first)
      break;
  }
  
  renderWishlistItems();
}

// Update wishlist statistics
function updateWishlistStats() {
  const count = wishlistItems.length;
  const total = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  
  if (wishlistCount) {
    wishlistCount.textContent = count;
  }
  
  if (totalValue) {
    totalValue.textContent = `$${total.toFixed(2)}`;
  }
}

// Render recently viewed products
function renderRecentlyViewed() {
  const recentlyViewedGrid = document.getElementById('recently-viewed-grid');
  if (!recentlyViewedGrid || recentlyViewed.length === 0) return;

  recentlyViewedGrid.innerHTML = '';
  
  // Show only last 4 recently viewed items
  const recentItems = recentlyViewed.slice(-4);
  
  recentItems.forEach(item => {
    const productCard = createProductCard(item);
    recentlyViewedGrid.appendChild(productCard);
  });
}

// Create product card for recently viewed
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const discountBadge = product.discount ? 
    `<div class="discount-badge">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</div>` : '';

  card.innerHTML = `
    <div class="product-image-container">
      <img src="${product.image}" alt="${product.name}" />
      ${discountBadge}
    </div>
    <h3>${product.name}</h3>
    <div class="product-price">
      <span class="current-price">$${product.price.toFixed(2)}</span>
      ${product.discount ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
    </div>
    <div class="product-actions">
      <button class="btn primary add-to-cart" data-product-id="${product.id}">
        <img src="assets/icons/cart.png" alt="Cart" />
        Add to Cart
      </button>
      <button class="btn secondary wishlist" data-product-id="${product.id}">
        <img src="assets/icons/wishlist.png" alt="Wishlist" />
      </button>
    </div>
  `;

  // Add event listeners
  const addToCartBtn = card.querySelector('.add-to-cart');
  const wishlistBtn = card.querySelector('.wishlist');

  addToCartBtn.addEventListener('click', () => addToCart(product.id));
  wishlistBtn.addEventListener('click', () => toggleWishlist(product.id));

  return card;
}

// Add to cart functionality
function addToCart(productId) {
  const product = findProductById(productId);
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
  showNotification(`${product.name} added to cart`, 'success');
}

// Toggle wishlist functionality
function toggleWishlist(productId) {
  const button = event.target.closest('.wishlist');
  const isInWishlist = wishlistItems.some(item => item.id === productId);
  
  if (isInWishlist) {
    // Remove from wishlist
    const index = wishlistItems.findIndex(item => item.id === productId);
    if (index !== -1) {
      wishlistItems.splice(index, 1);
      saveWishlist();
      updateWishlistDisplay();
      showNotification('Item removed from wishlist', 'success');
    }
  } else {
    // Add to wishlist
    const product = findProductById(productId);
    if (product) {
      addToWishlist(product);
      showNotification('Item added to wishlist', 'success');
    }
  }
  
  // Update button appearance
  button.classList.toggle('active', !isInWishlist);
}

// Find product by ID (in a real app, this would come from API)
function findProductById(productId) {
  // This is a placeholder - in a real app, you'd have access to product data
  return {
    id: productId,
    name: 'Product Name',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://via.placeholder.com/300x400',
    brand: 'Brand',
    discount: true,
    selectedSize: 'M'
  };
}

// Add item to wishlist
function addToWishlist(product) {
  // Check if already in wishlist
  const existingIndex = wishlistItems.findIndex(item => item.id === product.id);
  
  if (existingIndex !== -1) {
    // Update existing item
    wishlistItems[existingIndex] = { ...product, dateAdded: new Date().toISOString() };
  } else {
    // Add new item
    wishlistItems.unshift({ ...product, dateAdded: new Date().toISOString() });
  }
  
  saveWishlist();
  updateWishlistDisplay();
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
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
    background: ${type === 'success' ? '#28a745' : '#17a2b8'};
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

// Load recently viewed and render
loadRecentlyViewed();
renderRecentlyViewed();

// Export functions for use in other files
window.wishlistManager = {
  addToWishlist,
  removeFromWishlist,
  isInWishlist: (productId) => wishlistItems.some(item => item.id === productId),
  getWishlistCount: () => wishlistItems.length
};
