let searchedObjectId = "";
let apiUrlForArticles = `https://hn.algolia.com/api/v1/items/${searchedObjectId}`;

//Running a test search on load of page
window.addEventListener("load", () => {
    //Taking object id param
    if (window.location.href.split('?').length > 1) {
        if (window.location.href.split('?')[1].split('object_id=').length > 1) {
            searchedObjectId = window.location.href.split('?')[1].split('object_id=')[1];
        }
    }
    //If param comes out null then we go to local storage
    if (searchedObjectId == "" || searchedObjectId == null) {
        if (localStorage.getItem("searched-article-id")) {
            searchedObjectId = localStorage.getItem("searched-article-id");
        } else {
            searchedObjectId = "NaN";
        }
        window.location.replace(`/Quality-Reads/Details.html?object_id=${searchedObjectId}`);
    }
    //Updating url with param
    apiUrlForArticles = `https://hn.algolia.com/api/v1/items/${searchedObjectId}`;
    apiRunningFunc(apiUrlForArticles)
})

//Running api to ecth data
function apiRunningFunc(e) {
    fetch(e)
        .then(response => response.json())
        .then((jsonData) => {
            //Current time while running this func
            currentTimeStampVar = new Date().getTime();
            articleCreatorFunc(jsonData);
        })
        //Catching any erros if api fails
        .catch((error) => {
            document.querySelector("main").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
            <img src="View/Images/error-occured-image.svg" alt="Faced an error">
            <p>Unexpected error :( , we are doing our best to resolve<br>Try to <button onclick="location.reload();">Reload</button> page<br><br><a href="/Quality-Reads">Go to home page</a></p>
        </div>`
        });
}

//Displaying article info based on fetched data
function articleCreatorFunc(jsonData) {
    let articleTitle = jsonData.title;
    let pointsAmount = jsonData.points;
    //Checking null stats of data
    if (articleTitle == null || articleTitle == "") {
        if (jsonData.text !== null) {
            if (jsonData.type == "comment") {
                articleTitle = "Comment: " + jsonData.text;
            } else {
                articleTitle = "Poll option: " + jsonData.text;
            }
        } else {
            articleTitle = "Couldn't find title";
        }
    }
    if (pointsAmount == null) {
        pointsAmount = 0;
    }
    document.title = articleTitle + " | Quality Reads"
    //Adding html for the data
    document.querySelector("main").innerHTML = `<div class="article-main-container d-flex d-flex-dir-col">
        <div class="article-main-container-top-section d-flex d-flex-dir-col">
            <span class="article-type-container">${jsonData.type}</span>
            <h1 class="article-title-container">${articleTitle}</h1>
            <h3 class="d-flex">
                <span class="article-creating-date-container">${articleDateConverterFunc(jsonData.created_at, jsonData.created_at_i)}</span>
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
            <div class="article-share-container d-flex d-flex-dir-col">
            </div>
        </div>

        <div class="article-main-container-comment-section">
            <h3 class="articles-main-container-heading">Comment(s)</h3>
            <div class="article-coments-main-container">
                <ul>
                </ul>
            </div>
        </div>
    </div>`

    //Updating a extra section based on tags like story, poll
    let heading = ""
    if (jsonData.type == "story") {
        if (jsonData.url !== null && jsonData.url !== "") {
            document.querySelector(".article-extra-details-container").innerHTML = `<a href="${jsonData.url}" target="_blank" class="article-extra-details-container-link">Read article <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
        } else {
            if (jsonData.text !== null) {
                document.querySelector(".article-extra-details-container").innerHTML = "Description:" + jsonData.text;
            } else {
                document.querySelector(".article-extra-details-container").style.display = "none";
            }
        }
        heading = '"' + document.querySelector(".article-title-container").innerHTML + '"';
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
        heading = 'Poll: "' + document.querySelector(".article-title-container").innerHTML + '"';
    } else if (jsonData.type == "job") {
        if (jsonData.url !== null && jsonData.url !== "") {
            document.querySelector(".article-extra-details-container").innerHTML = `<a href="${jsonData.url}" target="_blank" class="article-extra-details-container-link">Job link <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
        } else {
            if (jsonData.text !== null) {
                document.querySelector(".article-extra-details-container").innerHTML = "Description:" + jsonData.text;
            } else {
                document.querySelector(".article-extra-details-container").style.display = "none";
            }
        }
        heading = 'Job: "' + document.querySelector(".article-title-container").innerHTML + '"';
    } else {
        document.querySelector(".article-extra-details-container").style.display = "none";
    }

    if (hashtag !== "") {
        cumulativeSharingFunc(window.location.href, heading, hashtag, extraDetail)
    }

    //Checking if there are any comments
    if (jsonData.children.length > 0) {
        document.querySelector(".article-coments-main-container ul")
        addingCommentsToArticleFunc(document.querySelector(".article-coments-main-container ul"), jsonData.children)
    } else {
        document.querySelector(".article-coments-main-container").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
        <img src="View/Images/no-comments-found.svg" alt="No comments found">
        <p>Opps, Couldn't find any comment</a>
    </div>`;
    }
    //Entering comments amount based on all stats after removing comments with no auth or text
    document.querySelector(".comment-amount").innerHTML = commentCountVar;
}

//Removing paragraph tag for texts if required
function removingParagraphTag(e) {
    return e.replace("<p>", "").replace("</p>", "")
}

let commentCountVar = 0;
//Looping through all comments
function addingCommentsToArticleFunc(container, commentsArray) {
    commentsArray.forEach(ele => {
        let commentPointsAmt = ele.points;
        if (ele.author == null) {
            return
        } else if (ele.text == null) {
            return
        }
        commentCountVar++
        if (ele.points == null) {
            commentPointsAmt = 0;
        }
        //Adding auth, points, stamp, comment
        const newLi = document.createElement("li");
        const newDiv1 = document.createElement("div");
        const newP = document.createElement("p");
        const newButton = document.createElement("button");
        const newDiv2 = document.createElement("div");
        newDiv1.className = "comment-info";
        newDiv1.innerHTML = `<span>${ele.author}</span><span title="Points: ${commentPointsAmt}">Pts: <b>${commentPointsAmt}</b></span><span>${commentTimestampCreatorFunc(ele.created_at_i)} ago</span>`;
        newP.className = "comment-paragraph";
        newP.innerHTML = ele.text;
        newLi.appendChild(newDiv1);
        newLi.appendChild(newP);
        if (ele.children.length > 0) {
            newButton.innerHTML = `<i class="fa-solid fa-reply"></i> Replies`;
            newDiv2.className = "sub-level-comment";
            newButton.addEventListener('click', showMoreRepliesBtnFunc)
            newLi.appendChild(newButton);
            newLi.appendChild(newDiv2);
            //Running function again if comment have sub comments, it will be like loop until sub comments are completes
            addingCommentsToArticleFunc(newDiv2, ele.children);
        }
        container.appendChild(newLi);
    });
}

//Adding a toggle state to show more replies
function showMoreRepliesBtnFunc() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.parentElement.querySelector(".sub-level-comment").style.display = "none";
        this.innerHTML = `<i class="fa-solid fa-reply"></i> Replies`;
    } else {
        this.classList.add("active");
        this.parentElement.querySelector(".sub-level-comment").style.display = "block";
        this.innerHTML = `<i class="fa-solid fa-reply"></i> Collapse`;
    }
}

