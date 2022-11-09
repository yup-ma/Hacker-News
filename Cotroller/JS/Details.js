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
                <span class="dot">·</span>
                <span class="article-author-container">${jsonData.author}</span>
            </h3>
            <div class="article-main-container-top-section-extra-info d-flex">
                <div class="articles-container-info articles-container-info-points d-flex">
                    <span class="articles-container-info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                            <path d="M512,80c0,18-14.3,34.6-38.4,48-29.1,16.1-72.5,27.5-122.3,30.9-3.7-1.8-7.4-3.5-11.3-5C300.6,137.4,248.2,128,192,128c-8.3,0-16.4.2-24.5.6l-1.1-.6C142.3,114.6,128,98,128,80c0-44.2,86-80,192-80S512,35.8,512,80ZM160.7,161.1c10.2-.7,20.7-1.1,31.3-1.1,62.2,0,117.4,12.3,152.5,31.4C369.3,204.9,384,221.7,384,240a33.591,33.591,0,0,1-2.1,11.7c-4.6,13.2-17,25.3-35,35.5h0c-.1.1-.3.1-.4.2h0c-.3.2-.6.3-.9.5-35,19.4-90.8,32-153.6,32-59.6,0-112.9-11.3-148.2-29.1-1.9-.9-3.7-1.9-5.5-2.9C14.3,274.6,0,258,0,240c0-34.8,53.4-64.5,128-75.4C138.5,163.1,149.4,161.9,160.7,161.1ZM416,240c0-21.9-10.6-39.9-24.1-53.4,28.3-4.4,54.2-11.4,76.2-20.5,16.3-6.8,31.5-15.2,43.9-25.5V176c0,19.3-16.5,37.1-43.8,50.9-14.6,7.4-32.4,13.7-52.4,18.5.1-1.8.2-3.5.2-5.3Zm-32,96c0,18-14.3,34.6-38.4,48-1.8,1-3.6,1.9-5.5,2.9C304.9,404.7,251.6,416,192,416c-62.8,0-118.6-12.6-153.6-32C14.3,370.6,0,354,0,336V300.6c12.5,10.3,27.6,18.7,43.9,25.5C83.4,342.6,135.8,352,192,352s108.6-9.4,148.1-25.9a201.867,201.867,0,0,0,22.4-10.9A158.868,158.868,0,0,0,379.7,304c1.5-1.1,2.9-2.3,4.3-3.4V336Zm32,0V278.1a309.941,309.941,0,0,0,52.1-16c16.3-6.8,31.5-15.2,43.9-25.5V272c0,10.5-5,21-14.9,30.9-16.3,16.3-45,29.7-81.3,38.4C415.9,339.6,416,337.8,416,336ZM192,448c56.2,0,108.6-9.4,148.1-25.9,16.3-6.8,31.5-15.2,43.9-25.5V432c0,44.2-86,80-192,80S0,476.2,0,432V396.6c12.5,10.3,27.6,18.7,43.9,25.5C83.4,438.6,135.8,448,192,448Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <span class="articles-container-info-details d-flex d-flex-dir-col">
                        <span>Point</span>
                        <span>${pointsAmount}</span>
                    </span>
                </div>
                <div class="articles-container-info articles-container-info-comments d-flex">
                    <span class="articles-container-info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 511.978">
                            <path d="M64,0A64.059,64.059,0,0,0,0,64V352a64.059,64.059,0,0,0,64,64h96v80a15.924,15.924,0,0,0,8.8,14.3,16.191,16.191,0,0,0,16.8-1.5L309.3,416H448a64.059,64.059,0,0,0,64-64V64A64.059,64.059,0,0,0,448,0Z" fill="currentColor"/>
                        </svg>
                    </span>
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
            document.querySelector(".article-extra-details-container").innerHTML = `<a href="${jsonData.url}" target="_blank" class="article-extra-details-container-link">Read article
                <svg width="16" height="16" viewBox="0 0 512 512">
                    <path
                        d="m498 0l-164 0c-8 0-14 7-14 15l0 33c0 4 2 7 4 10 3 3 7 4 11 4l73-2 2 2-278 278c-3 3-4 6-4 9 0 3 1 6 4 8l23 23c2 3 5 4 8 4 3 0 6-1 9-4l278-278 2 2-2 73c0 4 1 8 4 11 3 2 6 4 10 4l33 0c8 0 15-6 15-14l0-164c0-8-6-14-14-14z m-66 288l-16 0c-9 0-16 7-16 16l0 154c0 3-3 6-6 6l-340 0c-3 0-6-3-6-6l0-340c0-3 3-6 6-6l154 0c9 0 16-7 16-16l0-16c0-9-7-16-16-16l-160 0c-27 0-48 21-48 48l0 352c0 27 21 48 48 48l352 0c27 0 48-21 48-48l0-160c0-9-7-16-16-16z"
                        fill="currentColor"></path>
                </svg>
            </a>`;
        } else {
            if (jsonData.text !== null) {
                document.querySelector(".article-extra-details-container").innerHTML = "Description:" + jsonData.text;
            } else {
                document.querySelector(".article-extra-details-container").style.display = "none";
            }
        }
        heading = document.querySelector(".article-title-container").innerHTML;
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
        heading = document.querySelector(".article-title-container").innerHTML;
    } else if (jsonData.type == "job") {
        if (jsonData.url !== null && jsonData.url !== "") {
            document.querySelector(".article-extra-details-container").innerHTML = `<a href="${jsonData.url}" target="_blank" class="article-extra-details-container-link">Job link     
                <svg width="16" height="16" viewBox="0 0 512 512">
                    <path
                        d="m498 0l-164 0c-8 0-14 7-14 15l0 33c0 4 2 7 4 10 3 3 7 4 11 4l73-2 2 2-278 278c-3 3-4 6-4 9 0 3 1 6 4 8l23 23c2 3 5 4 8 4 3 0 6-1 9-4l278-278 2 2-2 73c0 4 1 8 4 11 3 2 6 4 10 4l33 0c8 0 15-6 15-14l0-164c0-8-6-14-14-14z m-66 288l-16 0c-9 0-16 7-16 16l0 154c0 3-3 6-6 6l-340 0c-3 0-6-3-6-6l0-340c0-3 3-6 6-6l154 0c9 0 16-7 16-16l0-16c0-9-7-16-16-16l-160 0c-27 0-48 21-48 48l0 352c0 27 21 48 48 48l352 0c27 0 48-21 48-48l0-160c0-9-7-16-16-16z"
                        fill="currentColor"></path>
                </svg>
            </a>`;
        } else {
            if (jsonData.text !== null) {
                document.querySelector(".article-extra-details-container").innerHTML = "Description:" + jsonData.text;
            } else {
                document.querySelector(".article-extra-details-container").style.display = "none";
            }
        }
        heading = 'Job: ' + document.querySelector(".article-title-container").innerHTML;
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
        <p>Opps, Couldn't find any comment</p>
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
        newButton.className = " d-flex justify-content-center";
        newDiv1.innerHTML = `<span>${ele.author}</span><span title="Points: ${commentPointsAmt}">Pts: <b>${commentPointsAmt}</b></span><span>${commentTimestampCreatorFunc(ele.created_at_i)} ago</span>`;
        newP.className = "comment-paragraph";
        newP.innerHTML = ele.text;
        newLi.appendChild(newDiv1);
        newLi.appendChild(newP);
        if (ele.children.length > 0) {
            newButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 39.887 34.903">
                <path d="M15.971,32.2a2.5,2.5,0,0,1,1.48,2.275V39.46h8.725A13.712,13.712,0,0,1,39.887,53.172a15.277,15.277,0,0,1-7.806,13.563,1.277,1.277,0,0,1-.631.148,1.538,1.538,0,0,1-1.535-1.535,2.151,2.151,0,0,1,.763-1.519,5.823,5.823,0,0,0,1.729-4.417,7.481,7.481,0,0,0-7.479-7.479H17.451v4.986a2.5,2.5,0,0,1-4.16,1.854L.826,47.555A2.538,2.538,0,0,1,0,45.693a2.508,2.508,0,0,1,.826-1.854L13.291,32.62A2.474,2.474,0,0,1,15.971,32.2Z"
                    transform="translate(0 -31.98)" fill="currentColor" />
            </svg> Replies`;
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
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 39.887 34.903">
            <path d="M15.971,32.2a2.5,2.5,0,0,1,1.48,2.275V39.46h8.725A13.712,13.712,0,0,1,39.887,53.172a15.277,15.277,0,0,1-7.806,13.563,1.277,1.277,0,0,1-.631.148,1.538,1.538,0,0,1-1.535-1.535,2.151,2.151,0,0,1,.763-1.519,5.823,5.823,0,0,0,1.729-4.417,7.481,7.481,0,0,0-7.479-7.479H17.451v4.986a2.5,2.5,0,0,1-4.16,1.854L.826,47.555A2.538,2.538,0,0,1,0,45.693a2.508,2.508,0,0,1,.826-1.854L13.291,32.62A2.474,2.474,0,0,1,15.971,32.2Z"
                transform="translate(0 -31.98)" fill="currentColor" />
        </svg> Replies`;
    } else {
        this.classList.add("active");
        this.parentElement.querySelector(".sub-level-comment").style.display = "block";
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 39.887 34.903">
            <path d="M15.971,32.2a2.5,2.5,0,0,1,1.48,2.275V39.46h8.725A13.712,13.712,0,0,1,39.887,53.172a15.277,15.277,0,0,1-7.806,13.563,1.277,1.277,0,0,1-.631.148,1.538,1.538,0,0,1-1.535-1.535,2.151,2.151,0,0,1,.763-1.519,5.823,5.823,0,0,0,1.729-4.417,7.481,7.481,0,0,0-7.479-7.479H17.451v4.986a2.5,2.5,0,0,1-4.16,1.854L.826,47.555A2.538,2.538,0,0,1,0,45.693a2.508,2.508,0,0,1,.826-1.854L13.291,32.62A2.474,2.474,0,0,1,15.971,32.2Z"
                transform="translate(0 -31.98)" fill="currentColor" />
        </svg> Collapse`;
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
