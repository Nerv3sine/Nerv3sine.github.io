store = window.localStorage;

const c = () => {
    window.localStorage.setItem("test", 5);
}

const clean = () => {
    window.localStorage.clear();
    console.log("cleared");
}

const print = () => {
    console.log(window.localStorage);
}