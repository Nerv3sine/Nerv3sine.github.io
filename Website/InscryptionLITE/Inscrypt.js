const fileSrc = "https://nerv3sine.github.io/Website/InscryptionLITE/CardDatabase.json"
//imports methods from another js file

let playableComponents = [new Array(), new Array(5), new Array(5), new Array(5)];

let cardSelection = [-1, -1];

let playingField = [new Array(), new Array(5), new Array(5), new Array(5)]

//0: hand
//1: player
//2: opponent
//3: reveal


/**
 * loads in the json file of the designated location
 * @param {String} filePath 
 * @returns 
 */
const request = async(filePath) => {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const cardLoad = async (filePath) => {
    data = await request(filePath);
    playingField[0] = data.Cards
}


//on window load in setup

window.onload=function(){
    setup()
}

/**
 * assigns all variables keeping track of the different fields in the play field
 */
const setup = async () => {
    await cardLoad(fileSrc)
    let x = document.getElementById("reveal");
    playableComponents[3] = x.children
    x = document.getElementById("opponent")
    playableComponents[2] = x.children
    x = document.getElementById("player")
    playableComponents[1] = x.children
    playingField[0] && handSetup();
}

/**
 * generates all the cards within the player's hand
 */
const handSetup = () => {
    let x = document.getElementById("hand");

    let i = 0;
    for(let item of playingField[0]){

        let card = generateCard(item, [0, i]);

        x.appendChild(card);
        playableComponents[0].push(card);
        i++;
    }
}

/**
 * generates an HTMLElement card component that's ready for displaying
 * @param {Object} information 
 * @returns an HTMLElement component
 */
const generateCard = (information) => {
    const card = document.createElement("div");
    card.classList.add("slot");
    let tempFunc = "handInteract(" + information.Name + ")";
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

/**
 * selects a specific slot that's of the "group" group and "slot" element 
 * @param {*} group 
 * @param {*} index 
 * @returns 
 */
const slotInteract = (group, index) => {
    if(cardSelection[0] == group && cardSelection[1] == index){
        return;
    }
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, playableComponents[cardSelection[0]][cardSelection[1]])
    }

    if(cardSelection[0] == 0){
        playableComponents[cardSelection[0]][cardSelection[1]].remove();
        let card = playingField[0][cardSelection[1]]
        playingField[group][index] = card;
        playableComponents[group][index].appendChild(generateCard(card, [group, index]));
    }

    cardSelection = [group, index];
    slotStateChange(true, playableComponents[cardSelection[0]][cardSelection[1]])
}

const handInteract = (cardName) => {

}

// const moveCard = (originalPosition, newPosition) => {
    
// }

/**
 * activates/deactivates a slot HTMLElement component based on the mode provided
 * 
 * @param {*} mode 
 * @param {*} component 
 * 
 */
const slotStateChange = (mode, component) => {
    if(mode){
        component.classList.add("selected")
    }else{
        component.classList.remove("selected")
    }
}

/**
 * cancels the current selected slot
 */
const cancel = () => {
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, playableComponents[cardSelection[0]][cardSelection[1]])
    }
    cardSelection = [-1, -1]
}


//custom methods

const popElement = (input, index) => {
    let out = input.slice(0, index);
    if(index + 1 < input.length){
        out.concat(input.slice(index + 1));
    }
    return out
}

const customFind = (input, cardName) => {
    i = 0;
    for(let card of input){
        if(card.Name == cardName){
            return i;
        }
        i++;
    }
    console.log("find method error")
} 

const p = (msg) => {
    console.log(msg)
}

const test = () => {
    let test = document.getElementById("test")
    p("testing method run; success!")
}

test()