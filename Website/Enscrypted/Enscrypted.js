const fileSrc = "https://nerv3sine.github.io/Website/Enscrypted/CardDatabase.json";

let starterSet = new Array();

const requestInfo = async(filePath) => {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const getStarterSet = async(filePath) => {
    data = await requestInfo(filePath);
    for(let x = 0; x < 4; x++){
        let card = Object.create(data.Cards[x]);
        starterSet.push(card);
    }
    console.log("starter set retrieved!");
}

const enter = () => {
    window.location.href = 'EnscryptedBattle.html';
    playerCardsCheck();
}

const scavenge = () => {
    window.location.href = 'EnscryptPickup.html';
    playerCardsCheck();
}

const playerCardsCheck = () => {
    if(window.localStorage.length == 0){
        resetCards();
    }
}

const resetCards = () => {
    window.localStorage.setItem("playerHand", starterSet);
    console.log("hand reset");
}

window.onload=function(){
    getStarterSet(fileSrc);
}