var bannerIndex = 0;
showSlide(bannerIndex);

function changeSlide(n){
    showSlide(bannerIndex += n);
}

function showSlide(n){
    var i;
    var x = document.getElementsByClassName("banner-slides");
    if(n > x.length){
        bannerIndex = 0;
    }
    if(n < 0){
        bannerIndex = x.length;
    }
    for(i = 0; i < x.length; i++){
        x[i].style.display = "none";
    }
    x[bannerIndex].style.display = "block";
}

const navSFUCo_op = () => {
    window.location.href = 'https://myexperience.sfu.ca/myAccount/dashboard.htm';
}

const navigate = (page) => {
    switch(page){
        case 0:
            window.location.href = 'SchoolLinks.html';
            break;
    }
}