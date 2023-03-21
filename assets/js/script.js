const buttons = document.getElementsByTagName("button");
const playerDiv = document.getElementById("player-weapon-div");
const computerDiv = document.getElementById("computer-weapon-div");
const drawDiv = document.getElementById("draw-message");
const drawPara = document.createElement("p");
let computerRandomWeapon;

for (let button of buttons) {
    button.addEventListener("click", function () {
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
        }
    })
}

/**
 * Gets a random computer weapon [0, 1, 2]
 */
function getComputerWeapon() {
    computerRandomWeapon = Math.floor(Math.random() * 3);
}