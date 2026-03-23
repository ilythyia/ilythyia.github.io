/**
 * DANYKA NARCISO - PIXEL PASTEL PORTFOLIO SCRIPTS
 * Theme: Retro pixel art with soft pastel colors
 * Last Updated: 2026-03-23
 * 
 * Features:
 * - Loading screen animation
 * - Typewriter text effect
 * - Floating pixel background
 * - Scroll reveal animations
 * - Skill bar animations
 * - Smooth scrolling navigation
 * - Form handling
 * 
 * NEW: Interactive Projects
 * - Pixel Calculator (basic arithmetic, keyboard support)
 * - Pixel Task Master (CRUD operations, localStorage)
 * - Pixel Paint Studio (16x16 grid, color picker)
 * - Pixel Weather (simulated API, dynamic UI)
 */

// ============================================
// LOADING SCREEN
// ============================================

/**
 * Initialize loading screen
 * Hides loader after 1.5 seconds when page is fully loaded
 * This ensures all assets are ready before showing content
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// ============================================
// TYPEWRITER EFFECT
// ============================================

/**
 * Typewriter Configuration
 * Array of phrases to rotate through in the hero section
 */
const phrases = [
    "Aspiring IT Professional",
    "Creative Problem Solver", 
    "Pixel Perfect Designer",
    "Network Enthusiast"
];

// State variables for typewriter
let phraseIndex = 0;  // Current phrase index
let charIndex = 0;    // Current character index
let isDeleting = false; // Whether we're deleting or typing
const typewriterElement = document.getElementById('typewriter');

/**
 * Typewriter Animation Function
 * Types out phrases one character at a time, then deletes them
 * Creates a realistic typing effect with variable speed
 */
function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    // Add or remove characters based on state
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    // Dynamic typing speed
    let typeSpeed = isDeleting ? 50 : 100;

    // Phrase complete - pause then delete
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Wait 2 seconds at end
        isDeleting = true;
    } 
    // Deletion complete - move to next phrase
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to start
        typeSpeed = 500; // Pause before typing next
    }

    // Schedule next iteration
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter when script loads
typeWriter();

// ============================================
// FLOATING PIXELS BACKGROUND
// ============================================

/**
 * Generate Floating Pixels
 * Creates random floating pixel elements in the background
 * Each pixel has random position, color, and animation timing
 */
const floatingContainer = document.getElementById('floatingPixels');

// Available pastel colors for pixels
const pixelColors = [
    '#ffd1dc', // Pink
    '#e6e6fa', // Lavender
    '#c8f4e8', // Mint
    '#ffdab9', // Peach
    '#b5e4ff'  // Blue
];

// Create 20 floating pixels
for (let i = 0; i < 20; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    
    // Random horizontal position (0-100%)
    pixel.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (10-20 seconds)
    pixel.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // Random delay so they don't all start together
    pixel.style.animationDelay = Math.random() * 10 + 's';
    
    // Random pastel color
    pixel.style.background = pixelColors[Math.floor(Math.random() * pixelColors.length)];
    
    floatingContainer.appendChild(pixel);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

/**
 * Intersection Observer Configuration
 * Triggers animations when elements enter the viewport
 */
const observerOptions = {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: "0px 0px -50px 0px" // Slightly before fully in view
};

/**
 * Create Intersection Observer
 * Handles reveal animations and skill bar fills
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add active class to trigger CSS animation
            entry.target.classList.add('active');
            
            // If this is a skills section, animate the progress bars
            if (entry.target.querySelector('.skill-progress')) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    // Small delay for visual effect
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with 'reveal' class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

/**
 * Smooth Scroll Implementation
 * Overrides default anchor behavior for smooth scrolling
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // Smooth scroll animation
                block: 'start'    // Align to top of section
            });
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

/**
 * Contact Form Submission
 * Prevents default submission and shows success feedback
 * In production, this would connect to a backend service
 */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission
    
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    
    // Show success state
    btn.textContent = 'SENT! ✨';
    btn.style.background = '#c8f4e8'; // Mint green success color
    
    // Reset after 3 seconds
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        this.reset(); // Clear form fields
    }, 3000);
});

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================

/**
 * Hero Parallax Effect
 * Moves hero section slower than scroll for depth effect
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        // Move at half scroll speed
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// PROJECT 1: PIXEL CALCULATOR
// ============================================

/**
 * Pixel Calculator Application
 * Fully functional calculator with basic arithmetic operations
 * Features: addition, subtraction, multiplication, division
 * Keyboard support for desktop users
 */

