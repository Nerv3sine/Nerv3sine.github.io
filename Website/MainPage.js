const siteListFilePath = "https://nerv3sine.github.io/Website/ContentShowcase.json";

const githubFollowingLink = "https://api.github.com/users/Nerv3sine/following";

var githubFollowings = {}

const request = async (filePath) => 
{
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const loadPage = async () => 
{
    data = await request(siteListFilePath);

    friends = await request(githubFollowingLink);

    // console.log(friends)

    userProcessing(friends);

    // console.log(data)

    // d = await request("https://www.duolingo.com/users/iamfireboy")

    // console.log(d)

    let display = document.getElementById('gallery');

    for(let content of data.content)
    {
        addToGallery(content, display);
    }

    let friendsList = document.getElementById('friends');

    for(let person of Object.entries(githubFollowings))
    {
        addPerson(person[1], friendsList);
    }
}

const addToGallery = (data, display) => 
{
    let work = document.createElement("div");
    work.className = "item";
    
    let showcase = document.createElement("div");
    showcase.className = "moreDetails";

    work.appendChild(showcase);

    let img = document.createElement("img");
    img.src = data.image;
    img.className = "snapshot"
    //CHANGE??
    img.height = "225";
    //
    showcase.appendChild(img);

    let caption = document.createElement("p");
    caption.innerHTML = data.caption;
    work.appendChild(caption);

    let subCap = document.createElement("p");
    subCap.className = "msg";
    subCap.innerHTML = data.subCaption;
    work.appendChild(subCap);

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

    let members = document.createElement("div");
    members.className = "members";
    for(let m of data.teammates)
    {
        let member = document.createElement("img");
        member.className = "mPfp";
        member.src = githubFollowings[m].pfp
        member.title = githubFollowings[m].username
        member.addEventListener("click", () => 
        {
            wOpen(githubFollowings[m].link);
        });
        members.appendChild(member);
        members.appendChild(document.createElement("br"));
    }

    showcase.appendChild(members);

    // work.appendChild(moreDetails);

    display.appendChild(work);
}

const userProcessing = (data) => {
    
    for(let person of data){
        githubFollowings[person.id] = {
            username: person.login,
            pfp: person.avatar_url,
            link: person.html_url
        }
    }
    console.log(githubFollowings)
}

const addPerson = (data, display) => {

    // console.log(data)
    person = document.createElement('div');
    person.addEventListener("click", () => 
    {
        wOpen(data.link);
    });
    person.className = "friend";

    pfp = document.createElement('img');
    pfp.src = data.pfp;
    pfp.className = "pfp";
    pfp.title = data.username
    person.appendChild(pfp);

    // add a tooltip instead for displaying usernames
    // username = document.createElement('p');
    // username.innerHTML = data.username;
    // username.className = "username";
    // person.appendChild(username);

    display.appendChild(person);
}

//when tags are implemented, make customized tags with logos for easier identification?
//add other collaborators as icons for different group projects?

const wOpen = (page) => 
{
    window.open(page);
}

function getAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText)
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

// function gAsync(url, callback){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText)
//     }
//     xmlHttp.open("POST", url, true);
//     xmlHttp.send(null);
// }

window.addEventListener("load", () => {
    loadPage();
    
    /*t = (content) => {
        console.log(content);
    }

    getAsync("https://www.duolingo.com/profile/iamfireboy?via=search", t)*/

    
})