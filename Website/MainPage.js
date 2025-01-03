//project showcase information
const siteListFilePath = "https://nerv3sine.github.io/Website/ContentShowcase.json";

//github API for "user following" information
const githubFollowingLink = "https://api.github.com/users/Nerv3sine/following";

//object meant to store "users followed" information for future use
var githubFollowings = {};

//pfps
var profiles = {
    "Linkedin":{
        logo: "./img_files/logo-linkedin.svg",
        pfp:"https://media.licdn.com/dms/image/v2/D5635AQHA9A74i6xErA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1675666297930?e=1730062800&v=beta&t=yUjbFKbt8x9BifkZdYf75f4Kggk8ACSB22z_7Xta_Jo",
        link: "https://www.linkedin.com/in/jasoncai7/"
    },
    "Github":{
        logo: "./img_files/logo-github.svg",
        pfp:"https://avatars.githubusercontent.com/u/44034888?v=4",
        link: "https://www.github.com/nerv3sine"
    },
    "Instagram1":{
        logo: "./img_files/logo-instagram.svg",
        pfp:"",
        link: "https://www.instagram.com/project_cjs/"
    },
    "Instagram2":{
        logo: "./img_files/logo-instagram.svg",
        pfp:"",
        link: "https://www.instagram.com/jc_visionairy/"
    },
    "Resume":{
        logo: "./img_files/document-text-outline.svg",
        pfp:"",
        link: "../files/General Resume.pdf"
    }
}

/**
 * designated function for fetching data
 * @param {string} filePath 
 * @returns 
 */
const request = async (filePath) => 
{
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

/**
 * designated function to render all the information on the page
 */
const loadPage = async () => 
{
    //loads in the JSON file of all the project information that's to be presented
    let data = await request(siteListFilePath);

    //loads in all the users that I follow on Github
    let friends = await request(githubFollowingLink);
    // console.log(friends)

    profileLoading();

    userProcessing(friends);
    // console.log(data)

    /* app dev testing
    
    d = await request("https://www.duolingo.com/users/iamfireboy")
    console.log(d)

    */

    // renders in all the projects
    let display = document.getElementById('gallery');
    for(let content of data.content)
    {
        addToGallery(content, display);
    }

    //renders all the people that I follow on Github
    let friendsList = document.getElementById('friends');
    for(let person of Object.entries(githubFollowings))
    {
        addPerson(person[1], friendsList);
    }
}

const loadFooter = () => {
    let footer = document.getElementById("idFooter");

    Object.keys(profiles).forEach(key => {
        let comp = document.createElement("div");

        if(profiles[key].logo == "")
        {
            let label = document.createElement("p");
            label.innerHTML = key;
            label.style.padding = "5px"
            comp.appendChild(label);
        }
        else
        {
            let logo = document.createElement("img");
            logo.src = profiles[key].logo;
            logo.width = 75;
            logo.height = 75;
            logo.className = "darkmode";
            logo.style.paddingLeft = "30px";
            logo.style.paddingRight = "30px";
            comp.appendChild(logo);
        }
        comp.addEventListener("click", () => {
            wOpen(profiles[key].link)
        });

        footer.appendChild(comp);
    });
}

/**
 * renders an HTML element that presents the project based on the information provided by data
 * @param {object} data 
 * @param {HTMLDivElement} display 
 */
const addToGallery = (data, display) => 
{
    //project display element
    let work = document.createElement("div");
    work.className = "item";

    //project accompanying visual
    let img = document.createElement("img");
    img.src = data.image;
    img.className = "snapshot"
    //vvv CHANGE??
    img.height = "225";
    work.appendChild(img);

    //project description
    let caption = document.createElement("p");
    caption.innerHTML = data.caption;
    work.appendChild(caption);

    //additional project notes
    let subCap = document.createElement("p");
    subCap.className = "msg";
    subCap.innerHTML = data.subCaption;
    work.appendChild(subCap);

    //relevant project links
    for(let b of data.buttons)
    {
        let btn = document.createElement("button");
        btn.addEventListener("click", () => 
        {
            wOpen(b.link);
        });
        btn.className = "btn";
        btn.innerHTML = b.label;
        work.appendChild(btn);
    }

    //relevant project tags
    let tags = document.createElement("div");
    tags.className = "tagList";
    for(let t of data.tags)
    {
        let tag = document.createElement("tag");
        tag.className = "tag";
        tag.innerHTML = t;
        tags.appendChild(tag);
    }
    work.appendChild(tags);

    display.appendChild(work);
}

/**
 * Retrieves following information from the Github account and stores into the githubFollowings object
 * @param {object} data 
 */
const userProcessing = (data) => 
{
    for(let person of data){
        githubFollowings[person.id] = {
            username: person.login,
            pfp: person.avatar_url,
            link: person.html_url
        }
    }
    // console.log(githubFollowings)
}

/**
 * renders all the users that I follow on Github
 * @param {object} data 
 * @param {HTMLDivElement} display 
 */
const addPerson = (data, display) => 
{
    // console.log(data)

    //user element
    person = document.createElement('div');
    person.addEventListener("click", () => 
    {
        wOpen(data.link);
    });
    person.className = "friend";

    //user pfp
    pfp = document.createElement('img');
    pfp.src = data.pfp;
    pfp.className = "pfp";
    pfp.title = data.username
    person.appendChild(pfp);

    // TODO: make a custom tooltip instead for displaying usernames

    display.appendChild(person);
}

const profileLoading = () => {
    
}

//IDEA: when tags are implemented, make customized tags with logos for easier identification?

//TODO: add other collaborators as icons for different group projects?
// -> attempted, should turn into a hover and expansion with mouse instead

/**
 * designated function for opening links
 * @param {string} page 
 */
const wOpen = (page) => 
{
    window.open(page);
}

/**
 * renders all other information in after the window finishes loading
 */
window.addEventListener("load", () => 
{
    loadPage();
    // loadFooter();
    
    /*app dev testing
    t = (content) => {
        console.log(content);
    }

    getAsync("https://www.duolingo.com/profile/iamfireboy?via=search", t)
    */
})

/*app dev testing
function getAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText)
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}


function gAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText)
    }
    xmlHttp.open("POST", url, true);
    xmlHttp.send(null);
}

useful postman links [duolingo]: 
https://www.duolingo.com/2017-08-30/users/452658628?fields
*/