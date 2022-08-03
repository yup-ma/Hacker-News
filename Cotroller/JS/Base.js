const networkStatusBar = document.getElementById("network-status");
let actionStatus = "";
let actionMessage = "";
let timeMSUnitsObject = {
    min: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    year: 24 * 60 * 60 * 1000 * 365
}
let currentTimeStampVar;

//Running a test search on load of page
window.addEventListener("load", () => {
    if (localStorage.getItem("theme") == "dark") {
        const inputVar = document.querySelector(".dark-light-mode-input")
        const labelVar = document.querySelector(".dark-light-mode-switch")
        document.documentElement.classList.add("changing-theme")
        inputVar.checked = true;
        document.documentElement.dataset.theme = "dark";
        labelVar.title = "Toggle light theme";
        labelVar.dataset.navTitle = "Toggle light theme";
        
        setTimeout(() => {
            document.documentElement.classList.remove("changing-theme")
        }, 300);
    }
})

//Showing a message on online and offline status
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

//Showing a message on online and offline status
window.addEventListener("offline", () => {
    networkStatusBar.style.backgroundColor = "var(--error-bg-color)";
    networkStatusBar.style.color = "var(--white-color)";
    networkStatusBar.style.maxHeight = "48px";
    networkStatusBar.innerText = "Network connection lost";
    document.querySelector("main").style.marginTop = "113px";
})

//Adding observer to have a shadow on nav on scroll
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

//Showing action messages like success, error 
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

//Closing func for action messages
function closingActionMessageFunc() {
    this.parentElement.remove();
}

//Changing nav text back to original value on resize of screen
let windowWidth = window.innerWidth
window.addEventListener('resize', windowWidthCalcFunc)

function windowWidthCalcFunc() {
    windowWidth = window.innerWidth;
    if (windowWidth > 669) {
        document.querySelector(".company-logo-container").style.setProperty("--company-text", `"Quality Reads"`);
    } else {
        document.querySelector(".company-logo-container").style.setProperty("--company-text", `"QR"`);
    }
}

//Changing nav text when passed by article heading on scroll
let navScrollingAllowed = true;
window.addEventListener('scroll', observeHeadingFunc)

function observeHeadingFunc() {
    if (windowWidth > 899) {
        if (navScrollingAllowed == true) {
            navScrollingAllowed = false;
            const articlesMainContainerHeading = document.querySelector(".articles-main-container-heading");
            if (window.scrollY >= articlesMainContainerHeading.offsetTop + articlesMainContainerHeading.offsetHeight) {
                document.querySelector(".company-logo-container").style.setProperty("--company-text", `"${articlesMainContainerHeading.innerHTML}: Quality Reads"`);
            } else {
                document.querySelector(".company-logo-container").style.setProperty("--company-text", `"Quality Reads"`);
            }
            setTimeout(() => {
                navScrollingAllowed = true;
            }, 500);
        }
    }
}

//Create a time stamp in format "month date, year" for article
function articleDateConverterFunc(utcTimeStamp, secondsTimeStamp) {
    const date = new Date(utcTimeStamp)
    let monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let articleMonth = monthsName[date.getMonth()]
    let timePassedVar = "";

    let timePassedSinceComment = currentTimeStampVar - secondsTimeStamp * 1000;
    if (timePassedSinceComment < timeMSUnitsObject.min) {
        timePassedVar = "(" + Math.floor(timePassedSinceComment / 1000) + ' sec ago)';
    } else if (timePassedSinceComment < timeMSUnitsObject.hour) {
        timePassedVar = "(" + Math.floor(timePassedSinceComment / timeMSUnitsObject.min) + ' min ago)';
    } else if (timePassedSinceComment < timeMSUnitsObject.day) {
        if (Math.floor(timePassedSinceComment / timeMSUnitsObject.hour) > 1) {
            timePassedVar = "(" + Math.floor(timePassedSinceComment / timeMSUnitsObject.hour) + ' hours ago)';
        } else {
            timePassedVar = "(" + Math.floor(timePassedSinceComment / timeMSUnitsObject.hour) + ' hour ago)';
        }
    } else {
        timePassedVar = "";
    }
    return `${articleMonth} ${date.getUTCDate()}, ${date.getUTCFullYear()} ${timePassedVar}`;
}

//Create a random number in format "xx, xx, xx" for rgb color
function randomColorGenerator() {
    if (document.querySelector(".dark-light-mode-input").checked == true) {
        let r = Math.floor(Math.random() * 256) + 120;
        let g = Math.floor(Math.random() * 256) + 120;
        let b = Math.floor(Math.random() * 256) + 120;
        return `${r}, ${g}, ${b}`;
    } else {
        let r = Math.floor(Math.random() * 181);
        let g = Math.floor(Math.random() * 181);
        let b = Math.floor(Math.random() * 181);
        return `${r}, ${g}, ${b}`;
    }
}

//Adding a observer to change the style of update section heading when user scrolls
const observer_1 = new IntersectionObserver(
    ([e]) => document.querySelector(".updates-parent-main-section h3").classList.toggle("active-state", e.intersectionRatio < 1), {
        threshold: [1]
    }
);

document.querySelector(".updates-modal-btn").addEventListener('click', updatesInfoModalOpenFunc)
//Func to open update section
function updatesInfoModalOpenFunc() {
    document.querySelector(".updates-fixed-section").style.display = "flex";
    document.querySelector(".modal-close-btn").focus();
    observer_1.observe(document.querySelector(".updates-main-section p"));
    window.addEventListener('keydown', trapFocus);
}


//Func to close update section
document.querySelector(".modal-close-btn").addEventListener('click', function () {
    document.querySelector(".updates-fixed-section").style.display = "none";
    observer_1.unobserve(document.querySelector(".updates-main-section p"));
    window.removeEventListener('keydown', trapFocus);
})

//Traping focus to modal when it is opened
function trapFocus(e) {
    let focusableEle = document.querySelector(".updates-fixed-section").querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
    let firstFocusableEle = focusableEle[0];
    let lastFocusableEle = focusableEle[focusableEle.length - 1];
    if (focusableEle.length < 2) {// only useful when no action modal is open like info modal
        if (e.code === "Tab") {
            e.preventDefault();
        }
    } else {
        if (e.code === "Tab") {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEle) {
                    lastFocusableEle.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableEle) {
                    firstFocusableEle.focus();
                    e.preventDefault();
                }
            }
        }
    }
}


document.querySelector(".dark-light-mode-switch input").addEventListener('click', updateThemeFunc)

function updateThemeFunc(){
    const inputVar = document.querySelector(".dark-light-mode-input")
    const labelVar = document.querySelector(".dark-light-mode-switch")
    setTimeout(() => {
        document.documentElement.classList.add("changing-theme")
        if (inputVar.checked == true) {
            document.documentElement.dataset.theme = "dark";
            labelVar.title = "Toggle light theme";
            labelVar.dataset.navTitle = "Toggle light theme";
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.dataset.theme = "light";
            labelVar.title = "Toggle dark theme";
            labelVar.dataset.navTitle = "Toggle dark theme";
            localStorage.setItem("theme", "light");
        }
    }, 500);
    setTimeout(() => {
        document.documentElement.classList.remove("changing-theme")
    }, 700);
}
