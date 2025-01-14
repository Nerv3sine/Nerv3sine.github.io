const gameStates = {
    title: "startWindow",
    loading: "readyWarnWindow",
    game: "gamePlay",
    scoreSummary: "roundClearWindow",
    gameover: "gameOver"
}

var LOADING_AUDIO;
var BG_MUSIC;
var START_MUSIC;
var READY_MUSIC;
var FAILURE_MUSIC;
var DISPLAY_SHOW_AUDIO;

const ROUND_BONUS_BASE = 50;
const ROUND_BONUS_MULTIPLIER = 25;

var perfection = true;
var gameState = gameStates.title;
var game_stage = 1;
var game_mode = "normal";
var playerScore = 0;

const randInt = (max) => {
    return Math.floor(Math.random() * max);
}

const newGameReset = () => {
    game_stage = 1;
    playerScore = 0;
}

$(document).ready(() => {

    LOADING_AUDIO = new eventAudio(["coin1", "coin2"]);
    BG_MUSIC = new eventAudio(["playing"], true);
    START_MUSIC = new eventAudio(["start"]);
    READY_MUSIC = new eventAudio(["ready"]);
    FAILURE_MUSIC = new eventAudio(["failurefull"]);
    DISPLAY_SHOW_AUDIO = new eventAudio(["hit1"]);

    updateGameState();

    $(this).on("keydown", (e) => {
        let inputKey = e.originalEvent.key;
        if(gameStates.game) {
            arcadeKeyPress(inputKey);
        }
        /*
        switch(gameState){
            case(gameStates.game):
                arcadeKeyPress(inputKey);
                break;
            default:
                generalArcadeKeyPress(inputKey);
                break;
        }
        */
    });
});

const generalArcadeKeyPress = (inputKey) => {
    if(gameState == gameStates.title){
        newGameReset();
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
    
    setTimeout(() => {
        if(game_mode == "normal") {
            resetGame();
        }
        else if(game_mode == "practice") {
            resetPracticeGame();
        }
        updateGameState(gameStates.game);
        BG_MUSIC.playAudio();
    }, 1200);
}

const launchFailureScreen = () => {
    $("#finalScore").html(playerScore);
    $("#endRound").html(game_stage);
    updateGameState(gameStates.gameover);
    FAILURE_MUSIC.playAudio();
    setTimeout(() => {
        updateGameState(gameStates.title);
    }, 3800);
}

const launchScoreSummaryScreen = (timeScore) => {

    let roundBonus = ROUND_BONUS_BASE + ROUND_BONUS_MULTIPLIER * game_stage;

    let perfectionBonus = perfection ? 100 : 0;

    playerScore += perfectionBonus + roundBonus + timeScore;

    $("#roundBonus").html(roundBonus);
    $("#timeBonus").html(timeScore);
    $("#perfectBonus").html(perfectionBonus);
    $("#scoreSummary").html(playerScore);

    updateGameState(gameStates.scoreSummary);

    game_stage++;

    STAGE_SUCCESS.playAudio();

    let stats = ["roundBonusGroup", "timeBonusGroup", "perfectBonusGroup", "totalScoreGroup"];
    let statIdx = 0;
    let showStat = () => {
        $("#" + stats[statIdx]).removeClass("hideStat");
        DISPLAY_SHOW_AUDIO.playAudio();
        statIdx++;
    }
    showStat();
    let statAnim = setInterval(() => {
        showStat();
        if(game_mode == "normal") {
            if(statIdx == stats.length){
                clearInterval(statAnim);
                setTimeout(() => {
                    stats.map((stat) => {
                        $("#" + stat).addClass("hideStat");
                    })
                    launchLoadingScreen();
                }, 1250);
            }
        }
        else if(game_mode == "practice") {
            if(statIdx == stats.length){
                clearInterval(statAnim);
                setTimeout(() => {
                    stats.map((stat) => {
                        $("#" + stat).addClass("hideStat");
                    })
                    updateGameState(gameStates.title);
                }, 1250);
            }
        }
        
    }, 500);
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
