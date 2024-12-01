//declare variables
let gameList = [];
let userList = [];

let Col = ["red", "blue", "green", "yellow"];
let h3 = document.querySelector("h3");
let started = false;
let level = 0;

//starting the game
document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        setTimeout(levelUp, 700);
    }
})

//level up
function levelUp() {
    level++;
    userList = [];
    h3.innerHTML = `Level ${level}`;

    let rndIndx = Math.floor(Math.random() * 4);
    let randBtn = document.querySelector(`.${Col[rndIndx]}`)

    gameList.push(Col[rndIndx]);

    gameList.forEach((col, idx) => {
        setTimeout(() => {
            gameFlash(document.querySelector(`.${col}`))
        }, 500 * idx);
    });
}

//gameFlash
function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

//userFlash
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

//checkAns
function checkAns(idx) {
    if (gameList[idx] === userList[idx]) {
        if (gameList.length == userList.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerText = `Game over! Your score is ${level}\nPress any key to play again!`;
        reset();
    }
}

//buttonPress 
function btnPress() {
    let btn = this;
    let userCol = btn.getAttribute("id");
    //check for correctness and flash
    userList.push(userCol);
    userFlash(btn);

    checkAns(userList.length - 1);
}

//button function
let btns = document.querySelectorAll(".box");
for (btn of btns) {
    btn.addEventListener("click", btnPress);
}

//reset
function reset() {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => { document.querySelector("body").style.backgroundColor = "black" }, 150);
    started = false;
    level = 0;
    gameList = [];
    userList = [];
}
