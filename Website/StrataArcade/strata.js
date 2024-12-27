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
var db = 
{
    "Support Weapons": [
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
    ],
    "test": [
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
}

var readyState = false;
const qSize = 6;
const getIcon = (idx) => {
    return "https://raw.githubusercontent.com/nvigneux/Helldivers-2-Stratagems-icons-svg/b7ad1b3baab4bda356940a183025334e895b2121/" + db[idx].icon
}
const stratagemDBPath = "./strata.json";

var qBacklog = 0;
var progress = 0;
var currentCombo = "";
var timerCounterMax = 24;
var timerCounter = timerCounterMax;

var TIMER_RESET;
var AUDIO_PRESS;
var CORRECT;
var ERROR;
var STAGE_SUCCESS;

const loadStratagems = async() => {
    await fetch("https://nerv3sine.github.io/Website/StrataArcade/strata.json")
        .then(response => response.json())
        .then(data => {
            let dataBox = [];
            for(const [_, stratagemList] of Object.entries(data)){
                dataBox = dataBox.concat(stratagemList);
            }
            db = dataBox;
        });
}

$(document).ready(() => {
    loadStratagems()

    AUDIO_PRESS = new eventAudio(["hit1", "hit2", "hit3", "hit4"]);
    CORRECT = new eventAudio(["correct1", "correct2", "correct3", "correct4"]);
    ERROR = new eventAudio(["error1", "error2", "error3", "error4"]);
    STAGE_SUCCESS = new eventAudio(["success1", "success2", "success3"]);
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

const resetGame = () => {
    for(let i = 0; i < qSize; i++){
        setStrata(i, randInt(db.length));
    }
    
    qBacklog = game_stage - 1;
    perfection = true;
    $("#gameRoundNumber").html(game_stage);
    updatePoints();

    readyState = true;
    startTimer();
}

const stageClear = () => {
    let timeBonus = Math.floor(timerCounter / timerCounterMax * 100);
    suspendGameOperations();
    launchScoreSummaryScreen(timeBonus);
}

const stageFailure = () => {
    suspendGameOperations();
    launchFailureScreen();
}

//this is basically meant for when the gamestate is exited to another state
//not a "pause" as the name suggests
const suspendGameOperations = () => {
    if(game_mode == "normal") {
        TIMER_RESET();
    }
    readyState = false;
    BG_MUSIC.stopAudio();
}

const compareInput = (input) => {
    let arrows = $("#combo").children();
    
    if(input == currentCombo[progress]){
        AUDIO_PRESS.playAudio();

        let arr = arrows[progress];
        arr.classList.add("pressed");
        progress++;

        if(progress == currentCombo.length){
            CORRECT.playAudio();
            updatePoints(currentCombo.length * 5);
            if(game_mode == "normal") {
                processQ();
            }
            else if(game_mode == "practice") {
                processPracticeQ();
            }
        }
    }else{
        perfection = false;
        ERROR.playAudio();
        progress = 0;
        arrows.removeClass("pressed");
        animateGlow($("#combo").children(), "error");
    }
}

const processQ = () => {
    animateGlow($("#currentStratagem"), "successBg");
    timerCounter += 2;
    updateTimerBar();
    
    for(let i = 0; i < qSize; i++){

        let idx = randInt(db.length);
        if(i + 1 != qSize){
            idx = $("#slot" + (i + 1)).attr("value");
            if(i == 0 && idx == -1){
                stageClear();
                return;
            }
        }else{
            idx = qBacklog > 0 ? idx : -1;
            console.log(qBacklog);
            qBacklog--;
        }
        setStrata(i, idx);
    }
}

const setStrata = (slot, id) => {
    let iconElement = $("#slot" + slot);

    iconElement.css("opacity", id == -1 ? "0" : "1");

    let strata = db[id];
    console.log(id);
    if(id != -1){
        iconElement.attr("src", getIcon(id));
    }
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

const updatePoints = (pts = 0) => {
    playerScore += pts;
    $("#gameScoreNumber").html(playerScore);
}

const startTimer = () => {
    updateTimerBar();
    var timerCountdown = setInterval(() => {
        timerCounter--;
        if(timerCounter == 0){
            stageFailure();
        }
        updateTimerBar();
    }, 420);

    TIMER_RESET = () => {
        clearInterval(timerCountdown);
        timerCounter = timerCounterMax;
        $("#timerBar").css("width", "100%");
    }
}

const updateTimerBar = () => {
    $("#timerBar").css("width", ((timerCounter - 1) / timerCounterMax) * 100 + "%");
}

const selectGameMode = (mode) => {
    if(mode == 1) {
        game_mode = "normal";
        launchLoadingScreen();
    } 
    else if(mode == 2) {
        game_mode = "practice";
        loadStratagemsList();
        showStratagemSelectionModal();
    }
}