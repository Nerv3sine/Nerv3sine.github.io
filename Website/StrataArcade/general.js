$(document).ready(() => {
    $(this).on("keydown", (e) => {
        arcadeKeyPress(e.originalEvent.key);
    })
})