function changeColor() {
    const colors = ['#EDE8DC', '#E7CCCC', '#5C7285', '#E2E0C8', '#F4D793', 'FFE2E2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector('.resume').style.backgroundColor = randomColor;
}