let display = document.getElementById("display");

function appendCharacter(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

const clickSound = new Audio("click.mp3");
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});
