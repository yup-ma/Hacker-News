

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
            actionMessage = "Same filter is already present";
            showActionMessageFunc();
            return
        }
    }
    if (document.querySelector('[data-filter-added-type="author"]')) {
        if (addingFilterType == "author") {
            actionStatus = "error";
            actionMessage = "You can only filter through one author";
            showActionMessageFunc();
            return
        }
    }
    if (addingFilterValue.toLowerCase() == "comment") {
        actionStatus = "error";
        actionMessage = "We are adding more filters, for now comment is not available";
        showActionMessageFunc();
        return
    }
    filterArrayVal.type = addingFilterType;
    filterArrayVal.value = addingFilterValue;
    appliedFiltersArray.push(filterArrayVal);
    creatingAppliedFilterBtnsFunc(filterArrayVal);

}
//Applying filters starts
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
            actionMessage = "Same filter is already present";
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

    actionStatus = "success";
    actionMessage = "Filter added successfully";
    showActionMessageFunc();
    localStorage.setItem("applied-filters-array", JSON.stringify(appliedFiltersArray));
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
    actionMessage = "Filter removed successfully";
    showActionMessageFunc();
    localStorage.setItem("applied-filters-array", JSON.stringify(appliedFiltersArray))
}


document.querySelector("#search-input").addEventListener('input', function(){
    clearTimeout(debounceInputTimer);
    debounceInputTimer = setTimeout(() => {
        updatingURLForAPIFunc();
        document.querySelector(".articles-main-container-sub-heading").innerHTML = "";
        document.querySelector(".articles-main-container-pagination").style.display = "none";
        document.querySelector(".articles-main-container").innerHTML = `<div class="loader-container">
    <div>
        <span class="loader loader1">l</span>  
        <span class="loader loader2">o</span>  
        <span class="loader loader3">a</span>  
        <span class="loader loader4">d</span>  
        <span class="loader loader5">i</span>  
        <span class="loader loader6">n</span>  
        <span class="loader loader7">g</span>  
    </div>
</div>`;
    }, 300);
})

function updatingURLForAPIFunc(){
    searchedThroughInput = true;
    document.querySelector(".articles-main-container-heading").innerHTML = "Articles";
    let baseAPIUrlForArticles = `http://hn.algolia.com/api/v1/search`
    let articleSearchInputVal = document.querySelector("#search-input").value.replace(/\s+/g, '_');
    let tagsAllVal = "";
    let authorAllVal = "";
    let filterByDate = false;
    
    if (searchedThroughInput == false) {
        apiUrlForArticles = `http://hn.algolia.com/api/v1/search?tags=front_page`;
    } else {
        for (array in appliedFiltersArray) {
            if (appliedFiltersArray[array].type == "trival"){
                filterByDate = true;
            } else {
                filterByDate = false;
            }
            if (appliedFiltersArray[array].type == "tags") {
                tagsAllVal += appliedFiltersArray[array].value.toLowerCase() + ","
            }
            if (appliedFiltersArray[array].type == "author") {
                authorAllVal = "author_" + appliedFiltersArray[array].value.toLowerCase();
            }
        }
        if (authorAllVal !== "") {
            if (tagsAllVal == "") {
                tagsAllVal = "story,"
            }
        }
        if (filterByDate == true) {
            baseAPIUrlForArticles = `${baseAPIUrlForArticles}_by_date?query=${articleSearchInputVal}&page=${pageNumber}&tags=(${tagsAllVal}),${authorAllVal}`
        } else{
            baseAPIUrlForArticles = `${baseAPIUrlForArticles}?query=${articleSearchInputVal}&page=${pageNumber}&tags=(${tagsAllVal}),${authorAllVal}`
        }
        console.log(baseAPIUrlForArticles)
        apiRunningFun(baseAPIUrlForArticles)
    }
}

