const navbarContainer = document.querySelector(".navbar-container")
const navbarTop = document.querySelector(".navbar-top")
const observer = new IntersectionObserver( 
    ([e]) => {
        navbarContainer.classList.toggle("active-stucked", e.intersectionRatio < 1);//The second parameter can be used to determine whether the class is included or not. This example would include the class only if the element is sticked at top
    }, 
    {threshold: [1]}
);

observer.observe(navbarTop);

function showActionMessageFunc(){
    const newDiv = document.createElement("div");
    if (actionStatus == "error") {
        newDiv.className = "user-action-status-error user-action-status-container";
        newDiv.innerHTML = `<span class="message-icon"><i class="fa-solid fa-circle-exclamation"></i></span>
        <span class="message-text">${actionMessage}</span>
        <button><i class="fa-solid fa-xmark"></i></button>`;
    } else {
        newDiv.className = "user-action-status-success user-action-status-container";
        newDiv.innerHTML = `<span class="message-icon"><i class="fa-solid fa-circle-check"></i></span>
        <span class="message-text">${actionMessage}</span>
        <button><i class="fa-solid fa-xmark"></i></button>`;
    }
    document.querySelector("#user-action-status-messages").appendChild(newDiv);
    newDiv.querySelector("button").addEventListener('click',closingActionMessageFunc);
    setTimeout(() => {
        newDiv.remove()
    }, 4000);
}

function closingActionMessageFunc(){
    this.parentElement.remove();
}

