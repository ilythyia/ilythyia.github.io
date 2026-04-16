// Apex Legends Birthday Website - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initConfetti();
    initCounters();
    initCelebrateButton();
    initLootBox();
    initLootTick();
});

// ============================================
// CONFETTI SYSTEM
// ============================================
function initConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Confetti particles
    const particles = [];
    const colors = ['#DA292A', '#FF6B35', '#FFD700', '#00D9FF', '#9D4EDD', '#FF69B4', '#00FF88'];
    
    class Particle {
        constructor(x, y, type = 'normal') {
            // Spawn from multiple edges for more spread
            const spawnEdge = Math.random();
            if (x === undefined) {
                if (spawnEdge < 0.5) {
                    // From top
                    this.x = Math.random() * canvas.width;
                    this.y = -30;
                } else if (spawnEdge < 0.75) {
                    // From left
                    this.x = -30;
                    this.y = Math.random() * canvas.height * 0.5;
                } else {
                    // From right
                    this.x = canvas.width + 30;
                    this.y = Math.random() * canvas.height * 0.5;
                }
            } else {
                this.x = x;
                this.y = y || -20;
            }
            
            this.size = Math.random() * 12 + 6;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Wider spread for speedX
            if (type === 'burst') {
                this.speedX = (Math.random() - 0.5) * 25; // Very wide spread for bursts
                this.speedY = (Math.random() - 0.5) * 25;
            } else {
                this.speedX = (Math.random() - 0.5) * 12; // Wider normal spread
                this.speedY = Math.random() * 4 + 1;
            }
            
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 15;
            this.type = type;
            
            // Special shapes for birthday
            this.shape = Math.floor(Math.random() * 4); // 0: square, 1: circle, 2: triangle, 3: heart
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Add some wobble
            this.speedX += Math.sin(this.y * 0.01) * 0.1;
            
            // Gravity effect
            this.speedY += 0.05;
            
            // Wrap around horizontally
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            
            switch(this.shape) {
                case 0: // Square
                    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                    break;
                case 1: // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 2: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size/2);
                    ctx.lineTo(-this.size/2, this.size/2);
                    ctx.lineTo(this.size/2, this.size/2);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 3: // Heart
                    drawHeart(ctx, 0, 0, this.size/2);
                    break;
            }
            
            ctx.restore();
        }
    }
    
    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size/4);
        ctx.quadraticCurveTo(x, y, x + size/4, y);
        ctx.quadraticCurveTo(x + size/2, y, x + size/2, y + size/4);
        ctx.quadraticCurveTo(x + size/2, y, x + size*3/4, y);
        ctx.quadraticCurveTo(x + size, y, x + size, y + size/4);
        ctx.quadraticCurveTo(x + size, y + size/2, x + size/2, y + size*3/4);
        ctx.quadraticCurveTo(x, y + size/2, x, y + size/4);
        ctx.fill();
    }
    
    // Create initial confetti - more particles for better spread
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            // Remove particles that fall off screen (all edges)
            if (particles[i].y > canvas.height + 100 || 
                particles[i].x < -100 || 
                particles[i].x > canvas.width + 100) {
                particles.splice(i, 1);
            }
        }
        
        // Add new particles more frequently for continuous spread
        if (particles.length < 150 && Math.random() < 0.15) {
            particles.push(new Particle());
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Expose function to add burst of confetti
    window.confettiBurst = function(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y, 'burst'));
        }
    };
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
function initCounters() {
    const presentsCounter = document.getElementById('presents');
    const balloonsCounter = document.getElementById('balloons');
    
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        
        function update() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        update();
    }
    
    // Animate counters on load
    setTimeout(() => {
        animateCounter(presentsCounter, 99);
        animateCounter(balloonsCounter, 50);
    }, 500);
}

// ============================================
// CELEBRATE BUTTON
// ============================================
function initCelebrateButton() {
    const btn = document.getElementById('celebrateBtn');
    
    btn.addEventListener('click', function(e) {
        // Create confetti burst at button position
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        if (window.confettiBurst) {
            window.confettiBurst(x, y, 50);
        }
        
        // Add celebration mode to body
        document.body.classList.add('celebration-mode');
        setTimeout(() => {
            document.body.classList.remove('celebration-mode');
        }, 500);
        
        // Create floating emojis
        createFloatingEmojis(x, y);
        
        // Button animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        // Play sound effect (visual feedback)
        createRipple(e);
    });
}

