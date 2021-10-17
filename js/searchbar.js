const searchBar = $("#search-bar");
const searchButton = $(".buscar-nav-btn");
const searchNav = $(".buscar-nav");

const navToggle = $(".nav-toggle");
const navLinks = $(".nav-links");

searchBar.keydown(function (e){
    if(e.keyCode == 13){
        window.location.href = `/html/search.html?q=${searchBar.val()}`;
    }
});

searchButton.on("click", (e) => {
    window.location.href = `/html/search.html?q=${searchBar.val()}`;
});

navToggle.on("click", () => {
    navLinks.toggle();
    searchNav.toggle();
});
