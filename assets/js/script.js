// These variables are assigned to html elements
const buttons = document.getElementsByTagName("button");
const playerDiv = document.getElementById("player-weapon-div");
const computerDiv = document.getElementById("computer-weapon-div");
const drawDiv = document.getElementById("draw-message");
const playerWeapon = document.getElementById("player-weapon-image");
const computerWeapon = document.getElementById("computer-weapon-image");
const playerScore = document.getElementById("player-score-span");
const computerScore = document.getElementById("computer-score-span");

let computerRandomWeapon;

const drawPara = document.createElement("p");

// These variables are the weapons(images) which will take player's weapon and computer's weapon place based on winning/losing condition
const rockWin = document.createElement("img");
const rockLose = document.createElement("img");
const paperWin = document.createElement("img");
const paperLose = document.createElement("img");
const scissorsWinRight = document.createElement("img");
const scissorsWinLeft = document.createElement("img");
const scissorsLoseRight = document.createElement("img");
const scissorsLoseLeft = document.createElement("img");

// weaponsArray will be used to select one of its elements for the player's weapon and one for the computer's weapon
const weaponsArray = [rockWin, rockLose, paperWin, paperLose, scissorsWinRight, scissorsWinLeft, scissorsLoseRight, scissorsLoseLeft];
// A for loop (At line 53) will be used to attach each of imagesSourcesArray's elements to the weaponsArray's elements
const imagesSourcesArray = [
    "assets/images/Win-Rock.png",
    "assets/images/Lose-Rock.png",
    "assets/images/Win-Paper.png",
    "assets/images/Lose-Paper.png",
    "assets/images/Win-Scissors-Right.png",
    "assets/images/Win-Scissors-Left.png",
    "assets/images/Lose-Scissors-Right.png",
    "assets/images/Lose-Scissors-Left.png"
];
/* 
    Push the player's weapon to this removePlayer array so that we remove the pushed weapon from playerDiv's children
    And then we will empty this array after removing the pushed weapon from the playerDiv's children
    This will make the playerDiv to only have a maximum of one child (one weapon/one image) after each button click
*/
const removePlayer = [];
/* 
    Push the computer's weapon to this removeComputer array so that we remove the pushed weapon from computerDiv's children
    And then we will empty this array after removing the pushed weapon from the computerDiv's children
    This will make the computerDiv to only have a maximum of one child (one weapon/one image) after each button click
*/
const removeComputer = [];
// winningWeapons array will only include the winning options(winning images) of the weapons
const winningWeapons = [];
// losingWeapons array will only include the losing options(losing images) of the weapons
const losingWeapons = [];

for (let i = 0; i < weaponsArray.length; i++) {
    weaponsArray[i].setAttribute("src", `${imagesSourcesArray[i]}`);
}

winningWeapons.push(rockWin, paperWin, scissorsWinRight, scissorsWinLeft);
losingWeapons.push(rockLose, paperLose, scissorsLoseRight, scissorsLoseLeft);

