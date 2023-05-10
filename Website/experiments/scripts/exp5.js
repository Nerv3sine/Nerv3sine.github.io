const ShapeTypes = {
    SINE: 1,
    CIRCULAR: 2
}

const colors = [
    [0, 118, 255], 
    [81, 162, 255], 
    [108, 255, 228], 
    [45, 234, 91], 
    [0, 221, 0]
];

const Params = {
    "windowWidth": 100,
    "refreshDelay": 20,
    
    "particleProperties": {
        "progressLimit": 100,

        "baseSize": 10,
        "sizeRange": 10,

        "baseSpeed": 0.0002,
        "speedRange": 500,
        "speedRangeNormalization": .000001,
    },

    "sinePattern": {
        "resetOffset": -4,

        "xOffsetRange": 30,

        "xBaseStretch": 20,
        "xStretchRange": 8,

        "yBaseRestriction": 65,
        "yRestrictionRange": 10
    },

    "circularPattern":{
        "originXOffset": 100,
        "originYOffset": 50,

        "baseRadius": 40,
        "radiusRange": 200,
        "radiusRangeNormalization": 0.1
    }
}

let circles = [];
let currentShape = ShapeTypes.CIRCULAR;

function getRandInt(max) {
    return Math.floor(Math.random() * max);
}

const sineAnimCalc = (x, horizontalOffset, horizontalStretch ,verticalSize) => {
    let valCalc = Math.sin((x + horizontalOffset) / horizontalStretch);
    let normalizedVal = (valCalc + 1) / 2 * verticalSize;
    return normalizedVal;
}

window.onload=function(){
    spawnParticles();
    animateParticles();
}

const updateParticle = (particle) => {
    let reset = false;
    particle["progress"] += particle["speed"];
    if(particle["progress"] > Params["particleProperties"]["progressLimit"]){
        particle["progress"] -= Params["particleProperties"]["progressLimit"];
        reset = true;
    }
    switch(currentShape){
        case ShapeTypes.SINE:
            if(reset){
                particle["progress"] += Params["sinePattern"]["resetOffset"];
            }
            particle.style.left = particle["progress"] + "%";
            particle.style.top = sineAnimCalc(particle["progress"], particle["sineOffset"], particle["sineStretch"], particle["sineYRestrict"]) + "%";
            break;
        case ShapeTypes.CIRCULAR:
            let circProgress = 2 * Math.PI * (particle["progress"] / Params["particleProperties"]["progressLimit"]);
            //added here to experiment with other types of shapes
            let circR = particle["circRadius"];
            //give this a try: circR = Math.cos(circProgress) * Math.cos(circProgress) * circR;
            let circX = Math.cos(circProgress) * circR;
            particle.style.left = Params["circularPattern"]["originXOffset"] + circX + "vh";
            particle.style.top = Params["circularPattern"]["originYOffset"] + Math.tan(circProgress) * circX + "vh";
            break;
        default:
            console.log("currentShape has been set to an unknown value!");
    }
}

const spawnParticles = () => {
    const canvas = document.getElementById("canvas");

    for(let i = 0; i < 100; i++){

        let circle = document.createElement("div");
        circle.className += "circle";
        
        let size = getRandInt(Params["particleProperties"]["sizeRange"]) + Params["particleProperties"]["baseSize"];
        circle.style.width = size + "px";
        circle.style.height = size + "px";

        let color = colors[getRandInt(colors.length)];
        circle.style.backgroundColor = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + 0.3 + ")";
        
        //setting parameters
        circle["progress"] = getRandInt(Params["particleProperties"]["progressLimit"]);
        //circle["x"] = circle["progress"];

        //sine pattern param determination
        circle["sineOffset"] = getRandInt(Params["sinePattern"]["xOffsetRange"]);
        circle["sineStretch"] = Params["sinePattern"]["xBaseStretch"] + getRandInt(Params["sinePattern"]["xStretchRange"]);
        circle["sineYRestrict"] = Params["sinePattern"]["yBaseRestriction"] + getRandInt(Params["sinePattern"]["yRestrictionRange"]);
        
        //circular pattern param determination
        circle["circRadius"] = Params["circularPattern"]["baseRadius"] + getRandInt(Params["circularPattern"]["radiusRange"]) * Params["circularPattern"]["radiusRangeNormalization"];

        circle["speed"] = getRandInt(Params["particleProperties"]["speedRange"]) 
        * Params["particleProperties"]["speedRangeNormalization"] 
        + Params["particleProperties"]["baseSpeed"];

        animateParticles(circle);
        circles.push(circle);
        canvas.appendChild(circle);
        // console.log(circle.style.top);
    }
}

const animateParticles = () => {
    
    circles.forEach(particle => {
        updateParticle(particle);
    });
    
    setTimeout(animateParticles, Params["refreshDelay"]);
}