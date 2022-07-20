let searchedObjectId = "";
let apiUrlForArticles = `http://hn.algolia.com/api/v1/items/${searchedObjectId}`;

window.addEventListener("load", () => {
    if (window.location.href.split('?').length > 1) {
        if (window.location.href.split('?')[1].split('object_id=').length > 1) {
            searchedObjectId = window.location.href.split('?')[1].split('object_id=')[1];
        }
    }
    if (searchedObjectId == "" || searchedObjectId == null) {
        if (localStorage.getItem("searched-article-id")) {
            searchedObjectId = localStorage.getItem("searched-article-id");
        } else {
            searchedObjectId = "";
        }
        window.location.replace(`../Template/Details.html?object_id=${searchedObjectId}`);
    }
    apiUrlForArticles = `http://hn.algolia.com/api/v1/items/${searchedObjectId}`;
    apiRunningFun(apiUrlForArticles)
})


function apiRunningFun(e) {
    fetch(e)
        .then(response => response.json())
        .then((jsonData) => {
            console.log(jsonData)
            articleCreatorFunc(jsonData);
        })
        .catch((error) => {
            console.log(error)
            document.querySelector("main").innerHTML = `<div class="fetch-api-error-container d-flex d-flex-just-cent">
            <img src="../Images/error-occured-image.svg">
            <p>Unexpected error :( , we are doing our best to resolve<br>Try to <button onclick="location.reload();">Reload</button> page<br><br><a href="../Template/Index.html">Go to home page</a></p>
        </div>`
        });
}

function articleCreatorFunc(jsonData) {
    let articleTitle = jsonData.title;
    let pointsAmount = jsonData.points;
    if (articleTitle == null) {
        if (jsonData.text !== null) {
            if (jsonData.type == "comment") {
                articleTitle = "Comment:" + removingParagraphTag(jsonData.text);
            } else {
                articleTitle = "Poll option:" + removingParagraphTag(jsonData.text);
            }
        } else {
            articleTitle = "Couldn't find title";
        }
    }
    if (pointsAmount == null) {
        pointsAmount = 0;
    }

    document.querySelector("main").innerHTML = `<div class="article-main-container d-flex d-flex-dir-col">
    <div class="article-main-container-top-section d-flex d-flex-dir-col">
        <span class="article-type-container">${jsonData.type}</span>
        <h1 class="article-title-container">${articleTitle}</h1>
        <h3 class="d-flex">
            <span class="article-creating-date-container">${articleDateConverterFunc(jsonData.created_at)}</span>
            <span class="dot"><i class="fa-solid fa-circle"></i></span>
            <span class="article-author-container">${jsonData.author}</span>
        </h3>
        <div class="article-main-container-top-section-extra-info d-flex">
            <div class="articles-container-info articles-container-info-points d-flex">
                <span class="articles-container-info-icon"><i class="fa-solid fa-coins"></i></span>
                <span class="articles-container-info-details d-flex d-flex-dir-col">
                    <span>Point</span>
                    <span>${pointsAmount}</span>
                </span>
            </div>
            <div class="articles-container-info articles-container-info-comments d-flex">
                <span class="articles-container-info-icon"><i class="fa-solid fa-message"></i></span>
                <span class="articles-container-info-details d-flex d-flex-dir-col">
                    <span>Comment</span>
                    <span class="comment-amount">0</span>
                </span>
            </div>
        </div>
        <div class="article-extra-details-container">
        </div>
    </div>

    <div class="article-main-container-comment-section">
        <h3 class="articles-main-container-heading">Comments</h3>
        <div class="article-coments-main-container">
            <ul>
            </ul>
        </div>
    </div>
</div>`

    document.querySelector(".comment-amount").innerHTML = document.querySelectorAll("li").length
    if (jsonData.type == "story") {
        if (jsonData.url !== null) {
            document.querySelector(".article-extra-details-container").innerHTML = `<a href="${jsonData.url}" target="_blank">Read article <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
        } else {
            document.querySelector(".article-extra-details-container").style.display = "none";
        }
    } else if (jsonData.type == "poll") {
        if (jsonData.options.length > 0) {
            document.querySelector(".article-extra-details-container").innerHTML = `<div class="option-container d-flex d-flex-dir-col">Option(s)<div class="option-btn-container d-flex"></div></div>`;
            jsonData.options.forEach(ele => {
                const newButton = document.createElement("button");
                newButton.innerHTML = removingParagraphTag(ele.text);
                document.querySelector(".option-btn-container").appendChild(newButton);
            });
        } else {
            document.querySelector(".article-extra-details-container").style.display = "none";
        }
    } else {
        document.querySelector(".article-extra-details-container").style.display = "none";
    }
}

function removingParagraphTag(e) {
    return e.replace("<p>", "").replace("</p>", "")
}