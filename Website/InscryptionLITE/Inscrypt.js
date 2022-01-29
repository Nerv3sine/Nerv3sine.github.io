/**src link for the card database*/
const fileSrc = "https://nerv3sine.github.io/Website/InscryptionLITE/CardDatabase.json"

/**the "physical" playing field to keep track of the visual html components for easy access */
let playableComponents = [new Array(), new Array(5), new Array(5), new Array(5)];

/**keeps track of the last card that was selected, will return -1, -1 if last card is NULL*/
let cardSelection = [-1, -1];

/**artificial playing field created to keep track of the cards information */
let playingField = [new Array(), new Array(5), new Array(5), new Array(5)]

/**database of all the possible cards created for the game */
let cardDatabase = new Array();

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

/**saves the fetched information into the local database */
const cardLoad = async (filePath) => {
    data = await request(filePath);
    cardDatabase = data.Cards;
}


//on window load in setup

window.onload=function(){
    setup()
}

/**
 * assigns all variables keeping track of the different fields in the play field
 */
const setup = async () => {
    await cardLoad(fileSrc);
    let x = document.getElementById("reveal");
    playableComponents[3] = [...x.children];
    x = document.getElementById("opponent");
    playableComponents[2] = [...x.children];
    x = document.getElementById("player");
    playableComponents[1] = [...x.children];

    cardDatabase && pickUpCards(6);

    i = 0;
    for(let group of playableComponents){
        if(i > 0){
            for(let comp of group){
                comp.appendChild(document.createElement("p"));
                comp.appendChild(document.createElement("img"));
                comp.appendChild(document.createElement("p"));
                comp.appendChild(document.createElement("p"));
                
                const cost = document.createElement("div");
                let costImg = document.createElement("img");
                costImg.src = "./assets/empty.png";
                cost.appendChild(costImg);
                comp.appendChild(cost);
            }
        }
        i++;
    }
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

    const visual = document.createElement("img");
    visual.src = information.Visual;
    visual.classList.add("cardVisual");
    card.appendChild(visual);

    const healthLabel = document.createElement("p");
    healthLabel.innerHTML = information.HP;
    healthLabel.classList.add("HP");
    card.appendChild(healthLabel);

    const powerLabel = document.createElement("p");
    powerLabel.innerHTML = information.ATK;
    powerLabel.classList.add("ATK");
    card.appendChild(powerLabel);

    const cost = document.createElement("div");
    cost.classList.add("Cost");
    const costImg = document.createElement("img");
    costImg.classList.add("costVisual");
    costImg.src = getCostVisual(information.Cost);
    cost.appendChild(costImg);
    card.appendChild(cost);

    return card;
}

/**
 * selects a specific slot that's of the "group" group and "slot" element 
 * @param {Integer} group 
 * @param {Integer} index 
 * @returns null
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

/**
 * triggers when a card within the hand is selected
 * @param {String} cardName 
 */
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
 * moves card from the *original* position to the new position
 * @param {Array} original 
 * @param {Array} newPos 
 */
const moveCard = (original, newPos) => {
    playingField[newPos[0]][newPos[1]] = playingField[original[0]][original[1]];

    let targetSlot = playingField[newPos[0]][newPos[1]]

    let newSpot = playableComponents[newPos[0]][newPos[1]];

    clearSlot(original);

    newSpot.classList.add("card")
    newSpot.children[0].classList.add("cardLabel");
    newSpot.children[0].innerHTML = targetSlot.Name;
    newSpot.children[1].src = targetSlot.Visual;
    newSpot.children[1].classList.add("cardVisual");
    newSpot.children[2].classList.add("HP");
    newSpot.children[2].innerHTML = targetSlot.HP;
    newSpot.children[3].classList.add("ATK");
    newSpot.children[3].innerHTML = targetSlot.ATK;
    newSpot.children[4].classList.add("Cost");
    newSpot.children[4].children[0].classList.add("costVisual");
    newSpot.children[4].children[0].src = getCostVisual(targetSlot.Cost)
}

