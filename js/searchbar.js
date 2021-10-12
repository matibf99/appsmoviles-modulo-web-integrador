const searchBar = $('#search-bar');

searchBar.keydown(function (e){
    if(e.keyCode == 13){
        window.location.href = `/html/search.html?q=${searchBar.val()}`;
    }
})