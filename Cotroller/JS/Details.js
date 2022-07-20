let searchedObjectId ="";
let apiUrlForArticles = `http://hn.algolia.com/api/v1/items/${searchedObjectId}`;

window.addEventListener("load", () => {
    console.log(searchedObjectId)
    if (window.location.href.split('?').length > 1) {
        if (window.location.href.split('?')[1].split('object_id=').length > 1) {
            searchedObjectId = window.location.href.split('?')[1].split('object_id=')[1];
        }
    }
    if (searchedObjectId == "" || searchedObjectId == null ) {
        if (localStorage.getItem("searched-article-id")) {
            searchedObjectId = localStorage.getItem("searched-article-id");
        } else {
            searchedObjectId = "";
        }
        window.location.replace(`../Template/Details.html?object_id=${searchedObjectId}`);
    }
    console.log(searchedObjectId)
    apiUrlForArticles = `http://hn.algolia.com/api/v1/items/${searchedObjectId}`;
    apiRunningFun(apiUrlForArticles)
})


function apiRunningFun(e) {
    fetch(e)
        .then(response => response.json())
        .then((jsonData) => {
            console.log(jsonData);
            // creatingArticlesFunc(jsonData.hits, jsonData.page, jsonData.nbPages, jsonData.nbHits, jsonData.processingTimeMS);
        })
        .catch((error) => {
            document.querySelector("main").innerHTML = `<div class="fetch-api-error-container d-flex d-flex-just-cent">
            <img src="../Images/error-occured-image.svg">
            <p>Unexpected error :( , we are doing our best to resolve<br>Try to <button onclick="location.reload();">Reload</button> page<br><br><a href="../Template/Index.html">Go to home page</a></p>
        </div>`
    });
}