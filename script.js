const selectbox = document.querySelector(".select-box");
const selectxbtn = selectbox.querySelector(".PlayerX");
const selectobtn = selectbox.querySelector(".PlayerO");
const playboard = document.querySelector(".play-board");
let allbox = document.querySelectorAll("section span");
let players = document.querySelector(".players");
let resultbox = document.querySelector(".result-box");
let wontext = resultbox.querySelector(".won-text");
let replaybutton = resultbox.querySelector(".btn");
window.onload = () => { // once window loaded

    for (let i = 0; i < allbox.length; i++) {
        // console.log("Clicked");

        allbox[i].setAttribute("onclick", "clickedbox(this)");
    }

    selectxbtn.onclick = () => {
        selectbox.classList.add("hide");
        playboard.classList.add("show");
    }
    selectobtn.onclick = () => {
        selectbox.classList.add("hide");
        playboard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
}

let playerxicon = "fa fa-close";
let playeroicon = "fa fa-circle-o";
let playersign = "X"; // suppose player will be  X
let runbot = true;
function clickedbox(element) {
    // console.log("Clicked");
    playersign = "X";
    console.log(element);
    if (players.classList.contains("player")) {

        element.innerHTML = `<i class="${playeroicon}"></i>`;
        players.classList.add("active");
        // if player is not X then definitely he is O so we will change the sign to the O
        playersign = "O";
        element.setAttribute("id", playersign);
        // players.classList.remove("active");
        // console.log("Clicked");
    }
    else {
        element.innerHTML = `<i class="${playerxicon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playersign);
        // console.log("Clicked");
    }
    playboard.style.pointerEvents = "none";
    selectwinner();

    element.style.pointerEvents = "none";
    let randomdelaytime = ((Math.random() * 1000) + 200).toFixed(); // generating random time display so bot will delay randomly 
    console.log(randomdelaytime);
    setTimeout(() => {
        bot(runbot);
    }, randomdelaytime); // here i am passing random delay time 

    // bot();
}

// bot click function
function bot(runbot) {
    // we will first change the user sign so if user have X then we will change it to the O
    if (runbot) {
        playersign = "O";
        let array = []; // to store unselected box index in this array
        for (let i = 0; i < allbox.length; i++) {
            if (allbox[i].childElementCount == 0) {
                array.push(i);
                // console.log(i);
            }
        }
        let randombox = array[Math.floor(Math.random() * array.length)]; // getting random index from the array so bot will select accordingly
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allbox[randombox].innerHTML = `<i class="${playerxicon}"></i>`;
                players.classList.remove("active");
                playersign = "X";
                allbox[randombox].setAttribute("id", playersign);
                // players.classList.remove("active");
                // console.log("Clicked");
            }
            else {
                allbox[randombox].innerHTML = `<i class="${playeroicon}"></i>`;
                players.classList.remove("active");
                allbox[randombox].setAttribute("id", playersign);
                // console.log("Clicked");
            }
            selectwinner();
        }
        allbox[randombox].style.pointerEvents = "none";
        playboard.style.pointerEvents = "auto";
    }
}
// now lets see the who is the winner with the help of the following function
function getid(idname) {
    return document.querySelector(".class" + idname).id; // returning the id name
}

function ctc(val1, val2, val3, sign) {
    if (getid(val1) == sign && getid(val2) == sign && getid(val3) == sign) {
        return true;
    }
}
function selectwinner() {
    if (ctc(1, 2, 3, playersign) || ctc(4, 5, 6, playersign) || ctc(7, 8, 9, playersign) || ctc(1, 4, 7, playersign) || ctc(2, 5, 8, playersign) || ctc(3, 6, 9, playersign) || ctc(1, 5, 9, playersign) || ctc(3, 5, 7, playersign)) {
        console.log(playersign + " is the winner of this game ");
        runbot = false;
        bot(runbot);
        setTimeout(() => {
            playboard.classList.remove("show");
            resultbox.classList.add("show");
        }, 700);
        wontext.innerHTML = `Player <p> ${playersign} </p> won the game`;
    }
    else {
        if (getid(1) != "" && getid(2) != "" && getid(3) != "" && getid(4) != "" && getid(5) != "" && getid(6) != "" && getid(7) != "" && getid(8) != "" && getid(9) != "") {
            // wontext.innerHTML = `Player <p> ${playersign} </p> won the game`;
            runbot = false;
            bot(runbot);
            setTimeout(() => {
                playboard.classList.remove("show");
                resultbox.classList.add("show");
            }, 700);
            wontext.textContent = "Match has been Drawn.";
        }
        // if match has drawn
        // first we check all the span and if each span has it's ids then we print match has drawn
        console.log("invlaid");
    }
}

replaybutton.onclick = () => {
    window.location.reload();
}
