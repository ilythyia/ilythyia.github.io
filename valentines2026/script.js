// Simple animation for falling hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animation = 'fall 3s linear';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}
setInterval(createHeart, 500);

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    // Create hearts
    const hearts = ['❤️', '💖', '💕', '💗', '💓'];
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        setRandomPosition(div);
        container.appendChild(div);
    }

    // Create bears
    const bears = ['🐻', '🐼', '🧸'];
    for (let i = 0; i < 3; i++) {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bears[Math.floor(Math.random() * bears.length)];
        setRandomPosition(div);
        container.appendChild(div);
    }
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Surprise function for Minecraft page
function surprise() {
    alert('Surprise! 🎉 You found a secret! Redirecting to CurseForge...');
    window.location.href = 'https://www.curseforge.com/minecraft';
}

// Initialize floating elements on page load
window.addEventListener('DOMContentLoaded', createFloatingElements);
