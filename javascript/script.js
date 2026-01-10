// Array of possible fortunes
const fortunes = [
    "Yes, definitely!",
    "No, not at all.",
    "Ask again later.",
    "It is certain.",
    "Very doubtful.",
    "Signs point to yes.",
    "My sources say no.",
    "Cannot predict now.",
    "Outlook good.",
    "Don't count on it."
];

// Function to get a random fortune
function getRandomFortune() {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}


// Function to handle the shake event
function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const answerDiv = document.getElementById('answer');
    const ball = document.getElementById('eight-ball');
    const questionInput = document.getElementById('question');
    
    if (!question) {
        answerDiv.textContent = "Ask first!";
        return;
    }
    
    // Prevent multiple shakes at once
    if (ball.classList.contains('shake')) {
        return;
    }
    
    ball.classList.add('shake');
    answerDiv.textContent = "...";
    lastQuestion = question;
    
    // Simulate thinking time
    setTimeout(() => {
        answerDiv.textContent = getRandomFortune();
        ball.classList.remove('shake');
        // Clear the input for the next question
        questionInput.value = '';
        questionInput.focus();
    }, 800);
}

// Event listener for clicking the ball
document.getElementById('eight-ball').addEventListener('click', shakeBall);

// --- Theme switching and persistence ---
let lastQuestion = '';

