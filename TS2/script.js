document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".day-btn");
    const container = document.getElementById("animation-container");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const box = document.createElement("div");
            box.classList.add("animation-box");

            // Assign random color based on button clicked
            box.style.backgroundColor = getComputedStyle(button).backgroundColor;

            // Set a slight random offset for overlap effect
            box.style.left = `${Math.random() * 50}px`;
            box.style.top = `${Math.random() * 50}px`;

            container.appendChild(box);
        });
    });
});
