const fileSrc = "https://nerv3sine.github.io/Website/InscryptionMini/CardDatabase.json"

let handComponents = [];
let playerComponents = [];
let opponentComponents = [];
let revealComponents = [];

let cardSelection = [-1, -1];

let currentHand = []
let playerCards = new Array(5)
let opponentCards = new Array(5)
let revealCards = new Array(5)

//0: hand
//1: player
//2: opponent
//3: reveal

const request = async(filePath) => {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const cardLoad = async (filePath) => {
    data = await request(filePath);
    currentHand = data.Cards
}

window.onload=function(){
    setup()
}

const setup = async () => {
    await cardLoad(fileSrc)
    let x = document.getElementById("reveal");
    revealComponents = x.children
    x = document.getElementById("opponent")
    opponentComponents = x.children
    x = document.getElementById("player")
    playerComponents = x.children
    currentHand && handSetup();
}

const handSetup = () => {
    let x = document.getElementById("hand");

    let i = 0;
    for(let item of currentHand){
        const card = document.createElement("div");
        card.classList.add("slot")
        let tempFunc = "slotInteract(0, " + i + ")"
        card.setAttribute("onclick", tempFunc);
        card.classList.add("card")

        const label = document.createElement("p");
        label.innerHTML = item.Name;
        label.classList.add("cardLabel")
        card.appendChild(label);

        x.appendChild(card);
        handComponents.push(card);
        i++;
    }
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
        component.classList.add("selected")
    }else{
        component.classList.remove("selected")
        //component.style.borderColor = "white"
        //component.style.borderWidth = "2px";
        
    }
}

const cancel = () => {
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, getComponent(cardSelection[0], cardSelection[1]))
    }
    cardSelection = [-1, -1]
}


const test = () => {
    let test = document.getElementById("test")

}

const p = (msg) => {
    console.log(msg)
}