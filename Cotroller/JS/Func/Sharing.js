let extraDetail = "Check this out";
let hashtag = "#Reading"
let sharingDesc = "Quality Reads - A tool to search the articles from hacker news based on various tags, queries, popularity, author and more";

function cumulativeSharingFunc(url, heading) {
    let subjectVar = `${extraDetail} - ${heading} on Quality Reads`;
    let bodyVar = `${hashtag}%0A${heading} @QualityReads%0A${url}%0A%0A${sharingDesc}`;
    let updatedUrl = `mailto:?subject=${encodeURIComponent(subjectVar)}&Body=${encodeURIComponent(bodyVar).replace(/%25/g, '%')}`;


    if (navigator.share) {
        document.querySelector(".article-share-container").innerHTML = `<button class="share-btn"><i class="fa-solid fa-share-nodes"></i> Share</button>
        <div class="share-options-container d-flex d-flex-dir-col">
            <a href="${updatedUrl}" class="share-option d-flex"><i
                    class="fa-solid fa-envelope"></i> Email</a>
            <button class="share-option copy-link-option d-flex"><i class="fa-solid fa-link"></i> Copy link</button>
            <button class="share-option more-share-option d-flex"><i class="fa-solid fa-ellipsis-vertical"></i> More option</button>
        </div>`;
        document.querySelector(".more-share-option").addEventListener('click', () => {
            navigator.share({
                title: subjectVar,
                url: url
            })
            document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
            document.body.removeEventListener('click', sharingDropdownClosingFunc)
        })
    } else {
        document.querySelector(".article-share-container").innerHTML = `<button class="share-btn"><i class="fa-solid fa-share-nodes"></i> Share</button>
        <div class="share-options-container d-flex d-flex-dir-col">
            <a href="${updatedUrl}" class="share-option d-flex"><i
                    class="fa-solid fa-envelope"></i> Email</a>
            <button class="share-option d-flex"><i class="fa-solid fa-link"></i> Copy link</button>
        </div>`;
    }

    document.querySelector(".copy-link-option").addEventListener('click', () => {
        actionStatus = "success";
        actionMessage = "Link copied to clipboard";
        showActionMessageFunc();
        navigator.clipboard.writeText(url)
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    document.querySelector(".share-option").addEventListener('click', () => {
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    document.querySelector(".share-btn").addEventListener('click', sharingDropdownOpenFunc)
}

function articleBlocksSharingFunc(container, url, heading){
    // console.log(container, url, heading)
    let subjectVar = `${extraDetail} - ${heading} on Quality Reads`;
    let bodyVar = `${hashtag}%0A${heading} @QualityReads%0A${url}%0A%0A${sharingDesc}`;
    let updatedUrl = `mailto:?subject=${encodeURIComponent(subjectVar)}&Body=${encodeURIComponent(bodyVar).replace(/%25/g, '%')}`;


    if (navigator.share) {
        container.innerHTML = `<a href="${updatedUrl}" class="share-option d-flex"><i
        class="fa-solid fa-envelope"></i> Email</a>
        <button class="share-option copy-link-option d-flex"><i class="fa-solid fa-link"></i> Copy link</button>
        <button class="share-option more-share-option d-flex"><i class="fa-solid fa-ellipsis-vertical"></i> More option</button>
        <button class="share-option close-share-option d-flex"><i class="fa-solid fa-xmark"></i> Close</button>`;
        container.querySelector(".more-share-option").addEventListener('click', () => {
            navigator.share({
                title: subjectVar,
                url: url
            })
            document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
            document.body.removeEventListener('click', sharingDropdownClosingFunc)
        })
    } else {
        container.innerHTML = `<a href="${updatedUrl}" class="share-option d-flex"><i
        class="fa-solid fa-envelope"></i> Email</a>
        <button class="share-option copy-link-option d-flex"><i class="fa-solid fa-link"></i> Copy link</button>
        <button class="share-option close-share-option d-flex"><i class="fa-solid fa-xmark"></i> Close</button>`;
    }
    container.querySelector(".copy-link-option").addEventListener('click', () => {
        actionStatus = "success";
        actionMessage = "Link copied to clipboard";
        showActionMessageFunc();
        navigator.clipboard.writeText(url)
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    container.querySelector(".share-option").addEventListener('click', () => {
        window.location.href = container.querySelector(".share-option").href;
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    container.querySelector(".close-share-option").addEventListener('click', () => {
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
}