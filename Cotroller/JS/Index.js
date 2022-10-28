let appliedFiltersArray = [];
let apiUrlForArticles = `https://hn.algolia.com/api/v1/search?tags=front_page`;
let debounceInputTimer;
let searchedThroughInput = false;
let pageNumber = 0;

//Updating filters from local storage if any, on load of browser
window.addEventListener("load", () => {
    if (localStorage.getItem("applied-filters-array")) {
        let localStorageAppliedFiltersArray = JSON.parse(localStorage.getItem("applied-filters-array"));
        if (localStorageAppliedFiltersArray.length !== 0) {
            appliedFiltersArray = localStorageAppliedFiltersArray;
            localStorageAppliedFiltersArray.forEach(ele => {
                creatingAppliedFilterBtnsFunc(ele)
            });

            for (let i = 0; i < localStorageAppliedFiltersArray.length; i++) {
                if (appliedFiltersArray[i].type == "trival") {
                    document.querySelector(".trival-filter-value").innerHTML = appliedFiltersArray[i].value;
                }
            }
        }
    }
    updatingTextForFilterQuantityStateFunc();
})

document.querySelectorAll(".filter-btn:not(.filter-clear-btn)").forEach(ele => {
    ele.addEventListener('click', filterSearchDropwDownOpeningFunc)
});

//Opening dropdowns for filters
function filterSearchDropwDownOpeningFunc() {
    if (document.querySelector(".active-filter-dropdown")) {
        document.querySelector(".active-filter-dropdown").classList.remove("active-filter-dropdown");
    }
    this.parentElement.classList.add("active-filter-dropdown");
    document.body.addEventListener('click', filterSearchDropwDownClosingFunc)
}

//Closing dropdowns for filters
function filterSearchDropwDownClosingFunc(e) {
    let currentTarget = document.querySelector(".active-filter-dropdown").contains(e.target);
    if (!currentTarget) { //clikced outside of box
        document.querySelector(".active-filter-dropdown").classList.remove("active-filter-dropdown");
        document.body.removeEventListener('click', filterSearchDropwDownClosingFunc)
    }
}

//Others and author option for filters as they are input so separated
document.querySelectorAll(".filter-dropdown-special-btn-container input").forEach(ele => {
    ele.addEventListener('input', filterDropdownInputFunc)
});

//Replacing any spaces in inputs of filter
function filterDropdownInputFunc() {
    this.value = this.value.replace(/\s+/g, '_');
    this.parentElement.dataset.optionValue = this.value
    if (this.value !== "") {
        this.parentElement.querySelector("button").style.display = "block";
    } else {
        this.parentElement.querySelector("button").style.display = "none";
    }
}

document.querySelectorAll(".filter-dropdown-special-btn").forEach(ele => {
    ele.addEventListener('click', filterDropdownSpecialInputAddTagFunc)
});

