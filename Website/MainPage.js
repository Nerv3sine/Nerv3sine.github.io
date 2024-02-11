const siteListFilePath = "https://nerv3sine.github.io/Website/ContentShowcase.json";

const request = async (filePath) => 
{
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const loadGallery = async () => 
{
    data = await request(siteListFilePath);

    let display = document.getElementById('gallery');

    for(let content of data.content)
    {
        addToGallery(content, display);
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

//when tags are implemented, make customized tags with logos for easier identification?

const wOpen = (page) => 
{
    window.open(page);
}

window.addEventListener("load", () => {
    loadGallery();
})