const themes = {
    pink: {
        '--bg1': '#f5d5e8',
        '--bg2': '#e8d5f5',
        '--bg3': '#f5d9ec',
        '--bg4': '#e5d9f5',
        '--accent': '#ff99d8',
        '--accent-soft': 'rgba(255,150,210,0.6)',
        '--container-bg': 'rgba(255,240,250,0.85)',
        '--container-border': 'rgba(255,180,230,0.4)',
        '--ball1': '#ffc0e0',
        '--ball2': '#ffb0d9',
        '--ball3': '#ffa0d0',
        '--ball-shadow': 'rgba(255,150,210,0.3)',
        '--input-border': 'rgba(255,180,230,0.3)',
        '--input-text': '#8a5a7f',
        '--text-color': '#6b3a5a',
        '--text-shadow': 'rgba(255, 150, 210, 0.8), rgba(255, 100, 190, 0.7), rgba(255, 80, 170, 0.6)'
    },
    red: {
        '--bg1': '#f7d6d6',
        '--bg2': '#f7d0d0',
        '--bg3': '#f9dcdc',
        '--bg4': '#f5d2d2',
        '--accent': '#ff8a9e',
        '--accent-soft': 'rgba(255,120,140,0.5)',
        '--container-bg': 'rgba(255,245,246,0.9)',
        '--container-border': 'rgba(255,200,210,0.4)',
        '--ball1': '#ffd6d6',
        '--ball2': '#ffc0c0',
        '--ball3': '#ffabab',
        '--ball-shadow': 'rgba(255,110,120,0.25)',
        '--input-border': 'rgba(255,200,210,0.3)',
        '--input-text': '#7a3a3a',
        '--text-color': '#6b3a3a',
        '--text-shadow': 'rgba(255, 100, 110, 0.8), rgba(255, 70, 90, 0.7), rgba(220, 50, 80, 0.6)'
    },
    green: {
        '--bg1': '#e6f7ea',
        '--bg2': '#e8f6e9',
        '--bg3': '#eaf7ec',
        '--bg4': '#e2f5e6',
        '--accent': '#8fe7b8',
        '--accent-soft': 'rgba(140,230,180,0.45)',
        '--container-bg': 'rgba(245,255,250,0.9)',
        '--container-border': 'rgba(180,235,200,0.35)',
        '--ball1': '#d9fbe0',
        '--ball2': '#bff5c8',
        '--ball3': '#a6f0b0',
        '--ball-shadow': 'rgba(120,220,150,0.25)',
        '--input-border': 'rgba(180,235,200,0.3)',
        '--input-text': '#2f5a3a',
        '--text-color': '#2f5a3a',
        '--text-shadow': 'rgba(100, 200, 130, 0.8), rgba(80, 180, 110, 0.7), rgba(50, 160, 90, 0.6)'
    },
    blue: {
        '--bg1': '#e6f0ff',
        '--bg2': '#e7f1ff',
        '--bg3': '#eaf4ff',
        '--bg4': '#e0ecff',
        '--accent': '#90c8ff',
        '--accent-soft': 'rgba(120,190,255,0.45)',
        '--container-bg': 'rgba(245,250,255,0.9)',
        '--container-border': 'rgba(180,210,255,0.35)',
        '--ball1': '#d6eeff',
        '--ball2': '#c0e6ff',
        '--ball3': '#a8ddff',
        '--ball-shadow': 'rgba(120,170,255,0.25)',
        '--input-border': 'rgba(180,210,255,0.3)',
        '--input-text': '#27486b',
        '--text-color': '#27486b',
        '--text-shadow': 'rgba(100, 160, 255, 0.8), rgba(80, 140, 255, 0.7), rgba(50, 120, 220, 0.6)'
    },
    yellow: {
        '--bg1': '#fff7e6',
        '--bg2': '#fff8e0',
        '--bg3': '#fff9e8',
        '--bg4': '#fff6dc',
        '--accent': '#ffd88a',
        '--accent-soft': 'rgba(255,200,120,0.45)',
        '--container-bg': 'rgba(255,255,245,0.9)',
        '--container-border': 'rgba(255,230,180,0.35)',
        '--ball1': '#fff1c9',
        '--ball2': '#ffecb0',
        '--ball3': '#ffe69a',
        '--ball-shadow': 'rgba(255,205,100,0.25)',
        '--input-border': 'rgba(255,230,180,0.3)',
        '--input-text': '#6b5a2f',
        '--text-color': '#6b5a2f',
        '--text-shadow': 'rgba(255, 190, 80, 0.8), rgba(255, 160, 50, 0.7), rgba(230, 140, 20, 0.6)'
    },
    orange: {
        '--bg1': '#fff0e6',
        '--bg2': '#fff1e8',
        '--bg3': '#fff3ea',
        '--bg4': '#ffeee0',
        '--accent': '#ffc38a',
        '--accent-soft': 'rgba(255,170,110,0.45)',
        '--container-bg': 'rgba(255,250,245,0.9)',
        '--container-border': 'rgba(255,210,180,0.35)',
        '--ball1': '#ffe0c9',
        '--ball2': '#ffd3ab',
        '--ball3': '#ffc999',
        '--ball-shadow': 'rgba(255,170,120,0.25)',
        '--input-border': 'rgba(255,210,180,0.3)',
        '--input-text': '#6b3f2a',
        '--text-color': '#6b3f2a',
        '--text-shadow': 'rgba(255, 150, 100, 0.8), rgba(255, 120, 70, 0.7), rgba(220, 100, 50, 0.6)'
    }
};

function applyTheme(name) {
    const root = document.documentElement;
    const theme = themes[name] || themes.pink;
    Object.keys(theme).forEach(varName => {
        root.style.setProperty(varName, theme[varName]);
    });
}

const select = document.getElementById('theme-select');
if (select) {
    // Apply saved theme or default
    const saved = localStorage.getItem('m8b-theme') || 'pink';
    applyTheme(saved);
    select.value = saved;

    select.addEventListener('change', (e) => {
        const val = e.target.value;
        applyTheme(val);
        localStorage.setItem('m8b-theme', val);
    });
}

// --- Character counter for feedback ---
const feedbackText = document.getElementById('feedback-text');
const charCount = document.getElementById('char-count');

if (feedbackText) {
    feedbackText.addEventListener('input', (e) => {
        charCount.textContent = `${e.target.value.length}/500`;
    });
}

// --- Form submission message ---
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        const btn = feedbackForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sent! ✨';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    });
}