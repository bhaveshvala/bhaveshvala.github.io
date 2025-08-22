// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initMobileMenu()
  initSmoothScrolling()
  initContactForm()
  initScrollEffects()
})

// Mobile Menu Toggle Functionality
function initMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (!mobileMenu || !navMenu) {
    console.log("[v0] Mobile menu elements not found")
    return
  }

  // Toggle mobile menu on click
  mobileMenu.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("[v0] Mobile menu clicked")
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("[v0] Nav link clicked, closing mobile menu")
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target)

    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      console.log("[v0] Clicked outside, closing mobile menu")
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Smooth scrolling for hero buttons
  const heroButtons = document.querySelectorAll(".hero-buttons .btn-secondary")
  heroButtons.forEach((button) => {
    if (button.getAttribute("href").startsWith("#")) {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetSection.offsetTop - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    }
  })
}

// Contact Form Validation and Handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Clear previous error messages
    clearErrorMessages()

    // Get form data
    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    }

    // Validate form
    let isValid = true

    // Name validation
    if (formData.name === "") {
      showError("nameError", "Name is required")
      isValid = false
    } else if (formData.name.length < 2) {
      showError("nameError", "Name must be at least 2 characters")
      isValid = false
    }

    // Email validation
    if (formData.email === "") {
      showError("emailError", "Email is required")
      isValid = false
    } else if (!isValidEmail(formData.email)) {
      showError("emailError", "Please enter a valid email address")
      isValid = false
    }

    // Subject validation
    if (formData.subject === "") {
      showError("subjectError", "Subject is required")
      isValid = false
    } else if (formData.subject.length < 5) {
      showError("subjectError", "Subject must be at least 5 characters")
      isValid = false
    }

    // Message validation
    if (formData.message === "") {
      showError("messageError", "Message is required")
      isValid = false
    } else if (formData.message.length < 10) {
      showError("messageError", "Message must be at least 10 characters")
      isValid = false
    }

    // If form is valid, simulate form submission
    if (isValid) {
      submitForm(formData)
    }
  })

  // Real-time validation on input
  const formInputs = contactForm.querySelectorAll("input, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      // Clear error message when user starts typing
      const errorElement = document.getElementById(this.id + "Error")
      if (errorElement) {
        errorElement.textContent = ""
      }
    })
  })
}

// Helper function to validate individual fields
function validateField(field) {
  const fieldName = field.name
  const fieldValue = field.value.trim()
  const errorElementId = field.id + "Error"

  switch (fieldName) {
    case "name":
      if (fieldValue === "") {
        showError(errorElementId, "Name is required")
      } else if (fieldValue.length < 2) {
        showError(errorElementId, "Name must be at least 2 characters")
      }
      break

    case "email":
      if (fieldValue === "") {
        showError(errorElementId, "Email is required")
      } else if (!isValidEmail(fieldValue)) {
        showError(errorElementId, "Please enter a valid email address")
      }
      break

    case "subject":
      if (fieldValue === "") {
        showError(errorElementId, "Subject is required")
      } else if (fieldValue.length < 5) {
        showError(errorElementId, "Subject must be at least 5 characters")
      }
      break

    case "message":
      if (fieldValue === "") {
        showError(errorElementId, "Message is required")
      } else if (fieldValue.length < 10) {
        showError(errorElementId, "Message must be at least 10 characters")
      }
      break
  }
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to show error messages
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
  }
}

// Helper function to clear all error messages
function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message")
  errorElements.forEach((element) => {
    element.textContent = ""
  })
}

// Simulate form submission
function submitForm(formData) {
  const submitButton = document.querySelector('#contactForm button[type="submit"]')
  const originalText = submitButton.innerHTML

  // Show loading state
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitButton.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    appendToLeadsJSON(formData)

    // Reset button
    submitButton.innerHTML = originalText
    submitButton.disabled = false

    showSuccessMessage("Thank you for your message! I will get back to you soon.")

    // Reset form
    document.getElementById("contactForm").reset()

    console.log("[v0] Form submitted with data:", formData)
  }, 2000)
}

function showSuccessMessage(message) {
  // Create success message element
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <p>${message}</p>
      <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  // Add styles
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
  `

  // Add animation styles to head if not exists
  if (!document.querySelector("#success-animation-styles")) {
    const style = document.createElement("style")
    style.id = "success-animation-styles"
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .success-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .success-content i.fa-check-circle {
        font-size: 20px;
      }
      .success-content p {
        margin: 0;
        flex: 1;
      }
      .close-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 3px;
      }
      .close-btn:hover {
        background: rgba(255,255,255,0.2);
      }
    `
    document.head.appendChild(style)
  }

  // Add to page
  document.body.appendChild(successDiv)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (successDiv.parentElement) {
      successDiv.remove()
    }
  }, 5000)
}

function appendToLeadsJSON(formData) {
  // Get existing leads from localStorage (temporary storage for leads page)
  const existingLeads = localStorage.getItem("contactLeads")
  const leads = existingLeads ? JSON.parse(existingLeads) : []

  // Add new lead with timestamp
  const newLead = {
    ...formData,
    date: new Date().toISOString(),
    id: Date.now(),
  }

  leads.push(newLead)

  // Save to localStorage (for leads page to read)
  localStorage.setItem("contactLeads", JSON.stringify(leads))

  // In a real application, this would make an API call to append to leads.json
  // For now, we'll simulate this by updating the leads.json structure
  console.log("[v0] New lead added to storage:", newLead)
  console.log("[v0] Total leads in storage:", leads.length)

  // Note: In a real server environment, you would make an API call here
  // to append the new lead to the leads.json file on the server
  // Example: fetch('/api/leads', { method: 'POST', body: JSON.stringify(newLead) })
}

// Scroll Effects and Animations
function initScrollEffects() {
  // Add scroll event listener for navbar background
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")

    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    }
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".skill-card, .project-card, .about-content, .contact-content")
  animateElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}

// Utility function for smooth scrolling to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top functionality (can be called from anywhere)
window.scrollToTop = scrollToTop

// Console log for debugging
console.log("Portfolio website loaded successfully!")
