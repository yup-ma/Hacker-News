let extraDetail = "Check this out";
let hashtag = "#Reading"
let sharingDesc = "Quality Reads - A tool to search the articles from hacker news based on various tags, queries, popularity, author and more";

function cumulativeSharingFunc(url, heading) {
    let subjectVar = `${extraDetail} - ${heading} on Quality Reads`;
    let bodyVar = `${hashtag}%0A${heading} @QualityReads%0A${url}%0A%0A${sharingDesc}`;
    let emailUrl = `mailto:?subject=${encodeURIComponent(subjectVar)}&Body=${encodeURIComponent(bodyVar).replace(/%25/g, '%')}`;
    let whatsappUrl = `https://wa.me?text=${extraDetail} - ${heading} on Quality Reads%0A${url}%0A%0A${sharingDesc}`

    if (navigator.share) {
        document.querySelector(".article-share-container").innerHTML = `<button class="share-btn d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 448">
                <path data-name="Path 1" d="M352,224a96,96,0,1,0-96-96,93.886,93.886,0,0,0,.7,11.9l-94.1,47a96,96,0,1,0,0,138.2l94.1,47A92.8,92.8,0,0,0,256,384a96.071,96.071,0,1,0,29.4-69.1l-94.1-47a101.5,101.5,0,0,0,0-23.8l94.1-47A95.237,95.237,0,0,0,352,224Z" transform="translate(0 -32)" fill="currentColor"/>
            </svg>
            Share
        </button>
        <div class="share-options-container d-flex d-flex-dir-col">
            <a href="${whatsappUrl}" target="_blank" class="share-option whatsapp-share-option d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 448">
                    <path id="Path_1" data-name="Path 1" d="M380.9,97.1A220.329,220.329,0,0,0,223.9,32c-122.4,0-222,99.6-222,222A222.239,222.239,0,0,0,31.5,365L0,480l117.7-30.9a221.324,221.324,0,0,0,106.1,27h.1c122.3,0,224.1-99.6,224.1-222,0-59.3-25.2-115-67.1-157Zm-157,341.6a184.191,184.191,0,0,1-94-25.7l-6.7-4L53.4,427.3,72,359.2l-4.4-7A183.908,183.908,0,0,1,39.4,254C39.4,152.3,122.2,69.5,224,69.5a182.88,182.88,0,0,1,130.4,54.1c34.8,34.9,56.2,81.2,56.1,130.5C410.5,355.9,325.6,438.7,223.9,438.7ZM325.1,300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5,2.8s-14.3,18-17.6,21.8c-3.2,3.7-6.5,4.2-12,1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8,5.7-9.1,16.3-30.3,1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2a20.549,20.549,0,0,0-14.8,6.9c-5.1,5.6-19.4,19-19.4,46.3s19.9,53.7,22.6,57.4c2.8,3.7,39.1,59.7,94.8,83.8,35.2,15.2,49,16.5,66.6,13.9,10.7-1.6,32.8-13.4,37.4-26.4s4.6-24.1,3.2-26.4C334.3,304.6,330.6,303.2,325.1,300.5Z" transform="translate(0 -32)" fill="currentColor"/>
                </svg>
                WhatsApp
            </a>
            <a href="${emailUrl}" class="share-option email-share-option d-flex">
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
            <a href="${whatsappUrl}" target="_blank" class="share-option whatsapp-share-option d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 448">
                    <path id="Path_1" data-name="Path 1" d="M380.9,97.1A220.329,220.329,0,0,0,223.9,32c-122.4,0-222,99.6-222,222A222.239,222.239,0,0,0,31.5,365L0,480l117.7-30.9a221.324,221.324,0,0,0,106.1,27h.1c122.3,0,224.1-99.6,224.1-222,0-59.3-25.2-115-67.1-157Zm-157,341.6a184.191,184.191,0,0,1-94-25.7l-6.7-4L53.4,427.3,72,359.2l-4.4-7A183.908,183.908,0,0,1,39.4,254C39.4,152.3,122.2,69.5,224,69.5a182.88,182.88,0,0,1,130.4,54.1c34.8,34.9,56.2,81.2,56.1,130.5C410.5,355.9,325.6,438.7,223.9,438.7ZM325.1,300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5,2.8s-14.3,18-17.6,21.8c-3.2,3.7-6.5,4.2-12,1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8,5.7-9.1,16.3-30.3,1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2a20.549,20.549,0,0,0-14.8,6.9c-5.1,5.6-19.4,19-19.4,46.3s19.9,53.7,22.6,57.4c2.8,3.7,39.1,59.7,94.8,83.8,35.2,15.2,49,16.5,66.6,13.9,10.7-1.6,32.8-13.4,37.4-26.4s4.6-24.1,3.2-26.4C334.3,304.6,330.6,303.2,325.1,300.5Z" transform="translate(0 -32)" fill="currentColor"/>
                </svg>
                WhatsApp
            </a>
            <a href="${emailUrl}" class="share-option email-share-option d-flex">
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
    document.querySelector(".email-share-option").addEventListener('click', () => {
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    document.querySelector(".whatsapp-share-option").addEventListener('click', () => {
        window.open(`${container.querySelector(".share-option").href}`, '_blank');
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    document.querySelector(".share-btn").addEventListener('click', sharingDropdownOpenFunc)
}

function articleBlocksSharingFunc(container, url, heading) {
    // console.log(container, url, heading)
    let subjectVar = `${extraDetail} - ${heading} on Quality Reads`;
    let bodyVar = `${hashtag}%0A${heading} @QualityReads%0A${url}%0A%0A${sharingDesc}`;
    let emailUrl = `mailto:?subject=${encodeURIComponent(subjectVar)}&Body=${encodeURIComponent(bodyVar).replace(/%25/g, '%')}`;
    let whatsappUrl = `https://wa.me?text=${extraDetail} - ${heading} on Quality Reads%0A${url}%0A%0A${sharingDesc}`

    if (navigator.share) {
        container.innerHTML = `<a href="${whatsappUrl}" target="_blank" class="share-option whatsapp-share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 448">
                <path id="Path_1" data-name="Path 1" d="M380.9,97.1A220.329,220.329,0,0,0,223.9,32c-122.4,0-222,99.6-222,222A222.239,222.239,0,0,0,31.5,365L0,480l117.7-30.9a221.324,221.324,0,0,0,106.1,27h.1c122.3,0,224.1-99.6,224.1-222,0-59.3-25.2-115-67.1-157Zm-157,341.6a184.191,184.191,0,0,1-94-25.7l-6.7-4L53.4,427.3,72,359.2l-4.4-7A183.908,183.908,0,0,1,39.4,254C39.4,152.3,122.2,69.5,224,69.5a182.88,182.88,0,0,1,130.4,54.1c34.8,34.9,56.2,81.2,56.1,130.5C410.5,355.9,325.6,438.7,223.9,438.7ZM325.1,300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5,2.8s-14.3,18-17.6,21.8c-3.2,3.7-6.5,4.2-12,1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8,5.7-9.1,16.3-30.3,1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2a20.549,20.549,0,0,0-14.8,6.9c-5.1,5.6-19.4,19-19.4,46.3s19.9,53.7,22.6,57.4c2.8,3.7,39.1,59.7,94.8,83.8,35.2,15.2,49,16.5,66.6,13.9,10.7-1.6,32.8-13.4,37.4-26.4s4.6-24.1,3.2-26.4C334.3,304.6,330.6,303.2,325.1,300.5Z" transform="translate(0 -32)" fill="currentColor"/>
            </svg>
            WhatsApp
        </a>
        <a href="${emailUrl}" class="share-option email-share-option d-flex">
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
        container.innerHTML = `<a href="${whatsappUrl}" target="_blank" class="share-option whatsapp-share-option d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 448">
                <path id="Path_1" data-name="Path 1" d="M380.9,97.1A220.329,220.329,0,0,0,223.9,32c-122.4,0-222,99.6-222,222A222.239,222.239,0,0,0,31.5,365L0,480l117.7-30.9a221.324,221.324,0,0,0,106.1,27h.1c122.3,0,224.1-99.6,224.1-222,0-59.3-25.2-115-67.1-157Zm-157,341.6a184.191,184.191,0,0,1-94-25.7l-6.7-4L53.4,427.3,72,359.2l-4.4-7A183.908,183.908,0,0,1,39.4,254C39.4,152.3,122.2,69.5,224,69.5a182.88,182.88,0,0,1,130.4,54.1c34.8,34.9,56.2,81.2,56.1,130.5C410.5,355.9,325.6,438.7,223.9,438.7ZM325.1,300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5,2.8s-14.3,18-17.6,21.8c-3.2,3.7-6.5,4.2-12,1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8,5.7-9.1,16.3-30.3,1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2a20.549,20.549,0,0,0-14.8,6.9c-5.1,5.6-19.4,19-19.4,46.3s19.9,53.7,22.6,57.4c2.8,3.7,39.1,59.7,94.8,83.8,35.2,15.2,49,16.5,66.6,13.9,10.7-1.6,32.8-13.4,37.4-26.4s4.6-24.1,3.2-26.4C334.3,304.6,330.6,303.2,325.1,300.5Z" transform="translate(0 -32)" fill="currentColor"/>
            </svg>
            WhatsApp
        </a>
        <a href="${emailUrl}" class="share-option email-share-option d-flex">
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
    container.querySelector(".whatsapp-share-option").addEventListener('click', () => {
        window.open(`${container.querySelector(".share-option").href}`, '_blank');
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    container.querySelector(".email-share-option").addEventListener('click', () => {
        window.location.href = container.querySelector(".email-share-option").href;
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
    container.querySelector(".close-share-option").addEventListener('click', () => {
        document.querySelector(".active-share-dropdown").classList.remove("active-share-dropdown");
        document.body.removeEventListener('click', sharingDropdownClosingFunc)
    })
}
