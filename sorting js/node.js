// Display header information
console.log("TECHNOLOGICAL INSTITUTE OF THE PHILIPPINES");
console.log("Course: BS Information Technology");
console.log("Student Name: Danyka Beatriz B. Narciso");
console.log("Program: BS Information Technology");
console.log("Section: IT32S2");
console.log("Date: February 2, 2026");
console.log("Assessment Title: Sorting Numbers in Ascending Order Using JavaScript Functions");
console.log("--------------------------------------------------\n");

// Function to arrange numbers in ascending order
function sortAscending(numbers) {
    let n = numbers.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
        }
    }
}

// Get user input
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter numbers (comma separated) or press Enter for default (given): ', (input) => {
    let givenNumbers;
    
    if (input.trim() === '') {
        givenNumbers = [13, 14, 15, 16, 10, 17, 18, 11, 19, 12];
    } else {
        givenNumbers = input.split(',').map(num => parseInt(num.trim()));
    }
    
    console.log("\nThe given numbers:");
    console.log(givenNumbers.join(" "));
    console.log();
    
    sortAscending(givenNumbers);
    
    console.log("After swapping, the ascending order is:");
    console.log(givenNumbers.join(" "));
    
    rl.close();
});
