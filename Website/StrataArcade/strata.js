const arrow = {
    U: "5/51/Up_Arrow.png",
    R: "3/3c/Right_Arrow.png",
    D: "1/13/Down_Arrow.png",
    L: "4/4e/Left_Arrow.png",
}

const arrowIcon = (idx) => {
    return "https://static.wikia.nocookie.net/helldivers_gamepedia/images/" + arrow[idx]
}

const db = [
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
    },
    {
        "name": "EAT-17 Expendable Anti-tank",
        "combo": "DDLUR",
        "icon": "Patriotic%20Administration%20Center/Expendable%20Anti-Tank.svg"
    },
    {
        "name": "MLS-4X Commando",
        "combo": "DLUDR",
        "icon": "Patriotic%20Administration%20Center/Commando.svg"
    },
    {
        "name": "GR-8 Recoilless Rifle",
        "combo": "DLRRL",
        "icon": "Patriotic%20Administration%20Center/Recoilless%20Rifle.svg"
    },
    {
        "name": "FLAM-40 Flamethrower",
        "combo": "DLUDU",
        "icon": "Patriotic%20Administration%20Center/Flamethrower.svg"
    },
    {
        "name": "AC-8 Autocannon",
        "combo": "DLDUUR",
        "icon": "Patriotic%20Administration%20Center/Autocannon.svg"
    },
    {
        "name": "MG-206 Heavy Machine Gun",
        "combo": "DLUDD",
        "icon": "Patriotic%20Administration%20Center/Heavy%20Machine%20Gun.svg"
    },
    {
        "name": "RS-422 Railgun",
        "combo": "DRDULR",
        "icon": "Patriotic%20Administration%20Center/Railgun.svg"
    },
    {
        "name": "FAF-14 Spear Launcher",
        "combo": "DDUDD",
        "icon": "Patriotic%20Administration%20Center/Spear.svg"
    },
    {
        "name": "GL-21 Grenade Launcher",
        "combo": "DLULD",
        "icon": "Engineering%20Bay/Grenade%20Launcher.svg"
    },
    {
        "name": "LAS-98 Laser Cannon",
        "combo": "DLDUL",
        "icon": "Engineering%20Bay/Laser%20Cannon.svg"
    },
    {
        "name": "ARC-3 Arc Thrower",
        "combo": "DRDULL",
        "icon": "Engineering%20Bay/Arc%20Thrower.svg"
    },
    {
        "name": "LAS-99 Quasar Cannon",
        "combo": "DDULR",
        "icon": "Engineering%20Bay/Quasar%20Cannon.svg"
    },
    {
        "name": "RL-77 Airburst Rocket Launcher",
        "combo": "DUULR",
        "icon": "Patriotic%20Administration%20Center/Airburst%20Rocket%20Launcher.svg"
    },
    {
        "name": "Orbital Gatling Barrage",
        "combo": "RDLUU",
        "icon": "Orbital%20Cannons/Orbital%20Gatling%20Barrage.svg"
    },
    {
        "name": "Orbital Airburst Strike",
        "combo": "RRR",
        "icon": "Orbital%20Cannons/Orbital%20Airburst%20Strike.svg"
    }
]

/*
    ,
    {
        "name": "RS-422 Railgun",
        "combo": "DRDULR",
        "icon": ""
    }
*/

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
    const response = await fetch(stratagemDBPath)
        .then(response => response.json())
        .then(data => console.log(data));
}

$(document).ready(() => {
    // loadStratagems();
    for(let i = 0; i < qSize; i++){
        setStrata(i, randInt(db.length));
    }

    // $(this).on("keydown", (e) => {
    //     console.log(e.originalEvent.code)
    // })
})

const arcadeKeyPress = (key) => {
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
        arrowGlow("error");
    }
}

const processQ = () => {
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

const arrowGlow = (colorClass) => {
    let arrows = $("#combo").children();
    arrows.addClass(colorClass);
    setTimeout(() => {
        arrows.removeClass(colorClass);
    }, 100);
}