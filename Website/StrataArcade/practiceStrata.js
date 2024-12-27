var practiceDB = {};
var qCounter = 0;

const loadStratagemsList = () => {
    let container = document.getElementById("stratagemList");
    container.innerHTML = "";

    db.forEach((stratagem, index) => {
        let stratagemElement = document.createElement("div");
        stratagemElement.classList.add("stratagemElement");

        let stratagemIcon = document.createElement("img");
        stratagemIcon.src = getIcon(index);
        stratagemIcon.classList.add("stratagemIcon");
        stratagemIcon.onclick = () => toggleStratagemSelection(stratagemIcon);

        let stratagemName = document.createElement("p");
        stratagemName.innerHTML = stratagem.name;
        stratagemName.classList.add("stratagemName");

        stratagemElement.appendChild(stratagemIcon);
        stratagemElement.appendChild(stratagemName);

        container.appendChild(stratagemElement);
    });
}

const toggleStratagemSelection = (icon) => {
    icon.classList.toggle("selected");
}

const showStratagemSelectionModal = () => {
    let modal = document.getElementById("stratagemSelectionModal");
    modal.style.display = "block";
}

const closeStratagemSelectionModal = () =>{
    let modal = document.getElementById("stratagemSelectionModal");
    modal.style.display = "none";
}

// Function to retrieve selected stratagems
const getSelectedStratagems = () => {
    let selectedStratagemsIdx = [];
    let selectedIcons = document.querySelectorAll(".stratagemIcon.selected");

    selectedIcons.forEach(icon => {
        let stratagemIndex = Array.from(icon.parentNode.parentNode.children).indexOf(icon.parentNode);
        selectedStratagemsIdx.push(stratagemIndex);
    });

    return selectedStratagemsIdx;
}

const startPractice = () => {
    let selectedStratagemsIdx = getSelectedStratagems();

    if (selectedStratagemsIdx.length === 0) {
        alert("Please select at least one stratagem to practice.");
        return;
    }

    closeStratagemSelectionModal();
    startPracticeMode(selectedStratagemsIdx);
}

const startPracticeMode = (selectedStratagems) => {
    practiceDB = selectedStratagems; // nearly overwrote original db i'm so smart ;-;

    newGameReset();
    launchLoadingScreen();
}

const resetPracticeGame = () => {
    qCounter = 0;

    for(let i = 0; i < qSize; i++) {

        if(i >= practiceDB.length) {
            setStrata(i, -1);
        }
        else {
            console.log(practiceDB[i]);
            setStrata(i, practiceDB[i]);
        }
        qCounter++;
    }
    
    qBacklog = game_stage - 1;
    perfection = true;
    $("#gameRoundNumber").html(game_stage);
    updatePoints();

    readyState = true;
    // startTimer(); // no timer needed for practice mode
}

const processPracticeQ = () => {
    animateGlow($("#currentStratagem"), "successBg");

    for(let i = 0; i < qSize; i++) {
        let idx = practiceDB[i];

        if(i + 1 != qSize) {
            idx = $("#slot" + (i + 1)).attr("value");
            if(i == 0 && idx == -1) {
                stageClear();
                return;
            }
        }
        else {
            if(qCounter < practiceDB.length) {
                idx = practiceDB[qCounter];
                qCounter++;
            }
            else {
                idx = qBacklog > 0 ? idx : -1;
                qBacklog--;
            }
        }

        setStrata(i, idx);
    }
}