//Creating a timestamp like 1 min ago, 1year ago, based on comment time and current time
function commentTimestampCreatorFunc(commentTimeStampVar) {
    let timePassedSinceComment = currentTimeStampVar - commentTimeStampVar * 1000;
    if (timePassedSinceComment < timeMSUnitsObject.min) {
        return Math.floor(timePassedSinceComment / 1000) + ' sec';
    } else if (timePassedSinceComment < timeMSUnitsObject.hour) {
        return Math.floor(timePassedSinceComment / timeMSUnitsObject.min) + ' min';
    } else if (timePassedSinceComment < timeMSUnitsObject.day) {
        if (Math.floor(timePassedSinceComment / timeMSUnitsObject.hour) > 1) {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.hour) + ' hours';
        } else {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.hour) + ' hour';
        }
    } else if (timePassedSinceComment < timeMSUnitsObject.month) {
        if (Math.floor(timePassedSinceComment / timeMSUnitsObject.day) > 1) {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.day) + ' days';
        } else {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.day) + ' day';
        }
    } else if (timePassedSinceComment < timeMSUnitsObject.year) {
        if (Math.floor(timePassedSinceComment / timeMSUnitsObject.month) > 1) {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.month) + ' months';
        } else {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.month) + ' month';
        }
    } else {
        if (Math.floor(timePassedSinceComment / timeMSUnitsObject.year) > 1) {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.year) + ' years';
        } else {
            return Math.floor(timePassedSinceComment / timeMSUnitsObject.year) + ' year';
        }
    }
}

function sharingDropdownOpenFunc() {
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
