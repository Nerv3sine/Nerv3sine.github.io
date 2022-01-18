let handComponents = [];
let playerComponents = [];
let opponentComponents = [];
let revealComponents = [];
let cardSelection = [0, 0];
let currentHand = ["Wolf", "Bear", "Snake", "Mantis God"]

//0: hand
//1: player
//2: opponent
//3: reveal

window.onload=function(){
    setup()
}

const setup = () => {
    let x = document.getElementById("reveal");
    revealComponents = x.children
    x = document.getElementById("opponent")
    opponentComponents = x.children
    x = document.getElementById("player")
    playerComponents = x.children
    handSetup();
}

const handSetup = () => {
    let x = document.getElementById("hand");

    let i = 0;
    currentHand.forEach(element => {
        const card = document.createElement("div");
        card.className = "slot"
        let tempFunc = "slotInteract(0, " + i + ")"
        card.setAttribute("onclick", tempFunc);
        card.style.borderStyle = "solid";
        card.style.backgroundColor = "tan";

        const label = document.createElement("p");
        label.innerHTML = element;
        label.style.color = "black";
        label.style.textAlign = "center";
        card.appendChild(label);

        x.appendChild(card);
        handComponents.push(card);
        i++;
    });
}

const slotInteract = (group, index) => {
    if(cardSelection[0] == group && cardSelection[1] == index){
        return;
    }
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, getComponent(cardSelection[0], cardSelection[1]))
    }
    cardSelection = [group, index];
    slotStateChange(true, getComponent(cardSelection[0], cardSelection[1]))
}

const getComponent = (group, index) => {
    switch(group){
        case 0:
            return handComponents[index]
        case 1:
            return playerComponents[index]
        case 2:
            return opponentComponents[index]
        case 3:
            return revealComponents[index]
    }
}

const slotStateChange = (mode, component) => {
    if(mode){
        component.style.borderColor = "blue"
        component.style.borderWidth = "4px";
    }else{
        component.style.borderColor = "white"
        component.style.borderWidth = "2px";
    }
}


const p = (msg) => {
    console.log(msg)
}