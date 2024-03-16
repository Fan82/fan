$(document).ready(function () {
    gameHall_JS();
});

function gameHall_JS() {
    $("a.contact").click(function () {
        $('.contact-menu').toggleClass('show');
    });
}