apiRunningFun(apiUrlForArticles)
function apiRunningFun(e){
    fetch(e)
    .then(response => response.json())
    .then((jsonData) => {
        console.log(jsonData);
        creatingArticlesFunc(jsonData.hits, jsonData.page, jsonData.nbPages, jsonData.nbHits, jsonData.processingTimeMS);
    })
    .catch((error) => {
        console.log(error);
    });
}

function creatingArticlesFunc(articles, currentPageNum ,numberOfPages, articlesAmount, processingTime){
    if (articlesAmount !== 0) {
        document.querySelector(".articles-main-container-sub-heading").style.display = "block";
        if (searchedThroughInput == true) {
            if (numberOfPages > 5) {
                numberOfPages = 5;
            }
            document.querySelector(".articles-main-container-pagination").innerHTML = "";
            document.querySelector(".articles-main-container-pagination").style.display = "flex";
            for (let i = 0; i < numberOfPages; i++) {
                const newButton = document.createElement("button");
                newButton.dataset.paginationValue = i;
                newButton.innerHTML = i + 1;
                document.querySelector(".articles-main-container-pagination").appendChild(newButton);
            }
            document.querySelectorAll(".articles-main-container-pagination button:not(.active-pagination)").forEach(ele => {
                ele.addEventListener('click', articlePaginationClickFunc)
            });
            document.querySelector(`[data-pagination-value="${currentPageNum}"]`).classList.add("active-pagination")
        }
        if (document.querySelector("#search-input").value !== "") {
            document.querySelector(".articles-main-container-sub-heading").innerHTML = `Showing <b>${articles.length}</b> result(s) for <b>"${document.querySelector("#search-input").value}"</b> in ${processingTime/1000}s`;
        } else {
            document.querySelector(".articles-main-container-sub-heading").innerHTML = `Showing <b>${articles.length}</b> result(s) in ${processingTime/1000}s`;
        }
        document.querySelector(".articles-main-container").innerHTML = "";
        articles.forEach(ele => {
            const newAnchor = document.createElement("a");
            newAnchor.className = "articles-container d-flex d-flex-dir-col d-flex-just-cent";
            newAnchor.dataset.articleId = ele.objectID;
            let pointsAmount = ele.points;
            if (pointsAmount == null) {
                pointsAmount = 0;
            }
            let commentsAmount = ele.num_comments;
            if (commentsAmount == null) {
                commentsAmount = 0;
            }
            let articleTitle = ele.title;
            if (articleTitle == null) {
                if (ele.comment_text == null) {
                    articleTitle = "Poll: " + ele.story_text;
                } else if(ele.story_text == null){
                    articleTitle = "Comment: " + ele.comment_text;
                } else {
                    articleTitle = "Couldn't find title"
                }
            }
            newAnchor.innerHTML = `<h3 class="articles-container-heading" title="${articleTitle}">${articleTitle}</h3>
            <div class="articles-container-created-date">${articleDateConverterFunc(ele.created_at)}</div>
            <div class="articles-container-info-main d-flex">
                <div class="articles-container-info articles-container-info-author d-flex" title="Author: ${ele.author}">
                    <span class="articles-container-info-icon"><i class="fa-solid fa-user"></i></span>
                    <span class="articles-container-info-details d-flex d-flex-dir-col">
                        <span>Author</span>
                        <span>${ele.author}</span>
                    </span>
                </div>
                <div class="articles-container-info articles-container-info-points d-flex" title="Points: ${pointsAmount}">
                    <span class="articles-container-info-icon"><i class="fa-solid fa-coins"></i></span>
                    <span class="articles-container-info-details d-flex d-flex-dir-col">
                        <span>Point</span>
                        <span>${pointsAmount}</span>
                    </span>
                </div>
                <div class="articles-container-info articles-container-info-comments d-flex" title="Comments: ${commentsAmount}">
                    <span class="articles-container-info-icon"><i class="fa-solid fa-message"></i></span>
                    <span class="articles-container-info-details d-flex d-flex-dir-col">
                        <span>Comment</span>
                        <span>${commentsAmount}</span>
                    </span>
                </div>
            </div>
            <div class="articles-container-tags-main d-flex">Tag:
                <div class="articles-container-tags-main-container d-flex">
                </div>
            </div>`;
            document.querySelector(".articles-main-container").appendChild(newAnchor);
            // newAnchor.addEventListener('click', searchAppliedFiltersBtnRemoveFunc)
            let randomArticleColor = randomColorGenerator();
            newAnchor.style.setProperty("--article-color", `rgb(${randomArticleColor})`);
            newAnchor.style.backgroundColor = `rgba(${randomArticleColor}, 0.15)`;
            
            ele._tags.forEach(e => {
                const newButton = document.createElement("button");
                if (e.match("author_")) {
                    newButton.title = "Author: " + e.replace("author_", '');
                    newButton.dataset.filterArticleType = "author";
                    newButton.dataset.filterArticleValue = e.replace("author_", '');
                    newButton.innerHTML = e.replace("author_", '');
                } else if(e.match("story_")){
                    newButton.title = "Tag: " + e.replace("story_", '');
                    newButton.dataset.filterArticleType = "tags";
                    newButton.dataset.filterArticleValue = e.replace("story_", '');
                    newButton.innerHTML = e.replace("story_", '');
                    if (e.replace("story_", '').match(/^[0-9]+$/)) {
                        return
                    }
                } else{
                    newButton.title = "Tag: " + e;
                    newButton.dataset.filterArticleType = "tags";
                    newButton.dataset.filterArticleValue = e;
                    newButton.innerHTML = e;
                }
                newButton.addEventListener('click', articleFilterAddingFunc)
                newAnchor.querySelector(".articles-container-tags-main-container").appendChild(newButton);
            });
        });
        function minArticleHeadingHeight() {
            let articleHeading = document.querySelectorAll(".articles-container-heading")
            let lengths = Array.from(articleHeading).map(e => e.offsetHeight);
            let maxHeight = Math.max(...lengths);
            for (let i = 0; i < articleHeading.length; i++) {
              articleHeading[i].style.minHeight = maxHeight + "px"
            }
            
        }
        minArticleHeadingHeight()
    } else{
        document.querySelector(".articles-main-container-sub-heading").innerHTML = "";
        document.querySelector(".articles-main-container-sub-heading").style.display = "none";
    }
}

