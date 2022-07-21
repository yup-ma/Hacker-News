const networkStatusBar = document.getElementById("network-status");
let actionStatus = "";
let actionMessage = "";

window.addEventListener("online", () => {
    networkStatusBar.style.backgroundColor = "var(--success-bg-color)";
    networkStatusBar.style.color = "var(--primary-color)";
    networkStatusBar.innerText = "Back online";
    networkStatusBar.style.maxHeight = "48px";
    document.querySelector("main").style.marginTop = "113px";
    setTimeout(() => {
        networkStatusBar.style.maxHeight = "0";
        document.querySelector("main").style.marginTop = "65px";
    }, 2000)
})

window.addEventListener("offline", () => {
    networkStatusBar.style.backgroundColor = "var(--error-bg-color)";
    networkStatusBar.style.color = "var(--white-color)";
    networkStatusBar.style.maxHeight = "48px";
    networkStatusBar.innerText = "Network connection lost";
    document.querySelector("main").style.marginTop = "113px";
})

const navbarContainer = document.querySelector(".navbar-container")
const navbarTop = document.querySelector(".navbar-top")
const observer = new IntersectionObserver(
    ([e]) => {
        navbarContainer.classList.toggle("active-stucked", e.intersectionRatio < 1); //The second parameter can be used to determine whether the class is included or not. This example would include the class only if the element is sticked at top
    }, {
        threshold: [1]
    }
);

observer.observe(navbarTop);

function showActionMessageFunc() {
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
    newDiv.querySelector("button").addEventListener('click', closingActionMessageFunc);
    setTimeout(() => {
        newDiv.remove()
    }, 4000);
}

function closingActionMessageFunc() {
    this.parentElement.remove();
}

let windowWidth = window.innerWidth
window.addEventListener('resize', windowWidthCalcFunc)
function windowWidthCalcFunc(){
    windowWidth = window.innerWidth;
    if (windowWidth > 669) {
        document.querySelector(".company-logo-container").style.setProperty("--company-text", `"Hacker News"`);
    } else {
        document.querySelector(".company-logo-container").style.setProperty("--company-text", `"HN"`);
    }
}

let navScrollingAllowed = true;
window.addEventListener('scroll', observeHeadingFunc)
function observeHeadingFunc(){
    if (windowWidth > 899) {
        if (navScrollingAllowed == true) {
            navScrollingAllowed = false;
            const articlesMainContainerHeading = document.querySelector(".articles-main-container-heading");
            if (window.scrollY >= articlesMainContainerHeading.offsetTop + articlesMainContainerHeading.offsetHeight) {
                document.querySelector(".company-logo-container").style.setProperty("--company-text", `"${articlesMainContainerHeading.innerHTML}: Hacker News"`);
            } else{
                document.querySelector(".company-logo-container").style.setProperty("--company-text", `"Hacker News"`);
            }
            setTimeout(() => {
                navScrollingAllowed = true;
            }, 500);
        }
    }
}

function articleDateConverterFunc(e) {
    const date = new Date(e)
    let monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let articleMonth = monthsName[date.getMonth()]
    return `${articleMonth} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

function randomColorGenerator() {
    let r = Math.floor(Math.random() * (181));
    let g = Math.floor(Math.random() * (181));
    let b = Math.floor(Math.random() * (181));
    return `${r}, ${g}, ${b}`;
}

document.querySelector(".updates-modal-btn").addEventListener('click', updatesInfoModalOpenFunc)
document.querySelector(".dark-light-mode-switch").addEventListener('click', updatesInfoModalOpenFunc)
function updatesInfoModalOpenFunc() {
    document.querySelector(".updates-fixed-section").style.display = "flex";
    observer_1.observe(document.querySelector(".updates-main-section p"));
}

document.querySelector(".modal-close-btn").addEventListener('click', function() {
    document.querySelector(".updates-fixed-section").style.display = "none";
    observer_1.unobserve(document.querySelector(".updates-main-section p"));
})