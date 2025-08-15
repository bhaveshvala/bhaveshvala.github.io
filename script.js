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

  // Toggle mobile menu on click
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target)

    if (!isClickInsideNav && navMenu.classList.contains("active")) {
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
    // Reset button
    submitButton.innerHTML = originalText
    submitButton.disabled = false

    // Show success message
    alert("Thank you for your message! I will get back to you soon.")

    // Reset form
    document.getElementById("contactForm").reset()

    console.log("Form submitted with data:", formData)
  }, 2000)
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
