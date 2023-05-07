const colors = [[0, 118, 255], [81, 162, 255], [108, 255, 228], [45, 234, 91], [0, 221, 0]];
let circles = [];

function getRandInt(max) {
    return Math.floor(Math.random() * max);
}

const sineAnimCalc = (x, horizontalOffset, horizontalStretch ,verticalSize) => {
    let valCalc = Math.sin((x + horizontalOffset) / horizontalStretch);
    let normalizedVal = (valCalc + 1) / 2 * verticalSize;
    return normalizedVal;
}

window.onload=function(){
    const canvas = document.getElementById("canvas");

    for(let i = 0; i < 100; i++){
        let circle = document.createElement("div");
        circle.className += "circle";
        let size = getRandInt(10) + 10;
        circle.style.width = size + "px";
        circle.style.height = size + "px";
        let color = colors[getRandInt(colors.length)];
        circle.style.backgroundColor = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + 0.3 + ")";
        circle["x"] = getRandInt(100);
        //circle["y"] = getRandInt(75);
        circle["offset"] = getRandInt(30);
        circle["stretch"] = 20 + getRandInt(8);
        circle["yRestrict"] = 60 + getRandInt(15);
        circle["speed"] = getRandInt(500);
        circle.style.left = circle["x"] + "%";
        circle.style.top = sineAnimCalc(circle["x"], circle["offset"], circle["stretch"], circle["yRestrict"]) + "%";
        circles.push(circle);
        canvas.appendChild(circle);
    }
    
    mainPageAnim();
    
}

const mainPageAnim = () => {
    for(let i = 0; i < circles.length; i++){
        circles[i]["x"] += circles[i]["speed"]/100000 + 0.01;
        if(circles[i]["x"] > 100){
            circles[i]["x"] = -4;
        }
        circles[i].style.left = circles[i]["x"] + "%";
        circles[i].style.top = sineAnimCalc(circles[i]["x"], circles[i]["offset"], circles[i]["stretch"], circles[i]["yRestrict"]) + "%";
    }
    setTimeout(mainPageAnim, 5);
}