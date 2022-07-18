const networkStatusBar = document.getElementById("network-status");
let actionStatus = "";
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

    localStorageAppliedFiltersArray = JSON.parse(localStorage.getItem("applied-filters-array"));
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
    updatingTextForFilterQuantityStateFunc();
})

function showActionMessageFunc(){
    if (actionStatus == "error") {
        
    } else {
        
    }
}

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

//Others and author option
document.querySelectorAll(".filter-dropdown-special-btn-container input").forEach(ele => {
    ele.addEventListener('input', filterDropdownInputFunc)
});
function filterDropdownInputFunc(){
    this.value = this.value.replace(/\s+/g, '');
    this.parentElement.dataset.optionValue = this.value
    if (this.value !== "") {
        this.parentElement.querySelector("button").style.display = "block";
    } else{
        this.parentElement.querySelector("button").style.display = "none";
    }
}

document.querySelectorAll(".filter-dropdown-special-btn").forEach(ele => {
    ele.addEventListener('click', filterDropdownSpecialInputAddTagFunc)
});
function filterDropdownSpecialInputAddTagFunc(){
    let filterArrayVal = {};
    let addingFilterType = this.parentElement.parentElement.parentElement.dataset.filterType;
    let addingFilterValue = this.parentElement.dataset.optionValue;
    this.parentElement.parentElement.parentElement.classList.remove("active-filter-dropdown");
    this.parentElement.querySelector("input").value = "";
    document.body.removeEventListener('click', filterSearchDropwDownClosingFunc)
    for (let i = 0; i < appliedFiltersArray.length; i++) {
        //Checking if value is already present
        if (appliedFiltersArray[i].type == addingFilterType && appliedFiltersArray[i].value == addingFilterValue){
            actionStatus = "error";
            document.querySelector(".message-text").innerHTML = "Same filter is already present";
            showActionMessageFunc();
            return
        }
    }
    if (document.querySelector('[data-filter-added-type="author"]')) {
        actionStatus = "error";
        document.querySelector(".message-text").innerHTML = "You can only filter through one author";
        showActionMessageFunc();
        return
    }
    filterArrayVal.type = addingFilterType;
    filterArrayVal.value = addingFilterValue;
    appliedFiltersArray.push(filterArrayVal);
    creatingAppliedFilterBtnsFunc(filterArrayVal);

    actionStatus = "success";
    document.querySelector(".message-text").innerHTML = "Filter added successfully";
    showActionMessageFunc();
    localStorage.setItem("applied-filters-array", JSON.stringify(appliedFiltersArray));
}
//Applying filters starts
let appliedFiltersArray = [];
document.querySelectorAll(".filter-dropdown-btn").forEach(ele => {
    ele.addEventListener('click', filterDropdownBtnClickFunc)
});
function filterDropdownBtnClickFunc(){
    let filterArrayVal = {};
    let addingFilterType = this.parentElement.parentElement.dataset.filterType;
    let addingFilterValue = this.dataset.optionValue;
    this.parentElement.parentElement.classList.remove("active-filter-dropdown");
    document.body.removeEventListener('click', filterSearchDropwDownClosingFunc)
    for (let i = 0; i < appliedFiltersArray.length; i++) {
        //Checking if value is already present
        if (appliedFiltersArray[i].type == addingFilterType && appliedFiltersArray[i].value == addingFilterValue){
            actionStatus = "error";
            document.querySelector(".message-text").innerHTML = "Same filter is already present";
            showActionMessageFunc();
            return
        }
    }
    if (addingFilterType == "trival") {
        document.querySelector(".trival-filter-value").innerHTML = addingFilterValue;
        if (document.querySelector('[data-filter-added-type="trival"]')) {
            document.querySelector('[data-filter-added-type="trival"]').click();
            if (addingFilterValue == "Popularity") {
                return  
            }
        }
    }
    filterArrayVal.type = addingFilterType;
    filterArrayVal.value = addingFilterValue;
    appliedFiltersArray.push(filterArrayVal);
    creatingAppliedFilterBtnsFunc(filterArrayVal);

    actionStatus = "success";
    document.querySelector(".message-text").innerHTML = "Filter added successfully";
    showActionMessageFunc();
    localStorage.setItem("applied-filters-array", JSON.stringify(appliedFiltersArray));
}

