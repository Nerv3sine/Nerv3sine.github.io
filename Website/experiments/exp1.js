let count = 0;
let change = false;
var example = document.getElementById('testImage');

let images = [
    "https://i.pinimg.com/originals/8a/90/98/8a909882b3c6a2fcba6e1d4a42dabd42.jpg",
    "https://wallpaperaccess.com/full/2029165.jpg",
    "https://wallpaperaccess.com/full/2232415.jpg"
]

const updateImg = () => {
    example.src = images[count];
}

window.onload=function(){
    example = document.getElementById('testImage');
    example.addEventListener('click', imgClick);
    example.addEventListener("transitionend", updateImgCheck);
}

const imgClick = () => {
    if(!change){
        change = true;
        count++;
        if(count > images.length - 1){
            count = 0;
        }
        example.classList.add("phaseOut");
    }
}

const updateImgCheck = () => {
    if(change){
        change = false;
        updateImg();
        example.classList.remove("phaseOut");
    }
}