function createFloatingEmojis(x, y) {
    const emojis = ['🎉', '🎊', '🎂', '🎁', '🎈', '✨', '🥳', '🎆'];
    
    for (let i = 0; i < 8; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = x + 'px';
        emoji.style.top = y + 'px';
        emoji.style.fontSize = '2rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '9999';
        emoji.style.animation = `particleFloat 2s ease-out forwards`;
        emoji.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
        
        document.body.appendChild(emoji);
        
        // Animate with random direction
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 100;
        
        emoji.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 500,
            easing: 'ease-out'
        }).onfinish = () => emoji.remove();
    }
}

function createRipple(e) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = 'rgba(255, 215, 0, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(ripple);
    
    ripple.animate([
        { width: '10px', height: '10px', opacity: 1 },
        { width: '200px', height: '200px', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}

// ============================================
// LOOT BOX
// ============================================
function initLootBox() {
    const lootBox = document.getElementById('lootBox');
    const giftReveal = document.getElementById('giftReveal');
    let isOpened = false;
    
    lootBox.addEventListener('click', function() {
        if (isOpened) return;
        isOpened = true;
        
        // Add opened class for animation
        lootBox.classList.add('opened');
        
        // Create explosion effect
        const rect = lootBox.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        if (window.confettiBurst) {
            window.confettiBurst(x, y, 80);
        }
        
        // Create sparkles
        createSparkles(x, y);
        
        // Show gift after animation
        setTimeout(() => {
            giftReveal.classList.add('show');
            lootBox.style.display = 'none';
            
            // More confetti for the reveal
            setTimeout(() => {
                if (window.confettiBurst) {
                    window.confettiBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
                }
            }, 300);
        }, 500);
    });
}

function createSparkles(x, y) {
    const colors = ['#FFD700', '#FF6B35', '#DA292A', '#00D9FF', '#9D4EDD'];
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '8px';
        sparkle.style.height = '8px';
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.boxShadow = `0 0 10px ${sparkle.style.background}`;
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 150 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// ============================================
// LOOT TICK INTERACTIONS
// ============================================
function initLootTick() {
    const tick = document.querySelector('.loot-tick');
    
    tick.addEventListener('click', function() {
        // Make the tick jump
        tick.style.animation = 'none';
        tick.offsetHeight; // Trigger reflow
        tick.style.animation = 'tickJump 0.5s ease';
        
        // Create heart
        const rect = tick.getBoundingClientRect();
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = rect.top + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        document.body.appendChild(heart);
        
        heart.animate([
            { transform: 'translate(-50%, 0) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50px) scale(1.2)', opacity: 1 },
            { transform: 'translate(-50%, -100px) scale(1)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
        
        // Reset animation
        setTimeout(() => {
            tick.style.animation = 'tickBounce 2s ease-in-out infinite';
        }, 500);
    });
}

// Add jump animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes tickJump {
        0% { transform: translateY(0) scale(1); }
        30% { transform: translateY(-30px) scale(1.1); }
        50% { transform: translateY(0) scale(0.9); }
        70% { transform: translateY(-15px) scale(1.05); }
        100% { transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(style);

// ============================================
// MOUSE TRAIL EFFECT
// ============================================
let mouseTrail = [];
const trailColors = ['#DA292A', '#FF6B35', '#FFD700'];

document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.9) { // Only create trail occasionally
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9998';
        dot.style.boxShadow = `0 0 6px ${dot.style.background}`;
        
        document.body.appendChild(dot);
        
        dot.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => dot.remove();
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Press 'C' for confetti burst at center
    if (e.key === 'c' || e.key === 'C') {
        if (window.confettiBurst) {
            window.confettiBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
        }
    }
    
    // Press 'Space' for celebrate
    if (e.key === ' ') {
        e.preventDefault();
        document.getElementById('celebrateBtn').click();
    }
});

// ============================================
// WELCOME MESSAGE
// ============================================
console.log('%c🎂 Happy Birthday! 🎂', 'font-size: 24px; color: #DA292A; font-weight: bold;');
console.log('%cWelcome to your Apex Legends themed birthday celebration!', 'font-size: 14px; color: #FF6B35;');
console.log('%cPress C for confetti, Space to celebrate!', 'font-size: 12px; color: #FFD700;');
