if (window.addEventListener) window.addEventListener("DOMContentLoaded", init);
else if (window.attachEvent) window.attachEvent("DOMContentLoaded", init);
function init() {
    new Search();
}

function Search() {
    this.searchWrap = document.querySelector(".header-search");
    this.logo = document.querySelector(".header-logo");
    this.searchBlock = document.querySelector(".search");
    this.searchWrap.addEventListener("click", this.openTel.bind(this));
    this.viewportWidth = window.innerWidth;
    // console.log(this.viewportWidth);
}

Search.prototype.openTel = function() {
    if (this.searchBlock.classList.contains("search-active")  ){
        this.searchBlock.classList.remove("search-active");
        if(this.viewportWidth <= 768){
            this.logo.style.cssText = "padding-top: 13px";
        }

    } else {
        this.searchBlock.classList.add("search-active");
        if(this.viewportWidth <= 767) {
            this.logo.style.cssText = "padding-top: 43px";
        }
    }
};