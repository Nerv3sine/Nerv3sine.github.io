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
    playableComponents[3] = [...x.children]
    x = document.getElementById("opponent")
    playableComponents[2] = [...x.children]
    x = document.getElementById("player")
    playableComponents[1] = [...x.children]
    playingField[0] && handSetup();

    i = 0;
    for(let group of playableComponents){
        if(i > 0){
            for(let comp of group){
                comp.appendChild(document.createElement("div"));
                comp.appendChild(document.createElement("div"));
                comp.appendChild(document.createElement("div"));
            }
        }
        i++;
    }
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
        i++;
    }
    playableComponents[0] = [...x.children]
}

/**
 * generates an HTMLElement card component that's ready for displaying
 * @param {Dictionary} information 
 * @returns an HTMLElement component
 */
const generateCard = (information) => {
    const card = document.createElement("div");
    card.classList.add("slot");
    let tempFunc = "handInteract('" + information.Name + "')";
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
 * @param {integer} group 
 * @param {integer} index 
 * @returns 
 */
const slotInteract = (group, index) => {
    /*prevents any changes from happening if the same slot was selected*/
    if(cardSelection[0] == group && cardSelection[1] == index){
        return;
    }

    /*deactivate the previous card that was selected (if any)*/
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, playableComponents[cardSelection[0]][cardSelection[1]])
    }

    /*checks whether to move the card from the user's hand */
    if(cardSelection[0] == 0 && group != 0 && playingField[group][index] == null){
        moveCard(cardSelection, [group, index])
        playingField[0] = popElement(playingField[0], cardSelection[1])
        playableComponents[cardSelection[0]][cardSelection[1]].remove();
        playableComponents[cardSelection[0]] = popElement(playableComponents[cardSelection[0]], cardSelection[1])
    }
    if(playingField[group][index] != null){
        showCardInfo(playingField[group][index])
    }else{
        return;
    }

    toggleCancelBtn(true)

    cardSelection = [group, index];
    slotStateChange(true, playableComponents[cardSelection[0]][cardSelection[1]])
}

const handInteract = (cardName) => {
    let card = playingField[0][customFind(playingField[0], cardName)];
    showCardInfo(card)

    /*deactivate the previous card that was selected (if any)*/
    if(cardSelection[0] != -1 && cardSelection[1] != -1){
        slotStateChange(false, playableComponents[cardSelection[0]][cardSelection[1]])
    }

    toggleCancelBtn(true)

    cardSelection = [0, customFind(playingField[0], cardName)];
    slotStateChange(true, playableComponents[cardSelection[0]][cardSelection[1]])
}

/**
 * 
 * @param {Array} original 
 * @param {Array} newPos 
 */
const moveCard = (original, newPos) => {
    playingField[newPos[0]][newPos[1]] = playingField[original[0]][original[1]];
    playingField[original[0]][original[1]] = null;

    let targetSlot = playingField[newPos[0]][newPos[1]]

    prevSpot = playableComponents[original[0]][original[1]];
    newSpot = playableComponents[newPos[0]][newPos[1]];

    slotStateChange(false, prevSpot)
    prevSpot.classList.remove("card")
    prevSpot.children[0].classList.remove("cardLabel");
    prevSpot.children[0].innerHTML = ""
    prevSpot.children[1].classList.remove("HP");
    prevSpot.children[1].innerHTML = ""
    prevSpot.children[2].classList.remove("ATK");
    prevSpot.children[2].innerHTML = ""

    slotStateChange(true, newSpot)
    newSpot.classList.add("card")
    newSpot.children[0].classList.add("cardLabel");
    newSpot.children[0].innerHTML = targetSlot.Name;
    newSpot.children[1].classList.add("HP");
    newSpot.children[1].innerHTML = targetSlot.HP;
    newSpot.children[2].classList.add("ATK");
    newSpot.children[2].innerHTML = targetSlot.ATK;
}

const showCardInfo = (card) => {
    let display = document.getElementById("cardDisplay");
    display.style.display = "block"
    display.children[0].innerHTML = card.Name;
    display.children[1].innerHTML = card.HP;
    display.children[2].innerHTML = card.ATK;
}

/**
 * activates/deactivates a slot HTMLElement component based on the mode provided
 * 
 * @param {Boolean} mode 
 * @param {HTMLElement} component 
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
    toggleCancelBtn(false)
    cardSelection = [-1, -1]

    let display = document.getElementById("cardDisplay");
    display.style.display = "none"
}


const toggleCancelBtn = (state) => {
    let cancelBtn = document.getElementById("cancelBtn");
    if(state){
        cancelBtn.style.display = "block";
    }else{
        cancelBtn.style.display = "none";
    }
}

//custom methods

/**
 * removes the provided element at the index of the provided array from the array
 * @param {Array} input 
 * @param {Integer} index 
 * @returns resulting array without the specified element
 */
const popElement = (input, index) => {
    let out = input.slice(0, index);
    if(index + 1 < input.length){
        out = out.concat(input.slice(index + 1));
    }
    return out
}

//NOTE: change to key of some sort to protect from duplicate cards in the future
/**
 * finds the card of the specified name and returns it's location index
 * @param {Array} input 
 * @param {String} cardName 
 * @returns 
 */
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