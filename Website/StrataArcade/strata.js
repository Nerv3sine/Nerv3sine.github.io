const arrow = {
    U: "5/51/Up_Arrow.png",
    R: "3/3c/Right_Arrow.png",
    D: "1/13/Down_Arrow.png",
    L: "4/4e/Left_Arrow.png",
}

const arrowIcon = (idx) => {
    return "https://static.wikia.nocookie.net/helldivers_gamepedia/images/" + arrow[idx]
}

//presetData
var db = [
    {
        "name": "MG-43 Machine Gun",
        "combo": "DLDUR",
        "icon": "Patriotic%20Administration%20Center/Machine%20Gun.svg"
    },
    {
        "name": "APW-1 Anti-Materiel Rifle",
        "combo": "DLRUD",
        "icon": "Patriotic%20Administration%20Center/Anti-Materiel%20Rifle.svg"
    },
    {
        "name": "M-105 Stalwart",
        "combo": "DLDUUL",
        "icon": "Patriotic%20Administration%20Center/Stalwart.svg"
    }
]

var readyState = false;
const qSize = 6;
const getIcon = (idx) => {
    return "https://raw.githubusercontent.com/nvigneux/Helldivers-2-Stratagems-icons-svg/b7ad1b3baab4bda356940a183025334e895b2121/" + db[idx].icon
}
const stratagemDBPath = "./strata.json";

let progress = 0;
let currentCombo = "";

const randInt = (max) => {
    return Math.floor(Math.random() * max);
}

const loadStratagems = async() => {
    await fetch("https://nerv3sine.github.io/Website/StrataArcade/strata.json")
        .then(response => response.json())
        .then(data => {
            db = data
        });
}

$(document).ready(() => {
    loadStratagems()
        .then(() => {
            for(let i = 0; i < qSize; i++){
                setStrata(i, randInt(db.length));
            }
            readyState = true;
        });
})

const arcadeKeyPress = (key) => {
    if(!readyState) return;
    let keyPressed = null;
    switch(key){
        case "W":
        case "w":
        case "ArrowUp":
            keyPressed = "U"
            break;
        case "S":
        case "s":
        case "ArrowDown":
            keyPressed = "D"
            break;
        case "D":
        case "d":
        case "ArrowRight":
            keyPressed = "R"
            break;
        case "A":
        case "a":
        case "ArrowLeft":
            keyPressed = "L"
            break;
    }
    if(!keyPressed){
        return;
    }
    compareInput(keyPressed);
}

const compareInput = (input) => {
    let arrows = $("#combo").children();
    if(input == currentCombo[progress]){
        let arr = arrows[progress];
        arr.classList.add("pressed");
        progress++;
        if(progress == currentCombo.length){
            addPoints(currentCombo.length * 5);
            processQ();
        }
    }else{
        progress = 0;
        arrows.removeClass("pressed");
        animateGlow($("#combo").children(), "error");
    }
}

const processQ = () => {
    animateGlow($("#currentStratagem"), "successBg");
    for(let i = 0; i < qSize; i++){
        var idx = i + 1 == qSize ? randInt(db.length) : $("#slot" + (i + 1)).attr("value");
        setStrata(i, idx);
    }
}

const setStrata = (slot, id) => {
    let iconElement = $("#slot" + slot); 
    iconElement.css("opacity", id == -1 ? "0" : "1");

    let strata = db[id];
    
    iconElement.attr("src", getIcon(id));
    iconElement.attr("value", id);

    if(slot == 0){
        $("#currentStratagem").html(strata.name);
        currentCombo = strata.combo;
        progress = 0;
        setCombo(strata.combo);
    }
}

const setCombo = (combo) => {
    let comboContainer = $("#combo");
    comboContainer.empty();
    for(let i = 0; i < combo.length; i++){
        let arr = $("<img class='arrow'/>");
        arr.attr("src", arrowIcon(combo[i]));
        comboContainer.append(arr);
    }
}

const addPoints = (pts) => {
    let scoreElement = $("#gameScoreNumber");
    let score = parseInt(scoreElement.html());
    scoreElement.html(score + pts);
}

const animateGlow = (targetElement, glowClass) => {
    targetElement.addClass(glowClass);
    setTimeout(() => {
        targetElement.removeClass(glowClass);
    }, 100)
}