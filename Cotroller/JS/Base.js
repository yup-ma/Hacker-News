const networkStatusBar = document.getElementById("network-status");
let actionStatus = "";
let actionMessage = "";
let appliedFiltersArray = [];
let apiUrlForArticles = `http://hn.algolia.com/api/v1/search?tags=front_page`
let debounceInputTimer;
let searchedThroughInput = false;
let pageNumber = 0;
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
window.addEventListener("load", () => {
    if (localStorage.getItem("applied-filters-array")) {
        let localStorageAppliedFiltersArray = JSON.parse(localStorage.getItem("applied-filters-array"));
        if (localStorageAppliedFiltersArray.length !== 0) {
            appliedFiltersArray = localStorageAppliedFiltersArray;
            localStorageAppliedFiltersArray.forEach(ele => {
                creatingAppliedFilterBtnsFunc(ele)
            });
            
            for (let i = 0; i < localStorageAppliedFiltersArray.length; i++) {
                if (appliedFiltersArray[i].type == "trival"){
                    document.querySelector(".trival-filter-value").innerHTML = appliedFiltersArray[i].value;
                }
            }
        } 
    }
    updatingTextForFilterQuantityStateFunc();
})