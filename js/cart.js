// ==================== CART PAGE FUNCTIONALITY ====================

// Global cart state
let cartItems = [];
let recentlyViewed = [];
let currentStep = 1;
let appliedPromo = null;

// Cart configuration
const SHIPPING_RATES = {
  standard: 5.99,
  express: 12.99
};

const TAX_RATE = 0.08; // 8% tax rate

// DOM elements
const cartItemsContainer = document.getElementById('cart-items');
const emptyCart = document.getElementById('empty-cart');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutModalClose = document.getElementById('checkout-modal-close');

// Order summary elements
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const taxElement = document.getElementById('tax');
const orderTotalElement = document.getElementById('order-total');

// Promo code elements
const promoInput = document.getElementById('promo-input');
const applyPromoBtn = document.getElementById('apply-promo');
const promoApplied = document.getElementById('promo-applied');
const promoText = document.getElementById('promo-text');
const removePromoBtn = document.getElementById('remove-promo');

// Checkout modal elements
const backToCartBtn = document.getElementById('back-to-cart');
const nextStepBtn = document.getElementById('next-step');
const backToShippingBtn = document.getElementById('back-to-shipping');
const placeOrderBtn = document.getElementById('place-order');
const closeCheckoutBtn = document.getElementById('close-checkout');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  loadRecentlyViewed();
  setupEventListeners();
  updateCartDisplay();
  updateOrderSummary();
});

// Setup event listeners
function setupEventListeners() {
  // Clear all cart items
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearAllCart);
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', openCheckoutModal);
  }

  // Checkout modal close
  if (checkoutModalClose) {
    checkoutModalClose.addEventListener('click', closeCheckoutModal);
  }

  // Shipping method change
  const shippingRadios = document.querySelectorAll('input[name="shipping"]');
  shippingRadios.forEach(radio => {
    radio.addEventListener('change', updateOrderSummary);
  });

  // Promo code
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', applyPromoCode);
  }

  if (removePromoBtn) {
    removePromoBtn.addEventListener('click', removePromoCode);
  }

  // Checkout steps
  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', nextStep);
  }

  if (backToShippingBtn) {
    backToShippingBtn.addEventListener('click', previousStep);
  }

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', placeOrder);
  }

  if (backToCartBtn) {
    backToCartBtn.addEventListener('click', closeCheckoutModal);
  }

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  }

  // Close modal when clicking outside
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) {
        closeCheckoutModal();
      }
    });
  }
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Load recently viewed from localStorage
function loadRecentlyViewed() {
  const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
  if (savedRecentlyViewed) {
    recentlyViewed = JSON.parse(savedRecentlyViewed);
  }
}

// Update cart display
function updateCartDisplay() {
  if (cartItems.length === 0) {
    showEmptyCart();
  } else {
    showCartItems();
  }
  updateCartStats();
}

// Show empty cart state
function showEmptyCart() {
  if (cartItemsContainer) {
    cartItemsContainer.style.display = 'none';
  }
  if (emptyCart) {
    emptyCart.style.display = 'block';
  }
  if (checkoutBtn) {
    checkoutBtn.disabled = true;
  }
}

// Show cart items
function showCartItems() {
  if (emptyCart) {
    emptyCart.style.display = 'none';
  }
  if (cartItemsContainer) {
    cartItemsContainer.style.display = 'block';
    renderCartItems();
  }
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
  }
}

// Render cart items
function renderCartItems() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  
  cartItems.forEach((item, index) => {
    const cartItem = createCartItemElement(item, index);
    cartItemsContainer.appendChild(cartItem);
  });
}

// Create cart item element
function createCartItemElement(item, index) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.dataset.index = index;

  const discountBadge = item.discount ? 
    `<div class="discount-badge">-${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%</div>` : '';

  cartItem.innerHTML = `
    <div class="cart-item-image">
      <img src="${item.image}" alt="${item.name}" />
      ${discountBadge}
    </div>
    <div class="cart-item-details">
      <div class="item-info">
        <h3>${item.name}</h3>
        <div class="item-brand">${item.brand}</div>
        <div class="item-price">
          <span class="current-price">$${item.price.toFixed(2)}</span>
          ${item.discount ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button class="btn secondary move-to-wishlist" data-index="${index}">
          <img src="assets/icons/wishlist.png" alt="Wishlist" />
          Move to Wishlist
        </button>
      </div>
    </div>
    <div class="cart-item-controls">
      <div class="quantity-controls">
        <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-index="${index}" />
        <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
      </div>
      <div class="item-total">
        <span class="total-label">Total:</span>
        <span class="total-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <button class="remove-item" data-index="${index}" title="Remove from cart">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  `;

  // Add event listeners
  const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
  const increaseBtn = cartItem.querySelector('[data-action="increase"]');
  const quantityInput = cartItem.querySelector('.quantity-input');
  const removeBtn = cartItem.querySelector('.remove-item');
  const moveToWishlistBtn = cartItem.querySelector('.move-to-wishlist');

  decreaseBtn.addEventListener('click', () => changeQuantity(index, -1));
  increaseBtn.addEventListener('click', () => changeQuantity(index, 1));
  quantityInput.addEventListener('change', (e) => setQuantity(index, parseInt(e.target.value)));
  removeBtn.addEventListener('click', () => removeFromCart(index));
  moveToWishlistBtn.addEventListener('click', () => moveToWishlist(index));

  return cartItem;
}