// Calculator state variables
let calcDisplay = document.getElementById('calcDisplay');
let currentInput = '0';      // Current number being entered
let previousInput = '';    // Previous number for operations
let operation = null;      // Current operation (+, -, *, /)
let shouldResetDisplay = false; // Flag to reset display on next input

/**
 * Update calculator display
 * Truncates long numbers to prevent overflow
 */
function updateDisplay() {
    // Limit display length to prevent overflow
    let displayValue = currentInput;
    if (displayValue.length > 12) {
        displayValue = displayValue.substring(0, 12);
    }
    calcDisplay.textContent = displayValue;
}

/**
 * Append number to current input
 * @param {string} num - Number to append (0-9 or .)
 */
function appendNumber(num) {
    // Reset display if starting fresh after operation
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimals
    if (num === '.' && currentInput.includes('.')) return;
    
    // Replace initial 0 unless adding decimal
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

/**
 * Append operator and prepare for next number
 * @param {string} op - Operator symbol (+, -, *, /)
 */
function appendOperator(op) {
    // If there's a pending operation, calculate first
    if (operation !== null) {
        calculate();
    }
    
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

/**
 * Perform calculation
 * Executes the stored operation between previous and current input
 */
function calculate() {
    if (operation === null || previousInput === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    // Handle division by zero
    if (operation === '/' && current === 0) {
        currentInput = 'Error';
        updateDisplay();
        operation = null;
        shouldResetDisplay = true;
        return;
    }
    
    // Perform operation
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Format result (max 8 decimal places, remove trailing zeros)
    currentInput = parseFloat(result.toFixed(8)).toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Clear calculator state
 * Resets all values to initial state
 */
function clearCalc() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Delete last character
 * Backspace functionality
 */
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

/**
 * Keyboard Support for Calculator
 * Allows users to type numbers and operators from keyboard
 */
document.addEventListener('keydown', (e) => {
    // Only trigger if calculator is visible on screen
    const calc = document.querySelector('.calculator-app');
    if (!calc || !isElementInViewport(calc)) return;
    
    const key = e.key;
    
    // Number keys (0-9)
    if (/[0-9]/.test(key)) {
        e.preventDefault();
        appendNumber(key);
    }
    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        e.preventDefault();
        appendOperator(key);
    }
    // Enter or Equals
    else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    }
    // Escape or C for clear
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        e.preventDefault();
        clearCalc();
    }
    // Backspace
    else if (key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    // Decimal
    else if (key === '.') {
        e.preventDefault();
        appendNumber('.');
    }
});

/**
 * Check if element is in viewport
 * Helper function for keyboard support
 * @param {Element} el - Element to check
 * @returns {boolean} - True if in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// PROJECT 2: PIXEL TASK MASTER (TO-DO LIST)
// ============================================

/**
 * Pixel Task Master Application
 * Interactive to-do list with CRUD operations
 * Features: add, complete, delete tasks; persistent storage simulation
 */

// To-Do state
let todos = [
    { id: 1, text: 'Complete portfolio website', completed: true },
    { id: 2, text: 'Study for Cisco exam', completed: false },
    { id: 3, text: 'Design pixel art assets', completed: false }
];
let todoIdCounter = 4; // Starting ID for new todos

/**
 * Initialize To-Do List on page load
 * Renders initial sample tasks
 */
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
    updateTodoCount();
});

/**
 * Add new to-do item
 * Triggered by + button or Enter key
 */
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') return; // Don't add empty todos
    
    // Create new todo object
    const newTodo = {
        id: todoIdCounter++,
        text: text,
        completed: false
    };
    
    todos.push(newTodo);
    input.value = ''; // Clear input
    renderTodos();
    updateTodoCount();
}

/**
 * Toggle todo completion status
 * @param {number} id - Todo item ID
 */
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateTodoCount();
    }
}

/**
 * Delete todo item
 * @param {number} id - Todo item ID to delete
 */
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
    updateTodoCount();
}

/**
 * Clear all completed todos
 */
function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
    updateTodoCount();
}

/**
 * Render all todos to the DOM
 * Creates HTML elements for each todo item
 */
function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = ''; // Clear current list
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        // Checkbox
        const checkbox = document.createElement('div');
        checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
        checkbox.onclick = () => toggleTodo(todo.id);
        if (todo.completed) checkbox.textContent = '✓';
        
        // Text
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-delete';
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => deleteTodo(todo.id);
        
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

/**
 * Update todo counter display
 * Shows pending tasks count
 */
function updateTodoCount() {
    const pending = todos.filter(t => !t.completed).length;
    const countEl = document.getElementById('todoCount');
    countEl.textContent = `${pending} task${pending !== 1 ? 's' : ''} pending`;
}

