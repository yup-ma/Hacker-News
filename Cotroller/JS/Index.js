const networkStatusBar = document.getElementById("network-status");

window.addEventListener("online", () => {
    networkStatusBar.style.backgroundColor = "var(--success-bg-color)";
    networkStatusBar.style.color = "var(--primary-color)";
    networkStatusBar.innerText = "Back online";
    setTimeout(() => {
        networkStatusBar.style.maxHeight = "0";
    }, 2000)
})

window.addEventListener("offline", () => {
    networkStatusBar.style.backgroundColor = "var(--error-bg-color)";
    networkStatusBar.style.color = "var(--white-color)";
     networkStatusBar.style.maxHeight = "48px";
    networkStatusBar.innerText = "Network connection lost";
})


let suggestionStatusSendingUrl = `http://hn.algolia.com/api/v1/search?query=foo&tags=comment`
// let suggestionStatusSendingUrl = `http://hn.algolia.com/api/v1/items/23779420`

fetch(suggestionStatusSendingUrl)
.then(response => response.json())
.then((jsonData) => {
    jsonData.hits.forEach(ele => {
        console.log(ele._tags);
    });;

})
.catch((error) => {
    console.log(error);
});

//Adding bottom shadow to nav on scroll from initial pos
const navbarContainer = document.querySelector(".navbar-container")
const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle("active-stucked", e.intersectionRatio < 1),
    { threshold: [1] }
  );

observer.observe(navbarContainer);

document.querySelectorAll(".filter-btn:not(.filter-clear-btn)").forEach(ele => {
    ele.addEventListener('click', filterSearchDropwDownOpeningFunc)
});
//Opening dropdowns for filters
function filterSearchDropwDownOpeningFunc(){
    if (document.querySelector(".active-filter-dropdown")) {
        document.querySelector(".active-filter-dropdown").classList.remove("active-filter-dropdown");
    }
    this.parentElement.classList.add("active-filter-dropdown");
    document.body.addEventListener('click', filterSearchDropwDownClosingFunc)
}


function filterSearchDropwDownClosingFunc(e) {
let currentTarget = document.querySelector(".active-filter-dropdown").contains(e.target);
    if (!currentTarget) { //clikced outside of box
        document.querySelector(".active-filter-dropdown").classList.remove("active-filter-dropdown");
        document.body.removeEventListener('click', filterSearchDropwDownClosingFunc)
    }
}