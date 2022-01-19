const fileSrc = "https://nerv3sine.github.io/Website/InscryptionMini/CardDatabase.json"
//imports methods from another js file

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


//json loading
const request = async(filePath) => {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const cardLoad = async (filePath) => {
    data = await request(filePath);
    currentHand = data.Cards
}


//on window load in setup

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

        let card = generateCard(item, [0, i]);

        x.appendChild(card);
        handComponents.push(card);
        i++;
    }
}

const generateCard = (information, cardPosition) => {
    const card = document.createElement("div");
    card.classList.add("slot");
    let tempFunc = "slotInteract(" + cardPosition[0] + ", " + cardPosition[1] + ")";
    card.setAttribute("onclick", tempFunc);
    card.classList.add("card");

    const label = document.createElement("p");
    label.innerHTML = information.Name;
    label.classList.add("cardLabel");
    card.appendChild(label);

    const healthLabel = document.createElement("p");
    healthLabel.innerHTML = information.HP;
    healthLabel.classList.add("HP");
    card.appendChild(healthLabel);

    const powerLabel = document.createElement("p");
    powerLabel.innerHTML = information.ATK;
    powerLabel.classList.add("ATK");
    card.appendChild(powerLabel);

    return card;
}

const slotInteract = (group, index) => {
    if(cardSelection[0] == group && cardSelection[1] == index){
        return;
    }
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, getComponent(cardSelection[0], cardSelection[1]))
    }

    if(cardSelection[0] == 0){
        getComponent(cardSelection[0], cardSelection[1]).remove();
        let card = currentHand[cardSelection[1]]
        currentHand = popElement(currentHand, cardSelection[1])
        getSlotGroup(group)[index] = card;
        getComponent(group, index).appendChild(generateCard(card, [group, index]));
    }

    cardSelection = [group, index];
    slotStateChange(true, getComponent(cardSelection[0], cardSelection[1]))
}

// const moveCard = (originalPosition, newPosition) => {
    
// }

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
        default:
            p("error in getComponent function")
    }
}

const getSlotGroup = (group) => {
    switch(group){
        case 0:
            return currentHand;
        case 1:
            return playerCards;
        case 2:
            return opponentCards;
        case 3:
            return revealCards;
    }
}

const slotStateChange = (mode, component) => {
    if(mode){
        component.classList.add("selected")
    }else{
        component.classList.remove("selected")
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

const popElement = (input, index) => {
    let out = input.slice(0, index);
    if(index + 1 < input.length){
        out.concat(input.slice(index + 1));
    }
    return out
}

const p = (msg) => {
    console.log(msg)
}

test()