/**
 * clears any visible information within the given slot, resets the slot
 * @param {Object} info 
 */
const clearSlot = (info) => {

    playingField[info[0]][info[1]] = null;

    let slot = playableComponents[info[0]][info[1]];

    slotStateChange(false, slot);
    slot.classList.remove("card");
    slot.children[0].innerHTML = "";
    slot.children[1].src = "./assets/empty.png";
    slot.children[2].innerHTML = "";
    slot.children[2].classList.remove("HP");
    slot.children[3].innerHTML = "";
    slot.children[3].classList.remove("ATK");
    slot.children[4].children[0].src = getCostVisual(0)
}

/**
 * turns on the card visual that displays information about the provided card
 * @param {Object} card 
 */
const showCardInfo = (card) => {
    let display = document.getElementById("cardDisplay");
    display.style.display = "block"
    display.children[0].innerHTML = card.Name;
    display.children[1].src = card.Visual;
    display.children[2].innerHTML = card.HP;
    display.children[3].innerHTML = card.ATK;
    display.children[4].children[0].src = getCostVisual(card.Cost);
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
 * cancels the current selected slot, resets the current card visual as well
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

/**
 * toggles the cancel button to the desired state provided
 * @param {Boolean} state 
 */
const toggleCancelBtn = (state) => {
    let cancelBtn = document.getElementById("cancelBtn");
    if(state){
        cancelBtn.style.display = "block";
    }else{
        cancelBtn.style.display = "none";
    }
}

/**
 * method called when player ends turn
 */
const endTurn = () => {
    cancel();
    moveOpponentCards();
    animateTest();
    pickUpCards(2);
}

/**
 * moves all of the opponent's card from the reveal row to the opponent row
 */
const moveOpponentCards = () => {
    let pos = 0;
    for(let card of playingField[3]){
        if(card != null && playingField[2][pos] == null){
            moveCard([3, pos], [2, pos]);
        }
        pos++;
    }
}

/**
 * adds a desired amount of cards to the player's hand
 * @param {Integer} amt 
 */
const pickUpCards = (amt) => {
    let x = 0;

    let physicalHand = document.getElementById("hand");

    //TODO: FIX PROBLEM OF DUPLICATE CARDS ADD AN ID TO IDENTIFY THE DIFFERENCE BETWEEN CARDS
    while(x < amt){
        let id = Math.floor(Math.random() * cardDatabase.length);
        playingField[0].push(cardDatabase[id]);

        physicalHand.appendChild(generateCard(playingField[0][playingField[0].length - 1]));

        x++;
    }

    playableComponents[0] = [...physicalHand.children];
}

/**
 * Returns the appropriate visual link according to the value received
 * @param {Integer} value 
 * @returns image link in the form of a String
 */
const getCostVisual = (value) => {
    switch(value){
        case 1:
            return "./assets/die 1.png";
        case 2:
            return "./assets/die 2.png";
        case 3:
            return "./assets/die 3.png";
        case 4:
            return "./assets/die 4.png";
        case 5:
            return "./assets/die 5.png";
        case 6:
            return "./assets/die 6.png";
        case 7:
            return "./assets/die 7.png";
        default:
            return "./assets/empty.png";
    }
}

const animateTest = () => {
    let duration = 0;
    for(let x = 0; x < playableComponents[1].length; x++){
        let player = playingField[1][x];
        let opp = playingField[2][x];
        if(player != null || opp != null){
            setTimeout(() => {
                (player && player.ATK > 0) && playableComponents[1][x].classList.add("action");
                (opp && opp.ATK > 0) && playableComponents[2][x].classList.add("reaction");
                setTimeout(() => {
                    playableComponents[1][x].classList.remove("action");
                    playableComponents[2][x].classList.remove("reaction");
                }, 100);
            }, 900 * duration);
            duration++;
        }
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