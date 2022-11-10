quoteTypeDetailArray = [
    { type: "inspirational", url: "https://type.fit/api/quotes" },
    { type: "advice", url: "https://api.adviceslip.com/advice" },
    { type: "thisthat", url: "https://itsthisforthat.com/api.php?json" },
    { type: "tronalddump", url: "https://www.tronalddump.io/random/quote" },
    { type: "chucknorris", url: "https://api.chucknorris.io/jokes/random" }
]
let quotesAPIUrl = "https://type.fit/api/quotes"
let quotesCompleteArray = [];
let reRunQuoteAPI;
let activeAPIName = "inspirational";

document.querySelectorAll(".quote-type").forEach(ele => {
    ele.addEventListener('click', changeQuoteTypeFunc)
});

function changeQuoteTypeFunc() {
    if (this.parentElement.querySelector(".active-quote-type")) {
        this.parentElement.querySelector(".active-quote-type").classList.remove("active-quote-type")
    }
    this.classList.add("active-quote-type")
    if (this.dataset.quoteType == "joke" || this.dataset.quoteType == "tronalddump" || this.dataset.quoteType == "chucknorris") {
        // document.querySelector(".quote-sub-type-parent-container").style.display = "block";
        // checkForQuoteUrlFunc(document.querySelector(".quote-sub-type-parent-container").querySelector(".active-quote-type").dataset.quoteType)
    } else {
        // document.querySelector(".quote-sub-type-parent-container").style.display = "none";
        checkForQuoteUrlFunc(this.dataset.quoteType)
    }
}

function checkForQuoteUrlFunc(name) {
    quoteTypeDetailArray.forEach(ele => {
        if (ele.type == name) {
            console.log(ele.url)
            extraapirunningFunc(ele.url)
        }
    });
}

function extraapirunningFunc(url) {
    fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
            console.log(jsonData, jsonData.length)
        })
        //Handling errors
        .catch((error) => {
            console.log(error)
        });
}
apiRunningFunc()
//Running the api for quotes
function apiRunningFunc() {
    document.querySelector(".quotes-content-container").innerHTML = `<div class="loader-container">
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
    fetch(quotesAPIUrl)
        .then(response => response.json())
        .then((jsonData) => {
            quotesCompleteArray = jsonData;
            creatingQuotesFunc(jsonData);
        })
        //Handling errors
        .catch((error) => {
            document.querySelector(".quotes-content-container").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
                <img src="View/Images/error-occured-image.svg" alt="Faced an error">
                <p>Unexpected error :( , we are doing our best to resolve<br>Try to <button onclick="location.reload();">Reload</button> page</p>
            </div>`
        });
}


