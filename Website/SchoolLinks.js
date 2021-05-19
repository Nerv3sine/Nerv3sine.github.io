const navigate = (page) => {
    switch(page){
        case 0:
            window.open('https://myexperience.sfu.ca/myAccount/dashboard.htm');
            break;
        case 1:
            window.open('https://mail.sfu.ca');
            break;
        case 2:
            window.open('https://canvas.sfu.ca/');
            break;
        case 3:
            window.open('https://crowdmark.com/');
            break;
    }
}