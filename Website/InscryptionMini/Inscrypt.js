let handComponents = []
let cardSelection = -1;
let currentHand = ["Wolf", "Bear", "Snake", "Mantis God"]

window.onload=function(){
    setup()
}

const setup = () => {
    let x = document.getElementById("hand");

    let i = 0;
    currentHand.forEach(element => {
        const card = document.createElement("div");
        card.className = "slot"
        let tempFunc = "handInteract(" + i + ")"
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

const handInteract = (index) => {
    if(cardSelection != -1 && cardSelection != index){
        handComponents[cardSelection].style.borderColor = "white"
        handComponents[cardSelection].style.borderWidth = "2px";
    }
    cardSelection = index;
    handComponents[cardSelection].style.borderColor = "blue"
    handComponents[cardSelection].style.borderWidth = "4px";
}



const p = (msg) => {
    console.log(msg)
}