//Creating search results based on data from api
function creatingQuotesFunc(quotesArray) {
    document.querySelector(".quotes-content-container").innerHTML = "";
    if (quotesArray.length !== 0) {
        clearTimeout(reRunQuoteAPI)
        let randomNumber = randomIntegerGenerator(0, quotesArray.length);
        let quoteText = quotesArray[randomNumber].text;
        let quoteAuthor = quotesArray[randomNumber].author;
        if (quoteAuthor == null || quoteAuthor == "") {
            quoteAuthor = "Unknown"
        }
        const newDiv = document.createElement("div");
        newDiv.className = "quotes-container d-flex d-flex-dir-col";
        newDiv.innerHTML = `<button class="bookmark-quote d-flex justify-content-center" title="Bookmark Quote">
        <span class="option-icon d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 143.93 191.886">
                <path id="Path_176" data-name="Path 176"
                    d="M125.938,0H17.991A17.991,17.991,0,0,0,0,17.991V179.874a11.993,11.993,0,0,0,18.036,10.36l53.929-31.462L125.9,190.231c7.984,4.337,18.029-1.1,18.029-10.356V17.991A17.993,17.993,0,0,0,125.938,0Zm0,169.417L71.965,137.932,17.991,169.417V20.24A2.18,2.18,0,0,1,19.9,17.991H123.352a2.315,2.315,0,0,1,2.586,2.249Z"
                    fill="currentColor"></path>
            </svg>
        </span>
        <span class="hidden-ele">Bookmark Quote</span>
    </button>
    <div class="quote-text">${quoteText}</div>
    <div class="quote-author">- ${quoteAuthor}</div>
    <div class="quote-bottom-container">
        <div>
            <div class="quote-share-container d-flex d-flex-dir-col">
                <button class="share-btn option-btn d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 448">
                        <path
                            d="M352,224a96,96,0,1,0-96-96,93.886,93.886,0,0,0,.7,11.9l-94.1,47a96,96,0,1,0,0,138.2l94.1,47A92.8,92.8,0,0,0,256,384a96.071,96.071,0,1,0,29.4-69.1l-94.1-47a101.5,101.5,0,0,0,0-23.8l94.1-47A95.237,95.237,0,0,0,352,224Z"
                            transform="translate(0 -32)" fill="currentColor"></path>
                    </svg>
                    Share
                </button>
                <div class="share-options-container d-flex d-flex-dir-col">
                </div>
            </div>
        </div>
        <button class="new-quote-btn option-btn d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 170.703 159.35">
                <path
                    d="M61.13,71.415a56.893,56.893,0,0,1,80.124-.356L126.6,85.675a8.54,8.54,0,0,0,6.046,14.581h45.521a8.515,8.515,0,0,0,8.535-8.535V46.2a8.54,8.54,0,0,0-14.581-6.046L157.328,54.949A79.651,79.651,0,0,0,26.242,85.106a11.372,11.372,0,1,0,21.445,7.575A56.32,56.32,0,0,1,61.13,71.415ZM16,131.552v45.521a8.54,8.54,0,0,0,14.581,6.046l14.794-14.794A79.737,79.737,0,0,0,176.5,138.2a11.372,11.372,0,0,0-21.445-7.575,56.32,56.32,0,0,1-13.443,21.267,56.893,56.893,0,0,1-80.124.356L76.1,137.6a8.54,8.54,0,0,0-6.046-14.581H24.535A8.515,8.515,0,0,0,16,131.552Z"
                    transform="translate(-16 -31.962)" fill="currentColor" />
            </svg>
            New Quote
        </button>
    </div>`;
        // let randomArticleColor = randomColorGenerator();
        // newDiv.style.setProperty("--quote-color", `rgb(${randomArticleColor})`);
        // newDiv.style.setProperty("--quote-bg-color", `${randomArticleColor}`);

        document.querySelector(".quotes-content-container").appendChild(newDiv);
        newDiv.querySelector(".bookmark-quote").addEventListener('click', addToBookmarkFunc)
        newDiv.querySelector(".share-btn").addEventListener('click', shareOptionsOpenerFunc)
        newDiv.querySelector(".new-quote-btn").addEventListener('click', function () { creatingQuotesFunc(quotesCompleteArray) })
        quoteBlocksSharingFunc(newDiv.querySelector(".share-options-container"), quotesArray[randomNumber].text, quotesArray[randomNumber].author)
        // reRunQuoteAPI = setTimeout(() => {
        //     creatingQuotesFunc(quotesCompleteArray)
        // }, 60000);
    } else {
        document.querySelector(".quotes-content-container").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
            <img src="View/Images/empty-list-image.svg" alt="Couldn't find any results">
            <p>Opps, Couldn't find any quotes<br><button onclick="location.reload();">Reload</button> page</p>
        </div>`;
    }
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

function addToBookmarkFunc() {
    if (this.classList.contains("active-bookmark")) {
        this.classList.remove("active-bookmark")
        this.querySelector(".option-icon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 143.93 191.886">
            <path id="Path_176" data-name="Path 176"
                d="M125.938,0H17.991A17.991,17.991,0,0,0,0,17.991V179.874a11.993,11.993,0,0,0,18.036,10.36l53.929-31.462L125.9,190.231c7.984,4.337,18.029-1.1,18.029-10.356V17.991A17.993,17.993,0,0,0,125.938,0Zm0,169.417L71.965,137.932,17.991,169.417V20.24A2.18,2.18,0,0,1,19.9,17.991H123.352a2.315,2.315,0,0,1,2.586,2.249Z"
                fill="currentColor" />
        </svg>`;
    } else {
        this.classList.add("active-bookmark")
        this.querySelector(".option-icon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 88.056 117.408">
            <path d="M0,11.007V111.836A5.582,5.582,0,0,0,8.783,116.4L44.028,91.725,79.274,116.4a5.582,5.582,0,0,0,8.783-4.563V11.007A11.01,11.01,0,0,0,77.049,0H11.007A11.01,11.01,0,0,0,0,11.007Z"
                fill="currentColor" />
        </svg>`;
    }
}

document.querySelectorAll(".theme-dropdown-content-container .theme-btn").forEach(ele => {
    ele.addEventListener('click', function () { creatingQuotesFunc(quotesCompleteArray) })
});
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () { creatingQuotesFunc(quotesCompleteArray) });