function articleFilterAddingFunc(){
    let filterArrayVal = {};
    let articleAddingFilterType = this.dataset.filterArticleType;
    let articleAddingFilterValue = this.dataset.filterArticleValue;
    if (document.querySelector('[data-filter-added-type="author"]')) {
        if (articleAddingFilterType == "author") {
            actionStatus = "error";
            actionMessage = "You can only filter through one author";
            showActionMessageFunc();
            return
        }
    }
    for (let i = 0; i < appliedFiltersArray.length; i++) {
        //Checking if value is already present
        if (appliedFiltersArray[i].type == articleAddingFilterType && appliedFiltersArray[i].value == articleAddingFilterValue){
            actionStatus = "error";
            actionMessage = "Same filter is already present";
            showActionMessageFunc();
            return
        }
    }
    filterArrayVal.type = articleAddingFilterType;
    filterArrayVal.value = articleAddingFilterValue;
    appliedFiltersArray.push(filterArrayVal);
    creatingAppliedFilterBtnsFunc(filterArrayVal);
}

function articleDateConverterFunc(e){
    const date = new Date(e)
    let monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let currentMonth = monthsName[date.getMonth()]
    return `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`
}

function randomColorGenerator() {
    let r = Math.floor(Math.random()*(181));
    let g = Math.floor(Math.random()*(181));
    let b = Math.floor(Math.random()*(181));
    console.log()
    return `${r}, ${g}, ${b}`;
}

function articlePaginationClickFunc(){
    pageNumber = this.dataset.paginationValue;
    updatingURLForAPIFunc()
}