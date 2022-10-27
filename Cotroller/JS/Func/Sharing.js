let extraDetail = "Check this out";
let hashtag = "#Reading"
let sharingDesc = "Quality Reads - A tool to search the articles from hacker news based on various tags, queries, popularity, author and more";

function cumulativeSharingFunc(url, heading) {
    let subjectVar = `${extraDetail} - ${heading} on Quality Reads`;
    let bodyVar = `${hashtag}%0A${heading} @QualityReads%0A${url}%0A%0A${sharingDesc}`;
    let updatedUrl = `mailto:?subject=${encodeURIComponent(subjectVar)}&Body=${encodeURIComponent(bodyVar).replace(/%25/g, '%')}`;


    if (navigator.share) {
        document.querySelector(".article-share-container").innerHTML = `<button class="share-btn d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 448">
                <path data-name="Path 1" d="M352,224a96,96,0,1,0-96-96,93.886,93.886,0,0,0,.7,11.9l-94.1,47a96,96,0,1,0,0,138.2l94.1,47A92.8,92.8,0,0,0,256,384a96.071,96.071,0,1,0,29.4-69.1l-94.1-47a101.5,101.5,0,0,0,0-23.8l94.1-47A95.237,95.237,0,0,0,352,224Z" transform="translate(0 -32)" fill="currentColor"/>
            </svg>
            Share
        </button>
        <div class="share-options-container d-flex d-flex-dir-col">
            <a href="${updatedUrl}" class="share-option d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 512 384">
                    <path data-name="Path 1" d="M48,64a48,48,0,0,0-28.8,86.4L236.8,313.6a32.1,32.1,0,0,0,38.4,0L492.8,150.4A48,48,0,0,0,464,64H48ZM0,176V384a64.059,64.059,0,0,0,64,64H448a64.059,64.059,0,0,0,64-64V176L294.4,339.2a63.9,63.9,0,0,1-76.8,0Z" transform="translate(0 -64)" fill="currentColor"/>
                </svg>
                Email
            </a>
            <button class="share-option copy-link-option d-flex"><i class="fa-solid fa-link"></i> Copy link</button>
            <button class="share-option more-share-option d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 112 432">
                    <path data-name="Path 1" d="M64,360A56,56,0,1,1,8,416,56.036,56.036,0,0,1,64,360Zm0-160A56,56,0,1,1,8,256,56.036,56.036,0,0,1,64,200ZM120,96A56,56,0,1,1,64,40,56.036,56.036,0,0,1,120,96Z" transform="translate(-8 -40)" fill="currentColor"/>
                </svg>
                More option
            </button>
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
        document.querySelector(".article-share-container").innerHTML = `<button class="share-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 448">
                <path data-name="Path 1" d="M352,224a96,96,0,1,0-96-96,93.886,93.886,0,0,0,.7,11.9l-94.1,47a96,96,0,1,0,0,138.2l94.1,47A92.8,92.8,0,0,0,256,384a96.071,96.071,0,1,0,29.4-69.1l-94.1-47a101.5,101.5,0,0,0,0-23.8l94.1-47A95.237,95.237,0,0,0,352,224Z" transform="translate(0 -32)" fill="currentColor"/>
            </svg>
            Share
        </button>
        <div class="share-options-container d-flex d-flex-dir-col">
            <a href="${updatedUrl}" class="share-option d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 512 384">
                    <path data-name="Path 1" d="M48,64a48,48,0,0,0-28.8,86.4L236.8,313.6a32.1,32.1,0,0,0,38.4,0L492.8,150.4A48,48,0,0,0,464,64H48ZM0,176V384a64.059,64.059,0,0,0,64,64H448a64.059,64.059,0,0,0,64-64V176L294.4,339.2a63.9,63.9,0,0,1-76.8,0Z" transform="translate(0 -64)" fill="currentColor"/>
                </svg>
                Email
            </a>
            <button class="share-option copy-link-option d-flex"><i class="fa-solid fa-link"></i> Copy link</button>
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

function articleBlocksSharingFunc(container, url, heading) {
    // console.log(container, url, heading)
    let subjectVar = `${extraDetail} - ${heading} on Quality Reads`;
    let bodyVar = `${hashtag}%0A${heading} @QualityReads%0A${url}%0A%0A${sharingDesc}`;
    let updatedUrl = `mailto:?subject=${encodeURIComponent(subjectVar)}&Body=${encodeURIComponent(bodyVar).replace(/%25/g, '%')}`;


    if (navigator.share) {
        container.innerHTML = `<a href="${updatedUrl}" class="share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 512 384">
                <path data-name="Path 1" d="M48,64a48,48,0,0,0-28.8,86.4L236.8,313.6a32.1,32.1,0,0,0,38.4,0L492.8,150.4A48,48,0,0,0,464,64H48ZM0,176V384a64.059,64.059,0,0,0,64,64H448a64.059,64.059,0,0,0,64-64V176L294.4,339.2a63.9,63.9,0,0,1-76.8,0Z" transform="translate(0 -64)" fill="currentColor"/>
            </svg>
            Email
        </a>
        <button class="share-option copy-link-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 604.35 470.31">
                <path data-name="Path 1" d="M579.8,267.7A144.6,144.6,0,0,0,393.5,47.8l-1.6,1.1a31.968,31.968,0,0,0,37.2,52l1.6-1.1A80.6,80.6,0,0,1,534.5,222.4L422.3,334.8A80.6,80.6,0,0,1,299.7,231l1.1-1.6a31.968,31.968,0,0,0-52-37.2l-1.1,1.6A144.519,144.519,0,0,0,467.5,380ZM60.2,244.3A144.6,144.6,0,0,0,246.5,464.2l1.6-1.1a31.968,31.968,0,0,0-37.2-52l-1.6,1.1A80.633,80.633,0,0,1,105.5,289.5L217.7,177.2A80.627,80.627,0,0,1,340.3,281.1l-1.1,1.6a31.968,31.968,0,1,0,52,37.2l1.1-1.6A144.551,144.551,0,0,0,172.5,132Z" transform="translate(-17.825 -20.845)" fill="currentColor"/>
            </svg>
            Copy link
        </button>
        <button class="share-option more-share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 112 432">
                <path data-name="Path 1" d="M64,360A56,56,0,1,1,8,416,56.036,56.036,0,0,1,64,360Zm0-160A56,56,0,1,1,8,256,56.036,56.036,0,0,1,64,200ZM120,96A56,56,0,1,1,64,40,56.036,56.036,0,0,1,120,96Z" transform="translate(-8 -40)" fill="currentColor"/>
            </svg>
            More option
        </button>
        <button class="share-option close-share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 320.15 320.15">
                <path data-name="Path 1" d="M310.6,150.6a32.032,32.032,0,1,0-45.3-45.3L160,210.7,54.6,105.4A32.032,32.032,0,1,0,9.3,150.7L114.7,256,9.4,361.4a32.032,32.032,0,0,0,45.3,45.3L160,301.3,265.4,406.6a32.032,32.032,0,0,0,45.3-45.3L205.3,256Z" transform="translate(0.075 -95.925)" fill="currentColor"/>
            </svg> 
            Close
        </button>`;
        container.querySelector(".more-share-option").addEventListener('click', () => {
            navigator.share({
                title: subjectVar,
                url: url
            })
            document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
            document.body.removeEventListener('click', sharingDropdownClosingFunc)
        })
    } else {
        container.innerHTML = `<a href="${updatedUrl}" class="share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 512 384">
                <path data-name="Path 1" d="M48,64a48,48,0,0,0-28.8,86.4L236.8,313.6a32.1,32.1,0,0,0,38.4,0L492.8,150.4A48,48,0,0,0,464,64H48ZM0,176V384a64.059,64.059,0,0,0,64,64H448a64.059,64.059,0,0,0,64-64V176L294.4,339.2a63.9,63.9,0,0,1-76.8,0Z" transform="translate(0 -64)" fill="currentColor"/>
            </svg>
            Email
        </a>
        <button class="share-option copy-link-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 604.35 470.31">
                <path data-name="Path 1" d="M579.8,267.7A144.6,144.6,0,0,0,393.5,47.8l-1.6,1.1a31.968,31.968,0,0,0,37.2,52l1.6-1.1A80.6,80.6,0,0,1,534.5,222.4L422.3,334.8A80.6,80.6,0,0,1,299.7,231l1.1-1.6a31.968,31.968,0,0,0-52-37.2l-1.1,1.6A144.519,144.519,0,0,0,467.5,380ZM60.2,244.3A144.6,144.6,0,0,0,246.5,464.2l1.6-1.1a31.968,31.968,0,0,0-37.2-52l-1.6,1.1A80.633,80.633,0,0,1,105.5,289.5L217.7,177.2A80.627,80.627,0,0,1,340.3,281.1l-1.1,1.6a31.968,31.968,0,1,0,52,37.2l1.1-1.6A144.551,144.551,0,0,0,172.5,132Z" transform="translate(-17.825 -20.845)" fill="currentColor"/>
            </svg>
            Copy link
        </button>
        <button class="share-option close-share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 320.15 320.15">
                <path data-name="Path 1" d="M310.6,150.6a32.032,32.032,0,1,0-45.3-45.3L160,210.7,54.6,105.4A32.032,32.032,0,1,0,9.3,150.7L114.7,256,9.4,361.4a32.032,32.032,0,0,0,45.3,45.3L160,301.3,265.4,406.6a32.032,32.032,0,0,0,45.3-45.3L205.3,256Z" transform="translate(0.075 -95.925)" fill="currentColor"/>
            </svg> 
            Close
        </button>`;
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
