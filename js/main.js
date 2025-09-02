// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.getElementById("hamburger");
  const navCenter = document.getElementById("nav-center");
  const body = document.body;

  if (hamburger && navCenter) {
    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
      navCenter.classList.toggle("active");
      hamburger.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navCenter.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navCenter.contains(e.target)) {
        navCenter.classList.remove("active");
        hamburger.classList.remove("active");
        body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navCenter.classList.remove("active");
        hamburger.classList.remove("active");
        body.style.overflow = "";
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.backdropFilter = "blur(10px)";
      } else {
        navbar.style.background = "#fff";
        navbar.style.backdropFilter = "none";
      }

      lastScrollTop = scrollTop;
    });
  }

  // Search bar focus effect
  const searchBar = document.querySelector(".search-bar");
  if (searchBar) {
    const searchInput = searchBar.querySelector("input");
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        searchBar.style.transform = "scale(1.02)";
      });

      searchInput.addEventListener("blur", () => {
        searchBar.style.transform = "scale(1)";
      });
    }
  }

  // Add loading state to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.classList.contains("primary")) {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      }
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe hero elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");

  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";
    heroContent.style.transition = "all 0.8s ease";
    observer.observe(heroContent);
  }

  if (heroImage) {
    heroImage.style.opacity = "0";
    heroImage.style.transform = "translateY(30px)";
    heroImage.style.transition = "all 0.8s ease 0.2s";
    observer.observe(heroImage);
  }

  // Category cards functionality
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${0.3 + index * 0.1}s`;

    // Observe category cards for animation
    observer.observe(card);

    // Add click functionality
    card.addEventListener("click", () => {
      const categoryName = card.querySelector(".category-info h3").textContent;
      const shopText = card.querySelector(".shop-text").textContent;

      // Add click animation
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.transform = "";
      }, 150);

      // Navigate to category page (you can customize these URLs)
      const categoryUrls = {
        Men: "men.html",
        Women: "women.html",
        Kids: "kids.html",
      };

      const url = categoryUrls[categoryName];
      if (url) {
        // Add loading state
        card.style.pointerEvents = "none";
        card.style.opacity = "0.7";

        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }
    });

    // Add hover sound effect (optional)
    card.addEventListener("mouseenter", () => {
      card.style.cursor = "pointer";
    });

    // Add keyboard navigation support
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });

    // Make cards focusable
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Shop ${card.querySelector(".category-info h3").textContent} collection`
    );
  });

  // Add intersection observer for category cards
  const categoryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  categoryCards.forEach((card) => {
    categoryObserver.observe(card);
  });
});

// Show notification function
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

// Basic cart manager (fallback)
if (!window.cartManager) {
  window.cartManager = {
    addToCart: (product) => {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems = JSON.parse(savedCart);
      
      // Check if already in cart
      const existingIndex = cartItems.findIndex(item => item.id === product.id);
      
      if (existingIndex !== -1) {
        // Update existing item quantity
        cartItems[existingIndex].quantity += 1;
      } else {
        // Add new item
        cartItems.unshift({ ...product, quantity: 1, dateAdded: new Date().toISOString() });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      showNotification(`${product.name} added to cart`, 'success');
    },
    removeFromCart: (productId) => {
      const savedCart = localStorage.getItem('cart') || '[]';
      let cartItems = JSON.parse(savedCart);
      cartItems = cartItems.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    },
    getCartCount: () => {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems = JSON.parse(savedCart);
      return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    getCartTotal: () => {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems = JSON.parse(savedCart);
      return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  };
}

// Basic wishlist manager (fallback)
if (!window.wishlistManager) {
  window.wishlistManager = {
    addToWishlist: (product) => {
      const savedWishlist = localStorage.getItem('wishlist') || '[]';
      const wishlistItems = JSON.parse(savedWishlist);
      
      // Check if already in wishlist
      const existingIndex = wishlistItems.findIndex(item => item.id === product.id);
      
      if (existingIndex !== -1) {
        // Update existing item
        wishlistItems[existingIndex] = { ...product, dateAdded: new Date().toISOString() };
      } else {
        // Add new item
        wishlistItems.unshift({ ...product, dateAdded: new Date().toISOString() });
      }
      
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      showNotification(`${product.name} added to wishlist`, 'success');
    },
    removeFromWishlist: (productId) => {
      const savedWishlist = localStorage.getItem('wishlist') || '[]';
      let wishlistItems = JSON.parse(savedWishlist);
      wishlistItems = wishlistItems.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    },
    isInWishlist: (productId) => {
      const savedWishlist = localStorage.getItem('wishlist') || '[]';
      const wishlistItems = JSON.parse(savedWishlist);
      return wishlistItems.some(item => item.id === productId);
    },
    getWishlistCount: () => {
      const savedWishlist = localStorage.getItem('wishlist') || '[]';
      const wishlistItems = JSON.parse(savedWishlist);
      return wishlistItems.length;
    }
  };
}
