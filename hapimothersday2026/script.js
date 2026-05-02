// Happy Mother's Day 2026 - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Canvas Hearts Animation
    initHeartsCanvas();
    
    // Envelope Interaction
    initEnvelope();
    
    // Love Button Interaction
    initLoveButton();
    
    // Mascot Interaction
    initMascot();
    
    // Stats Animation
    animateStats();
});

// Canvas Hearts Animation
function initHeartsCanvas() {
    const canvas = document.getElementById('hearts');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Heart particle class
    class Heart {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = Math.random() * 15 + 8;
            this.speed = Math.random() * 2 + 1;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.05 + 0.02;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.color = `hsla(${Math.random() * 30 + 330}, 100%, ${Math.random() * 20 + 70}%, ${this.opacity})`;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }
        
        update() {
            this.y -= this.speed;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 0.5;
            this.rotation += this.rotationSpeed;
            
            // Reset when off screen
            if (this.y < -30) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            // Draw heart shape
            const s = this.size;
            ctx.moveTo(0, -s/2);
            ctx.bezierCurveTo(s/2, -s, s, -s/3, 0, s/2);
            ctx.bezierCurveTo(-s, -s/3, -s/2, -s, 0, -s/2);
            
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create hearts
    const hearts = [];
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = new Heart();
        heart.y = Math.random() * canvas.height;
        hearts.push(heart);
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Envelope Interaction
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letterContainer = document.getElementById('letterContainer');
    
    if (envelope && letterContainer) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
            letterContainer.classList.toggle('show');
            
            // Add heart burst effect
            createHeartBurst(envelope);
        });
    }
}

// Love Button Interaction
function initLoveButton() {
    const btn = document.getElementById('celebrateBtn');
    
    if (btn) {
        btn.addEventListener('click', (e) => {
            // Add clicked class for animation
            btn.classList.add('clicked');
            
            // Create multiple heart bursts
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createHeartBurst(btn, true);
                }, i * 100);
            }
            
            // Reset after animation
            setTimeout(() => {
                btn.classList.remove('clicked');
            }, 1000);
            
            // Update button text temporarily
            const originalText = btn.querySelector('.btn-text').textContent;
            btn.querySelector('.btn-text').textContent = 'I love you, Mom! 💕';
            
            setTimeout(() => {
                btn.querySelector('.btn-text').textContent = originalText;
            }, 2000);
        });
    }
}

// Mascot Interaction
function initMascot() {
    const mascot = document.getElementById('mascot');
    
    if (mascot) {
        mascot.addEventListener('click', () => {
            // Make mascot do a happy jump
            mascot.style.animation = 'none';
            mascot.offsetHeight; // Trigger reflow
            mascot.style.animation = 'jump 0.5s ease';
            
            setTimeout(() => {
                mascot.style.animation = 'bounce 2s ease-in-out infinite';
            }, 500);
            
            // Create heart burst
            createHeartBurst(mascot);
        });
    }
}

// Stats Animation
function animateStats() {
    const stats = [
        { element: document.getElementById('love'), target: '∞', duration: 1000 },
        { element: document.getElementById('thanks'), target: '100%', duration: 1500 },
        { element: document.getElementById('blessed'), target: 'ALWAYS', duration: 2000 }
    ];
    
    stats.forEach(stat => {
        if (stat.element) {
            // Simple fade in animation
            stat.element.style.opacity = '0';
            stat.element.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                stat.element.style.transition = 'all 0.5s ease';
                stat.element.style.opacity = '1';
                stat.element.style.transform = 'translateY(0)';
            }, stat.duration);
        }
    });
}

// Heart Burst Effect
function createHeartBurst(element, randomPosition = false) {
    const hearts = ['💕', '💗', '💖', '💘', '❤️'];
    const count = randomPosition ? 8 : 5;
    
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-burst');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random position around the element
        const x = randomPosition 
            ? rect.left + Math.random() * rect.width
            : rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
        const y = randomPosition
            ? rect.top + Math.random() * rect.height
            : rect.top + rect.height / 2;
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Add jump animation for mascot
const style = document.createElement('style');
style.textContent = `
    @keyframes jump {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-30px) scale(1.1); }
        100% { transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(style);
