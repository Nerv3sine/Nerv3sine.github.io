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

    let display = document.getElementById('gallery');

    for(let content of data.content)
    {
        addToGallery(content, display);
    }
   
    friends = await request(githubFollowingLink);

    userProcessing(friends);

    let friendsList = document.getElementById('friends');

    for(let person of Object.entries(githubFollowings)){
        addPerson(person[1], friendsList);
    }
}

const addToGallery = (data, display) => 
{
    let work = document.createElement("div");
    work.className = "item";
    
    let img = document.createElement("img");
    img.src = data.image;
    //CHANGE??
    img.height = "225";
    //
    work.appendChild(img);

    let caption = document.createElement("p");
    caption.innerHTML = data.caption;
    work.appendChild(caption);

    let subCap = document.createElement("p");
    subCap.className = "msg";
    subCap.innerHTML = data.subCaption;
    work.appendChild(subCap);

    for(let b of data.buttons){
        let btn = document.createElement("button");
        btn.addEventListener("click", () => {
            wOpen(b.link);
        });
        btn.className = "btn";
        btn.innerHTML = b.label;
        work.appendChild(btn);
    }

    display.appendChild(work);

    let tags = document.createElement("div");
    tags.className = "tagList";
    for(let t of data.tags){
        let tag = document.createElement("tag");
        tag.className = "tag";
        tag.innerHTML = t;
        tags.appendChild(tag);
    }
    work.appendChild(tags);
}

const userProcessing = (data) => {
    
    for(let person of data){
        githubFollowings[person.id] = {
            username: person.login,
            pfp: person.avatar_url,
            link: person.html_url
        }
    }
}

const addPerson = (data, display) => {

    console.log(data)
    person = document.createElement('div');
    person.addEventListener("click", () => {
        wOpen(data.link);
    });
    person.className = "friend";

    pfp = document.createElement('img');
    pfp.src = data.pfp;
    pfp.className = "pfp";
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

window.addEventListener("load", () => {
    loadPage();
})