for (let button of buttons) {
    button.addEventListener("click", function () {
        if (removePlayer.length > 0) {
            playerDiv.removeChild(removePlayer[0]);
            removePlayer.pop();
        }
        if (removeComputer.length > 0) {
            computerDiv.removeChild(removeComputer[0]);
            removeComputer.pop();
        }
        this.style.scale = "1.8";
        playerDiv.style.display = "block";
        computerDiv.style.display = "block";
        drawDiv.classList.remove("draw-div-styles");
        drawPara.innerHTML = "";
        getComputerWeapon();
        // This if statement guarantees that it is a draw only when both have chosen the same number
        if (parseInt(this.getAttribute("data-choice")) === computerRandomWeapon) {
            drawDiv.classList.add("draw-div-styles");
            drawPara.innerHTML = `It's A Draw, Computer chose: ${this.ariaLabel}`;
            drawDiv.appendChild(drawPara);
            playerDiv.style.display = "none";
            computerDiv.style.display = "none";
            drawAnimation();
        // This else if statement guarantees that the one with higher number wins
        } else if (parseInt(this.getAttribute("data-choice")) - computerRandomWeapon === 1 || parseInt(this.getAttribute("data-choice")) - computerRandomWeapon === -1) {
            playerWeapon.style.display = "none";
            computerWeapon.style.display = "none";
            if (parseInt(this.getAttribute("data-choice")) > computerRandomWeapon) {
                playerChild(winningWeapons, computerRandomWeapon + 1);
                computerChild(losingWeapons, computerRandomWeapon);
                incrementPlayerScore();
            } else {
                // This if statement is to make sure the computer's weapon is the winning scissors that is heading LEFT
                if (computerRandomWeapon === 2) {
                    computerChild(winningWeapons, computerRandomWeapon + 1);
                } else {
                    computerChild(winningWeapons, computerRandomWeapon);
                }
                playerChild(losingWeapons, computerRandomWeapon - 1);
                incrementComputerScore();
            }
        /* 
            This else statement is when the substraction of the chosen numbers is not 1 nor -1, that means the substraction is either 2 or -2
            In this case one of them must have chosen rock and the other scissors
        */
        } else {
            computerWeapon.style.display = "none";
            playerWeapon.style.display = "none";
            // This if statement guarantees that the player is number 0, which means the computer is number 2
            if (parseInt(this.getAttribute("data-choice")) < computerRandomWeapon) {
                playerChild(winningWeapons, computerRandomWeapon - 2);
                // We added 1 to the computerRandomWeapon in this computerChild() function to make sure to choose the losing scissors that is heading LEFT
                computerChild(losingWeapons, computerRandomWeapon + 1);
                incrementPlayerScore();
            // This else statement guarantees that the player is number 2, which means the computer is number 0
            } else {
                playerChild(losingWeapons, computerRandomWeapon + 2);
                computerChild(winningWeapons, computerRandomWeapon);
                incrementComputerScore();
            }
        }
        for (let button of buttons) {
            button.setAttribute("disabled", "disabled");
        }

        /**
         *  Creates a delay so that you can click a button again only after 1500 ms has passed
         *  Then removes all animation properties
         *  And the size of the clicked button is back to "scale: 1"
         */
        setTimeout(() => {
            drawDiv.style.removeProperty("animation");
            playerScore.style.removeProperty("animation");
            computerScore.style.removeProperty("animation");
            for (let button of buttons) {
                button.removeAttribute("disabled");
                this.style.cssText = "scale: 1";
            }
        }, 1500);
    });
}

/**
 *  Gets a random computer weapon [0, 1, 2]
 */
function getComputerWeapon() {
    computerRandomWeapon = Math.floor(Math.random() * 3);
}

/**
 *  Appends the player's chosen weapon(image) as a child to the playerDiv
 *  Then adds that child to the removePlayer array
 */
function playerChild(team, player) {
    playerDiv.appendChild(team[player]);
    removePlayer.push(playerDiv.appendChild(team[player]));
}

/**
 *  Appends the computer's chosen weapon(image) as a child to the computerDiv
 *  Then adds that child to the removeComputer array
 */
function computerChild(team, computer) {
    computerDiv.appendChild(team[computer]);
    removeComputer.push(computerDiv.appendChild(team[computer]));
}

/**
 *  Gets the current player score from the DOM and increments it by 1
 *  Then calls playerWinnerAnimation() function
 *  Then calls playerScoreAnimation() function
 */
function incrementPlayerScore() {
    let oldScore = parseInt(document.getElementById("player-score-span").textContent);
    document.getElementById("player-score-span").textContent = ++oldScore;
    playerWinnerAnimation();
    playerScoreAnimation();
}

/**
 *  Gets the current computer score from the DOM and increments it by 1
 *  Then calls computerWinnerAnimation() function
 *  Then calls computerScoreAnimation() function
 */
function incrementComputerScore() {
    let oldScore = parseInt(document.getElementById("computer-score-span").textContent);
    document.getElementById("computer-score-span").textContent = ++oldScore;
    computerWinnerAnimation();
    computerScoreAnimation();
}

/**
 *  Creates an animation called "left-to-right" for the winning player
 */
function playerWinnerAnimation() {
    playerDiv.lastChild.style.cssText = "animation: left-to-right 1s ease;";
}

/**
 *  Creates an animation called "right-to-left" for the winning computer
 */
function computerWinnerAnimation() {
    computerDiv.lastChild.style.animation = "right-to-left 1s ease";
}

/**
 *  Creates an animation called "draw-rotation-animation" for the draw message div
 */
function drawAnimation() {
    drawDiv.style.animation = "draw-rotation-animation .7s ease-out";
}

/**
 *  Creates an animation called "number-scale-increasing" for the player score increment
 */
function playerScoreAnimation() {
    playerScore.style.cssText = "animation: number-scale-increasing 1s ease";
}

/**
 *  Creates an animation called "number-scale-increasing" for the computer score increment
 */
function computerScoreAnimation() {
    computerScore.style.cssText = "animation: number-scale-increasing 1s ease";
}