/**
 * Enter key support for todo input
 */
document.getElementById('todoInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// ============================================
// PROJECT 3: PIXEL PAINT STUDIO
// ============================================

/**
 * Pixel Paint Studio Application
 * Browser-based pixel art creator
 * Features: 16x16 grid, 7-color palette, click-to-paint, clear canvas
 */

// Paint state
let currentPaintColor = '#2d3436'; // Default black
let isPainting = false; // Track mouse down state for drag painting

/**
 * Initialize Paint Canvas on page load
 * Creates 16x16 grid of clickable pixels
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('paintCanvas');
    if (!canvas) return;
    
    // Create 16x16 grid (256 pixels total)
    for (let i = 0; i < 256; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel-cell';
        pixel.dataset.index = i;
        
        // Mouse events for painting
        pixel.addEventListener('mousedown', (e) => {
            isPainting = true;
            paintPixel(pixel);
        });
        
        pixel.addEventListener('mouseenter', (e) => {
            if (isPainting) paintPixel(pixel);
        });
        
        pixel.addEventListener('mouseup', () => {
            isPainting = false;
        });
        
        canvas.appendChild(pixel);
    }
    
    // Global mouse up to stop painting
    document.addEventListener('mouseup', () => {
        isPainting = false;
    });
});

/**
 * Paint a single pixel
 * @param {Element} pixel - Pixel cell element to paint
 */
function paintPixel(pixel) {
    pixel.style.backgroundColor = currentPaintColor;
    
    // Add pop animation
    pixel.style.transform = 'scale(0.8)';
    setTimeout(() => {
        pixel.style.transform = 'scale(1)';
    }, 100);
}

/**
 * Set current paint color
 * @param {string} color - Hex color code
 */
function setPaintColor(color) {
    currentPaintColor = color;
    
    // Update active state on color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
        // Check if this button has the selected color
        if (btn.getAttribute('onclick').includes(color)) {
            btn.classList.add('active');
        }
    });
}

/**
 * Clear entire canvas
 * Resets all pixels to white
 */
function clearCanvas() {
    const pixels = document.querySelectorAll('.pixel-cell');
    pixels.forEach((pixel, index) => {
        // Staggered animation for visual effect
        setTimeout(() => {
            pixel.style.backgroundColor = 'white';
            pixel.style.transform = 'scale(0.5)';
            setTimeout(() => {
                pixel.style.transform = 'scale(1)';
            }, 100);
        }, index * 2); // 2ms delay between each pixel
    });
}

// ============================================
// PROJECT 4: PIXEL WEATHER WIDGET
// ============================================

/**
 * Pixel Weather Widget Application
 * Simulated weather data for demonstration
 * Features: city search, temperature display, conditions, humidity/wind
 * 
 * NOTE: In production, this would connect to OpenWeatherMap API
 * Currently uses simulated data for portfolio demonstration
 */

// Simulated weather database for demo purposes
const weatherDatabase = {
    'manila': { temp: 32, condition: 'Sunny', icon: '☀️', humidity: 65, wind: 12 },
    'quezon city': { temp: 31, condition: 'Partly Cloudy', icon: '⛅', humidity: 70, wind: 10 },
    'makati': { temp: 30, condition: 'Cloudy', icon: '☁️', humidity: 75, wind: 8 },
    'pasig': { temp: 29, condition: 'Rainy', icon: '🌧️', humidity: 85, wind: 15 },
    'taguig': { temp: 30, condition: 'Thunderstorm', icon: '⛈️', humidity: 90, wind: 20 },
    'cebu': { temp: 28, condition: 'Sunny', icon: '☀️', humidity: 60, wind: 18 },
    'davao': { temp: 33, condition: 'Sunny', icon: '☀️', humidity: 55, wind: 10 },
    'baguio': { temp: 18, condition: 'Foggy', icon: '🌫️', humidity: 80, wind: 5 },
    'tokyo': { temp: 22, condition: 'Clear', icon: '🌙', humidity: 50, wind: 14 },
    'new york': { temp: 15, condition: 'Windy', icon: '💨', humidity: 45, wind: 25 },
    'london': { temp: 12, condition: 'Drizzle', icon: '🌦️', humidity: 82, wind: 16 },
    'sydney': { temp: 25, condition: 'Sunny', icon: '☀️', humidity: 58, wind: 22 }
};

// Default weather data for unknown cities
const defaultWeather = { temp: 25, condition: 'Clear', icon: '🌤️', humidity: 60, wind: 10 };

/**
 * Fetch and display weather data
 * Simulates API call with loading state
 */