function updatingTextForFilterQuantityStateFunc(){
    if (appliedFiltersArray.length == 0) {
        document.querySelector(".search-applied-filters-parent-container h3").innerHTML = "No filters applied";
        document.querySelector(".search-applied-filters-parent-container h3").style.textAlign = "center";
        document.querySelector(".filter-search-clear-filter").style.display = "none";

    } else{
        document.querySelector(".search-applied-filters-parent-container h3").innerHTML = `<i class="fa-solid fa-arrow-down"></i> Applied filters`;
        document.querySelector(".search-applied-filters-parent-container h3").style.textAlign = "left";
        document.querySelector(".filter-search-clear-filter").style.display = "block";
    }
}

document.querySelector(".filter-search-clear-filter").addEventListener('click', filterClearFunc)
function filterClearFunc(){
    document.querySelectorAll(".search-applied-filters-btn").forEach(ele => {
        ele.click();
    });
}
function creatingAppliedFilterBtnsFunc(e){
    const newButton = document.createElement("button");
    newButton.className = "search-applied-filters-btn d-flex";
    newButton.dataset.filterAddedType = e.type;
    newButton.dataset.filterAddedValue = e.value;
    newButton.innerHTML = `<span class="search-applied-filters-type">
    ${e.type}
</span>
<span class="search-applied-filters-value">
    ${e.value}
</span>
<span class="search-applied-filters-btn-close">
    <i class="fa-solid fa-xmark"></i>
    <span class="hidden-ele">Close</span>
</span>`;
    document.querySelector(".search-applied-filters-container").appendChild(newButton);
    newButton.addEventListener('click', searchAppliedFiltersBtnRemoveFunc)
    updatingTextForFilterQuantityStateFunc();
}

function searchAppliedFiltersBtnRemoveFunc(){
    let removingFilterType = this.dataset.filterAddedType;
    let removingFilterVal = this.dataset.filterAddedValue;
    let removingFilterArrayVal = {};
    removingFilterArrayVal.type = removingFilterType;
    removingFilterArrayVal.value = removingFilterVal;
    if (removingFilterType == "trival"){
        document.querySelector(".trival-filter-value").innerHTML = "Popularity";
    }
    this.remove();

    for (let i = 0; i < appliedFiltersArray.length; i++) {
        if (appliedFiltersArray[i].type == removingFilterType && appliedFiltersArray[i].value == removingFilterVal){
            appliedFiltersArray.splice(i, 1)
        }
    }
    updatingTextForFilterQuantityStateFunc();

    actionStatus = "success";
    document.querySelector(".message-text").innerHTML = "Filter removed successfully";
    showActionMessageFunc();
    localStorage.setItem("applied-filters-array", JSON.stringify(appliedFiltersArray))
}

function updatingURLForAPIFunc(){
    
}


function randomColorGenerator() {
    let r = Math.floor(Math.random()*(266));
    let g = Math.floor(Math.random()*(266));
    let b = Math.floor(Math.random()*(266));
    console.log()
    return r + ", " + g + ", " + b;
}
console.log(randomColorGenerator())

let apiUrlForArticles = `http://hn.algolia.com/api/v1/search?tags=front_page`


fetch(apiUrlForArticles)
.then(response => response.json())
.then((jsonData) => {
    // jsonData.hits.forEach(ele => {
    //     console.log(ele.author);
    // });
    console.log(jsonData);
    creatingArticlesFunc(jsonData);
})
.catch((error) => {
    console.log(error);
});

function creatingArticlesFunc(e){
    console.log()
}