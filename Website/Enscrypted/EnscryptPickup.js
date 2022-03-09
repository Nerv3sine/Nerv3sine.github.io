const fileSrc = "https://nerv3sine.github.io/Website/Enscrypted/CardDatabase.json"

let scavengePile = new Array();
let IDs = new Array();

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

window.onload=function(){
    generateCards(fileSrc);
}

const generateCards = async (filePath) => {
    let data = await request(filePath);

    //finds the container
    const container = document.getElementById("showcase");

    for(let x = 0; x < 3; x++){
        let temp = Math.floor(Math.random() * data.Cards.length);
        while(IDs.find(element => element == temp) > -1){
            temp = Math.floor(Math.random() * data.Cards.length);
        }
        IDs.push(temp);
        scavengePile.push(data.Cards[temp]);
        container.appendChild(createCard(data.Cards[temp], x));
    }
}

const createCard = (subject, ID) => {
    
    //creates the elements on the card
    const card = document.createElement("div");
    card.classList.add("slot");
    let tempFunc = "cardSelect('" + ID + "')";
    card.setAttribute("onclick", tempFunc);
    card.classList.add("card");

    const label = document.createElement("p");
    label.innerHTML = subject.Name;
    label.classList.add("cardLabel");
    card.appendChild(label);

    const visual = document.createElement("img");
    visual.src = subject.Visual;
    visual.classList.add("cardVisual");
    card.appendChild(visual);

    const healthLabel = document.createElement("p");
    healthLabel.innerHTML = subject.HP;
    healthLabel.classList.add("HP");
    card.appendChild(healthLabel);

    const powerLabel = document.createElement("p");
    powerLabel.innerHTML = subject.ATK;
    powerLabel.classList.add("ATK");
    card.appendChild(powerLabel);

    const cost = document.createElement("div");
    cost.classList.add("Cost");
    const costImg = document.createElement("img");
    costImg.classList.add("costVisual");
    costImg.src = getCostVisual(subject.Cost);
    cost.appendChild(costImg);
    card.appendChild(cost);

    return card;
}

const cardSelect = (index) => {
    //let tempArr = window.localStorage.playerHand;
    //.push(Object.create(scavengePile[index]));
    console.log(window.localStorage);
    // window.history.back();
}

/**
 * Returns the appropriate visual link according to the value received
 * @param {Integer} value 
 * @returns image link in the form of a String
 */
 const getCostVisual = (value) => {
    if(value > 0 && value < 8){
        return ("./assets/die " + value + ".png");
    }else{
        return "./assets/empty.png";
    }
}