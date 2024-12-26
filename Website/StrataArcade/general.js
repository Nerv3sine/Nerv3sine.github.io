const gameStates = {
    title: "startWindow",
    loading: "readyWarnWindow",
    game: "gamePlay",
    scoreSummary: "roundClearWindow"
}

var LOADING_AUDIO;
var BG_MUSIC;
var START_MUSIC;
var READY_MUSIC;

const ROUND_BONUS_BASE = 50;
const ROUND_BONUS_MULTIPLIER = 25;

var perfection = true;
var gameState = gameStates.title;
var game_stage = 1;
var playerScore = 0;

const randInt = (max) => {
    return Math.floor(Math.random() * max);
}


$(document).ready(() => {

    LOADING_AUDIO = new eventAudio(["coin1", "coin2"]);
    BG_MUSIC = new eventAudio(["playing"], true);
    START_MUSIC = new eventAudio(["start"]);
    READY_MUSIC = new eventAudio(["ready"]);

    updateGameState();

    $(this).on("keydown", (e) => {
        let inputKey = e.originalEvent.key;
        switch(gameState){
            case(gameStates.game):
                arcadeKeyPress(inputKey);
                break;
            default:
                generalArcadeKeyPress(inputKey);
                break;
        }
    })
})

const generalArcadeKeyPress = (inputKey) => {
    if(gameState == gameStates.title){
        launchLoadingScreen();
    }
}

const launchLoadingScreen = () => {
    updateGameState(gameStates.loading);
    $("#roundNumber").html(game_stage);
    
    if(game_stage == 1){
        LOADING_AUDIO.playAudio();
        START_MUSIC.playAudio();
    }else{
        READY_MUSIC.playAudio();
    }
    
    resetGame();
    setTimeout(() => {
        updateGameState(gameStates.game);
        BG_MUSIC.playAudio();
    }, 1200);
}

const launchScoreSummaryScreen = () => {

    let roundBonus = ROUND_BONUS_BASE + ROUND_BONUS_MULTIPLIER * game_stage;
    
    let perfectionBonus = perfection ? 100 : 0;

    playerScore += perfectionBonus + roundBonus;

    $("#roundBonus").html(roundBonus);
    $("#perfectBonus").html(perfectionBonus);
    $("#scoreSummary").html(playerScore);

    updateGameState(gameStates.scoreSummary);

    game_stage++;

    STAGE_SUCCESS.playAudio();
    setTimeout(() => {
        launchLoadingScreen();
    }, 3000);
}

const updateGameState = (state = gameStates.title) => {
    gameState = state;

    let states = $(".gameState");
    states.map((idx) => {
        states[idx].style.display = "none";
    })
    $("#" + gameState).css("display", "");
}

const animateGlow = (targetElement, glowClass) => {
    targetElement.addClass(glowClass);
    setTimeout(() => {
        targetElement.removeClass(glowClass);
    }, 100)
}

class eventAudio {
    constructor(audioPaths, loop = false){
        this.manager = $("#audioManager");
        this.management = {
            files: [],
            active: [],
            inactive: []
        };
        audioPaths.forEach((fName) => {

            let audio = new Audio("./audio/" + fName + ".wav");
            audio.loop = loop;

            this.management.files.push(audio);
            this.management.inactive.push(audio);
        });

        // if(audioPaths.length == 1 && loop == false){
        //     this.management.files.addEventListener("ended", () => {
        //         this.load();
        //     })
        // }
    }
}

eventAudio.prototype.playAudio = function() {
    if(this.management.files.length == 0){
        return;
    }
    let player = this.management.files[0];
    
    if (this.management.files.length == 1){
        player.load();
    }
    if (this.management.files.length > 1){
        player = this.management.inactive.shift();
        this.management.active.push(player);
        if(this.management.active.length <= this.management.files.length / 2){
            let resetAudio = this.management.active.shift();
            resetAudio.load();
            this.management.inactive.push(resetAudio);
        }
    }

    player.play();
}

eventAudio.prototype.stopAudio = function() {
    this.management.files.forEach((file) => {
        file.pause();
        file.load();
    })
}