function getWeather() {
    const input = document.getElementById('weatherInput');
    const city = input.value.trim().toLowerCase();
    
    if (!city) return;
    
    // Simulate loading state
    const display = document.getElementById('weatherDisplay');
    display.style.opacity = '0.5';
    
    // Simulate API delay (800ms)
    setTimeout(() => {
        // Get weather data (from database or generate random)
        let data = weatherDatabase[city];
        
        if (!data) {
            // Generate pseudo-random but consistent weather for unknown cities
            // Using city name length as seed for consistency
            data = generateWeatherForCity(city);
        }
        
        updateWeatherDisplay(city, data);
        display.style.opacity = '1';
    }, 800);
}

/**
 * Generate consistent weather for unknown cities
 * Uses city name to create deterministic "random" weather
 * @param {string} city - City name
 * @returns {Object} - Weather data object
 */
function generateWeatherForCity(city) {
    // Simple hash of city name for consistent results
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
        hash = city.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const conditions = [
        { condition: 'Sunny', icon: '☀️' },
        { condition: 'Partly Cloudy', icon: '⛅' },
        { condition: 'Cloudy', icon: '☁️' },
        { condition: 'Rainy', icon: '🌧️' },
        { condition: 'Clear', icon: '🌙' }
    ];
    
    const conditionIndex = Math.abs(hash) % conditions.length;
    const temp = 15 + (Math.abs(hash) % 20); // 15-35°C range
    
    return {
        temp: temp,
        condition: conditions[conditionIndex].condition,
        icon: conditions[conditionIndex].icon,
        humidity: 40 + (Math.abs(hash) % 50), // 40-90%
        wind: 5 + (Math.abs(hash) % 25) // 5-30 km/h
    };
}

/**
 * Update weather widget UI
 * @param {string} city - City name
 * @param {Object} data - Weather data object
 */
function updateWeatherDisplay(city, data) {
    // Format city name (capitalize each word)
    const formattedCity = city.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Update DOM elements
    document.getElementById('weatherIcon').textContent = data.icon;
    document.getElementById('weatherTemp').textContent = `${data.temp}°C`;
    document.getElementById('weatherCity').textContent = `${formattedCity}, PH`;
    document.getElementById('weatherDesc').textContent = data.condition;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind} km/h`;
    
    // Change background gradient based on weather
    const app = document.querySelector('.weather-app');
    app.style.background = getWeatherGradient(data.condition);
}

/**
 * Get background gradient based on weather condition
 * @param {string} condition - Weather condition
 * @returns {string} - CSS gradient
 */
function getWeatherGradient(condition) {
    const gradients = {
        'Sunny': 'linear-gradient(135deg, #ffd1dc, #ffeaa7)',
        'Clear': 'linear-gradient(135deg, #b5e4ff, #e6e6fa)',
        'Partly Cloudy': 'linear-gradient(135deg, #b5e4ff, #c8f4e8)',
        'Cloudy': 'linear-gradient(135deg, #e6e6fa, #d3d3d3)',
        'Rainy': 'linear-gradient(135deg, #a8c0ff, #3f2b96)',
        'Thunderstorm': 'linear-gradient(135deg, #667eea, #764ba2)',
        'Drizzle': 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        'Foggy': 'linear-gradient(135deg, #e6e6fa, #d3d3d3)',
        'Windy': 'linear-gradient(135deg, #c8f4e8, #b5e4ff)'
    };
    
    return gradients[condition] || gradients['Clear'];
}

/**
 * Enter key support for weather search
 */
document.getElementById('weatherInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce Function
 * Limits how often a function can fire
 * Useful for scroll events to improve performance
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Example usage for optimized scroll handling:
 * window.addEventListener('scroll', debounce(() => {
 *     // Your scroll handler here
 * }, 16)); // ~60fps
 */

// ============================================
// CONSOLE EASTER EGG
// ============================================

/**
 * Fun console message for developers
 */
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #ff6b9d; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #4a4a6a;');
console.log('%cBuilt with 💖 and pixels by Danyka Narciso', 'font-size: 12px; color: #666;');
console.log('%cTry the interactive projects:', 'font-size: 12px; color: #ff6b9d;');
console.log('%c• Calculator: Use keyboard or click buttons', 'font-size: 10px; color: #666;');
console.log('%c• Task Master: Add, complete, and delete tasks', 'font-size: 10px; color: #666;');
console.log('%c• Paint Studio: Click and drag to create pixel art', 'font-size: 10px; color: #666;');
console.log('%c• Weather: Search for cities (try "Manila", "Baguio", or any city!)', 'font-size: 10px; color: #666;');