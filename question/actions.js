document.addEventListener("DOMContentLoaded", function() {
    // Select only the "No" button
    const btnContainer = document.querySelector('.question-box > div');
    const noBtn = btnContainer.querySelector('button:last-child');
    const gifImg = document.querySelector('.question-box img');
    const questionText = document.querySelector('.question-box').childNodes[2]; // The text node

    // Preload GIFs for faster switching
    const gifUrls = [
        "https://media2.giphy.com/media/Y1X9h2TyJRRHjet4js/200.webp",
        "https://media1.giphy.com/media/LGGQORA0ciM4rQoTBO/200.webp",
        "https://media3.giphy.com/media/sOC0rAYTxbaEvgoYYb/200.webp",
        "https://media1.giphy.com/media/AX3lrvltwWW3LaXKjc/200.webp",
        "https://media0.giphy.com/media/4oXb78U2yYkf3WW2X3/200.webp"
    ];
    gifUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    let hoverCount = 0;

    noBtn.addEventListener('mouseenter', function(e) {
        // Random position anywhere in the viewport
        const btnRect = noBtn.getBoundingClientRect();
        const maxLeft = window.innerWidth - btnRect.width;
        const maxTop = window.innerHeight - btnRect.height;

        const left = Math.floor(Math.random() * maxLeft);
        const top = Math.floor(Math.random() * maxTop);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${left}px`;
        noBtn.style.top = `${top}px`;
        noBtn.style.zIndex = 1000;

        hoverCount++;
        if (hoverCount === 5) {
            gifImg.src = gifUrls[0];
            questionText.textContent = "Are you sure you don't want to play?";
        }
        if (hoverCount === 10) {
            gifImg.src = gifUrls[1];
            questionText.textContent = "Are you really sure?";

        }
        if (hoverCount === 15) {
            gifImg.src = gifUrls[2];
            questionText.textContent = "Its really a no???";
        }
        if (hoverCount === 20) {
            gifImg.src = gifUrls[3];
            questionText.textContent = "REALLY???";
        }
        if (hoverCount === 25) {
            gifImg.src = gifUrls[4];
            questionText.textContent = "You got no choice now!";
            noBtn.style.display = "none"; // Hide the No button
        }
    });

    noBtn.addEventListener('mouseleave', function() {
        // Optional: reset position if you want the button to return
        // noBtn.style.position = '';
        // noBtn.style.left = '';
        // noBtn.style.top = '';
        // noBtn.style.zIndex = '';
    });
});