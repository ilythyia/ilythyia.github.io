let activeBox = null;

function animateBoxes(day) {
    const newBox = document.querySelector(`.box${getDayNumber(day)}`);

    if (activeBox === newBox) return;

    if (activeBox) {
        activeBox.style.top = '-50%';
    }

    newBox.style.top = '30%'; // Move new box down into view
    activeBox = newBox; // Update active box
}

function getDayNumber(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.indexOf(day) + 1;
}

