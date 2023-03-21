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
        playerDiv.style.display = "block";
        computerDiv.style.display = "block";
        drawDiv.style.display = "none";
        this.style.scale = "2";
        if (removePlayer.length > 0) {
            playerDiv.removeChild(removePlayer[0]);
            removePlayer.pop();
        }
        if (removeComputer.length > 0) {
            computerDiv.removeChild(removeComputer[0]);
            removeComputer.pop();
        }
        getComputerWeapon();
        if (parseInt(this.getAttribute("data-choice")) === computerRandomWeapon) {
            drawDiv.style.cssText = "\
                font-size: 1.6vw;\
                color: #383502;\
                background-color: #E0DFD2;\
                width: 40vw;\
                height: 37vh;\
                left: 10vw;\
                margin-top: 8.33vh;\
                margin-left: 20%;\
                position: absolute;\
                opacity: 0.5;\
                border-radius: 50px 50px 50% 50%;\
                z-index: 1;\
            ";
            drawPara.innerHTML = `It's A Draw, Computer chose: ${this.ariaLabel}`;
            drawPara.style.cssText = "\
                text-align: center;\
                margin-top: 16vh;\
            ";
            drawDiv.appendChild(drawPara);
            playerDiv.style.display = "none";
            computerDiv.style.display = "none";
        } else if (parseInt(this.getAttribute("data-choice")) - computerRandomWeapon === 1 || parseInt(this.getAttribute("data-choice")) - computerRandomWeapon === -1) {
            playerWeapon.style.display = "none";
            computerWeapon.style.display = "none";
            if (parseInt(this.getAttribute("data-choice")) > computerRandomWeapon) {
                computerDiv.appendChild(losingTeam[computerRandomWeapon]);
                playerDiv.appendChild(winningTeam[computerRandomWeapon + 1]);
                removeComputer.push(computerDiv.appendChild(losingTeam[computerRandomWeapon]));
                removePlayer.push(playerDiv.appendChild(winningTeam[computerRandomWeapon + 1]));
                incrementPlayerScore();
            } else {
                if (computerRandomWeapon === 2) {
                    console.log(winningTeam[computerRandomWeapon + 1]);
                    computerDiv.appendChild(winningTeam[computerRandomWeapon + 1]);
                    removeComputer.push(computerDiv.appendChild(winningTeam[computerRandomWeapon + 1]));
                } else {
                    computerDiv.appendChild(winningTeam[computerRandomWeapon]);
                    removeComputer.push(computerDiv.appendChild(winningTeam[computerRandomWeapon]));
                }
                playerDiv.appendChild(losingTeam[computerRandomWeapon - 1]);
                removePlayer.push(playerDiv.appendChild(losingTeam[computerRandomWeapon - 1]));
                incrementComputerScore();
            }
        } else {
            computerWeapon.style.display = "none";
            playerWeapon.style.display = "none";
            if (parseInt(this.getAttribute("data-choice")) < computerRandomWeapon) {
                computerDiv.appendChild(losingTeam[computerRandomWeapon + 1]);
                playerDiv.appendChild(winningTeam[computerRandomWeapon - 2]);
                removeComputer.push(computerDiv.appendChild(losingTeam[computerRandomWeapon + 1]));
                removePlayer.push(playerDiv.appendChild(winningTeam[computerRandomWeapon - 2]));
                incrementPlayerScore();
            } else {
                computerDiv.appendChild(winningTeam[computerRandomWeapon]);
                playerDiv.appendChild(losingTeam[computerRandomWeapon + 2]);
                removeComputer.push(computerDiv.appendChild(winningTeam[computerRandomWeapon]));
                removePlayer.push(playerDiv.appendChild(losingTeam[computerRandomWeapon + 2]));
                incrementComputerScore();
            }
        }
        for (let button of buttons) {
            button.setAttribute("disabled", "disabled");
        }

        /**
         * Creates a delay so that you can click a button once after 1500 ms and to recreate the animation of number-scale-increasing
         */
        setTimeout(() => {
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
 * Gets a random computer weapon [0, 1, 2]
 */
function getComputerWeapon() {
    computerRandomWeapon = Math.floor(Math.random() * 3);
}

/**
 * Gets the current player score from the DOM and increments it by 1 and then calls the playerWinningAnimation and the playerScoreAnimation functions
 */
function incrementPlayerScore() {
    let oldScore = parseInt(document.getElementById("player-score-span").textContent);
    document.getElementById("player-score-span").textContent = ++oldScore;
    playerWinnerAnimation();
    playerScoreAnimation();
}

/**
 * Gets the current computer score from the DOM and increments it by 1 and then calls the computerWinningAnimation and the computerScoreAnimation functions
 */
function incrementComputerScore() {
    let oldScore = parseInt(document.getElementById("computer-score-span").textContent);
    document.getElementById("computer-score-span").textContent = ++oldScore;
    computerWinnerAnimation();
    computerScoreAnimation();
}

/**
 * Creates an animation called "left-to-right" for the winning player
 */
function playerWinnerAnimation() {
    playerDiv.lastChild.style.cssText = "animation: left-to-right 1s ease;";
}

/**
 * Creates an animation called "right-to-left" for the winning computer
 */
function computerWinnerAnimation() {
    computerDiv.lastChild.style.cssText = "animation: right-to-left 1s ease;";
}

/**
 * Creates an animation called "number-scale-increasing" for the player score increment
 */
function playerScoreAnimation() {
    playerScore.style.cssText = "animation: number-scale-increasing 1s ease";
}

/**
 * Creates an animation called "number-scale-increasing" for the computer score increment
 */
function computerScoreAnimation() {
    computerScore.style.cssText = "animation: number-scale-increasing 1s ease";
}