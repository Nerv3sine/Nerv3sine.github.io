const siteListFilePath = "https://nerv3sine.github.io/Website/experiments/siteList.json";
const imageLink = "https://cdn.wallpapersafari.com/98/5/qCrgLd.jpg";
const accessFunc = "window.location.href = ";

const request = async (filePath) => {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

const main = async (filePath) => {
    fileData = await request(filePath);

    let allInfo = new Set();
    let siteNames = new Array();
    for(let name of fileData.names){
        siteNames.push(name);
    }
    console.log(siteNames);
    for(let info of fileData.sites){
        allInfo.add(info);
    }

    generateContent(allInfo, siteNames);
}

const generateContent = (info, siteNames) => {
    let siteAccessContainer = document.getElementById("sitesContainer");

    if(info.size < 1){
        generateFillerContent();
    }

    //simple x in y loops don't work for sets
    count = 0;
    for(let site of info){
        //card content
        const itemPic = document.createElement("ion-img");
        itemPic.setAttribute('src', imageLink);
        const itemLabel = document.createElement("ion-card-title");
        itemLabel.setAttribute('class', 'ion-padding');
        itemLabel.innerHTML = siteNames[count];
        count++;

        //card
        const itemCard = document.createElement("ion-card");
        itemCard.setAttribute('class', 'ion-margin');
        itemCard.setAttribute('color', 'primary');
        itemCard.setAttribute('onclick', accessFunc + "'" + site + "'");

        itemCard.appendChild(itemPic);
        itemCard.appendChild(itemLabel);
        
        //column
        const column = document.createElement("ion-col");
        column.setAttribute('size', "3");
        column.appendChild(itemCard);


        siteAccessContainer.appendChild(column);
    }
}

const generateFillerContent = () => {
    //loads the animated item
    let mainContainer = document.getElementById("sitesContainer");
    mainContainer.setAttribute('class', 'filler ion-justify-content-center');

    let spin = document.createElement("ion-spinner");
    spin.setAttribute("name", "crescent");
    spin.setAttribute("color", "success");
    mainContainer.appendChild(spin);


    //loads the text telling the user about the situation
    let parent = mainContainer.parentElement;

    let textElement = document.createElement("ion-row");
    textElement.setAttribute('class', 'ion-margin ion-justify-content-center');

    let textContent = document.createElement("ion-text");
    textContent.innerHTML = "An error has occured, could not fetch the desired contents";
    textElement.appendChild(textContent);

    parent.appendChild(textElement);
}

main(siteListFilePath);