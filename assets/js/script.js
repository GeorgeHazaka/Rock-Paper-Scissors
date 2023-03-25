const buttons = document.getElementsByTagName("button");
const playerDiv = document.getElementById("player-weapon-div");
const computerDiv = document.getElementById("computer-weapon-div");
const drawDiv = document.getElementById("draw-message");
const drawPara = document.createElement("p");
const playerWeapon = document.getElementById("player-weapon-image");
const computerWeapon = document.getElementById("computer-weapon-image");
const playerScore = document.getElementById("player-score-span");
const computerScore = document.getElementById("computer-score-span");

let computerRandomWeapon;

const rockWin = document.createElement("img");
const rockLose = document.createElement("img");
const paperWin = document.createElement("img");
const paperLose = document.createElement("img");
const scissorsWinRight = document.createElement("img");
const scissorsWinLeft = document.createElement("img");
const scissorsLoseRight = document.createElement("img");
const scissorsLoseLeft = document.createElement("img");

const weaponsArray = [rockWin, rockLose, paperWin, paperLose, scissorsWinRight, scissorsWinLeft, scissorsLoseRight, scissorsLoseLeft];
const imagesSourcesArray = [
    "assets/images/Win-Rock.png",
    "assets/images/Lose-Rock.png",
    "assets/images/Win-Paper.png",
    "assets/images/Lose-Paper.png",
    "assets/images/Win-Scissors-Right.png",
    "assets/images/Win-Scissors-Left.png",
    "assets/images/Lose-Scissors-Right.png",
    "assets/images/Lose-Scissors-left.png"
];
const removePlayer = [];
const removeComputer = [];
const winningTeam = [];
const losingTeam = [];

for (let i = 0; i < weaponsArray.length; i++) {
    weaponsArray[i].setAttribute("src", `${imagesSourcesArray[i]}`);
}

winningTeam.push(rockWin, paperWin, scissorsWinRight, scissorsWinLeft);
losingTeam.push(rockLose, paperLose, scissorsLoseRight, scissorsLoseLeft);

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
        if (parseInt(this.getAttribute("data-choice")) === computerRandomWeapon) {
            drawDiv.classList.add("draw-div-styles");
            drawPara.innerHTML = `It's A Draw, Computer chose: ${this.ariaLabel}`;
            drawDiv.appendChild(drawPara);
            playerDiv.style.display = "none";
            computerDiv.style.display = "none";
            drawAnimation();
        } else if (parseInt(this.getAttribute("data-choice")) - computerRandomWeapon === 1 || parseInt(this.getAttribute("data-choice")) - computerRandomWeapon === -1) {
            playerWeapon.style.display = "none";
            computerWeapon.style.display = "none";
            if (parseInt(this.getAttribute("data-choice")) > computerRandomWeapon) {
                playerChild(winningTeam, computerRandomWeapon + 1);
                computerChild(losingTeam, computerRandomWeapon);
                incrementPlayerScore();
            } else {
                if (computerRandomWeapon === 2) {
                    computerChild(winningTeam, computerRandomWeapon + 1);
                } else {
                    computerChild(winningTeam, computerRandomWeapon);
                }
                playerChild(losingTeam, computerRandomWeapon - 1);
                incrementComputerScore();
            }
        } else {
            computerWeapon.style.display = "none";
            playerWeapon.style.display = "none";
            if (parseInt(this.getAttribute("data-choice")) < computerRandomWeapon) {
                playerChild(winningTeam, computerRandomWeapon - 2);
                computerChild(losingTeam, computerRandomWeapon + 1);
                incrementPlayerScore();
            } else {
                playerChild(losingTeam, computerRandomWeapon + 2);
                computerChild(winningTeam, computerRandomWeapon);
                incrementComputerScore();
            }
        }
        for (let button of buttons) {
            button.setAttribute("disabled", "disabled");
        }

        /**
         *  Creates a delay so that you can click a button once after 1500 ms and to recreate the animation of number-scale-increasing
         */
        setTimeout(() => {
            drawDiv.style.removeProperty("animation");
            playerScore.style.removeProperty("animation");
            computerScore.style.removeProperty("animation");
            for (let button of buttons) {
                button.removeAttribute("disabled");
                this.style.cssText = "scale: 1";
            }
        }, 1500)
    })
}

/**
 *  Gets a random computer weapon [0, 1, 2]
 */
function getComputerWeapon() {
    computerRandomWeapon = Math.floor(Math.random() * 3);
}

/**
 *  Gets the current player score from the DOM and increments it by 1 and then calls the playerWinningAnimation and the playerScoreAnimation functions
 */
function incrementPlayerScore() {
    let oldScore = parseInt(document.getElementById("player-score-span").textContent);
    document.getElementById("player-score-span").textContent = ++oldScore;
    playerWinnerAnimation();
    playerScoreAnimation();
}

/**
 *  Gets the current computer score from the DOM and increments it by 1 and then calls the computerWinningAnimation and the computerScoreAnimation functions
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

/**
 *  Appends the player's chosen weapon (image) as a child to the playerDiv and then add that child to the removePlayer array
 */
function playerChild(team, player) {
    playerDiv.appendChild(team[player]);
    removePlayer.push(playerDiv.appendChild(team[player]));
}

/**
 *  Appends the computer's chosen weapon (image) as a child to the computerDiv and then add that child to the removeComputer array
 */
function computerChild(team, computer) {
    computerDiv.appendChild(team[computer]);
    removeComputer.push(computerDiv.appendChild(team[computer]));
}