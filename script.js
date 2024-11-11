let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");  // Use class selector
let newBtn = document.querySelector(".new-btn");      // Use class selector
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Debugging: Check if the buttons are correctly selected
console.log("Reset Button: ", resetBtn);
console.log("New Button: ", newBtn);

// Reset the game
const resetGame = () => {
    console.log("Resetting the game...");  // Debugging reset function
    turn0 = true;
    enableBoxes();  // Clear the board and enable all boxes
    msgContainer.classList.add("hide");  // Hide the winner message
    boxes.forEach((box) => {
        box.disabled = false;  // Enable all boxes
        box.innerText = '';  // Clear the text inside each box
    });
};

// Function to show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, The winner is ${winner}`;
    msgContainer.classList.remove("hide");  // Show the winner message
    disableBoxes();  // Disable all boxes after a winner is found
};

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear their content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);  // Pass the winner value to showWinner()
                return;  // Exit after a winner is found
            }
        }
    }
};

// Attach click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {  // Check if box is already clicked
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;  // Disable the box after it’s clicked
            checkWinner();  // Check for winner after each move
        }
    });
});

// Add event listeners for reset and new game buttons
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