// Change item quantity
function changeQuantity(index, change) {
  if (index < 0 || index >= cartItems.length) return;

  const newQuantity = cartItems[index].quantity + change;
  if (newQuantity < 1) return;

  cartItems[index].quantity = newQuantity;
  saveCart();
  updateCartDisplay();
  updateOrderSummary();
}

// Set item quantity
function setQuantity(index, quantity) {
  if (index < 0 || index >= cartItems.length) return;
  if (quantity < 1) quantity = 1;

  cartItems[index].quantity = quantity;
  saveCart();
  updateCartDisplay();
  updateOrderSummary();
}

// Remove item from cart
function removeFromCart(index) {
  if (index < 0 || index >= cartItems.length) return;

  const item = cartItems[index];
  
  // Add loading state
  const cartItem = document.querySelector(`[data-index="${index}"]`);
  if (cartItem) {
    cartItem.classList.add('loading');
  }

  // Simulate API call delay
  setTimeout(() => {
    cartItems.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateOrderSummary();
    
    // Show success message
    showNotification(`${item.name} removed from cart`, 'success');
  }, 500);
}

// Move item to wishlist
function moveToWishlist(index) {
  if (index < 0 || index >= cartItems.length) return;

  const item = cartItems[index];
  
  // Add to wishlist
  if (window.wishlistManager) {
    window.wishlistManager.addToWishlist(item);
  } else {
    // Fallback: save to localStorage directly
    const savedWishlist = localStorage.getItem('wishlist') || '[]';
    const wishlistItems = JSON.parse(savedWishlist);
    
    // Check if already in wishlist
    const existingIndex = wishlistItems.findIndex(wishlistItem => wishlistItem.id === item.id);
    
    if (existingIndex !== -1) {
      // Update existing item
      wishlistItems[existingIndex] = { ...item, dateAdded: new Date().toISOString() };
    } else {
      // Add new item
      wishlistItems.unshift({ ...item, dateAdded: new Date().toISOString() });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }

  // Remove from cart
  cartItems.splice(index, 1);
  saveCart();
  updateCartDisplay();
  updateOrderSummary();
  
  showNotification(`${item.name} moved to wishlist`, 'success');
}

// Clear all cart items
function clearAllCart() {
  if (cartItems.length === 0) return;

  if (confirm('Are you sure you want to clear all items from your cart?')) {
    cartItems = [];
    saveCart();
    updateCartDisplay();
    updateOrderSummary();
    showNotification('Cart cleared successfully', 'success');
  }
}

// Update cart statistics
function updateCartStats() {
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (cartCount) {
    cartCount.textContent = count;
  }
  
  if (cartTotal) {
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
}

// Update order summary
function updateOrderSummary() {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Get selected shipping method
  const selectedShipping = document.querySelector('input[name="shipping"]:checked');
  const shippingCost = selectedShipping ? SHIPPING_RATES[selectedShipping.value] : SHIPPING_RATES.standard;
  
  // Calculate tax
  const taxAmount = subtotal * TAX_RATE;
  
  // Apply promo discount if any
  let finalSubtotal = subtotal;
  if (appliedPromo) {
    finalSubtotal = Math.max(0, subtotal - appliedPromo.discount);
  }
  
  const total = finalSubtotal + shippingCost + taxAmount;
  
  // Update display
  if (subtotalElement) subtotalElement.textContent = `$${finalSubtotal.toFixed(2)}`;
  if (shippingElement) shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
  if (taxElement) taxElement.textContent = `$${taxAmount.toFixed(2)}`;
  if (orderTotalElement) orderTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Apply promo code
function applyPromoCode() {
  const code = promoInput.value.trim().toUpperCase();
  
  if (!code) {
    showNotification('Please enter a promo code', 'error');
    return;
  }

  // Sample promo codes (in a real app, this would come from an API)
  const promoCodes = {
    'SAVE10': { discount: 10, type: 'percentage' },
    'SAVE20': { discount: 20, type: 'percentage' },
    'FREESHIP': { discount: SHIPPING_RATES.standard, type: 'shipping' },
    'WELCOME15': { discount: 15, type: 'percentage' }
  };

  if (promoCodes[code]) {
    appliedPromo = { code, ...promoCodes[code] };
    
    // Show applied promo
    promoText.textContent = `${code} applied`;
    promoApplied.style.display = 'flex';
    promoInput.value = '';
    
    updateOrderSummary();
    showNotification(`Promo code ${code} applied successfully!`, 'success');
  } else {
    showNotification('Invalid promo code', 'error');
  }
}

// Remove promo code
function removePromoCode() {
  appliedPromo = null;
  promoApplied.style.display = 'none';
  updateOrderSummary();
  showNotification('Promo code removed', 'success');
}

// Open checkout modal
function openCheckoutModal() {
  if (cartItems.length === 0) return;
  
  currentStep = 1;
  showCheckoutStep(1);
  checkoutModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close checkout modal
function closeCheckoutModal() {
  checkoutModal.classList.remove('active');
  document.body.style.overflow = '';
  resetCheckoutForm();
}

// Show checkout step
function showCheckoutStep(step) {
  // Hide all steps
  document.querySelectorAll('.checkout-step').forEach(stepEl => {
    stepEl.classList.remove('active');
  });
  
  // Show current step
  const currentStepEl = document.getElementById(`step-${step}`);
  if (currentStepEl) {
    currentStepEl.classList.add('active');
  }
  
  currentStep = step;
}

// Next step in checkout
function nextStep() {
  if (currentStep === 1) {
    // Validate shipping form
    if (!validateShippingForm()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    showCheckoutStep(2);
  }
}

// Previous step in checkout
function previousStep() {
  if (currentStep === 2) {
    showCheckoutStep(1);
  }
}

// Validate shipping form
function validateShippingForm() {
  const requiredFields = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'state', 'zip'];
  
  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (!field || !field.value.trim()) {
      return false;
    }
  }
  
  return true;
}

// Place order
function placeOrder() {
  // Validate payment form
  if (!validatePaymentForm()) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  // Show loading state
  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing...';

  // Simulate order processing
  setTimeout(() => {
    // Generate order number
    const orderNumber = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Calculate delivery date
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    const shippingDays = selectedShipping && selectedShipping.value === 'express' ? 3 : 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + shippingDays);
    
    // Update confirmation page
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('delivery-date').textContent = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Show confirmation step
    showCheckoutStep(3);
    
    // Clear cart
    cartItems = [];
    saveCart();
    updateCartDisplay();
    updateOrderSummary();
    
      // Reset button
  placeOrderBtn.disabled = false;
  placeOrderBtn.innerHTML = `
    <img src="assets/icons/check.png" alt="Order" />
    Place Order
  `;
    
    showNotification('Order placed successfully!', 'success');
  }, 2000);
}

// Validate payment form
function validatePaymentForm() {
  const requiredFields = ['card-number', 'expiry', 'cvv', 'card-name'];
  
  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (!field || !field.value.trim()) {
      return false;
    }
  }
  
  return true;
}

// Reset checkout form
function resetCheckoutForm() {
  // Reset all form fields
  document.querySelectorAll('.checkout-form input').forEach(input => {
    input.value = '';
  });
  
  // Reset to first step
  currentStep = 1;
  showCheckoutStep(1);
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
  console.log(`Added product ${productId} to cart`);
  
  const button = event.target;
  const originalText = button.textContent;
  button.textContent = 'Added!';
  button.style.background = '#28a745';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 2000);
}

// Toggle wishlist functionality
function toggleWishlist(productId) {
  const button = event.target.closest('.wishlist');
  const isInWishlist = window.wishlistManager ? 
    window.wishlistManager.isInWishlist(productId) : false;
  
  if (isInWishlist) {
    // Remove from wishlist
    if (window.wishlistManager) {
      window.wishlistManager.removeFromWishlist(productId);
    }
    showNotification('Item removed from wishlist', 'success');
  } else {
    // Add to wishlist
    const product = findProductById(productId);
    if (product) {
      if (window.wishlistManager) {
        window.wishlistManager.addToWishlist(product);
      }
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
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
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
window.cartManager = {
  addToCart: (product) => {
    // Check if already in cart
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      // Update existing item quantity
      cartItems[existingIndex].quantity += 1;
    } else {
      // Add new item
      cartItems.unshift({ ...product, quantity: 1, dateAdded: new Date().toISOString() });
    }
    
    saveCart();
    updateCartDisplay();
    updateOrderSummary();
  },
  removeFromCart,
  getCartCount: () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
  getCartTotal: () => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
};
