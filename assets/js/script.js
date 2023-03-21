const buttons = document.getElementsByTagName("button");
const playerDiv = document.getElementById("player-weapon-div");
const computerDiv = document.getElementById("computer-weapon-div");
const drawDiv = document.getElementById("draw-message");
const drawPara = document.createElement("p");
const playerWeapon = document.getElementById("player-weapon-image");
const computerWeapon = document.getElementById("computer-weapon-image");

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
    "assets/images/Win-Paper.png", "assets/images/Lose-Paper.png",
    "assets/images/Win-Scissors-Right.png",
    "assets/images/Win-Scissors-Left.png",
    "assets/images/Lose-Scissors-Right.png",
    "assets/images/Lose-Scissors-Left.png"
];
const removePlayer = [];
const removeComputer = [];
const winningTeam = [];
const losingTeam = [];

for (let i = 0; i < weaponsArray.length; i++) {
    weaponsArray[i].setAttribute("src", `${imagesSourcesArray[i]}`);
}

winningTeam.push(rockWin, paperWin,scissorsWinRight, scissorsWinLeft);
losingTeam.push(rockLose, paperLose, scissorsLoseRight, scissorsLoseLeft);

for (let button of buttons) {
    button.addEventListener("click", function () {
        playerDiv.style.display = "block";
        computerDiv.style.display = "block";
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
            } else {
                if (computerRandomWeapon === 2) {
                    computerDiv.appendChild(winningTeam[computerRandomWeapon + 1]);
                    removeComputer.push(computerDiv.appendChild(winningTeam[computerRandomWeapon + 1]));
                } else {
                    computerDiv.appendChild(winningTeam[computerRandomWeapon]);
                    removeComputer.push(computerDiv.appendChild(winningTeam[computerRandomWeapon]));
                }
                playerDiv.appendChild(losingTeam[computerRandomWeapon - 1]);
                removePlayer.push(playerDiv.appendChild(losingTeam[computerRandomWeapon - 1]));
            }
        }
    })
}

/**
 * Gets a random computer weapon [0, 1, 2]
 */
function getComputerWeapon() {
    computerRandomWeapon = Math.floor(Math.random() * 3);
}