//Adding filters by taking value from input
function filterDropdownSpecialInputAddTagFunc() {
    let filterArrayVal = {};
    let addingFilterType = this.parentElement.parentElement.parentElement.dataset.filterType;
    let addingFilterValue = this.parentElement.dataset.optionValue;
    this.parentElement.parentElement.parentElement.classList.remove("active-filter-dropdown");
    this.parentElement.querySelector("input").value = "";
    document.body.removeEventListener('click', filterSearchDropwDownClosingFunc)
    for (let i = 0; i < appliedFiltersArray.length; i++) {
        //Checking if filter is already present
        if (appliedFiltersArray[i].type == addingFilterType && appliedFiltersArray[i].value == addingFilterValue) {
            actionStatus = "error";
            actionMessage = "Same filter is already present";
            //Showing error or success based on actionStatus
            showActionMessageFunc();
            return
        }
    }
    //Checking if author is already present
    if (document.querySelector('[data-filter-added-type="author"]')) {
        if (addingFilterType == "author") {
            actionStatus = "error";
            actionMessage = "You can only filter through one author";
            showActionMessageFunc();
            return
        }
    }
    //Comment and pollopt tags not allowed
    if (addingFilterValue.toLowerCase() == "comment") {
        actionStatus = "error";
        actionMessage = "We are adding more filters, for now comment is not available";
        showActionMessageFunc();
        return
    }
    if (addingFilterValue.toLowerCase() == "pollopt") {
        actionStatus = "error";
        actionMessage = "We are adding more filters, for now pollopt is not available";
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

//Adding filters when dropdown btn clicked
function filterDropdownBtnClickFunc() {
    let filterArrayVal = {};
    let addingFilterType = this.parentElement.parentElement.dataset.filterType;
    let addingFilterValue = this.dataset.optionValue;
    this.parentElement.parentElement.classList.remove("active-filter-dropdown");
    document.body.removeEventListener('click', filterSearchDropwDownClosingFunc)
    for (let i = 0; i < appliedFiltersArray.length; i++) {
        //Checking if value is already present
        if (appliedFiltersArray[i].type == addingFilterType && appliedFiltersArray[i].value == addingFilterValue) {
            actionStatus = "error";
            actionMessage = "Same filter is already present";
            showActionMessageFunc();
            return
        }
    }
    //Toggling fiters popularity and recent
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

//Updating filter quantity state like no filter applied,... 
function updatingTextForFilterQuantityStateFunc() {
    if (appliedFiltersArray.length == 0) {
        document.querySelector(".search-applied-filters-parent-container h3").innerHTML = "No filters applied";
        document.querySelector(".search-applied-filters-parent-container h3").style.textAlign = "center";
        document.querySelector(".filter-search-clear-filter").style.display = "none";

    } else {
        document.querySelector(".search-applied-filters-parent-container h3").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 384.15 447.975">
        <path data-name="Path 1" d="M169.4,470.6a32.049,32.049,0,0,0,45.3,0l160-160a32.032,32.032,0,1,0-45.3-45.3L224,370.8V64a32,32,0,0,0-64,0V370.7L54.6,265.4A32.032,32.032,0,0,0,9.3,310.7l160,160Z" transform="translate(0.075 -32)" fill="currentColor"/>
      </svg>
       Applied filters`;
        document.querySelector(".search-applied-filters-parent-container h3").style.textAlign = "left";
        document.querySelector(".filter-search-clear-filter").style.display = "block";
    }
}

//Clear filter btn to clear all filters
document.querySelector(".filter-search-clear-filter").addEventListener('click', filterClearFunc)
function filterClearFunc() {
    document.querySelectorAll(".search-applied-filters-btn").forEach(ele => {
        ele.click();
    });
}

//Creating applied filter btns so that user has a clue of applied filters and can remove them from there
function creatingAppliedFilterBtnsFunc(e) {
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
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 320.15 320.15">
        <path data-name="Path 1" d="M310.6,150.6a32.032,32.032,0,1,0-45.3-45.3L160,210.7,54.6,105.4A32.032,32.032,0,1,0,9.3,150.7L114.7,256,9.4,361.4a32.032,32.032,0,0,0,45.3,45.3L160,301.3,265.4,406.6a32.032,32.032,0,0,0,45.3-45.3L205.3,256Z" transform="translate(0.075 -95.925)" fill="currentColor"/>
    </svg>
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

//Removing function for applied filters
function searchAppliedFiltersBtnRemoveFunc() {
    let removingFilterType = this.dataset.filterAddedType;
    let removingFilterVal = this.dataset.filterAddedValue;
    let removingFilterArrayVal = {};
    removingFilterArrayVal.type = removingFilterType;
    removingFilterArrayVal.value = removingFilterVal;
    if (removingFilterType == "trival") {
        document.querySelector(".trival-filter-value").innerHTML = "Popularity";
    }
    this.remove();

    for (let i = 0; i < appliedFiltersArray.length; i++) {
        if (appliedFiltersArray[i].type == removingFilterType && appliedFiltersArray[i].value == removingFilterVal) {
            appliedFiltersArray.splice(i, 1)
        }
    }
    updatingTextForFilterQuantityStateFunc();

    actionStatus = "success";
    actionMessage = "Filter removed successfully";
    showActionMessageFunc();
    localStorage.setItem("applied-filters-array", JSON.stringify(appliedFiltersArray));
}

//Preventing reunning of api on consecutive presses so deboucing it
document.querySelector("#search-input").addEventListener('input', function () {
    clearTimeout(debounceInputTimer);
    debounceInputTimer = setTimeout(() => {
        updatingURLForAPIFunc();
    }, 800);
})

//Updating url based on query and filters
function updatingURLForAPIFunc() {
    searchedThroughInput = true;
    document.querySelector(".articles-main-container-heading").innerHTML = "Articles";
    let baseAPIUrlForArticles = `https://hn.algolia.com/api/v1/search`
    let articleSearchInputVal = document.querySelector("#search-input").value.replace(/\s+/g, '_');
    let tagsAllVal = "";
    let authorAllVal = "";
    let filterByDate = false;

    if (searchedThroughInput == false) {
        apiUrlForArticles = `https://hn.algolia.com/api/v1/search?tags=front_page`;
    } else {
        for (array in appliedFiltersArray) {
            if (appliedFiltersArray[array].type == "trival") {
                filterByDate = true;
            } else {
                filterByDate = false;
            }
            if (appliedFiltersArray[array].type == "tags") {
                tagsAllVal += appliedFiltersArray[array].value.toLowerCase() + ","
            }
            if (appliedFiltersArray[array].type == "author") {
                authorAllVal = "author_" + appliedFiltersArray[array].value;
            }
        }
        if (tagsAllVal == "") {
            tagsAllVal = "story,"
        }
        if (filterByDate == true) {
            baseAPIUrlForArticles = `${baseAPIUrlForArticles}_by_date?query=${articleSearchInputVal}&page=${pageNumber}&tags=(${tagsAllVal}),${authorAllVal}`
        } else {
            baseAPIUrlForArticles = `${baseAPIUrlForArticles}?query=${articleSearchInputVal}&page=${pageNumber}&tags=(${tagsAllVal}),${authorAllVal}`
        }
        apiRunningFunc(baseAPIUrlForArticles)
    }
}

apiRunningFunc(apiUrlForArticles)
//Running the api with the url provided as argument
function apiRunningFunc(e) {
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
    fetch(e)
        .then(response => response.json())
        .then((jsonData) => {
            currentTimeStampVar = new Date().getTime()
            creatingArticlesFunc(jsonData.hits, jsonData.page, jsonData.nbPages, jsonData.nbHits, jsonData.processingTimeMS);
        })
        //Handling errors
        .catch((error) => {
            console.log(error)
            document.querySelector(".articles-main-container-pagination").innerHTML = "";
            document.querySelector(".articles-main-container-sub-heading").innerHTML = "";
            document.querySelector(".articles-main-container").innerHTML = "";
            document.querySelector(".articles-main-container-sub-heading").style.display = "none";
            document.querySelector(".articles-main-container").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
                <img src="View/Images/error-occured-image.svg" alt="Faced an error">
                <p>Unexpected error :( , we are doing our best to resolve<br>Try to <button onclick="location.reload();">Reload</button> page</p>
            </div>`
        });
}

//Creating search results based on data from api
function creatingArticlesFunc(articles, currentPageNum, numberOfPages, articlesAmount, processingTime) {
    document.querySelector(".articles-main-container-pagination").innerHTML = "";
    document.querySelector(".articles-main-container-sub-heading").innerHTML = "";
    document.querySelector(".articles-main-container").innerHTML = "";
    if (articlesAmount !== 0) {
        document.querySelector(".articles-main-container-sub-heading").style.display = "block";
        if (searchedThroughInput == true) {
            if (numberOfPages > 5) {
                numberOfPages = 5;
            }
            document.querySelector(".articles-main-container-pagination").style.display = "flex";
            for (let i = 0; i < numberOfPages; i++) {
                const newButton = document.createElement("button");
                newButton.dataset.paginationValue = i;
                newButton.innerHTML = i + 1;
                document.querySelector(".articles-main-container-pagination").appendChild(newButton);
            }
            document.querySelectorAll(".articles-main-container-pagination button").forEach(ele => {
                ele.addEventListener('click', articlePaginationClickFunc)
            });
            document.querySelector(`[data-pagination-value="${currentPageNum}"]`).classList.add("active-pagination");
        }
        if (document.querySelector("#search-input").value !== "") {
            document.querySelector(".articles-main-container-sub-heading").innerHTML = `Showing <b>${articles.length}</b> result(s) for <b>"${document.querySelector("#search-input").value}"</b> in ${processingTime / 1000}s`;
        } else {
            document.querySelector(".articles-main-container-sub-heading").innerHTML = `Showing <b>${articles.length}</b> result(s) in ${processingTime / 1000}s`;
        }
        articles.forEach(ele => {
            const newAnchor = document.createElement("a");
            newAnchor.href = `Details.html?object_id=${ele.objectID}`;
            newAnchor.className = "articles-container d-flex d-flex-dir-col justify-content-center";
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
            if (articleTitle == null || articleTitle == "") {
                if (ele.comment_text !== null) {
                    articleTitle = "Comment: " + ele.comment_text;
                } else if (ele.story_text !== null) {
                    articleTitle = "Poll: " + ele.story_text;
                } else {
                    articleTitle = "Couldn't find title"
                }
            }
            newAnchor.innerHTML = `<div class="article-share-container d-flex d-flex-dir-col">
                <button class="article-share-btn" title="Share it">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 448">
                        <path data-name="Path 1" d="M352,224a96,96,0,1,0-96-96,93.886,93.886,0,0,0,.7,11.9l-94.1,47a96,96,0,1,0,0,138.2l94.1,47A92.8,92.8,0,0,0,256,384a96.071,96.071,0,1,0,29.4-69.1l-94.1-47a101.5,101.5,0,0,0,0-23.8l94.1-47A95.237,95.237,0,0,0,352,224Z" transform="translate(0 -32)" fill="currentColor"/>
                    </svg>
                    <span class="hidden-ele">Share</span>
                </button>
                <div class="share-options-container d-flex d-flex-dir-col">
                </div>
            </div>
            <h3 class="articles-container-heading" title="${articleTitle}">${articleTitle}</h3>
            <div class="articles-container-created-date">${articleDateConverterFunc(ele.created_at, ele.created_at_i)}</div>
            <div class="articles-container-info-main d-flex">
                <div class="articles-container-info articles-container-info-author d-flex" title="Author: ${ele.author}">
                    <span class="articles-container-info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512">
                            <path data-name="Path 1" d="M224,256A128,128,0,1,0,96,128,127.99,127.99,0,0,0,224,256Zm-45.7,48A178.265,178.265,0,0,0,0,482.3,29.7,29.7,0,0,0,29.7,512H418.3A29.7,29.7,0,0,0,448,482.3,178.265,178.265,0,0,0,269.7,304Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <span class="articles-container-info-details d-flex d-flex-dir-col">
                        <span>Author</span>
                        <span>${ele.author}</span>
                    </span>
                </div>
                <div class="articles-container-info articles-container-info-points d-flex" title="Points: ${pointsAmount}">
                    <span class="articles-container-info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                            <path data-name="Path 1" d="M512,80c0,18-14.3,34.6-38.4,48-29.1,16.1-72.5,27.5-122.3,30.9-3.7-1.8-7.4-3.5-11.3-5C300.6,137.4,248.2,128,192,128c-8.3,0-16.4.2-24.5.6l-1.1-.6C142.3,114.6,128,98,128,80c0-44.2,86-80,192-80S512,35.8,512,80ZM160.7,161.1c10.2-.7,20.7-1.1,31.3-1.1,62.2,0,117.4,12.3,152.5,31.4C369.3,204.9,384,221.7,384,240a33.591,33.591,0,0,1-2.1,11.7c-4.6,13.2-17,25.3-35,35.5h0c-.1.1-.3.1-.4.2h0c-.3.2-.6.3-.9.5-35,19.4-90.8,32-153.6,32-59.6,0-112.9-11.3-148.2-29.1-1.9-.9-3.7-1.9-5.5-2.9C14.3,274.6,0,258,0,240c0-34.8,53.4-64.5,128-75.4C138.5,163.1,149.4,161.9,160.7,161.1ZM416,240c0-21.9-10.6-39.9-24.1-53.4,28.3-4.4,54.2-11.4,76.2-20.5,16.3-6.8,31.5-15.2,43.9-25.5V176c0,19.3-16.5,37.1-43.8,50.9-14.6,7.4-32.4,13.7-52.4,18.5.1-1.8.2-3.5.2-5.3Zm-32,96c0,18-14.3,34.6-38.4,48-1.8,1-3.6,1.9-5.5,2.9C304.9,404.7,251.6,416,192,416c-62.8,0-118.6-12.6-153.6-32C14.3,370.6,0,354,0,336V300.6c12.5,10.3,27.6,18.7,43.9,25.5C83.4,342.6,135.8,352,192,352s108.6-9.4,148.1-25.9a201.867,201.867,0,0,0,22.4-10.9A158.868,158.868,0,0,0,379.7,304c1.5-1.1,2.9-2.3,4.3-3.4V336Zm32,0V278.1a309.941,309.941,0,0,0,52.1-16c16.3-6.8,31.5-15.2,43.9-25.5V272c0,10.5-5,21-14.9,30.9-16.3,16.3-45,29.7-81.3,38.4C415.9,339.6,416,337.8,416,336ZM192,448c56.2,0,108.6-9.4,148.1-25.9,16.3-6.8,31.5-15.2,43.9-25.5V432c0,44.2-86,80-192,80S0,476.2,0,432V396.6c12.5,10.3,27.6,18.7,43.9,25.5C83.4,438.6,135.8,448,192,448Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <span class="articles-container-info-details d-flex d-flex-dir-col">
                        <span>Point</span>
                        <span>${pointsAmount}</span>
                    </span>
                </div>
                <div class="articles-container-info articles-container-info-comments d-flex" title="Comments: ${commentsAmount}">
                    <span class="articles-container-info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 511.978">
                            <path data-name="Path 1" d="M64,0A64.059,64.059,0,0,0,0,64V352a64.059,64.059,0,0,0,64,64h96v80a15.924,15.924,0,0,0,8.8,14.3,16.191,16.191,0,0,0,16.8-1.5L309.3,416H448a64.059,64.059,0,0,0,64-64V64A64.059,64.059,0,0,0,448,0Z" fill="currentColor"/>
                        </svg>
                    </span>
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
            articleBlocksSharingFunc(newAnchor.querySelector(".share-options-container"), newAnchor.href, articleTitle)
            document.querySelector(".articles-main-container").appendChild(newAnchor);
            newAnchor.addEventListener('click', articleClickedFunc)
            newAnchor.querySelector(".article-share-container:not(a)").addEventListener('click', shareOptionsPrevDefaultFunc)
            newAnchor.querySelector(".article-share-btn").addEventListener('click', shareOptionsOpenerFunc)
            let randomArticleColor = randomColorGenerator();
            newAnchor.style.setProperty("--article-color", `rgb(${randomArticleColor})`);
            newAnchor.style.setProperty("--article-bg-color", `${randomArticleColor}`);

            ele._tags.forEach(e => {
                const newButton = document.createElement("button");
                if (e.match("author_")) {
                    newButton.title = "Author: " + e.replace("author_", '');
                    newButton.dataset.filterArticleType = "author";
                    newButton.dataset.filterArticleValue = e.replace("author_", '');
                    newButton.innerHTML = e.replace("author_", '');
                } else if (e.match("story_")) {
                    newButton.title = "Tag: " + e.replace("story_", '');
                    newButton.dataset.filterArticleType = "tags";
                    newButton.dataset.filterArticleValue = e.replace("story_", '');
                    newButton.innerHTML = e.replace("story_", '');
                    if (e.replace("story_", '').match(/^[0-9]+$/)) {
                        return
                    }
                } else {
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
    } else {
        document.querySelector(".articles-main-container-sub-heading").style.display = "none";
        document.querySelector(".articles-main-container").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
            <img src="View/Images/empty-list-image.svg" alt="Couldn't find any results">
            <p>Opps, Couldn't find any article<br>Don't worry<br>Try out different <a href="#search-input-parent-container">filters</a> and <a href="#search-input-parent-container">search query</a>
        </div>`;
    }
}

function shareOptionsPrevDefaultFunc() {
    event.preventDefault();
}

function shareOptionsOpenerFunc() {
    if (document.querySelector(".active-share-dropdown")) {
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
    }
    this.parentElement.classList.add("active-share-dropdown");
    document.body.addEventListener('click', sharingDropdownClosingFunc)
}
// Closing dropdowns for filters
function sharingDropdownClosingFunc(e) {
    let currentTarget = document.querySelector(".active-share-dropdown").contains(e.target);
    if (!currentTarget) { //clikced outside of box
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    }
}

//We can add filtes from search results by clicking tags
function articleFilterAddingFunc() {
    event.preventDefault();

    let filterArrayVal = {};
    let articleAddingFilterType = this.dataset.filterArticleType;
    let articleAddingFilterValue = this.dataset.filterArticleValue;
    //Will check if that tags already exits or there is already one author filter
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
        if (appliedFiltersArray[i].type == articleAddingFilterType && appliedFiltersArray[i].value == articleAddingFilterValue) {
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

//Function that runs when pagination btns clicked, this will run api again with updated page
function articlePaginationClickFunc() {
    pageNumber = this.dataset.paginationValue;
    updatingURLForAPIFunc()
}

//Set local storage for the object id of clicked article as a fallback
function articleClickedFunc() {
    localStorage.setItem("searched-article-id", this.dataset.articleId);
}

document.querySelector(".dark-light-mode-switch input").addEventListener('click', anotherUpdateThemeFunc)

function anotherUpdateThemeFunc() {
    searchedThroughInput = false;
    document.querySelector(".articles-main-container-heading").innerHTML = "Recent articles";
    apiRunningFunc(apiUrlForArticles)
}