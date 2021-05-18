const navigate = (page) => {
    switch(page){
        case 0:
            window.open('https://myexperience.sfu.ca/myAccount/dashboard.htm');
            window.location.href = 'https://myexperience.sfu.ca/myAccount/dashboard.htm';
            break;
        case 1:
            window.location.href = 'https://mail.sfu.ca';
            break;
        case 2:
            window.location.href = 'https://canvas.sfu.ca/';
            break;
        case 3:
            window.location.href = 'https://crowdmark.com/';
            break;
    }
}