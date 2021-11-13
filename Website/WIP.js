let bannerPageIndex = 1;

let bannerComponent = document.getElementsByClassName("img-content");

let bannerContent = [
    "https://i.pinimg.com/originals/8a/90/98/8a909882b3c6a2fcba6e1d4a42dabd42.jpg",
    "https://wallpaperaccess.com/full/2029165.jpg",
    "https://wallpaperaccess.com/full/2232415.jpg"
]

bannerUpdate();

const bannerUpdate = () => {
    bannerComponent.src = bannerContent[bannerPageIndex - 1];
}

const changePage = (n) => {
    bannerPageIndex += n;
    if(bannerPageIndex > bannerContent.length){
        bannerPageIndex = 1;
    }
    if(bannerPageIndex < 1){
        bannerPageIndex = bannerContent.length;
    }
}