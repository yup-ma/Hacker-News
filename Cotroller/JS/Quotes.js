let quotesAPIUrl = "https://type.fit/api/quotes"

// apiRunningFunc()
//Running the api for quotes
function apiRunningFunc() {
    document.querySelector(".quotes-main-container").innerHTML = `<div class="loader-container">
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
            console.log(jsonData)
            // creatingArticlesFunc(jsonData.hits, jsonData.page, jsonData.nbPages, jsonData.nbHits, jsonData.processingTimeMS);
        })
        //Handling errors
        .catch((error) => {
            document.querySelector(".quotes-main-container").innerHTML = `<div class="fetch-api-error-container d-flex justify-content-center">
                <img src="View/Images/error-occured-image.svg" alt="Faced an error">
                <p>Unexpected error :( , we are doing our best to resolve<br>Try to <button onclick="location.reload();">Reload</button> page</p>
            </div>`
        });
}