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