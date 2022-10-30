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
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") != "system") {
            document.querySelector(".theme-modal-btn .link-icon").innerHTML = document.querySelector(`.theme-btn[data-theme-type=${localStorage.getItem("theme")}]`).querySelector(".link-icon").innerHTML;
            document.querySelector(".theme-dropdown-content-container").querySelector(".active-theme").classList.remove("active-theme");
            document.querySelector(`.theme-btn[data-theme-type=${localStorage.getItem("theme")}]`).classList.add("active-theme");
        }
    }
})

//Showing a message on online and offline status
window.addEventListener("online", () => {
    // networkStatusBar.style.backgroundColor = "var(--success-bg-color)";
    // networkStatusBar.style.color = "var(--primary-color)";
    // networkStatusBar.innerText = "Back online";
    // networkStatusBar.style.maxHeight = "48px";
    // setTimeout(() => {
    //     networkStatusBar.style.maxHeight = "0";
    // }, 2000)
    actionStatus = "success";
    actionMessage = "Back online";
    showActionMessageFunc();
})

//Showing a message on online and offline status
window.addEventListener("offline", () => {
    // networkStatusBar.style.backgroundColor = "var(--error-bg-color)";
    // networkStatusBar.style.color = "var(--white-color)";
    // networkStatusBar.style.maxHeight = "48px";
    // networkStatusBar.innerText = "Network connection lost";
    actionStatus = "error";
    actionMessage = "Network connection lost";
    showActionMessageFunc();
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
        newDiv.innerHTML = `<span class="message-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
                <path data-name="Path 1" d="M256,512c141.4,0,256-114.6,256-256S397.4,0,256,0,0,114.6,0,256,114.6,512,256,512Zm0-384a23.942,23.942,0,0,1,24,24V264a24,24,0,0,1-48,0V152A23.942,23.942,0,0,1,256,128Zm32,224a32,32,0,1,1-32-32A31.966,31.966,0,0,1,288,352Z" fill="currentColor"/>
            </svg>
        </span>
        <span class="message-text">${actionMessage}</span>
        <button class="d-flex justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 320.15 320.15">
                <path data-name="Path 1" d="M310.6,150.6a32.032,32.032,0,1,0-45.3-45.3L160,210.7,54.6,105.4A32.032,32.032,0,1,0,9.3,150.7L114.7,256,9.4,361.4a32.032,32.032,0,0,0,45.3,45.3L160,301.3,265.4,406.6a32.032,32.032,0,0,0,45.3-45.3L205.3,256Z" transform="translate(0.075 -95.925)" fill="currentColor"/>
            </svg>
        </button>`;
    } else {
        newDiv.className = "user-action-status-success user-action-status-container";
        newDiv.innerHTML = `<span class="message-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
                <path data-name="Path 1" d="M256,512c141.4,0,256-114.6,256-256S397.4,0,256,0,0,114.6,0,256,114.6,512,256,512ZM369,209,241,337a23.9,23.9,0,0,1-33.9,0l-64-64A23.971,23.971,0,0,1,177,239.1l47,47L335,175a23.971,23.971,0,1,1,33.9,33.9Z" fill="currentColor"/>
            </svg>
        </span>
        <span class="message-text">${actionMessage}</span>
        <button class="d-flex justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 320.15 320.15">
                <path data-name="Path 1" d="M310.6,150.6a32.032,32.032,0,1,0-45.3-45.3L160,210.7,54.6,105.4A32.032,32.032,0,1,0,9.3,150.7L114.7,256,9.4,361.4a32.032,32.032,0,0,0,45.3,45.3L160,301.3,265.4,406.6a32.032,32.032,0,0,0,45.3-45.3L205.3,256Z" transform="translate(0.075 -95.925)" fill="currentColor"/>
            </svg>
        </button>`;
    }
    document.querySelector("#user-action-status-messages").appendChild(newDiv);
    newDiv.querySelector("button").addEventListener('click', closingActionMessageFunc);
    setTimeout(() => {
        newDiv.remove()
    }, 6000);
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
    if (document.documentElement.dataset.theme == "dark") {
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

    document.querySelector(".dropdown-menu-container").classList.remove("active-menu")
    document.body.style.overflow = "auto";
    document.querySelector(".user-dropdown-menu-container.active-submenu").classList.remove("active-submenu");
    document.body.removeEventListener('click', closeUserModalFunc)
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


document.querySelectorAll(".theme-dropdown-content-container .theme-btn").forEach(ele => {
    ele.addEventListener('click', updateThemeFunc)
});

function updateThemeFunc() {
    this.parentElement.querySelector(".active-theme").classList.remove("active-theme");
    this.classList.add("active-theme");
    document.querySelector(".theme-modal-btn .link-icon").innerHTML = this.querySelector(".link-icon").innerHTML;
    let themeType = this.dataset.themeType
    document.documentElement.classList.add("changing-theme")
    if (themeType == "system") {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.dataset.theme = "dark";
        } else {
            document.documentElement.dataset.theme = "light";
        }
    } else {
        document.documentElement.dataset.theme = themeType;
    }
    localStorage.setItem("theme", `${themeType}`);
    setTimeout(() => {
        document.documentElement.classList.remove("changing-theme")
    }, 500);
}

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setColorScheme);
function setColorScheme() {
    if (!localStorage.getItem("theme") || localStorage.getItem("theme") == "system") {
        document.documentElement.classList.add("changing-theme")
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.dataset.theme = "dark";
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.dataset.theme = "light";
        }
        setTimeout(() => {
            document.documentElement.classList.remove("changing-theme")
        }, 300);
    }
}

document.querySelector(".menu-modal-btn").addEventListener('click', openMainMenuModalFunc)
function openMainMenuModalFunc() {
    document.querySelector(".dropdown-menu-container").classList.add("active-menu");
    document.body.style.overflow = "hidden";
}
document.querySelector(".close-modal-btn").addEventListener('click', closeMainMenuModalFunc)
document.querySelector(".dropdown-menu-container-layer").addEventListener('click', closeMainMenuModalFunc)
function closeMainMenuModalFunc() {
    document.querySelector(".dropdown-menu-container").classList.remove("active-menu")
    document.body.style.overflow = "auto";
}

document.querySelector(".user-modal-btn").addEventListener('click', toggleUserModalFunc)
function toggleUserModalFunc() {
    if (this.parentElement.classList.contains("active-submenu")) {
        this.parentElement.classList.remove("active-submenu");
        document.body.removeEventListener('click', closeUserModalFunc)
    } else {
        this.parentElement.classList.add("active-submenu");
        document.body.addEventListener('click', closeUserModalFunc)
    }
    if (document.querySelector(".theme-dropdown-menu-container").classList.contains("active-submenu")) {
        document.querySelector(".theme-dropdown-menu-container").classList.remove("active-submenu")
    }
}
function closeUserModalFunc(e) {
    let currentTarget = document.querySelector(".user-dropdown-menu-container.active-submenu").contains(e.target);
    if (!currentTarget) { //clikced outside of box
        document.querySelector(".user-dropdown-menu-container.active-submenu").classList.remove("active-submenu");
        document.body.removeEventListener('click', closeUserModalFunc)
    }
}
document.querySelector(".theme-modal-btn").addEventListener('click', toggleThemeModalFunc)
function toggleThemeModalFunc() {
    if (this.parentElement.classList.contains("active-submenu")) {
        this.parentElement.classList.remove("active-submenu");
    } else {
        this.parentElement.classList.add("active-submenu");
    }
}

